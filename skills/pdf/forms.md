# PDF Form Filling

Two pathways depending on whether the PDF has interactive (fillable) form fields.

## Step 0: Detect Field Type

```bash
python scripts/check_fillable_fields.py input.pdf
```

- **"This PDF has fillable form fields"** → follow Path A
- **"does not have fillable form fields"** → follow Path B

---

## Path A: Fillable Form Fields

### Step 1: Extract Field Information

```bash
python scripts/extract_form_field_info.py input.pdf field_info.json
```

Outputs `field_info.json` with field IDs, types, pages, and positions.

### Step 2: Convert to Images (for Visual Reference)

```bash
python scripts/convert_pdf_to_images.py input.pdf ./images/
```

Use the images to visually verify field locations and values.

### Step 3: Prepare Field Values

Create `field_values.json` matching field IDs from `field_info.json`:

```json
[
  { "field_id": "FirstName", "page": 1, "value": "Jane" },
  { "field_id": "Agree", "page": 2, "value": "/Yes" },
  { "field_id": "Country", "page": 1, "value": "US" }
]
```

Field types and their value formats:
- **text** — string value
- **checkbox** — use the `checked_value` or `unchecked_value` from field info
- **radio_group** — one of the `radio_options[].value` values
- **choice** — one of the `choice_options[].value` values

### Step 4: Fill the Form

```bash
python scripts/fill_fillable_fields.py input.pdf field_values.json output.pdf
```

The script validates all field IDs and values before writing. Fix any reported errors before proceeding.

---

## Path B: Non-Fillable Forms (Text Annotations)

Use text annotations placed over field locations.

### Approach A: Structure-Based (Preferred)

Extract coordinates directly from the PDF structure:

```bash
python scripts/extract_form_structure.py input.pdf form_structure.json
```

Use `form_structure.json` (labels, lines, checkboxes, row boundaries) to build `fields.json` with precise PDF coordinates.

### Approach B: Visual Estimation

```bash
# Convert to images
python scripts/convert_pdf_to_images.py input.pdf ./images/

# Use ImageMagick to zoom in for precise coordinates
convert images/page_1.png -crop 400x200+100+300 zoomed.png
```

Build `fields.json` using pixel coordinates from the images.

### Hybrid Approach

Combine both when structure extraction finds most but not all fields. Use structure data for located fields, visual estimation for the rest.

### fields.json Format

```json
{
  "pages": [
    { "page_number": 1, "image_width": 850, "image_height": 1100 }
  ],
  "form_fields": [
    {
      "description": "Full Name",
      "page_number": 1,
      "label_bounding_box": [72, 200, 200, 220],
      "entry_bounding_box": [205, 200, 500, 220],
      "entry_text": {
        "text": "Jane Smith",
        "font": "Arial",
        "font_size": 11,
        "font_color": "000000"
      }
    }
  ]
}
```

For structure-based coordinates, include `"pdf_width"` and `"pdf_height"` in the page object instead of image dimensions.

### Step: Validate Bounding Boxes

```bash
python scripts/check_bounding_boxes.py fields.json
```

Fix any reported intersections or sizing issues before filling.

### Step: Fill the Form

```bash
python scripts/fill_pdf_form_with_annotations.py input.pdf fields.json output.pdf
```

### Step: Verify Results

```bash
python scripts/convert_pdf_to_images.py output.pdf ./output_images/
python scripts/create_validation_image.py 1 fields.json images/page_1.png validation_p1.png
```

Red boxes = entry fields, Blue boxes = label fields. Visually confirm placement.
