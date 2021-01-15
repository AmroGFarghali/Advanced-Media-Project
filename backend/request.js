const mongoose=require('mongoose');
const schema=mongoose.Schema;
const requestSchema = new schema({
    madeBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    },
    replacementStaffMember:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    },
    typeOfRequest:
    {   type:String, 
        required:true},
    newDayOff:{
          type:String      

    }   , 
    status:
    {type:String,
     default:"Pending"
        
    
    },
    reason:
    {type:String,
     
                },

    slot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    },
    day:{
        Type:String


    },
    Comment:{
        Type:String


    }

   

});
module.exports= mongoose.model('request', requestSchema);