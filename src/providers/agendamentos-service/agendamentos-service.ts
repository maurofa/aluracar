import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { Agendamento } from "../../modelos/agendamento";

@Injectable()
export class AgendamentosServiceProvider {

  public readonly APIURL = 'http://localhost:8080/api/';
  constructor(public http: HttpClient) {
  }

  agenda(agendamento: Agendamento) {
    return this.http
                .post(this.APIURL + 'agendamento/agenda', agendamento)
                .do(() => agendamento.enviado = true)
                .catch(err => Observable.of(new Error('Falha no agendamento. Tente novamente mais tarde!')));
  }

}
