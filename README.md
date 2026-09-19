# Simulador CONAREM — Dr. Rodney

Aplicación React/TypeScript para prácticas y simulacros de las semanas CONAREM.

La única carpeta local de trabajo es:

`C:\Users\Rodney Duarte\Documents\Aplicaciones CONAREM\Simulator`

La copia situada en `Documents\APPS\Simulator` se conserva únicamente como respaldo histórico y no debe recibir cambios.

## Desarrollo

El gestor de paquetes oficial es **npm**. `package-lock.json` es el único lockfile mantenido.

```powershell
npm install
npm run dev
npm run lint
npm run validate:catalog
npm run build
```

El build ejecuta primero el validador permanente de las 2.618 preguntas. La sincronización de Obsidian funciona en modo simulación por defecto; requiere `--apply` para escribir y crea un respaldo fechado.

```powershell
npm run sync:obsidian -- --weeks=19,20
npm run sync:obsidian -- --weeks=19,20 --apply
```

Consultá [CONTEXTO.md](./CONTEXTO.md) antes de modificar el banco y su sección 10 para las reglas de calidad y barajado.
