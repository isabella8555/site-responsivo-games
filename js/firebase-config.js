import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACUVnXqjS7qBE7OLmrHWurKxBc_nlYA1o",
  authDomain: "projeto-b1c8b.firebaseapp.com",
  projectId: "projeto-b1c8b",
  storageBucket: "projeto-b1c8b.firebasestorage.app",
  messagingSenderId: "1034343334315",
  appId: "1:1034343334315:web:8b8d2ea20864defaf052ee",
  measurementId: "G-H18CCSXR41"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Função que faz o Login
function login() {
    const email = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (!email || !pass) {
        alert("Preencha todos os campos!");
        return;
    }

    console.log("Tentando logar com:", email);

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            console.log("Logado com sucesso!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Erro no Firebase:", error.code);
            alert("Erro ao entrar: " + error.message);
        });
}

// Função que manda para a tela de cadastro
function mostrarCadastro() {
    window.location.href = "cadastro.html";
}

// Ativa os botões assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const btnCadastro = document.getElementById('btn-mostrar-cadastro');

    if (btnEntrar) btnEntrar.addEventListener('click', login);
    if (btnCadastro) btnCadastro.addEventListener('click', mostrarCadastro);
});