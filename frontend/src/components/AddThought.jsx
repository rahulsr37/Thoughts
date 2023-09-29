import React, { useContext, useState } from "react";
import thoughtContext from "../context/thoughtContext";

const AddThought = () => {
  const context = useContext(thoughtContext);
  const [newThought, setNewThought] = useState({ thought: "" });
  const { addThought } = context;
  const handleNewThought = (e) => {
    e.preventDefault()
    addThought(newThought.thought)
    setNewThought({thought: ""})
  };
  const onChangeTextarea = (e) => {
    setNewThought({ ...newThought, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <form className="mt-16 md:mt-20 p-7 w-full md:w-3/4">
          <label
            htmlFor="message"
            className="block mb-2 text-lg text-white font-medium text-left"
          >
            Thinking of something ?
          </label>
          <textarea
            id="thought"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-200 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={onChangeTextarea}
            name="thought"
            value={newThought.thought}
          ></textarea>
          <div className="flex justify-end items-end my-3">
            <button
              type="submit"
              className="px-5 py-2.5 font-semibold text-white bg-blue-700 active:bg-blue-900 rounded-full disabled:opacity-50"
              disabled={newThought.thought.length < 2}
              onClick={handleNewThought}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddThought;
