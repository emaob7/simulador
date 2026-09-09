<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/90b0667a-e023-4414-9c0b-404a21a4522a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Usuarios y Firebase

La app usa el proyecto `simulator-5ff8c` y la base Firestore `(default)`.
La pantalla Usuarios lista los documentos de `users`, no directamente las
cuentas de Authentication. Al iniciar o restaurar una sesión con Google,
se crea el perfil faltante con los seis campos admitidos por `firestore.rules`.
Los perfiles existentes conservan su rol y aprobación.

Los usuarios nuevos se registran como `aspirante`, con `isApproved: false`.
Para habilitar el primer administrador, una persona con acceso autorizado a
Firebase Console debe editar su documento `users/<UID>` y establecer
`role: "admin"` e `isApproved: true`. El correo por sí solo no otorga ese rol.
Los administradores existentes pueden aprobar alumnos desde Usuarios.

Después de publicar la corrección, los alumnos cuyo perfil faltaba deben volver
a abrir la app; el administrador puede pulsar **Actualizar usuarios**.
El modo invitado no crea una cuenta ni un perfil en Firebase.

Pruebas del registro: `npx vitest run src/services/AuthService.test.ts`.
