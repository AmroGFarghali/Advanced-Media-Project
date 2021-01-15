const mongoose=require('mongoose');
const schema=mongoose.Schema;
const attendancerecordSchema = new schema({
    records:[{
        
        
        day:{
        type:String,  
        required:true},

        status:{
        type:String,
        required:true,
         },

        totalTime:{
            type:Number,
            required:true

        }


    }]
      
})  ;
module.exports= mongoose.model('attendancerecord', attendancerecordSchema);
