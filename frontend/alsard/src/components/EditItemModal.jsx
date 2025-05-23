import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditItemModal = ({ item, onClose, setItems }) => {
  const [formData, setFormData] = useState({
    name: item.Name,
    description: item.Description,
    category: item.Category,
    model: item.model,
    tagId: item.tagId,
    company: item.company,
    subLocation: item.subLocation,
    reserved: item.reserved,
  });
  const {t}=useTranslation()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/editItem/${item.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
  
      const updatedItem = await response.json();
  
      setItems((prevItems) =>
        prevItems.map((itm) => (itm.Id === item.Id ? updatedItem : itm))
      );
  
      onClose();
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };
  
  

  return (
    <div id='haha' className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[56rem] h-[27rem]">
        <h2 className="text-2xl font-bold mb-4">Edit <span className='text-blue-600'>{item.Name}</span></h2>
        <br />
        <form>
          <div className="mb-4 flex justify-evenly items-center">
              <div className='flex gap-3 items-center'>
                      <label className="block text-gray-700">{t("home.name")}</label>
                      <input
                        type="text"
                        name="name"
                        className="w-[300px] p-2 border rounded"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                </div> 

                <div className='flex gap-3 items-center'>
                            <label className="block text-gray-700">{t("home.description")}</label>
                            <input
                              type="text"
                              name="description"
                              className="w-[300px] p-2 border rounded"
                              value={formData.description}
                              onChange={handleInputChange}
                            />
                </div>
          </div>

          <div className="mb-4 flex justify-evenly items-center">
                <div className='flex gap-3 items-center pr-14'>
                    <label className="block text-gray-700">{t("home.category")}</label>
                    <input
                      type="text"
                      name="category"
                      className="w-[300px] p-2 border rounded"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                </div>

                <div className='flex gap-3 items-center pr-[1.3rem]'>
                    <label className="block text-gray-700">{t("home.model")}</label>
                    <input
                      type="text"
                      name="model"
                      className="w-[300px] p-2 border rounded"
                      value={formData.model}
                      onChange={handleInputChange}
                    />
                </div>


          </div>


          <div className="mb-4 flex justify-evenly items-center">
              <div className='flex gap-3 items-center pr-3'>
                      <label className="block text-gray-700">{t("home.tagId")}</label>
                    <input
                      type="text"
                      name="tagId"
                      className="w-[300px] p-2 border rounded"
                      value={formData.tagId}
                      onChange={handleInputChange}
                    />
                </div> 

                <div className='flex gap-3 items-center '>
                   <label className="block text-gray-700">{t("home.company")}</label>
                    <input
                      type="text"
                      name="company"
                      className="w-[300px] p-2 border rounded"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                </div>
          </div>

          <div className="mb-4 gap-3 flex items-center ">
            <div className='flex gap-3 items-center relative right-4'>
                  <label className="block text-gray-700">{t("home.subLocation")}</label>
                  <input
                    type="text"
                    name="subLocation"
                    className="w-[300px] p-2 border rounded"
                    value={formData.subLocation}
                    onChange={handleInputChange}
                  />
            </div>
          </div>


          <div className="flex justify-center items-center mt-10">
            <button
              type="button"
              className="mr-2 bg-red-600 text-white font-medium px-4 py-2 rounded"
              onClick={onClose}
            >
              {t("home.cancel")}
            </button>
            <button
              type="button"
              className="bg-green-500 font-medium text-white px-4 py-2 rounded"
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

export default EditItemModal;
