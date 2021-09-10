import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Account_Module/login/login.component';
import { RegisterComponent } from './Account_Module/register/register.component';
import { ForgotPasswordComponent } from './Account_Module/forgot-password/forgot-password.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { TopMenuComponent } from './Menus/top-menu/top-menu.component';
import { SideMenuComponent } from './Menus/side-menu/side-menu.component';
import { BankComponent } from './Bank/bank.component';
import { ContacttypeManagementComponent } from './Administration/Contacttype-Management/contacttype-management.component';
import { SchoolInformationComponent } from './Administration/School-Information/school-information.component';
import { ConfirmationModalComponent } from './Popup Modal Components/confirmation-modal/confirmation-modal.component';
import { SchoolBranchesComponent } from './Administration/School-Branches/school-branches.component';
import { AddEditSchoolbranchesComponent } from './Popup Modal Components/add-edit-schoolbranches/add-edit-schoolbranches.component';
import { ClassManagementComponent } from './Administration/Class-Management/class-management.component';
import { AddEditClassComponent } from './Popup Modal Components/add-edit-class/add-edit-class.component';
import { ClassSectionsComponent } from './Administration/Class-Sections/class-sections.component';
import { AddEditClassSectionsComponent } from './Popup Modal Components/add-edit-class-sections/add-edit-class-sections.component';
import { FeeSetupComponent } from './Administration/Fee-Setup/fee-setup.component';
import { AddEditFeesetupComponent } from './Popup Modal Components/add-edit-feesetup/add-edit-feesetup.component';
import { StudentRegistrationComponent } from './Students/Student-Registration/student-registration.component';
import { AddEditStudentComponent } from './Popup Modal Components/add-edit-student/add-edit-student.component';
import { AllParentsComponent } from './Parents/all-parents/all-parents.component';
import { AddEditParentsComponent } from './Popup Modal Components/add-edit-parents/add-edit-parents.component';
import { ProfileImageViewComponent } from './Popup Modal Components/profile-image-view/profile-image-view.component';
import { EmployeeManagementComponent } from './Employee/Employee-Management/employee-management.component';
import { AddEditEmployeeComponent } from './Popup Modal Components/add-edit-employee/add-edit-employee.component';
import { EmployeeDetailComponent } from './Employee/Employee-Detail/employee-detail.component';
import { StudentAttendanceComponent } from './Students/Student-Attendance/student-attendance.component';
import { StudentClassAssignComponent } from './Students/Student-Class-Assign/student-class-assign.component';
import { NotifyModalComponent } from './Popup Modal Components/notify-modal/notify-modal.component';
import { ClassSubjectAssignComponent } from './Administration/Class-Subject-Assign/class-subject-assign.component';
import { AddSchoolComponent } from './Administration/Add-School/add-school.component';
import { EditSchoolComponent } from './Administration/Edit-School/edit-school.component';
import { AddSchoolBranchComponent } from './Administration/Add-Shool-Branch/add-school-branch.component';
import { EditSchoolBranchComponent } from './Administration/Edit-School-Branch/edit-school-branch.component';
import { AddClassComponent } from './Administration/Add-Class/add-class.component';
import { EditClassComponent } from './Administration/Edit-Class/edit-class.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    TopMenuComponent,
    SideMenuComponent,
    BankComponent,
    ContacttypeManagementComponent,
    SchoolInformationComponent,
    ConfirmationModalComponent,
    SchoolBranchesComponent,
    AddEditSchoolbranchesComponent,
    ClassManagementComponent,
    AddEditClassComponent,
    ClassSectionsComponent,
    AddEditClassSectionsComponent,
    FeeSetupComponent,
    AddEditFeesetupComponent,
    StudentRegistrationComponent,
    AddEditStudentComponent,
    AllParentsComponent,
    AddEditParentsComponent,
    ProfileImageViewComponent,
    EmployeeManagementComponent,
    AddEditEmployeeComponent,
    EmployeeDetailComponent,
    StudentAttendanceComponent,
    StudentClassAssignComponent,
    NotifyModalComponent,
    ClassSubjectAssignComponent,
    AddSchoolComponent,
    EditSchoolComponent,
    AddSchoolBranchComponent,
    EditSchoolBranchComponent,
    AddClassComponent,
    EditClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AngularMultiSelectModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    ConfirmationModalComponent, 
    AddEditSchoolbranchesComponent,
    AddEditClassComponent, 
    AddEditClassSectionsComponent,
    AddEditFeesetupComponent,
    AddEditStudentComponent,
    AddEditParentsComponent,
    ProfileImageViewComponent,
    AddEditEmployeeComponent,
    NotifyModalComponent
  ]
})
export class AppModule { }
