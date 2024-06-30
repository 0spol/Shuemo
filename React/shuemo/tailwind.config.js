/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        fondo: {
          100: "#010409", // Fondo muy oscuro
          200: "#0d1117", // Fondo ligeramente más claro
          300: "#161b22"  // Fondo más claro, aún oscuro
        },
        borde: {
          100: "#30363d"  // Color de borde
        },
        brillante: {
          100: "#007bff"  // Color brillante para enlaces y botones
        },
        boton: {
          100: "#4862bd", // Color de botón primario
          200: "#4d6bd1"  // Color de botón al pasar el mouse
        },
        // Colores adicionales de la interfaz oscura de GitHub
        negro: {
          100: "#0d1117", // Fondo principal
          200: "#161b22", // Fondo secundario
          300: "#21262d", // Fondo de elementos terciarios
          400: "#30363d", // Borde
          500: "#484f58", // Texto secundario
          600: "#6e7681", // Texto terciario
        },
        blanco: {
          100: "#c9d1d9", // Texto principal
          200: "#f0f6fc", // Texto brillante
        },
        azul: {
          100: "#1f6feb", // Enlaces
          200: "#58a6ff", // Enlaces al pasar el mouse
        },
        verde: {
          100: "#2ea043", // Éxito
          200: "#3fb950", // Éxito al pasar el mouse
        },
        rojo: {
          100: "#d73a49", // Error
          200: "#f85149", // Error al pasar el mouse
        },
        amarillo: {
          100: "#dbab09", // Advertencia
          200: "#f4bf4f", // Advertencia al pasar el mouse
        }
      },
      height: {
        "200": "200px",
        "tarjeta": "500px",
      },
      width:{
        "300":"300px",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
