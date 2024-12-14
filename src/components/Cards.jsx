import React, { useState } from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { motion } from "framer-motion";

function Cards({ data, setNotes, isDefault, containerRef }) {
  const [title, setTitle] = useState(data.tagdetails.tagTitle || "New Note");
  const [footerColor, setFooterColor] = useState("#6366f1");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (e) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === data.id ? { ...note, des: e.target.value } : note
      )
    );
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === data.id ? { ...note, tagdetails: { ...note.tagdetails, tagTitle: e.target.value } } : note
      )
    );
  };

  const handleDownload = () => {
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_'); 
    const element = document.createElement("a");
    const file = new Blob([data.des || ""], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${sanitizedTitle}-an.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRemove = () => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== data.id));
  };

  const handleColorChange = (e) => {
    setFooterColor(e.target.value);
  };

  return (
    <motion.div
      className="card-container relative w-48 md:w-60 h-64 md:h-80 flex-shrink-0 rounded-[30px] bg-gray-200 px-5 py-6 overflow-hidden cursor-pointer shadow-lg"
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      initial={{ x: data.position.x, y: data.position.y }}
      whileDrag={{ scale: 1.1 }}
      onClick={(e) => e.stopPropagation()}
      style={{ 
        zIndex: 1000,
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate(${data.position.x}px, ${data.position.y}px)`
      }}
    >
      <div className="flex items-center justify-between">
        <FaRegFileAlt onClick={() => setShowColorPicker(!showColorPicker)} className="cursor-pointer" />
        <IoMdRemove onClick={handleRemove} className="cursor-pointer" />
      </div>

      <textarea
        value={data.des}
        onChange={handleChange}
        placeholder="Type your note here..."
        className="w-full h-24 md:h-52 mt-4 bg-transparent border-none outline-none resize-none overflow-y-auto"
      />

      {!isDefault && (
        <div className="footer absolute bottom-0 w-full left-0">
          <div className="flex items-center justify-between mb-3 px-6 py-2">
            <h5 className="font-medium">AN📝</h5>
            <span
              className="font-medium w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleDownload}
            >
              <IoCloudDownloadOutline />
            </span>
          </div>

          {data.tagdetails.isOpen && (
            <div
              className="tag w-full flex items-center justify-center py-3"
              style={{ backgroundColor: footerColor }}
            >
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="font-semibold text-md text-center text-black bg-transparent border-none outline-none"
                placeholder="New Note"
              />
              {showColorPicker && (
                <input
                  type="color"
                  value={footerColor}
                  onChange={handleColorChange}
                  className="ml-2 w-6 h-6 cursor-pointer"
                />
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Cards;
