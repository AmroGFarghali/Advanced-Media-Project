VERY IMPORTANT: SEED THE DATABASE WITH THE SEED METHODS FOR ONE HR AND ONE LOCATION FOR THIS WHOLE PROJECT
THROUGH POSTMAN

Deployment:
I wasnt able to do deployment with the way I did my routing and server since they are both in the same file


1. Open a terminal at /backend/main.js and node main.js to run the BACKEND
2. Open a terminal at app.js and npm start to run the FRONTEND

 NEW:
2.BACKEND listens on port localhost:5000
3.REACT(FRONTEND) listens on port localhost:3000


Notes:
I made a mistake in milestone 1 where I put the login under authentication/ This is fixed by just placing login over
app.use(authenticate)

I added Some routes for the frontEnd use only like get all Locations but this is mainly the same readme file as before
with some route urls changed to suit FrontEnd side 









First: 
SEED THE DATABASE WITH Functions 1 & 2 THROUGH POSTMAN and then Login in the front end through localhost:3000
with the newly formed HR Member 

ROUTES ARE IN THIS ORDER
1.HR
2.HOD
3.COURSE INSTRUCTOR
3.COURSE COORDINATOR
4.ACADEMIC MEMBER





ALL OF THE ROUTES UNDER TILL THE END ARE IN THE BACKEND

///////////////////////////////////SEED THE DATABASE//////////////////////////////////////

NOTE:Seed it first with a location and then add an HR to it

1.
Functionality: register a single and first hr to the system (NEEDED)(hr ONLY)
Route: localhost:5000/addStaffMember/SEEDING
Request type: POST
Request body: { 
	"id": "hr",
	"name": "amr",
	"email": "ac110@gmail.com",
	"salary": 10010,
	"staffType": "hr",
	"DayOff" : "Thursday",
	"locationName": "C7100"
 }
2.
Functionality: register a single location
Route: localhost:5000/Location/addLocation/SEEDING
Request type: POST
Request body: { 
	"name": "C7100",
	"locType": "Office",
	"capacityCounter": "8"
 }

////////////////////////////////////////////HR FUNCTIONS//////////////////////////////////////




.///////////location//////////
NEW ROUTE:
Functionality: Get all the locations
Route: localhost:5000/Location
Request type: GET
Request header: Token of HOD
Response:{ 
	All the locations are printed out
}





1. Functionality: register a single location
Route: localhost:5000/Location/addLocation
Request header: Token of HR
Request type: POST
Request body: { 
	"name": "C7100",
	"locType": "Office",
	"capacityCounter": "8"
 }

2.
Functionality: Update a location Name
Route: localhost:5000/Location/:name/updateLocation/changeName
Example:localhost:5000/Location/C7100/updateLocation/changeName
Request header: Token of HR
Request type: PUT
Parameters (:name=LocationName)
Request body: { 
	"newName": "C7105"
 }


3.	
Functionality: Update a location capacity
Route: localhost:5000/Location/:name/updateLocation/changeCapacity
Example:localhost:5000/Location/C7105/updateLocation/changeCapacity
Request Header: Token of HR
Request type: PUT
Parameters (:name=LocationName)
Request body: { 
	"capacityCounter": 15
	
 }





4.	
Functionality: Update a location by a removing a single staff member 
Route: localhost:5000/Location/:name/updateLocation/removeStaffMember
Example:localhost:5000/Location/C7105/updateLocation/removeStaffMember
Request Header: Token of HR
Request type: PUT
Parameters (:name=LocationName)
Request body: { 
	"email": "hr1@gmail.com"
	
 }



5.
Functionality: Update a location by a adding a single staff member to this location
Route: localhost:5000/Location/:name/updateLocation/addStaffMemberToLocation
Example:localhost:5000/Location/C7105/updateLocation/addStaffMemberToLocation
Request Header: Token of HR
Request type: PUT
Parameters (:name=LocationName)
Request body: { 
	"email": "hr1@gmail.com"
	
 }



