import { Component, OnInit } from '@angular/core';
import { Cls_SchoolInformation } from '../../Models/school-information';
import { UserServiceService } from '../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  public modal = new Cls_SchoolInformation();
  constructor(private userService: UserServiceService, private notify: ToastrService, private router:Router) { }

  ngOnInit() 
  {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
  }

  SubmitData()
  {
    this.userService.HttpPost("SchoolManag/AddNewSchool", JSON.stringify(this.modal)).subscribe(
      (Data:any) => 
      {
        if (Data == "Record Inserted") 
        {
          this.notify.success(Data);
          this.router.navigate(['/SchoolInformation']);
          //this.AllPickUpLocations = Data;
        }
      },
      (error) => { this.notify.error(error.error.Message);}
    );
  }

}
