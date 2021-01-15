const mongoose=require('mongoose');
const schema=mongoose.Schema;
const departmentSchema = new schema({
    name:{
        type:String, 
        unique: true, 
        required:true},


    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'


    }],
    HOD: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    },

    staffInDepartment:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'

    }],

    ofWhichFaculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty'
    }



      
})  ;
module.exports= mongoose.model('department', departmentSchema);