6.
Functionality: Delete a whole location and set corresponding staff if in it to no location
Route: localhost:5000/Location/:name/deleteLocation
Example:localhost:5000/Location/C7105/deleteLocation
Request Header: Token of HR
Request type: DELETE
Parameters (:name=LocationName)






//////////faculties//////////
NEW ROUTE:
Functionality: Get All faculties in the system
Route: localhost:5000/Faculty
Request type: GET
Request header: Token of HOD
Response:{ 
	All the Faculties are printed Out
}



7.
Functionality: Insert a faculty
Route: localhost:5000/Faculty/addFaculty
Request type: POST
Request Header: Token of HR
Request body: { 
	"name":"Engineering"
	
 }
Header token of HR

8.
Functionality: Edit a faculty Name
Route: localhost:5000/Faculty/:facultyName/editFaculty 
Example:localhost:5000/Faculty/Engineering/editFaculty
Request type: PUT
Request Parameters (:facultyName)
Request Body: { 
	"name":"Production"
	
 }
Header token of HR

9.
Functionality: Delete A Faculty
Route: localhost:5000/Faculty/:facultyName/deleteFaculty
Example:localhost:5000/Faculty/Engineering/deleteFaculty
Request Parameters (:facultyName)
Request type: DELETE
Header token of HR


///////////Departments////////////
NEW ROUTE:
Functionality: Get All Departments in the system
Route: localhost:5000/Faculty/:facultyName/Departments
Request type: GET
Request header: Token of HOD
Response:{ 
	All the Departments are printed Out
}

10.
Functionality: Create a new department
Route: localhost:5000/Faculty/:facultyName/Departments/createDepartment
Example:localhost:5000/Faculty/Engineering/Departments/createDepartment
Request Parameters (:facultyName)
Request type: POST
Request body: { 
	"name":"MET"
	
 }
Header token of HR

11.
Functionality: Change Department name
Route: localhost:5000/Faculty/:facultyName/Departments/:departmentName/updateDepartmentName
Example:localhost:5000/Faculty/Engineering/Departments/MET/updateDepartmentName
Request Parameters (:facultyName , :departmentName)
Request type: PUT
Request body: { 
	"name":"IET"
	
 }
Header token of HR

12.
Functionality: Remove a department from a faculty but keep it in the database
Route: localhost:5000/Faculty/:facultyName/Departments/:departmentName/deleteDepartmentfromFaculty
Example:localhost:5000/Faculty/Engineering/Departments/IET/deleteDepartmentfromFaculty
Request Parameters (:facultyName , :departmentName)
Request type: DELETE
Header token of HR

13.
Functionality: Adds a department that is not without a faculty
Route: localhost:5000/Faculty/:facultyName/Departments/addDepartmentToFaculty
Example: localhost:5000/Faculty/Engineering/Departments/addDepartmentToFaculty
Request header: Token of HR
Request Parameters (:facultyName)
Request type: PUT
Request body: { 
	"name":"IET"
	
 }


////////courses/////////
NEW ROUTE:
Functionality: Get All Departments in the system
Route: localhost:5000/Departments/:departmentName/Courses	
Request type: GET
Request header: Token of HOD
Response:{ 
	All the courses are printed Out
}
14.
Functionality: Adds a course to specified department
Route: localhost:5000/Departments/:departmentName/addCourse
Example: localhost:5000/Departments/MET/addCourse
Request header: Token of HR
Request type: POST
Request body: { 
	"name":"CSEN501"	
 }


15.
Functionality: Deletes a course under a department but keeps it in database
Route: localhost:5000/Departments/:departmentName/Courses/:courseName/deleteCourse
Example: localhost:5000/Departments/MET/Courses/CSEN501/deleteCourse
Request header: Token of HR
Request Parameters (:departmentName,:courseName )
Request type: DELETE




16.
Functionality: Changes a name of a course 
Route: localhost:5000/Departments/:departmentName/Courses/:courseName/editCourseName
Example: localhost:5000/Departments/MET/Courses/CSEN501/editCourseName
Request header: Token of HR
Request Parameters (:departmentName,:courseName)
Request type: PUT
Request body: { 
	"name":"CSEN502"	
 }
