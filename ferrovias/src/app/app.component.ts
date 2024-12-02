import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getPixels } from 'ndarray-pixels';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ],
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
  estilo:any;

  conteiner() {
    this.estilo = "max-width: "+ this.tamanhono * this.pixels.shape[0]+"px; ";
  }
  estilono(r: any, g: any, b: any) {
    return ("width: "+ this.tamanhono +"px; height: "+ this.tamanhono +"px; background-color: rgba("+ r +","+ g +","+ b +",1);" );
  }
  populagrafo() {
    let cont = 0;
    for (let j = 0; j < this.pixels.shape[1]; j++) {
      for (let i = 0; i < this.pixels.shape[0]; i++) {
        this.grafo[cont] = [];
        if (j != 0) {
          this.grafo[cont].push(cont - this.pixels.shape[0]);
        }
        if (j != this.pixels.shape[1] - 1) {
          this.grafo[cont].push(cont + this.pixels.shape[0]);
        }
        if (i != 0) {
          this.grafo[cont].push(cont - 1);
        }
        if (i != this.pixels.shape[0] - 1) {
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
    function busca(numerono: any) {
      let noagora = document.getElementById(numerono.toString());
      if (!grafocopia[numerono].includes('explorado')) {
        lista = lista.concat(grafocopia[numerono]);
        grafocopia[numerono].push('explorado');
        //console.log(lista);

        if (noagora) {
          noagora.children[0].classList.add('ligaonda');
        }
        busca(lista[0]);
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
        '../assets/mapa_mini.jpg'
      )
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => new Uint8Array(arrayBuffer));

      this.pixels = await getPixels(bytesIn, 'image/jpeg'); // Uint8Array -> ndarray
      console.log('got pixels', this.pixels);
      this.tamanhono = Math.trunc(this.larguraTela / this.pixels.shape[0])-1;
      console.log(this.tamanhono);
      this.maximodenos =
      Math.trunc(this.pixels.shape[0]) * Math.trunc(this.pixels.shape[1]);
      this.conteiner();
    this.nos = (this.tamanhono - 5) / this.maximodenos;
    this.populagrafo();
    }

  }
}
