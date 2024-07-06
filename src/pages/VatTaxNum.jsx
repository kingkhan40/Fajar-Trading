import React from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import Header from '../components/Header';

const VatTaxNum = () => {
    return (
        <>
            <Header title={"Bill By Vat"} Icon={FaArrowLeft} />
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between items-center mx-6 flex-wrap">

                       
                    <div className="relative w-full md:w-80 mb-4 md:mb-0">
                            <form className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                                <input type="text" placeholder="Search anything" className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic" /><button className="flex flex-row items-center justify-center px-4 rounded-full border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1 h-[38px] -mr-3">
                                    <FaSearch />
                                </button>
                            </form>
                        </div>

                        <div className="relative w-full md:w-auto flex justify-end max-sm:justify-end">
                            <select
                                className="h-full  rounded-r border-t cursor-pointer sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full md:w-auto bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
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
                    <div className="w-full flex items-center mx-auto justify-center mt-20">
                        <h2 className="text-xl font-bold text-gray-800">No Data Available</h2>
                    </div>
                </div>
            </div>
        </>
    );
};


export default VatTaxNum