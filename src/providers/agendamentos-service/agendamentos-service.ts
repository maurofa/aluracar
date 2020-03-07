import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AgendamentosServiceProvider {

  public readonly APIURL = 'http://localhost:8080/api/';
  constructor(public http: HttpClient) {
  }

  agenda(agendamento) {
    return this.http.post(this.APIURL + 'agendamento/agenda', agendamento);
  }

}
