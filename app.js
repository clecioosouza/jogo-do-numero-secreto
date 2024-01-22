let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibitTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 
    'Brazilian Portuguese Female',
    {rate: 1.2});
}

function exibirMesagemInicial() {
    exibitTextoNaTela('h1', 'Jogo do número secreto');
    exibitTextoNaTela('p', 'Escolha um número enrte 1 e 10');
}
exibirMesagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibitTextoNaTela('h1', 'Acertou!'); 
        let palavraTentativas = tentativas > 1 ? 'Tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibitTextoNaTela('p', mensagemTentativas);     
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {    
        if ( chute > numeroSecreto) {
            exibitTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibitTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMesagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}