import { Component } from '@angular/core';
import { Pessoa } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  private storageKey = "storageKey";
  listagem: any;
  private storage: Storage;
  constructor(private router: Router){
    this.listagem = [];
    this.storage = window.localStorage;
  }

  adicionar() {
    const nome = (<HTMLInputElement>document.getElementById("name")).value;
    const email = (<HTMLInputElement>document.getElementById("email")).value;
    const dataNascimento = (<HTMLInputElement>document.getElementById("dataNascimento")).value;

    const pessoa: Pessoa = {
      Nome: nome,
      Email: email,
      DataNascimento: dataNascimento,
      Sexo: "F"
    };
    this.listagem.push(pessoa);

    let storageItems = this.storage.getItem(this.storageKey);


    if(storageItems != null){
     let listagemStorage = JSON.parse(storageItems);
     console.log(listagemStorage);
      this.listagem.push.apply(this.listagem, listagemStorage)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.listagem));
    this.router.navigate(['/listagem'])
  }

  limpar(){
    this.storage.clear();
    this.listagem.splice(0, this.listagem.length);
  }


}
