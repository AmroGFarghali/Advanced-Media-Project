const mongoose=require('mongoose');
const schema=mongoose.Schema;
const scheduleSchema = new schema({
    forWhichUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff',
        required:true

    },
    Saturday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],
    Sunday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],
    Monday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],
    Tuesday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],
    Wednesday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],
    Thursday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],
    Friday:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot',
        default:"dayOff"
    }]
      
})  ;
module.exports= mongoose.model('schedule', scheduleSchema);
