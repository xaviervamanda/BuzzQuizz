let listaQuizzes;
let escolhas = 0;
let acertos = 0;
let resultado = 0;
let niveis = [];
let quizzAtual;
const url = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

const tela1 = document.querySelector('.tela1');
const tela3Parte1 = document.querySelector ('.tela3-parte-um');
const tela3Parte2Inicial = document.querySelector('.tela3-parte-dois-incial');
const tela3Parte3 = document.querySelector('.tela3-parte-tres');
const tela3Parte4 = document.querySelector('.tela3-parte-quatro');

let criarQuizzTitulo = document.querySelector('.titulo-quizz');
let criarQuizzImagem = document.querySelector('.url-imagem');
let criarQuizzQntPerguntas = document.querySelector('.qnt-perguntas');
let criarQuizzQntNiveis = document.querySelector('.qnt-niveis');

let textoTodasPerguntas;
let CorFundo;

let respostasCorretas;
let urlImagensObg;

let respostaIncorretaObg;

let respostaIncorretaOptativa2;
let respostaIncorretaOptativa3;

let imagemRespostaIncOpt2;
let imagemRespostaIncOpt3;

let tituloNivel;
let acertosNivel;
let urlImagensNivel;
let descricaoNivel;

let checagem = [];

let checagemDois = [];

let checagemTres = [];

let responseId;

function checaDescricaoNivel() {
    let check = [];
    descricaoNivel = document.querySelectorAll('.descricao-nivel');

    for (let i = 0; i < descricaoNivel.length; i++){
        const arrayDescricaoNivel = descricaoNivel[i].value.split('');
        if (arrayDescricaoNivel.length >= 30){
            check.push("OK");
            if (check.length === descricaoNivel.length){
                checagemTres.push("OK");
                console.log("descricao nivel ok");
            }
        }
    }
}

function checaImagemNivel(){
    let check = [];
    urlImagensNivel = document.querySelectorAll('.imagem-nivel');
    
    for (let i = 0; i < urlImagensNivel.length; i++){
      try {
        new URL(urlImagensNivel[i].value)
        check.push("OK");
        if (check.length === urlImagensNivel.length){
            checagemTres.push("OK");
            console.log("img nivel ok");
        }
    } catch(err) {
        alert ("Insira um URL válido para imagem de nível. Deve ser o endereço de uma imagem.");
    }      
    }
}

function zeroPorcentoAcerto (porcentagem){
    if (porcentagem === "0"){
        return true
    } else {
        return false
    }
}

function checaAcertosNivel() {
    let check = [];
    let arrayAcertos = [];
    acertosNivel = document.querySelectorAll('.acerto-nivel');
    
    for (let i = 0; i < acertosNivel.length; i++){
        arrayAcertos.push(acertosNivel[i].value);
        console.log(arrayAcertos);
    }
    const acertoZeroPorcento = arrayAcertos.filter(zeroPorcentoAcerto);
    console.log (acertoZeroPorcento);

    if (acertoZeroPorcento.length !== 0){
        for (let i = 0; i < acertosNivel.length; i++){
            if (isNaN(Number(acertosNivel[i].value)) === false && Number(acertosNivel[i].value) >= 0 && Number(acertosNivel[i].value) <= 100){
                check.push("OK");
                if (check.length === acertosNivel.length){
                    checagemTres.push("OK");
                    console.log("acerto nivel ok");
                }
            } else {
                alert ("Porcentagem de acerto mínima inválida. A % acerto mínima deve ser um número de 0 a 100.");
            }
        }
    } else {
        alert ("Pelo menos um nível deve ter 0% de acerto.");
    }
}


function checaTituloNivel () {
    let check = [];
    tituloNivel = document.querySelectorAll('.titulo-nivel');
    for (let i = 0; i < tituloNivel.length; i++){
        const arrayTitulo = tituloNivel[i].value.split('');
        if (arrayTitulo.length >= 10){
            check.push("OK");
            if (check.length === tituloNivel.length){
                checagemTres.push("OK");
                console.log("titulo nivel ok");
            }
        } else {
            alert("Insira um título de nível válido. O título deve possuir pelo menos 10 caracteres.")
        }
    }
}

