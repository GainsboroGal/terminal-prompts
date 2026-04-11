---
name: pr-test
description: "E2E manual testing of PRs/branches using docker compose, agent-browser, and API calls. TRIGGER when user asks to manually test a PR, test a feature end-to-end, or run integration tests against a running system."
user-invocable: true
argument-hint: "[worktree path or PR number] — tests the PR in the given worktree. Optional flags: --fix (auto-fix issues found)"
metadata:
  author: autogpt-team
  version: "2.0.0"
---

# Manual E2E Test

Test a PR/branch end-to-end by building the full platform, interacting via browser and API, capturing screenshots, and reporting results.

## Critical Requirements

These are NON-NEGOTIABLE. Every test run MUST satisfy ALL the following:

### 1. Screenshots at Every Step
- Take a screenshot at EVERY significant test step — not just at the end
- Every test scenario MUST have at least one BEFORE and one AFTER screenshot
- Name screenshots sequentially: `{NN}-{action}-{state}.png` (e.g., `01-credits-before.png`, `02-credits-after.png`)
- If a screenshot is missing for a scenario, the test is INCOMPLETE — go back and take it

### 2. Screenshots MUST Be Posted to PR
- Push ALL screenshots to a temp branch `test-screenshots/pr-{N}`
- Post a PR comment with ALL screenshots embedded inline using GitHub raw URLs
- This is NOT optional — every test run MUST end with a PR comment containing screenshots
- If screenshot upload fails, retry. If it still fails, list failed files and require manual drag-and-drop/paste attachment in the PR comment

### 3. State Verification with Before/After Evidence
- For EVERY state-changing operation (API call, user action), capture the state BEFORE and AFTER
- Log the actual API response values (e.g., `credits_before=100, credits_after=95`)
- Screenshot MUST show the relevant UI state change
- Compare expected vs actual values explicitly — do not just eyeball it

### 4. Negative Test Cases Are Mandatory
- Test at least ONE negative case per feature (e.g., insufficient credits, invalid input, unauthorized access)
- Verify error messages are user-friendly and accurate
- Verify the system state did NOT change after a rejected operation

### 5. Test Report Must Include Full Evidence
Each test scenario in the report MUST have:
- **Steps**: What was done (exact commands or UI actions)
- **Expected**: What should happen
- **Actual**: What actually happened
- **API Evidence**: Before/after API response values for state-changing operations
- **Screenshot Evidence**: Before/after screenshots with explanations

## State Manipulation for Realistic Testing

When testing features that depend on specific states (rate limits, credits, quotas):

1. **Use Redis CLI to set counters directly:**
   ```bash
   REDIS_CONTAINER=$(docker ps --format '{{.Names}}' | grep redis | head -1)
   docker exec $REDIS_CONTAINER redis-cli SET key value EX ttl
   docker exec $REDIS_CONTAINER redis-cli GET "rate_limit:user:test@test.com"
   ```

2. **Use API calls to check before/after state:**
   ```bash
   BEFORE=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8006/api/credits | jq '.credits')
   echo "Credits BEFORE: $BEFORE"
   # Perform the action...
   AFTER=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8006/api/credits | jq '.credits')
   echo "Credits AFTER: $AFTER"
   echo "Delta: $(( BEFORE - AFTER ))"
   ```

3. **Take screenshots BEFORE and AFTER state changes** — the UI must reflect the backend state change

4. **Never rely on mocked/injected browser state** — always use real backend state. Do NOT use `agent-browser eval` to fake UI state. The backend must be the source of truth.

5. **Use direct DB queries when needed:**
   ```bash
   docker exec supabase-db psql -U supabase_admin -d postgres -c "SELECT credits FROM user_credits WHERE user_id = '...';"
   ```

6. **After every API test, verify the state change actually persisted:**
   ```bash
   API_CREDITS=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8006/api/credits | jq '.credits')
   DB_CREDITS=$(docker exec supabase-db psql -U supabase_admin -d postgres -t -c "SELECT credits FROM user_credits WHERE user_id = '...';" | tr -d ' ')
   [ "$API_CREDITS" = "$DB_CREDITS" ] && echo "CONSISTENT" || echo "MISMATCH: API=$API_CREDITS DB=$DB_CREDITS"
   ```

