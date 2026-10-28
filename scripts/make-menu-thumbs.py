#!/usr/bin/env python3
"""Generate square thumbnails for the /menu rows from the 900px photos.

Why: .menuitem__thumb renders at 3.4rem (~54px) but the source photos are
900x900 (avg 68 KB). Serving them raw means ~6 MB per /menu visit — on a
phone connection most of them never finish loading, so the row shows an
empty sand-coloured tile.

Two things happen here:
  1. resize to 160px  -> ~3 KB per file, ~280 KB for all 91
  2. auto-crop to the subject -> the product photos are shot on a wide
     backdrop, so a naive centre-crop leaves the object occupying ~20% of a
     54px tile and it reads as "no image". Flood-filling the backdrop from
     the edges and cropping to what's left makes the object fill the tile.

Usage (from repo root, Python with Pillow):
    python3 scripts/make-menu-thumbs.py

Output: public/assets/menu-items/thumbs/<same-name>.jpg
"""

import os
import sys
from collections import deque

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "assets", "menu-items")
DST = os.path.join(SRC, "thumbs")
SIZE = 160

# Deteksi latar: piksel tepi yang "terang" (produk difoto di backdrop putih/krem).
BG_TOL = 26  # toleransi jarak per kanal saat flood-fill
BG_BRIGHT = 120  # latar harus seterang ini; objek gelap tidak ikut termakan
PAD = 0.05  # sisa ruang di sekeliling objek (5% tiap sisi)


def subject_box(im: Image.Image):
    """bbox subjek dalam koordinat gambar asli, atau None kalau latar tak terbaca."""
    probe = 128
    small = im.convert("RGB").resize((probe, probe), Image.LANCZOS)
    px = small.load()
    bg = [[False] * probe for _ in range(probe)]
    q = deque()
    for x in range(probe):
        q.append((x, 0))
        q.append((x, probe - 1))
    for y in range(probe):
        q.append((0, y))
        q.append((probe - 1, y))

    def near(a, b):
        return (
            abs(a[0] - b[0]) <= BG_TOL
            and abs(a[1] - b[1]) <= BG_TOL
            and abs(a[2] - b[2]) <= BG_TOL
        )

    while q:
        x, y = q.popleft()
        if bg[y][x]:
            continue
        c = px[x, y]
        if (c[0] + c[1] + c[2]) / 3 < BG_BRIGHT:
            continue
        bg[y][x] = True
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < probe and 0 <= ny < probe and not bg[ny][nx] and near(px[nx, ny], c):
                q.append((nx, ny))

    xs = [x for y in range(probe) for x in range(probe) if not bg[y][x]]
    ys = [y for y in range(probe) for x in range(probe) if not bg[y][x]]
    if not xs or not ys:
        return None

    # kalau "subjek" ternyata hampir seluruh frame, latarnya gagal terdeteksi
    if len(xs) / (probe * probe) > 0.92:
        return None

    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    w, h = im.size
    fx, fy = w / probe, h / probe
    x0, y0, x1, y1 = x0 * fx, y0 * fy, (x1 + 1) * fx, (y1 + 1) * fy

    # jaga tetap persegi di sekitar pusat objek
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    side = max(x1 - x0, y1 - y0) * (1 + PAD * 2)
    side = min(side, w, h)
    left = max(0, min(cx - side / 2, w - side))
    top = max(0, min(cy - side / 2, h - side))
    return (int(left), int(top), int(left + side), int(top + side))


def main() -> int:
    if not os.path.isdir(SRC):
        print(f"source not found: {SRC}")
        return 1
    os.makedirs(DST, exist_ok=True)

    before = after = 0
    made = cropped = 0
    for name in sorted(os.listdir(SRC)):
        path = os.path.join(SRC, name)
        if not os.path.isfile(path) or not name.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        before += os.path.getsize(path)

        im = Image.open(path).convert("RGB")
        box = subject_box(im)
        if box:
            im = im.crop(box)
            cropped += 1
        else:
            w, h = im.size
            s = min(w, h)  # fallback: centre-crop
            im = im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2))

        im = im.resize((SIZE, SIZE), Image.LANCZOS)
        out = os.path.join(DST, os.path.splitext(name)[0] + ".jpg")
        im.save(out, "JPEG", quality=80, optimize=True, progressive=True)
        after += os.path.getsize(out)
        made += 1

    if not made:
        print("no source images found")
        return 1

    print(
        f"{made} thumbnails ({cropped} auto-cropped) | source {before / 1024 / 1024:.2f} MB -> "
        f"{after / 1024:.0f} KB (avg {after / made / 1024:.1f} KB)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
