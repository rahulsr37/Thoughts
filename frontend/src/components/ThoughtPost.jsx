import React, { useContext } from "react";
import thoughtContext from "../context/thoughtContext";
import { useLocation } from "react-router-dom";

const ThoughtPost = (props) => {
  let location = useLocation()
  const context = useContext(thoughtContext);
  const { deleteThought } = context;
  const { thought, updateThought } = props;
  return (
    <>
      <div className="block w-11/12 my-1 px-4 py-2 bg-black border border-gray-400 rounded-md shadow md:w-[71%]">
        <h5 className="mb-2 text-xl text-left font-bold tracking-tight text-white">
          {thought.username}
          <span className=" mx-3 text-sm font-normal text-gray-400">
            {thought.date}
          </span>
        </h5>

        <p className="font-normal text-left text-white">{thought.thought}</p>
        {location.pathname === "/" ? (""):(<div className="tools mt-3 flex justify-end items-center">
          <i
            className="text-white mx-4 cursor-pointer fa fa-pencil-square-o"
            onClick={() => {
              updateThought(thought._id, thought.thought);
            }}
          ></i>
          <i
            className="text-white mx-4 cursor-pointer fa fa-trash-o"
            onClick={() => {
              deleteThought(thought._id);
            }}
          ></i>
        </div>)}
       
      </div>
    </>
  );
};

export default ThoughtPost;
