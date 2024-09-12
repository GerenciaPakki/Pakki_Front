import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  roles = ["Admin", "User"]
  formRegister = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    movil: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('')
  });
  constructor(private apiservice: ApiService,
    private router: Router,
    public formBuilder: FormBuilder,) {

  }
  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      movil: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
    })
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

  async register() {

    console.log(this.formRegister.value);
    this.apiservice.post('user', this.formRegister.value).subscribe(
      (res) => {
        console.log(res);

      },
      (error) => {
        console.log('error al registrar', error);
      }
    );


  }

  changetype(type: string) {
    this.formRegister.patchValue({ "role": type })
  }
}
