import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-infocompanies',
  templateUrl: './infocompanies.component.html',
  styleUrls: ['./infocompanies.component.css'],
})
export class InfocompaniesComponent implements OnInit {
  @Input() data = [];

  constructor() {}

  ngOnInit(): void {}
}
