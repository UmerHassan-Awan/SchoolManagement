export class SchoolBranches
{
    BranchID : Number
    SchoolID : String = ""
    BranchName : String
    BranchOwnerName : String
    Email : String
    TelephoneNo : String
    MobileNo1 : String
    MobileNo2 : String
    Address : String
    CityID : String = ""
    ProvinceID : String = ""
    CountryID : String = "0"
    EnteredBy : String = localStorage.getItem("UserID")
    UpdatedBy : String
    DeletedBy : String 
}