import './App.css';

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.course.parts[0].exercises +
          props.course.parts[1].exercises +
          props.course.parts[2].exercises}
      </p>
    </>
  );
};

const Content = ({course}) => {
  return (
    <>
      <ul>
      {course.parts.map((p) => <Part key={p.id} part={p.name} exercises={p.exercises}/>)}        
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

const Course = ({course}) =>{
  return(
    <>
    <Header name={course.name} />
    <Content course={course} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
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
    ],
  };

  return <Course course={course} />;
};

export default App;
