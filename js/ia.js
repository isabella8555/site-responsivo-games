    const baseConhecimento = {
        "oi": "Olá! Bem-vindo à Macedo Store. Como posso ajudar?",
        "olá": "Olá! Bem-vindo à Macedo Store.",
        "quem criou o site": "A Macedo Store foi criada por Isabella Macedo.",
        "qual o nome do site": "O nome do site é Macedo Store.",
        "como baixar": "Clique no botão de download do jogo desejado.",
        "download": "Selecione um jogo e clique no ícone de download.",
        "qual a nota dos jogos": "A maioria dos jogos exibidos possui avaliação 4.7 estrelas.",
        "contato": "Em breve a seção Contact Us estará disponível.",
        "obrigado": "Eu que agradeço!"
    };

    const jogos = [
        "Cyberpunk 2077",
        "Battlefield 2042",
        "Assassin's Creed",
        "Ghost of Tsushima",
        "GTA V",
        "Dying Light 2",
        "Halo Infinite",
        "Resident Evil Village",
        "Subway Surfers",
        "Call of Duty Mobile",
        "Free Guy",
        "Clash Royale",
        "Minecraft",
        "PUBG",
        "Fortnite",
        "Marvel Contest of Champions"
    ];

    function responderIA(pergunta) {
        pergunta = pergunta.toLowerCase();

        // Perguntas sobre jogos
        if (
            pergunta.includes("quais jogos") ||
            pergunta.includes("que jogos") ||
            pergunta.includes("jogos") ||
            pergunta.includes("games")
        ) {
            return "Atualmente temos: " + jogos.join(", ");
        }

        // Procurar jogo específico
        for (let jogo of jogos) {
            if (pergunta.includes(jogo.toLowerCase())) {
                return `${jogo} está disponível na Macedo Store.`;
            }
        }

        // Respostas cadastradas
        for (let chave in baseConhecimento) {
            if (pergunta.includes(chave)) {
                return baseConhecimento[chave];
            }
        }

        // Perguntas sobre o site
        if (
            pergunta.includes("site") ||
            pergunta.includes("macedo") ||
            pergunta.includes("loja")
        ) {
            return "Sou a assistente da Macedo Store. Posso responder perguntas sobre jogos, downloads e informações do site.";
        }

        return "Desculpe, só posso responder perguntas relacionadas à Macedo Store.";
    }

    async function enviarPergunta() {
        const input = document.getElementById("pergunta");
        const mensagens = document.getElementById("chat-mensagens");

        const pergunta = input.value.trim();

        if (!pergunta) return;

        // Adiciona visualmente
        mensagens.innerHTML += `<div class="usuario">${pergunta}</div>`;

        const resposta = responderIA(pergunta);
        animarAvatar(3500);

        mensagens.innerHTML += `<div class="bot">${resposta}</div>`;

        // SALVAR NO FIREBASE (Firestore)
        try {
            const user = auth.currentUser;
            await db.collection("conversas").add({
                usuario: user ? user.email : "anonimo",
                pergunta: pergunta,
                resposta: resposta,
                data: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error("Erro ao salvar no banco:", error);
        }

        input.value = "";
        mensagens.scrollTop = mensagens.scrollHeight;
    }

    window.onload = () => {
        const mensagens = document.getElementById("chat-mensagens");

        mensagens.innerHTML = `
            <div class="bot">
                Olá! Eu sou a assistente da Macedo Store. Pergunte sobre jogos, downloads ou sobre o site.
            </div>
        `;
    };

    document.addEventListener("DOMContentLoaded", () => {
        const input = document.getElementById("pergunta");

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                enviarPergunta();
            }
        });
    });


    // ==========================================
    // FUNÇÕES DE CONTROLE DO AVATAR ANIMADO
    // ==========================================
function toggleChat() {
    const chatbot = document.querySelector(".chatbot");
    const avatar = document.getElementById("avatarIA");

    chatbot.classList.toggle("active");

    const aberto = chatbot.classList.contains("active");

    if (aberto) {
        animarAvatar(4000); 
    } else {
        if (window.avatarTimeout) {
            clearTimeout(window.avatarTimeout);
        }
        avatar.src = "img/avatar-estatico.png";
    }
}
    // Função que troca a foto pelo GIF e depois volta ao normal
    function animarAvatar(tempo = 3000) {
        const avatar = document.getElementById("avatarIA");
        
        // Troca para o seu novo GIF animado
        avatar.src = 'img/avatar-animado.gif';
        
        // Cancela o timer se o usuário digitar muito rápido
        if (window.avatarTimeout) {
            clearTimeout(window.avatarTimeout);
        }
        
        // Volta a ficar parado depois do tempo definido
        window.avatarTimeout = setTimeout(() => {
            const chatbot = document.querySelector(".chatbot");
            // Só reseta se o chat ainda estiver aberto
            if (chatbot.classList.contains("active")) {
                avatar.src = 'img/avatar-estatico.png';
            }
        }, tempo);
    }







    let usuario = localStorage.getItem("usuario");

if (!usuario) {
    usuario = "anon";
}