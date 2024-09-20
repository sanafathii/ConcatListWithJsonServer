import React from "react";
import "./contact.css";

function Contact({
  id,
  name,
  number,
  handelDelete,
  handelEdit,
  handelDetails,
}) {
  return (
    <div className="card flex justify-between items-center">
      <div>
        <span>{name} - </span>
        <span>{number}</span>
      </div>
      <div className="flex">
        <button
          className="bg-red-600 text-white rounded-md px-2 py-1"
          onClick={(id) => handelDelete(id)}
        >
          delete
        </button>
        <button
          onClick={() => handelEdit(id)}
          className="bg-orange-500 px-2 text-white py-1 rounded-md ml-2"
        >
          Edit
        </button>
        <button
          onClick={() => handelDetails(id)}
          className="bg-blue-600 text-white px-2 py-1 rounded-md ml-2"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default Contact;
