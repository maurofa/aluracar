import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamento',
  templateUrl: 'lista-agendamento.html',
})
export class ListaAgendamentoPage {

  agendamentos: Agendamento[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendamentoDao: AgendamentoDaoProvider,
    private alertCtrl: AlertController,
    private agendamentosService: AgendamentosServiceProvider,
    private agendamentoDAO: AgendamentoDaoProvider
  ) {
  }

  ionViewDidLoad() {
    this.agendamentoDao.listaAgendamentos()
        .subscribe(dado => this.agendamentos=dado);
  }

  reenvia(agendamento: Agendamento) {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { 
          text: 'Ok'
        }
      ]
    });
    let mensagem = '';
    this.agendamentosService.agenda(agendamento)
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
        () => mensagem = 'Agendamento Reenviado.',
        (err: Error) => mensagem = err.message
      );
  }
}
