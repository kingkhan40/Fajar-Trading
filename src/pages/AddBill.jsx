import React, { useState } from "react";
import Header from "../components/Header";
import { FaArrowAltCircleLeft, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const AddBill = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    container_no: "",
    location: "",
    customer_name: "",
    price: "",
    Qty: "",
  });
  const [secondModalFormData, setSecondModalFormData] = useState({
    notes: "",
    price: "",
    Qty: "",
  });
  const [thirdModalFormData, setThirdModalFormData] = useState({
    descrption: "",
    price: "",
    qty: "",
    vatTax: "",
  });

  const [billData, setBillData] = useState({
    name: "",
    email: "",
    vatNo: "",
    company: "",
    bl_no: "",
    invoice_number: "",
    vatPercentage: null,
    extraChargeDescription: "",
    paidStatus: false,
    paidAmount: 0,
    creditAmount: 0,
    extraChargeData: [],
    fieldsData: [],
    date: new Date().toISOString().slice(0, 10),
    totalAmount: 0,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSecondModal = () => setIsSecondModalOpen(true);
  const closeSecondModal = () => setIsSecondModalOpen(false);

  const openThirdModal = () => setIsThirdModalOpen(true);
  const closeThirdModal = () => setIsThirdModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSecondModalInputChange = (e) => {
    const { name, value } = e.target;
    setSecondModalFormData({
      ...secondModalFormData,
      [name]: value,
    });
  };
  const handleThirdModalInputChange = (e) => {
    const { name, value } = e.target;
    setThirdModalFormData({
      ...thirdModalFormData,
      [name]: value,
    });
  };

  const handleBillDataChange = (e) => {
    const { name, value } = e.target;
    setBillData({
      ...billData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setBillData((prevData) => ({
      ...prevData,
      fieldsData: [...prevData.fieldsData, formData],
      paidAmount: prevData.paidAmount + parseFloat(formData.price),
      totalAmount: prevData.totalAmount + parseFloat(formData.price),
    }));
    setFormData({
      container_no: "",
      location: "",
      customer_name: "",
      price: "",
      Qty: "",
    });
    closeModal();
  };

  const handleSecondModalFormSubmit = (e) => {
    e.preventDefault();
    setBillData((prevData) => ({
      ...prevData,
      extraChargeData: [...prevData.extraChargeData, secondModalFormData],
    }));
    setSecondModalFormData({
      notes: "",
      price: "",
      Qty: "",
    });
    closeSecondModal();
  };
  const handleThirdModalFormSubmit = (e) => {
    e.preventDefault();
    setBillData((prevData) => ({
      ...prevData,
      extraChargeData: [...prevData.extraChargeData, thirdModalFormData],
    }));
    setThirdModalFormData({
      descrption: "",
      price: "",
      qty: "",
      vatTax: "",
    });
    closeThirdModal(); // Close the modal after submission
  };

  const handleBillFormSubmit = async (e) => {
    e.preventDefault();

    const ApiData = {
      name: billData.name,
      email: billData.email,
      vatNo: billData.vatNo,
      company: billData.company,
      bl_no: billData.bl_no,
      invoice_number: billData.invoice_number,
      vatPercentage: billData.vatPercentage,
      extraChargeDescription: billData.extraChargeDescription,
      paidStatus: billData.paidStatus,
      paidAmount: billData.paidAmount,
      creditAmount: billData.creditAmount,
      fieldsData: billData.fieldsData,
      date: billData.date,
      extraChargeData: billData.extraChargeData,
      totalAmount: billData.totalAmount,
    };

    try {
      const response = await axios.post(
        "https://web.fajrmuttrahtrading.com/bill/create-bill",
        ApiData
      );
      console.log("Data saved successfully:", response.data);

      // Reset bill data after successful submission
      setBillData({
        name: "",
        email: "",
        vatNo: "",
        company: "",
        bl_no: "",
        invoice_number: "",
        vatPercentage: null,
        extraChargeDescription: "",
        paidStatus: false,
        paidAmount: 0,
        creditAmount: 0,
        extraChargeData: [],
        fieldsData: [],
        date: new Date().toISOString().slice(0, 10),
        totalAmount: 0,
      });
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }

    console.log(ApiData, "&&&&&&api&&&&& Data");
  };

  return (
    <>
      <Header title={"Add Bill"} />
      <div className="container mx-auto my-10 px-4 sm:px-8">
        <div className="mx-auto xl:max-w-3xl h-full p-4 flex bg-white rounded-lg shadow overflow-hidden">
          <Link to="/view">
            <FaArrowAltCircleLeft size={28} />
          </Link>
          <div className="w-full my-10">
            <form onSubmit={handleBillFormSubmit}>
              <div className="mb-4 mt-6">
                <label
                  className="block text-gray-700 text-base font-semibold mb-2"
                  htmlFor="invoice-no"
                >
                  Invoice No :
                </label>
                <div className="flex gap-3">
                  <input
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="invoice-no"
                    type="text"
                    placeholder="Invoice Number"
                    name="invoice_number"
                    value={billData.invoice_number}
                    onChange={handleBillDataChange}
                  />
                  <input
                    type="date"
                    id="date"
                    className="mx-2 bg-slate-500 p-2 text-white"
                    value={billData.date}
                    onChange={handleBillDataChange}
                  />
                </div>
              </div>

              <h1
                className="text-2xl font-bold cursor-pointer"
                onClick={openThirdModal}
              >
                Add Bill to :
              </h1>

              <div className="mb-4 mt-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="bl-no"
                >
                  Bl No :
                </label>
                <input
                  className="text-sm appearance-none uppercase rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="bl-no"
                  type="text"
                  placeholder="Bl Number"
                  name="bl_no"
                  value={billData.bl_no}
                  onChange={handleBillDataChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="company"
                  type="text"
                  name="company"
                  value={billData.company}
                  onChange={handleBillDataChange}
                  placeholder="Company Name"
                />
              </div>

              <div className="flex w-full mt-8 px-5">
                <button
                  onClick={openModal}
                  className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10"
                  type="button"
                >
                  Add Container
                </button>
              </div>

              <div className="flex w-full mt-8 px-5">
                <button
                  onClick={openSecondModal}
                  className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10"
                  type="button"
                >
                  Add Another
                </button>
              </div>
              <div className="flex w-full mt-8 px-5">
                <button
                  onClick={openThirdModal}
                  className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10"
                  type="button"
                >
                  Add Extra Charges
                </button>
              </div>

              <div className="mb-6 mt-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="vat-tax"
                >
                  Vat Tax (%) :
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="vat-tax"
                  type="number"
                  placeholder="VAT Tax"
                  name="vatPercentage"
                  value={billData.vatPercentage}
                  onChange={handleBillDataChange}
                />
              </div>

              <div className="flex w-full mt-8">
                <button
                  className="w-full bg-gray-800 hover:bg-grey-900 text-white text-base py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit"
                >
                  Generate Bills
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg sm:max-w-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">Add Container</h2>
              <p className="mb-2 cursor-pointer">
                <FaTimesCircle onClick={closeModal} size={25} />
              </p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="container_no"
                >
                  Container No
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="container_no"
                  type="text"
                  name="container_no"
                  value={formData.container_no}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="customer_name"
                >
                  Customer Name
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="customer_name"
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="Qty"
                >
                  Quantity
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="Qty"
                  type="number"
                  name="Qty"
                  value={formData.Qty}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-800 w-full mt-4 hover:bg-grey-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg sm:max-w-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-4">Add Extra Charge</h2>
              <p className="mb-2 cursor-pointer">
                <FaTimesCircle onClick={closeSecondModal} size={25} />
              </p>
            </div>
            <form onSubmit={handleSecondModalFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="notes"
                >
                  Notes
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="notes"
                  type="text"
                  name="notes"
                  value={secondModalFormData.notes}
                  onChange={handleSecondModalInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="price"
                  type="number"
                  name="price"
                  value={secondModalFormData.price}
                  onChange={handleSecondModalInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="Qty"
                >
                  Quantity
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="Qty"
                  type="number"
                  name="Qty"
                  value={secondModalFormData.Qty}
                  onChange={handleSecondModalInputChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-800 w-full mt-4 hover:bg-grey-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isThirdModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg sm:max-w-lg w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Add Extra Charges</h2>
              <p className="mb-2 cursor-pointer">
                <FaTimesCircle onClick={closeThirdModal} size={25} />
              </p>
            </div>
            <form onSubmit={handleThirdModalFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="descrption"
                >
                  Description
                </label>
                <textarea
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                  id="descrption"
                  name="descrption"
                  rows={6}
                  value={thirdModalFormData.descrption}
                  onChange={handleThirdModalInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="price"
                  name="price"
                  type="number"
                  value={thirdModalFormData.price}
                  onChange={handleThirdModalInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="qty"
                >
                  Quantity
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="qty"
                  name="qty"
                  type="number"
                  value={thirdModalFormData.qty}
                  onChange={handleThirdModalInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="vatTax"
                >
                  VAT (%)
                </label>
                <input
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="vatTax"
                  name="vatTax"
                  type="number"
                  value={thirdModalFormData.vatTax}
                  onChange={handleThirdModalInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-800 w-full mt-4 hover:bg-grey-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBill;
