"""Build a single self-contained HTML file of the deck (for opening locally or emailing).

Usage: python3 tools/bundle.py [output.html]
Inlines style.css, release-data.js, script.js and every local image under assets/ as data URIs.
Remote logos and Google Fonts still load from the internet when online.
"""
import base64, mimetypes, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent
out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else root / "dist" / "scf-weekly.html")
html = (root / "index.html").read_text(encoding="utf-8")

def data_uri(rel):
    path = root / rel
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if path.suffix == ".svg":
        mime = "image/svg+xml"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"

html = re.sub(r'<link rel="stylesheet" href="style\.css[^"]*">',
              lambda m: "<style>\n" + (root / "style.css").read_text(encoding="utf-8") + "\n</style>", html)
for name in ("release-data.js", "script.js"):
    html = re.sub(rf'<script src="{re.escape(name)}[^"]*"></script>',
                  lambda m, n=name: "<script>\n" + (root / n).read_text(encoding="utf-8").replace("</script", "<\\/script") + "\n</script>", html)
html = re.sub(r'(src|href)="(assets/[^"]+)"', lambda m: f'{m.group(1)}="{data_uri(m.group(2))}"', html)
html = re.sub(r"this\.src='(assets/[^']+)'", lambda m: f"this.src='{data_uri(m.group(1))}'", html)

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding="utf-8")
print(f"Wrote {out} ({out.stat().st_size / 1e6:.1f} MB)")
