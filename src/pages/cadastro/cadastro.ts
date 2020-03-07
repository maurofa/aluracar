import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Carro } from "../../modelos/carro";
import { AgendamentosServiceProvider } from "../../providers/agendamentos-service/agendamentos-service";
import { HomePage } from "../home/home";
import { Agendamento } from "../../modelos/agendamento";
import { AgendamentoDaoProvider } from "../../providers/agendamento-dao/agendamento-dao";

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
      private alertCtrl: AlertController,
      private agendamentoDAO: AgendamentoDaoProvider) {
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
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
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
    this.agendamentoDAO.foiAgendado(agendamento)
      .mergeMap(foiAgendado => {
        if(foiAgendado) {
          throw new Error('Agendamento existente!');
        }
        return this.agendamentosService.agenda(agendamento);
      })
      .mergeMap(valor => {
        let $retorno = this.agendamentoDAO.salva(agendamento);
        if(valor instanceof Error) {
          throw valor;
        }
        return $retorno;
      })
      .finally(() => {
        alert.setSubTitle(mensagem);
        alert.present();
      })
      .subscribe(
        () => mensagem = 'Agendamento Realizado.',
        (err: Error) => mensagem = err.message
      );
  }

}
