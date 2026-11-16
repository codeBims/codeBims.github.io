"""Check public HTML links, anchors, assets and unique IDs using only Python's stdlib."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from collections import Counter
import re

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.refs, self.transitions, self.scripts = path, [], [], [], []
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script' and attrs.get('src'): self.scripts.append(Path(urlsplit(attrs['src']).path).name)
        if attrs.get('id'): self.ids.append(attrs['id'])
        self.transitions.extend(re.findall(r'view-transition-name:\s*([\w-]+)', attrs.get('style', '')))
        for key in ('href', 'src', 'poster', 'data-full-src', 'data-chapter-image'):
            if attrs.get(key): self.refs.append(attrs[key])
        for part in attrs.get('srcset', '').split(','):
            if part.strip(): self.refs.append(part.strip().split()[0])

pages = {p.resolve(): Page(p) for p in [ROOT/'index.html', *(ROOT/'projects').glob('*.html')]}
errors = []
for path, page in pages.items():
    if 'app.js' in page.scripts:
        for dependency in ('effects-policy.js', 'motion-models.js'):
            if dependency not in page.scripts or page.scripts.index(dependency) > page.scripts.index('app.js'):
                errors.append(f'{path.name}: {dependency} must load before app.js')
    for value, count in Counter(page.ids).items():
        if count > 1: errors.append(f'{path.name}: duplicate ID {value}')
    for value, count in Counter(page.transitions).items():
        if count > 1: errors.append(f'{path.name}: duplicate shared element {value}')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if not target.is_relative_to(ROOT): errors.append(f'{path.name}: outside site: {ref}')
        elif not target.exists(): errors.append(f'{path.name}: missing {ref}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{path.name}: missing anchor {ref}')
assert not errors, '\n'.join(errors)
print(f'PASS: {len(pages)} HTML pages; local assets/anchors, unique IDs, shared elements and script dependency order.')
