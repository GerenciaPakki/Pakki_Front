import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeallcommentsComponent } from './seallcomments.component';

describe('SeallcommentsComponent', () => {
  let component: SeallcommentsComponent;
  let fixture: ComponentFixture<SeallcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeallcommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeallcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
