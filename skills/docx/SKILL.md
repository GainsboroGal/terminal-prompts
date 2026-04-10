# DOCX Skill

Create, edit, and manipulate Word documents (.docx files). A .docx file is a ZIP archive containing XML files.

## When to use this skill

Apply when requests involve:
- Creating Word documents (.docx) with professional formatting
- Editing existing .docx files (tracked changes, comments, formatting)
- Tables of contents, headings, letterheads, tables
- Content extraction from Word documents
- Image insertion in Word documents
- Converting .doc to .docx format

Does not apply to PDFs, spreadsheets, Google Docs, or unrelated coding tasks.

## Dependencies

```bash
npm install -g docx          # JavaScript creation library
pip install defusedxml lxml  # XML processing for editing scripts
# LibreOffice                # for .doc conversion and accepting changes
# pandoc                     # for text extraction
# pdftoppm (poppler-utils)   # for image conversion
```

## Reading Documents

```bash
# Extract text
pandoc document.docx -t plain

# Inspect raw XML
python scripts/office/unpack.py document.docx unpacked/
```

## Creating Documents (JavaScript docx library)

```javascript
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, ImageRun, PageBreak, ExternalHyperlink,
  LevelFormat, NumberingInstance, Footer, Header,
  TabStopPosition, TabStopType, LeaderType,
} from "docx";
import fs from "fs";

// Always specify US Letter explicitly — docx-js defaults to A4
const doc = new Document({
  numbering: { config: [] },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },    // 8.5" × 11" in DXA
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    children: [ /* paragraphs, tables, etc. */ ],
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("output.docx", buffer);
```

## Critical Rules

### Typography
- **NEVER use Unicode bullet characters** — use `LevelFormat.BULLET` with numbering config
- Smart quotes MUST use XML entities: `&#x201C;` `&#x201D;` `&#x2018;` `&#x2019;`
- Separate lines require separate `Paragraph` elements — never `\n` in text
- `PageBreak` must be inside a `Paragraph`, not standalone

### Page Size
- US Letter: `width: 12240, height: 15840` (DXA units, 1440 DXA = 1 inch)
- Landscape: pass portrait dimensions + `orientation: PageOrientation.LANDSCAPE`
- Content width at 1-inch margins = 9360 DXA

### Tables
- Always use `WidthType.DXA` — percentages break in Google Docs
- Table needs **both**: `columnWidths` array on the table AND `width` on each cell
- Table total width must equal sum of `columnWidths`
- Cell backgrounds: `ShadingType.CLEAR` not SOLID
- Add cell margins: `margins: { top: 80, bottom: 80, left: 120, right: 120 }`

```javascript
new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2000, 3000, 4360],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 2000, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: "F0F0F0" },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun("Cell")] })],
        }),
      ],
    }),
  ],
})
```

### Headings (for Table of Contents)
```javascript
// Override built-in styles — use exact IDs, include outlineLevel
styles: {
  paragraphStyles: [
    {
      id: "Heading1",
      name: "heading 1",
      basedOn: "Normal",
      paragraph: { spacing: { before: 240, after: 120 } },
      run: { bold: true, size: 32, font: "Arial", color: "000000" },
    },
  ],
},
// In paragraph:
new Paragraph({
  text: "Chapter One",
  heading: HeadingLevel.HEADING_1,
  outlineLevel: 0,   // required for TOC
})
```

### Images
```javascript
new ImageRun({
  type: "png",           // required: png, jpg, jpeg, gif, bmp, svg
  data: fs.readFileSync("image.png"),
  altText: { title: "Chart", description: "Sales chart", name: "chart1" },
  transformation: { width: 400, height: 300 },
})
```

### Hyperlinks
```javascript
// External
new ExternalHyperlink({
  link: "https://example.com",
  children: [new TextRun({ text: "Link text", style: "Hyperlink" })],
})
```

## Document Editing Workflow

**Always three steps in sequence:**

