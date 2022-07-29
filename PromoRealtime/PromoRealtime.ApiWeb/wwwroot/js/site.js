var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").build();

connection.start().then(function () {
    console.info("SignalR conectado!");
}).catch(function (erro) {
    console.error(erro.toString());
});

connection.on("CadastradoSucesso", function () {
    var mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = "Promoção cadastrada com sucesso!";
});

connection.on("ReceberPromocao", function (promocao) {
    console.info(promocao);
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