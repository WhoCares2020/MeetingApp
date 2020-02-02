import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { db } from "./utils/firebase";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("meetings")
      .get()
      .then(data =>
        data.forEach(x => {
          setUsers(x.data().attendees);
        })
      );
  }, []);

  return (
    <div className="App">
      <NavBar />
      {users.map(a => (
        <p>{a}</p>
      ))}
    </div>
  );
}

export default App;
