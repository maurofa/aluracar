import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';

@Injectable()
export class UsuariosServiceProvider {

  usuario: Usuario;
  public readonly APIURL = 'http://localhost:8080/api/';
  constructor(public http: HttpClient) {
  }

  efetuaLogin(email, senha) {
    return this.http.post<Usuario>(this.APIURL + 'login', {email, senha})
              .do(usuario => this.usuario = usuario);
  }

  obtemUsuarioLogado() {
    return this.usuario;
  }

}
