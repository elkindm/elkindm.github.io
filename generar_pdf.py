"""Genera el PDF descargable desde cv.html."""
import subprocess
from pathlib import Path

BASE = Path(__file__).parent
HTML = BASE / "cv.html"
PDF = BASE / "assets" / "Elkin_Duran_Moreno_HV.pdf"
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"


def main():
    PDF.parent.mkdir(parents=True, exist_ok=True)
    url = HTML.resolve().as_uri()
    cmd = [
        EDGE,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={PDF.resolve()}",
        url,
    ]
    subprocess.run(cmd, check=True)
    print(f"PDF generado: {PDF} ({PDF.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
