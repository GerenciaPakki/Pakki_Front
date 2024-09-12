import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrbancolombiaComponent } from './qrbancolombia.component';

describe('QrbancolombiaComponent', () => {
  let component: QrbancolombiaComponent;
  let fixture: ComponentFixture<QrbancolombiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrbancolombiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrbancolombiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
