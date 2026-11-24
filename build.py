"""
플레어다이브 홈페이지 생성 스크립트

content/text.yml (문구) + content/images.yml (사진) + templates/index.html (틀)
→ _site/index.html 로 합쳐서 완성된 홈페이지를 만듭니다.
GitHub에 저장(Commit)하면 GitHub Actions가 이 스크립트를 자동으로 실행합니다.
"""
import shutil
import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader, StrictUndefined
from markupsafe import Markup, escape

ROOT = Path(__file__).parent
OUT = ROOT / "_site"


def lines(value):
    """제목이 목록이면 줄바꿈(<br>)으로 이어 붙입니다."""
    if isinstance(value, (list, tuple)):
        return Markup("<br>").join(escape(v) for v in value)
    return escape(value)


def load(name):
    with open(ROOT / "content" / name, encoding="utf-8") as f:
        return yaml.safe_load(f)


def main():
    text = load("text.yml")
    images = load("images.yml")

    missing = [
        v["file"] for v in images.values()
        if isinstance(v, dict) and v.get("file") and not (ROOT / "images" / v["file"]).exists()
    ]
    if missing:
        sys.exit("images 폴더에 없는 사진이 있습니다: " + ", ".join(missing))

    env = Environment(
        loader=FileSystemLoader(ROOT / "templates"),
        autoescape=True,
        undefined=StrictUndefined,
        keep_trailing_newline=True,
    )
    env.filters["lines"] = lines
    html = env.get_template("index.html").render(t=text, img=images)

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    (OUT / "index.html").write_text(html, encoding="utf-8")
    for name in ("style.css", "site.js"):
        shutil.copy(ROOT / name, OUT / name)
    shutil.copytree(ROOT / "images", OUT / "images")
    (OUT / ".nojekyll").write_text("")
    print("완성:", OUT / "index.html")


if __name__ == "__main__":
    main()
