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

import {
  GoHome,
  GoPlay,
  GoStack,
  GoVideo,
  GoHistory,
  GoFileMedia,
  GoRocket,
} from "react-icons/go";
import Logo from "../Assets/logo1.png";
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
  return (
    <div className="bg-gray-200 h-[100vh] p-2 shadow-lg w-15 z-10 align-baseline flex flex-col justify-between">
      <div className="flex justify-center">
        <img className="w-10 h-15 rounded-lg" src={Logo} alt="logo" />
      </div>

      <div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2 p-3 hover:bg-white hover:rounded-lg flex justify-center">
              <Link to="/home/note" className="text-black hover:text-blue-400">
                <AiOutlinePlus className="text-3xl text-blue" />
              </Link>
            </li>
            <li className="mb-2 p-3 hover:bg-white hover:rounded-lg flex justify-center">
              <Link
                to="/home/mynotes"
                className="text-grey hover:text-blue-400"
              >
                <CgNotes className="text-3xl text-blue" />
              </Link>
            </li>
            <li className="mb-2 p-3 hover:bg-white hover:rounded-lg flex justify-center">
              <Link
                to="/home/favourites"
                className="text-black hover:text-blue-400"
              >
                <MdFavoriteBorder className="text-blue text-3xl" />
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
