import React, { useContext, useEffect } from "react";
import thoughtContext from "../context/thoughtContext";
import ThoughtPost from "./ThoughtPost";
import AddThought from "./AddThought";
import { useNavigate } from "react-router-dom";

const AllThoughts = () => {
  let navigate = useNavigate();
  const context = useContext(thoughtContext);
  const { thoughts, getAllThoughts } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllThoughts();
    } else {
      navigate("/login");
    }
  },[]);

  return (
    <>
      <AddThought />

      <div className="flex mb-16 flex-col justify-center items-center">
        <h1 className="text-xl md:mx-1 text-white md:p-6 font-semibold md:w-3/4">
          For You
        </h1>
        {thoughts.length === 0 ? (
          <h1 className="text-white">No Thoughts from anyone!</h1>
        ) : (
          ""
        )}
        {thoughts.map((thought) => {
          return <ThoughtPost thought={thought} />;
        })}
      </div>
    </>
  );
};

export default AllThoughts;
