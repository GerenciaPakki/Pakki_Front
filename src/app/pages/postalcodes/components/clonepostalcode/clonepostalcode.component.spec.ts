import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonepostalcodeComponent } from './clonepostalcode.component';

describe('ClonepostalcodeComponent', () => {
  let component: ClonepostalcodeComponent;
  let fixture: ComponentFixture<ClonepostalcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClonepostalcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClonepostalcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