## Arguments

- `$ARGUMENTS` — worktree path (e.g. `$REPO_ROOT`) or PR number
- If `--fix` flag is present, auto-fix bugs found and push fixes (like pr-address loop)

## Step 0: Resolve the target

```bash
gh pr view {N} --json headRefName --jq '.headRefName'
```

Determine:
- `REPO_ROOT` — `git -C "$WORKTREE_PATH" worktree list | head -1 | awk '{print $1}'`
- `WORKTREE_PATH` — the worktree directory
- `PLATFORM_DIR` — `$WORKTREE_PATH/autogpt_platform`
- `BACKEND_DIR` — `$PLATFORM_DIR/backend`
- `FRONTEND_DIR` — `$PLATFORM_DIR/frontend`
- `PR_NUMBER` — from `gh pr list --head $(git branch --show-current)`
- `RESULTS_DIR` — `$REPO_ROOT/test-results/PR-{PR_NUMBER}-{slugified-title}`

```bash
PR_NUMBER=$(cd $WORKTREE_PATH && gh pr list --head $(git branch --show-current) --repo Significant-Gravitas/AutoGPT --json number --jq '.[0].number')
PR_TITLE=$(cd $WORKTREE_PATH && gh pr list --head $(git branch --show-current) --repo Significant-Gravitas/AutoGPT --json title --jq '.[0].title' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//' | head -c 50)
RESULTS_DIR="$REPO_ROOT/test-results/PR-${PR_NUMBER}-${PR_TITLE}"
mkdir -p $RESULTS_DIR
```

**Test user credentials:** Email: `test@test.com` / Password: `testtest123`

## Step 1: Understand the PR

```bash
cd $WORKTREE_PATH
gh pr view {N} --json body --jq '.body'
git log --oneline dev..HEAD | head -20
git diff dev --stat
```

Understand: Why does this PR exist? What feature/fix does it implement? What components are affected?

## Step 2: Write test scenarios

Write a test plan to `$RESULTS_DIR/test-plan.md` covering happy paths, API tests, UI tests, and at least one negative test per feature.

## Step 3: Environment setup

### 3a. Copy .env files

```bash
cp $REPO_ROOT/autogpt_platform/.env $PLATFORM_DIR/.env
cp $REPO_ROOT/autogpt_platform/backend/.env $BACKEND_DIR/.env
cp $REPO_ROOT/autogpt_platform/frontend/.env $FRONTEND_DIR/.env
```

### 3b. Configure copilot authentication

**Option 1: Subscription mode (preferred)**

```bash
bash $BACKEND_DIR/scripts/refresh_claude_token.sh --env-file $BACKEND_DIR/.env
```

Extracts OAuth tokens from macOS keychain / `~/.claude/.credentials.json` (Linux/WSL) and writes `CLAUDE_CODE_OAUTH_TOKEN` + `CLAUDE_CODE_REFRESH_TOKEN` into `.env`. The SDK bundles its own CLI — no `npm install` needed.

**Option 2: OpenRouter API key (fallback)**

```bash
ORKEY=$(grep "^OPEN_ROUTER_API_KEY=" $BACKEND_DIR/.env | cut -d= -f2)
perl -i -pe 's/CHAT_USE_CLAUDE_CODE_SUBSCRIPTION=true/CHAT_USE_CLAUDE_CODE_SUBSCRIPTION=false/' $BACKEND_DIR/.env
grep -q "^CHAT_API_KEY=" $BACKEND_DIR/.env && perl -i -pe "s|^CHAT_API_KEY=.*|CHAT_API_KEY=$ORKEY|" $BACKEND_DIR/.env || echo "CHAT_API_KEY=$ORKEY" >> $BACKEND_DIR/.env
grep -q "^CHAT_BASE_URL=" $BACKEND_DIR/.env && perl -i -pe 's|^CHAT_BASE_URL=.*|CHAT_BASE_URL=https://openrouter.ai/api/v1|' $BACKEND_DIR/.env || echo "CHAT_BASE_URL=https://openrouter.ai/api/v1" >> $BACKEND_DIR/.env
```

