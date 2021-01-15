const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const location = require ('./location.js')
const faculty = require ('./faculty.js')
const department = require ('./department.js')
const course = require ('./course.js')
const uniStaff= require('./uniStaff.js')
const slot= require('./slot.js')
const schedule= require('./schedule.js')
const request= require('./request.js')
const attendancerecord= require('./attendancerecord.js');
const { findOne, find } = require('./location.js');
const e = require('express');
const key = 'asdasdasdasdasdasd'
const cors=require('cors')

const app = express();

mongoose.connect('mongodb+srv://amrrg:Imthedark1@cluster0.fcz9z.mongodb.net/testDatabase?retryWrites=true&w=majority').then(()=>{
  const corsOptions = {
    exposedHeaders: 'auth-token',
  };
 app.use(cors(corsOptions));

 app.use(express.json());
 




/*  var d= new Date();
 console.log(d.getDate())
 console.log(d.getHours())
 var myVar = setInterval(myTimer, 1000);
 var dateStartedAt= new Date();
 var dateStoppedAt;
 function myTimer() {
   var d = new Date();
   dateStoppedAt=d;
   console.log(d.getSeconds())
   console.log(d.toLocaleTimeString());
 } */
 
/*  setTimeout(function() {clearInterval(myVar); var dateDiff= (dateStoppedAt- dateStartedAt)/1000 ;console.log(dateDiff); console.log(dateStoppedAt.toLocaleTimeString())}, 10000);
 */ 

var myVar;
var dateStartedAt;
var dateStoppedAt;
var accumulatedHourszszzsz=0;

//4.1 GUC STAFF MEMBER

//SEED DATABASE
app.post('/Location/addLocation/SEEDING', async(req,res)=>{ //done :still to be tested


    const l = new location({
      name: req.body.name,
      locType: req.body.locType,
      capacityCounter:req.body.capacityCounter
    })
  await l.save()
    res.send('location added');
    console.log ("locaiton added");
  

}) 
app.post('/addStaffMember/SEEDING', async(req,res)=>{  
  try{
  
  function retnum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}
  var count;
  var staffPrefix= req.body.staffType;
  var idIncrement;
  const locationresult = await location.findOne({name : req.body.locationName} );
 /*  uniStaff.find({staffType: req.body.staffType}).exec(function (err, results) {
    count= results.length;
    staffPrefix = req.body.staffType
    idIncrement= staffPrefix+ count;
    //console.log(idIncrement);
  }); */
  const array = await uniStaff.find({staffType:req.body.staffType});
  console.log(array);
  if(array.length===0){
   
    idIncrement = staffPrefix+'-'+ 1
  }
  else{
  console.log(array[array.length-1].id);
  var idPrevious= retnum(array[array.length-1].id);
  idPrevious= idPrevious+1;
  idIncrement =staffPrefix+'-'+idPrevious
  console.log(idIncrement);
  }
  if(!locationresult){
      res.send("There is no location with that name")
  }
  else if((locationresult.staff.length+1) > locationresult.capacityCounter ){
    res.send("Office location is full, please make a new location.");

  }
  else if(req.body.staffType==='hr'){
    const sm = new uniStaff({
      id: idIncrement,
      name: req.body.name,
      email: req.body.email,
      salary: req.body.salary,
      password: "123456",
      staffType: req.body.staffType,
      DayOff: "Saturday",
      officeLocation :locationresult 

    })
    await sm.save();
    const sch =new schedule({
      forWhichUser: sm
    })
    sch.save();
    await uniStaff.findOneAndUpdate({_id: sm._id}, {$set: {schedule:sch }}, {new:true})
    
    // console.log(res.json(locationresult)); //error cannot set headers after sent to the client but anyway it works.
      locationresult.staff.push(sm);
      await locationresult.save();
      res.send('staff member added to that location');
      console.log ("locaiton added")
      console.log(locationresult.staff.length)
  }
  else{
    const sm = new uniStaff({
      id: idIncrement,
      name: req.body.name,
      email: req.body.email,
      salary: req.body.salary,
      password: "123456",
      staffType: req.body.staffType,
      DayOff: req.body.DayOff,
      officeLocation :locationresult  //msh 3aref a3melha ezay???
      //el default value password hena sa7, w id bardo lessa mt3mlsh sa7 3ashan sa3b, 

    });
   await sm.save();
   const sch =new schedule({
    forWhichUser:sm
  })
  sch.save();
  await uniStaff.findOneAndUpdate({_id: sm._id}, {$set: {schedule:sch }}, {new:true})





  // console.log(res.json(locationresult)); //error cannot set headers after sent to the client but anyway it works.
    locationresult.staff.push(sm);
    await locationresult.save();
    res.send('staff member added to that location');
    console.log ("locaiton added");
  }
}
catch(error){
  res.send("There is already a user with that email")
}

}) 






 app.post('/login', async(req,res)=>{
  const u = await uniStaff.findOne({email:req.body.email});
  if(!u)
  return res.status(403).send("stop el user ghalat");
  if(u.password!=req.body.password)
  return res.status(403).send("stop el pass ghalat");  
  
  
 
  const payload = {email:u.email, type:u.staffType};
  const token = jwt.sign(payload, key)
  console.log("this works?")
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Expose-Headers", "auth-token");
  res.header('auth-token',token).send();
 // console.log(res.getHeaders())
  //res.send("login succesfful"); 
  
})

app.use(authenticate)

app.get('/signIn',(req,res)=>{

//ht3mel initial date w tshoof el difference in day between date now and initial date law 1 yb2a eshta law 2 yb2a fee missing day
//ama el day y5ls ht3mel el initial date = date now w date new = new date()
//ht7sb el total hours so far b start date zay 10 w date ele enta fee now zay 21 (today) so ht7sb for every day from 10 until 21 msln
const payload = jwt.verify(req.header
  ('auth-token'),key); 
  
const payloadEmail = payload.email;








var date= new Date();
  if(date.getHours()>=7 && date.getHours()<=19){
   myVar = setInterval(myTimer, 1000);
   dateStartedAt= new Date();
   dateStoppedAt;
         function myTimer() {
             var d = new Date();
             dateStoppedAt=d;
             console.log(d.getSeconds())
             console.log(d.toLocaleTimeString());
                    }
   }
   else
    res.send("Cant sign in as university isnt open at this time")




})
app.get('/signOut',async(req,res)=>{

  const payload = jwt.verify(req.header
    ('auth-token'),key); 
    
  const payloadEmail = payload.email;








  const s = await uniStaff.findOne({email:payloadEmail}) ; 

  clearInterval(myVar); 
  var dateDiff= (dateStoppedAt- dateStartedAt)/1000 ;
  console.log(dateDiff); 
  console.log(dateStoppedAt.toLocaleTimeString())

  console.log(accumulatedHourszszzsz);
  const acm = s.accumulatedHours
  console.log(acm + "asdsadsa");
  accumulatedHourszszzsz= acm+dateDiff
  await uniStaff.findOneAndUpdate({_id: s._id}, {$set: { accumulatedHours:accumulatedHourszszzsz}}, {new:true})
  res.send("user updated");
 // await location.findOneAndUpdate()
  
 })

 app.get('/profile',async(req,res)=>{ //done : tested
   
   const payload = jwt.verify(req.header
     ('auth-token'),key); 
     
   const payloadEmail = payload.email;
   const profile = await uniStaff.findOne({email:payloadEmail})
   .select('-_id -password -accumulatedHours -missingHours -__v -updatedAt -signIn')
   .populate('officeLocation', '-_id -staff -__v -capacityCounter')
   
 
   res.send( profile)
    
  
   })
 app.get('/resetPassword',async(req,res)=>{ //done : tested
   
     const payload = jwt.verify(req.header
       ('auth-token'),key); 
       
     const payloadEmail = payload.email;
     const user = await uniStaff.findOneAndUpdate({email:payloadEmail},{$set: {password: "123456"}}, {new:true} )
     
     
   
     res.send("Your password has been reset")
      
     })
  
 app.post('/updateProfile',async(req,res)=>{
 
 
 
 
 
 }) 
















 //START OF HR 4.2
//Location Routes
///new route
app.get('/Location',async(req,res)=>{  ///////////////newrouteeeeeeeeeeeeeee
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hr')
    return res.status(401).send("This is an HR Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda



  let locations= await location.find({})
  .select('-_id name locType capacityCounter')
  .exec();
  res.send(locations)
  


})










          app.post('/Location/addLocation', async(req,res)=>{ //done :still to be tested
            const payload = jwt.verify(req.header('auth-token'),key); 
              if(payload.type!='hr')
              return res.status(401).send("enta msh hr") 

              const l = new location({
                name: req.body.name,
                locType: req.body.locType,
                capacityCounter:req.body.capacityCounter
              })
            await l.save()
              res.send('location added');
              console.log ("locaiton added");
            

          }) 
          app.put('/Location/:name/updateLocation/changeName' ,async(req,res)=>{ //done :still to be tested
            const payload = jwt.verify(req.header('auth-token'),key); 
            if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 
            
            const l =  await location.findOne({name : req.params.name});
            if(!l)
            return res.send("Location doesnt exist")
            await location.findOneAndUpdate({_id: l._id}, {$set: {name: req.body.newName}}, {new:true}) 
            res.send("Name of location has been updated")


          });
          app.put('/Location/:name/updateLocation/changeCapacity' ,async(req,res)=>{ // done :still to be tested
            const payload = jwt.verify(req.header('auth-token'),key); 
            if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 
          const l =  await location.findOne({name : req.params.name});

          if(!l)
          return res.send("Location doesnt exist")
          await location.findOneAndUpdate({_id: l._id}, {$set: {capacityCounter: req.body.capacityCounter}}, {new:true})
          res.send("Capacity of location has been updated")

          });
          app.put('/Location/:name/updateLocation/removeStaffMember' ,async(req,res)=>{ //done: not tested
            const payload = jwt.verify(req.header('auth-token'),key); 
            if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 
          const l =  await location.findOne({name : req.params.name});
          const u = await uniStaff.findOne({email: req.body.email}); //done : still to test

          if(!l||!u)
          return res.send("Location or User dont exist")
          await location.update({_id: l._id},{ $pull: {staff: u._id } } )
          await uniStaff.findOneAndUpdate({_id: u._id}, {$set: {officeLocation: null}}, {new:true})
          res.send("User has been removed from this location")

          })
          app.put('/Location/:name/updateLocation/addStaffMemberToLocation' ,async(req,res)=>{
            const payload = jwt.verify(req.header('auth-token'),key); 
            if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 
          const l =  await location.findOne({name : req.params.name});
          const u = await uniStaff.findOne({email: req.body.email}); //done : still to test

          if(!l||!u)
          return res.send("Location or User dont exist")

          await location.update({_id: l._id},{ $push: {staff: u._id } }, {new:true} )
          await uniStaff.findOneAndUpdate({_id: u._id}, {$set: {officeLocation: l}}, {new:true})
          res.send("User has been added to this location")





          })
          app.delete('/Location/:name/deleteLocation' ,async(req,res)=>{   //done: not  tested
            const payload = jwt.verify(req.header('auth-token'),key); 
            if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 


            const l =  await location.findOne({name : req.params.name});
            if(!l)
              return res.send("This location doesnt exist")
            await uniStaff.updateMany({officeLocation: l._id}, {$set: {officeLocation: null}}, {new:true})
            await location.findOneAndDelete({_id : l});
            res.send("Location Has been Deleted");
          
          })

//Faculty //first route was added here
        app.get('/Faculty',async(req,res)=>{  ///////////////newrouteeeeeeeeeeeeeee
          const payload = jwt.verify(req.header('auth-token'),key); //validation
          if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 
          //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda
        
        
        
          let faculties= await faculty.find({})
          .select('-_id name')
          .exec();
          res.send(faculties)
          


        })
        app.post('/Faculty/addFaculty', async(req,res)=>{ //test this
          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 






          const f = new faculty({
            name: req.body.name
          
          })
        await f.save()
          res.send('Faculty added');
          console.log ("Faculty added");

        }) 
        app.put('/Faculty/:facultyName/editFaculty', async(req,res)=>{ //takes input a new facutly name
          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 


          const f = await faculty.findOne({name : req.params.facultyName} );
          if(!f)
            return res.send("faculty doesnt exist")
          
          await faculty.findOneAndUpdate({_id: f._id},{$set: {name: req.body.name}}, {new:true})
            res.send("Faculty name has been updated");



        })  
        app.delete('/Faculty/:facultyName/deleteFaculty', async(req,res)=>{ //test this thing

          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 





          const f = await faculty.findOne({name : req.params.facultyName} );
          await department.updateMany({ofWhichFaculty: f._id}, {$set: {ofWhichFaculty: null}}, {new:true})
          await faculty.findOneAndDelete({name : req.params.facultyName});
          await uniStaff.updateMany({faculty:f._id},{$set: {faculty: null}}, {new:true})

          res.send("Faculty has been deleted");

        }) 


//departments   //first route was added here
        app.get('/Faculty/:facultyName/Departments',async(req,res)=>{  ///////////////newrouteeeeeeeeeeeeeee
          const payload = jwt.verify(req.header('auth-token'),key); //validation
          if(payload.type!='hr')
            return res.status(401).send("This is an HR Only function") 
          //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda



          let faculties= await faculty.find({name: req.params.facultyName})
          .select('-_id -name -__v')
          .populate({path:'departments', select:' name -_id'})
          .exec();

          res.send(faculties)
          
          /* const u= await uniStaff.findOne({email:payloadEmail}) //el CI
          let sched= await uniStaff.findOne({_id:u._id})
          .select('-_id schedule')
          .populate({path:'schedule', select:'-forWhichUser -_id',
            populate:{path:'Saturday Sunday Monday Tuesday Wednesday ',select:'name location course time -_id',
            populate:{path:'course location',select:' name -_id '}}
            })
          .exec(); */


        })
        app.post('/Faculty/:facultyName/Departments/createDepartment', async(req,res)=>{ //done :tested

          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 




          const f = await faculty.findOne({name : req.params.facultyName} );
          if(!f)
          return res.send('Faculty doesnt exist');
          const d = new department({
            name: req.body.name,
            ofWhichFaculty: f
          })
          
        await d.save()
        await faculty.update({_id: f._id},{ $push: {departments: d._id } } )

          res.send('Department created');
          console.log ("Department created");
          


        })
        app.put('/Faculty/:facultyName/Departments/:departmentName/updateDepartmentName', async(req,res)=>{ //test this

          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 




          const f = await faculty.findOne({name : req.params.facultyName} );
          const d = await department.findOne({name : req.params.departmentName} );
          if(!f ||!d)
          return res.send("faculty or department dont exist")
         
          await department.findOneAndUpdate({_id: d._id},{$set: {name: req.body.name}}, {new:true})
          return res.send("Department name changed")

          
          


        })
        app.delete('/Faculty/:facultyName/Departments/:departmentName/deleteDepartmentfromFaculty', async(req,res)=>{ //done: tested //msh ayleen en nmsa7 staff

          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 



          const f = await faculty.findOne({name : req.params.facultyName} );
          const d = await department.findOne({name : req.params.departmentName} );
          if(!f ||!d)
          return res.send("faculty or department dont exist")
        try{
          await faculty.update({_id: f._id},{ $pull: {departments: d._id } } )
          await department.update({_id: d._id},{$set: {ofWhichFaculty: null}}, {new:true})

          console.log(d._id);
        //await faculty.update({_id: f._id},{ $pull: {departments: f._id } } )
          res.send('Department deleted');
          console.log ("Department deleted");
        }
        catch(e){
        res.send("thing has already been deleted")


        }


        })
        app.put('/Faculty/:facultyName/Departments/addDepartmentToFaculty', async(req,res)=>{ //adds unassigned departments done:tested
                                                                                              // done:tested
              try{                                                                           
          const f = await faculty.findOne({name : req.params.facultyName} );
          const d = await department.findOne({name : req.body.name} );
          if(!f ||!d)
          return res.send("faculty or department dont exist")
         
              await faculty.update({_id: f._id},{ $push: {departments: d._id } } )
              await department.update({_id: d._id},{$set: {ofWhichFaculty: f}}, {new:true})

              console.log(d._id);
            //await faculty.update({_id: f._id},{ $pull: {departments: f._id } } )
              res.send('Department added to this faculty');
              console.log ("Department added to this faculty");
        }
          catch(e){
              res.send("thing has already been deleted")


        }
        })

//courses  /////////////////////////////////////HAVE TO DO EDIT///////////////////////////////////////
     app.get('/Departments/:departmentName/Courses',async(req,res)=>{  ///////////////newrouteeeeeeeeeeeeeee
      const payload = jwt.verify(req.header('auth-token'),key); //validation
      if(payload.type!='hr')
        return res.status(401).send("This is an HR Only function") 
      //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda



      let faculties= await department.find({name: req.params.departmentName})
      .select('-_id -name -__v  -staffInDepartment -ofWhichFaculty -HOD')
      .populate({path:'courses', select:'name -_id'})
      .exec();
      res.send(faculties)
      /* const u= await uniStaff.findOne({email:payloadEmail}) //el CI
      let sched= await uniStaff.findOne({_id:u._id})
      .select('-_id schedule')
      .populate({path:'schedule', select:'-forWhichUser -_id',
        populate:{path:'Saturday Sunday Monday Tuesday Wednesday ',select:'name location course time -_id',
        populate:{path:'course location',select:' name -_id '}}
        })
      .exec(); */


     }) //route 2 here was changed as url link
     app.post('/Departments/:departmentName/Courses/addCourse', async(req,res)=>{ //done :tested // ana ghayart el route parameters
        try{
          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 





          const d = await department.findOne({name : req.params.departmentName} );
          if(!d)
          return res.send("Department doesnt exist")
          const c = new course({
            name: req.body.name,
            ofWhichDepartment: d
          })
          
        await c.save()
        await department.update({_id: d._id},{ $push: {courses: c._id } } )

          res.send('Course created');
          console.log ("Course created");
        }

        catch(error){
          res.send("There is a course with this name already")
        }
        })
     app.delete('/Departments/:departmentName/Courses/:courseName/deleteCourse', async(req,res)=>{ //done :tested
          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 

          try{
          
          //done: tested
          const c = await course.findOne({name : req.params.courseName} );
          const d = await department.findOne({name : req.params.departmentName} );
          if(!c ||!d)
          return res.send("course or  department dont exist")
          await department.update({_id: d._id},{ $pull: {courses: c._id } } )
          await course.update({_id: c._id},{$set: {ofWhichDepartment: null}}, {new:true})

        //await faculty.update({_id: f._id},{ $pull: {departments: f._id } } )
          res.send('Course deleted');
          console.log ("Course deleted");
        }
        catch(e){
        res.send("thing has already been deleted")


        }


        })
     app.put('/Departments/:departmentName/Courses/:courseName/editCourseName', async(req,res)=>{//takes a new course name as input
          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 

          try{
          
          //done: tested
          const c = await course.findOne({name : req.params.courseName} );
          const d = await department.findOne({name : req.params.departmentName} );
          if(!c ||!d)
          return res.send("course or  department dont exist")
          
          await course.findOneAndUpdate({_id: c._id},{$set: {name: req.body.name}}, {new:true})

        //await faculty.update({_id: f._id},{ $pull: {departments: f._id } } )
          res.send('Course edited');
          console.log ("Course edited");
        }
        catch(e){
        res.send("Course has been edited")


        }

        })
     app.post('/Departments/:departmentName/Courses/addCourseToDepartment', async(req,res)=>{ //done :to be tested

          const payload = jwt.verify(req.header('auth-token'),key); 
          if(payload.type!='hr')
          return res.status(401).send("This is an HR Only function") 


          const c = await course.findOne({name : req.body.name} );
          const d = await department.findOne({name : req.params.departmentName} );
        try{
          await department.update({_id: d._id},{ $push: {courses: c._id } } )
          await course.update({_id: c._id},{$set: {ofWhichDepartment: d}}, {new:true})

        //await faculty.update({_id: f._id},{ $pull: {departments: f._id } } )
          res.send('Course added to '+ d.name);
          console.log ("Course deleted");








        }
        catch(e){
        res.send("Course doesnt exist")


        }


       }) //adds unassigned course as in a deleted course to a department




//rest of hr
app.post('/addStaffMember', async(req,res)=>{
  try{
  const payload = jwt.verify(req.header('auth-token'),key); 
  if(payload.type!='hr')
  return res.status(401).send("This is an HR Only function") 


  function retnum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}
  var count;
  var staffPrefix= req.body.staffType;
  var idIncrement;
  const locationresult = await location.findOne({name : req.body.locationName} );
 /*  uniStaff.find({staffType: req.body.staffType}).exec(function (err, results) {
    count= results.length;
    staffPrefix = req.body.staffType
    idIncrement= staffPrefix+ count;
    //console.log(idIncrement);
  }); */
  const array = await uniStaff.find({staffType:req.body.staffType});
  console.log(array);
  if(array.length===0){
   
    idIncrement = staffPrefix+'-'+ 1
  }
  else{
  console.log(array[array.length-1].id);
  var idPrevious= retnum(array[array.length-1].id);
  idPrevious= idPrevious+1;
  idIncrement =staffPrefix+'-'+idPrevious
  console.log(idIncrement);
  }
  if(!locationresult){
      res.send("There is no location with that name")
  }
  else if((locationresult.staff.length+1) > locationresult.capacityCounter ){
    res.send("Office location is full, please make a new location.");

  }
  else if(req.body.staffType==='hr'){
    const sm = new uniStaff({
      id: idIncrement,
      name: req.body.name,
      email: req.body.email,
      salary: req.body.salary,
      password: "123456",
      staffType: req.body.staffType,
      DayOff: "Saturday",
      officeLocation :locationresult 

    })
    await sm.save();
    const sch =new schedule({
      forWhichUser: sm
    })
    sch.save();
    await uniStaff.findOneAndUpdate({_id: sm._id}, {$set: {schedule:sch }}, {new:true})
    
    // console.log(res.json(locationresult)); //error cannot set headers after sent to the client but anyway it works.
      locationresult.staff.push(sm);
      await locationresult.save();
      res.send('staff member added to that location');
      console.log ("locaiton added")
      console.log(locationresult.staff.length)
  }
  else{
    const sm = new uniStaff({
      id: idIncrement,
      name: req.body.name,
      email: req.body.email,
      salary: req.body.salary,
      password: "123456",
      staffType: req.body.staffType,
      DayOff: req.body.DayOff,
      officeLocation :locationresult  //msh 3aref a3melha ezay???
      //el default value password hena sa7, w id bardo lessa mt3mlsh sa7 3ashan sa3b, 

    });
   await sm.save();
   const sch =new schedule({
    forWhichUser:sm
  })
  sch.save();
  await uniStaff.findOneAndUpdate({_id: sm._id}, {$set: {schedule:sch }}, {new:true})





  // console.log(res.json(locationresult)); //error cannot set headers after sent to the client but anyway it works.
    locationresult.staff.push(sm);
    await locationresult.save();
    res.send('staff member added to that location');
    console.log ("locaiton added");
  }
}
catch(error){
  res.send("There is already a user with that email")
}

}) 
app.put('/updateStaff', async(req,res)=>{// done and tested ////neeeeeeeeeeeeeeeeeeeeeeeds TO BE TESTED
  const payload = jwt.verify(req.header('auth-token'),key); 
  if(payload.type!='hr')
  return res.status(401).send("This is an HR Only function") 




  

  function retnum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}  
  var staffPrefix= req.body.staffType;
  var idIncrement;
  const array = await uniStaff.find({staffType:req.body.staffType});
  const s =  await uniStaff.findOne({email : req.body.email});
  console.log(array);
  if(array.length===0){

    const s =  await uniStaff.findOne({email : req.body.userToUpdate}); //the first ID

        idIncrement = staffPrefix+'-'+ 1

  }
  else if(array.length===1){ //hycheck law el ragel da howa ele kan mawgood bas f HOD
    
       idIncrement = staffPrefix+'-'+ 1

  }
  else{
  console.log(array[array.length-1].id);
  var idPrevious= retnum(array[array.length-1].id);
  idPrevious= idPrevious+1;
  idIncrement =staffPrefix+'-'+idPrevious //get the next id
  console.log(idIncrement);
  }


  const l = await location.findOne({name:req.body.locationName})
  
  if(!l){
  l=s.officeLocation;
  
  }

  else{
  const s =  await uniStaff.findOne({email : req.body.userToUpdate});
     await uniStaff.findOneAndUpdate({_id: s._id}, {$set: { id:(req.body.staffType==s.staffType?s.id:idIncrement) , salary:(req.body.salary==null?s.salary:req.body.salary),
     name:(req.body.name==null?s.name:req.body.salary), email:(req.body.newEmail==null?s.email:req.body.newEmail),
    officeLocation: l, staffType:req.body.staffType}}, {new:true}) 


    await location.findOneAndUpdate({_id: s.officeLocation}, {$pull: {staff: s._id}}, {new:true})
    await location.findOneAndUpdate({_id: l}, {$push: {staff: s._id}}, {new:true})

    res.send("User has been updated")
  }
  })
