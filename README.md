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

