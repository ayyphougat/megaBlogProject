import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function Logoutbtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className="inline-bock px-6 py-2 duration-100 hover:bg-blue-100 hover:text-black rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;
