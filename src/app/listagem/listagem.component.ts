import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {

  private storage: Storage;
  listagem: any;


  private storageKey = "storageKey";


  constructor(private http : HttpClient, private router: Router){
    this.storage = window.localStorage;

    this.http.get<Pessoa[]>("https://6467a872e99f0ba0a814b5ff.mockapi.io/api/Pessoas")
           .subscribe(resultado => {
            this.listagem = resultado;
            console.log(resultado)
            let storageItems = this.storage.getItem(this.storageKey);

            if(storageItems != null){
              let listagemStorage = JSON.parse(storageItems);
              this.listagem.splice(0, this.listagem.length);
              this.listagem.push.apply(this.listagem, listagemStorage)
            }
           });

  }


  navegarParaPaginaRegistro(){
    this.router.navigate(['/registro'])
  }

  deletar(index: number) {
    this.listagem.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(this.listagem));
  }

  limpar() {
    localStorage.removeItem(this.storageKey);
    this.listagem = [];
  }
}

export interface Pessoa {
  Nome: string | null;
  Email: string | null;
  DataNascimento: string | null;
  Sexo: string | null;
}
