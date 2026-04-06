//import "./App.css";
//import Parent from "./Parent";
//import Map from "./Component/Map"
//import Studentcard from "./Studentcard";
import RegistrationForm from "./Component/Registration form";
import Stopwatch from "./Component/Stopwatch";
import API from "./Component/API";
//import Minichatapp from "./Component/Minichatapp";
 import React, { useState } from "react";
import { ThemeContext } from "./Component/ThemeContext";
import Profile from "./Component/Profile";



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
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

const appStyle = {
  textAlign: "center",
  padding: "40px 20px",
  minHeight: "100vh",
  transition: "0.3s",
  background:
    theme === "light"
      ? "linear-gradient(to right, #e3f2fd, #fce4ec)"
      : "linear-gradient(to right, #1e1e2f, #121212)",
  color: theme === "light" ? "#000" : "#faf5f5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "20px",
  color: theme === "light" ? "#d32f2f" : "#ff6b6b", 
};

const buttonStyle = {
  padding: "10px 20px",
  marginBottom: "50px",
  border: "none",
  background: "linear-gradient(45deg, #4caf50, #2e7d32)",
  color: theme === "light" ? "#fff" : "#fff",
  borderRadius: "25px",
  cursor: "pointer",
};

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={appStyle}>
        <h1 style={{ color: theme === "light" ? "red" : "#ff6b6b" }}>
          Profile Upload & Theme Change</h1>

        <button onClick={toggleTheme} style={buttonStyle}>
          Toggle Theme
        </button>

        <Profile />
      </div>
    </ThemeContext.Provider>
  );
}
  



