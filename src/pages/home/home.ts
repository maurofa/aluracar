import { Component } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Carro } from '../../modelos/carro';
import { CarrosServiceProvider } from "../../providers/carros-service/carros-service";
import { EscolhaPage } from "../escolha/escolha";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  private carros : Carro[];
  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertController: AlertController,
    private _carrosService: CarrosServiceProvider) { }

  ionViewDidLoad(): void {
    let loading = this._loadingCtrl.create({
      content: 'Quase lá!'
    });
    loading.present();
  
    this._carrosService.lista()
    .subscribe(
      carros => {
        this.carros = carros;
        loading.dismiss();
      },
      (err : HttpErrorResponse) => {
        console.log(err);
        
        loading.dismiss();
        
        this._alertController.create({
          title : 'Falha na requisição',
          subTitle : 'Não foi possível carregar a lista de carros. Por favor, tente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
  }
  selecionaCarro(carro: Carro) {
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });
  }
}
    