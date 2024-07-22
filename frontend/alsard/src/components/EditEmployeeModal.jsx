import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditEmployeeModal = ({ employee, onClose, setUsers }) => {
  const [formData, setFormData] = useState({
    name: employee.Name,
    email: employee.Email,
    phone: employee.Phone,
    department: employee.department,
    employeeId: employee.employeeId,
    position: employee.Position,
  });
  const {t} = useTranslation();

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
    <div id='haha' className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit <span className='text-blue-600'>{employee.Name}</span></h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">{t("home.name")}</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("home.email")}</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("home.department")}</label>
            <input
              type="text"
              name="department"
              className="w-full p-2 border rounded"
              value={formData.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("home.phone")}</label>
            <input
              type="text"
              name="phone"
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("home.employeeId")}</label>
            <input
              type="text"
              name="employeeId"
              className="w-full p-2 border rounded"
              value={formData.employeeId}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">{t("home.position")}</label>
            <input
              type="text"
              name="position"
              className="w-full p-2 border rounded"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>
          <div className=" gap-4 flex justify-center ">
            <button
              type="button"
              className="mr-2 bg-red-600 font-medium text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              {t("home.cancel")}
            </button>
            <button
              type="button"
              className="bg-green-600 font-medium text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              {t("home.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
