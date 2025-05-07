## PASOS PARA EJECUTAR EL REPOSITORIO: Proyecto_02_SIS_INFO_III
## NOTA EN CASO DE EXISTIR CAMBIOS EN LA RAMA PRINCIPAL MAIN HACER PULL
1. Clonar el proyecto:

   git clone https://github.com/UhAhUhAhAhGg/Proyecto_02_SIS_INFO_III.git

3. Abrir el proyecto en Visual Studio o editor de código de su preferencia.
4. Ejecutar "Frontend"

- **Frontend:** Dirigirse a la terminal de la carpeta `Frontend`  
  ```
  cd Frontend
  npm install
  npm run serve
  ```
6. Previo a Ejecutar el "Backend" Establecer Primero la conexion a la Base de Datos.
   1. Abrir XAMMP
   2. Prender servidores de Apache y MySQL.
   3. Crear una base de datos de igual nombre que el archivo `usuariosdb`
   4. Ingresar a la base de datos creada.
   5. Crear su tabla. Ejecutando el contenido del archivo `usuariosdb.sql`


- **NOTA: Antes de ejecutar el Backend Siempre Prender Apache y MySQL en XAMMP una vez creada la base y tablas respectivas**

  
8. Ejecutar "Backend": Abrir terminal dentro del proyecto o interfaz de línea de comandos de su preferencia.

- **Backend:** Abrir otra terminal y dirigirse a la carpeta `Backend`  
  ```
  cd Backend
  node server.js
  ```
