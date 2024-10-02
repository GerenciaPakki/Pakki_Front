import { filter } from 'rxjs/operators';
// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
  TemplateRef,
  Renderer2,
} from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder } from '@angular/forms';
import { ApiGoogleService } from '../../../../services/api.google.service';
import { ApiService } from '../../../../services/api.service';
import { event } from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Loader } from '@googlemaps/js-api-loader';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ViewportScroller } from '@angular/common';

declare const google: any;
declare const $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: EventTarget;
  getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-wizard-cmp',
  templateUrl: 'quoterforms.component.html',
  styleUrls: ['quoterforms.component.css'],
})
export class QuoterformsComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('formulario') formulario: ElementRef;
  @ViewChild('script', { static: false }) scriptElementRef: ElementRef;
  @ViewChild('buttonpay', { static: false }) buttonpayElementRef: ElementRef;
  @ViewChild('elegirservicio') elegirservicio: ElementRef;
  @ViewChild('recoleccion') recoleccion: ElementRef;
  @ViewChild('pagar') pagar: ElementRef;
  @ViewChild('print') print: ElementRef;
  @ViewChild('next') next: ElementRef;

  cities = [
    { value: 'paris-0', viewValue: 'Paki' },
    { value: 'miami-1', viewValue: 'Unicentro' },
    { value: 'bucharest-2', viewValue: 'Bucharest' },
    { value: 'new-york-3', viewValue: 'New York' },
    { value: 'london-4', viewValue: 'London' },
    { value: 'barcelona-5', viewValue: 'Barcelona' },
    { value: 'moscow-6', viewValue: 'Moscow' },
  ];

  city: string;

  titles = ['Empresa', 'Servicio', 'Costo'];

  /**Variable que guarda la selección de empresa */
  transportSelected: Array<any> = [];
  /**********************************************/

  /**Varible que almacena todas las trasnportadoras para el envio */
  rowTransporting = [];
  /****************************************************************/

  /**Manejador de pasos */
  stepers = {
    firts: true, //cotizador
    second: false, // seleccionar transporte
    three: false, //datos remitente
    fourt: false, // pagar
    five: false, // imprimir
  };

  sendPackage: string = '';
  country: string;

  shippingType = [
    { message: 'Envío de Paquete', status: 'pkg', select: false },
    {
      message: 'Envío de Documento (No > 0.5 Kg)',
      status: 'doc',
      select: true,
    },
  ];
  matcher = new MyErrorStateMatcher();

  shoppingTypeForm: FormGroup;
  ProformaTipopagoForm: FormGroup;
  firststepForm: FormGroup;
  facturaForm: FormGroup;
  paymentreference: FormGroup;
  tipoEnvio: string = '1';

  cityReceibedPackage: string = '';
  IniCotizacion: boolean = false;
  checkEmpresa: boolean = false;
  checkEmpresaDest: boolean = false;

  fecha_actual = moment().format();
  cityOptions: string[] = [];
  selectedRow: number;
  /**Variables para el modal de proforma */
  peso_pendiente: number = 0.5;
  piezas_totales: number = 0;
  precio_total: number = 0;
  valor_asegurar_total: number = 1;
  /******/

  /**Checks */
  selectRecogida: boolean = false;
  use_data_remitente: boolean = false;
  /****/

  /**Variable de Tabla proforma */
  dataItemsAdd = [];
  /*****/

  name_label_valor_asegurar: String = 'Valor a asegurar USD';

  infouser: any = ''; // informacion usuario logiado
  businessUser: string = ''; // Negocio del usuario
  selectsucursal = JSON.parse(localStorage.getItem('selectsucursal'));
  public showwizardtable: boolean = false;
  public firtstepenabled: boolean = false;
  public secondstepenabled: boolean = false;
  public thirdstepenabled: boolean = false;
  public fourtstepenabled: boolean = false;

  Origin: FormGroup;
  Destination: FormGroup;
  nombre_pais_origen: FormControl;
  nombre_pais_destino: FormControl;
  ciudadOrigen!: FormControl;
  ciudadDes!: FormControl;

  numGuia = '';
  emailTo = '';
  guia = '';
  proforma = '';
  carta = '';
  pickup = '';
  panelOpenState = false;
  responseepayco: any;
  ConfirmationNumber: any;
  codigointerno: any;

  constructor(
    public fb: FormBuilder,
    private apiservice: ApiService,
    private sweetalertservice: SweetalertService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private renderer: Renderer2,
    private viewportScroller: ViewportScroller,
    private el: ElementRef
  ) {}

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  ngOnInit() {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    this.infouser = this.userservice.getAllInfoUser();
    this.ProformaTipopagoForm = this.fb.group({
      tipoPago: ['1', Validators.required],
    });

    this.firststepForm = this.fb.group({
      tipoEnvio: ['1', Validators.required],
      Weight: [0.5, Validators.required],
      Length: [1],
      Width: [1],
      Height: [1],
      DeclaredValue: [1],
      fecha: ['', Validators.required],
      horario: [1, Validators.required],
    });

    this.shoppingTypeForm = this.fb.group({
      fullName: ['', Validators.required],
      companyName: [''],
      direccion: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(36),
        ],
      ],
      direccion_adicional: [
        '',
        [Validators.minLength(4), Validators.maxLength(36)],
      ],
      direccion_adicional_2: [
        '',
        [Validators.minLength(4), Validators.maxLength(36)],
      ],
      direcciones_adicionales: this.fb.array([]),
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],

      fullNameDestinatario: ['', Validators.required],
      EmpresaDestino: ['', Validators.required],
      direccionDestino: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(36),
        ],
      ],
      direccion_adicional_destino: [
        '',
        [Validators.minLength(4), Validators.maxLength(36)],
      ],
      direccion_adicional_destino_2: [
        '',
        [Validators.minLength(4), Validators.maxLength(36)],
      ],
      telefonoDestino: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      emailDestino: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      direcciones_adicionales_destino: this.fb.array([]),
      Content: ['', Validators.required],

      fullNameRecogida: [''],
      telefonoRecogida: [''],
      direccionRecogida: [''],
      direccionAdicionalRecogida: [''],
      direccionAdicional2Recogida: [''],
      Reference: [''],
    });

    this.facturaForm = this.fb.group({
      remitente: ['', Validators.required],
      destinatario: ['', Validators.required],
      razon: ['', Validators.required],
      nro_factura: ['', Validators.required],
      ItemDescription: ['', Validators.required],
      descripcion_adicional: ['', Validators.required],
      Pieces: [1, Validators.required],
      WeightPerUnit: [0.5, Validators.required],
      ValuePerUnit: [0, Validators.required],
    });

    this.Origin = this.fb.group({
      nombre_pais_origen: [''],
      StateName: [''],
      ciudad: [''],
      StateCode: [''],
      CountryCode: [''],
      CountryName: [''],
      PostalCode: [''],
      Cam1: [''],
    });
    this.nombre_pais_origen = this.Origin.get(
      'nombre_pais_origen'
    ) as FormControl;
    this.ciudadOrigen = this.Origin.get('ciudad') as FormControl;

    this.Destination = this.fb.group({
      nombre_pais_destino: [''],
      StateName: [''],
      ciudad: [''],
      StateCode: [''],
      CountryCode: [''],
      CountryName: [''],
      PostalCode: [''],
      Cam1: [''],
    });

    this.paymentreference = this.fb.group({
      ReferenceCodePay: ['', Validators.required],
      valor: [0, Validators.required],
    });

    this.nombre_pais_destino = this.Destination.get(
      'nombre_pais_destino'
    ) as FormControl;
    this.ciudadDes = this.Destination.get('ciudad') as FormControl;

    this.patchshoppingTypeForm();

    // Code for the Validator
    const $validator = $('.card-wizard form').validate({
      rules: {
        sendPackage: {
          required: true,
          minlength: 3,
        },
        lastname: {
          required: true,
          minlength: 3,
        },
        email: {
          required: true,
          minlength: 3,
        },
      },

      highlight: function (element) {
        $(element)
          .closest('.form-group')
          .removeClass('has-success')
          .addClass('has-danger');
      },
      success: function (element) {
        $(element)
          .closest('.form-group')
          .removeClass('has-danger')
          .addClass('has-success');
      },
      errorPlacement: function (error, element) {
        $(element).append(error);
      },
    });

    // Wizard Initialization

    $('.card-wizard').bootstrapWizard({
      tabClass: 'nav nav-pills',
      nextSelector: '.btn-next',
      previousSelector: '.btn-previous',

      onNext: function (tab, navigation, index) {
        var $valid = $('.card-wizard form').valid();
        if (!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },

      onInit: function (tab: any, navigation: any, index: any) {
        // check number of tabs and fill the entire row
        let $total = navigation.find('li').length;
        let $wizard = navigation.closest('.card-wizard');

        let $first_li = navigation.find('li:first-child a').html();
        let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
        $('.card-wizard .wizard-navigation').append($moving_div);

        $total = $wizard.find('.nav li').length;
        let $li_width = 100 / $total;

        let total_steps = $wizard.find('.nav li').length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;

        let mobile_device = $(document).width() < 600 && $total > 3;

        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }

        $wizard.find('.nav li').css('width', $li_width + '%');

        let step_width = move_distance;
        move_distance = move_distance * index_temp;

        let $current = index + 1;

        if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
          move_distance -= 8;
        } else if (
          $current == total_steps ||
          (mobile_device == true && index % 2 == 1)
        ) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
          transform:
            'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
          transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
        });
        $('.moving-tab').css('transition', 'transform 0s');
      },

      onTabClick: function (tab: any, navigation: any, index: any) {
        const $valid = $('.card-wizard form').valid();

        if (!$valid) {
          return false;
        } else {
          return true;
        }
      },

      onTabShow: function (tab: any, navigation: any, index: any) {
        let $total = navigation.find('li').length;
        let $current = index + 1;
        elemMainPanel.scrollTop = 0;
        const $wizard = navigation.closest('.card-wizard');

        // If it's the last tab then hide the last button and show the finish instead
        if ($current >= $total) {
          $($wizard).find('.btn-next').hide();
          $($wizard).find('.btn-finish').show();
        } else {
          $($wizard).find('.btn-next').show();
          $($wizard).find('.btn-finish').hide();
        }

        const button_text = navigation
          .find('li:nth-child(' + $current + ') a')
          .html();

        setTimeout(function () {
          $('.moving-tab').text(button_text);
        }, 150);

        const checkbox = $('.footer-checkbox');

        if (index !== 0) {
          $(checkbox).css({
            opacity: '0',
            visibility: 'hidden',
            position: 'absolute',
          });
        } else {
          $(checkbox).css({
            opacity: '1',
            visibility: 'visible',
          });
        }
        $total = $wizard.find('.nav li').length;
        let $li_width = 100 / $total;

        let total_steps = $wizard.find('.nav li').length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;

        let mobile_device = $(document).width() < 600 && $total > 3;

        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }

        $wizard.find('.nav li').css('width', $li_width + '%');

        let step_width = move_distance;
        move_distance = move_distance * index_temp;

        $current = index + 1;

        if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
          move_distance -= 8;
        } else if (
          $current == total_steps ||
          (mobile_device == true && index % 2 == 1)
        ) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
          transform:
            'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
          transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
        });
      },
    });

    $('[data-toggle="wizard-radio"]').click(function () {
      const wizard = $(this).closest('.card-wizard');
      wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
      $(this).addClass('active');
      $(wizard).find('[type="radio"]').removeAttr('checked');
      $(this).find('[type="radio"]').attr('checked', 'true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('[type="checkbox"]').removeAttr('checked');
      } else {
        $(this).addClass('active');
        $(this).find('[type="checkbox"]').attr('checked', 'true');
      }
    });

    $('.set-full-height').css('height', 'auto');

    moment.locale('es');

    /**Validar si viene referencia de pago */
    this.route.queryParams.subscribe((params) => {
      const ref_payco = params['ref_payco'];
      if (ref_payco) {
        // Hacer algo con el parámetro "id", por ejemplo, imprimirlo en la consola
        localStorage.setItem('ref', ref_payco);
        this.validateEpaycoResponse(ref_payco);
      }
    });

    this.businessUser = this.userservice.getbusinessName();

    /**Setiar por defecto la Hora en localstorage */
    localStorage.setItem('hora', '09:00-18:00');
    localStorage.setItem('jornada', 'Todo el dia:');
  }

  ngOnChanges(changes: SimpleChanges) {
    const input = $(this);

    if (input[0].files && input[0].files[0]) {
      const reader: any = new FileReader();

      reader.onload = function (e: any) {
        $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
      };
      reader.readAsDataURL(input[0].files[0]);
    }
  }

  async ngAfterViewInit() {
    $(window).resize(() => {
      $('.card-wizard').each(function () {
        setTimeout(() => {
          const $wizard = $(this);
          const index = $wizard.bootstrapWizard('currentIndex');
          let $total = $wizard.find('.nav li').length;
          let $li_width = 100 / $total;

          let total_steps = $wizard.find('.nav li').length;
          let move_distance = $wizard.width() / total_steps;
          let index_temp = index;
          let vertical_level = 0;

          let mobile_device = $(document).width() < 600 && $total > 3;
          if (mobile_device) {
            move_distance = $wizard.width() / 2;
            index_temp = index % 2;
            $li_width = 50;
          }

          $wizard.find('.nav li').css('width', $li_width + '%');

          let step_width = move_distance;
          move_distance = move_distance * index_temp;

          let $current = index + 1;

          if ($current == 1 || (mobile_device == true && index % 2 == 0)) {
            move_distance -= 8;
          } else if (
            $current == total_steps ||
            (mobile_device == true && index % 2 == 1)
          ) {
            move_distance += 8;
          }

          if (mobile_device) {
            let x: any = index / 2;
            vertical_level = parseInt(x);
            vertical_level = vertical_level * 38;
          }

          $wizard.find('.moving-tab').css('width', step_width);
          $('.moving-tab').css({
            transform:
              'translate3d(' +
              move_distance +
              'px, ' +
              vertical_level +
              'px, 0)',
            transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
          });

          $('.moving-tab').css({
            transition: 'transform 0s',
          });
        }, 500);
      });
    });
  }

  scrollToTable() {
    const tableElement =
      this.el.nativeElement.querySelector('#tabla_transport');
    if (tableElement) {
      tableElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  public patchshoppingTypeForm() {
    let fullname =
      this.infouser?.collaborator?.name +
      ' ' +
      this.infouser?.collaborator?.lastName;
    this.shoppingTypeForm.patchValue({ fullNameRecogida: fullname });
    this.shoppingTypeForm.patchValue({
      telefonoRecogida: this.infouser?.business?.branchOffices[0]?.cellPhone,
    });
    this.shoppingTypeForm.patchValue({
      direccionRecogida: this.infouser?.business?.branchOffices[0]?.mainAddress,
    });
    this.shoppingTypeForm.patchValue({
      direccionAdicionalRecogida: '',
    });
    this.shoppingTypeForm.patchValue({
      direccionAdicional2Recogida: '',
    });
  }

  openModalProforma() {
    /* console.log(this.firststepForm.value);
    console.log(this.shoppingTypeForm.value); */
    if (this.firststepForm.get('tipoEnvio').value == 1) {
      this.openModal('proforma');
    }
  }

  validateValorAsegurar() {
    return (
      this.precio_total < this.firststepForm.get('DeclaredValue').value ||
      this.peso_pendiente != 0
    );
  }

  get getAddressDestino() {
    return this.shoppingTypeForm.get(
      'direcciones_adicionales_destino'
    ) as FormArray;
  }

  addAddressDestino() {
    this.getAddressDestino.push(this.fb.control(''));
    console.log(this.shoppingTypeForm.value);
  }

  get getAddress() {
    return this.shoppingTypeForm.get('direcciones_adicionales') as FormArray;
  }

  addAddress() {
    this.getAddress.push(this.fb.control(''));
  }

  public openModal(modal: String) {
    $(`#${modal}`).modal('show');
  }

  /**
   * The function `nextStep()` is used to navigate through different steps in a process, updating the
   * state of the application and performing various actions based on the current step.
   * @returns nothing (undefined).
   */
  public nextStep() {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    console.log('paso con el que llega', this.stepers);

    if (this.stepers.firts) {
      this.stepers.firts = false;
      this.stepers.second = true;
      this.stepers.three = false;
      this.firtstepenabled = true;
      this.elegirservicio.nativeElement.click();
      return;
    }
    if (this.stepers.second) {
      this.stepers.firts = false;
      this.stepers.second = false;
      this.stepers.three = true;
      this.secondstepenabled = true;
      this.recoleccion.nativeElement.click();

      return;
    }

    if (this.stepers.three) {
      this.stepers.three = false;
      this.stepers.fourt = true;
      this.thirdstepenabled = true;
      this.pagar.nativeElement.click();

      elemMainPanel.scrollTop = 0;
      let origin = this.getTypeEnvio(); // saber si es nacional o internacional el envio
      if (this.tipoEnvio == '1' && origin == 2) {
        this.openModalProforma();
      }
      return;
    }

    if (this.stepers.fourt) {
      this.stepers.fourt = false;
      this.stepers.five = true;
      this.finalizarProceso();
      return;
    }
  }

  goBack() {
    console.log('back', this.stepers);
    if (this.stepers.second) {
      this.stepers.firts = true; // Marcar el primer paso como activo
      this.stepers.second = false; // Desactivar el segundo paso
      this.stepers.three = false; // Desactivar el tercer paso
      this.firtstepenabled = true;
      this.secondstepenabled = false;
      this.thirdstepenabled = false;

      setTimeout(() => {
        this.elegirservicio.nativeElement.click();
      }, 500);
      // Activar el título del primer paso
    } else if (this.stepers.three) {
      this.stepers.second = true; // Marcar el segundo paso como activo
      this.stepers.three = false; // Desactivar el tercer paso

      this.firtstepenabled = true;
      this.secondstepenabled = false;
      this.thirdstepenabled = false;

      this.elegirservicio.nativeElement.click(); // Activar el título del segundo paso
    } else if (this.stepers.fourt) {
      this.stepers.three = true; // Marcar el tercer paso como activo
      this.stepers.fourt = false; // Desactivar el cuarto paso
      this.firtstepenabled = false;
      this.secondstepenabled = false;
      this.thirdstepenabled = true;
      this.recoleccion.nativeElement.click(); // Activar el título del tercer paso
    }
  }

  /**Metodo para habilitar o deshabilitar si el usuario da click en titulos de Elegir servicio, etc. */
  clickTitle(paso: number) {
    console.log(paso);
    if (paso == 1) {
      this.stepers.second = true;
      this.stepers.three = false;
      this.stepers.fourt = false;
      this.firtstepenabled = true;
      this.secondstepenabled = false;
      this.thirdstepenabled = false;
    } else if (paso == 2) {
      this.stepers.three = true;
      this.stepers.second = false;
      this.secondstepenabled = true;
    }
  }

  public closeModal(modal: String) {
    $(`#${modal}`).modal('hide');
    if (modal == 'modalsedes') {
      this.nextStep();
    }
  }

  deleteAddressDestino(indice: number) {
    this.getAddressDestino.removeAt(indice);
  }

  deleteAddress(indice: number) {
    this.getAddress.removeAt(indice);
  }

  addData() {
    console.log(this.facturaForm.get('WeightPerUnit').value);

    if (this.facturaForm.get('WeightPerUnit').value == 0) {
      Swal.fire({
        icon: 'error',
        title: 'El Peso del Producto no puede ser 0',
      });
    } else if (
      this.facturaForm.get('WeightPerUnit').value *
        this.facturaForm.get('Pieces').value >
      this.peso_pendiente
    ) {
      Swal.fire({
        icon: 'error',
        title: 'El Peso del Producto supera el seleccionado',
      });
    } else if (this.facturaForm.get('ValuePerUnit').value < 0) {
      Swal.fire({
        icon: 'error',
        title: 'El valor a Asegurar No puede ser menor que 0',
      });
    } else {
      let obj = {
        ItemDescription:
          this.facturaForm.get('ItemDescription').value +
          ' ' +
          this.facturaForm.get('descripcion_adicional').value,
        Pieces: this.facturaForm.get('Pieces').value,
        WeightPerUnit: this.facturaForm.get('WeightPerUnit').value,
        ValuePerUnit: this.facturaForm.get('ValuePerUnit').value,
        ValueTotal:
          this.facturaForm.get('ValuePerUnit').value *
          this.facturaForm.get('Pieces').value,
      };

      this.peso_pendiente -= Number(
        this.facturaForm.get('WeightPerUnit').value *
          this.facturaForm.get('Pieces').value
      );
      this.piezas_totales =
        this.piezas_totales + Number(this.facturaForm.get('Pieces').value);
      this.precio_total +=
        Number(this.facturaForm.get('ValuePerUnit').value) *
        Number(this.facturaForm.get('Pieces').value);

      this.valor_asegurar_total = Number(
        this.facturaForm.get('ValuePerUnit').value
      );
      console.log(this.valor_asegurar_total, 'valor asegurar total');

      this.dataItemsAdd.push(obj);
      /*  console.log(this.facturaForm.value);
      console.log(this.data); */
    }
  }

  public removeData(indice: number, row) {
    console.log(row);
    this.peso_pendiente += row.WeightPerUnit * row.Pieces;
    this.piezas_totales -= Number(row.Pieces);
    this.precio_total -= Number(row.ValuePerUnit) * row.Pieces;
    this.valor_asegurar_total += Number(row.ValuePerUnit);
    this.dataItemsAdd.splice(indice, 1);
  }

  selectedCompnay(event) {
    this.checkEmpresa = event.checked;
  }

  selectedCompanyDest(event) {
    this.checkEmpresaDest = event.checked;
  }

  public finalizarProceso() {
    console.log('finalizar Proceso');
    if (this.firststepForm.get('tipoEnvio').value == '2') {
      console.log('enviar doc');
      this.sendDoc();
    } else {
      this.sendPack();
    }
  }

  /**
   * The function `trasportadoraSelected` logs the selected row and column, sets the selected row,
   * pushes the selected row to the `transportSelected` array, formats the shipping value as a
   * currency, and opens a modal.
   * @param {any} row - The "row" parameter is an object that represents a selected row in a table or
   * grid. It contains information about the selected item, such as its properties or data.
   * @param {number} [column] - The column parameter is an optional number that represents the index of
   * the selected column in the row.
   */
  trasportadoraSelected(row: any, column?: number) {
    this.selectedRow = column;
    this.transportSelected = [];
    this.transportSelected.push(row);

    const valorFormateado = row.shippingValue.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }); // Formatiar a COP
    this.paymentreference.patchValue({ valor: valorFormateado });
    this.openModal('modalsedes');
  }

  disabledselect() {
    this.selectPickup(false);
    this.closeModal('modalRemitente');
  }

  selectPickup(value?: boolean) {
    this.selectRecogida = value;
    if (this.selectRecogida == true) {
      if (this.transportSelected[0].partners == 'UPS') {
        this.openModal('modalUPS');
        setTimeout(() => {
          this.selectRecogida = false;
        }, 1000);
      } else {
        this.openModal('modalRemitente');
      }
    } else {
      this.patchshoppingTypeForm();
      this.use_data_remitente = false;
    }
  }

  public useDataRemitente(value) {
    this.use_data_remitente = value;
    if (this.use_data_remitente == true) {
      this.shoppingTypeForm.patchValue({
        fullNameRecogida: this.shoppingTypeForm.get('fullName').value,
      });
      this.shoppingTypeForm.patchValue({
        telefonoRecogida: this.shoppingTypeForm.get('telefono').value,
      });
      this.shoppingTypeForm.patchValue({
        direccionRecogida: this.shoppingTypeForm.get('direccion').value,
      });
      this.shoppingTypeForm.patchValue({
        direccionAdicionalRecogida: this.shoppingTypeForm.get(
          'direccion_adicional'
        ).value,
      });
      this.shoppingTypeForm.patchValue({
        direccionAdicional2Recogida: this.shoppingTypeForm.get(
          'direccion_adicional_2'
        ).value,
      });
    } else {
      this.patchshoppingTypeForm();
    }
  }

  updatePeso() {
    this.peso_pendiente = this.firststepForm.get('Weight').value;
    this.dataItemsAdd = [];
  }

  updateValorasegurar() {
    this.valor_asegurar_total = this.firststepForm.get('DeclaredValue').value;
    /* console.log(this.firststepForm.get('DeclaredValue').value);
    console.log(this.valor_asegurar_total); */
  }

  /**
   * The function "OntipoPagoSelected" saves data to local storage if a specific condition is met.
   * @param event - The event object that contains information about the event that triggered the
   * function.
   */
  public OntipoPagoSelected(event) {
    /**Si selecciona Epyaco se guarda la data */
    if (event.propiedad == 'tipo_pago_change' && event.valor == '2') {
      this.SaveDataOnlocalStorage();
      return;
    }

    if (event.propiedad == 'tipo_pago_change' && event.valor != '2') {
      this.clearDataLocalStorage();
      return;
    }
  }

  /**
   * The function `sendDataQuotation()` sends a POST request to a server to get a quotation for a
   * shipment based on the provided form data.
   */
  sendDataQuotation() {
    const loading: any = this.loadingFireToast('Consultando información');

    this.rowTransporting = [];
    const today = new Date();
    const date = new Date(this.firststepForm.get('fecha').value);
    var fechaMoment = '';
    if (today.getDate() == date.getDate()) {
      fechaMoment = moment(today).format('YYYY-MM-DDTHH:mm:ss');
    } else {
      fechaMoment = moment(date)
        .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
        .format('YYYY-MM-DDTHH:mm:ss');
    }
    let fecha_dhl = moment(fechaMoment).format('YYYY-MM-DD');
    let typeenvio = this.getTypeEnvio();

    console.log('====================================');
    console.log(this.Origin.value);
    console.log('====================================');

    let body = {
      Origin: this.getOrigin(),

      Destination: this.getDestination(),
      Shipments: {
        documentShipment:
          this.firststepForm.get('tipoEnvio')?.value == '1' ? false : true,
        packagingType: '',
        ServiceType: '',
        packagingTypeDHL: '',
        IsDutiable: '',
        packagingTypeCRD: '2', // si es nacional es tipo 2, si no va vacio
        DateTime: fechaMoment,
        DateTimeDHL: fecha_dhl,
        Shipment: {
          WeightUnit: 'KG',
          Weight: this.firststepForm.get('Weight').value,
          Length: this.firststepForm.get('Length').value,
          Width: this.firststepForm.get('Width').value,
          Height: this.firststepForm.get('Height').value,
          DimUnit: 'CM',
          Insurance: 1,
          InsuranceCurrency: typeenvio == 1 ? 'COP' : 'USD',
          DeclaredValue: Number(this.firststepForm.get('DeclaredValue').value),
          Content: '',
          Reference: '',
          Invoice: {
            TotalValue: '0.00',
            Items: null,
          },
        },
      },
      company: {
        CompanyID: this.infouser?.business.id ? this.infouser?.business.id : '',
        branchoffices: this.selectsucursal?.tradename
          ? this.selectsucursal?.tradename
          : this.infouser.business.branchOffices[0].tradeName,
        Collaborator: this.infouser?.collaborator?.id
          ? this.infouser?.collaborator?.id
          : '',
      },
    };
    console.log(body);
    this.apiservice.post('qts', body).subscribe(
      (res) => {
        // console.log(res, 'raw data');

        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const objects = res[key];
            // console.log('objetos', objects);

            if (Array.isArray(objects)) {
              objects.forEach((obj) => {
                if (obj.hasOwnProperty('partners')) {
                  this.rowTransporting.push(obj);
                }
              });
            } else {
              // console.log('no es un arreglo');
              if(objects.msg.split('-1').length == 1 && objects.msg.toUpperCase().split('ERROR').length == 1) //Parametro que llega desde el back para saber si hay cobertura o no y si hay algun error, para que no se muestre, pero si va a estar guardado en el log del back.
              {
                console.log(objects.msg, objects.msg.split('-1').length, objects.msg.toUpperCase().split('ERROR'), objects.msg.toUpperCase().split('ERROR').length);
                // this.showNotification(objects.msg);
              }
            }
          }
        }
        this.rowTransporting.forEach((item) => {
          // console.log(item);
          item.PublicAmount = parseFloat(
            item.PublicAmount.replace(/[$]/g, '')
              .replace(/[.]/g, '')
              .replace(/[,]/g, '.')
          );
          item.shippingValue = parseFloat(
            item.shippingValue
              .replace(/[$]/g, '')
              .replace(/[.]/g, '')
              .replace(/[,]/g, '.')
          );
        });
        this.rowTransporting.sort((a, b) => a.shippingValue - b.shippingValue);
        //console.log(this.rowTransporting);
        this.showwizardtable = true;
        loading.close();
        this.scrollToTable();
      },
      (error) => {
        console.log('Error al cotizar producto', error);
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error al cotizar producto'
        );
        loading.close();
      }
    );
  }

  loadingFireToast(title: any) {
    return Swal.fire({
      title,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  public async sendDoc() {
    // console.log(this.shoppingTypeForm.value);
    let obj_origin = this.getOrigin();
    let obj_dest = this.getDestination();
    const today = new Date();
    var fechaMoment = '';
    const dateToSend = moment(today).format('YYYY-MM-DDTHH:mm:ss');
    fechaMoment = moment(today).format('YYYY-MM-DD');
    let horas = this.getHours();
    let typeenvio = this.getTypeEnvio();
    let data = {
      Origin: {
        ContactName: this.shoppingTypeForm.get('fullName')?.value,
        CompanyName: this.shoppingTypeForm.get('companyName')?.value,
        Address: this.shoppingTypeForm.get('direccion')?.value,
        AddressAdditional: this.shoppingTypeForm.get('direccion_adicional')
          ?.value
          ? this.shoppingTypeForm.get('direccion_adicional')?.value
          : '',
        AddressAdditional2: this.shoppingTypeForm.get('direccion_adicional_2')
          ?.value
          ? this.shoppingTypeForm.get('direccion_adicional_2')?.value
          : '',
        ContactPhone: this.shoppingTypeForm.get('telefono')?.value,
        ContactEmail: this.shoppingTypeForm.get('email')?.value,
        CountryCode: obj_origin.CountryCode,
        StateCode: obj_origin.StateCode,
        CityName: obj_origin.CityName,
        PostalCode: obj_origin.PostalCode,
        DANECode: '11001000',
      },
      Destination: {
        ContactName: this.shoppingTypeForm.get('fullNameDestinatario')?.value,
        CompanyName: this.shoppingTypeForm.get('EmpresaDestino')?.value,
        Address: this.shoppingTypeForm.get('direccionDestino')?.value,
        AddressAdditional: this.shoppingTypeForm.get(
          'direccion_adicional_destino'
        )?.value
          ? this.shoppingTypeForm.get('direccion_adicional_destino')?.value
          : '',
        AddressAdditional2: this.shoppingTypeForm.get(
          'direccion_adicional_destino_2'
        )?.value
          ? this.shoppingTypeForm.get('direccion_adicional_destino_2')?.value
          : '',
        ContactPhone: this.shoppingTypeForm.get('telefonoDestino')?.value,
        ContactEmail: this.shoppingTypeForm.get('emailDestino')?.value,
        CountryCode: obj_dest.CountryCode,
        CityName: obj_dest.CityName,
        StateCode: obj_dest.StateCode,
        PostalCode: obj_dest.PostalCode,
        DANECode: '76001000',
      },
      Shipments: {
        documentShipment:
          this.firststepForm.get('tipoEnvio').value == '1' ? false : true,
        DocumentContent: 'Documents',
        serviceType: this.transportSelected[0].serviceName,
        packagingType: this.transportSelected[0].packagingType
          ? this.transportSelected[0].packagingType
          : '',
        description: this.shoppingTypeForm.get('Content')?.value,
        Comments: '',
        Shipment: {
          PackQuantity: 1,
          WeightUnit: 'KG',
          Weight: this.firststepForm.get('Weight').value,
          Length: this.firststepForm.get('Length').value,
          Width: this.firststepForm.get('Width').value,
          Height: this.firststepForm.get('Height').value,
          DimUnit: 'CM',
          Insurance: '1',
          InsuranceCurrency: typeenvio == 1 ? 'COP' : 'USD',
          DeclaredValue: this.firststepForm.get('DeclaredValue').value,
          Content: this.shoppingTypeForm.get('Content')?.value,
          Reference: this.shoppingTypeForm.get('Reference')?.value,
          Invoice: {
            TotalValue: '0.00',
            Items: null,
          },
        },
        PaymentType:
          this.ProformaTipopagoForm.get('tipoPago').value == '1' ||
          this.ProformaTipopagoForm.get('tipoPago').value == '3' ||
          this.ProformaTipopagoForm.get('tipoPago').value == '4'
            ? 'PaymentCash'
            : 'PayGateway',
        ReferenceCodePay: this.paymentreference.get('ReferenceCodePay').value,
        PaymentMethod:
          this.ProformaTipopagoForm.get('tipoPago').value == '3'
            ? 'QRPayBancolombia'
            : this.ProformaTipopagoForm.get('tipoPago').value == '4'
            ? 'DatafonoPayBold'
            : '',
        PaymentConfirmation: this.responseepayco, //data de respuesta de epayco
      },

      Pickup: {
        PickupRequired: this.selectRecogida,
        PickupCode: '',
        PickupDate: '',
        ContactName: this.shoppingTypeForm.get('fullNameRecogida')?.value, //'juan jaramillo',
        EmailAddress: '',
        CompanyName: '',
        Address: this.shoppingTypeForm.get('direccionRecogida')?.value,
        AddressAdditional: this.shoppingTypeForm.get(
          'direccionAdicionalRecogida'
        ).value,
        AddressAdditional1: this.shoppingTypeForm.get(
          'direccionAdicional2Recogida'
        ).value,
        CountryCode: 'CO',
        City: 'Bogota',
        StateOrProvinceCode: 'DC',
        PostalCode: '110741',
        DANECode: '11001000',
        ContactPhone: this.shoppingTypeForm.get('telefonoRecogida')?.value,
        DateTime: dateToSend,
        DateTime1: fechaMoment,
        TimeStart: horas[0],
        TimeEnd: horas[1],
        Comments:
          'Esto es una prueba para generar una Recoleccion con el Proveedor',
      },
      company: {
        CompanyID: this.infouser?.business.id ? this.infouser?.business.id : '',
        branchoffices: this.selectsucursal.tradename
          ? this.selectsucursal.tradename
          : this.infouser.business.branchOffices[0].tradeName,
        Collaborator: this.infouser?.collaborator?.id
          ? this.infouser?.collaborator?.id
          : '',
      },
      Provider: {
        partners: this.transportSelected[0].partners,
        serviceType: this.transportSelected[0].serviceType,
        serviceName: this.transportSelected[0].serviceName,
        shipValueNeto: this.transportSelected[0].shipValueNeto,
        packagingType: this.transportSelected[0].packagingType
          ? this.transportSelected[0].packagingType
          : '',
        deliveryDate: this.transportSelected[0].deliveryDate,
        shippingValue: this.transportSelected[0].shippingValue,
        PublicAmount: this.transportSelected[0].PublicAmount,
      },
    };
    console.log(data);
    this.postSps(data);
  }

  public async sendPack() {
    let obj_origin = this.getOrigin();
    let obj_dest = this.getDestination();
    const today = new Date();
    var fechaMoment = '';
    // const dateToSend = moment(today).format('YYYY-MM-DDTHH:mm:ss');
    // fechaMoment = moment(today).format('YYYY-MM-DD');

    const dateToSend = moment(this.firststepForm.get('fecha')?.value).format('YYYY-MM-DDTHH:mm:ss');
    fechaMoment = moment(this.firststepForm.get('fecha')?.value).format('YYYY-MM-DD');

    

    this.dataItemsAdd.forEach((element, index) => {
      element.LineId = index + 1;
    });
    let typeenvio = this.getTypeEnvio();

    let horas = this.getHours();
    let info = {
      Origin: {
        ContactName: this.shoppingTypeForm.get('fullName')?.value,
        CompanyName: this.shoppingTypeForm.get('companyName')?.value,
        Address: this.shoppingTypeForm.get('direccion')?.value,
        AddressAdditional: this.shoppingTypeForm.get('direccion_adicional')
          ?.value
          ? this.shoppingTypeForm.get('direccion_adicional')?.value
          : '',
        AddressAdditional2: this.shoppingTypeForm.get('direccion_adicional_2')
          ?.value
          ? this.shoppingTypeForm.get('direccion_adicional_2')?.value
          : '',
        ContactPhone: Number(this.shoppingTypeForm.get('telefono')?.value),
        ContactEmail: this.shoppingTypeForm.get('email')?.value,
        CountryCode: obj_origin.CountryCode,
        StateCode: obj_origin.StateCode,
        CityName: obj_origin.CityName,
        PostalCode: obj_origin.PostalCode,
        DANECode: '76001000',
        Cam1: obj_origin.Cam1,
      },
      Destination: {
        ContactName: this.shoppingTypeForm.get('fullNameDestinatario')?.value,
        CompanyName: this.shoppingTypeForm.get('EmpresaDestino')?.value,
        Address: this.shoppingTypeForm.get('direccionDestino')?.value,
        AddressAdditional: this.shoppingTypeForm.get(
          'direccion_adicional_destino'
        )?.value
          ? this.shoppingTypeForm.get('direccion_adicional_destino')?.value
          : '',
        AddressAdditional2: this.shoppingTypeForm.get(
          'direccion_adicional_destino_2'
        )?.value
          ? this.shoppingTypeForm.get('direccion_adicional_destino_2')?.value
          : '',
        ContactPhone: Number(
          this.shoppingTypeForm.get('telefonoDestino')?.value
        ),
        ContactEmail: this.shoppingTypeForm.get('emailDestino')?.value,
        CountryCode: obj_dest.CountryCode,
        CityName: obj_dest.CityName,
        StateCode: obj_dest.StateCode,
        PostalCode: obj_dest.PostalCode,
        DANECode: '76001000',
        Cam1: obj_dest.Cam1,
      },
      Shipments: {
        documentShipment:
          this.firststepForm.get('tipoEnvio').value == '1' ? false : true,
        serviceType: this.transportSelected[0].serviceName,
        packagingType: this.transportSelected[0].packagingType
          ? this.transportSelected[0].packagingType
          : '',
        description: this.shoppingTypeForm.get('Content')?.value,
        Comments: 'Manipulacion de cuidado No Doblar',
        Shipment: {
          PackQuantity: 1,
          WeightUnit: 'KG',
          Weight: this.firststepForm.get('Weight').value,
          Length: this.firststepForm.get('Length').value,
          Width: this.firststepForm.get('Width').value,
          Height: this.firststepForm.get('Height').value,
          DimUnit: 'CM',
          Insurance: '20',
          InsuranceCurrency: typeenvio == 1 ? 'COP' : 'USD',
          DeclaredValue: String(this.firststepForm.get('DeclaredValue').value),
          Content: this.shoppingTypeForm.get('Content')?.value,
          Reference: this.shoppingTypeForm.get('Reference')?.value,
          Invoice: {
            ReasonCode: 'G',
            ReasonDescription: this.facturaForm.get('razon').value,
            InvoiceNumber: this.facturaForm.get('nro_factura')?.value,
            TotalValue: this.precio_total,
            SenderTributaryCode: 'BUSINESS_NATIONAL',
            SenderTributaryNumber: this.facturaForm.get('remitente')?.value,
            ReceiverTributaryCode: 'BUSINESS_NATIONAL',
            ReceiverTributaryNumber:
              this.facturaForm.get('destinatario')?.value,
            CountryOfManufacture: 'CO',
            WeightUnits: 'KG',
            InsuranceCurrency: typeenvio == 1 ? 'COP' : 'USD',
            DateTimeUPS: '20231201',
            DateTimeDHL: '2023-12-01',
            Items: {
              Item: this.dataItemsAdd,
            },
          },
        },
        PaymentType:
          this.ProformaTipopagoForm.get('tipoPago').value == '1' ||
          this.ProformaTipopagoForm.get('tipoPago').value == '3' ||
          this.ProformaTipopagoForm.get('tipoPago').value == '4'
            ? 'PaymentCash'
            : 'PayGateway',
        ReferenceCodePay: this.paymentreference.get('ReferenceCodePay').value,
        PaymentMethod:
          this.ProformaTipopagoForm.get('tipoPago').value == '3'
            ? 'QRPayBancolombia'
            : this.ProformaTipopagoForm.get('tipoPago').value == '4'
            ? 'DatafonoPayBold'
            : '',
        PaymentConfirmation: this.responseepayco, //data de respuesta de epayco
      },
      Pickup: {
        PickupRequired: this.selectRecogida,
        PickupCode: '',
        PickupDate: '',
        ContactName: this.shoppingTypeForm.get('fullNameRecogida')?.value,
        EmailAddress: '',
        CompanyName: '',
        Address: this.shoppingTypeForm.get('direccionRecogida')?.value,
        AddressAdditional: this.shoppingTypeForm.get(
          'direccionAdicionalRecogida'
        ).value,
        AddressAdditional1: this.shoppingTypeForm.get(
          'direccionAdicional2Recogida'
        ).value,
        CountryCode: obj_origin.CountryCode,
        StateOrProvinceCode: obj_origin.StateCode,
        City: obj_origin.CityName,
        PostalCode: obj_origin.PostalCode,
        DANECode: '11001000',
        ContactPhone: this.shoppingTypeForm.get('telefonoRecogida')?.value,
        DateTime: dateToSend,
        DateTime1: fechaMoment,
        TimeStart: horas[0],
        TimeEnd: horas[1],
        Comments:
          'Esto es una prueba para generar una Recoleccion con el Proveedor',
      },
      company: {
        CompanyID: this.infouser?.business.id ? this.infouser?.business.id : '',
        branchoffices: this.selectsucursal.tradename
          ? this.selectsucursal.tradename
          : this.infouser.business.branchOffices[0].tradeName,
        Collaborator: this.infouser?.collaborator?.id
          ? this.infouser?.collaborator?.id
          : '',
      },
      Provider: {
        partners: this.transportSelected[0].partners,
        serviceType: this.transportSelected[0].serviceName,
        serviceName: this.transportSelected[0].serviceName,
        shipValueNeto: this.transportSelected[0].shipValueNeto
          ? this.transportSelected[0].shipValueNeto
          : '',
        packagingType: this.transportSelected[0].packagingType
          ? this.transportSelected[0].packagingType
          : '',
        deliveryDate: this.transportSelected[0].deliveryDate
          ? this.transportSelected[0].deliveryDate
          : '',
        deliveryTime: this.transportSelected[0].deliveryTime
          ? this.transportSelected[0].deliveryTime
          : '',
        exchangeRate: this.transportSelected[0].exchangeRate
          ? this.transportSelected[0].exchangeRate
          : ''
          ? this.transportSelected[0].exchangeRate
          : '',
        shippingValue: String(this.transportSelected[0].shippingValue),
        PublicAmount: String(
          this.transportSelected[0].PublicAmount
            ? this.transportSelected[0].PublicAmount
            : ''
        ),
        valueNetoTrm: this.transportSelected[0].valueNetoTrm
          ? this.transportSelected[0].valueNetoTrm
          : '',
      },
    };
    console.log(info);
    this.postSps(info);
  }

  /**
   * The function `onValorCambiado` handles various events and performs different actions based on the
   * event's property from the component datastep.
   * @param event - The event parameter is an object that contains information about the event that
   * occurred. It has the following properties:
   */
  onValorCambiado(event) {
    //  console.log('evento', event);

    if (event.propiedad == 'pais_cambiado') {
      this.getTypeEnvio();
    }

    if (event.propiedad == 'tipoEnvio') {
      this.tipoEnvio = event.valor;
      this.firststepForm.patchValue({ tipoEnvio: event.valor });
    }

    if (event.propiedad == 'peso') {
      this.updatePeso();
      this.validatePeso();
    }

    if (event.propiedad == 'valor_asegurar') {
      this.updateValorasegurar();
    }

    if (event.propiedad == 'step' && event.key == 'second') {
      // console.log('segundo paso');

      this.nextStep();
      this.sendDataQuotation();
      this.updatePeso();
    }

    if (event.propiedad == 'recalcular') {
      this.sendDataQuotation();
    }

    // Se guardo data del primer modal de paises
    if (event.propiedad == 'saveData') {
    }

    // Se guardo data del segundo modal de paises
    if (event.propiedad == 'saveData2') {
      this.getTypeEnvio();
    }
  }

  getHours(): Array<any> {
    let resultado_1 = localStorage.getItem('hora');
    console.log(resultado_1);
    let myArray: Array<any> = resultado_1.split('-');
    return myArray;
  }

  validatePeso() {
    if (
      this.firststepForm.get('tipoEnvio').value == '2' &&
      Number(this.firststepForm.get('Weight').value) > 2
    ) {
      Swal.fire(
        'El peso no puede ser mayor a 2 Kg Si el tipo de Envio es Documento',
        '',
        'info'
      );
    }

    if (
      this.firststepForm.get('tipoEnvio').value == '1' &&
      Number(this.firststepForm.get('Weight').value) > 50
    ) {
      Swal.fire(
        'El peso no puede ser mayor a 50 Kg Si el tipo de Envio es Paquete',
        '',
        'info'
      );
    }
  }

  postSps(data) {
    const loadingAlert: any = Swal.fire({
      title: 'Enviando Información...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.apiservice.post('sps', data).subscribe(
      (res) => {
        if (res.ok == false) {
          loadingAlert.close();
          this.sweetalertservice.errorMessage(
            res.msg ? res.msg : 'Error al realizar Cotización del producto'
          );
          return;
        }
        let keyInfo;

        if (!res) {
          return;
        }

        for (const key in res) {
          console.log(key);
          keyInfo = res[key];
        }
        // console.log(keyInfo);
        if (keyInfo.ok == false) {
          loadingAlert.close();
          this.sweetalertservice.errorMessage(
            keyInfo.msg
              ? keyInfo.msg
              : 'Error al realizar Cotización del producto'
          );
        }
        if (keyInfo.error) {
          loadingAlert.close();
          this.sweetalertservice.errorMessage(
            keyInfo.error
              ? keyInfo.error
              : 'Error al realizar Cotización del producto'
          );
        } else {
          this.numGuia = keyInfo?.NumGuia;
          this.emailTo = keyInfo.email?.to;
          this.guia = keyInfo?.guia;
          this.proforma = keyInfo?.proforma;
          this.carta = keyInfo?.carta;
          this.codigointerno = keyInfo?.DB;
          this.ConfirmationNumber = keyInfo?.pickup?.ConfirmationNumber;

          this.firtstepenabled = false;
          this.secondstepenabled = false;
          this.thirdstepenabled = false;
          this.fourtstepenabled = true;
          this.print.nativeElement.click();
          loadingAlert.close();
        }
      },
      (error) => {
        console.log('Error al realizar Cotización de producto', error);
        loadingAlert.close();
        this.sweetalertservice.errorMessage(
          error.error.msg
            ? error?.error?.msg
            : 'Error al realizar envio de producto'
        );
        this.firtstepenabled = true;
        this.secondstepenabled = true;
        this.thirdstepenabled = true;
        this.fourtstepenabled = false;
        this.pagar.nativeElement.click();
      }
    );
  }

  getOrigin() {
    let obj = {
      CountryCode: this.Origin.get('CountryCode').value,
      StateCode: this.Origin.get('StateCode').value,
      CityName: this.Origin.get('ciudad').value,
      PostalCode: this.Origin.get('PostalCode').value,
      Cam1: this.Origin.get('Cam1').value,
    };
    return obj;
  }

  getDestination() {
    let obj = {
      CountryCode: this.Destination.get('CountryCode').value,
      StateCode: this.Destination.get('StateCode').value,
      CityName: this.Destination.get('ciudad').value,
      PostalCode: this.Destination.get('PostalCode').value,
      Cam1: this.Destination.get('Cam1').value,
    };
    return obj;
  }

  getTypeEnvio() {
    // 1 para nacional
    // 2 internacional
    let origin_code = this.Origin.get('CountryCode').value;
    let destination_code = this.Destination.get('CountryCode').value;
    let typeenvio;
    if (origin_code == 'CO' && destination_code == 'CO') {
      typeenvio = 1;
    } else {
      typeenvio = 2;
    }
    this.name_label_valor_asegurar =
      typeenvio == 1 ? 'Valor a asegurar COP' : 'Valor a asegurar USD';
    return typeenvio;
  }

  public getHorario(): string {
    let hora: string = localStorage.getItem('hora');
    let jornada: string = localStorage.getItem('jornada');
    return jornada + ' ' + hora;
  }

  public validateEpaycoResponse(reference) {
    let body = { PayRef: reference };

    this.apiservice.post('pay', body).subscribe(
      (res) => {
        //console.log(res);
        this.responseepayco = res.ePayco.data;
        if (res.ePayco.data.x_response === 'Aceptada') {
          this.setDataLocalStorage();
          this.setTofinalStep();
          this.finalizarProceso();
        } else {
          this.clearDataLocalStorage();
          Swal.fire({
            title: 'Pago No Aprobado',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'quoter/quotation';
            }
          });
        }
      },
      (error) => {
        console.log('error en consulta de pag', error);
        this.sweetalertservice.errorMessage('Error en consulta de pago');
      }
    );
  }

  public SaveDataOnlocalStorage() {
    /**Datos Origen */
    localStorage.setItem('Origin', JSON.stringify(this.Origin.value));
    /**Datos Destino */
    localStorage.setItem('Destination', JSON.stringify(this.Destination.value));

    /**Datos  peso largo, ancho*/
    localStorage.setItem(
      'firststepForm',
      JSON.stringify(this.firststepForm.value)
    );

    /** Transportadora seleccionada */
    localStorage.setItem(
      'transportSelected',
      JSON.stringify(this.transportSelected)
    );

    /**Datos remitente y Destinatario */
    localStorage.setItem(
      'shoppingTypeForm',
      JSON.stringify(this.shoppingTypeForm.value)
    );

    /**Tipó de Pago */
    localStorage.setItem(
      'ProformaTipopagoForm',
      JSON.stringify(this.ProformaTipopagoForm.value)
    );

    /**Datos del modal de Proforma */
    localStorage.setItem('facturaForm', JSON.stringify(this.facturaForm.value));
    /**Elementos Agregados en el modal proforma */
    localStorage.setItem('dataItemsAdd', JSON.stringify(this.dataItemsAdd));
  }

  public setDataLocalStorage() {
    /**Origen */
    let Origin = JSON.parse(localStorage.getItem('Origin'));
    this.Origin.setValue(Origin);
    /**Destino */
    let Destination = JSON.parse(localStorage.getItem('Destination'));
    this.Destination.setValue(Destination);

    /**Primer paso peso altura etc */
    let firststepForm = JSON.parse(localStorage.getItem('firststepForm'));
    this.firststepForm.controls.tipoEnvio.setValue(firststepForm.tipoEnvio);
    this.firststepForm.controls.Weight.setValue(firststepForm.Weight || 0.5);
    this.firststepForm.controls.Length.setValue(firststepForm.Length || 1);
    this.firststepForm.controls.Width.setValue(firststepForm.Width || 1);
    this.firststepForm.controls.DeclaredValue.setValue(
      firststepForm.DeclaredValue || 1
    );
    this.firststepForm.controls.fecha.setValue(firststepForm.fecha || '');
    this.firststepForm.controls.horario.setValue(firststepForm.horario || '1');

    /**Transportadora seleccionada */
    let transportSelected = JSON.parse(
      localStorage.getItem('transportSelected')
    );
    this.transportSelected = transportSelected;

    /**Datos remitente y Destinatario */
    let shoppingTypeForm = JSON.parse(localStorage.getItem('shoppingTypeForm'));
    this.shoppingTypeForm.setValue(shoppingTypeForm);

    /**Tipó de Pago */
    let ProformaTipopagoForm = JSON.parse(
      localStorage.getItem('ProformaTipopagoForm')
    );
    this.ProformaTipopagoForm.setValue(ProformaTipopagoForm);

    /**Datos del modal de Proforma */
    let facturaForm = JSON.parse(localStorage.getItem('facturaForm'));
    this.facturaForm.setValue(facturaForm);
    /**Elementos Agregados en el modal proforma */
    let dataItemsAdd = JSON.parse(localStorage.getItem('dataItemsAdd'));
    this.dataItemsAdd = dataItemsAdd;
  }

  public resetProcess() {
    this.clearDataLocalStorage();
    const url = window.location.href;
    const paramIndex = url.indexOf('?ref_payco=');
    // Si el parámetro 'ref_payco' existe, recarga la página sin el parámetro
    if (paramIndex !== -1) {
      const newUrl =
        url.substring(0, paramIndex) + url.substring(paramIndex + 14);
      window.location.href = newUrl;
    } else {
      window.location.reload();
    }
  }

  public clearDataLocalStorage() {
    localStorage.removeItem('Origin');
    localStorage.removeItem('Destination');
    localStorage.removeItem('firststepForm');
    localStorage.removeItem('transportSelected');
    localStorage.removeItem('shoppingTypeForm');
    localStorage.removeItem('ProformaTipopagoForm');
    localStorage.removeItem('facturaForm');
    localStorage.removeItem('dataItemsAdd');
    localStorage.removeItem('ref');
  }

  public setTofinalStep() {
    this.showwizardtable = true;
    this.stepers.firts = false;
    this.stepers.second = false;
    this.stepers.three = false;
    this.stepers.fourt = false;
    this.stepers.five = true;
  }

  /**
   * Metodó que obtiene el valor para saber si el usuario selecciono Pagar desde el modal de qr o de bolt
   */
  public onPaySelected(event: any) {
    //console.log('Paso final pagar', event);
    if (event.valor) {
      this.closeModal(event.modal);
      this.finalizarProceso();
    }
  }

  showNotification(msg: string) {
    const type = [
      '',
      'info',
      'success',
      'warning',
      'danger',
      'rose',
      'primary',
    ];

    //const color = Math.floor((Math.random() * 6) + 1);

    $.notify(
      {
        icon: 'notifications',
        message: msg,
      },
      {
        type: type[3],
        timer: 3000,
        placement: {
          from: 'top',
          align: 'center',
        },
        template:
          '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }
}