17.
Functionality: Adds an existing course without a department to a department
Route: localhost:5000/Departments/:departmentName/Courses/addCourseToDepartment
Example: localhost:5000/Departments/MET/Courses/addCourseToDepartment
Request header: Token of HR
Request Parameters (:departmentName)
Request type: POST
Request body: { 
	"name":"CSEN502"	
 }
////////rest of HR///////////
18.
Functionality: Insert a staff member to a system with location
Route: localhost:5000/addStaffMember
Request type: POST
Request header: Token of HR
NOTE!: staffType can be any of the following: ("hod", "ci","ac") 
Request body: { 
	
	"name": "amr",
	"email": "hod1@gmail.com",
	"salary": 10010,
	"staffType": "hod",  
	"DayOff" : "Thursday",
	"locationName": "C7100"
 }


19.
Functionality: Update a staff member's details
Route: localhost:5000/updateStaff
Request type: PUT
Request header: Token of HR
NOTE!: staffType can be any of the following: ("hod", "ci","ac") and locationName and StaffType are required here
Request body: { 
	"userToUpdate": "hod1@gmail.com",
	"name": "Sohail Ahmed",
	"newEmail": "ac1@gmail.com",
	"salary": 10010,
	"staffType": "hod",  
	"DayOff" : "Thursday",
	"locationName": "C7105"  
 }


20.
Functionality: Remove a staff member
Route: localhost:5000/removeStaffMember
Request type: POST
Request header: Token of HR
NOTE!: staffType can be any of the following: ("hod", "ci","ac") and locationName and StaffType are required here
Request body: { 
	"email": "ac1@gmail.com",
	  
 }

20.
Functionality: Change a salary of a  staff member
Route: localhost:5000/changeSalary
Request type: PUT
Request header: Token of HR	
Request body:{ 
	"email": "hod1@gmail.com",
	"salary": 123123
}
////////DO FROM HERE////////
21:
Functionality: Assigns an unassigned HOD to be a head of department
Route: localhost:5000/Departments/MET/assignHOD
Request type: POST
Request header: Token of HOD	
Request body:{ 
	"email": "hod1@gmail.com"
}


////////////////////////////////////////HOD//////////////////////////////////
NEW ROUTE:
Functionality: Get Faculty HOD is in 
Route: localhost:5000/HOD/Faculty	
Request type: GET
Request header: Token of HOD
Response:{ 
	HOD's faculty is printed out
}


NEW ROUTE:
Functionality: Get Department HOD is in 
Route: localhost:5000/HOD/Faculty/:facultyName/Department
Example: localhost:5000/HOD/Faculty/Engineering/Department	
Request type: GET
Request header: Token of HOD
Response:{ 
	HOD's department is printed out
}



NEW ROUTE:
Functionality: Get courses HOD has
Route: localhost:5000/HOD/Faculty/:facultyName/Department/:departmentName/Courses
Example: localhost:5000/HOD/Faculty/Engineering/Department/MET/Courses	
Request type: GET
Request header: Token of HOD
Response:{ 
	HOD's courses are printed out
}

22:
Functionality: Assigns an unassigned existing Course Instructor to be course instructor of your department
NOTE://Add a CI through addStaffMember in HR	
Route: localhost:5000/HOD/Faculty/:facultyName/Department/:departmentName/Courses/:courseName/assignCourseInstructor
Example:localhost:5000/HOD/Faculty/Engineering/Department/MET/Courses/CSEN501/assignCourseInstructor
Request type: POST
Request header: Token of HOD
Request body:{ 
	"email": "ci1@gmail.com"
}

23:
Functionality: Removes Course Instructor from your department
Route: localhost:5000/HOD/Faculty/:facultyName/Department/:departmentName/Courses/:courseName/deleteCourseInstructor
Example:localhost:5000/HOD/Faculty/Engineering/Department/MET/Courses/CSEN501/deleteCourseInstructor
Request type: POST
Request header: Token of HOD
Request body:{ 
	"email": "ci1@gmail.com"
}


