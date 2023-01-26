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

function comparator() {
    return Math.random() - 0.5;
}

function exibirQuizz(quizz){
    let idQuizz;
    document.querySelector('.tela1').classList.add('esconder');
    document.querySelector('.tela2').classList.remove('esconder');
    idQuizz = quizz.attributes.getNamedItem('id').value;
    const promise = axios.get(`${url}/${idQuizz}`);
    promise.then((response) => {
        const dadosQuizzServidor = response.data;
        let pergunta = '';
        let respostas = '';
        let quiz = '';
        dadosQuizzServidor.questions.forEach(question => {
            pergunta = `
                    <div class="titulo-pergunta">
                        <h3>${question.title}</h3>
                    </div>`;
            question.answers.sort(comparator);        
            question.answers.forEach(answer => {
              respostas += `
                <div class="resposta">
                    <img src="${answer.image}" alt="">
                    <h4>${answer.text}</h4>
                </div>`;  
            });
            quiz += `
                <div class="pergunta">
                    ${pergunta}
                    <div class="respostas">${respostas} </div>
                </div>`;
            pergunta = '';
            respostas = '';
        });
        document.querySelector('.titulo-tela2 h2').innerHTML = dadosQuizzServidor.title;
        document.querySelector('.perguntas-tela2').innerHTML = quiz;
    });
    
    promise.catch ( () => {
        confirm ("Ocorreu um erro ao exibir o quizz. Recarregue a página.");
        window.location.reload;
    })
}

function getQuizzes (){
    const promise = axios.get(url);

    promise.then(response => {
        const dadosQuizzesServidor = response.data;
        listaQuizzes = '';
        for (let i = 0; i < dadosQuizzesServidor.length; i++) {
            listaQuizzes += `
            <div id="${dadosQuizzesServidor[i].id}" onclick="exibirQuizz(this)" class="quizz">
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
