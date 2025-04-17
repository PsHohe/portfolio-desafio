# Portafolio de Sandrino Escobar

Este proyecto es un portafolio personal creado con Astro, en el estilo de un terminal de línea de comandos (CLI). El diseño simula una interfaz de terminal con animaciones de escritura, barras de habilidades estilo CLI, y navegación interactiva que emula comandos de consola.

Este portfolio se encuentra actualmente desplegado en:
[https://portfolio.pssandrinoescobar.cl](https://portfolio.pssandrinoescobar.cl)

## 🚀 Tecnologías Utilizadas

- [Astro](https://astro.build/) - Framework web para sitios estáticos
- [React](https://reactjs.org/) - Para componentes interactivos
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilos

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/) (recomendado)

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ver lista de fuentes ASCII disponibles
npm run list-fonts
```

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/portfolio-desafio.git
   cd portfolio-desafio
   ```

2. Instala las dependencias:
   ```bash
   # Con npm
   npm install

   # O con pnpm (recomendado)
   pnpm install
   ```

## 🖥️ Ejecución del Proyecto

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo con hot reload:

```bash
# Con npm
npm run dev

# O con pnpm
pnpm dev
```

El sitio estará disponible en `http://localhost:4321` (asumiendo que el puerto no esté en uso)

### Compilación para Producción

Para construir el proyecto para producción:

```bash
# Con npm
npm run build

# O con pnpm
pnpm build
```

Los archivos compilados se generarán en el directorio `dist/`.

### Vista Previa de Producción

Para previsualizar la versión de producción localmente:

```bash
# Con npm
npm run preview

# O con pnpm
pnpm preview
```

## 📁 Estructura del Proyecto

```
/
├── config/            # Archivos de configuración
│   ├── projects.yml   # Datos de proyectos en formato YAML
│   └── personal.yml   # Datos personales y configuración de ASCII art en formato YAML
├── public/            # Archivos estáticos
│   └── images/        # Imágenes del proyecto
├── src/
│   ├── components/    # Componentes Astro y React
│   ├── layouts/       # Plantillas de página
│   ├── pages/         # Páginas del sitio
│   ├── styles/        # Estilos CSS
│   └── utils/         # Utilidades y funciones auxiliares
└── package.json       # Dependencias y scripts
```

## 🎨 Características

- Diseño inspirado en terminal CLI
- Animaciones de escritura tipo consola
- Navegación interactiva con comandos
- Interfaz responsiva
- Datos de proyectos y personales fácilmente editables en archivos YAML
- ASCII art generado dinámicamente en tiempo de compilación

### Configuración de ASCII Art

El ASCII art del título se genera dinámicamente durante la compilación utilizando la biblioteca `figlet`. Puedes personalizar el texto y la fuente en el archivo `config/personal.yml`:

```yaml
ascii-art:
  text: "Tu Texto"
  font: "Standard"
```

Para ver todas las fuentes disponibles, ejecuta:

```bash
npm run list-fonts
```

