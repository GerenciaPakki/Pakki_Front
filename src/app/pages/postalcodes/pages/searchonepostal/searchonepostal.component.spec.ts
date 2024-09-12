import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchonepostalComponent } from './searchonepostal.component';

describe('SearchonepostalComponent', () => {
  let component: SearchonepostalComponent;
  let fixture: ComponentFixture<SearchonepostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchonepostalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchonepostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
