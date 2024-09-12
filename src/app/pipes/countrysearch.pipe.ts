import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countrysearch',
})
export class CountrysearchPipe implements PipeTransform {
  transform(value: any, arg?: any): unknown {
    if (!value || !arg) {
      return value;
    }
    arg = arg.toLowerCase();

    return value.filter((item) => {
      const CountryName = item.CountryName?.toLowerCase();
      return CountryName.includes(arg);
    });
  }
}
