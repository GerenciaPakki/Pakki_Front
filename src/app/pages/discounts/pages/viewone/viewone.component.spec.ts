import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewoneComponent } from './viewone.component';

describe('ViewoneComponent', () => {
  let component: ViewoneComponent;
  let fixture: ComponentFixture<ViewoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
