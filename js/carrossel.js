// ===============================
// ELEMENTOS
// ===============================
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".god-card");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const startBtn = document.querySelector(".btn-primary");

const godName = document.getElementById("god-name");
const godText = document.getElementById("god-text");

// Painel do personagem
const characterPanel = document.getElementById("characterPanel");
const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");
const characterClass = document.getElementById("characterClass");
const characterRole = document.getElementById("characterRole");
const characterSummary = document.getElementById("characterSummary");

// Lista de habilidades (estava faltando no seu JS original)
const abilitiesList = document.getElementById("abilitiesList");

// ===============================
// DADOS
// ===============================
const gods = [
  {
    name: "Tupã",
    class: "Mago",
    role: "Dano em área",
    summary: "Especialista em eliminar grandes grupos de inimigos.",
    description: "Deus do trovão e do som. Tupã protege a terra com relâmpagos.",
    image: "imagens/tupa.png",
    abilities: [
      {
        name: "Relâmpago Sagrado",
        description: "Causa dano elétrico em área.",
        icon: "imagens/relampago.png",
      },
    ],
  },
  {
    name: "Jaci",
    class: "Suporte",
    role: "Controle e proteção",
    summary: "Reduz a velocidade dos inimigos e fortalece defesas.",
    description: "Deusa da lua e guardiã da noite.",
    image: "imagens/jaci.png",
    abilities: [
      {
        name: "Luz Lunar",
        description: "Desacelera inimigos e fortalece defesas.",
        icon: "imagens/lua.png",
      },
    ],
  },
  {
    name: "Ceuci",
    class: "Suporte",
    role: "Fortalecimento",
    summary: "Fortalece aliados e protege estruturas.",
    description: "Deusa guardiã das casas e lavouras.",
    image: "imagens/ceuci.png",
    abilities: [
      {
        name: "Bênção da Colheita",
        description: "Aumenta resistência das torres.",
        icon: "imagens/bencaocolheita.png",
      },
    ],
  },
  {
    name: "Guaraci",
    class: "Guerreiro",
    role: "Buff ofensivo",
    summary: "Aumenta o poder das torres.",
    description: "Deus do sol e do fogo vital.",
    image: "imagens/guaraci.png",
    abilities: [
      {
        name: "Chama Solar",
        description: "Causa dano contínuo.",
        icon: "imagens/chamasolar.png",
      },
    ],
  },
  {
    name: "Iara",
    class: "Assassina",
    role: "Controle",
    summary: "Confunde e elimina inimigos.",
    description: "Deusa dos rios.",
    image: "imagens/iara.png",
    abilities: [
      {
        name: "Canto Hipnótico",
        description: "Confunde inimigos próximos.",
        icon: "imagens/cantosereia.png",
      },
    ],
  },
];

// ===============================
// ESTADO
// ===============================
let index = 0;
let selectedGod = null;

// ===============================
// AUTOPLAY
// ===============================
let autoplayId = null;
const AUTOPLAY_MS = 2000; // velocidade do autoplay (ms)

function startAutoplay() {
  stopAutoplay();
  autoplayId = setInterval(() => {
    index = (index + 1) % cards.length;
    updateCarousel();
  }, AUTOPLAY_MS);
}

function stopAutoplay() {
  if (autoplayId) clearInterval(autoplayId);
  autoplayId = null;
}

function restartAutoplay() {
  startAutoplay();
}

// ===============================
// FUNÇÕES
// ===============================
function updateCarousel() {
  // largura do card + gap (pra não desalinha se você usar gap no CSS)
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const step = cardWidth + gap;

  track.style.transform = `translateX(-${index * step}px)`;

  cards.forEach((card) => card.classList.remove("selected"));
  cards[index].classList.add("selected");

  selectedGod = gods[index];
  updateCharacterPanel(selectedGod);
  animateDescription();
}

function animateDescription() {
  godName.classList.add("fade-out");
  godText.classList.add("fade-out");

  setTimeout(() => {
    godName.textContent = gods[index].name;
    godText.textContent = gods[index].description;

    godName.classList.remove("fade-out");
    godText.classList.remove("fade-out");

    godName.classList.add("fade-in");
    godText.classList.add("fade-in");
  }, 200);
}

function updateCharacterPanel(god) {
  if (!god) return;

  characterImage.classList.remove("guaraci-corte");
  characterPanel.classList.remove("hidden");

  // imagem principal do personagem
  characterImage.src = god.image;
  characterImage.alt = god.name;

  if (god.name === "Guaraci") {
    characterImage.classList.add("guaraci-corte");
  }

  characterName.textContent = god.name;
  characterClass.textContent = god.class;
  characterRole.textContent = god.role;
  characterSummary.textContent = god.summary;

  // limpar habilidades antes de recriar
  abilitiesList.innerHTML = "";

  god.abilities.forEach((skill) => {
    const li = document.createElement("li");
    li.classList.add("ability-item");

    const img = document.createElement("img");
    img.src = skill.icon || "imagens/placeholder.png";
    img.alt = skill.name;

    const textBox = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = skill.name;

    const desc = document.createElement("p");
    desc.textContent = skill.description;

    textBox.appendChild(title);
    textBox.appendChild(desc);

    li.appendChild(img);
    li.appendChild(textBox);

    abilitiesList.appendChild(li);
  });
}

// ===============================
// EVENTOS
// ===============================
next.addEventListener("click", () => {
  index = (index + 1) % cards.length;
  updateCarousel();
  restartAutoplay(); // reseta autoplay quando o usuário interage
});

prev.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  updateCarousel();
  restartAutoplay();
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    index = i;
    updateCarousel();
    restartAutoplay();
  });
});

startBtn.addEventListener("click", () => {
  if (!selectedGod) {
    alert("Escolha um deus antes de começar!");
    return;
  }

  console.log("Deus escolhido:", selectedGod.name);
});

// Pausar autoplay ao passar o mouse por cima (opcional, mas recomendado)
const carousel = document.querySelector(".carousel");
if (carousel) {
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
}

// ===============================
// INICIALIZAÇÃO
// ===============================
updateCarousel();
startAutoplay();