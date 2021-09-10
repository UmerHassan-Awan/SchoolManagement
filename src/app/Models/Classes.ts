export class SchoolClasses
{
    ClassID : Number
    SchoolID : String = "0"
    SchoolBranchID : String = "0"
    ClassName : string
    EnteredBy : string = localStorage.getItem("UserID")
    UpdatedBy : string = localStorage.getItem("UserID")
}