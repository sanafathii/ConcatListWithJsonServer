import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const contactListApi = "http://localhost:3000/contacts";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", number: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${contactListApi}/${id}`);
        setContact(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${contactListApi}/${id}`, contact);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="ml-4">
      <h2 className="mb-2">Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="border mb-2 py-1 px-2 rounded-md w-64"
            type="text"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            className="border mb-2 py-1 px-2 rounded-md w-64"
            type="text"
            name="number"
            value={contact.number}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-orange-500 text-white px-2 py-1 rounded-md mt-2"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditContact;
