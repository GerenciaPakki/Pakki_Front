import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputnumericoComponent } from './inputnumerico.component';

describe('InputnumericoComponent', () => {
  let component: InputnumericoComponent;
  let fixture: ComponentFixture<InputnumericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputnumericoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputnumericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
