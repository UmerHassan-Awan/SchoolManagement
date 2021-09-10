import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolBranchComponent } from './edit-school-branch.component';

describe('EditSchoolBranchComponent', () => {
  let component: EditSchoolBranchComponent;
  let fixture: ComponentFixture<EditSchoolBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchoolBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchoolBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
