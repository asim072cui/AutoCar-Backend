import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema({
    //Inteseted In Job
    dreamjob : { type : String },
    workingcity : { type : String },
    position : { type : String,   enum: [ "Service Advisor", "Auto Body Mechanic","Car Electrician", "Workshop Manager"]},
    img : { type : String },
     // Personal Information
    firstname : { type : String }, 
    lastname : { type : String },
    dob : { type : Date },
    country : { type : String },
    gender : { type : String, enum: [ "Male", "Female", "Other"] },
    email : { type : String, sparse: true },
    phone : { type : String },
    // Experience Details
    jobtitle : { type : String },
    companyname : { type : String },
    comapanyindustry : { type : String },
    joblocation : { type : String },  
    jobcity : { type : String }, 
    stillworking : { type : Boolean },
    startingdate : { type :Date },
    endingdate : { type :Date },
    description : { type : String },
 // OPTION 1: CV UPLOAD
    cvUrl: { type: String },
    // this is only true for option 2: FULL_FORM
    applicationtype: { type: String, enum: ["CV_ONLY", "FULL_FORM"], default: "CV_ONLY"},
    status: { type: String, enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"], default: "Pending"},
},
{ timestamps: true}
);
export default mongoose.model("Employee", EmployeeSchema);

    


