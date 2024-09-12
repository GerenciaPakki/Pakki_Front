import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusinessBranchComponent } from './update-business-branch.component';

describe('UpdateBusinessBranchComponent', () => {
  let component: UpdateBusinessBranchComponent;
  let fixture: ComponentFixture<UpdateBusinessBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBusinessBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBusinessBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