### 3c. Stop conflicting containers

```bash
docker ps --format "{{.Names}}" | grep -E "rest_server|executor|copilot|websocket|database_manager|scheduler|notification|frontend|migrate" | while read name; do
  docker stop "$name" 2>/dev/null
done
```

### 3d. Build and start

```bash
cd $PLATFORM_DIR && docker compose build --no-cache 2>&1 | tail -20
cd $PLATFORM_DIR && docker compose up -d 2>&1 | tail -20
```

### 3e. Wait for services

```bash
for i in $(seq 1 60); do
  BACKEND=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8006/docs 2>/dev/null)
  FRONTEND=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
  [ "$BACKEND" = "200" ] && [ "$FRONTEND" = "200" ] && echo "Services ready" && break
  sleep 5
done
```

### 3f. Create test user and get auth token

```bash
ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY=" $FRONTEND_DIR/.env | sed 's/.*NEXT_PUBLIC_SUPABASE_ANON_KEY=//' | tr -d '[:space:]')
curl -s -X POST 'http://localhost:8000/auth/v1/signup' \
  -H "apikey: $ANON_KEY" -H 'Content-Type: application/json' \
  -d '{"email":"test@test.com","password":"testtest123"}'
TOKEN=$(curl -s -X POST 'http://localhost:8000/auth/v1/token?grant_type=password' \
  -H "apikey: $ANON_KEY" -H 'Content-Type: application/json' \
  -d '{"email":"test@test.com","password":"testtest123"}' | jq -r '.access_token // ""')
```

### 3g. Disable onboarding

```bash
curl -s -X POST "http://localhost:8006/api/onboarding/step?step=VISIT_COPILOT" \
  -H "Authorization: Bearer $TOKEN"
```

## Step 4: Run tests

### Service ports

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Backend REST | 8006 |
| Supabase Auth (Kong) | 8000 |
| Executor | 8002 |
| Copilot Executor | 8008 |

### API testing

```bash
# State verification pattern — use for EVERY state-changing call
BEFORE_STATE=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8006/api/{resource} | jq '{relevant_fields}')
ACTION_RESULT=$(curl -s -X POST ... | jq .)
AFTER_STATE=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:8006/api/{resource} | jq '{relevant_fields}')
echo "Before: $BEFORE_STATE  After: $AFTER_STATE"
```

### Browser testing

```bash
agent-browser close 2>/dev/null || true
agent-browser --session-name pr-test open 'http://localhost:3000/login' --timeout 15000
agent-browser --session-name pr-test fill {email_ref} "test@test.com"
agent-browser --session-name pr-test fill {password_ref} "testtest123"
agent-browser --session-name pr-test click {login_button_ref}
sleep 5
agent-browser --session-name pr-test click 'text=Accept All' 2>/dev/null || true
agent-browser --session-name pr-test open 'http://localhost:3000/copilot' --timeout 10000
agent-browser --session-name pr-test screenshot $RESULTS_DIR/01-page.png
```

### Checking logs

```bash
docker logs autogpt_platform-rest_server-1 2>&1 | tail -30
docker logs autogpt_platform-executor-1 2>&1 | grep -i "error\|exception\|traceback" | tail -20
```

## Step 5: Screenshots (NON-NEGOTIABLE)

```bash
# BEFORE
agent-browser --session-name pr-test screenshot $RESULTS_DIR/{NN}-{scenario}-before.png
# ... action ...
# AFTER
agent-browser --session-name pr-test screenshot $RESULTS_DIR/{NN}-{scenario}-after.png
```

Minimum: two screenshots per scenario (before + after), one per negative test case.

## Step 6: Show results to user

Display every screenshot using the Read tool with a 1-2 sentence explanation per image. Then output a summary table:

| # | Scenario | Result | API Evidence | Screenshot Evidence |
|---|----------|--------|-------------|-------------------|

Store explanations and results in shell variables for Step 7:

```bash
declare -A SCREENSHOT_EXPLANATIONS=(
  ["01-login-page.png"]="Shows the login page loaded successfully."
)
TEST_RESULTS_TABLE="| 1 | Login flow | PASS | N/A | 01-before.png, 02-after.png |"
```