### Step 1 — Unpack
```bash
python scripts/office/unpack.py document.docx unpacked/
```
Extracts ZIP, pretty-prints XML, merges adjacent runs, simplifies tracked changes, converts smart quotes to XML entities.

### Step 2 — Edit XML
Edit files in `unpacked/word/`. Use the Edit tool for string replacement. Do not write Python scripts for editing.

Smart quote entities:
- `&#x201C;` — left double quote "
- `&#x201D;` — right double quote "
- `&#x2018;` — left single quote '
- `&#x2019;` — right single quote / apostrophe '

### Step 3 — Pack
```bash
python scripts/office/pack.py unpacked/ output.docx --original document.docx
```
Validates with auto-repair (fixes `durableId` overflow, missing `xml:space="preserve"`), condenses XML whitespace, creates DOCX.

## Tracked Changes XML

Use `"Claude"` as the author unless explicitly specified otherwise.

```xml
<!-- Insertion: wrap <w:r> in <w:ins> -->
<w:ins w:id="1" w:author="Claude" w:date="2024-01-01T00:00:00Z">
  <w:r><w:t>inserted text</w:t></w:r>
</w:ins>

<!-- Deletion: use <w:del> with <w:delText> instead of <w:t> -->
<w:del w:id="2" w:author="Claude" w:date="2024-01-01T00:00:00Z">
  <w:r><w:delText>deleted text</w:delText></w:r>
</w:del>

<!-- Delete entire paragraph (mark paragraph properties too) -->
<w:pPr>
  <w:rPr>
    <w:del w:id="3" w:author="Claude" w:date="2024-01-01T00:00:00Z"/>
  </w:rPr>
</w:pPr>
```

## Comments XML Pattern

Add comment via script (handles all XML files automatically):
```bash
python scripts/comment.py unpacked/ 1 "Comment text" --author "Claude" --initials "C"
# For a reply to comment ID 1:
python scripts/comment.py unpacked/ 2 "Reply text" --parent 1
```

Then add markers to `document.xml` as instructed by the script output.

**Critical**: Comment markers are direct children of `<w:p>`, never inside `<w:r>`:
```xml
<w:p>
  <w:commentRangeStart w:id="1"/>
  <w:r><w:t>commented text</w:t></w:r>
  <w:commentRangeEnd w:id="1"/>
  <w:r>
    <w:rPr><w:rStyle w:val="CommentReference"/></w:rPr>
    <w:commentReference w:id="1"/>
  </w:r>
</w:p>
```

## Images in Edited Documents

1. Copy image to `unpacked/word/media/image1.png`
2. Add relationship to `unpacked/word/_rels/document.xml.rels`:
   ```xml
   <Relationship Id="rId100" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>
   ```
3. Register in `[Content_Types].xml`:
   ```xml
   <Default Extension="png" ContentType="image/png"/>
   ```
4. Insert in `document.xml` using drawing XML with the rId

## Validation & Conversion

```bash
# Validate a packed document
python scripts/office/validate.py output.docx --original document.docx

# Accept all tracked changes
python scripts/accept_changes.py input.docx output.docx

# Convert .doc to .docx
python scripts/office/soffice.py --headless --convert-to docx document.doc

# Export to PDF then images
python scripts/office/soffice.py --headless --convert-to pdf output.docx
pdftoppm -r 150 -jpeg output.pdf page
```

## XML Schema Rules

- Element ordering matters in OOXML — `<w:rPr>` before `<w:t>`, `<w:pPr>` before `<w:r>`
- Add `xml:space="preserve"` on `<w:t>` when text starts or ends with spaces
- RSIDs are 8-digit hex: `w:rsidR="12AB34CD"` (use random values in range `0x00000001`–`0x7FFFFFFE`)
- `w14:paraId` and `w16cid:durableId` must be `< 0x80000000` (paraId) and `< 0x7FFFFFFF` (durableId)
