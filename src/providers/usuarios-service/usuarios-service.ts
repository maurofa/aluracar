import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../modelos/usuario';

@Injectable()
export class UsuariosServiceProvider {

  usuario: Usuario;
  public readonly APIURL = 'http://192.168.15.35:8080/api/';
  private readonly CHAVE = 'avatar';
  constructor(
    public http: HttpClient,
    private storage: Storage
  ) {
  }

  efetuaLogin(email, senha) {
    return this.http.post<Usuario>(this.APIURL + 'login', {email, senha})
              .do(usuario => this.usuario = usuario);
  }

  obtemUsuarioLogado() {
    return this.usuario;
  }

  salvaAvatar(fotoUri) {
    this.storage.set(this.CHAVE, fotoUri);
  }

  obtemAvatar() {
    return this.storage.get(this.CHAVE)
          ? this.storage.get(this.CHAVE)
          : 'assets/img/avatar-padrao.jpg';
  }
}
