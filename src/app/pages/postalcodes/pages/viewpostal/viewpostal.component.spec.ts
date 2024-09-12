import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostalComponent } from './viewpostal.component';

describe('ViewpostalComponent', () => {
  let component: ViewpostalComponent;
  let fixture: ComponentFixture<ViewpostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpostalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
