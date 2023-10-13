import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles

const RichTextEditor = (content) => {
  return (
    <div>
      <ReactQuill value={content} />
    </div>
  );
};

export default RichTextEditor;
