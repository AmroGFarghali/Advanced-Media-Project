const mongoose=require('mongoose');
const schema=mongoose.Schema;
const facultySchema = new schema({
    name:{
        type:String, 
        unique: true, 
        required:true},


    departments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'department'


    }]
      
}) ;
module.exports= mongoose.model('faculty', facultySchema);
