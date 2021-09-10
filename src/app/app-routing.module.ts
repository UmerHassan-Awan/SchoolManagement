import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/Account_Module/login/login.component';
import { RegisterComponent } from '../app/Account_Module/register/register.component';
import { ForgotPasswordComponent } from '../app/Account_Module/forgot-password/forgot-password.component';
import { DashboardComponent } from '../app/Dashboard/dashboard.component';
import { BankComponent } from '../app/Bank/bank.component';
import { ContacttypeManagementComponent } from '../app/Administration/Contacttype-Management/contacttype-management.component';
import { SchoolInformationComponent } from '../app/Administration/School-Information/school-information.component';
import { SchoolBranchesComponent } from '../app/Administration/School-Branches/school-branches.component';
import { ClassManagementComponent } from '../app/Administration/Class-Management/class-management.component';
import { ClassSectionsComponent } from '../app/Administration/Class-Sections/class-sections.component';
import { FeeSetupComponent } from '../app/Administration/Fee-Setup/fee-setup.component';
import { StudentRegistrationComponent } from '../app/Students/Student-Registration/student-registration.component';
import { AllParentsComponent } from '../app/Parents/all-parents/all-parents.component';
import { EmployeeManagementComponent } from '../app/Employee/Employee-Management/employee-management.component';
import { EmployeeDetailComponent } from '../app/Employee/Employee-Detail/employee-detail.component';
import { StudentAttendanceComponent } from '../app/Students/Student-Attendance/student-attendance.component';
import { StudentClassAssignComponent } from '../app/Students/Student-Class-Assign/student-class-assign.component';
import { ClassSubjectAssignComponent } from '../app/Administration/Class-Subject-Assign/class-subject-assign.component';
import { AddSchoolComponent } from '../app/Administration/Add-School/add-school.component';
import { EditSchoolComponent } from '../app/Administration/Edit-School/edit-school.component';
import { AddSchoolBranchComponent } from '../app/Administration/Add-Shool-Branch/add-school-branch.component';
import { EditSchoolBranchComponent } from '../app/Administration/Edit-School-Branch/edit-school-branch.component';
import { AddClassComponent } from '../app/Administration/Add-Class/add-class.component';
import { EditClassComponent } from '../app/Administration/Edit-Class/edit-class.component';


const routes: Routes = [
  {path:'', redirectTo:'Login', pathMatch:'full'},
  {path:'Login',component: LoginComponent},
  {path:'Register',component: RegisterComponent},
  {path:'ForgotPassword',component: ForgotPasswordComponent},
  {path:'Dashboard',component: DashboardComponent},
  {path:'Bank',component: BankComponent},
  {path:'ContactTypeManagement',component: ContacttypeManagementComponent},
  {path:'SchoolInformation',component: SchoolInformationComponent},
  {path:'AddSchool',component: AddSchoolComponent},
  {path:'EditSchool/:sclID',component: EditSchoolComponent},
  {path:'SchoolBranches',component: SchoolBranchesComponent},
  {path:'AddSchoolBranch',component: AddSchoolBranchComponent},
  {path:'EditSchoolBranch/:branchID',component: EditSchoolBranchComponent},
  {path:'ClassManagement',component: ClassManagementComponent},
  {path:'AddClass',component: AddClassComponent},
  {path:'EditClass/:classID',component: EditClassComponent},
  {path:'ClassSectionManagement',component: ClassSectionsComponent},
  {path:'FeeSetup',component : FeeSetupComponent},
  {path:'StudentRegistration',component: StudentRegistrationComponent},
  {path:'AllParents',component: AllParentsComponent},
  {path:'EmployeeManagement', component: EmployeeManagementComponent},
  {path:'EmployeeDetail/:id',component: EmployeeDetailComponent},
  {path:'StudentAttendance', component: StudentAttendanceComponent},
  {path:'StudentClassAssign', component: StudentClassAssignComponent},
  {path:'ClassSubjectAssign', component: ClassSubjectAssignComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