app.post('/removeStaffMember', async(req,res)=>{ //done and tested //this needs to be changed as well
  const payload = jwt.verify(req.header('auth-token'),key); 
  if(payload.type!='hr')
  return res.status(401).send("This is an HR Only function") 
  const u = await uniStaff.findOne({email: req.body.email});
  if(!u)
  res.send("user doesnt exist")
  else{
/* location
  .update( 
    {_id: l._id}, 
    { $pull: {staff: u._id } } 
  )
  .then( err => {
    console.log("we did it?")
  }); */
 /*  await location.update({_id: l._id},{ $pull: {staff: u._id } } )
        res.send("User has been deleted?") */
  await location.findOneAndUpdate({_id: u.officeLocation}, {$pull: {staff: u._id}}, {new:true})
  await uniStaff.findOneAndDelete({email:req.body.email})

  res.send("User deleted")



}
})
app.put('/changeSalary', async(req,res)=>{  // done and tested
  try{
  const payload = jwt.verify(req.header('auth-token'),key); 
  if(payload.type!='hr')
  return res.status(401).send("This is an HR Only function") 
const s =  await uniStaff.findOne({email : req.body.email});
await uniStaff.findOneAndUpdate({_id: s._id}, {$set: {salary: req.body.salary}}, {new:true}) 
res.send("Salary has been changed")
  }
  catch(error){
    res.send("user doesnt exist")
  }

})

