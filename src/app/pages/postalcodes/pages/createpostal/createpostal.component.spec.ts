import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostalComponent } from './createpostal.component';

describe('CreatepostalComponent', () => {
  let component: CreatepostalComponent;
  let fixture: ComponentFixture<CreatepostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepostalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