function checaRepostas () {
    let check = [];
    respostasCorretas = document.querySelectorAll('.resposta-correta');
    respostaIncorretaOptativa2 = document.querySelector('.resposta-incorreta2');
    respostaIncorretaOptativa3 = document.querySelector('.resposta-incorreta3');
    respostaIncorretaObg = document.querySelectorAll('.resposta-incorreta-obg');
    
    for (let i = 0; i < respostasCorretas.length; i++){
        if (respostasCorretas[i].value !== '' && respostaIncorretaObg[i].value !== ''){
            check.push("OK");
            if (check.length === respostasCorretas.length){
              checagemDois.push("OK");
              console.log(checagemDois);
              console.log("respostas ok")  
            }
        } else{
            alert("Todas as perguntas devem possuir uma resposta correta e incorreta válida. Preencha esses campos.")
        }
        if (respostaIncorretaOptativa2.value !== '' && imagemRespostaIncOpt2.value === ''){
            alert ("A resposta incorreta 2 deve ter uma imagem. Insira um URL de imagem válido.")
        }
        if (respostaIncorretaOptativa3.value !== '' && imagemRespostaIncOpt3.value === ''){
            alert ("A resposta incorreta 3 deve ter uma imagem. Insira um URL de imagem válido.")
        }
        if (respostaIncorretaOptativa2.value !== '' && imagemRespostaIncOpt2.value !== ''){
            try {
                new URL(imagemRespostaIncOpt2.value)
            } catch(err) {
                alert ("Insira um URL válido na resposta incorreta 2. Deve ser o endereço de uma imagem.");
            }       
        }
        if (respostaIncorretaOptativa3.value !== '' && imagemRespostaIncOpt3.value !== ''){
            try {
                new URL(imagemRespostaIncOpt3.value)
            } catch(err) {
                alert ("Insira um URL válido na resposta incorreta 3. Deve ser o endereço de uma imagem.");
            }       
        }
    }
}

function mandarQuizzServidor() {
    const dadosQuizz =
    {
        title: `${criarQuizzTitulo.value}`,
        image: `${criarQuizzImagem.value}`,
        questions: [],
        levels: []
    }
    for (let i = 0; i < textoTodasPerguntas.length; i++){
        dadosQuizz.questions.push({
            title: `${textoTodasPerguntas[i].value}`,
            color: `${CorFundo[i].value}`,
            answers: [
                {
                    text: `${respostasCorretas[i].value}`,
                    image: `${urlImagensObg[i].value}`,
                    isCorrectAnswer: true
                },
                {
                    text: `${respostaIncorretaObg[i].value}`,
                    image: `${urlImagensObg[i+1].value}`,
                    isCorrectAnswer: false
                }
            ]
        })
    }
    if (respostaIncorretaOptativa2 !== null){
        dadosQuizz.questions[0].answers.push({
            text: `${respostaIncorretaOptativa2.value}`,
            image: `${imagemRespostaIncOpt2.value}`,
            isCorrectAnswer: false    
        });
        }
    if (respostaIncorretaOptativa3 !== null){
        dadosQuizz.questions[0].answers.push({
            text: `${respostaIncorretaOptativa3.value}`,
            image: `${imagemRespostaIncOpt3.value}`,
            isCorrectAnswer: false    
        });
    }
    console.log(tituloNivel);
    for (let i = 0; i < tituloNivel.length; i++){
        dadosQuizz.levels.push({
            title: `${tituloNivel[i].value}`,
            image: `${urlImagensNivel[i].value}`,
            text: `${descricaoNivel[i].value}`,
            minValue: Number(`${acertosNivel[i].value}`)
        });
    }
    console.log (dadosQuizz);
    const promise = axios.post (`${url}`, dadosQuizz);
    promise.then (response => {
        console.log (response); 
        responseId = response.data.id;
        console.log(responseId);
        tela3Parte3.style.display = "none";
        tela3Parte4.style.display = "initial";
       
    });
    promise.catch ( () => alert ("Ocorreu um erro ao enviar seu quizz para o servidor. Tente novamente."));
    
}

function acessarQuizz(){
    const quiz = document.querySelector('.sucesso-quizz');
    quiz.attributes.getNamedItem('id').value = responseId;
    console.log(quiz);
    tela3Parte4.style.display = "none";
    exibirQuizz(quiz);
}

