const imagens = [
    '🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'
];
let cartasViradas = [];
let movimentos = 0;

function criarTabuleiro() {
    const tabuleiro = document.querySelector('.tabuleiro');
    const cartasDuplicadas = [...imagens, ...imagens];
    cartasDuplicadas.sort(() => Math.random() - 0.5);

    cartasDuplicadas.forEach(imagem => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.innerHTML = `
            <div class="frente">?</div>
            <div class="verso">${imagem}</div>
        `;
        carta.addEventListener('click', () => virarCarta(carta));
        tabuleiro.appendChild(carta);
    });
}

function virarCarta(carta) {
    if (cartasViradas.length < 2 && !carta.classList.contains('virada')) {
        carta.classList.add('virada');
        cartasViradas.push(carta);

        if (cartasViradas.length === 2) {
            movimentos++;
            document.getElementById('movimentos').textContent = movimentos;
            verificarPar();
        }
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;
    const parEncontrado = carta1.querySelector('.verso').textContent === carta2.querySelector('.verso').textContent;

    if (parEncontrado) {
        cartasViradas = [];
    } else {
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
}

function reiniciarJogo() {
    const tabuleiro = document.querySelector('.tabuleiro');
    tabuleiro.innerHTML = '';
    cartasViradas = [];
    movimentos = 0;
    document.getElementById('movimentos').textContent = movimentos;
    criarTabuleiro();
}

document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

criarTabuleiro();
const musicaFundo = document.getElementById('musica-fundo');
const iconeMusica = document.querySelector('.icone-musica');

window.addEventListener('load', () => {
    musicaFundo.play().catch((erro) => {
        console.log('Autoplay bloqueado pelo navegador:', erro);
    });
});

const botaoMusica = document.getElementById('controle-musica');
botaoMusica.addEventListener('click', () => {
    if (musicaFundo.paused) {
        musicaFundo.play();
        botaoMusica.textContent = '🔊';
    } else {
        musicaFundo.pause();
        botaoMusica.textContent = '🔇';
    }
});
