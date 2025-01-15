# Proyecto Backend con Node.js y Express

Este proyecto es una API RESTful para manejar un sistema de productos, carritos de compras y usuarios con autenticación mediante JWT. Está construido con **Node.js**, **Express**, **MongoDB** y **Handlebars** para la interfaz visual.

## Características Principales

- **CRUD de Productos:** Gestiona productos con rutas para listar, crear, actualizar y eliminar.
- **Manejo de Carritos:** Rutas para agregar productos al carrito y consultar su contenido.
- **Autenticación de Usuarios:**
  - Registro y login de usuarios.
  - Contraseñas encriptadas con **bcrypt**.
  - Autenticación basada en **JWT**.
- **Middleware de Autorización:** Validación de roles y acceso basado en tokens JWT.
- **Conexión a MongoDB:** Manejo de persistencia con Mongoose.
- **Interfaz visual:** Utiliza Handlebars para algunas vistas dinámicas.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Base de Datos:** MongoDB (Mongoose ODM)
- **Autenticación:** Passport.js, JWT
- **Encriptación:** bcrypt
- **Vistas:** Handlebars

## Instalación y Configuración

### Requisitos Previos

- Node.js (v14 o superior)
- MongoDB Atlas o servidor local de MongoDB

### Pasos para Ejecutar el Proyecto

1. **Clona este repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3000
   MONGODB_URI=<TU_URI_DE_MONGODB>
   JWT_SECRET=<TU_SECRET_KEY>
   ```

4. **Inicia el servidor:**

   ```bash
   npm start
   ```

5. **Accede a la aplicación:**

   - API disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
├── src/
   ├── controllers/
   │   └── sessionController.js
   ├── middlewares/
   │   └── auth.js
   ├── models/
   │   ├── User.js
   │   ├── Product.js
   │   └── Cart.js
   ├── routes/
   │   ├── productRoutes.js
   │   ├── cartRoutes.js
   │   └── sessions.js
   ├── utils/
   │   └── password.js
   ├── config/
   │   └── passport.js
   └── app.js
```

## Endpoints Principales

### Productos (`/api/products`)

- **GET** `/`: Lista todos los productos.
- **POST** `/`: Agrega un nuevo producto.
- **PUT** `/:id`: Actualiza un producto.
- **DELETE** `/:id`: Elimina un producto.

### Carritos (`/api/carts`)

- **POST** `/`: Crea un nuevo carrito.
- **GET** `/:id`: Obtiene los productos de un carrito.
- **POST** `/:id/product/:productId`: Agrega un producto al carrito.

### Usuarios (`/api/sessions`)

- **POST** `/login`: Inicia sesión y devuelve un JWT.
- **GET** `/current`: Devuelve los datos del usuario autenticado (requiere autenticación).

## Próximas Mejoras

- Implementar pruebas automatizadas.
- Mejorar la interfaz visual con React o Vue.js.
- Agregar roles de administrador para gestionar productos y usuarios.

## Contribuciones

Si deseas contribuir, por favor, abre un issue o envía un pull request.