24:
Functionality: Get the staff in your department
Route: localhost:5000/getStaffInDepartment
Request type: GET
Request header: Token of HOD
Response:{ 
	All the staff in your department with their details in pretty format
}
25:
Functionality: Get staff in a specific course in your department
Route: localhost:5000/:courseName/getStaffInCourse
Example:localhost:5000/CSEN502/getStaffInCourse
Request type: GET
Request header: Token of HOD
Response:{ 
	All the staff in this course in pretty format
}
26.
Functionality: VIEW PENDING REQUESTS
Route: localhost:5000/viewDayOffRequests
Example:localhost:5000/viewDayOffRequests
Request type: GET
Request header: Token of HOD
Response:{ 
	 Requests that are pending in a pretty format
}
27:
Functionality: ACCEPT A DAY OFF REQUEST OF AN ACADEMIC MEMBER WHO SENT YOU A REQUEST
Route: localhost:5000/acceptDayOffRequest
Example:localhost:5000/acceptDayOffRequest
Request type: POST
Request header: Token of HOD
Request body:{ 
	"email": "ac1@gmail.com"
}
28:
Functionality: REJECT A DAY OFF REQUEST OF AN ACADEMIC MEMBER WHO SENT YOU A REQUEST //////////de m5lstsch finish it
Route: localhost:5000/rejectDayOffRequest
Example:localhost:5000/acceptDayOffRequest
Request type: POST
Request header: Token of HOD
Request body:{ 
	"email": "ac1@gmail.com"
}
29.
Functionality: Get dayoff of all staff in your department
Route: localhost:5000/getDayOffOfAllStaff
Example:localhost:5000/getDayOffOfAllStaff
Request type: GET
Request header: Token of HOD
Response:{ 
	All the staff in this course in pretty format
}

30.
Functionality: Get dayoff of a single staff in your department
Route: localhost:5000/getDayOff/:email
Example:localhost:5000/getDayOff/ac1@gmail.com
Request type: GET
Request header: Token of HOD
Response:{ 
	DayOff of ac1@gmail.com staff in this course in pretty format
}
31.
Functionality: Get dayoff of a single staff in your department
Route: localhost:5000/:courseName/courseCoverageHOD
Example:localhost:300/CSEN502/courseCoverageHOD
Request type: GET
Request header: Token of HOD
Response:{ 
	50% course coverage of course CSEN502 for ex:in pretty format
}


32:
Functionality: Get the all the staff that teach all the slots in all your courses
Route: localhost:5000/getTeachingAssignments
Example:localhost:300/getTeachingAssignments
Request type: GET
Request header: Token of HOD
Response:{ 
	all the staff that teach all the slots in all your courses in pretty format
}



//////////////////////////////////CI//////////////////////////////////
NEW ROUTE:
Functionality: Get faculty CI is in
Route: localhost:5000/CI/Faculty
Example: localhost:5000/CI/Faculty
Request type: GET
Request header: Token of CI
Response:{ 
	CIs faculty is printed out
}
NEW ROUTE:
Functionality: Get department CI is in
Route: localhost:5000/CI/Faculty/:facultyName/Department
Example: localhost:5000/CI/Faculty/Engineering/Department
Request type: GET
Request header: Token of CI
Response:{ 
	CI's department is printed out
}





NEW ROUTE:
Functionality: Get courses CI has
Route: localhost:5000/CI/Faculty/:facultyName/Department/:departmentName/Courses
Example: localhost:5000/CI/Faculty/Engineering/Department/MET/Courses	
Request type: GET
Request header: Token of CI
Response:{ 
	CI's courses are printed out
}






33:
Functionality: Get a course coverage percentage of your course/courses
Route: localhost:5000/:courseName/courseCoverageCI
Example:localhost:300/CSEN502/courseCoverageCI
Request type: GET
Request header: Token of CI
Response:{ 
	50% course coverage of course CSEN502 for example, in pretty format
}

