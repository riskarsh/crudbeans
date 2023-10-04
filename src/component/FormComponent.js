import React, { useState, useEffect } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load data from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tableData"));
    if (storedData) {
      setTableData(storedData);
    }
  }, []);

  useEffect(() => {
    // Save data to local storage after changes
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  //Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTableData = [...tableData];
      updatedTableData[editIndex] = formData;
      setTableData(updatedTableData);
      setEditIndex(null);
    } else {
      setTableData([...tableData, formData]);
    }
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
  };

  //Handle editing of the data
  const handleEdit = (index) => {
    setEditIndex(index);
    const editedData = tableData[index];
    setFormData(editedData);
  };
  //Handle additon of adding data
  const handleAddMore = () => {
    setFormData({ firstName: "", lastName: "", email: "", phone: "" });
  };

  //Handle deletion of the data
  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((item, i) => i !== index);
    setTableData(updatedTableData);
  };
  //Clear local storage data
  const handleClearStorage = () => {
    localStorage.clear();
    setTableData([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First name"
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last name"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <button type="submit">
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>

      <button onClick={handleAddMore}>Add More</button>

      <button onClick={handleClearStorage}>Clear Storage</button>

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
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormComponent;
