import './App.css';

const Total = ({course}) => {
  console.log(course.parts)
  return (
    <>
      <li><strong>
        Total of exercises{" "}
        {course.parts.map((a) => a.exercises).reduce((a, b) => a + b, 0)}
      </strong>
      </li>
    </>
  );
};

const Content = ({course}) => {
  return (
    <>
      <ul>
      {course.parts.map((p) => <Part key={p.id} part={p.name} exercises={p.exercises}/>)}        
      <Total course={course} />
      </ul>
    </>
  );
};

const Header = ({name}) => {
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

const Courses = ({courses}) =>{
  return(
    <>
    {courses.map(course => {
      return(
        <div key={course.id}>
        <Header name={course.name} />
        <Content course={course} />
        </div>
    )})
    }
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
