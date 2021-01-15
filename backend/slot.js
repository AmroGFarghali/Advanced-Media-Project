const mongoose=require('mongoose');
const schema=mongoose.Schema;
const slotSchema = new schema({
    name:{
        type:String,  
        required:true},

    day:{
        type:String, 
        required:true

    }   , 
    time:{
        type:String, 
        required:true},
    
    
    course: {  // i dont know how to make a counter...
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
        required:true },

    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'location',
        required:true

    },

    givenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    },
    status:{
        type:String,
        default:"UnassignedToAnyTA"
    }
      
})  ;
module.exports= mongoose.model('slot', slotSchema);
