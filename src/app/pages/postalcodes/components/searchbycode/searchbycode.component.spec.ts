import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbycodeComponent } from './searchbycode.component';

describe('SearchbycodeComponent', () => {
  let component: SearchbycodeComponent;
  let fixture: ComponentFixture<SearchbycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbycodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
