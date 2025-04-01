import { useEffect, useState } from "react"; 
import React from 'react';
import EnquiriesTable from "./EnquiriesTable"; // Importing the table component

const PopupEnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/enquiries");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEnquiries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  // Show loading state
  if (loading) return <p>Loading...</p>;

  // Show error message if API fails
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="">
      {enquiries.length > 0 ? (
        <EnquiriesTable enquiries={enquiries} />
      ) : (
        <p>No enquiries found.</p>
      )}
    </div>
  );
};

export default PopupEnquiryList;
