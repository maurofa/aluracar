import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Carro } from "../../modelos/carro";
@Injectable()
export class CarrosServiceProvider {

  public APIURL = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {
  }

  lista() {
    return this.http.get<Carro[]>(this.APIURL + 'carro/listaTodos');
  }

}
