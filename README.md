# 🚀 Full-Stack CRUD de Productos | Next.js & MySQL

Este es un proyecto **Full-Stack CRUD (Crear, Leer, Actualizar, Eliminar)** para gestionar productos. Está construido con **Next.js** (App Router) y utiliza **MySQL** como base de datos, con manejo de imágenes guardadas localmente.

---

## 🌐 ¡Prueba el proyecto en vivo!

👉 **<a href="https://crud-nextjs-rose.vercel.app/" target="_blank">ACCEDER AL DEMO ONLINE AQUÍ</a>** 👈

> **⚠️ Nota importante sobre el Demo en Vercel:** Este proyecto utiliza el módulo `fs` (File System) de Node.js para guardar las imágenes localmente. Debido a que Vercel utiliza un entorno *Serverless* de solo lectura, la función de subir nuevas imágenes o modificar las existentes está limitada en el entorno de producción, pero **funciona perfectamente al ejecutar el proyecto en modo local**.

---

## 💻 Stack Tecnológico

| Categoría | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Frontend/Framework** | **Next.js** (App Router) | Framework de React con Server Components y Server-Side Rendering (SSR). |
| **Estilos** | **Tailwind CSS** | Utilizado para un diseño moderno y minimalista (Dark Mode). |
| **Base de Datos** | **MySQL** | Almacenamiento persistente de datos de productos. |
| **Comunicaciones** | **Axios** | Cliente HTTP para las peticiones API. |
| **Almacenamiento** | **Node.js `fs`** | Manejo de subida, reemplazo y eliminación de imágenes en el servidor local. |

---

## 📂 Características del CRUD

* **Crear (Create):** Agregar nuevos productos con nombre, precio, descripción e imagen.
* **Leer (Read):** Visualización de todos los productos en formato de tarjeta (Grid).
* **Actualizar (Update):** Edición de detalles del producto, incluyendo la sustitución de la imagen antigua por una nueva.
* **Eliminar (Delete):** Borrado del registro en la base de datos y eliminación del archivo de imagen local asociado.

---

## 🖼️ Vistas del Proyecto

### 🏠 Listado de Productos
Página principal que muestra todos los productos.
![Seccion de home](./img/home.png)

### ➕ Agregar Nuevo Producto
Formulario para la creación de un nuevo registro y subida de la imagen.
![Seccion de productos](./img/add.png)

### 📝 Detalle y Edición
Página que muestra el detalle completo y permite editar o eliminar el producto.
![Seccion de Proveedores](./img/edit.png)

---

## ⚙️ Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local.

### 1. Requisitos
Asegúrate de tener instalado:
* **Node.js** (v18+)
* **MySQL Server** en ejecución.

### 2. Configuración de la Base de Datos y Variables de Entorno

1. **Crea la base de datos** y la tabla. El script SQL necesario se encuentra en la ruta:
   ```bash
   ./database/db.sql
   ```
2. **Crea un archivo `.env`** en la raíz del proyecto y agrega tus credenciales de MySQL:
   ```env
   MYSQL_HOST="localhost"
   MYSQL_USER="root"
   MYSQL_PASSWORD="tu_password"
   MYSQL_PORT=3306
   MYSQL_DATABASE="nombre_de_tu_db"
   ```

### 3. Instalación y Ejecución

1. **Clona el Repositorio:**
   ```bash
   git clone [https://github.com/elmerrondon/crud-nextjs.git](https://github.com/elmerrondon/crud-nextjs.git)
   cd crud-nextjs
   ```

2. **Instala las Dependencias:**
   ```bash
   npm install
   ```

3. **Inicia la Aplicación en Modo Desarrollo:**
   ```bash
   npm run dev
   ```

El proyecto se abrirá en tu navegador en `http://localhost:3000`.

---

## 🚀 Despliegue (Build)

Para generar la versión optimizada de producción (Server-Side Rendering y API Routes):

```bash
npm run build
```
