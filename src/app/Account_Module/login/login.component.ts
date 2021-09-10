import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { Contacts } from '../../Models/contacts';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public modal = new Contacts();
  constructor(private userService: UserServiceService, private router:Router) { }

  ngOnInit() {
  }

  LoginUser()
  {
    this.userService.HttpPost("Account/GetLoginUser", JSON.stringify(this.modal)).subscribe((Data:any) => {
      
      if(Data.ContactID !== 0)
      {
        localStorage.setItem("UserID",Data.ContactID);
        this.router.navigate(['/SchoolInformation']);
      }
    });
    
  }

}
