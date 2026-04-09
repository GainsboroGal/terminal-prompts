# PDF Processing Advanced Reference

## Python Libraries

### pypdfium2 (Apache/BSD License)

Fast PDF rendering and image generation.

**Render page to image:**
```python
import pypdfium2 as pdfium

pdf = pdfium.PdfDocument("document.pdf")
page = pdf[0]
bitmap = page.render(scale=2.0)
img = bitmap.to_pil()
img.save("page.png")
```

**Extract text:**
```python
page = pdf[0]
text = page.get_text()
```

---

### pdfplumber — Precise Coordinates

**Extract characters with positions:**
```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    page = pdf.pages[0]
    chars = page.chars
    for char in chars:
        print(char["text"], char["x0"], char["top"])
```

**Advanced table extraction:**
```python
table_settings = {
    "vertical_strategy": "lines",
    "horizontal_strategy": "lines",
    "explicit_vertical_lines": [],
    "explicit_horizontal_lines": [],
    "snap_tolerance": 3,
}
table = page.extract_table(table_settings)
```

---

### reportlab — Professional Documents

**Styled table:**
```python
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors

data = [["Name", "Score"], ["Alice", 95], ["Bob", 87]]
table = Table(data)
table.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
    ("GRID", (0, 0), (-1, -1), 1, colors.black),
]))
```

---

## JavaScript Libraries

### pdf-lib (MIT License)

**Load and modify:**
```javascript
import { PDFDocument } from 'pdf-lib';

const existingPdfBytes = fs.readFileSync('document.pdf');
const pdfDoc = await PDFDocument.load(existingPdfBytes);
const pages = pdfDoc.getPages();
const firstPage = pages[0];
firstPage.drawText('Hello', { x: 50, y: 700, size: 12 });
const pdfBytes = await pdfDoc.save();
```

**Create from scratch:**
```javascript
const pdfDoc = await PDFDocument.create();
const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
const page = pdfDoc.addPage();
page.drawText('Hello, World!', { x: 50, y: 700, size: 30, font });
```

**Best for form filling** — preserves PDF structure.

### pdfjs-dist (Apache License)

Browser-side PDF rendering:
```javascript
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.js';

const pdf = await pdfjsLib.getDocument('document.pdf').promise;
const page = await pdf.getPage(1);
const viewport = page.getViewport({ scale: 1.5 });
```

---

## Command-Line Tools

### poppler-utils

**Extract text with coordinates:**
```bash
pdftotext -bbox-layout document.pdf output.xml
```

**Convert to images:**
```bash
pdftoppm -png -r 300 document.pdf output
```

### qpdf — Advanced Operations

```bash
# Split specific page range
qpdf --pages input.pdf 2-5 -- input.pdf pages_2_to_5.pdf

# Linearize (optimize for web)
qpdf --linearize input.pdf optimized.pdf

# Compress
qpdf --recompress-flate --compression-level=9 input.pdf compressed.pdf

# Encrypt with permissions
qpdf --encrypt user_pass owner_pass 256 --print=none -- input.pdf encrypted.pdf
```

---

## Performance Recommendations

| Task | Recommendation |
|------|---------------|
| Large PDFs | Process pages individually, not all at once |
| Text extraction | `pdftotext -bbox-layout` is fastest |
| Image extraction | `pdfimages` outperforms rendering approaches |
| Form filling | `pdf-lib` (JS) preserves structure best |
| Batch processing | Use `pypdfium2` for speed |

## Troubleshooting

**Encrypted PDF:**
```bash
qpdf --decrypt --password=PASSWORD input.pdf decrypted.pdf
```

**Corrupted PDF:**
```bash
qpdf --replace-input input.pdf  # attempt repair
```

**Scanned/image-only PDF (no text layer):**
Use OCR: `pytesseract` + `pdf2image` (see SKILL.md Quick Reference)

**Form fields not detected:**
The PDF may use non-standard AcroForm structure. Try `extract_form_structure.py` (Path B) instead.
