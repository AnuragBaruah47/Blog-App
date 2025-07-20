import React, { useEffect, useState } from "react";
import authService from "../AppWrite/Auth";

function AllUsers() {
  const [allUserData, setAllUserData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const setUser = async () => {
      try {
        const allUser = await authService.getAllUser();
        if (allUser) {
          setAllUserData(allUser);
          return console.log(allUser);
        }
      } catch (error) {
        setError("Failed To Fetch All User");
      }
    };
    setUser()
  }, [  ]);


  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default AllUsers;
