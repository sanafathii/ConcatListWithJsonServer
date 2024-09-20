import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const contactListApi = "http://localhost:3000/contacts";

function DetailsContact() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(`${contactListApi}/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading contact details...</p>;
  }

  if (!contact) {
    return <p>Contact not found.</p>;
  }

  return (
    <div className="p-4 w-[500px]">
      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
      <button
        onClick={() => navigate(-1)}
        className="border border-gray-700 p-2 rounded-full mb-2 text-center"
      >
        back
      </button>
      <div className="bg-gray-100 p-4 rounded-md">
        <p>
          <strong>Name:</strong> {contact.name}
        </p>
        <p>
          <strong>Phone Number:</strong> {contact.number}
        </p>
      </div>
    </div>
  );
}

export default DetailsContact;
