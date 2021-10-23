import React from "react";

const Total = ({ course }) => {
  console.log(course.parts);
  return (
    <>
      <li>
        <strong>
          Total of exercises{" "}
          {course.parts.map((a) => a.exercises).reduce((a, b) => a + b, 0)}
        </strong>
      </li>
    </>
  );
};

const Content = ({ course }) => {
  return (
    <>
      <ul>
        {course.parts.map((p) => (
          <Part key={p.id} part={p.name} exercises={p.exercises} />
        ))}
        <Total course={course} />
      </ul>
    </>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = (props) => {
  return (
    <>
      <li key={props.id}>
        {props.part} {props.exercises}
      </li>
    </>
  );
};

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content course={course} />
          </div>
        );
      })}
    </>
  );
};

export default Courses;