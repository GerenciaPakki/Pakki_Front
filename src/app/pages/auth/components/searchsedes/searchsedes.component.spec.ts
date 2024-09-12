import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsedesComponent } from './searchsedes.component';

describe('SearchsedesComponent', () => {
  let component: SearchsedesComponent;
  let fixture: ComponentFixture<SearchsedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchsedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchsedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
