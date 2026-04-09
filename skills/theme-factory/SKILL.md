# Theme Factory

Batch-generate color schemes from one prompt. Apply consistent, professional themes to slides, docs, reports, and HTML pages — choose from 10 pre-set themes or generate a custom one.

## Usage

Four-step process:

1. **Showcase** — Display `theme-showcase.pdf` for the user to browse all options
2. **Ask** — Request the user's theme preference
3. **Confirm** — Obtain explicit confirmation of their selection
4. **Apply** — Read the selected theme file and apply its colors and fonts consistently throughout the artifact

## Available Themes

| # | Theme | Vibe |
|---|-------|------|
| 1 | **Ocean Depths** | Maritime, corporate trust |
| 2 | **Sunset Boulevard** | Warm, creative, energetic |
| 3 | **Forest Canopy** | Earthy, natural, sustainable |
| 4 | **Modern Minimalist** | Clean, grayscale, versatile |
| 5 | **Golden Hour** | Autumnal, warm, artisanal |
| 6 | **Arctic Frost** | Cool, crisp, clinical |
| 7 | **Desert Rose** | Soft, dusty, elegant |
| 8 | **Tech Innovation** | High-contrast, futuristic |
| 9 | **Botanical Garden** | Organic, floral, natural |
| 10 | **Midnight Galaxy** | Cosmic, dark, dramatic |

Theme specifications are in the `themes/` directory.

## Application Process

After the user confirms a selection:

1. Read the corresponding theme file in `themes/`
2. Apply the color palette and font pairings consistently across all elements
3. Ensure readability and contrast throughout
4. Maintain the visual identity from first element to last

## Create Your Own Theme

When no existing theme fits the user's needs:

1. Ask the user to describe the mood, audience, and context
2. Generate a custom theme (name, 4-color palette with hex codes, font pairing, identity description)
3. Present it for review
4. Apply after confirmation
