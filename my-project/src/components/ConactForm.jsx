import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const contactListApi = "http://localhost:3000/contacts";

function ConactForm() {
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });
  const navigate = useNavigate();
  const handelSumit = async (e) => {
    e.preventDefault();
    if (newContact.name.trim() == "" || newContact.number.trim() == "") {
      alert("All feild are required!!");
    } else {
      try {
        await axios.post(contactListApi, newContact);
        setNewContact({ name: "", number: "" });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handelChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };
  return (
    <form className="ml-4" onSubmit={handelSumit}>
      <h1 className="mb-2">NewContact</h1>
      <div>
        <input
          className="border mb-2 py-1 px-2 rounded-md w-64"
          type="text"
          placeholder="Name"
          value={newContact.name}
          name="name"
          onChange={handelChange}
        />
      </div>
      <div>
        <input
          className="border mb-2 py-1 px-2 rounded-md w-64"
          type="text"
          placeholder="Phone Number"
          name="number"
          value={newContact.number}
          onChange={handelChange}
        />
      </div>
      <div>
        <button
          className="bg-green-700 text-white py-1 px-2 rounded-md"
          type="submit"
        >
          Add Contact
        </button>
      </div>
    </form>
  );
}

export default ConactForm;
