import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buttonpassword',
  templateUrl: './buttonpassword.component.html',
  styleUrls: ['./buttonpassword.component.css'],
})
export class ButtonpasswordComponent implements OnInit {
  showPass: boolean = false;
  @Input() password: FormControl;
  @Input() placeholder: string;

  constructor() {}

  ngOnInit(): void {}
}
