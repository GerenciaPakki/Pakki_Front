import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterusers',
})
export class FilterusersPipe implements PipeTransform {
  transform(value: any, arg?: any): unknown {
    if (!value || !arg) {
      return value;
    }
    arg = arg.toLowerCase();

    return value.filter((item) => {
      const nombre = item.name.toLowerCase();
      const docu = item.docu.toString();
      const email = item.email.toLowerCase();
      return nombre.includes(arg) || email.includes(arg) || docu.includes(arg);
    });
  }
}
