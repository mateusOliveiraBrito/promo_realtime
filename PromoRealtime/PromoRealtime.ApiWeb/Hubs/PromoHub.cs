using Microsoft.AspNetCore.SignalR;
using PromoRealtime.ApiWeb.Models;
using System.Threading.Tasks;

namespace PromoRealtime.ApiWeb.Hubs {
    public class PromoHub : Hub {

        public async Task CadastrarPromocao(Promocao promocao) {
            await Clients.Caller.SendAsync("CadastradoSucesso");
            await Clients.Others.SendAsync("ReceberPromocao", promocao);
        }
    }
}
