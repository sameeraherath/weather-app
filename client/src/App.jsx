import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/auth/current_user", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            user ? <Weather /> : <div>Please login to view the weather.</div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
