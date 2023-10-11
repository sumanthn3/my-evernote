import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import Logo from "../Assets/logonew.png";
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/Home/Note");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  const location = useLocation();
  const isCurrentPath = (path) => location.pathname === path;

  const getNavItemClass = (path) => {
    if (isCurrentPath(path)) {
      return "text-blue-400 bg-white rounded-lg";
    }
    return "text-black hover:text-blue-400 hover:bg-white";
  };
  return (
    <div className="bg-gray-200 h-[100vh] p-2 shadow-lg w-15 z-10 align-baseline flex flex-col justify-between">
      <div className="flex justify-center">
        <img className="w-15 h-16 rounded-lg" src={Logo} alt="logo" />
      </div>

      <div>
        <nav className="mt-6">
          <ul>
            <li
              className={`mb-2 p-3 ${
                isCurrentPath("/home/note") ? "bg-white rounded-lg" : ""
              } flex justify-center`}
            >
              <Link to="/home/note" className={getNavItemClass("/home/note")}>
                <AiOutlinePlus className="text-3xl text-blue" />
              </Link>
            </li>
            <li
              className={`mb-2 p-3 ${
                isCurrentPath("/home/mynotes") ? "bg-white rounded-lg" : ""
              } flex justify-center`}
            >
              <Link
                to="/home/mynotes"
                className={getNavItemClass("/home/mynotes")}
              >
                <CgNotes className="text-3xl text-blue" />
              </Link>
            </li>
            <li
              className={`mb-2 p-3 ${
                isCurrentPath("/home/favourites") ? "bg-white rounded-lg" : ""
              } flex justify-center`}
            >
              <Link
                to="/home/favourites"
                className={getNavItemClass("/home/favourites")}
              >
                <MdFavoriteBorder className="text-3xl text-blue" />
              </Link>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </div>
      {user && (
        <button
          onClick={handleSignOut}
          className="rounded-md font-bold text-black flex justify-center"
        >
          <BiLogOut className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default SideBar;
