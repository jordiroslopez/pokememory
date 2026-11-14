# 🎮 PokeMemory

PokeMemory es un juego de memoria desarrollado con JavaScript en el que el usuario debe encontrar todas las parejas de Pokémon ocultas en un tablero de cartas.

El proyecto utiliza **Firebase Realtime Database** para gestionar los usuarios y almacenar los resultados de las partidas, y **PokéAPI** para obtener las imágenes de los Pokémon.

## 🎥 Vídeo explicativo

En el siguiente enlace puedes ver un vídeo explicativo del funcionamiento y desarrollo del proyecto:

[▶️ Ver vídeo explicativo de PokeMemory](https://drive.google.com/file/d/1wzM5lt-pkCcw_KQ1_peYhfWuGP-eRlck/view?usp=sharing)

## ✨ Funcionalidades

### 👤 Registro de usuarios
- Registro mediante username y email.
- Comprobación de usuarios existentes mediante el email.
- Actualización del username si el email ya está registrado.
- Almacenamiento del ID del usuario en `sessionStorage`.
- Persistencia de la sesión mientras dure la pestaña del navegador.
- Cierre de sesión mediante el botón Logout.

### 🃏 Juego de memoria
- Selección del número de cartas para cada partida.
- Validación del número de cartas: debe ser entero, positivo y par.
- Generación aleatoria de parejas de Pokémon.
- Identificadores de Pokémon únicos entre parejas.
- Imágenes obtenidas de PokéAPI.
- Animación de giro 3D con dos caras independientes:
  - Cara frontal: Poké Ball.
  - Cara trasera: Pokémon.
- Detección de parejas coincidentes.
- Resaltado de las parejas encontradas.
- Temporizador que registra el tiempo empleado.
- Posibilidad de iniciar nuevas partidas.

### 🏆 Ranking
- Almacenamiento de los resultados en Firebase.
- Visualización del username, email, tiempo y número de cartas.
- Ordenación por número de cartas, de mayor a menor.
- Desempate por tiempo, de menor a mayor.
- Resaltado del último resultado conseguido.
- Visualización limitada de los registros para mantener el ranking compacto.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de la aplicación |
| CSS3 | Diseño, estilos y animaciones 3D |
| JavaScript (ES Modules) | Lógica del juego y gestión de eventos |
| Vite | Entorno de desarrollo y compilación |
| Firebase Realtime Database | Almacenamiento de usuarios y resultados |
| PokéAPI | Obtención de imágenes de Pokémon |
| Fetch API | Comunicación con Firebase mediante peticiones HTTP |

**Nota:** Firebase se utiliza mediante su API REST y el método `fetch`, sin instalar ni utilizar la librería de Firebase.

## 📁 Estructura del proyecto

```text
src/
├── assets/
├── config/
│   └── config.js
├── services/
│   ├── database.js
│   ├── userService.js
│   └── rankingService.js
├── auth/
│   └── auth.js
├── game/
│   ├── timer.js
│   ├── cards.js
│   └── game.js
├── ui/
│   ├── templates.js
│   └── rankingView.js
├── main.js
└── style.css

index.html
package.json
package-lock.json
```

### Organización de los módulos

| Archivo | Responsabilidad |
|---|---|
| `config.js` | Configuración y constantes del proyecto |
| `database.js` | Funciones genéricas para consultar y modificar Firebase |
| `userService.js` | Registro y actualización de usuarios |
| `rankingService.js` | Guardado y consulta de resultados |
| `auth.js` | Gestión del inicio y cierre de sesión |
| `timer.js` | Control del temporizador |
| `cards.js` | Generación, selección y comparación de cartas |
| `game.js` | Gestión del flujo de las partidas |
| `templates.js` | Generación de la interfaz del juego |
| `rankingView.js` | Representación y actualización del ranking |
| `main.js` | Punto de entrada y coordinación de la aplicación |
| `style.css` | Estilos generales y animaciones |

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js.
- npm.
- Un proyecto de Firebase con Realtime Database habilitada.

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Acceder al proyecto

```bash
cd pokememory
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar Firebase

En `src/config/config.js`, configura la URL de tu base de datos:

```js
export const DB_URL = "https://TU-PROYECTO-default-rtdb.REGION.firebasedatabase.app";
```

La base de datos debe disponer de los nodos necesarios para almacenar usuarios y resultados:

- `usuarios`
- `ranking`

El nodo `usuarios` almacena el email y el username de cada usuario.

El nodo `ranking` almacena el ID del usuario, el tiempo empleado y el número de cartas de cada partida.

También es necesario configurar las reglas de lectura y escritura de Realtime Database para permitir las operaciones que realiza la aplicación. En un entorno real deben utilizarse reglas seguras y mecanismos de autenticación adecuados.

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará la dirección local desde la que se puede acceder a la aplicación.

### 6. Generar la versión de producción

```bash
npm run build
```

Para probar la versión compilada:

```bash
npm run preview
```

## 🔌 APIs utilizadas

- **[Firebase Realtime Database REST API](https://firebase.google.com/docs/database/rest/start):** permite consultar, crear y actualizar registros mediante peticiones HTTP.
- **[PokéAPI](https://pokeapi.co/):** proporciona los recursos e imágenes de los Pokémon utilizados en las cartas.

## 🎯 Objetivo del proyecto

Este proyecto forma parte de una práctica de JavaScript y tiene como objetivo aplicar conocimientos sobre:

- Manipulación del DOM.
- Eventos y formularios HTML.
- Validación de datos.
- Arrays y generación de números aleatorios.
- Programación modular mediante ES Modules.
- Peticiones HTTP con `fetch`.
- Consumo de APIs externas.
- Gestión de sesiones mediante `sessionStorage`.
- Temporizadores con `setInterval`.
- Animaciones y transformaciones CSS.
- Almacenamiento de datos en Firebase Realtime Database.

---

Desarrollado como proyecto práctico de JavaScript.
