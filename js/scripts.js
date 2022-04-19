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


/* LIB VanillaMasker:
https://github.com/vanilla-masker/vanilla-masker */
VMasker(inputCep).maskPattern("99999-999");
VMasker(inputTelefone).maskPattern("(99) 9999-9999");


/* Programação contador de caracteres do campo mensagem */
const spanMaximo = formulario.querySelector("#maximo");
const bCaracteres = formulario.querySelector("#caracteres");
const textMensagem = formulario.querySelector("#mensagem");

// Determinar a quantidade máxima de cacteres
let quantidade = 100

// "input" evento que capta em tempo real o que esta sendo digitado
textMensagem.addEventListener("input", function(){
    
    // Capturando o que for digitado
    let conteudo = textMensagem.value;

    // Criando uma contegem regressiva
    let contagem = quantidade - conteudo.length;

    // Adicionando a contagem ao elemento HTML
    bCaracteres.textContent = contagem;

    /* DESAFIO
    se for 0, vermelho
    senão, preto */

    // == É COMPARAÇÃO, apenas um = é atribuição
    if (contagem == 0) {
        bCaracteres.style.color = "red";
        textMensagem.style.boxShadow = "red 0 0 10px"
    } else {
        bCaracteres.style.color = "black";
        textMensagem.style.boxShadow = "black 0 0 10px"
    }

});

// Programação do Formspree
var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado por enviar!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! Houve um problema ao enviar seu formulário."
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)