app.post('/Departments/:departmentName/assignHOD', async(req,res)=>{ //hata5od hod made w t7oto f department w then fe course instructor hata5od el payload email w tsear
  //el HOD da feen w tgeeb el courses bt3to w tcheck hal courswe beymatch wala la2 w ba2y el conditions

  //validation
  const payload = jwt.verify(req.header('auth-token'),key); 
  if(payload.type!='hr')
  return res.status(401).send("This is an HR Only function") 

  //function
    const u = await uniStaff.findOne({email:req.body.email})
    const d = await department.findOne({name:req.params.departmentName})

    if(!u ||u.staffType!='hod' || !d ||d.HOD!=null)
    res.send("User isnt a HOD or he/she doesnt exist or there is already an assigned HOD or course doesnt exist")
  else{
    await uniStaff.findOneAndUpdate({_id: u._id}, {$set: {faculty:d.ofWhichFaculty, department: d}}, {new:true})
    await department.findOneAndUpdate({_id: d._id}, {$set: {HOD:u}}, {new:true});
    res.send("HOD has been assigned")}

})








/////////////////IMPORTANT CHECK THE RES.SEND FOR THE ABOVE ANYTHING UNDER IS CHECKED AND DONE
//4.1 ///////fadel el requests :)



///////////////////////////////////////////these were all changed!/////////////////////////////////////////

