import { useState } from "react";
import thoughtContext from "./thoughtContext";

const ThoughtState = (props) => {
  const host = `http://localhost:5000`;
  const allThoughts = [];

  const [thoughts, setThoughts] = useState(allThoughts);

   // Fetching all thoughts from all the users to display on home page
   const getAllThoughts = async () => {
    // API for fetching all thoughts
    const response = await fetch(`${host}/api/thoughts/fetchalluserthoughts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
    });
    const jsonResponse = await response.json();
    setThoughts(jsonResponse);
  };

  // Fetching all thoughts of logged in user
  const getUserThoughts = async () => {
    // API for fetching all thoughts
    const response = await fetch(`${host}/api/thoughts/fetchthoughts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const jsonResponse = await response.json();
    setThoughts(jsonResponse);
  };

  // Adding a thought
  const addThought = async (thought) => {
    // API for adding a thought
    const response = await fetch(`${host}/api/thoughts/addthought`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ thought }),
    });
    const jsonResponse = await response.json();
    setThoughts(thoughts.concat(jsonResponse));
  };

  //  Deleting a thought
  const deleteThought = async (id) => {
    // API for deleting a thought
    const response = await fetch(`${host}/api/thoughts/deletethought/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    // Logic for deleting a thought
    console.log(`Deleting the node with id : ${id}`);
    const newThought = thoughts.filter((thought) => {
      return thought._id !== id;
    });
    setThoughts(newThought);
  };

  // Updating a thought
  const updateThought = async (id, thought) => {
    // API for updating a thought
    const response = await fetch(`${host}/api/thoughts/updatethought/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ thought }),
    });
    const jsonResponse = await response.json();
    console.log(`This is from update thought function ${thought}`);
    let newUpdatedThoughts = JSON.parse(JSON.stringify(thoughts))

    // Logic for updating a thought
    for (let index = 0; index < newUpdatedThoughts.length; index++) {
      const element = newUpdatedThoughts[index];
      if (element._id === id) {
        newUpdatedThoughts[index].thought = thought;
        break;
      }
    }
    setThoughts(newUpdatedThoughts);
  };

  return (
    <thoughtContext.Provider
      value={{
        thoughts,
        setThoughts,
        addThought,
        deleteThought,
        updateThought,
        getUserThoughts,
        getAllThoughts
      }}
    >
      {props.children}
    </thoughtContext.Provider>
  );
};

export default ThoughtState;
