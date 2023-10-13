import React from "react";
import MyNotes from "../components/MyNotes";
import { motion } from "framer-motion";

import { variants } from "../utils/constants";
const MyNotesPage = () => {
  return (
    <motion.div
      className="w-screen h-screen bg-white p-4 md:p-8"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
    >
      <MyNotes />
    </motion.div>
  );
};

export default MyNotesPage;
