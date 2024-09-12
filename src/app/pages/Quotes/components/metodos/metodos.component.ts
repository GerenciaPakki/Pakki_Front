import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

declare const $: any;

@Component({
  selector: 'app-metodos',
  templateUrl: './metodos.component.html',
  styleUrls: ['./metodos.component.css'],
})
export class MetodosComponent implements OnInit {
  @Input() tipopago: FormControl;
  @Output() tipopagoCambiado = new EventEmitter<any>();
  @Input() shoppingTypeForm: FormGroup;
  @Input() transportSelected: any[];
  @Input() activeview: boolean = false;

  @ViewChild('formulario') formulario: ElementRef;
  @ViewChild('script', { static: false }) scriptElementRef: ElementRef;
  @ViewChild('buttonpay', { static: false }) buttonpayElementRef: ElementRef;
  constructor(private renderer: Renderer2, public fb: FormBuilder) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeview) {
      // La propiedad activeview ha cambiado, puedes realizar acciones aquí
      console.log('activeview ha cambiado:', this.activeview);
      if (this.activeview) {
        this.ejecutarScript();
      }
    }
  }

  optionSelected(numero: string) {
    this.tipopago.setValue(numero);
    if (this.tipopago.value == '1') {
      //this.eliminarBoton();
      this.tipopagoCambiado.emit({
        propiedad: 'tipo_pago_change',
        valor: this.tipopago.value,
      });
      return;
    }
    if (this.tipopago.value == '2') {
      this.ejecutarScript();
      this.tipopagoCambiado.emit({
        propiedad: 'tipo_pago_change',
        valor: this.tipopago.value,
      });
      return;
    }
    if (this.tipopago.value == '3') {
      //this.eliminarBoton();
      this.tipopagoCambiado.emit({
        propiedad: 'tipo_pago_change',
        valor: this.tipopago.value,
      });
      this.openModal('qrbancolombia');
    }

    if (this.tipopago.value == '4') {
      //this.eliminarBoton();
      this.tipopagoCambiado.emit({
        propiedad: 'tipo_pago_change',
        valor: this.tipopago.value,
      });
      this.openModal('dataphone');
    }
  }

  ejecutarScript() {
    const scriptExistente = document.querySelector('script.epayco-button');
    if (!scriptExistente) {
      const newScriptElement = this.renderer.createElement('script');
      newScriptElement.src = 'https://checkout.epayco.co/checkout.js';
      newScriptElement.className = 'epayco-button';
      newScriptElement.dataset.epaycoKey = environment.KEY;
      newScriptElement.dataset.epaycoAmount =
        this.transportSelected[0].shippingValue; // valor
      newScriptElement.dataset.epaycoName =
        this.shoppingTypeForm.get('Content')?.value; //nombre del producto
      newScriptElement.dataset.epaycoDescription =
        this.shoppingTypeForm.get('Content')?.value;
      newScriptElement.dataset.epaycoCurrency = 'cop';
      newScriptElement.dataset.epaycoCountry = 'co';
      newScriptElement.dataset.epaycoTest = 'true';
      newScriptElement.dataset.epaycoExternal = 'false';
      newScriptElement.dataset.epaycoResponse = environment.URLRESPONSE;
      newScriptElement.dataset.epaycoConfirmation = environment.URLRESPONSE;
      newScriptElement.dataset.epaycoMethodconfirmation = 'get';
      newScriptElement.dataset.methodsDisable = [['SP'], ['PSE'], ['CASH']];

      this.renderer.appendChild(
        this.scriptElementRef.nativeElement,
        newScriptElement
      );
    }

    const testDiv = this.buttonpayElementRef.nativeElement;
    testDiv.style.display = 'flex';
  }

  eliminarBoton() {
    if (this.buttonpayElementRef) {
      const testDiv = this.buttonpayElementRef.nativeElement;
      testDiv.style.display = 'none';
    }
  }
  public openModal(modal: String) {
    $(`#${modal}`).modal('show');
  }
}
