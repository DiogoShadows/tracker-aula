import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/TipoDeMutacoes";

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
}

export default () : Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) => {
        store.commit(NOTIFICAR, {
            titulo: titulo,
            texto: texto,
            tipo: tipo,
        })
    }

    return {
        notificar
    }
}