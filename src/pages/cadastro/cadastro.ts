import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from "../../modelos/carro";

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  carro: Carro;
  precoTotal: number;
  nome: string;
  endereco: string;
  email: string;
  data = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = navParams.get('carroSelecionado');
    this.precoTotal = navParams.get('precoTotal');
  }

  ionViewDidLoad() {
  }

  agenda() {
    console.log(this.nome);
    console.log(this.endereco);
    console.log(this.email);
    console.log(this.data);
  }

}
