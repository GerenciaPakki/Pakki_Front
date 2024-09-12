import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommercialComponent } from './addcommercial.component';

describe('AddcommercialComponent', () => {
  let component: AddcommercialComponent;
  let fixture: ComponentFixture<AddcommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcommercialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
