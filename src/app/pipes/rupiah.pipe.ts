import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  standalone: true
})
export class RupiahPipe implements PipeTransform {


  transform(value: number): any {

    if (value == null) return ""
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(value)
  }

}
