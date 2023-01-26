let listaQuizzes;
const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

const criarQuizzTitulo = document.querySelector('.titulo-quizz').value;
const criarQuizzImagem = document.querySelector('.url-imagem').value;
const criarQuizzQntPerguntas = document.querySelector('.qnt-perguntas').value;
const criarQuizzQntNiveis = document.querySelector('.qnt-niveis').value;

function criarPerguntas() {
    const arry = ["1","2","3","4","5","6","7","8","9","0"];
    if (criarQuizzTitulo !== ''&& criarQuizzImagem !== '' && criarQuizzQntPerguntas !== '' && criarQuizzQntNiveis !== ''){
        // transformar a string qntperguntas e qntniveis em array de caracteres
        // checar se cada caracter ta dentro do arry por um for
        // checar se qnt perguntas >= 3
        // obs: cada pergunta deve ter entre 2 a 4 respostas
        // checar se qnt niveis >= 2
        //Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres
        // URL da Imagem: deve ter formato de URL

    }

}

function acessarTelaCriarQuizz (){
    const tela1 = document.querySelector('.tela1');
    tela1.classList.add('esconder');
    const tela3Parte1 = document.querySelector('.tela3-parte-um');
    tela3Parte1.classList.remove('esconder');
}

function selecionarQuizz(quizz){
    alert('quiz selecionado');
}

function getQuizzes (){
    const promise = axios.get(url);

    promise.then(response => {
        const dadosQuizzesServidor = response.data;
        listaQuizzes = '';
        for (let i = 0; i < dadosQuizzesServidor.length; i++) {
            listaQuizzes += `
            <div onclick="selecionarQuizz(this)" class="quizz">
                <img src="${dadosQuizzesServidor[i].image}">
                <div class="gradiente"></div>
                <p>${dadosQuizzesServidor[i].title}</p>
            </div>
            `;
    }
    document.querySelector('.container-quizzes').innerHTML += listaQuizzes;
    });

    promise.catch ( () => {
        confirm ("Ocorreu um erro ao buscar os quizzes. Recarregue a página.");
        window.location.reload;
    })
}

getQuizzes ();
