import React, { useContext, useEffect, useRef, useState } from "react";
import thoughtContext from "../context/thoughtContext";
import ThoughtPost from "./ThoughtPost";

const Profile = () => {
  const context = useContext(thoughtContext);
  const { getUserThoughts, thoughts, updateThought } = context;
  const [newThought, setNewThought] = useState({ id: "", uthought: "" });
  useEffect(() => {
    getUserThoughts();
  }, []);

  const updateRef = useRef(null);
  const refCloseModal = useRef(null);
  const updateAThought = (id, thought) => {
    updateRef.current.click();
    setNewThought({ id: id, uthought: thought });
    console.log(
      `Testing Update button response! id: ${id} and thought : ${thought}`
    );
  };

  const handleNewThought = (e) => {
    e.preventDefault();
    console.log(`Updating the thought : ${newThought.uthought}`);
    updateThought(newThought.id, newThought.uthought);
    refCloseModal.current.click();
  };
  const onChangeTextarea = (e) => {
    setNewThought({ ...newThought, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="pt-20">
        <div>Profile Details will be fetched here !</div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl md:mx-1 text-white p-6 font-semibold md:w-3/4">
            Your Collection of Thoughts!
          </h1>

          <button
            ref={updateRef}
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            className="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Toggle modal
          </button>

          <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed z-50 md:z-50 hidden w-full md:w-full"
          >
            <div className="flex justify-center items-center">
              <form>
                <label
                  htmlFor="message"
                  className="block mb-2 text-lg text-white font-medium text-left"
                >
                  Update your thought!
                </label>
                <textarea
                  id="uthought"
                  rows=""
                  className="block p-2.5 w-full text-sm text-gray-200 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  value={newThought.uthought}
                  onChange={onChangeTextarea}
                  name="uthought"
                ></textarea>
                <div className="flex justify-end items-end my-3">
                  <button
                    ref={refCloseModal}
                    type="button"
                    className="text-gray-400 hidden bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 font-semibold text-white bg-blue-700 active:bg-blue-900 rounded-full disabled:opacity-50"
                    disabled={newThought.uthought.length < 2}
                    onClick={handleNewThought}
                  >
                    Update Post
                  </button>
                </div>
              </form>
            </div>
          </div>
          {thoughts.length === 0 && `No Thoughts from anyone!`}
          {thoughts.map((thought) => {
            return (
              <ThoughtPost
                key={thought._id}
                updateThought={updateAThought}
                thought={thought}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
