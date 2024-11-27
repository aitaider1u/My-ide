// src/features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

// Active le support pour Map et Set
enableMapSet();

const files = [
  {
    id: "1",
    name: "index.html",
    isOpen: true,
    type: "html",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zinou's Editor</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 id="welcome-text"></h1>
        <p class="subtitle">Bienvenu dans <span class="highlight">Zinou's Editor</span></p>
        <div class="links">
            <a href="https://fr.linkedin.com/in/zin%C3%A9dine-ait-aider-654b241b8" target="_blank" class="link">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" class="icon">
                LinkedIn
            </a>
            <a href="https://www.instagram.com/zinou_is_coding/" target="_blank" class="link">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="icon">
                Instagram
            </a>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: "2",
    name: "styles.css",
    isOpen: false,
    type: "css",
    code: `body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
    color: #fff;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    text-align: center;
    animation: fadeIn 1.5s ease-in-out;
}

h1 {
    font-size: 3rem;
    margin: 0;
    opacity: 0;
    display: inline-block;
}

.subtitle {
    margin: 20px 0;
    font-size: 1.5rem;
    color: #ffd700;
}

.highlight {
    color: #ffffff;
    font-weight: bold;
}

.links {
    margin-top: 30px;
}

.link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
    border-radius: 30px;
    margin: 0 10px;
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    transition: transform 0.2s ease, background 0.3s ease;
}

.link:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
}

.icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`,
  },
  {
    id: "3",
    name: "script.js",
    isOpen: false,
    type: "js",
    code: `const text = "Salut, bienvenue dans Zinou's Editor !";
const textElement = document.getElementById("welcome-text");

let index = 0;

function typeText() {
    if (index < text.length) {
        textElement.textContent += text[index];
        textElement.style.opacity = 1; // Set visible during animation
        index++;
        setTimeout(typeText, 100); // Delay for typing effect
    }
}

// Start typing animation
document.addEventListener("DOMContentLoaded", () => {
    typeText();
});`,
  },
];



const codeSlice = createSlice({
  name: 'code-slice',
  initialState: {
    value: files,
    currentFile: "1",
    filesQueue: ["1"], // Utilisez un tableau au lieu d'un Set
    showIframe : false 
  },
  reducers: {
    updateFile: (state, action) => {
      const { id, newCode } = action.payload;
      const file = state.value.find((file) => file.id === id);
      if (file) {
        file.code = newCode; // Mise à jour du code du fichier trouvé
      }
    },
    closeFile: (state, action) => {
      const file = state.value.find((file) => file.id === action.payload);
      if (file) {
          file.isOpen = false;
  
          // Supprime l'ID de la queue
          state.filesQueue = state.filesQueue.filter((id) => id !== file.id);
  
          // Met à jour le fichier actif
          if (state.filesQueue.length > 0) {
              state.currentFile = state.filesQueue[state.filesQueue.length - 1];
          } else {
              state.currentFile = null;
          }
      }
    },
    openFile: (state, action) => {
      const file = state.value.find((file) => file.id === action.payload);
      if (file) {
          file.isOpen = true;
          state.currentFile = file.id;
  
          // Ajoute uniquement si l'ID n'est pas déjà présent
          if (!state.filesQueue.includes(file.id)) {
              state.filesQueue.push(file.id);
          }
      }
  }
  ,
    updateCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
    toggleShowIframe: (state) => {
      state.showIframe = !state.showIframe;
    },
  }
});

export const { updateFile, updateCurrentFile,closeFile,openFile, toggleShowIframe} = codeSlice.actions;
export default codeSlice.reducer;