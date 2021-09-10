import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolBranchComponent } from './add-school-branch.component';

describe('AddSchoolBranchComponent', () => {
  let component: AddSchoolBranchComponent;
  let fixture: ComponentFixture<AddSchoolBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSchoolBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
