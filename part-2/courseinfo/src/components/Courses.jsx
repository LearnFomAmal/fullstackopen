
 function Course({ courses }) {
   
   let total = courses.parts.reduce((sum,part) => sum + part.exercises, 0)
  return (
    <div>
     <Header name={courses.name} />
    <Content>
    {courses.parts.map(part => <Part key={part.id} part={part} total={total} />)} 
      <h3>Total of exercises: {total}</h3>
    </Content>
    </div>
  )
}

function Header({ name }) {
  return (
    <h1>{name}</h1>
  )
}

function Content({ children }) {
   return (
     <div>
       {children}
     </div>
   )
}

function Part({ part, total }) {

  return (
    <div>
   <p>{part.name} {part.exercises}</p>
  
    </div>
   
  )
}

export default Course;