function mostrarPaginaSucessoQuizz (){
    checaTituloNivel ();
    checaAcertosNivel();
    checaImagemNivel();
    checaDescricaoNivel();
    console.log(checagemTres);
    if (checagemTres.length === 4){
        tela3Parte4.innerHTML += `
        <h2>
            Seu quizz está pronto!
        </h2>

        <div id ="${responseId}" class="sucesso-quizz">
            <img src="${criarQuizzImagem.value}">
            <div class="gradiente"></div>
            <div class="titulo-quizz-sucesso">
                <p>${criarQuizzTitulo.value}</p>
            </div>
            
        </div>

        <div onclick="acessarQuizz()" class="botao-acessar-quizz">
            Acessar Quizz
        </div>

        <div onclick="home()" class="botao-voltar-home">
            Voltar para home
        </div>
        `;
        mandarQuizzServidor();
    }   

}

function mostraCamposNivel (divNivelEdicao){
    divNivelEdicao.style.display = "none";
    const paragrafoDaDiv = divNivelEdicao.querySelector('p');
    const divCamposNivel = document.querySelector(`div[data-name="${paragrafoDaDiv.innerHTML}"]`);
    divCamposNivel.style.display = "flex";
}



function checaURLImagemPergunta (){
    let check = [];
    urlImagensObg = document.querySelectorAll('.imagem-pergunta');
    imagemRespostaIncOpt2 = document.querySelector('.imagem-pergunta2');
    imagemRespostaIncOpt3 = document.querySelector('.imagem-pergunta3');
    for (let i = 0; i < urlImagensObg.length; i++){
      try {
        new URL(urlImagensObg[i].value)
        check.push("OK");
        if (check.length === urlImagensObg.length){
            checagemDois.push("OK");
            console.log(checagemDois);
            console.log("imagem ok")
        }
    } catch(err) {
        alert ("Insira um URL válido. Deve ser o endereço de uma imagem.");
    }    
    }
}

function checaHexadecimal(arrayCores){
    const arryLetras = ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];
    let contador = 0;
    if (arrayCores[0] === "#" && arrayCores.length === 7){
        //console.log('entrou aqui')
        for(let i = 1; i < arrayCores.length; i++){
            //console.log(arryLetras.includes(arrayCores[i]));
            if(arryLetras.includes(arrayCores[i])===true)
                contador++;
        }
        console.log(contador);
        if(contador === 6)
            return true;
    }
    return false;
}

function checaCorFundoPergunta () {
    let check = [];
    CorFundo = document.querySelectorAll('.cor-fundo-pergunta');
    console.log (CorFundo);
    for (let i = 0; i < CorFundo.length; i++){
        const corFundoArray = CorFundo[i].value.split('');
        console.log(corFundoArray);
        if (checaHexadecimal(corFundoArray)){
                check.push("OK");
                if (check.length === CorFundo.length){
                    checagemDois.push("OK");
                    console.log(checagemDois);
                    console.log("cor ok");
                }
                ;
        } else {
            alert ("Insira uma cor de fundo de pergunta válida. A cor deve começar com # seguida de 6 caracteres de números ou letras de A a F.")
        }
    }
}

function checaTituloPergunta () {
    let check = [];
    textoTodasPerguntas = document.querySelectorAll('.texto-pergunta');
    for (let i = 0; i < textoTodasPerguntas.length; i++){
        const arrayTextoPergunta = textoTodasPerguntas[i].value.split('');
        if (arrayTextoPergunta.length >= 20){
            check.push("OK");
            if (check.length === textoTodasPerguntas.length){
              checagemDois.push("OK");
              console.log(checagemDois);
              console.log("titulo ok"); 
            }    
        } else {
            alert ("Insira um texto de pergunta válido. O texto deve ter no mínimo 20 caracteres.")
        }
    }
    
}

