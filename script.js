let listaQuizzes;

function getQuizzes (){
    const url = `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`;
    const promise = axios.get(url);
    promise.then(insereQuizzesNoHtml);
}

function insereQuizzesNoHtml(response){
    listaQuizzes = '';
    for (let i = 0; i < response.data.length; i++) {
        listaQuizzes += `
        <div class="quizz">
            <img src="${response.data[i].image}">
            <div class="gradiente"></div>
            <p>${response.data[i].title}</p>
        </div>
        `;
    }
    document.querySelector('.container-quizzes').innerHTML = '';
    document.querySelector('.container-quizzes').innerHTML = listaQuizzes;
}