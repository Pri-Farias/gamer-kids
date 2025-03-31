
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const musicaFundo = document.getElementById("musica-fundo");
let somComer = new Audio("audio/comer.mp3");
let somColisao = new Audio("audio/colisao.mp3");


let box = 32;
let cobra = [{ x: 8 * box, y: 8 * box }];
let direcao = "left";
let comida = {
  x: Math.floor(Math.random() * 10 + 1) * box,
  y: Math.floor(Math.random() * 10 + 1) * box
};
let score = 0;
let jogo;

function criarBackground() {
  const imgFundo = new Image();
  imgFundo.src = "imagens/casinha.png";
  ctx.drawImage(imgFundo, 0, 0, canvas.width, canvas.height);
}


function criarCobra() {
  const imgCobra = new Image();
  imgCobra.src = "imagens/cobra.png";
  cobra.forEach(parte => {
    ctx.drawImage(imgCobra, parte.x, parte.y, box, box);
  });
}


function desenharComida() {
  ctx.font = "22px Arial";
  ctx.fillText("🍕", comida.x, comida.y + box);
}


document.addEventListener("keydown", evento => {
  if (evento.key === "ArrowLeft" && direcao !== "right") direcao = "left";
  if (evento.key === "ArrowUp" && direcao !== "down") direcao = "up";
  if (evento.key === "ArrowRight" && direcao !== "left") direcao = "right";
  if (evento.key === "ArrowDown" && direcao !== "up") direcao = "down";
});


function iniciarJogo(velocidade) {
  clearInterval(jogo);
  jogo = setInterval(update, velocidade);
}


function update() {

  let cabeca = { x: cobra[0].x, y: cobra[0].y };
  if (direcao === "right") cabeca.x += box;
  if (direcao === "left") cabeca.x -= box;
  if (direcao === "up") cabeca.y -= box;
  if (direcao === "down") cabeca.y += box;


  if (cabeca.x < 0 || cabeca.x >= canvas.width || cabeca.y < 0 || cabeca.y >= canvas.height || colisao(cabeca)) {
    clearInterval(jogo);
    somColisao.play();
    score++;
    alert("Você perdeu! Tente novamente.");
    document.location.reload();
  }

  if (cabeca.x === comida.x && cabeca.y === comida.y) {
    somComer.play();
    score++;
    setTimeout(() => {
        somComer.pause();
        somComer.currentTime = 0;
    }, 500);
    comida = {
      x: Math.floor(Math.random() * 10 + 1) * box,
      y: Math.floor(Math.random() * 10 + 1) * box
    };
  } else {
    cobra.pop();
  }


  cobra.unshift(cabeca);
  criarBackground();
  criarCobra();
  desenharComida();
}


function colisao(cabeca) {
  for (let i = 1; i < cobra.length; i++) {
    if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) return true;
  }
  return false;
}

const musica = document.getElementById('musica-fundo');
    const botaoVolume = document.getElementById('botao-volume');
    
    botaoVolume.addEventListener('click', () => {
        if (musica.muted) {
            musica.muted = false;
            botaoVolume.textContent = '🔊';
        } else {
            musica.muted = true;
            botaoVolume.textContent = '🔈';
        }
    });
    