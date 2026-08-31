import glob

for p in glob.glob('src/data/**/questions.ts', recursive=True):
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    if '\r' in content:
        # replace CRLF with LF, and lone CR with LF
        clean = content.replace('\r\n', '\n').replace('\r', '\n')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(clean)
        print(f"Limpio: {p}")
