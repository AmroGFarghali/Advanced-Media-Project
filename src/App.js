import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/login.component";
import Loginn from "./components/loginn.component";

///////////////////////////HR IMPORTS////////////////////////////////////////////
import AddStaffMember from "./components/HR/add-staff-member-seeding.component";
import Faculties from "./components/HR/faculties.component.js";
import addFaculty from "./components/HR/addFaculty.component.js";
import editFaculty from "./components/HR/editFacultyName.component";

import Departments from "./components/HR/departments.component";
import createDepartment from "./components/HR/createDepartment.component.js";
import editDepartment from "./components/HR/editDepartmentName.component";

import Courses from "./components/HR/courses.component";
import addCourse from "./components/HR/createCourse.component";
import editCourse from "./components/HR/editCourseName.component";





////////////////////////HOD IMPORTS//////////////////////////////////////////////////////
import FacultyHOD from "./components/HOD/facultyHOD.component.js";
import DepartmentHOD from "./components/HOD/departmentHOD.component.js";
import CoursesHOD from "./components/HOD/coursesHOD.component.js";
import StaffInDepartmentHOD from "./components/HOD/getStaffInDepartmentHOD.component.js";
import StaffInCourseHOD from "./components/HOD/getStaffInCourseHOD.component.js";

import ViewDayOffRequests from "./components/HOD/requests/viewDayOffRequests.component.js";
import AcceptDayOffRequest from "./components/HOD/requests/acceptDayOffRequest.component.js";
import getDayOffOfAllStaff from "./components/HOD/getDayOffOfAllStaff.component.js";

import FacultyCI from "./components/CI/facultyCI.component.js";
import DepartmentCI from "./components/CI/departmentCI.component.js";
import CoursesCI from "./components/CI/coursesCI.component.js";
import StaffInDepartmentCI from "./components/CI/getStaffInDepartmentCI.component.js";
import StaffInCourseCI from "./components/CI/getStaffInCourseCI.component.js";
import ViewSlotsAssignment from "./components/CI/viewSlotsAssignment.component.js";
import AssignAcademicMemberToSlot from "./components/CI/assignAcademicMemberToASlot.component.js";
import AssignAcademicMemberToCourse from "./components/CI/assignAcademicMemberToCourse.component.js";
import DeleteAcademicMemberFromCourse from "./components/CI/deleteAcademicMemberFromCourse.component.js";
import AssignCourseCoordinatorToCourse from "./components/CI/assignCourseCoordinatorToCourse.component.js";
///////coo//////
import ViewSlotLinkingRequests from "./components/COO/viewSlotLinkingRequests.component.js";
import AcceptSlotLinkingRequest from "./components/COO/acceptSlotLinkingRequests.component.js";
import RejectSlotLinkingRequest from "./components/COO/rejectSlotLinkingRequests.component.js";
import CreateCourseSlot from "./components/COO/createCourseSlot.component.js";
import DeleteCourseSlot from "./components/COO/deleteCourseSlot.component.js";
////////AC///////
import acHomePage from "./components/AC/homePage.component.js";

import viewSchedule from "./components/AC/viewSchedule.component.js";
import submitSlotLinkingRequest from "./components/AC/submitSlotLinkingRequest.component.js";
import submitDayOffRequest from "./components/AC/submitDayOffRequest.component.js";
import viewAllRequests from "./components/AC/viewAllRequests.component.js";
import viewAcceptedRequests from "./components/AC/viewAcceptedRequests.component.js";
import viewRejectedRequests from "./components/AC/viewRejectedRequests.component.js";
import viewPendingRequests from "./components/AC/viewPendingRequests.component.js";



import Navbar from "./components/HR/NavbarHR.js"