34:
Functionality: Assigns you the course instructor to this specified slot
Route: localhost:5000/assignYourSelfToThisSlot
Example: localhost:5000/assignYourSelfToThisSlot
Request header: Token of CI
Request type: POST
Request body: {
	"locationName":"C3105",
	"name":"Slot5",
	"course":"CSEN503",
	"day":"Wednesday",
	"time":"8:15"
}
35:
Functionality: View the slots you are assigned to
Route: localhost:5000/viewSlotsAssignment
Example:localhost:5000/viewSlotsAssignment
Request type: GET
Request header: Token of CI
Response:{ 
	View the slots you are assigned to for example
	"locationName":"C3105",
	"name":"Slot5",
	"course":"CSEN503",
	"day":"Wednesday",
	"time":"8:15" 
	in pretty format
}

36:
Functionality: Get the staff in your department
Route: localhost:5000/getStaffInDepartment2
Request type: GET
Request header: Token of CI
Response:{ 
	All the staff in your department with their details in pretty format
}

37:
Functionality: Get the staff in this course
Route: localhost:5000/:courseName/getStaffInCourse2
Example: localhost:5000/CSEN502/getStaffInCourse2
Request type: GET
Request header: Token of CI
Response:{ 
	All the staff that belong to this course  in pretty format
}

38:
Functionality: Assigns an academic member to this specified slot
Route: localhost:5000/:facultyName/assignAcademicMemberToSlot
Example: localhost:5000/Engineering/assignAcademicMemberToSlot
Request header: Token of CI
Request type: POST
Request body: {
	"email":"ac1@gmail.com"
	"locationName":"C3105",
	"name":"Slot5",
	"course":"CSEN503",
	"day":"Wednesday",
	"time":"8:15"
}
39:
Functionality: Assigns an academic member to your course
Route: localhost:5000/:facultyName/:courseName/assignAcademicMemberToCourse
Example: localhost:5000/Engineering/CSEN502/assignAcademicMemberToCourse
Request header: Token of CI
Request type: POST
Request body: {
	"email":"ac1@gmail.com"
	
}

40:
Functionality: deletes assignment of academic member of your course
Route: localhost:5000/:facultyName/:courseName/deleteAcademicMemberFromCourse
Example: localhost:5000/Engineering/CSEN502/deleteAcademicMemberFromCourse
Request header: Token of CI
Request type: POST
Request body: {
	"email":"ac1@gmail.com"
		
}


41:
Functionality: Assign an academic member to be the course coordinator
Route: localhost:5000/:facultyName/:courseName/assignCourseCoordinatorToCourse
Example: localhost:5000/Engineering/CSEN502/assignCourseCoordinatorToCourse
Request header: Token of CI
Request type: POST
Request body: {
	"email":"ac1@gmail.com"
		
}
/////////////////////COO//////////////////////to use them sign in with the academic member that was changed
42:
Functionality: Create a new course slot to your course
Route: localhost:5000/createCourseSlot
Example: localhost:5000/createCourseSlot
Request header: Token of coo
Request type: POST
Request body: {
	
	"name": "Slothaha",
	"day": "Wednesday",
	"time": "8:15",
	"locationName": "C3105",
	"course": "CSEN501"	
}
43:
Functionality: Create a new course slot to your course
Route: localhost:5000/deleteCourseSlot
Example: localhost:5000/deleteCourseSlot
Request header: Token of newly assigned coo
Request type: POST
Request body: {
	
	"name": "Slothaha",
	"day": "Wednesday",
	"time": "8:15",
	"locationName": "C3105",
	"course": "CSEN501"	
}
44:
Functionality: VIEW PENDING REQUESTS
Route: localhost:5000/viewSlotLinkingRequests
Example:localhost:5000/viewSlotLinkingRequests
Request type: GET
Request header: Token of newly assigned coo
Response:{ 
	 Requests that are pending in a pretty format
}

45.

