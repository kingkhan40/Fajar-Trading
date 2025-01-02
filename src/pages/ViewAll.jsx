import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { BallTriangle } from 'react-loader-spinner';

const ViewAll = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://web.fajrmuttrahtrading.com/bill/getAllBills?page=1&limit=700");
        setTimeout(() => {
          setBills(response.data.result);
          setFilteredBills(response.data.result);
          setLoading(false);
        }, 2000); // Delay of 1 second
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 ${currentPage === i ? 'bg-gray-400' : 'bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = bills.filter((bill) => {
      return (
        bill.bl_no.toLowerCase().includes(value) ||
        (bill.fieldsData.length > 0 && bill.fieldsData[0].Qty.toString().includes(value)) ||
        bill.company.toLowerCase().includes(value) ||
        bill.invoice_number.toLowerCase().includes(value)
      );
    });
    setFilteredBills(filteredData);
    setCurrentPage(1);
  };

  return (
    <>
      <Header title={" All Bill"} Icon={FaArrowLeft} />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mx-6">
            <div className="bg-white items-center justify-between w-full md:w-80 flex rounded-full shadow-lg p-2 mb-5 sticky" style={{ top: 5 }}>
              <input
                value={searchTerm}
                onChange={handleSearch}
                className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                type="text"
                placeholder="Search"
              />
              <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-full rounded-r border-t cursor-pointer sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full md:w-auto bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
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
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {loading ? (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center h-screen" role="status">
                    <span className="visually-hidden">
                      <BallTriangle
                      height={100}
                      width={100}
                      radius={5}
                      color="#4fa949"
                      ariaLabel="ball-triangle-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    /></span>
                  </div>
                </div>
              ) : (
                <>
                  <table className="min-w-full leading-normal">
                    <thead className="bg-blue-200">
                      <tr>
                        <th className="px-5 py-3 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          BL No
                        </th>
                        <th className="px-5 py-3 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-5 py-3 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Invoice Number
                        </th>
                        <th className="px-5 py-3 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Container
                        </th>
                        <th className="px-5 py-3 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-5 py-3 border text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Remaining Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBills.map((bill) => (
                        <tr key={bill._id}>
                          <td className="px-5 py-5 border border-gray-400 bg-white text-base font-bold">
                            <Link to={`/view/${bill._id}`} className="text-blue-500 hover:underline">
                              {bill.bl_no}
                            </Link>
                          </td>
                          <td className="px-5 py-5 border border-gray-400 bg-white text-base font-bold">{bill.company}</td>
                          <td className="px-5 py-5 border border-gray-400 bg-white text-base font-bold">{bill.invoice_number}</td>
                          <td className="px-5 py-5 border border-gray-400 bg-white text-base font-bold">{bill.fieldsData.length > 0 ? bill.fieldsData[0].Qty : '-'}</td>
                          <td className="px-5 py-5 border border-gray-400 bg-white text-base font-bold">{bill.date}</td>
                          <td className="px-5 py-5 border border-gray-400 bg-white text-base font-bold">{bill.totalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">
                      Showing {Math.min(indexOfFirstBill + 1, filteredBills.length)} to {Math.min(indexOfLastBill, filteredBills.length)} of {filteredBills.length} Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FaChevronLeft />
                      </button>
                      {renderPageNumbers()}
                      <button
                        onClick={() => paginate(currentPage === totalPages ? totalPages : currentPage + 1)}
                        disabled={currentPage === totalPages || filteredBills.length === 0}
                        className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r ${currentPage === totalPages || filteredBills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAll;
