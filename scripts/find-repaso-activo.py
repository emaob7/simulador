with open('src/data/semana10/questions.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'Áreas valvulares y comportamiento' in line:
        for k in range(max(0, i-25), i+20):
            if '"id":' in lines[k]:
                print("ID:", lines[k].strip())
        print("\nTexto del Repaso Activo:")
        for k in range(i-2, min(len(lines), i+30)):
            print(lines[k], end='')
        break
