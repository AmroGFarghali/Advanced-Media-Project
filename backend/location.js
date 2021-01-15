const mongoose=require('mongoose');
const schema=mongoose.Schema;
const locationSchema = new schema({
    name:{
        type:String, 
        unique: true, 
        required:true},


    locType:{
        type:String, 
        required:true},
    
    capacityCounter: {  // i dont know how to make a counter...

        type: Number },

    staff:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'


    }]
      
})  ;
module.exports= mongoose.model('location', locationSchema);
