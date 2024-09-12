import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocompaniesComponent } from './infocompanies.component';

describe('InfocompaniesComponent', () => {
  let component: InfocompaniesComponent;
  let fixture: ComponentFixture<InfocompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfocompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfocompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
