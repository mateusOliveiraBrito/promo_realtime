var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();

start();

connection.onclosed(async () => {
    await start();
});

connection.on("CadastradoSucesso", function () {
    var mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = "Promoção cadastrada com sucesso!";
});

connection.on("ReceberPromocao", function (promocao) {

    //container chamada
    var titulo = document.createElement("h1");
    titulo.innerText = promocao.empresa;

    var descricao = document.createElement("p");
    descricao.innerText = promocao.chamada;

    var regras = document.createElement("p");
    regras.innerText = promocao.regras;

    var containerChamada = document.createElement("div");
    containerChamada.setAttribute("class", "container-chamada");
    containerChamada.appendChild(titulo);
    containerChamada.appendChild(descricao);
    containerChamada.appendChild(regras);

    //botão
    var link = document.createElement("a");
    link.innerText = "Pegar";
    link.setAttribute("href", promocao.enderecoURL);
    link.setAttribute("target", "_blank");

    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao");
    containerBotao.appendChild(link);

    //container promoção
    var containerPromo = document.createElement("div");
    containerPromo.setAttribute("class", "container-promo");
    containerPromo.setAttribute("style", "margin: 10px");
    containerPromo.appendChild(containerChamada);
    containerPromo.appendChild(containerBotao);

    //container geral
    var container = document.getElementById("container-login");
    container.appendChild(containerPromo);
});

var btnCadastrar = document.getElementById("btnCadastrar");
if (btnCadastrar != null) {
    btnCadastrar.addEventListener("click", function () {

        var empresa = document.getElementById("empresa").value;
        var chamada = document.getElementById("chamada").value;
        var regras = document.getElementById("regras").value;
        var enderecoUrl = document.getElementById("enderecoUrl").value;

        var promocao = { Empresa: empresa, Chamada: chamada, Regras: regras, EnderecoURL: enderecoUrl };

        connection.invoke("CadastrarPromocao", promocao).then(function () {
            console.info("Promoção cadastrada com sucesso!");
        }).catch(function (erro) {
            console.error(erro.toString());
        });
    });
}

function start() {
    connection.start().then(function () {
        console.info("SignalR conectado!");
    }).catch(function (erro) {
        console.error(erro.toString());
        setTimeout(() => start(), 5000);
    });
}