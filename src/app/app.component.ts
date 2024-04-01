import { Component } from '@angular/core';

@Component({
  selector: 'cl-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  nome = 'Henrique';

  printaNome() {
    console.log(this.nome);
  }
}
