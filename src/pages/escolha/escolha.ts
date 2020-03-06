import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Carro } from "../../modelos/carro";
import { Acessorio } from "../../modelos/acessorio";
import { CadastroPage } from "../cadastro/cadastro";

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  carro: Carro;
  acessorios: Acessorio[] = [];
  private _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = this.navParams.get('carroSelecionado');
  }
  
  ionViewDidLoad() {
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      {nome:'Freio ABS', preco:300},
      {nome:'Ar-condicionado', preco:1000},
      {nome:'MP3 Player', preco:500}
    ];
  }

  atualizaTotal(checked: boolean, preco: number) {
    this._precoTotal = checked ?
      this._precoTotal + preco :
      this._precoTotal - preco;
  }

  avancaCadastro() {
    this.navCtrl.push(CadastroPage.name,
      {
        carroSelecionado: this.carro,
        precoTotal: this._precoTotal
      });
  }
}
