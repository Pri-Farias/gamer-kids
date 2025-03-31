function iniciarJogo(jogo) {
    window.location.href = jogo + ".html";
}
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
