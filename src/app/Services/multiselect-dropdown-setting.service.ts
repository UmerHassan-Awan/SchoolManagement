import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiselectDropdownSettingService {

  MultiSelect_DDSettings = [];

  constructor() 
  {
    this.MultiSelect_DDSettings = 
    [
      {
        'SchoolDDSetting':
        {
          singleSelection: true,
          text: "Select School",
          enableSearchFilter: true,
          badgeShowLimit: 1,
          textField : "SchoolName",
          labelKey : "SchoolName",
          primaryKey : "SchoolID",
        },
        'BranchDDSetting':
        {
          singleSelection: true,
          text: "Select School Branch",
          enableSearchFilter: true,
          badgeShowLimit: 1,
          textField : "BranchName",
          labelKey : "BranchName",
          primaryKey : "BranchID",
        }
      }
    ];
   }

  
}
