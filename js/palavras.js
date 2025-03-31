const palavras = ["CARRO", "CASA", "BOLA", "CACHORRO", "GATO", "DEUS", "AMOR", "DELICADO", "ARTHUR", "CAVALO", "BALEIA", "ELEFANTE", "ESPADA", "CORUJA", "AVIÃO", "ABACATE", "ABELHA", "PALHAÇO", "BANANA", "BORBOLETA"];
let palavraCorreta = "";
let letrasCorretas = 0;

function iniciarJogo() {
    const letrasEmbaralhadas = document.getElementById("letras-embalhadas");
    const caixaResposta = document.getElementById("caixa-resposta");
    const mensagemAcerto = document.getElementById("mensagem-acerto");

    letrasEmbaralhadas.innerHTML = "";
    caixaResposta.innerHTML = "";
    mensagemAcerto.style.display = "none";
    letrasCorretas = 0;


    palavraCorreta = palavras[Math.floor(Math.random() * palavras.length)];
    const letras = palavraCorreta.split("").sort(() => Math.random() - 0.5);

    letras.forEach(letra => {
        const divLetra = document.createElement("div");
        divLetra.classList.add("letra");
        divLetra.textContent = letra;
        divLetra.setAttribute("draggable", "true");
        divLetra.addEventListener("dragstart", arrastarLetra);
        letrasEmbaralhadas.appendChild(divLetra);
    });

    palavraCorreta.split("").forEach(() => {
        const divEspaco = document.createElement("div");
        divEspaco.classList.add("caixa-palavra");
        divEspaco.addEventListener("dragover", permitirSoltar);
        divEspaco.addEventListener("drop", verificarPalavra);
        caixaResposta.appendChild(divEspaco);
    });
}

function arrastarLetra(event) {
    event.dataTransfer.setData("text", event.target.textContent);
}

function permitirSoltar(event) {
    event.preventDefault();
}

function verificarPalavra(event) {
    const letraArrastada = event.dataTransfer.getData("text");
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);

    if (event.target.textContent !== "") return;

    if (letraArrastada === palavraCorreta[index]) {
        event.target.textContent = letraArrastada;
        event.target.classList.add("correto");
        letrasCorretas++;

        if (letrasCorretas === palavraCorreta.length) {
            const somParabens = document.getElementById("som-parabens");
            somParabens.currentTime = 0;
            somParabens.play();

            const mensagemAcerto = document.getElementById("mensagem-acerto");
            mensagemAcerto.style.display = "block";

            setTimeout(() => {
                somParabens.pause();
                somParabens.currentTime = 0;
                mensagemAcerto.style.display = "none";
                iniciarJogo();
            }, 3000); 
        }
    } else {
        const somErro = document.getElementById("som-erro");
        somErro.currentTime = 0;
        somErro.play(); 
    }
}

document.getElementById("reiniciar").addEventListener("click", iniciarJogo);

iniciarJogo();
