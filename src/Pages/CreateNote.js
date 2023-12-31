import React from "react";

import { motion } from "framer-motion";
import Notes from "../components/Notes";
import { variants } from "../utils/constants";
const CreateNote = () => {
  return (
    <motion.div
      className="w-screen h-screen justify-between bg-white p-4 md:p-8"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
    >
      <Notes />
    </motion.div>
  );
};

export default CreateNote;
