import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Carro } from "../../modelos/carro";
import { AgendamentosServiceProvider } from "../../providers/agendamentos-service/agendamentos-service";
import { HomePage } from "../home/home";
import { Agendamento } from "../../modelos/agendamento";

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
  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private agendamentosService: AgendamentosServiceProvider,
      private alertCtrl: AlertController) {
    this.carro = navParams.get('carroSelecionado');
    this.precoTotal = navParams.get('precoTotal');
  }

  ionViewDidLoad() {
  }

  agenda() {
    if(!this.nome || !this.endereco || !this.email) {
      this.alertCtrl.create({
        title: 'Preenchimento obrigatório.',
        subTitle: 'Preencha todos os campos.',
        buttons: [{
          text: 'OK'
        }]
      }).present();
      return;
    }
    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal
    };
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { 
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    let mensagem = '';
    this.agendamentosService.agenda(agendamento)
      .finally(() => {
        alert.setSubTitle(mensagem);
        alert.present();
      })
      .subscribe(
        () => mensagem = 'Agendamento Realizado.',
        err => mensagem = 'Falha no agendamento. Tente novamente mais tarde!'
      );
  }

}
