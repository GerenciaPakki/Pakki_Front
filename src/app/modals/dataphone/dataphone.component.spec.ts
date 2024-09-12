import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataphoneComponent } from './dataphone.component';

describe('DataphoneComponent', () => {
  let component: DataphoneComponent;
  let fixture: ComponentFixture<DataphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataphoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
