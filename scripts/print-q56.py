with open('src/data/semana10/questions.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'semana10_cardio_q56' in line:
        for j in range(i, i + 35):
            print(repr(lines[j]))
        break