function App() {
  return (
    

    <Router>
        <Route path="/" exact component={Loginn} />
        <div>
     {/* <Navbar/> */}
     {/* ////////////////HR/////////////////////// */}
     <Route path="/Faculty" exact component={Faculties} />
      <Route path="/Faculty/addFaculty" exact component={addFaculty} />
      <Route path="/Faculty/:facultyName/editfaculty" exact component={editFaculty} />

     <Route path="/Faculty/:facultyName/Departments" exact component={Departments} />
      <Route path="/Faculty/:facultyName/Departments/createDepartment" exact component={createDepartment} />
      <Route path="/Faculty/:facultyName/Departments/:departmentName/updateDepartmentName" exact component={editDepartment} />

      <Route path="/Departments/:departmentName/Courses" exact component={Courses} />
      <Route path="/Departments/:departmentName/Courses/addCourse" exact component={addCourse} />
      <Route path="/Departments/:departmentName/Courses/:courseName/editCourseName" exact component={editCourse} />

      <Route path="/addstaffmember" exact component={AddStaffMember} />
     



        {/* ////////////////HOD/////////////////////// */}
      <Route path="/HOD/Faculty" exact component={FacultyHOD} />
      <Route path="/HOD/Faculty/:facultyName/Department" exact component={DepartmentHOD} />
      <Route path="/HOD/Faculty/:facultyName/Department/:departmentName/Courses" exact component={CoursesHOD} />
      <Route path="/getStaffInDepartment" exact component={StaffInDepartmentHOD} />
      <Route path="/:courseName/getStaffInCourse" exact component={StaffInCourseHOD} />
      <Route path="/viewDayOffRequests" exact component={ViewDayOffRequests} />
      <Route path="/acceptDayOffRequest" exact component={AcceptDayOffRequest} />
      <Route path="/getDayOffOfAllStaff" exact component={getDayOffOfAllStaff} />


        {/* ////////////////CI/////////////////////// */}
        <Route path="/CI/Faculty" exact component={FacultyCI} />
      <Route path="/CI/Faculty/:facultyName/Department" exact component={DepartmentCI} />
      <Route path="/CI/Faculty/:facultyName/Department/:departmentName/Courses" exact component={CoursesCI} />
      <Route path="/:courseName/getStaffInCourse2" exact component={StaffInCourseCI} />
      <Route path="/getStaffInDepartment2" exact component={StaffInDepartmentCI} />
      <Route path="/:courseName/viewSlotsAssignment" exact component={ViewSlotsAssignment} />
      <Route path="/assignAcademicMemberToSlot" exact component={AssignAcademicMemberToSlot} />
      <Route path="/:facultyName/:courseName/assignAcademicMemberToCourse" exact component={AssignAcademicMemberToCourse} />
      <Route path="/:facultyName/:courseName/deleteAcademicMemberFromCourse" exact component={DeleteAcademicMemberFromCourse} />
      <Route path="/:courseName/assignCourseCoordinatorToCourse" exact component={AssignCourseCoordinatorToCourse} />

      {/* ////////////////COO/////////////////////// */}
      <Route path="/viewSlotLinkingRequests" exact component={ViewSlotLinkingRequests} />
      <Route path="/acceptSlotLinkingRequests" exact component={AcceptSlotLinkingRequest} />
      <Route path="/rejectSlotLinkingRequests" exact component={RejectSlotLinkingRequest} />
      <Route path="/createCourseSlot" exact component={CreateCourseSlot} />
      <Route path="/deleteCourseSlot" exact component={DeleteCourseSlot} />
     {/* ////////////////AC/////////////////////// */}
     <Route path="/AC/Home" exact component={acHomePage} />
     <Route path="/viewSchedule" exact component={viewSchedule} />
     <Route path="/submitSlotLinkingRequest" exact component={submitSlotLinkingRequest} />
     <Route path="/submitDayOffRequest" exact component={submitDayOffRequest} />
     <Route path="/viewAllRequests" exact component={viewAllRequests} />
     <Route path="/viewAcceptedRequests" exact component={viewAcceptedRequests} />
     <Route path="/viewRejectedRequests" exact component={viewRejectedRequests} />
     <Route path="/viewPendingRequests" exact component={viewPendingRequests} />

      
      </div>
    </Router>
  );
}

export default App;