app.get('/HOD/Faculty', async(req,res)=>{    //////////new routes!
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
  return res.status(401).send("This is an HOD Only function") 

  const hod= await uniStaff.findOne({email:payload.email}) 
  let facultyToGet= await faculty.findOne({_id:hod.faculty})
          .select('-_id name')
          .exec();
          res.send(facultyToGet)

})
app.get('/HOD/Faculty/:facultyName/Department', async(req,res)=>{    //////////new routes!
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
  return res.status(401).send("This is an HOD Only function") 

  const hod= await uniStaff.findOne({email:payload.email}) 
  let departmentToGet= await department.findOne({_id:hod.department})
          .select('-_id name')
          .exec();
          res.send(departmentToGet)
})
//check if IT GETS MORE THAN ONE COURSE!
app.get('/HOD/Faculty/:facultyName/Department/:departmentName/Courses', async(req,res)=>{    //////////new routes!
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
  return res.status(401).send("This is an HOD Only function") 

  let faculties= await department.find({name: req.params.departmentName})
  .select('-_id -name -__v  -staffInDepartment -ofWhichFaculty -HOD')
  .populate({path:'courses', select:'name coverage -_id'})
  .exec();
  res.send(faculties)
})
app.post('/HOD/Faculty/:facultyName/Department/:departmentName/Courses/:courseName/assignCourseInstructor', async(req,res)=>{ //mtnshash t3mel el case where you assign a faculty of a different department
//validation
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
  return res.status(401).send("This is an HOD Only function") 
//function
  const hod= await uniStaff.findOne({email:payload.email}) 
 const u = await uniStaff.findOne({email:req.body.email}) //find a course instructor
 const c= await course.findOne({name:req.params.courseName})
  const f= await faculty.findOne({name:req.params.facultyName})
  const d=  await department.findOne({_id:c.ofWhichDepartment})
  
  
 if((c.ofWhichDepartment.equals(hod.department))===false)
  return res.send("This course is not apart of your department")
 if(!u ||u.staffType!='ci' || !c )//|| //u.department!=null)
    return res.send("User isnt a CI or he/she doesnt exist or hes already assigned to a course")
 else{
 const arr=u.courses
 var i
 var flag =false;

 for(i=0; i<arr.length;i++ ){//this is to check if the course exists for this instructor or not
   if (arr[i].equals(c._id)){   
     flag=true;
     break;}
  
 
 }
 if(flag===true)
    return res.send("This Course instructor is already assigned to this course")


else{
  //update in database
 await uniStaff.findOneAndUpdate({_id: u._id}, {$set: {faculty:f, department: c.ofWhichDepartment}}, {new:true})
 await uniStaff.findOneAndUpdate({_id: u._id},{ $push: {courses: c } } )     
 await course.findOneAndUpdate({_id: c._id}, {$push: {courseInstructor:u}}, {new:true});


 flag=false;
 const staffs= d.staffInDepartment;
 for(i=0; i<staffs.length;i++ ){ //to check if hes already assigned to this department and not add him there again to the staffarrayin department
  if (staffs[i].equals(u._id)){
    flag=true;
  break;}

}
if(!flag===false)
return res.send("CI HAS BEEN ASSIGNED TO THIS COURSE")
else{
 await department.findOneAndUpdate({_id: c.ofWhichDepartment}, {$push: {staffInDepartment:u}}, {new:true});
 

 res.send("CI has been assigned")}
}
 }
})
//I COMMENTED THE LAST LINE deleteCourseInstructor
app.post('/HOD/Faculty/:facultyName/Department/:departmentName/Courses/:courseName/deleteCourseInstructor', async(req,res)=>{ //testaha tany // done and tested
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
  return res.status(401).send("This is an HOD Only function") 
//function

const hod= await uniStaff.findOne({email:payload.email}) 

 const u = await uniStaff.findOne({email:req.body.email}) //find a course instructor
 const c= await course.findOne({name:req.params.courseName})
 if((c.ofWhichDepartment.equals(hod.department))===false)
    return res.send("This course is not apart of your department")

 if(!u ||u.staffType!='ci' || !c )//|| //u.department!=null)
 res.send("User isnt a CI or he/she doesnt exist or hes already assigned to a course")
 else{
 //await uniStaff.findOneAndUpdate({_id: u._id}, {$set: {faculty:null, department: null}}, {new:true})
      await uniStaff.findOneAndUpdate({_id: u._id},{ $pull: {courses: c._id }}, {new:true} )
 await course.findOneAndUpdate({_id: c._id}, {$pull: {courseInstructor:u._id}}, {new:true});
 //await department.findOneAndUpdate({_id: c.ofWhichDepartment}, {$pull: {staffInDepartment:u._id}}, {new:true});}

res.send("course instructor removed")}







})
//app.post('/:facultyName/:courseName/updateCourseInstructor?????????????????????????????????????????????????????
app.get('/getStaffInDepartment', async(req,res)=>{ //works
//validation
const payload = jwt.verify(req.header('auth-token'),key); //validation
if(payload.type!='hod')
    return res.status(401).send("This is an HOD Only function") 

    const payloadEmail = payload.email
    const u= await uniStaff.findOne({email:payloadEmail}) //get the user using this route
   /*  const staff = await department.findOne({HOD:u})
    .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
    .populate('staffInDepartment', '-_id -password -accumulatedHours -attendanceRecords -missingHours -__v -updatedAt -createdAt -signIn -courses -salary -DayOff')
    .populate('officeLocation', '-_id -staff -capacityCounter  -__v')
    .populate('faculty', '-_id   -departments          -__v')
    .populate('department', 'name' ) */

    let staff = await department.findOne({HOD:u})
    .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
    .populate({path: 'staffInDepartment', select:'name id email officeLocation faculty  -_id',
                populate: {path: 'faculty officeLocation department ' , select:'name -_id'}})
    .exec();  



    res.send(staff)



})
app.get('/:courseName/getStaffInCourse', async(req,res)=>{ //should work now  :)
    //validation
    try{
    var flag=false;
    var i=0
    const payload = jwt.verify(req.header('auth-token'),key); //validation
    if(payload.type!='hod')
        return res.status(401).send("This is an HOD Only function") 
        const payloadEmail = payload.email
        const hod= await uniStaff.findOne({email:payloadEmail}) 
        const c= await course.findOne({name:req.params.courseName})
       if(c.ofWhichDepartment.equals(hod.department)){
        //get the user using this route
       /*  const staff = await department.findOne({HOD:u})
        .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
        .populate('staffInDepartment', '-_id -password -accumulatedHours -attendanceRecords -missingHours -__v -updatedAt -createdAt -signIn -courses -salary -DayOff')
        .populate('officeLocation', '-_id -staff -capacityCounter  -__v')
        .populate('faculty', '-_id   -departments          -__v')
        .populate('department', 'name' ) */
    
        let staff = await course.findOne({_id:c})
        .select('-_id schedule')
        .populate({path:'courseInstructor courseCoordinator courseAcademicMembers ', select:'-__v -schedule -salary -signIn -missingHours -accumulatedHours -attendanceRecords -DayOff -createdAt -password -updatedAt -courses -department -faculty -_id',
          populate:{path:'officeLocation',select:'name -_id'}
          })
        .exec();
        res.send(staff)
        }
        else{
          return res.send("This course is not a part of your department")
        }
      }
      catch(error){

        res.send("This course doesnt exist or you are not apart of any department")
      }
    
    })
