# PDF Processing

Read, extract tables, fill forms, merge and split PDFs using Python libraries and command-line tools.

## Quick Start

```python
from pypdf import PdfReader

reader = PdfReader("document.pdf")
for page in reader.pages:
    print(page.extract_text())
```

## Python Libraries

### pypdf — Basic Operations

**Merge PDFs:**
```python
from pypdf import PdfWriter

writer = PdfWriter()
for path in ["file1.pdf", "file2.pdf"]:
    writer.append(path)
with open("merged.pdf", "wb") as f:
    writer.write(f)
```

**Split PDF:**
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("document.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as f:
        writer.write(f)
```

**Extract Metadata:**
```python
reader = PdfReader("document.pdf")
meta = reader.metadata
print(meta.title, meta.author, meta.subject, meta.creator)
```

**Rotate Pages:**
```python
reader = PdfReader("document.pdf")
writer = PdfWriter()
for page in reader.pages:
    page.rotate(90)  # degrees clockwise
    writer.add_page(page)
with open("rotated.pdf", "wb") as f:
    writer.write(f)
```

---

### pdfplumber — Text and Table Extraction

**Extract Text with Layout:**
```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        print(page.extract_text())
```

**Extract Tables:**
```python
with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                print(row)
```

**Tables to DataFrame/Excel:**
```python
import pandas as pd

with pdfplumber.open("document.pdf") as pdf:
    page = pdf.pages[0]
    table = page.extract_table()
    df = pd.DataFrame(table[1:], columns=table[0])
    df.to_excel("output.xlsx", index=False)
```

---

### reportlab — Create PDFs

**Basic PDF:**
```python
from reportlab.pdfgen import canvas

c = canvas.Canvas("output.pdf")
c.drawString(100, 750, "Hello, World!")
c.line(100, 740, 400, 740)
c.save()
```

**Multi-page with Platypus:**
```python
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate("output.pdf")
styles = getSampleStyleSheet()
story = [Paragraph("Page content here", styles["Normal"])]
doc.build(story)
```

**Subscripts/Superscripts:**
> **Never use Unicode subscript/superscript characters** (e.g., ² ₂) — font limitations cause rendering failures. Use XML markup instead:
```python
Paragraph("H<sub>2</sub>O and E=mc<super>2</super>", styles["Normal"])
```

---

## Command-Line Tools

**pdftotext:**
```bash
pdftotext -layout document.pdf output.txt          # preserve layout
pdftotext -f 3 -l 7 document.pdf output.txt        # pages 3–7
```

**qpdf:**
```bash
qpdf --merge -- file1.pdf file2.pdf merged.pdf     # merge
qpdf --pages input.pdf 1-3 -- input.pdf split.pdf  # split
qpdf --rotate=90:1-z input.pdf rotated.pdf         # rotate all pages
qpdf --decrypt input.pdf output.pdf                # remove password
```

**pdftk:**
```bash
pdftk file1.pdf file2.pdf cat output merged.pdf    # merge
pdftk input.pdf burst output page_%02d.pdf         # split
pdftk input.pdf rotate 1-endeast output rotated.pdf # rotate
```

---

## Common Tasks

**OCR for scanned PDFs:**
```python
from pdf2image import convert_from_path
import pytesseract

images = convert_from_path("scanned.pdf")
for image in images:
    text = pytesseract.image_to_string(image)
    print(text)
```

**Add watermark:**
```python
from pypdf import PdfReader, PdfWriter

watermark = PdfReader("watermark.pdf").pages[0]
reader = PdfReader("document.pdf")
writer = PdfWriter()
for page in reader.pages:
    page.merge_page(watermark)
    writer.add_page(page)
with open("watermarked.pdf", "wb") as f:
    writer.write(f)
```

**Extract images:**
```bash
pdfimages -png document.pdf output_prefix
```

**Password protection:**
```python
from pypdf import PdfWriter

writer = PdfWriter(clone_from="document.pdf")
writer.encrypt(user_password="user123", owner_password="owner456")
with open("protected.pdf", "wb") as f:
    writer.write(f)
```

---

## Quick Reference

| Task | Best tool |
|------|-----------|
| Read/extract text | `pypdf`, `pdfplumber` |
| Extract tables | `pdfplumber` |
| Merge/split/rotate | `pypdf`, `qpdf`, `pdftk` |
| Create from scratch | `reportlab` |
| OCR scanned pages | `pytesseract` + `pdf2image` |
| Fill fillable forms | `scripts/fill_fillable_fields.py` |
| Fill non-fillable forms | `scripts/fill_pdf_form_with_annotations.py` |
| Password protect | `pypdf` |

## Form Filling

See `forms.md` for the complete form-filling workflow.
See `reference.md` for advanced library usage, JavaScript options, and troubleshooting.
