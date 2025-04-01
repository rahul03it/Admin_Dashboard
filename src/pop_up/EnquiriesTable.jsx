import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const EnquiriesTable = ({ enquiries }) => {
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleEdit = (enquiry) => {
    setEditId(enquiry.id);
    setEditedData(enquiry);
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Data:", editedData);
    setEditId(null);
  };

  const handleDelete = (id) => {
    const updatedEnquiries = enquiries.filter((enquiry) => enquiry.id !== id);
    setEnquiries(updatedEnquiries);
  };

  return (
    <div className="w-[100%] mx-auto bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
      <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
        POPUP-ENQUIRIES
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse border  border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <th className="border ">Name</th>
              <th className="border ">Email</th>
              <th className="border ">Mobile</th>
              <th className="border ">Branch</th>
              <th className="border ">Course</th>
              <th className="border ">Date</th>
              <th className="border ">Message</th>
              <th className="border w-20 min-w-[80px]">Actions</th>
              <th className="border ">Options</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="border bg-gray-200 dark:border-gray-600">
                {editId === enquiry.id ? (
                  <>
                    <td className="border ">
                      <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border ">
                      <input
                        type="text"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border ">
                      <input
                        type="text"
                        name="mobile"
                        value={editedData.mobile}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        name="branch"
                        value={editedData.branch}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        name="course"
                        value={editedData.course}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border ">
                      <input
                        type="text"
                        name="created_at"
                        value={editedData.created_at}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border ">
                      <textarea
                        name="message"
                        value={editedData.message}
                        onChange={handleChange}
                        className="border p-1 w-full"
                      ></textarea>
                    </td>
                    <td className="border ">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border  text-center truncate">
                      {enquiry.name || "No Name"}
                    </td>
                    <td className="border text-center truncate">
                      {enquiry.email || "No Email"}
                    </td>
                    <td className="border text-center truncate">
                      {enquiry.mobile || "No Mobile"}
                    </td>
                    <td className="border text-center truncate">
                      {enquiry.branch || "No Branch"}
                    </td>
                    <td className="border text-center truncate">
                      {enquiry.course || "No Course"}
                    </td>
                    <td className="border text-center truncate">
                      {enquiry.created_at || "No Date"}
                    </td>
                    <td className="border text-center whitespace-normal break-words max-w-60">
                      {enquiry.message || "No Message"}
                    </td>

                    <td className="border w-20 min-w-[80px] flex pl-1">
                      <button
                        onClick={() => handleEdit(enquiry)}
                        className=" text-white rounded"
                      >
                        <PencilSquareIcon className="h-4 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7  rounded-sm bg-blue-600 p-1 hover:bg-blue-800" />
                      </button>

                      <button
                        onClick={() => handleDelete(enquiry.id)}
                        className=" text-white px-3 py-1 rounded"
                      >
                        <TrashIcon className="h-4 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 rounded-sm bg-red-500 p-1 hover:bg-red-700" />
                      </button>
                    </td>

                    <td className="border p-1 relative">
                      <select
                        onChange={(e) => {
                          const selectedOption = e.target.value;
                          if (selectedOption === "edit") {
                            handleEdit(enquiry);
                          } else if (selectedOption === "delete") {
                            handleDelete(enquiry.id);
                          }
                        }}
                        className="px-2 py-1 border rounded bg-white text-gray-700 font-bold cursor-pointer"
                      >
                        <option value="" disabled selected>
                          Options
                        </option>
                        <option value="view">Councelor 1</option>
                        <option value="edit">Counceler 2</option>
                        <option value="delete">Counceler 3</option>
                      </select>

                    </td>

                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesTable;
