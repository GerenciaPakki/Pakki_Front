import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companiessearch',
})
export class CompaniessearchPipe implements PipeTransform {
  transform(value: any, arg?: any): unknown {
    if (!value || !arg) {
      return value;
    }
    arg = arg.toLowerCase();

    return value.filter((item) => {
      const nombre = item.business.irs_nit.toLowerCase();
      const nit = item.business.businessname.toLowerCase();

      return nombre.includes(arg) || nit.includes(arg);
    });
  }
}
