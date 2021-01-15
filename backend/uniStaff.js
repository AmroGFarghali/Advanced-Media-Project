const mongoose=require('mongoose');
const schema=mongoose.Schema;
const location = require('./location.js')
const staffSchema = new schema ({

    signIn:{
        type:Boolean,
        default:false
    },
    missingHours:{
        type:Number,
        default:0
    },

    accumulatedHours:{
        type:Number,
        default:0
    },

    id:{
        type: String
    } ,  //still needs to be adjusted
    name:{
        type:String, 
        required:true},

    email:{
        type:String, 
        required:true,
        unique :true
    },
    salary:{
        type: Number,
    },
    
    password:{
        type:String, 
        default:"123456"},

    staffType: String,

    DayOff:{ //i think this might work
        type: String,
        default: function (){
            if(this.staffType === "hr")
                 return "Saturday"

        }
        
            
    },

    officeLocation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    },

    schedule:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'schedule'
    },
    attendanceRecords:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'
    }],


    faculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty',
        


    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'department',
       


    },

    incomingRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'request',
    }],

    outgoingRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'request',
    }],

    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
       
    }]


    //courses still need to be fixed.


}, {timestamps: true});

module.exports= mongoose.model('uniStaff', staffSchema);
