import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';

declare const $: any;
@Component({
  selector: 'app-datastep',
  templateUrl: './datastep.component.html',
  styleUrls: ['./datastep.component.css'],
})
export class DatastepComponent implements OnInit {
  @Input() public firststepForm: FormGroup;
  @Input() peso: FormControl;
  @Input() largo: FormControl;
  @Input() ancho: FormControl;
  @Input() alto: FormControl;
  @Input() tipoEnvio: FormControl;
  @Input() valor_asegurar: FormControl;
  @Input() name_label_valor_asegurar: string;
  @Input() fecha: FormControl;
  @Input() horario: FormControl;
  @Input() paso2: boolean;
  @Output() valorCambiado = new EventEmitter<any>();

  paquete_selected: boolean = false;
  documento_selected: boolean = false;

  pais_origen_valido: boolean = false;
  pais_destino_valido: boolean = false;

  @Input() public Origin: FormGroup;
  @Input() public Destination: FormGroup;

  pesoMax: number = 50.0;
  paso1: boolean = true;
  options = [
    {
      value: 1,
      sendvalue: '09:00-18:00',
      jornada: 'Todo el dia:',
      viewValue: 'Todo el dia: 09:00 AM - 18:00 PM',
    },
    {
      value: 2,
      sendvalue: '09:00-14:00',
      jornada: 'MAÑANA:',
      viewValue: 'MAÑANA: 09:00 AM- 14:00 PM',
    },
    {
      value: 3,
      sendvalue: '14:00-18:00',
      jornada: 'TARDE:',
      viewValue: 'TARDE: 14:00 - 18:00 PM',
    },
  ];

  tipo; // 1 origen, 2 envio

  myFilter = (d: Date | null): boolean => {
    if (!d) {
      return false; // No se permite si no hay fecha seleccionada
    }

    // Obtener el día de la semana
    const day = d.getDay();

    // Obtener la hora actual y la hora límite (2 PM)
    const horaActual = new Date().getHours();
    const horaLimite = 14;

    // Comparar con la fecha/hora actual
    const fechaActual = new Date();
    const fechaActualSinHora = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate()
    );
    const esAntesDeHoy = d.getTime() < fechaActualSinHora.getTime();
    const esDespuesDeHoraLimite = horaActual >= horaLimite;

    // Verificar condiciones para permitir la selección
    return (
      // No se permite seleccionar sábados (día 6) ni domingos (día 0)
      day !== 0 &&
      day !== 6 &&
      // No se permite seleccionar fechas anteriores a hoy
      !esAntesDeHoy &&
      // Si es después de las 2 PM, no se permite seleccionar el día actual
      !(
        esDespuesDeHoraLimite &&
        d.setHours(0, 0, 0, 0) === fechaActualSinHora.getTime()
      )
    );
  };

  constructor(
    public fb: FormBuilder,
    private apiservice: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges() {
    this.peso.valueChanges.subscribe((value) => {
      this.valorCambiado.emit({ propiedad: 'peso', valor: value });
    });

    this.valor_asegurar.valueChanges.subscribe((value) => {
      this.valorCambiado.emit({ propiedad: 'valor_asegurar', valor: value });
    });
  }

  ngOnInit(): void {
    if (this.tipoEnvio.value == '1') {
      this.paquete_selected = true;
      this.documento_selected = false;
    } else {
      this.paquete_selected = false;
      this.documento_selected = true;
    }
  }

  ngAfterViewInit() {}

  prueba(event) {
    this.tipoEnvio = event.value;
    if (event.value == '2') {
      this.documento_selected = true;
      this.paquete_selected = false;
      this.peso.patchValue(0.5);
      this.largo.patchValue(1);
      this.ancho.patchValue(1);
      this.alto.patchValue(1);
      this.valor_asegurar.patchValue(1);
      this.largo.disable();
      this.ancho.disable();
      this.alto.disable();
      this.pesoMax = 2.0;
    } else {
      this.documento_selected = false;
      this.paquete_selected = true;
      this.largo.enable();
      this.ancho.enable();
      this.alto.enable();
      this.pesoMax = 50.0;
    }
    this.valorCambiado.emit({ propiedad: 'tipoEnvio', valor: this.tipoEnvio });
  }

  public UpdatedatePickup(event?: any) {
    let value;
    let sendvalue;
    let jornada;

    this.options.forEach((item) => {
      if (item.value == this.horario.value) {
        value = item.value;
        sendvalue = item.sendvalue;
        jornada = item.jornada;
      }
    });
    localStorage.setItem('hora', sendvalue);
    localStorage.setItem('jornada', jornada);
    this.valorCambiado.emit({
      propiedad: 'hora_entrega',
      valor: value,
    });
  }

  setStep() {
    if (this.paso2 == false) {
      this.paso2 = true;
      this.paso1 = false;
      // console.log(this.firststepForm.value);
      this.valorCambiado.emit({
        propiedad: 'step',
        key: 'second',
        valor: this.paso2,
      });
    } else {
      this.valorCambiado.emit({
        propiedad: 'recalcular',
      });
    }
  }

  onInputChange(event: any) {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Filtrar solo números
    this.valor_asegurar.setValue(numericValue); // Actualizar el valor del FormControl
  }

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
  }

  public openModal(modal: String) {
    $(`#${modal}`).modal('show');
  }

  public onCountryChange(event) {
    /* console.log(
      `Valor cambiado en ${event.propiedad}:`,
      event.valor,
      event.tipo
    ); */

    if (event.propiedad === 'pais_seleccionado') {
      this.tipo = event.tipo;
      if (event.tipo == 1) {
        this.Origin.patchValue({ ciudad: '' });
        this.Origin.patchValue({ StateName: '' });
        this.Origin.patchValue({ PostalCode: '' });
        this.Origin.patchValue({ StateCode: '' });
        this.Origin.patchValue({ CountryCode: event.valor.CountryCode });
        this.Origin.patchValue({ CountryName: event.valor.CountryName });
        this.Origin.patchValue({ Cam1: '' });
        this.pais_origen_valido = true;
      }

      if (event.tipo == 2) {
        this.Destination.patchValue({ ciudad: '' });
        this.Destination.patchValue({ StateName: '' });
        this.Destination.patchValue({ PostalCode: '' });
        this.Destination.patchValue({ StateCode: '' });
        this.Destination.patchValue({ CountryCode: event.valor.CountryCode });
        this.Destination.patchValue({ CountryName: event.valor.CountryName });
        this.Destination.patchValue({ Cam1: '' });
        this.pais_destino_valido = true;
      }

      this.openModal('envio');
      this.valorCambiado.emit({ propiedad: 'pais_cambiado' });
    }
  }

  getCityControl() {
    if (this.tipo === 1) {
      return this.Origin.get('ciudad') as FormControl;
    } else if (this.tipo === 2) {
      return this.Destination.get('ciudad') as FormControl;
    }

    return this.Origin.get('ciudad') as FormControl;
  }

  public saveData(event) {
    console.log(`Valor cambiado en ${event.propiedad}:`, event.tipo);

    if (event.tipo == 1) {
      this.valorCambiado.emit({
        propiedad: 'saveData',
        valor: this.Origin.value,
      });
    }

    if (event.tipo == 2) {
      this.valorCambiado.emit({
        propiedad: 'saveData2',
        valor: this.Destination.value,
      });
    }
  }

  public ModalCerrado(event) {
    if (event.tipo == 1) {
      this.pais_origen_valido = false;
    } else {
      this.pais_destino_valido = false;
    }
  }
}
