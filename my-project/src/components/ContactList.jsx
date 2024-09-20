import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const contactListApi = "http://localhost:3000/contacts";

function ContactList() {
  const [isLoading, setIsLoading] = useState(false);
  const [contactList, setContactList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getContact = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(contactListApi);
        const data = await response.json();
        setContactList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getContact();
  }, []);

  const handelDelete = async (id) => {
    try {
      await axios.delete(`${contactListApi}/${id}`);
      const updatedList = contactList.filter((item) => item.id !== id);
      setContactList(updatedList);
    } catch (error) {
      console.log(error);
    }
  };
  const sortHandler = () => {
    const sortedList = [...contactList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactList(sortedList);
  };

  return (
    <div className="w-[700px]">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex   w-[580px] ml-3 px-4 py-2">
            <button
              onClick={() => navigate("/new-contact")}
              className="bg-pink-500 rounded-md text-white mr-3 px-4 py-1"
            >
              Add
            </button>
            <button
              onClick={sortHandler}
              className="bg-pink-500 rounded-md text-white px-4 py-1"
            >
              sort
            </button>
          </div>
          {contactList.map(({ id, name, number }) => (
            <Contact
              key={id}
              name={name}
              number={number}
              handelDelete={() => handelDelete(id)}
              handelEdit={() => navigate(`/edit-contact/${id}`)}
              handelDetails={() => navigate(`/details-contact/${id}`)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ContactList;
