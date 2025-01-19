import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa949"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </h1>
    </div>
  </div>
);

const PayByInvoice = () => {
  const [filteredBills, setFilteredBills] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const totalPages = Math.ceil(filteredBills.length / perPage);
  const indexOfLastBill = currentPage * perPage;
  const indexOfFirstBill = indexOfLastBill - perPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 ${
            currentPage === i ? "bg-gray-400" : "bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const fetchFilteredBills = async (term) => {
    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get(
        `https://web.fajrmuttrahtrading.com/bill/getAllBillsByInvoiceNumber?page=1&limit=500&invoice_number=${term}`
      );
      setTimeout(() => {
        setFilteredBills(response.data.result);
        setCurrentPage(1);
        setLoading(false);
      }, 2000); // Delay of 2 seconds
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      setFilteredBills([]);
      setSearched(false);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      fetchFilteredBills(searchTerm);
    }
  };
  const payIt = async (getTake, billId) => {
    console.log(getTake,'------------', billId, "new things");

    // e.preventDefault();

    const ApiData = {};

    try {
      const response = await axios.put(
        `https://web.fajrmuttrahtrading.com/bill/updateBillCreditAmount`,
        { body: JSON.stringify({ creditAmount: getTake, bill_id: billId }) }
      );
      console.log("Data check successfully:", response.data);

      // Reset bill data after successful submission
      //   setBillData({
      //     name: "",
      //   });
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <Header title={"Paid By invoice"} Icon={FaArrowLeft} />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-row justify-between items-center mx-6 flex-wrap">
            <div className="relative w-full md:w-80 mb-4 md:mb-0">
              <div className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                <input
                  type="text"
                  placeholder="Search anything"
                  className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div
                  className="flex flex-row items-center justify-center px-4 rounded-full border text-base bg-black text-white font-medium tracking-wide border-transparent py-1 h-[38px] -mr-3 cursor-pointer"
                  onClick={handleSearchClick}
                >
                  <FaSearch />
                </div>
              </div>
            </div>
            <div className="relative w-full md:w-auto flex justify-end max-sm:justify-end">
              <select
                className="h-full rounded-r border-t cursor-pointer sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full md:w-auto bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="100">100</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : searched && filteredBills.length === 0 && !loading ? (
            <div className="w-full flex items-center mx-auto justify-center mt-20">
              <h2 className="text-xl font-bold text-gray-800">
                No Data Available
              </h2>
            </div>
          ) : (
            <div>
              <div className="mt-10">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Invoice Number
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        BL Number
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        credit
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        debit
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBills.map((bill) => (
                      <tr key={bill._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {bill.invoice_number}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {bill.date}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {bill.bl_no}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {bill.company}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {bill.paidAmount}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {bill.creditAmount}
                        </td>
                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {bill.creditAmount}
                                            </td> */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {Number(bill?.paidAmount) -
                            Number(bill?.creditAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {currentBills.map((bill) => (
            <div className="flex w-full mt-8">
              <button
                onClick={() => payIt(0, bill._id)}
                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-base py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                type="submit"
              >
            Pay by bill
              </button>
            </div>
          ))}

          {/* {filteredBills.length > 0 && (
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {Math.min(indexOfFirstBill + 1, filteredBills.length)}{" "}
                to {Math.min(indexOfLastBill, filteredBills.length)} of{" "}
                {filteredBills.length} Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() =>
                    paginate(currentPage === 1 ? 1 : currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FaChevronLeft />
                </button>
                {renderPageNumbers()}
                <button
                  onClick={() =>
                    paginate(
                      currentPage === totalPages ? totalPages : currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages || filteredBills.length === 0
                  }
                  className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r ${
                    currentPage === totalPages || filteredBills.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default PayByInvoice;
