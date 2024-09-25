import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogAfterLoginComponent } from 'src/app/dialogs/dialog-after-login/dialog-after-login.component';
import { ApiService } from 'src/app/services/api.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  formLogin = new FormGroup({
    email: new FormControl(''),
    pass: new FormControl(''),
  });

  changepass: FormGroup;

  ischeck: boolean = true;
  sedeselected;
  /**Sedes del Usuario */
  sedes = [];
  data_collaborator: any;

  constructor(
    private element: ElementRef,
    private apiservice: ApiService,
    private router: Router,
    public formBuilder: FormBuilder,
    public sweetalertservice: SweetalertService,
    private cookieService: CookieService,
    private userservice: UserService
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

    if (this.cookieService.get('token')) {
      //this.router.navigate(['quotation']);
      window.history.go(-1);
    }
  }

  ngOnInit() {
    (window as any).$ = $;
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);

    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
    });

    this.changepass = this.formBuilder.group({
      document: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
      validatepassword: ['', Validators.required, Validators.minLength(6)],
    });
  }

  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  login() {
    localStorage.clear();

    const loadingAlert: any = Swal.fire({
      title: 'Enviando Información...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.apiservice.post('lg', this.formLogin.value).subscribe(
      (res) => {
        loadingAlert.close();
        this.cookieService.set('token', res.token);
        this.validarSedes();
      },
      (error) => {
        console.log('error en el login', error);
        loadingAlert.close();
        this.sweetalertservice.errorMessage(
          error.error.msg ? error.error.msg : 'Error en login'
        );
      }
    );
  }

  closeModal() {
    $('#myModal').modal('hide');

    localStorage.setItem('changepass', 'false');
    localStorage.setItem('selectsucursal', JSON.stringify(this.sedeselected));
    this.router.navigate(['quoter/quotation']);
    // this.router.navigate(['quote']);
  }

  openModal(modal: string) {
    $(modal).modal('show');
  }

  ischecked() {
    this.ischeck = !this.ischeck;
  }

  validarSedes() {
    this.apiservice.post('rgs/token').subscribe(
      (res) => {
        if (res.data.collaborator.changePass == false) {
          this.setPass('true');

          this.openModal('#changepass');
          return;
        }
        this.data_collaborator = res.data.collaborator;
        localStorage.setItem('dataUser', JSON.stringify(res.data));
        /**Validar Perfiles*/
        if (this.data_collaborator.profile == 'Pakki') {
          this.getDataBusinessPakki();
          return;
        }
        if (this.data_collaborator.profile == 'Owner') {
          this.getDataBusiness();
          return;
        }
        if (this.data_collaborator.profile == 'CEI') {
          this.setPass('false');
          this.router.navigate(['quoter/quotation']);
        }
      },
      (error) => {
        console.log('error en validar sedes', error);
        this.sweetalertservice.errorMessage('Error en la validacion de sedes');
      }
    );
  }

  public getDataBusinessPakki() {
    let body = this.bodyBussiness;
    this.apiservice.post('bs/allbuspk', body).subscribe(
      (res) => {
        console.log(res);
        if (res.ViewBussPakki.length > 0) {
          res.ViewBussPakki.forEach((item: any) => {
            if (item.branchofficesCount <= 0) return;

            if (item.business.businessname === 'Pakki') {
              this.sedes = item.branchoffices;
            } else {
              item.branchoffices.forEach((sede) => {
                let objsede = {
                  tradename: `${item.business.businessname},${sede.tradename}`,
                  _id: sede._id,
                };
                this.sedes.push(objsede);
              });
            }
          });
        }

        console.log(this.sedes);

        /**Validar si hay mas de una sede para seleccionar */

        if (this.sedes.length > 1) {
          $('#myModal').modal('show');
        } else {
          this.setPass('false');
          this.router.navigate(['quoter/quotation']);
        }
      },
      (error) => {
        console.log('Error al consultar sedes', error);
        this.sweetalertservice.errorMessage('Error al consultar sedes');
      }
    );
  }

  public getDataBusiness() {
    let body = this.bodyBussiness;

    this.apiservice.post('bs/allbusali', body).subscribe(
      (res) => {
        console.log(res);

        if (res.ViewBussPakki.length > 0) {
          res.ViewBussPakki.forEach((item: any) => {
            if (item.branchofficesCount <= 0) return;
            this.sedes = item.branchoffices;
          });
        }

        console.log(this.sedes);

        /**Validar si hay mas de una sede para seleccionar */
        if (this.sedes.length > 1) {
          $('#myModal').modal('show');
        } else {
          this.setPass('false');
          this.router.navigate(['quoter/quotation']);
        }
      },
      (error) => {
        console.log('Error al consultar sedes Aliado', error);
        this.sweetalertservice.errorMessage('Error al consultar sedes');
      }
    );
  }

  get bodyBussiness() {
    let data = this.userservice.getAllInfoUser();
    let body = {
      nit: data.business.businessNit,
      collaborators: data.collaborator.id,
    };
    return body;
  }

  changePass() {
    this.apiservice.put('cl/changepass', this.changepass.value).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          title: res.msg,
          /* showDenyButton: true, */
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            window.location.reload();
            //localStorage.setItem('changepass', 'false');
            //this.router.navigate(['login']);
          }
        });
      },
      (error) => {
        console.log('error en actualización de contraseña', error);
        this.sweetalertservice.errorMessage(
          'Error en actualización de contraseña'
        );
      }
    );
  }

  public sedeChange(event: any) {
    console.log('recibido en el padre', event);
    this.sedeselected = event.value;
    console.log(this.sedeselected);
  }

  public setPass(value: string) {
    localStorage.setItem('changepass', value);
  }
}