app.get('/viewDayOffRequests', async(req,res)=>{// 
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
    return res.status(401).send("This is an HOD Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
    let SlotLinkingReqs = await uniStaff.findOne({email:payloadEmail})
    .select('-_id incomingRequests')
    .populate({path: 'incomingRequests',match:{typeOfRequest:{$eq:"DayOff"}}, select:' madeBy typeOfRequest reason newDayOff status slot -_id ',
      populate:{path:'madeBy', select:'name newDayOff time location course email id -_id',
      populate:{path:'course location', select:'name -_id'}
    }})
    .exec();
    res.send(SlotLinkingReqs)
})
app.post('/acceptDayOffRequest', async(req,res)=>{ //takes in a users email to accept his request you can view his email from viewDayOffRequests // works

  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
    return res.status(401).send("This is an HOD Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


    const payloadEmail = payload.email
  //el ac
    let hod = await uniStaff.findOne({email:payloadEmail})
    const userToAcceptRequestFor = await  uniStaff.findOne({email:req.body.email})
    if(!userToAcceptRequestFor){
      return res.send("This User doesnt exist")
    }
    const requestFind =  await  request.findOne({madeBy:userToAcceptRequestFor._id, status:"Pending" }) //hngeeb request ba3atha el user da
    if(!requestFind){    
        return res.send("There is no  requests for this user")
    }


          await request.findOneAndUpdate({_id: requestFind._id}, {$set: {status:"Accepted"}}, {new:true});
          await uniStaff.findOneAndUpdate({_id: hod._id}, {$pull: {incomingRequests:requestFind._id}}, {new:true});
          await uniStaff.findOneAndUpdate({_id: userToAcceptRequestFor._id}, {$set: {DayOff:requestFind.newDayOff}}, {new:true});
          res.send("Request accepted and dayOff has been changed");
       
  
      
  
  
  
  
  
    //3awz ashoof el slot de mwgoda f unassigned slots fel course wala la2 law mwgoda assign it and remove it from unassigned










})//////hasnt been done!
app.post('/rejectDayOffRequest', async(req,res)=>{
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='hod')
    return res.status(401).send("This is an HOD Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


    const payloadEmail = payload.email
  //el ac
    let hod = await uniStaff.findOne({email:payloadEmail})
    const userToAcceptRequestFor = await  uniStaff.findOne({email:req.body.email})
    const requestFind =  await  request.findOne({madeBy:userToAcceptRequestFor._id, status:"Pending" }) //hngeeb request ba3atha el user da
    if(!requestFind){    
        return res.send("There is no more requests for this user")
    }
    


})
app.get('/getDayOffOfAllStaff', async(req,res)=>{ //tested and done
  const payload = jwt.verify(req.header('auth-token'),key); //validation

  if(payload.type!='hod')
    return res.status(401).send("This is an HOD Only function") 

    const payloadEmail = payload.email
    const u= await uniStaff.findOne({email:payloadEmail})

    let staff = await department.findOne({HOD:u})
    .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
    .populate({path: 'staffInDepartment', select:'name email id DayOff -_id'})
    .exec();
    res.send(staff)
})
app.get('/getDayOff/:email', async(req,res)=>{ //tested and done
  const payload = jwt.verify(req.header('auth-token'),key); //validation

  if(payload.type!='hod')
    return res.status(401).send("This is an HOD Only function") 

    const payloadEmail = payload.email
    const u= await uniStaff.findOne({email:payloadEmail})
    const staffToFind= await uniStaff.findOne({email:req.params.email})
    if(!staffToFind)
        res.send("Staff doesnt exist")
    else{
    let staff = await department.findOne({HOD:u})
    .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
    .populate({path: 'staffInDepartment',match:{email:{$eq:staffToFind.email}}, select:'name email id DayOff -_id'})
    .exec();
    res.send(staff)
    }
})
app.get('/:courseName/courseCoverageHOD', async(req,res)=>{ //done
  try{
  const payload = jwt.verify(req.header('auth-token'),key); //validation
    if(payload.type!='hod')
        return res.status(401).send("This is an HOD Only function") 
        const payloadEmail = payload.email
        const hod= await uniStaff.findOne({email:payloadEmail}) 
        const c= await course.findOne({name:req.params.courseName})
       if(c.ofWhichDepartment.equals(hod.department)){
        res.send("Course Coverage for " +""+req.params.courseName+": "+c.coverage);
       }
       else
       return res.send("This is not your department")
      }

      catch(error){

        res.send("course doesnt exist ")
      }
})
app.get('/getTeachingAssignments', async(req,res)=>{




}) // and get back to this too as its related to course coverage



//4.2 Course Instructor
app.get('/CI/Faculty', async(req,res)=>{    //////////new routes!
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ci')
  return res.status(401).send("This is a CI Only function") 

  const ci= await uniStaff.findOne({email:payload.email}) 
  let facultyToGet= await faculty.findOne({_id:ci.faculty})
          .select('-_id name')
          .exec();
          res.send(facultyToGet)

})
app.get('/CI/Faculty/:facultyName/Department', async(req,res)=>{    //////////new routes!
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ci')
  return res.status(401).send("This is a CI Only function") 

  const hod= await uniStaff.findOne({email:payload.email}) 
  let departmentToGet= await department.findOne({_id:hod.department})
          .select('-_id name')
          .exec();
          res.send(departmentToGet)
})


//check if IT GETS MORE THAN ONE COURSE!
app.get('/CI/Faculty/:facultyName/Department/:departmentName/Courses', async(req,res)=>{    //////////new routes!
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ci')
  return res.status(401).send("This is a CI Only function") 

  let courses= await uniStaff.find({email: payload.email})
  .select('courses -_id')
  .populate({path:'courses', select:'name coverage -_id'})
  .exec();
  res.send(courses)
}) 

//not done
app.get('/:courseName/courseCoverageCI', async(req,res)=>{ //get back to this 3ashan ttest law el course da msh tb3k
  try{
  const payload = jwt.verify(req.header('auth-token'),key); //validation

  if(payload.type!='ci')
    return res.status(401).send("This is a CI Only function") 

    const payloadEmail = payload.email
    const u= await uniStaff.findOne({email:payloadEmail})

    const c= await course.findOne({name:req.params.courseName})
    for(i=0;i<u.courses.length;i++){
      if(u.courses[i].equals(c._id) ){
          flag="true"
          break;}
    }

    if(!flag)
    return res.send("You are not apart of this course to check its coverage")
    res.send("Course Coverage for " +""+req.params.courseName+": "+c.coverage);
  }


  catch(error){
    return res.send("course doesnt exist")
  }



   // let staff = await department.findOne({HOD:u})


  
})



app.post('/assignYourSelfToThisSlot', async(req,res)=>{ // formmrly assigntothisslotworks now holy fuck TEST AGAIN TO ADD COVERAGE UPDATE AND CHECK IF DAYOFF
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  var i;
  var flag;
  if(payload.type!='ci')
    return res.status(401).send("This is an HOD Only function") 
    
    const payloadEmail = payload.email
    const u= await uniStaff.findOne({email:payloadEmail}) //el CI

    const sch= await schedule.findOne({forWhichUser:u._id})
    
    const sched = schedule.aggregate([
      {$match:{_id:sch._id}},
      {$unwind :'$Wednesday'},
      {$match:{'Wednesday.name': "Slot4"}}
    ]
    )
    console.log(sched)










    var daye= req.body.day;
    var dayModified=daye.replace(/['"]+/g, '')

    
    const l= await location.findOne({name:req.body.locationName})
    if(!l){
      res.send("location doesnt exist")
    }
    const c= await course.findOne({name:req.body.course})
    if(!c){
      res.send("course doesnt exist")
    }
    for(i=0;i<u.courses.length;i++){
      if(u.courses[i].equals(c._id) ){
          flag="true"
          break;}
    }

    if(!flag)
    res.send("you are not assigned to this course")
  else{
  const cs= await slot.findOne({name: req.body.name, course:c._id, day:req.body.day, 
    time:req.body.time,location:l._id, status:"UnassignedToAnyTA"})
    if(!cs ||cs.status==="Assigned"){
      res.send("slot doesnt exist or is already assigned")

    }


    
    arr=c.courseSlotsUnassigned;
    const lengthOfAssignedCourses= (c.courseSlotsAssigned.length)+1;
    const lengthOfUnassignedCourses= (c.courseSlotsUnassigned.length)-1;
    
    var coursecoverage= (lengthOfAssignedCourses/(lengthOfUnassignedCourses+lengthOfAssignedCourses) )*100
   coursecoverage=coursecoverage+"%"

  for(i=0;i<arr.length;i++){
      if(arr[i].equals(cs._id) ){
        await slot.findOneAndUpdate({_id: cs._id}, {$set: {givenBy:u ,status: "Assigned"}}, {new:true})
        await course.findOneAndUpdate({_id: c._id}, {$pull: {courseSlotsUnassigned:cs._id}}, {new:true});
        await course.findOneAndUpdate({_id: c._id}, {$push: {courseSlotsAssigned:cs._id}}, {new:true});
        await course.findOneAndUpdate({_id: c._id},{ $set: {coverage: coursecoverage }},{new:true} )

        await schedule.findOneAndUpdate({_id: sch._id}, {$push: {[dayModified]:cs._id}}, {new:true});//doesnt take input???
        res.send("you have been assigned to this slot");
      break;

    }



  }



  //3awz ashoof el slot de mwgoda f unassigned slots fel course wala la2 law mwgoda assign it and remove it from unassigned
    
  }
}) //route is completely wrong w mloosh lazma




app.get('/:courseName/viewSlotsAssignment', async(req,res)=>{ //works now
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ci')
    return res.status(401).send("This is a CI Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


   //el CI
  let slots= await course.findOne({name:req.params.courseName})
  .select('-_id courseSlotsAssigned courseSlotsUnassigned')
  .populate({path:'courseSlotsAssigned courseSlotsUnassigned', select:'forWhichUser name time day location givenBy status-_id',
    populate:{path:'location givenBy Monday Tuesday Wednesday ',select:'name email -_id'
    }
    })
  .exec();

  res.send(slots)
/*   .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
  .populate({path: 'staffInDepartment', select:'name id email officeLocation faculty  -_id',
              populate: {path: 'faculty officeLocation department ' , select:'name -_id'}})
  .exec();  
 */

  /* let staff = await department.findOne({HOD:u})
  .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
  .populate({path: 'staffInDepartment', select:'name email id DayOff -_id'})
  .exec();
  res.send(staff) */


})
app.get('/getStaffInDepartment2', async(req,res)=>{ //works NOW :)
  //validation
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ci')
      return res.status(401).send("This is a CI Only function") 
  
      const payloadEmail = payload.email
      const u= await uniStaff.findOne({email:payloadEmail}) 
      
      
      //get the user using this route
     /*  const staff = await department.findOne({HOD:u})
      .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
      .populate('staffInDepartment', '-_id -password -accumulatedHours -attendanceRecords -missingHours -__v -updatedAt -createdAt -signIn -courses -salary -DayOff')
      .populate('officeLocation', '-_id -staff -capacityCounter  -__v')
      .populate('faculty', '-_id   -departments          -__v')
      .populate('department', 'name' ) */
  
      let staff = await department.findOne({_id:u.department})
      .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
      .populate({path: 'staffInDepartment', select:'name id email officeLocation faculty  -_id',
                  populate: {path: 'faculty officeLocation department ' , select:'name -_id'}})
      .exec();  
  
  
  
      res.send(staff)
  
  
  
  })
app.get('/:courseName/getStaffInCourse2', async(req,res)=>{ //works now :)
    //validation
    var flag=false;
    var i=0
    const payload = jwt.verify(req.header('auth-token'),key); //validation
    if(payload.type!='ci')
        return res.status(401).send("This is a CI Only function") 
        const payloadEmail = payload.email
        const ci= await uniStaff.findOne({email:payloadEmail}) 
        const c= await course.findOne({name:req.params.courseName})
        for(i=0;i<ci.courses.length;i++){
          if(ci.courses[i].equals(c._id) ){
              flag=true;
            break;}
        }
        if(flag===false)
        return res.send("you are not assigned to this course to be able to view this staff")
        //get the user using this route
       /*  const staff = await department.findOne({HOD:u})
        .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
        .populate('staffInDepartment', '-_id -password -accumulatedHours -attendanceRecords -missingHours -__v -updatedAt -createdAt -signIn -courses -salary -DayOff')
        .populate('officeLocation', '-_id -staff -capacityCounter  -__v')
        .populate('faculty', '-_id   -departments          -__v')
        .populate('department', 'name' ) */
    
        let staff = await course.findOne({_id:c})
        .select('-_id schedule')
        .populate({path:'courseInstructor courseCoordinator courseAcademicMembers ', select:'-__v -schedule -salary -signIn -missingHours -accumulatedHours -attendanceRecords -DayOff -createdAt -password -updatedAt -courses -department -faculty -_id',
          populate:{path:'officeLocation',select:'name -_id'}
          })
        .exec();
    
    
    
        res.send(staff)
    
    
    
    })
    //URL CHANGED
app.post('/assignAcademicMemberToSlot', async(req,res)=>{ //e3mel en law el academic member da msh mwgod f course dah yb2a mt assignoosh
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  var i;
  var flag;
 
  if(payload.type!='ci')
    return res.status(401).send("This is an CI Only function") 
    
    const payloadEmail = payload.email
    const ci= await uniStaff.findOne({email:payloadEmail}) //el CI
    const ac= await uniStaff.findOne({email:req.body.email})
    if(ac.staffType!="ac" ||!ac)
   return res.send("This is not an academic member")


    else{
    const sch= await schedule.findOne({forWhichUser:ac._id})
    
    

    var daye= req.body.day;
    var dayModified=daye.replace(/['"]+/g, '')

    
    const l= await location.findOne({name:req.body.locationName})
    if(!l){
      res.send("location doesnt exist")
    }
    const c= await course.findOne({name:req.body.course})
    
    if(!c){
      res.send("course doesnt exist")
    }
    for(i=0;i<ci.courses.length;i++){
      if(ci.courses[i].equals(c._id) ){
          flag="true"
          break;}
    }

    if(!flag)
    res.send("you are not assigned to this course to be able to add someone")
  else{
  const cs= await slot.findOne({name: req.body.name, course:c._id, day:req.body.day, 
    time:req.body.time,location:l._id, status:"UnassignedToAnyTA"})
    if(!cs ||cs.status==="Assigned"){
      res.send("slot doesnt exist or is already assigned")

    }
    var arr=ac.courses
    flag=false;
   for(i=0; i<arr.length;i++ ){//this is to check if the course exists for this instructor or not
   if (arr[i].equals(c._id)){   
     flag=true
      break;
   }
 }

if(flag===false)
  return res.send("Academic member is not assigned to this course, assign him first using assignAcademicMemberToCourse to be able to assign him COO")







    const lengthOfAssignedCourses= (c.courseSlotsAssigned.length)+1;
    const lengthOfUnassignedCourses= (c.courseSlotsUnassigned.length)-1;
    
    var coursecoverage= (lengthOfAssignedCourses/(lengthOfUnassignedCourses+lengthOfAssignedCourses) )*100
   coursecoverage=coursecoverage+"%"



    arr=c.courseSlotsUnassigned;
    console.log(arr)
  for(i=0;i<arr.length;i++){
      if(arr[i].equals(cs._id)){
        await slot.findOneAndUpdate({_id: cs._id}, {$set: {givenBy:ac ,status: "Assigned"}}, {new:true})
        await course.findOneAndUpdate({_id: c._id}, {$pull: {courseSlotsUnassigned:cs._id}}, {new:true});
        await course.findOneAndUpdate({_id: c._id}, {$push: {courseSlotsAssigned:cs._id}}, {new:true});
        await course.findOneAndUpdate({_id: c._id},{ $set: {coverage: coursecoverage }},{new:true} )
        await schedule.findOneAndUpdate({_id: sch._id}, {$push: {[dayModified]:cs._id}}, {new:true});//doesnt take input???
        res.send("you have been assigned to this slot");
      break;

    }



  }



  //3awz ashoof el slot de mwgoda f unassigned slots fel course wala la2 law mwgoda assign it and remove it from unassigned
    
  }

}
}) //also 3awz ashoof law el slot de day off wala la2
    //URL CHANGED

app.post('/:facultyName/:courseName/assignAcademicMemberToCourse', async(req,res)=>{ //works i think this assigns him to the department not a slot



  const payload = jwt.verify(req.header('auth-token'),key); //validation
  var i;
  var flag=false;
  if(payload.type!='ci')
    return res.status(401).send("This is a CI Only function") 
    
    const payloadEmail = payload.email
  const ci= await uniStaff.findOne({email:payloadEmail})
  const u= await uniStaff.findOne({email:req.body.email})
  const c= await course.findOne({name:req.params.courseName})
  const f= await faculty.findOne({name:req.params.facultyName})
  const d=  await department.findOne({_id:c.ofWhichDepartment})

  
  for(i=0;i<ci.courses.length;i++){
    if(ci.courses[i].equals(c._id) ){
        flag=true;
      break;}
  }
if(flag===false)
  return res.send("you are not assigned to this course to be able to add someone")






if(!u ||u.staffType!='ac' || !c )//|| //u.department!=null)
 return res.send("User isnt an AC or he/she doesnt exist or hes already assigned to a course")
 


 const arr=u.courses
 var i;


 for(i=0; i<arr.length;i++ ){//this is to check if the course exists for this instructor or not
   if (arr[i].equals(c._id)){   
    return res.send("Academic member is already assigned to this course")
    break;}
  
 
 }




  //update in database
 await uniStaff.findOneAndUpdate({_id: u._id}, {$set: {faculty:f, department: c.ofWhichDepartment}}, {new:true})
 await uniStaff.findOneAndUpdate({_id: u._id},{ $push: {courses: c } } )     
 const courseAcs= c.courseAcademicMembers
 for(i=0; i<courseAcs.length;i++ ){ //to check if hes already assigned to this department and not add him there again to the staffarrayin department
   if (courseAcs[i].equals(u._id)){
     return res.send("COURSE MEMBER HAS ALREADY BEEN ASSIGNED TO THIS COURSE")
     break;}
 
 }
 
 await course.findOneAndUpdate({_id: c._id}, {$push: {courseAcademicMembers:u}}, {new:true});











flag=false;
 const staffs= d.staffInDepartment;
 for(i=0; i<staffs.length;i++ ){ //to check if hes already assigned to this department and not add him there again to the staffarrayin department
  if (staffs[i].equals(u._id)){
    flag = true
    return res.send("AC HAS BEEN ASSIGNED TO THIS COURSE")
    break;}

}
if(flag===false)
await department.findOneAndUpdate({_id: c.ofWhichDepartment}, {$push: {staffInDepartment:u}}, {new:true});
 








 return res.send("AC has been assigned")

 





}) //this route is bugged refresh when you go into it to see the add form
app.post('/:facultyName/:courseName/deleteAcademicMemberFromCourse', async(req,res)=>{
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ci')
  return res.status(401).send("This is an HOD Only function") 
//function
const payloadEmail = payload.email

const ci= await uniStaff.findOne({email:payloadEmail})
 const ac = await uniStaff.findOne({email:req.body.email}) //find a course instructor
 const c= await course.findOne({name:req.params.courseName})
  const f= await faculty.findOne({name:req.params.facultyName})
  const d=  await department.findOne({_id:c.ofWhichDepartment})

 for(i=0;i<ci.courses.length;i++){
  if(ci.courses[i].equals(c._id) ){
      flag=true;
    break;}
}
if(flag===false)
return res.send("you are not assigned to this course to be able to add someone")












 if(!ac ||ac.staffType!='ac' || !c )//|| //u.department!=null)
 res.send("User isnt a CI or he/she doesnt exist or hes already assigned to a course")
 else{
 //await uniStaff.findOneAndUpdate({_id: ac._id}, {$set: {faculty:null, department: null}}, {new:true})
      await uniStaff.findOneAndUpdate({_id: ac._id},{ $pull: {courses: c._id }}, {new:true} )
 await course.findOneAndUpdate({_id: c._id}, {$pull: {courseAcademicMembers:ac._id}}, {new:true});
 //await department.findOneAndUpdate({_id: c.ofWhichDepartment}, {$pull: {staffInDepartment:ac._id}}, {new:true});}

res.send("Academic member removed")
 }
  
  
})
//app.post('/updateacademiccoursemember')???????????????????????????????????????????????????????????
app.post('/:courseName/assignCourseCoordinatorToCourse', async(req,res)=>{
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  var i;
  var flag=false;
  if(payload.type!='ci')
    return res.status(401).send("This is a CI Only function") 
    
    const payloadEmail = payload.email
  const ci= await uniStaff.findOne({email:payloadEmail})
  const c= await course.findOne({name:req.params.courseName})
  const userToBeAssigned =  await uniStaff.findOne({email : req.body.email});

  for(i=0;i<ci.courses.length;i++){
    if(ci.courses[i].equals(c._id) ){
        flag=true;
      break;}
  }
  if(flag===false)
  return res.send("You are not assigned to this course to be able to add someone as a COO")

  const arr=userToBeAssigned.courses
  console.log(arr);
  var i;


  if(!userToBeAssigned ||userToBeAssigned.staffType!='ac' || !c  )
  return res.send("User isnt an AC or he/she doesnt exist or hes already assigned to a course")
 


 

flag=false;
 for(i=0; i<arr.length;i++ ){//this is to check if the course exists for this instructor or not
   if (arr[i].equals(c._id)){   
     flag=true
      break;
   }
 }

if(flag===false)
  return res.send("Academic member is not assigned to this course, assign him first using assignAcademicMemberToCourse to be able to assign him COO")












  function retnum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}  
  var staffPrefix= "coo";
  var idIncrement;
  const arrayOfCOOs = await uniStaff.find({staffType:"coo"});
 
  console.log(arrayOfCOOs);
  if(arrayOfCOOs.length===0){
        //the first ID
        idIncrement = staffPrefix+'-'+ 1

  }
 
  else{
  console.log(arrayOfCOOs[arrayOfCOOs.length-1].id);
  var idPrevious= retnum(arrayOfCOOs[arrayOfCOOs.length-1].id);
  idPrevious= idPrevious+1;
  idIncrement =staffPrefix+'-'+idPrevious //get the next id
  console.log(idIncrement);
  }


  
  
  await uniStaff.findOneAndUpdate({_id: userToBeAssigned._id}, {$set: { id:idIncrement, staffType:"coo"}}, {new:true}) 
  await course.findOneAndUpdate({_id: c._id}, {$set: {courseCoordinator:userToBeAssigned}}, {new:true});

  res.send("User has been assigned")
  





})





//4.3 ////////////////change these
app.post('/createCourseSlot',async(req,res)=>{  //e3mel condition ama tkoon fee nfs el course f nafs el location w  time


  const l =  await location.findOne({name : req.body.locationName});
  if(!l || l.locType==='Office')
    return res.send("Cant add a CourseSlot to to an office or Location doesnt exist ")

  const c = await course.findOne({name : req.body.course});
  if(!c)
   return res.send("Course not found")

  const cs = new slot({
    name: req.body.name,
    day: req.body.day,
    time:req.body.time,
    location:l,
    course: c,
  })

await cs.save()
const lengthOfAssignedCourses= (c.courseSlotsAssigned.length);
const lengthOfUnassignedCourses= (c.courseSlotsUnassigned.length);

var coursecoverage= (lengthOfAssignedCourses/(lengthOfUnassignedCourses+lengthOfAssignedCourses) )*100
coursecoverage=coursecoverage+"%"
await course.findOneAndUpdate({_id: c._id},{ $push: {courseSlotsUnassigned: cs._id } },{new:true} )
await course.findOneAndUpdate({_id: c._id},{ $set: {coverage: coursecoverage }},{new:true} )

  res.send('courseSlot added');
  console.log ("courseSlot added");
 })
//app.post('/updateCourseSlot')??????????
app.post('/deleteCourseSlot', async(req,res)=>{ //???????????????????? //test again on a new database

  const payload = jwt.verify(req.header('auth-token'),key); //validation
  var i;
  var flag;
 
  if(payload.type!='coo')
    return res.status(401).send("This is an CI Only function") 
    
    const payloadEmail = payload.email
    const coo= await uniStaff.findOne({email:payloadEmail}) //el CI
   
    
    

    var daye= req.body.day;
    var dayModified=daye.replace(/['"]+/g, '')

    
    const l= await location.findOne({name:req.body.locationName})
    if(!l){
      res.send("location doesnt exist")
    }
    const c= await course.findOne({name:req.body.course})
    
    if(!c){
      res.send("course doesnt exist")
    }
    for(i=0;i<coo.courses.length;i++){
      if(coo.courses[i].equals(c._id) ){
          flag="true"
          break;}
    }

    if(!flag)
    res.send("you are not assigned to this course to be able to delete its slot")
  else{
  const cs= await slot.findOne({name: req.body.name, course:c._id, day:req.body.day, 
    time:req.body.time,location:l._id})
    if(!cs ){
      res.send("slot doesnt exist or is already assigned")

    }
    console.log(cs._id)
    const sch= await schedule.findOne({forWhichUser:cs.givenBy})
    console.log(sch)

    var lengthOfAssignedCourses
    var lengthOfUnassignedCourses
    if(cs.status==="Assigned"){
     lengthOfAssignedCourses= (c.courseSlotsAssigned.length)-1;
     lengthOfUnassignedCourses= (c.courseSlotsUnassigned.length);
     arr=c.courseSlotsAssigned;}
    if(cs.status==="UnassignedToAnyTA"){
      lengthOfAssignedCourses= (c.courseSlotsAssigned.length);
     lengthOfUnassignedCourses= (c.courseSlotsUnassigned.length)-1;
     arr=c.courseSlotsUnassigned;}
     
    var coursecoverage= (lengthOfAssignedCourses/(lengthOfUnassignedCourses+lengthOfAssignedCourses) )*100
   coursecoverage=coursecoverage+"%"



    
    console.log(arr)
  for(i=0;i<arr.length;i++){
      if(arr[i].equals(cs._id)){
        await slot.findOneAndDelete({_id: cs._id})
        await course.findOneAndUpdate({_id: c._id}, {$pull: {courseSlotsUnassigned:cs._id}}, {new:true});
        await course.findOneAndUpdate({_id: c._id}, {$pull: {courseSlotsAssigned:cs._id}}, {new:true});
        await course.findOneAndUpdate({_id: c._id},{ $set: {coverage: coursecoverage }},{new:true} )
        res.send("Slot has been deleted");

        await schedule.findOneAndUpdate({_id: sch._id}, {$pull: {[dayModified]:cs._id}}, {new:true});//doesnt take input???
        res.send("Slot has been deleted");

      break;

    }



  }



  //3awz ashoof el slot de mwgoda f unassigned slots fel course wala la2 law mwgoda assign it and remove it from unassigned
    
}








})
app.get('/viewSlotLinkingRequests',async(req,res)=>{ //view all the requests that are pending and yet to be responded to
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='coo')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
    let SlotLinkingReqs = await uniStaff.findOne({email:payloadEmail})
    .select('-_id incomingRequests')
    .populate({path: 'incomingRequests',match:{typeOfRequest:{$eq:"Slot Linking"}}, select:' madeBy typeOfRequest status slot ',
      populate:{path:'slot madeBy', select:'name day time location course email id -_id',
      populate:{path:'course location', select:'name -_id'}
    }})
    .exec();
    res.send(SlotLinkingReqs)



 })
app.post('/acceptSlotLinkingRequests',async(req,res)=>{ // this is done //takes user email who submitted a request to you and then accepts itadding the thing to his schedule
//htgeeb el slot ele 3awzha w user w tdefhalo fel schedule bta3o w ta5od el request b esmo w tupdatha b status accepted w tsheel el request men el incoming w b s
const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='coo')
    return res.status(401).send("This is a COO Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
    let coo = await uniStaff.findOne({email:payloadEmail})
    const userToAcceptRequestFor = await  uniStaff.findOne({email:req.body.email})
    const requestFind =  await  request.findOne({madeBy:userToAcceptRequestFor._id, status:"Pending" }) //hngeeb request ba3atha el user da
    if(!requestFind){    
        return res.send("There is no more requests for this user")

    }
    const cs = await slot.findOne({_id:requestFind.slot})
    const c = await course.findOne({_id:cs.course})
   
    //c//onsole.log(cs)
    //console.log(c) //push slot into his schedule
    if(cs.status==="Assigned"){
      return res.send("This slot has been assigned already")
    }
      const sch= await schedule.findOne({forWhichUser:userToAcceptRequestFor._id})
      

      var daye= cs.day;
      var dayModified=daye.replace(/['"]+/g, '')
       

  
      
      
  
      const lengthOfAssignedCourses= (c.courseSlotsAssigned.length)+1;
      const lengthOfUnassignedCourses= (c.courseSlotsUnassigned.length)-1;
      
      var coursecoverage= (lengthOfAssignedCourses/(lengthOfUnassignedCourses+lengthOfAssignedCourses) )*100
     coursecoverage=coursecoverage+"%"
  
  

      arr=c.courseSlotsUnassigned;
      console.log(arr)
    for(i=0;i<arr.length;i++){
        if(arr[i].equals(cs._id)){
          await slot.findOneAndUpdate({_id: cs._id}, {$set: {givenBy:userToAcceptRequestFor ,status: "Assigned"}}, {new:true})
          await course.findOneAndUpdate({_id: c._id}, {$pull: {courseSlotsUnassigned:cs._id}}, {new:true});
          await course.findOneAndUpdate({_id: c._id}, {$push: {courseSlotsAssigned:cs._id}}, {new:true});
          await course.findOneAndUpdate({_id: c._id},{ $set: {coverage: coursecoverage }},{new:true} )
          await schedule.findOneAndUpdate({_id: sch._id}, {$push: {[dayModified]:cs._id}}, {new:true});//doesnt take input???
          await request.findOneAndUpdate({_id: requestFind._id}, {$set: {status:"Accepted"}}, {new:true});
          await uniStaff.findOneAndUpdate({_id: coo._id}, {$pull: {incomingRequests:requestFind._id}}, {new:true});
          res.send("Request accepted and slot has been added assigned to this slot");
        break;
  
      }
  
  
  
    }
  
  
  
    //3awz ashoof el slot de mwgoda f unassigned slots fel course wala la2 law mwgoda assign it and remove it from unassigned
      
  

})
app.post('/rejectSlotLinkingRequests',async(req,res)=>{ // takes user email and rejects the request and updates the status to "rejected" and slot is not added to users schedule
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='coo')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
    let coo = await uniStaff.findOne({email:payloadEmail})
    const userToAcceptRequestFor = await  uniStaff.findOne({email:req.body.email})
    const requestFind =  await  request.findOne({madeBy:userToAcceptRequestFor._id, status:"Pending" }) //hngeeb request ba3atha el user da
    if(!requestFind){    
        return res.send("There is no more requests for this user")

    }

    await request.findOneAndUpdate({_id: requestFind._id}, {$set: {status:"Rejected"}}, {new:true});
    await uniStaff.findOneAndUpdate({_id: coo._id}, {$pull: {incomingRequests:requestFind._id}}, {new:true});
    res.send("Slot has been rejected")
})







//4.4

app.get('/viewSchedule', async(req,res)=>{ //works now
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an ac Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  const u= await uniStaff.findOne({email:payloadEmail}) //el CI
  let sched= await uniStaff.findOne({_id:u._id})
  .select('-_id schedule')
  .populate({path:'schedule', select:'-forWhichUser -_id',
    populate:{path:'Saturday Sunday Monday Tuesday Wednesday ',select:'name location course time -_id',
    populate:{path:'course location',select:' name -_id '}}
    })
  .exec();

  res.send(sched)
/*   .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
  .populate({path: 'staffInDepartment', select:'name id email officeLocation faculty  -_id',
              populate: {path: 'faculty officeLocation department ' , select:'name -_id'}})
  .exec();  
 */

  /* let staff = await department.findOne({HOD:u})
  .select('-_id -HOD   -__v  -courses -name -ofWhichFaculty')
  .populate({path: 'staffInDepartment', select:'name email id DayOff -_id'})
  .exec();
  res.send(staff) */


})
app.post('/submitDayOffRequest',async(req,res)=>{//This should be done
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an ac Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  const u= await uniStaff.findOne({email:payloadEmail}) //el CI
  if(u.department===null || u.department===undefined)
      return res.send("You are not assigned to any department")
  const dayoffrequest= new request({
      madeBy:u,
      typeOfRequest: req.body.type,
      newDayOff: req.body.newDayOff,
      reason: req.body.reason



  })

  const departmentFind= await department.findOne({_id:u.department})
  console.log(departmentFind.HOD)
  await dayoffrequest.save();
  await uniStaff.findOneAndUpdate({_id: u._id}, {$push: {outgoingRequests:dayoffrequest }}, {new:true})
  await uniStaff.findOneAndUpdate({_id: departmentFind.HOD}, {$push: {incomingRequests:dayoffrequest }}, {new:true})
  res.send("Request has beeen sent")
  //dayOff Request has beeen done



})
app.get('/viewUnAssignedSlotsForYourCourse',async(req,res)=>{ //aan 3amaltaha 3ala coo blghalat///this will get the unassigned slots for you to see //rerun this
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
    let slots = await uniStaff.findOne({email:payloadEmail})
    .select('-_id courses')
    .populate({path: 'courses', select:'name courseSlotsUnassigned -_id', 
     populate:{path: 'courseSlotsUnassigned',select: '-_id ', 
     populate:{path:'course location', select: 'name -_id'}}})
    .exec();
    res.send(slots)



  
})
app.post('/submitSlotLinkingRequest',async(req,res)=>{//This should be done please make a view linkingRequest in coo

  var i
  var flag= false;
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an ac Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  const u= await uniStaff.findOne({email:payloadEmail}) //el AC
  if(u.department===null || u.department===undefined)
      return res.send("You are not assigned to any department")

  


      const c= await course.findOne({name:req.body.course})
      const arr=u.courses

      flag=false;
      for(i=0; i<arr.length;i++ ){//this is to check if the course exists for this academic member or or not
        if (arr[i].equals(c._id)){   
          flag=true
            break;
        }
      }

      if(flag===false)
        return res.send("You are not assigned to this course to choose this slot")


      const l= await location.findOne({name:req.body.location})

    const cs= await slot.findOne({name: req.body.name, course:c._id, day:req.body.day, 
        time:req.body.time,location:l._id, status:"UnassignedToAnyTA"})
        if(!cs ||cs.status==="Assigned"){
          res.send("slot doesnt exist or is already assigned please input another slot")
    
        }










  const SlotLinkingReq= new request({
      madeBy:u,
      typeOfRequest:"Slot Linking",
      slot: cs


  })
  await SlotLinkingReq.save();
  const courseFind= await course.findOne({_id:c._id})
  console.log(courseFind.courseInstructor)
  
  await uniStaff.findOneAndUpdate({_id: u._id}, {$push: {outgoingRequests:SlotLinkingReq }}, {new:true})
  await uniStaff.findOneAndUpdate({_id: courseFind.courseCoordinator}, {$push: {incomingRequests:SlotLinkingReq }}, {new:true})
  res.send("Request SENT :)")


})
app.get('/viewAllRequests', async(req,res)=>{//Test these when they are working this one is working
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
    let pendingRequests = await uniStaff.findOne({email:payloadEmail})
    .select('-_id outgoingRequests')
    .populate({path: 'outgoingRequests', select:'reason newDayOff typeOfRequest status slot-_id',
    populate:{path:'slot ',select:'name location course time day -_id',
    populate:{path:'course location',select:' name -_id '}}})
    .exec();
    res.send(pendingRequests)
})
app.get('/viewPendingRequests', async(req,res)=>{//Test these when they are working this one is working
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
    let pendingRequests = await uniStaff.findOne({email:payloadEmail})
    .select('-_id outgoingRequests')
    .populate({path: 'outgoingRequests',match:{status:{$eq:"Pending"}}, select:'reason newDayOff typeOfRequest status -_id',
    populate:{path:'slot ',select:'name location course time day -_id',
    populate:{path:'course location',select:' name -_id '}}})
    .exec();
    res.send(pendingRequests)
})
app.get('/viewAcceptedRequests', async(req,res)=>{
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
  let pendingRequests = await uniStaff.findOne({email:payloadEmail})
  .select('-_id outgoingRequests')
  .populate({path: 'outgoingRequests',match:{status:{$eq:"Accepted"}}, select:'reason newDayOff typeOfRequest status -_id', 
   populate:{path:'slot',select:'name day time course location -_id',
   populate:{path:'course location',select:'name -_id'}}})
  .exec();
  res.send(pendingRequests)
})
app.get('/viewRejectedRequests', async(req,res)=>{
  const payload = jwt.verify(req.header('auth-token'),key); //validation
  if(payload.type!='ac')
    return res.status(401).send("This is an AC Only function") 
  //ana hadef el slot lel schedule then we get the schedule and thats pretty much it bdal laffat sooda


  const payloadEmail = payload.email
  //el ac
  
    let pendingRequests = await uniStaff.findOne({email:payloadEmail})
    .select('-_id outgoingRequests')
    .populate({path: 'outgoingRequests',match:{status:{$eq:"Rejected"}}, select:'reason newDayOff typeOfRequest status -_id', 
     populate:{path:'slot',select:'name day time course location-_id',
     populate:{path:'course location',select:'name -_id'}}})
    .exec();
    res.send(pendingRequests)
})




function authenticate(req,res,next)
{

if(!req.header('auth-token')) //check law fee token walaa al2
return res.status(403).send('el token pls')

try{
    jwt.verify(req.header('auth-token'),key); //law ghaalt haythrow exception ana msh fahem beyverify eh
    next();

}
catch(err)
{
  res.status(403).send("el token msh bta3ak") // law el signature ghalat beyraga3 error
}
}




app.listen(5000,()=>{
    console.log('server started');
  
  })

})

.catch((err)=>{
        console.log(err)
})