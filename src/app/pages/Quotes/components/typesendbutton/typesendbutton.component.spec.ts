import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesendbuttonComponent } from './typesendbutton.component';

describe('TypesendbuttonComponent', () => {
  let component: TypesendbuttonComponent;
  let fixture: ComponentFixture<TypesendbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesendbuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesendbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