function mostrarPaginaCriacaoNiveis(){
    checagemDois = [];
    checaTituloPergunta ();
    checaCorFundoPergunta ();
    checaURLImagemPergunta ();
    checaRepostas ();
    console.log (checagemDois);
    if (checagemDois.length === 4){
        for (i = 0; i < criarQuizzQntNiveis.value; i++){
            if (i === 0){
                tela3Parte3.innerHTML += `
                <h2>Agora, decida os níveis</h2>

                <div class="caixa-pergunta container-tela3" onclick="mostraCamposNivel (this)">
                    <p>Nível ${(i + 1)}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <div data-name="Nível ${(i + 1)}" class="tamanho-container container-tela3 margem-container3-parte-dois">
                    <div class="titulo-criar-perguntas">
                        Nível ${(i + 1)}
                    </div>
                    <div class="input-criar-niveis">
                        <input class="titulo-nivel" type="text"  placeholder="Título do nível">
                    </div>
                    <div class="input-criar-niveis">
                        <input class="acerto-nivel" type="text"  placeholder="% acerto mínima">
                    </div>
                    <div class="input-criar-niveis">
                        <input class="imagem-nivel" type="text"  placeholder="URL da imagem do nível">
                    </div>
                    <div class="input-criar-niveis tamanho-input">
                        <input class="descricao-nivel" type="text"  placeholder="Descrição do nível">
                    </div>
                </div>
                `;  
            } else if (i === (criarQuizzQntNiveis.value - 1)) {
                tela3Parte3.innerHTML += `
                <div class="caixa-pergunta container-tela3" onclick="mostraCamposNivel (this)">
                    <p>Nível ${(i + 1)}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <div data-name="Nível ${(i + 1)}" class="tamanho-container container-tela3 margem-container3-parte-dois">
                    <div class="titulo-criar-perguntas">
                        Nível ${(i + 1)}
                    </div>
                    <div class="input-criar-niveis">
                        <input class="titulo-nivel" type="text"  placeholder="Título do nível">
                    </div>
                    <div class="input-criar-niveis">
                        <input class="acerto-nivel" type="text"  placeholder="% acerto mínima">
                    </div>
                    <div class="input-criar-niveis">
                        <input class="imagem-nivel" type="text"  placeholder="URL da imagem do nível">
                    </div>
                    <div class="input-criar-niveis tamanho-input">
                        <input class="descricao-nivel" type="text"  placeholder="Descrição do nível">
                    </div>
                </div>

                <div class="botao-prosseguir" onclick="mostrarPaginaSucessoQuizz()">
                    <button>Finalizar Quizz</button>
                </div>
                `;     
            } else {
                tela3Parte3.innerHTML += `
                <div class="caixa-pergunta container-tela3" onclick="mostraCamposNivel (this)">
                    <p>Nível ${(i + 1)}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <div data-name="Nível ${(i + 1)}" class="tamanho-container container-tela3 margem-container3-parte-dois">
                    <div class="titulo-criar-perguntas">
                        Nível ${(i + 1)}
                    </div>
                    <div class="input-criar-niveis">
                        <input class="titulo-nivel" type="text"  placeholder="Título do nível">
                    </div>
                    <div class="input-criar-niveis">
                        <input class="acerto-nivel" type="text"  placeholder="% acerto mínima">
                    </div>
                    <div class="input-criar-niveis">
                        <input class="imagem-nivel" type="text"  placeholder="URL da imagem do nível">
                    </div>
                    <div class="input-criar-niveis tamanho-input">
                        <input class="descricao-nivel" type="text"  placeholder="Descrição do nível">
                    </div>
                </div>
                `;    
            }
        }
        tela3Parte2Inicial.classList.add ('esconder');
        tela3Parte3.classList.remove('esconder');
        const divsEscondidas = document.querySelectorAll('.tela3-parte-tres .margem-container3-parte-dois');
        for (let i = 0; i < divsEscondidas.length; i++){
            divsEscondidas[i].style.display = "none";
        }
    }
}


