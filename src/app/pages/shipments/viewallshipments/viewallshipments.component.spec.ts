import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallshipmentsComponent } from './viewallshipments.component';

describe('ViewallshipmentsComponent', () => {
  let component: ViewallshipmentsComponent;
  let fixture: ComponentFixture<ViewallshipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallshipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallshipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
