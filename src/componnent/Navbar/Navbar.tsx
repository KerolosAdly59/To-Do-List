import { Link, useNavigate } from "react-router-dom"
import useAuth from "../UseAuth/UseAuth";
import { useEffect, useState } from "react";
import image from "./../../../public/download.jpg"

const Navbar = () => {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("themeCalculator") || "light";
  })
  const { user, logout } = useAuth();
  const navegate = useNavigate()



  const handleLogout = async () => {
    await logout();
    navegate("/login")
    console.log("hhhhhhhhhhh");

  };

  useEffect(() => {

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("themeToDoList", theme)
  }, [theme])
  return (


    <div className="navbar bg-slate-200 dark:bg-slate-800  ps-20  pt-3 flex gap-4  flex-wrap shadow-sm px-28">
      <div className=" flex-1  ">
        <Link to={"/"} className="btn btn-ghost text-[30px] whitespace-nowrap pt-4 md:pt-0 md:text-[40px] font-bold text-black dark:text-white hover:bg-transparent border-0">To-Do List</Link>
      </div>
      <div className="flex justify-between items-center w-1/3">
        <div className=' mb-1 mx-4   '>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className='bg-slate-600 dark:bg-gray-800 px-4 py-0.5 rounded-xl dark:shadow-[1px_2px_5px_#0a0a0a,-1px_-3px_5px_#2a2a2a] shadow-[5px_5px_10px_#bababa,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#bababa,inset_-5px_-5px_10px_#ffffff] cursor-pointer'><i className="fa-solid fa-circle-half-stroke"></i></button>
      </div>
      <div className="flex  gap-2">
        <div className="dropdown dropdown-center md:dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-0">
            <div className="w-10 rounded-full border-3 border-blue-700 ">
              <img
                alt="Tailwind CSS Navbar component"
                src={image} />

            </div>
          </div>
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {user ? <li><button onClick={() => handleLogout()} >Logout</button></li> : <> <li><Link to="/register" className="justify-between">
              Register

            </Link></li>

              <li><Link to="/login" className="justify-between">
                Login

              </Link></li></>}
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
