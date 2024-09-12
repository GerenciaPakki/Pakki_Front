import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallcompaniesComponent } from './viewallcompanies.component';

describe('ViewallcompaniesComponent', () => {
  let component: ViewallcompaniesComponent;
  let fixture: ComponentFixture<ViewallcompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallcompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallcompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
