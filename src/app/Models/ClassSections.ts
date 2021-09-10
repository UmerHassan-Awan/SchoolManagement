export class ClassSections
{
    ClassSectionID : Number
    SchoolID : String = "0"
    SchoolBranchID : String = "0"
    ClassID : String = "0"
    SectionName : String
    EnteredBy : string = localStorage.getItem("UserID")
    UpdatedBy : string = localStorage.getItem("UserID")
}