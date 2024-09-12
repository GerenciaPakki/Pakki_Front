import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbranchofficesComponent } from './searchbranchoffices.component';

describe('SearchbranchofficesComponent', () => {
  let component: SearchbranchofficesComponent;
  let fixture: ComponentFixture<SearchbranchofficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbranchofficesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbranchofficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
