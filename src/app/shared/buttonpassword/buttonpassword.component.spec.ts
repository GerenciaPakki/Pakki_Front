import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonpasswordComponent } from './buttonpassword.component';

describe('ButtonpasswordComponent', () => {
  let component: ButtonpasswordComponent;
  let fixture: ComponentFixture<ButtonpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
