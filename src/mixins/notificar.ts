import { TipoNotificacao } from "@/interfaces/INotificacao"
import { NOTIFICAR } from "@/store/TipoDeMutacoes"
import { store } from "@/store"

export const notificacaoMixin = {
    methods: {
        notificar (tipo: TipoNotificacao, titulo: string, texto: string) {
            store.commit(NOTIFICAR, {
                titulo: titulo,
                texto: texto,
                tipo: tipo,
            })
        }
    }
}