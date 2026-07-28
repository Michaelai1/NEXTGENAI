# NextGen AI LLC — website

Static site, no build step, hosted on GitHub Pages at
**https://michaelai1.github.io/NEXTGENAI/**

That URL is on printed business cards. It must keep working. Do not rename this
repository and do not move `index.html` out of the root.

---

## Pages

| URL | File | What it is |
|---|---|---|
| `/NEXTGENAI/` | `index.html` | Home. Brand, the two paths, recent work, team, contact. |
| `/NEXTGENAI/toolguard/` | `toolguard/index.html` | ToolGuard — field operations. |
| `/NEXTGENAI/toolguard/roi/` | `toolguard/roi/index.html` | ROI workbook, all four calculators. |
| `/NEXTGENAI/ai/` | `ai/index.html` | Custom AI — the four-stage ladder. |

Demos live in their own repos and are linked, not copied:
`nextgen-ops-dashboard`, `equipment-qr-demo`.

---

## Editing

### Header, footer, and contact details — edit ONE place

All three live in **`assets/site.js`**, at the top:

- `CONTACT` — name, phone, email, city. Change it here and every page updates,
  including every call and email button.
- `NAV` — the two primary nav items.
- `HDR_HTML` / `FTR_HTML` — the actual header and footer markup.

They are rendered as custom elements. Each page just contains:

```html
<site-header page="toolguard"></site-header>   <!-- page = home | toolguard | ai -->
<site-footer></site-footer>
```

`site.js` is loaded from `<head>` **without `defer`** on purpose. The browser
upgrades these elements while it is still parsing them, so there is no flash of
missing navigation. Every page also carries a plain `<noscript>` link list.

### Calculators — edit ONE place

The four ROI models are defined in the `CALCS` array in `assets/site.js`. Each
entry holds its inputs, its assumptions, its disclaimer text, and its `calc()`
function. Change a constant there and both the ToolGuard page and the ROI
workbook page update, because both just contain:

```html
<calc-suite></calc-suite>
```

**The totals are deliberately gated.** Visitors can move every slider and type
their own numbers, but the result renders blurred (`.locked`) behind a call to
action. The numbers are still computed in the browser, so treat them as public —
this is a lead gate, not a security boundary.

### Colors, type, spacing — edit ONE place

**`assets/site.css`**, section 2 (`:root`). Everything else in the site reads
from those custom properties.

The single rule worth protecting: **safety yellow (`--yellow`) is only for
things that are actionable or flagged.** Buttons, live status, flagged items,
calculator readouts. It is never a background wash and never a gradient. If
yellow starts showing up three or four times per screen, the site stops looking
like equipment and starts looking like every other site.

---

## Fonts

Self-hosted in `assets/fonts/` — latin-subset `.woff2`, about 85 KB total. There
is no CDN link, so nothing breaks if Google Fonts is blocked or slow.

| Face | Role |
|---|---|
| Barlow Condensed 700/800 | Display — headlines, section heads |
| Archivo (variable) | Body |
| IBM Plex Mono 400/600 | Every identifier, serial, timestamp, stage number, total |

---

## Team photos

`assets/team/*.jpg` — 560×560, cropped from the originals to remove the corner
watermark, then converted to a navy duotone so all three sit in the palette.
The duotone is **baked into the files**, not applied in CSS.

To swap someone in, crop square and run:

```bash
python3 - <<'PY'
from PIL import Image, ImageOps, ImageEnhance
p = "assets/team/NAME.jpg"
im = ImageEnhance.Contrast(Image.open(p).convert("L")).enhance(1.12)
ImageOps.colorize(im, black="#0B1220", mid="#33506E", white="#DFE7F0") \
    .resize((560, 560), Image.LANCZOS) \
    .save(p, "JPEG", quality=86, optimize=True, progressive=True)
PY
```

---

## Local preview

The nav links are root-relative (`/NEXTGENAI/...`) so they match production.
To preview locally, serve a parent directory with this repo mounted at
`NEXTGENAI`:

```bash
mkdir -p /tmp/serve && ln -sfn "$PWD" /tmp/serve/NEXTGENAI
cd /tmp/serve && python3 -m http.server 8765
# open http://localhost:8765/NEXTGENAI/
```

Opening the `.html` files directly with `file://` will render the pages but the
nav links will not resolve.

---

## Conventions worth keeping

- **NextGen AI LLC is the company. ToolGuard is the product.** Never used
  interchangeably. The footer says so on every page.
- **No invented numbers.** The only figures on the site are the client counts in
  the recent-work strip and the calculator assumptions, which are all labelled
  and disclaimed. If a number is not already here, it does not go on the site.
- **No compliance or insurance claims.** The safety section says ToolGuard
  captures and delivers records. It does not say it makes anyone compliant, and
  it never mentions insurance except to disclaim it.
- **No contact forms.** Every contact route is a real `tel:` or `mailto:` link.
  Nothing can fail silently.

---

## Not in this repo any more

Removed during the consolidation: `style.css`, `background.js`,
`fancy-animations.js`, `config.js` (held an n8n webhook URL in public), the
contact form and `thank-you.html`, `NextGen-Product-Catalog.pdf`, and the
original untinted team PNGs. All are still in git history.
