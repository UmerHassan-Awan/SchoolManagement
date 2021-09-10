export class FeeSetup
{
    FeeID : Number
    SchoolID : string = "0"
    SchoolBranchID : string = "0"
    FeesName : string
    Amount : Number
    LateCharges : Number = 0
    EnteredBy : string = localStorage.getItem("UserID")
    UpdatedBy : string = localStorage.getItem("UserID")
}