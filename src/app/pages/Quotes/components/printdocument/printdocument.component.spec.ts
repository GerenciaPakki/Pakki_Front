import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintdocumentComponent } from './printdocument.component';

describe('PrintdocumentComponent', () => {
  let component: PrintdocumentComponent;
  let fixture: ComponentFixture<PrintdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintdocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
