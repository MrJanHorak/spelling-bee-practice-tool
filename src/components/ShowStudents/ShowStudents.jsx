import React from "react";
import "../../styles/ShowStudent.css";

const ShowStudents = ({ user }) =>
{
  console.log('in show student: ', user)

  const students = user.students.map(student =>{
    return(
      <div className="student-container" key={student._id}>
                      <img
                  id="student-profile-pic"
                  alt="profile pictue"
                  src={student.avatar}
                />
      <span className="student-name">{student.name}</span>
      {student.grade}
      </div>

    )
  })
  return (
    <>
    List students here
    <div>
    {students}
    </div>
    </>
  )
}

export default ShowStudents