Functionality: Accept a slot linking request of a specific user who sent you this request its then added to his schedule
Route: localhost:5000/acceptSlotLinkingRequests
Example:localhost:5000/acceptSlotLinkingRequests
Request type: POST
Request header: Token of newly assigned coo
Request body: {
	 "email": "ac2@gmail.com"
}
46.
Functionality: Reject a slot linking request of a specific user who sent you this request its then updated to rejected
Route:localhost:5000/rejectSlotLinkingRequests
Example:localhost:5000/rejectSlotLinkingRequests
Request type: POST
Request header: Token of newly assigned coo
Request body: {
	 "email": "ac2@gmail.com"
}
//////////////////////////ACADEMIC MEMBER////////////////////////////////
47.
Functionality: View your schedule
Route: localhost:5000/viewSchedule
Example:localhost:5000/viewSchedule
Request type: GET
Request header: Token of ac
Response:{ 
	Your schedule with all the slots in detail 
}

48.
Functionality: Submit a dayoff request that is sent to HOD
Route:localhost:5000/submitDayOffRequest
Example:localhost:5000/submitDayOffRequest
Request type: POST
Request header: Token of ac
Request body: {
	"type":"DayOff",
	"newDayOff": "Sunday",
	"reason": "I want to change to this day Please"

}

49.
Functionality: View unassigned slots in your course for you to submit a slot linking request to them if need be
Route: localhost:5000/viewUnAssignedSlotsForYourCourse
Example:localhost:5000/viewUnAssignedSlotsForYourCourse
Request type: GET
Request header: Token of ac
Response:{ 
	Your schedule with all the slots in detail 
}

50.
Functionality: Submit a slot linking request that is sent to COO
Route:localhost:5000/submitSlotLinkingRequest
Example:localhost:5000/submitSlotLinkingRequest
Request type: POST
Request header: Token of ac
Request body: {
 "status": "UnassignedToAnyTA",
  "name": "Slot5",
  "day": "Wednesday",
  "time": "8:15",
  "location": "C3105",
  "course": "MET"
                  
}
51.
Functionality: View all requests that you sent
Route: localhost:5000/viewAllRequests
Example:localhost:5000/viewAllRequests
Request type: GET
Request header: Token of ac
Response:{ 
	View all your requests of all statuses
}
52
Functionality: View all requests
Route: localhost:5000/viewAcceptedRequests
Example:localhost:5000/viewAcceptedRequests
Request type: GET
Request header: Token of ac
Response:{ 
	View all your requests of all accepted statuses
}

53.
Functionality: View pending requests
Route: localhost:5000/viewPendingRequests
Example:localhost:5000/viewPendingRequests
Request type: GET
Request header: Token of ac
Response:{ 
	View all your requests that are of status pending
}
54.
Functionality: View rejected requests
Route: localhost:5000/viewRejectedRequests
Example:localhost:5000/viewRejectedRequests
Request type: GET
Request header: Token of ac
Response:{ 
	View all your requests that are of status "rejected"
}

////////////////////////////////////STAFF MEMBER/////////////////////////////////////////
55.
Functionality: Login to the system
Route:localhost:5000/login
Example:localhost:5000/login
Request type: POST
Request header: Token of any staff member
Request body: {
 "email":"hod1@gmail.com"
 "password":"123456"
                  
}
56.
Functionality: sign in to the system
Route:localhost:5000/signIn
Example:localhost:5000/signIn
Request type: GET
Request header: Token of any staff member
Response{

Simulates a sign in to the system where it will count accumulating time
}
                  
57.
Functionality: sign in to the system
Route:localhost:5000/signOut
Example:localhost:5000/signOut
Request type: GET
Request header: Token of any staff member
Response{

Simulates a sign out to the system where it will stop counting accumulating time
}


58.
Functionality: sign in to the system
Route:localhost:5000/profile
Example:localhost:5000/profile
Request type: GET
Request header: Token of any staff member
Response{

Shows you your profile
}

59.
Functionality: Reset your password to 123456
Route:localhost:5000/resetPassword
Example:localhost:5000/resetPassword
Request type: GET
Request header: Token of any staff member
Response{
resets password
}



