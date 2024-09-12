import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchshipment',
})
export class SearchshipmentPipe implements PipeTransform {
  transform(value: any, arg?: any): unknown {
    if (!value || !arg) {
      return value;
    }
    arg = arg.toLowerCase();

    return value.filter((item) => {
      const guia = item.shipment.ShipmentCode;
      const destino = item.Destination.cityDestination.cityName.toLowerCase();
      const provider = item.Provider?.partners.toLowerCase();
      return (
        guia.includes(arg) || destino.includes(arg) || provider.includes(arg)
      );
    });
  }
}
