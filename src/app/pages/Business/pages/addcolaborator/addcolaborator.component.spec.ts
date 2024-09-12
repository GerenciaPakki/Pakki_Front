import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcolaboratorComponent } from './addcolaborator.component';

describe('AddcolaboratorComponent', () => {
  let component: AddcolaboratorComponent;
  let fixture: ComponentFixture<AddcolaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcolaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcolaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
