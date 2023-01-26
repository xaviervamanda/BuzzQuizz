let listaQuizzes;
const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

const tela1 = document.querySelector('.tela1');
const tela3Parte1 = document.querySelector ('.tela3-parte-um');
const tela3Parte2Inicial = document.querySelector(".tela3-parte-dois-incial");

let criarQuizzTitulo = document.querySelector('.titulo-quizz');
let criarQuizzImagem = document.querySelector('.url-imagem');
let criarQuizzQntPerguntas = document.querySelector('.qnt-perguntas');
let criarQuizzQntNiveis = document.querySelector('.qnt-niveis');

let checagem = [];

function mostraCamposPergunta (){
    alert ("Pode mostrar os campos da pergunta.");
}

function checaQntNiveisQuizz (){
    // checar se qnt niveis >= 2
    if (Number(criarQuizzQntNiveis.value) >= 2){
        checagem.push("OK");
    } else {
        alert ("Insira uma quantidade de níveis válida. Deve ser um número e ser maior ou igual a 2.");
    }
}

function checaQntPerguntasQuizz (){
    // checar se qnt perguntas >= 3
    const arry = ["1","2","3","4","5","6","7","8","9","0"];
    for (let i = 0; i < criarQuizzQntPerguntas.value.length; i++){
        if (arry.includes(criarQuizzQntPerguntas.value[i]) === false || Number(criarQuizzQntPerguntas.value) < 3){
            alert ("Insira uma quantidade de perguntas válida. Deve ser um número e ser maior ou igual a 3.");
        } else {
            checagem.push("OK");
        }
    }
}

function checaURLImagemQuizz (){
    // URL da Imagem: deve ter formato de URL
    // Quando tiver a forma certa de checar se a URL é válida, add um "OK" no array checagem
    checagem.push ("OK");
}

function checaTituloQuizz (){
    //Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres
    const arrayTitulo = criarQuizzTitulo.value.split('');
    if (arrayTitulo.length >= 25 && arrayTitulo.length <= 65){
        checagem.push("OK");
    } else {
        alert ("Insira um título válido. Deve conter entre 25 e 60 caracteres.");
    }
}

function mostrarPaginaCriacaoPerguntas() {
    // obs: cada pergunta deve ter entre 2 a 4 respostas
    checagem = [];
    checaTituloQuizz ();
    // A função abaixo precisa ser feita ainda. É a unica que não está funcionando.
    checaURLImagemQuizz ();
    checaQntPerguntasQuizz ();
    checaQntNiveisQuizz ();
    console.log (checagem);
    if (checagem.length === 4){
        for (i = 0; i < criarQuizzQntPerguntas.value; i++){
            if (i === 0){
                tela3Parte2Inicial.innerHTML += `
                <h2>Crie suas Perguntas</h2>

                <div class="caixa-pergunta">
                    <p>Pergunta ${(i + 1)}</p>
                    <ion-icon name="create-outline" onclick="mostraCamposPergunta ()"></ion-icon>
                </div>
                `;  
            } else {
              tela3Parte2Inicial.innerHTML += `
            <div class="caixa-pergunta">
                <p>Pergunta ${(i + 1)}</p>
                <ion-icon name="create-outline" onclick="mostraCamposPergunta ()"></ion-icon>
            </div>
            `;  
            }
        }
        tela3Parte1.classList.add ('esconder');
        tela3Parte2Inicial.classList.remove('esconder');
    }
}

function acessarTelaCriarQuizz (){
    tela1.classList.add('esconder');
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
                    <div style="background-color: ${question.color};"  class="titulo-pergunta">
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
        document.querySelector('.titulo-tela2 img').attributes.getNamedItem('src').value = `${dadosQuizzServidor.image}`;
        document.querySelector('.titulo-tela2 h2').innerHTML = dadosQuizzServidor.title;
        document.querySelector('.perguntas-tela2').innerHTML = quiz;
    });
    
    promise.catch ( () => {
        alert ("Ocorreu um erro ao exibir o quizz. Recarregue a página.");
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
