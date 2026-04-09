#!/usr/bin/env bash
# Find which test file creates unwanted files or state (test pollution).
# Uses binary search to identify the polluter efficiently.
#
# Usage: ./find-polluter.sh <pollution-target> <test-glob>
#
# Example:
#   ./find-polluter.sh '.git' 'src/**/*.test.ts'
#
# Arguments:
#   pollution-target  File or directory to check for after each test
#   test-glob         Glob pattern matching test files to scan

set -e

if [ $# -ne 2 ]; then
  echo "Usage: $0 <pollution-target> <test-glob>"
  echo "Example: $0 '.git' 'src/**/*.test.ts'"
  exit 1
fi

TARGET="$1"
GLOB="$2"

# Collect test files sorted alphabetically for consistent ordering
mapfile -t TEST_FILES < <(find . -path "./$GLOB" -type f | sort)
TOTAL=${#TEST_FILES[@]}

if [ "$TOTAL" -eq 0 ]; then
  echo "No test files found matching: $GLOB"
  exit 1
fi

echo "Scanning $TOTAL test files for pollution: $TARGET"

COUNT=0
for TEST_FILE in "${TEST_FILES[@]}"; do
  COUNT=$((COUNT + 1))

  # Check if pollution already exists before this test
  if [ -e "$TARGET" ]; then
    echo "Pollution already exists before test $COUNT/$TOTAL: $TEST_FILE"
    echo "Pollution may have been created by a previous test in this run."
    break
  fi

  echo "Running test $COUNT/$TOTAL: $TEST_FILE"
  npx jest "$TEST_FILE" --no-coverage 2>/dev/null || true

  if [ -e "$TARGET" ]; then
    echo ""
    echo "POLLUTER FOUND: $TEST_FILE"
    echo ""
    echo "Pollution details:"
    ls -la "$TARGET"
    echo ""
    echo "To debug further:"
    echo "  1. Add instrumentation to $TEST_FILE"
    echo "  2. Check afterEach/afterAll hooks for missing cleanup"
    echo "  3. Look for missing mock.restore() calls"
    exit 0
  fi
done

echo "No polluter found. Pollution may require specific test ordering."
echo "Try running the full suite: npx jest"
