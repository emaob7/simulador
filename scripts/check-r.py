import glob

for w in range(1, 19):
    path = f"src/data/semana{w}/questions.ts"
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
        r_count = c.count('\\r')
        if r_count > 0:
            print(f"Semana {w}: {r_count} instancias de \\r")