function mostraCamposPergunta (divPerguntaEdicao){
    divPerguntaEdicao.style.display = "none";
    const paragrafoDaDiv = divPerguntaEdicao.querySelector('p');
    const divCamposPergunta = document.querySelector(`div[data-name="${paragrafoDaDiv.innerHTML}"]`);
    divCamposPergunta.style.display = "flex";
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
    try {
        new URL(criarQuizzImagem.value)
        checagem.push ("OK");
    } catch(err) {
        alert ("Insira um URL válido. Deve ser o endereço de uma imagem.");
    }    
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
    if (checagem.length === 4){
        for (i = 0; i < criarQuizzQntPerguntas.value; i++){
            if (i === 0){
                tela3Parte2Inicial.innerHTML += `
                <h2>Crie suas Perguntas</h2>

                <div class="caixa-pergunta container-tela3" onclick="mostraCamposPergunta (this)">
                    <p>Pergunta ${(i + 1)}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <div data-name="Pergunta ${(i + 1)}" class="container-tela3 margem-container3-parte-dois">
                    <div class="titulo-criar-perguntas">
                        Pergunta ${(i + 1)}
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="cor-fundo-pergunta" "type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="titulo-criar-perguntas">
                        Resposta correta
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-correta" type="text" placeholder="Resposta correta">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="imagem-pergunta" type="text" placeholder="URL da imagem">
                    </div>
                    <div class="titulo-criar-perguntas">
                        Respostas incorretas
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta-obg" type="text" placeholder="Resposta incorreta 1">
                    </div>
                    <div class="input-criar-perguntas margem-especial">
                        <input class="imagem-pergunta" type="text" placeholder="URL da imagem 1">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta2" type="text" placeholder="Resposta incorreta 2">
                    </div>
                    <div class="input-criar-perguntas margem-especial">
                        <input class="imagem-pergunta2" type="text" placeholder="URL da imagem 2">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta3" type="text" placeholder="Resposta incorreta 3">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="imagem-pergunta3" type="text" placeholder="URL da imagem 3">
                    </div>
                </div>
                `;  
            } else if (i === (criarQuizzQntPerguntas.value - 1)) {
                tela3Parte2Inicial.innerHTML += `
                <div class="caixa-pergunta container-tela3" onclick="mostraCamposPergunta (this)">
                    <p>Pergunta ${(i + 1)}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <div data-name="Pergunta ${(i + 1)}" class="container-tela3 margem-container3-parte-dois">
                    <div class="titulo-criar-perguntas">
                        Pergunta ${(i + 1)}
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="cor-fundo-pergunta" "type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="titulo-criar-perguntas">
                        Resposta correta
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-correta" type="text" placeholder="Resposta correta">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="imagem-pergunta" type="text" placeholder="URL da imagem">
                    </div>
                    <div class="titulo-criar-perguntas">
                        Respostas incorretas
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta-obg" type="text" placeholder="Resposta incorreta 1">
                    </div>
                    <div class="input-criar-perguntas margem-especial">
                        <input class="imagem-pergunta" type="text" placeholder="URL da imagem 1">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta2" type="text" placeholder="Resposta incorreta 2">
                    </div>
                    <div class="input-criar-perguntas margem-especial">
                        <input class="imagem-pergunta2" type="text" placeholder="URL da imagem 2">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta3" type="text" placeholder="Resposta incorreta 3">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="imagem-pergunta3" type="text" placeholder="URL da imagem 3">
                    </div>
                </div>
                <div class="botao-prosseguir" onclick="mostrarPaginaCriacaoNiveis()">
                    <button>Prosseguir para criar níveis</button>
                </div>
                `;     
            } else {
                tela3Parte2Inicial.innerHTML += `
                <div class="caixa-pergunta container-tela3" onclick="mostraCamposPergunta (this)">
                    <p>Pergunta ${(i + 1)}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>

                <div data-name="Pergunta ${(i + 1)}" class="container-tela3 margem-container3-parte-dois">
                    <div class="titulo-criar-perguntas">
                        Pergunta ${(i + 1)}
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="cor-fundo-pergunta" "type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="titulo-criar-perguntas">
                        Resposta correta
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-correta" type="text" placeholder="Resposta correta">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="imagem-pergunta" type="text" placeholder="URL da imagem">
                    </div>
                    <div class="titulo-criar-perguntas">
                        Respostas incorretas
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta-obg" type="text" placeholder="Resposta incorreta 1">
                    </div>
                    <div class="input-criar-perguntas margem-especial">
                        <input class="imagem-pergunta" type="text" placeholder="URL da imagem 1">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta2" type="text" placeholder="Resposta incorreta 2">
                    </div>
                    <div class="input-criar-perguntas margem-especial">
                        <input class="imagem-pergunta2" type="text" placeholder="URL da imagem 2">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="resposta-incorreta3" type="text" placeholder="Resposta incorreta 3">
                    </div>
                    <div class="input-criar-perguntas">
                        <input class="imagem-pergunta3" type="text" placeholder="URL da imagem 3">
                    </div>
                </div>
                `;    
            }
        }
        tela3Parte1.classList.add ('esconder');
        tela3Parte2Inicial.classList.remove('esconder');
        const divsEscondidas = document.querySelectorAll('.tela3-parte-dois-incial .margem-container3-parte-dois');
        for (let i = 0; i < divsEscondidas.length; i++){
            divsEscondidas[i].style.display = "none";
        }
    }
}

function acessarTelaCriarQuizz (){
    tela1.classList.add('esconder');
    tela3Parte1.classList.remove('esconder');
}

function comparator() {
    return Math.random() - 0.5;
}

