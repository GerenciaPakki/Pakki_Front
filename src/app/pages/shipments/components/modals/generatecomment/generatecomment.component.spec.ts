import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratecommentComponent } from './generatecomment.component';

describe('GeneratecommentComponent', () => {
  let component: GeneratecommentComponent;
  let fixture: ComponentFixture<GeneratecommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratecommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
