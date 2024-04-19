import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';



export class SeuComponente {
  constructor(private router: Router) {}

  goToAboutPage() {
    this.router.navigate(['/about']);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  private storage: Storage;
  listagem: any;

  private storageKey = "storageKey";

  constructor(private http : HttpClient){
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

  title = 'actuar-angular-2';



  adicionar() {
    let nome =  (<HTMLInputElement>document.getElementById("name")).value;
    let email =  (<HTMLInputElement>document.getElementById("email")).value
    let dataNascimento =  (<HTMLInputElement>document.getElementById("dataNascimento")).value

    let objeto = {
      "Nome": nome,
      "Email":email,
      "DataNascimento": dataNascimento,
      "Sexo": "F",
    }


    this.listagem.push(objeto);
    this.storage.setItem(this.storageKey, JSON.stringify(this.listagem));
  }

  deletar(index: any){
    this.listagem.splice(index, 1);
    this.storage.setItem(this.storageKey, JSON.stringify(this.listagem));
  }

  limpar(){
    this.storage.clear();
    this.listagem.splice(0, this.listagem.length);
  }
}

export class Pessoa{
  Nome: string | null = ""
  Email: string | null = ""
  DataNascimento: string | null = ""
  Sexo: string | null = ""
}
