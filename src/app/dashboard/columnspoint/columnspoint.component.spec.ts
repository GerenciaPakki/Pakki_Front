import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnspointComponent } from './columnspoint.component';

describe('ColumnspointComponent', () => {
  let component: ColumnspointComponent;
  let fixture: ComponentFixture<ColumnspointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnspointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnspointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
