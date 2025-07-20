import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./AppWrite/Auth";
import { login, logout } from "./Store/AuthSlice";
import { AllUsers, Footer, Header } from "./Components/Index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header/>
        <main><Outlet/></main>
        <Footer/>
        <AllUsers/>
      </div>
    </div>
  );
}

export default App;
