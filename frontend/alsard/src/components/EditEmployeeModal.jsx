import { useState } from 'react';

const EditEmployeeModal = ({ employee, onClose, setUsers }) => {
  const [formData, setFormData] = useState({
    name: employee.Name,
    email: employee.Email,
    phone: employee.Phone,
    department: employee.department,
    position: employee.Position,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/editEmployee/${employee.Id}`, {
        method: 'PUT', // Change to PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      const updatedEmployee = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.Id === employee.Id ? updatedEmployee : user))
      );

      onClose();
    } catch (error) {
      console.error('Error updating employee:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit <span className='text-blue-600'>{employee.Name}</span></h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              className="w-full p-2 border rounded"
              value={formData.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              className="w-full p-2 border rounded"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center ">
            <button
              type="button"
              className="mr-2 bg-red-600 font-medium text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-green-600 font-medium text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
