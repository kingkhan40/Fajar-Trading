import React from 'react';
import { Link } from 'react-router-dom';
import Header from "./Header";

const Home = () => {
    return (
        <>
            <Header title={"Manage All"} />
            <section className="text-gray-600 body-font">
                <div className="max-w-screen-2xl px-3 py-24 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 text-center">
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                <Link to='/view'>
                                    <img src="./images/containers.png" alt="View All" className="w-20 h-20 mb-2 inline-block" />
                                    <div>
                                        <button
                                            role="link"
                                            className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                        >
                                            View All
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                <Link to='/add'>

                                    <img src="./images/truck.png" alt="Add Bl" className="w-20 h-20 mb-2 inline-block" />
                                    <div>
                                        <button
                                            role="link"
                                            className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                        >
                                            Add Bill
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                <Link to='/adddrv'>

                                    <img src="./images/drivers.png" alt="Add Driver Report" className="w-20 h-20 mb-2 inline-block" />
                                    <div>
                                        <button
                                            role="link"
                                            className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                        >
                                            Add Driver Report
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                <Link to="/viewdrvreport">
                                    <img src="./images/report.png" alt="View Driver Report" className="w-20 h-20 mb-2 inline-block" />
                                    <div>
                                        <button
                                            role="link"
                                            className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                        >
                                            View Driver Report
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                <Link to="/viewalltax">
                                <img src="./images/tax.png" alt="View Driver Report" className="w-20 h-20 mb-2 inline-block" />
                                <div>
                                    <button
                                        role="link"
                                        className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                    >
                                        View All Tax
                                    </button>
                                </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                <Link to="/searchbyname">
                                <img src="./images/company.png" alt="View Driver Report" className="w-20 h-20 mb-2 inline-block" />
                                <div>
                                    <button
                                        role="link"
                                        className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                    >
                                        Search By Name
                                    </button>
                                </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                 <Link to='/vattaxnum'>
                                <img src="./images/tax1.jpg" alt="View Driver Report" className="w-20 h-20 mb-2 inline-block" />
                                <div>
                                    <button
                                        role="link"
                                        className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                    >
                                        Search By VatTax
                                    </button>
                                </div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 w-full">
                            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-slate-200">
                                 <Link to='/paybyinvoice'>
                                <img src="./images/search.png" alt="View Driver Report" className="w-20 h-20 mb-2 inline-block" />
                                <div>
                                    <button
                                        role="link"
                                        className="relative font-medium text-xl after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
                                    >
                                        Pay By Invoice
                                    </button>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;