## Step 7: Post test report as PR comment with screenshots

Upload screenshots via GitHub Git API (blob → tree → commit → ref), then post a PR comment with all images inline. **Every screenshot MUST appear as `![name](raw_url)` — bare directory links are not acceptable.**

```bash
REPO="Significant-Gravitas/AutoGPT"
SCREENSHOTS_BRANCH="test-screenshots/pr-${PR_NUMBER}"
SCREENSHOTS_DIR="test-screenshots/PR-${PR_NUMBER}"

# Build blobs
TREE_JSON='['; FIRST=true; FAILED_UPLOADS=()
for img in "$RESULTS_DIR"/*.png; do
  BASENAME=$(basename "$img")
  B64=$(base64 < "$img"); BLOB_SHA=""
  for attempt in 1 2 3; do
    BLOB_SHA=$(gh api "repos/${REPO}/git/blobs" -f content="$B64" -f encoding="base64" --jq '.sha' 2>/dev/null || true)
    [ -n "$BLOB_SHA" ] && break; sleep 1
  done
  [ -z "$BLOB_SHA" ] && FAILED_UPLOADS+=("$img") && continue
  [ "$FIRST" = true ] && FIRST=false || TREE_JSON+=','
  TREE_JSON+="{\"path\":\"${SCREENSHOTS_DIR}/${BASENAME}\",\"mode\":\"100644\",\"type\":\"blob\",\"sha\":\"${BLOB_SHA}\"}"
done
TREE_JSON+=']'

TREE_SHA=$(echo "$TREE_JSON" | jq -c '{tree: .}' | gh api "repos/${REPO}/git/trees" --input - --jq '.sha')
PARENT_SHA=$(gh api "repos/${REPO}/git/refs/heads/${SCREENSHOTS_BRANCH}" --jq '.object.sha' 2>/dev/null || echo "")
if [ -n "$PARENT_SHA" ]; then
  COMMIT_SHA=$(gh api "repos/${REPO}/git/commits" \
    -f message="test: add E2E screenshots for PR #${PR_NUMBER}" \
    -f tree="$TREE_SHA" -f "parents[]=$PARENT_SHA" --jq '.sha')
else
  COMMIT_SHA=$(gh api "repos/${REPO}/git/commits" \
    -f message="test: add E2E screenshots for PR #${PR_NUMBER}" \
    -f tree="$TREE_SHA" --jq '.sha')
fi
gh api "repos/${REPO}/git/refs" -f ref="refs/heads/${SCREENSHOTS_BRANCH}" -f sha="$COMMIT_SHA" 2>/dev/null \
  || gh api "repos/${REPO}/git/refs/heads/${SCREENSHOTS_BRANCH}" -X PATCH -f sha="$COMMIT_SHA" -F force=true
```

Post comment with inline images, summary table, and per-screenshot explanations. Verify the posted comment contains `![` tags — exit 1 if not.

## Step 8: Post formal PR review

Re-read the PR description and score against: coverage, all scenarios pass, negative tests, before/after evidence, meaningful screenshots, no regressions.

- All criteria pass → `gh pr review "$PR_NUMBER" --repo "$REPO" --approve --body "..."`
- Any failure or gap → `gh pr review "$PR_NUMBER" --repo "$REPO" --request-changes --body "..."`

## Fix mode (--fix flag)

For every issue found: identify root cause → write failing test (xfail/fixme) → screenshot broken state → fix code → rebuild affected service only → re-test → screenshot fixed state → remove xfail marker → commit + push. Final re-test must be all-passing before posting the review.

## Known issues

| Problem | Fix |
|---------|-----|
| "Database error finding user" on signup | `docker restart supabase-auth && sleep 5` |
| Copilot auth errors (subscription mode) | Re-run `refresh_claude_token.sh`, restart `copilot_executor` |
| Docker uses cached layers with old code | Use `docker compose build --no-cache` |
| agent-browser loses login session | Use `--session-name pr-test` on ALL commands |
| Cookie banner blocking interaction | `agent-browser click 'text=Accept All'` first |
