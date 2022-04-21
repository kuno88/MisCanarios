import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCana = [];
    for (const canario of value) {
       if ((canario.linea.toLowerCase().indexOf(arg.toLowerCase()) > -1) || (canario.procedencia.toLowerCase().indexOf(arg.toLowerCase()) > -1) 
       ||(canario.nAnillo.toLowerCase().indexOf(arg.toLowerCase()) > -1) || (canario.genero.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {

         resultCana.push(canario);
       };
     
    };
    return resultCana;
  }

}
