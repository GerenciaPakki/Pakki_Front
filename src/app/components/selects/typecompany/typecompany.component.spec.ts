import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypecompanyComponent } from './typecompany.component';

describe('TypecompanyComponent', () => {
  let component: TypecompanyComponent;
  let fixture: ComponentFixture<TypecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypecompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
