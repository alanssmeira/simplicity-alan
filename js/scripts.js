/* JS INICIAL PARA CEP/ENDEREÇO */

const formulario = document.querySelector("form");
const inputCep = formulario.querySelector("#cep");
const inputTelefone = formulario.querySelector("#telefone");
const inputEndereco = formulario.querySelector("#endereco");
const inputBairro = formulario.querySelector("#bairro");
const inputCidade = formulario.querySelector("#cidade");
const inputEstado = formulario.querySelector("#estado");
const bStatus = formulario.querySelector("#status");
const botaoLocalizar = formulario.querySelector("#localizar-cep");

botaoLocalizar.addEventListener("click", function(event){
    event.preventDefault();
    // Entrar no site: viacep.com.br

    /* Pegar o CEP digitado */
    let cep = inputCep.value;

    /* CEP no padrão API */
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    // let url = "https://viacep.com.br/ws/"+cep+"/json/";

    /* Ajax: comunicação assíncrona com o ViaCEP usando a função fetch. 
    Processo assíncrono, mais de uma tarefa é executada simultâneamente.
    Na web, parte da página sofre alguma alterção sem a afetar a página toda. */

    // 1) fazer a conexão com a API (ou acessar)
    fetch(url)

        // 2) E então, recupere a resposta do acesso no formato JSON
        .then(resposta => resposta.json())

            // 3) E então, mostre o dados
            .then(dados => {
                if ("erro" in dados) {
                    bStatus.innerHTML = "CEP não encontrado!";
                    inputCep.focus();
                } else {
                    bStatus.innerHTML = "CEP encontrado!";
                    inputEndereco.value = dados.logradouro;
                    inputBairro.value = dados.bairro;
                    inputCidade.value = dados.localidade;
                    inputEstado.value = dados.uf;
                }
            })

})