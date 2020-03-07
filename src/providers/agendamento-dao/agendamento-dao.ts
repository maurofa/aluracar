import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { Agendamento } from "../../modelos/agendamento";

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private storage: Storage) {
  }

  private geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva (agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    return Observable.fromPromise(this.storage.set(chave, agendamento));
  }

  foiAgendado (agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    return Observable.fromPromise(this.storage.get(chave).then(dado => dado != null));
  }

}
