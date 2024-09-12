import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterproviders',
})
export class FilterprovidersPipe implements PipeTransform {
  transform(value: any, arg?: any): unknown {
    if (!value || !arg) {
      return value;
    }
    arg = arg.toLowerCase();

    return value.filter((item) => {
      const business = item.Provider.toLowerCase()
      const serviceType = item.ServiceType.toLowerCase()

      return (
        business.includes(arg) ||
        serviceType.includes(arg)
      );
    });
  }
}
