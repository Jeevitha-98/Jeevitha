//import "./App.css";
//import Parent from "./Parent";
//import Map from "./Component/Map"
//import Studentcard from "./Studentcard";
//import RegistrationForm from "./Component/Registration form";
//import Stopwatch from "./Component/Stopwatch";
//import API from "./Component/API";
//import Minichatapp from "./Component/Minichatapp";
// import React, { useState } from "react";
//import { ThemeContext } from "./Component/ThemeContext";
//import Profile from "./Component/Profile";





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
/*
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
  */


//import UseReducerForm from "./Component/UseReducerForm";
//import XOGame from "./Component/XOGame";*/



/*
import React from "react";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";



const Home = () => <h2 style={styles.text}>🏠 Welcome to Home Page</h2>;
const About = () => <h2 style={styles.text}>ℹ️ About Us Page</h2>;
const Contact = () => <h2 style={styles.text}>📞 Contact Page</h2>;
const Profile = () => <h2 style={styles.text}>👤 User Profile Page</h2>;


const Services = () => {
  return (
    <div>
      <h2 style={styles.sectionTitle}>🛠 Services</h2>

      <div style={styles.subNav}>
        <Link to="web" style={styles.subLink}>Web</Link>
        <Link to="app" style={styles.subLink}>App</Link>
        <Link to="uiux" style={styles.subLink}>UI/UX</Link>
      </div>

      <Outlet />
    </div>
  );
};

const Web = () => <h3 style={styles.text}>🌐 Web Development</h3>;
const AppDev = () => <h3 style={styles.text}>📱 App Development</h3>;
const UIUX = () => <h3 style={styles.text}>🎨 UI/UX Design</h3>;



export default function App() {
  return (
    <Router>
      <div style={styles.container}>
        
       
        <h1 style={styles.title}>React Routing Task</h1>

       
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/services" style={styles.link}>Services</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
        </nav>

        <div style={styles.card}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />}>
              <Route index element={<h3 style={styles.text}>Select a service 👇</h3>} />
              <Route path="web" element={<Web />} />
              <Route path="app" element={<AppDev />} />
              <Route path="uiux" element={<UIUX />} />
            </Route>

            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}



const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    textAlign: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    color: "#fff",
    marginBottom: "25px",
    fontSize: "32px",
    fontWeight: "bold",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  link: {
    textDecoration: "none",
    padding: "10px 18px",
    background: "#ffffff",
    color: "#333",
    borderRadius: "25px",
    fontWeight: "600",
    transition: "0.3s",
  },

  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "30px",
    borderRadius: "15px",
    maxWidth: "700px",
    margin: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },

  text: {
    color: "#333",
  },

  sectionTitle: {
    marginBottom: "15px",
    color: "#444",
  },

  subNav: {
    marginBottom: "15px",
  },

  subLink: {
    margin: "0 10px",
    padding: "6px 12px",
    background: "#667eea",
    color: "#fff",
    borderRadius: "15px",
    textDecoration: "none",
    fontSize: "14px",
  },
};
*/

import React, { useEffect, useState } from "react";


function UserDetails({ user }) {
  return (
    <div>
      <h2>User Details</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Website:</b> {user.website}</p>

      <h3>Address</h3>
      <p>{user.address.street}</p>
      <p>{user.address.suite}</p>
      <p>{user.address.city}</p>
      <p>{user.address.zipcode}</p>
    </div>
  );
}


export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
    
      <div style={styles.list}>
        <h2>Users</h2>
        {users.map((user) => (
          <p
            key={user.id}
            style={styles.userItem}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </p>
        ))}
      </div>

    
      <div style={styles.details}>
        {selectedUser ? (
          <UserDetails user={selectedUser} />
        ) : (
          <p>Select a user to see details</p>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "Arial",
  },

  list: {
    width: "35%",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },

  userItem: {
    padding: "12px",
    borderBottom: "1px solid #334155",
    cursor: "pointer",
    transition: "0.3s",
  },

  userItemHover: {
    background: "#334155",
  },

  activeUser: {
    background: "#2563eb",
    borderRadius: "8px",
  },

  details: {
    width: "65%",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
};