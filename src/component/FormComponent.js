import React, { useState, useEffect } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Load data from local storage
    const storedData = JSON.parse(localStorage.getItem("tableData"));
    if (storedData) {
      setTableData(storedData);
    }
  }, []);

  const handleSubmit = (e) => {
    // e.preventDefault();
    setTableData([...tableData, formData]);
    localStorage.setItem("tableData", JSON.stringify(tableData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First name"
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last name"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
        />

        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormComponent;
