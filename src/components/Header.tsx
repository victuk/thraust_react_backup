import { useState } from "react";
import { NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { authStore } from "../../store/authStore";

interface NavButton {
  name: string;
  path: string;
}

export default function Header() {

    const [isMenuShowing, setMenuShowing] = useState(false);

    const toggleShowMenu = () => {
        setMenuShowing(!isMenuShowing);
    }

    

  const isLogggedIn = authStore(state => state.isLoggedIn);

  const userDetails = authStore(state => state.userDetails);

  const logOut = authStore(state => state.removeUser);

  const navButtons: NavButton[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/aboutus" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contactus" },
  ];

  const activeNavbarButtonStyle =
    "bg-white w-full text-primary rounded-md lg:border-b lg:border-b-white lg:border-b-2 lg:border-b-solid lg:text-white lg:rounded-none lg:bg-primary";
  const inactiveNavbarButtonStyle = "text-white";
  const navbarDefaultStyle = "px-[8px] py-[4px]";

  return (

      <header className="flex justify-between items-center bg-primary h-[65px] px-10 xl:px-[140px]">
        <div className="flex flex-row gap-[10px]">
          <img
            src="/thraustlogo.png"
            className="h-[40px] w-[40px]"
            alt="Thraust Logo"
          />
          <div className="text-[1.5rem] text-white font-bold">
            <h1>Thraust</h1>
          </div>
        </div>
        <button className="bg-primary p-[10px] cursor-pointer block lg:hidden" onClick={toggleShowMenu}>
            {!isMenuShowing  ? (<GiHamburgerMenu color="white" size={20} />) : (<IoClose color="white" size={25} />)}
          
        </button>
        <ul className={`fixed  ${isMenuShowing ? "flex flex-col top-[65px] left-0 w-full bg-primary text-white items-center gap-4 py-4 rounded-b-xl" : "hidden"} lg:flex lg:relative lg:flex md:justify-between lg:flex-row lg:items-center lg:m-0lg: p-0 lg:gap-4`} style={{zIndex: 200}}>
          {navButtons.map((navButton: NavButton) => (
            <li style={{ textDecoration: "none", zIndex: 200 }}>
              <NavLink
                to={navButton.path}
                className={({ isActive }) =>
                  (isActive
                    ? activeNavbarButtonStyle
                    : inactiveNavbarButtonStyle) +
                  " " +
                  navbarDefaultStyle
                }
              >
                {navButton.name}
              </NavLink>
            </li>
          ))}
          {!isLogggedIn ? (
            <>
              <li style={{ textDecoration: "none" }}>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    (isActive
                      ? activeNavbarButtonStyle
                      : inactiveNavbarButtonStyle) +
                    " " +
                    navbarDefaultStyle
                  }
                >
                  Login
                </NavLink>
              </li>
              <li style={{ textDecoration: "none" }}>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    (isActive
                      ? activeNavbarButtonStyle
                      : inactiveNavbarButtonStyle) +
                    " " +
                    navbarDefaultStyle
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
            <li style={{ textDecoration: "none" }} className="text-white" onClick={logOut}>Log Out</li>
              <li style={{ textDecoration: "none" }}>
                <div className="text-white flex gap-[20px] items-center">
                  <div className="text-white flex gap-[10px] items-center">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={
                        userDetails.profilePicture == ""
                          ? "/avatar.png"
                          : userDetails.profilePicture
                      }
                    />
                    <div className="text-[20px]">{userDetails.fullName}</div>
                  </div>
                </div>
              </li>
            </>
          )}
        </ul>
        <a
          href="cart.html"
          className="fixed bottom-[2rem] right-[2rem] z-[100]"
        >
          <img
            src="/carticon.png"
            className="h-[40px] w-[40px]"
            alt="Cart Icon"
          />
          <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-[#7A288A] py-[0.2rem] px-[0.5rem] rounded-full text-[1rem] text-white">
            0
          </span>
        </a>
      </header>
  );
}
