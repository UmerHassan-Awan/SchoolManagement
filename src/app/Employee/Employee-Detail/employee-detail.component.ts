import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  EmployeeData:any=[];
  constructor(private route: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');

    var empID = this.route.snapshot.paramMap.get("id");
    
    this.userService.HttpGet("EmployeeManag/GetEmployeeDetail_ByID/"+empID).subscribe((Data)=>{
      this.EmployeeData = Data;
      //console.log(this.EmployeeData);
    });
  }

  convertJsonDate(rawdate)
  {
    return this.userService.convertJsonDate(rawdate);
  }

}
