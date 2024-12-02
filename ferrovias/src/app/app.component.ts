import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NoComponent } from './no/no.component';
import { getPixels } from 'ndarray-pixels';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  title = 'onda';
  maximodenos: any;
  larguraTela: any;
  alturaTela: any;
  tamanhono = 20;
  nos: any;
  tempo = 10;
  mapaTamanho: any;
  pixels: any;
  grafo: any = [];
  populagrafo() {
    const colunas = Math.trunc(this.larguraTela / this.tamanhono);
    const linhas = Math.trunc(this.alturaTela / this.tamanhono);
    let cont = 0;
    for (let j = 0; j < linhas; j++) {
      for (let i = 0; i < colunas; i++) {
        this.grafo[cont] = [];
        if (j != 0) {
          this.grafo[cont].push(cont - colunas);
        }
        if (j != linhas - 1) {
          this.grafo[cont].push(cont + colunas);
        }
        if (i != 0) {
          this.grafo[cont].push(cont - 1);
        }
        if (i != colunas - 1) {
          this.grafo[cont].push(cont + 1);
        }
        //console.log(cont + ', ' + colunas + ', ' + linhas);
        cont++;
      }
    }
    console.log('acabou');
  }

  buscaEmLargura(no: any) {
    var grafocopia = JSON.parse(JSON.stringify(this.grafo));
    console.log(grafocopia);
    console.log(no);
    let lista = [no];
    let time = this.tempo;
    function busca(numerono: any) {
      let noagora = document.getElementById(numerono.toString());
      if (!grafocopia[numerono].includes('explorado')) {
        lista = lista.concat(grafocopia[numerono]);
        grafocopia[numerono].push('explorado');
        //console.log(lista);

        if (noagora) {
          noagora.children[0].classList.add('ligaonda');
        }
        setTimeout(() => busca(lista[0]), time);
        //console.log(numerono);
        lista = lista.filter((item) => item != numerono);
      } else {
        lista = lista.filter((item) => item != numerono);
        if (noagora) {
          noagora.children[0].classList.remove('ligaonda');
        }
        console.log('nó ' + numerono + ' explorado');
        if (lista.length) {
          busca(lista[0]);
        }
      }
    }
    busca(no);
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.larguraTela = window.innerWidth;
      this.alturaTela = window.innerHeight;
      console.log("Largura da tela" + this.larguraTela);
      console.log("Altura da tela" + this.alturaTela);
      const bytesIn = await fetch(
        '../assets/mapa.png'
      )
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => new Uint8Array(arrayBuffer));

      this.pixels = await getPixels(bytesIn, 'image/png'); // Uint8Array -> ndarray
      console.log('got pixels', this.pixels);
      this.tamanhono = this.larguraTela / this.pixels.shape[0];
      console.log(this.tamanhono);
    }

    this.maximodenos =
    Math.trunc(this.larguraTela) * Math.trunc(this.alturaTela);

    this.nos = (this.tamanhono - 5) / this.maximodenos;
    this.populagrafo();

  }
}
