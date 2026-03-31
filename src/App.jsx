//import "./App.css";
//import Parent from "./Parent";
//import Map from "./Component/Map"
//import Studentcard from "./Studentcard";
import RegistrationForm from "./Component/Registration form";
import Stopwatch from "./Component/Stopwatch";

/*export default function App() {
  const students=[
{id: "EHC001", name:"Jeevitha", Course:"Data Analytics", isActive:true},
{id: "EHC002", name:"Gokul", Course:"Back-End Developer", isActive:true},
{id: "EHC003", name:"Deepu", Course:"Front-End Developer", isActive:false},
{id: "EHC004", name:"Akash", Course:"Software Tester", isActive:true},
{id: "EHC005", name:"Kannan", Course:"Software Engineer", isActive:false},
  ];
  
  return (
    <div className="container">
      <h1>🎓 Student Dashboard</h1>
      <p className="count">Total Students: {students.length}</p>

      <div className="card-container">
        {students.map((student) => (
          <Studentcard key={student.id} student={student} />
        ))}
    
    </div>
    </div>
  );
}*/

export default function App() {
  return (
    <div>
   <Stopwatch />
    </div>
  );
}


