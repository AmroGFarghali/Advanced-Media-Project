const mongoose=require('mongoose');
const schema=mongoose.Schema;
const courseSchema = new schema({
    name:{
        type:String, 
        unique: true, 
        required:true},
    courseInstructor: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    }],

    courseCoordinator: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    },

    courseAcademicMembers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'uniStaff'
    }],

    ofWhichDepartment:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'department'

    },


    courseSlotsAssigned:[{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'


    }],
    courseSlotsUnassigned:[{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'slot'


    }],

    coverage:{

        type:String,
        default:"0%"
    }

      
})  
;
module.exports= mongoose.model('course', courseSchema);
