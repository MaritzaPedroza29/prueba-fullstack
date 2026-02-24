como funciona el proyecto de manera local

 Paso 1: Instalar los softwares necesarios
Antes de empezar, asegúrate de tener instalados:
- Visual Studio Code → editor de código.
- Node.js → entorno para ejecutar JavaScript/TypeScript.
- npm (se instala junto con Node.js) → gestor de paquetes.
- PostgreSQL → base de datos.
- Git → para clonar el repositorio.
Verifica con estos comandos:
node -v
npm -v
git --version
psql --version



Paso 2: Clonar el proyecto
Abre una consola y ejecuta:
git clone "https://github.com/MaritzaPedroza29/prueba-fullstack"
cd prueba-fullstack


Esto descargará el código en tu PC.

Paso 3: Abrir el proyecto en VS Code
- Abre Visual Studio Code.
- Ve a Archivo → Abrir carpeta.
- Selecciona la carpeta prueba-fullstack que se clonó (normalmente en C:/Users/TuUsuario/prueba-fullstack).

Paso 4: Instalar librerías
En la terminal integrada de VS Code, ejecuta:
npm install


Esto descargará todas las dependencias (Next.js, Prisma, BetterAuth, etc.).

Paso 5: Configurar GitHub OAuth
- Ve a GitHub → Configuración → Developer settings → OAuth Apps.
- Crea una nueva aplicación OAuth:
- Nombre: el que quieras.
- Descripción: opcional.
- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/auth/callback/github
- Copia el Client ID y el Client Secret que te da GitHub.

Paso 6: Crear archivo .env
En la raíz del proyecto, crea un archivo llamado .env con este contenido:
# Credenciales de GitHub OAuth
GITHUB_CLIENT_ID=tu-client-id
GITHUB_CLIENT_SECRET=tu-client-secret

# Base de datos local
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/finance_db"

# Configuración de BetterAuth
BETTER_AUTH_BASE_URL="http://localhost:3000"
BETTER_AUTH_SECRET="una_llave_secreta_larga_y_segura"

# URL pública para el cliente
NEXT_PUBLIC_BASE_URL="http://localhost:3000"


Notas:
- Cambia tu_contraseña por la contraseña que configuraste en Postgres.
- finance_db es el nombre de la base de datos, puedes cambiarlo si quieres.
- BETTER_AUTH_SECRET debe ser una cadena larga y segura (puedes generarla con passwordsgenerator.net).

Paso 7: Configurar Prisma
- Genera el cliente de Prisma:
npx prisma generate
- Aplica migraciones para crear las tablas:
npx prisma migrate dev


Esto creará tu esquema en la base de datos finance_db.

Paso 8: Levantar el servidor
Ejecuta:
npm run dev


Esto arranca tu aplicación en http://localhost:3000.

Paso 9: Probar el flujo
- Abre http://localhost:3000 en tu navegador.
- Haz login con GitHub.
- Se creará tu usuario en la base de datos y se le asignará rol ADMIN.
- Como ADMIN podrás:
- Crear movimientos y verlos(Ingresos/Egresos).
- Ver reportes (/api/reports).
- Descargar un reporte
- Editar Y Ver usuarios (/api/users).
- Consultar documentación en Swagger UI (/api/docs).


como funciona el proyecto en verce
Paso 1: Subir cambios a GitHub

Cada vez que modifiques algo:

git add .
git commit -m "mensaje"
git push

Paso 2: Crear proyecto en Vercel

-Ir a https://vercel.com

-Import Project o crear Project
-seleccionar github para iniciar sesion
-Seleccionar tu repo prueba-fullstack
-Deploy

Vercel automáticamente hace:

npm install
npm run build

Paso 3: Crear Base de Datos en la nube

Como tu base era local, necesitas una nueva.

En Vercel:

Storage → Create Database → Prisma Postgres

Copiar el DATABASE_URL.

Paso 4: Configurar Variables de Entorno en Vercel

Ir a:

Project → Settings → Environment Variables

Agregar:

DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=la_misma_que_local
BETTER_AUTH_URL=https://prueba-fullstack-gamma.vercel.app
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
NEXT_PUBLIC_BASE_URL=https://prueba-fullstack-gamma.vercel.app

Muy importante:
Debe ser el dominio que dice Production en Vercel.


Paso 5: Ajustar OAuth para Producción

Volver a GitHub OAuth App y agregar:

Homepage URL

https://prueba-fullstack-gamma.vercel.app

Authorization callback URL

https://prueba-fullstack-gamma.vercel.app/api/auth/callback/github

No usar dominios preview raros.


Paso 6: Configurar Prisma para producción

En tu package.json asegúrate de tener:

"scripts": {
  "build": "prisma generate && prisma migrate deploy && next build",
  "postinstall": "prisma generate"
}

En producción NO se usa:

prisma migrate dev 

Se usa:

prisma migrate deploy 


Paso 7: Redeploy

Haz:

git commit --allow-empty -m "redeploy"
git push

Vercel volverá a construir el proyecto.


