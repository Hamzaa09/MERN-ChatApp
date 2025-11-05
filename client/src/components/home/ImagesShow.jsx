import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import React from "react";

const ImagesShow = (images, handleAllRemove) => {
  return (
    <div className="relative border border-white rounded-2xl w-full h-screen flex justify-center items-center">
      <span
        onClick={handleAllRemove}
        className="bg-[#d8e4ea73] p-2 active:bg-[#d8e4ea9c] absolute top-5 right-5 rounded-full text-2xl cursor-pointer duration-200 active:translate-y-1"
      >
        <FaXmark />
      </span>

      <div className="h-1/2 md:h-screen w-full flex gap-5 md:w-1/2 overflow-y-hidden overflow-x-auto no-scrollbar">
        {Array.from(images).map((img, index) => (
          <div
            className="relative flex-shrink-0 h-full w-full mx-2 overflow-hidden py-5"
            key={index}
          >
            <img
              className="object-cover h-full w-full"
              src={URL.createObjectURL(img)}
              alt="img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesShow;
