import React, { useState, useEffect } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    // Load data from local storage
    const storedData = JSON.parse(localStorage.getItem('tableData'));
    if (storedData) {
      setTableData(storedData);
    }
  },[]);



  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
  };


  //Handle additon of adding data
  const handleAddMore = () => {
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
  };
  
  //Handle deletion of the data 
  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((item, i) => i !== index);
    setTableData(updatedTableData);
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

        <button type="submit">Submit</button>
      </form>

      <button onClick={handleAddMore}>Add More</button>

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
