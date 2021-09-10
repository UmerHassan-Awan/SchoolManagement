import { Component, OnInit } from '@angular/core';
import { Cls_SchoolInformation } from '../../Models/school-information';
import { UserServiceService } from '../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.css']
})
export class EditSchoolComponent implements OnInit {

  public modal = new Cls_SchoolInformation();
  constructor(private userService: UserServiceService, private notify: ToastrService, private activeRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() 
  {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
    
    let schoolID = this.activeRoute.snapshot.params.sclID;

    this.userService.HttpGet("SchoolManag/GetSchoolByID?SclID=" + schoolID).subscribe(
      (Data:any) => 
      {
        this.modal = Data;
      },
      (error) => { this.notify.error(error.error.Message);}
    );
  }

  SubmitData()
  {
    this.userService.HttpPost("SchoolManag/UpdateSchool", JSON.stringify(this.modal)).subscribe(
      (Data:any) => 
      {
        if (Data == "Record Updated") 
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