function calculaNivel(resultado){
    let level = {minValue:0};
    niveis.forEach(nivel => {
        if(nivel.minValue<=resultado)
            if(level.minValue<=nivel.minValue)
                level=nivel;
    });
    return level;
}

function verificaFinalQuizz(escolhas){
    const quantidadePerguntas = document.querySelectorAll('.perguntas-tela2 .pergunta').length;

    if(escolhas === quantidadePerguntas){
        resultado = Math.floor(acertos/escolhas*100);
        const nivel = calculaNivel(resultado);
        const titulo = document.querySelector('.resultado-quizz .resultado h3');
        const imagem = document.querySelector('.mensagem-final img');
        const descricao = document.querySelector('.mensagem-final p');
        titulo.innerHTML = `${resultado}% de acerto: ${nivel.title}`
        imagem.attributes.getNamedItem('src').value = nivel.image;
        descricao.innerHTML = nivel.text;
        return true;
    }
    return false;
}

function verificaAcerto(resposta){
    const resultado = resposta.classList.contains('gabarito');
    if(resultado)
        acertos++;
}

function selecionarResposta(resposta) {

    const respostas = resposta.parentNode;
    verificaAcerto(resposta);

    if (respostas.querySelectorAll('.escolha').length < 1) {
        resposta.classList.add('escolha');
        const listaRespostas = respostas.querySelectorAll('.resposta');

        for (let i = 0; i < listaRespostas.length; i++) {
            if (listaRespostas[i].classList.contains('gabarito')) {
                listaRespostas[i].querySelector('.resposta h4').classList.add('correto');
            } else {
                listaRespostas[i].querySelector('.resposta h4').classList.add('errado');
            }

            if (!listaRespostas[i].classList.contains('escolha')) {
                listaRespostas[i].querySelector('.efeito-branco').classList.remove('esconder');
            }
        }
        escolhas++;

        setTimeout(() =>{
            const proximaPergunta = document.querySelector(`.pergunta:nth-child(${escolhas+1})`);
            if(proximaPergunta!==null){
                proximaPergunta.scrollIntoView();
            }
        },2000);

        if(verificaFinalQuizz(escolhas)){
            const finalQuizz = document.querySelector('.resultado-quizz');

            setTimeout(() => {
                finalQuizz.classList.remove('esconder');
                document.querySelector('.reiniciar').classList.remove('esconder');
                document.querySelector('.home').classList.remove('esconder');
                finalQuizz.scrollIntoView();
            },2000);
        }
    }
}

function exibirQuizz(quizz) {
    let idQuizz;
    quizzAtual = quizz;
    
    if(!tela1.classList.contains('esconder'))
        tela1.classList.add('esconder');
    
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
                if (answer.isCorrectAnswer === true) {
                    respostas += `
                    <div onclick="selecionarResposta(this)" class="resposta gabarito">
                        <img src="${answer.image}" alt="">
                        <h4>${answer.text}</h4>
                        <div class="efeito-branco esconder"></div>
                    </div>`;
                } else {
                    respostas += `
                    <div onclick="selecionarResposta(this)" class="resposta">
                        <img src="${answer.image}" alt="">
                        <h4>${answer.text}</h4>
                        <div class="efeito-branco esconder"></div>
                    </div>`;
                }
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
        document.querySelector('.titulo-tela2 p').innerHTML = dadosQuizzServidor.title;
        document.querySelector('.perguntas-tela2').innerHTML = quiz;

        dadosQuizzServidor.levels.forEach(nivel => niveis.push(nivel));
        //setTimeout(() => document.querySelector('.pergunta:first-child').scrollIntoView(),2000);
    });

    promise.catch(() => {
        confirm("Ocorreu um erro ao exibir o quizz. Recarregue a página.");
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

function resetQuizz(){
    document.querySelector('.perguntas-tela2').innerHTML = '';
    document.querySelector('.reiniciar').classList.add('esconder');
    document.querySelector('.home').classList.add('esconder');
    const finalQuizz = document.querySelector('.resultado-quizz');
    finalQuizz.classList.add('esconder');
    finalQuizz.querySelector('.resultado-quizz .resultado h3').innerHTML = '';
    finalQuizz.querySelector('.mensagem-final img').attributes.getNamedItem('src').value = '';
    finalQuizz.querySelector('.mensagem-final p').innerHTML = '';
    escolhas = 0;
    acertos = 0;
    resultado = 0;
    exibirQuizz(quizzAtual);
}

function home(){
    window.location.reload();
}

getQuizzes ();