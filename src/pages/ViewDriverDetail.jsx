import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "../components/Header";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ViewDriverDetail = () => {
    const { id } = useParams();
    const [driverDetail, setDriverDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [downloading, setDownloading] = useState(false); // Changed initial state

    useEffect(() => {
        const fetchDriverDetail = async () => {
            try {
                const response = await axios.get(
                    `https://import-export-iisi.vercel.app/driverReport/getAllDriverReports?page=1&limit=100`
                );
                const bills = response.data.result;
                const foundBill = bills.find((bill) => bill._id === id);
                if (foundBill) {
                    setDriverDetail(foundBill);
                    setLoading(false);
                } else {
                    setError("Bill not found");
                }
            } catch (error) {
                setError("Error fetching bill details");
                console.error("Error fetching bill details:", error);
                setLoading(false);
            }
        };

        fetchDriverDetail();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const totalAmount = driverDetail.price + driverDetail.fuel + driverDetail.balance;

    const downloadPDF = () => {
        // Start downloading animation
        setDownloading(true);

        const input = document.getElementById('driverDetail');
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Driver_${driverDetail.name}.pdf`);

            // Stop downloading animation
            setDownloading(false);
        });
    };

    return (
        <div id="driverDetail">
            <Header title={"View Driver Detail"} />

            <div className="container mx-auto h-auto items-center justify-center px-10 bg-white py-10 max-sm:px-2">
                <Link to="/viewdrvreport">
                    <FaArrowAltCircleLeft size={28} />
                </Link>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <img src="/images/top.png" alt="View All" className="w-full h-full mb-4 inline-block" />
                </div>
                <div className="py-8 max-sm:px-2">
                    <h3 className="text-xl font-semibold my-2 text-center">
                        Driver Name : {driverDetail.name}
                    </h3>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-hidden overflow-x-auto">
                        <div className="min-w-full overflow-x-auto">
                            <table className="min-w-full leading-normal">
                                <thead className="bg-blue-300">
                                    <tr>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Container No
                                        </th>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Customer Name
                                        </th>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Fuel
                                        </th>
                                        <th className="px-5 py-3 border border-gray-500 text-left text-base font-semibold text-gray-800 uppercase tracking-wider">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {new Date(driverDetail.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {driverDetail.containerNo}
                                        </td>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {driverDetail.location}
                                        </td>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {driverDetail.customerName}
                                        </td>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {driverDetail.price}
                                        </td>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {driverDetail.fuel}
                                        </td>
                                        <td className="px-5 py-5 border border-gray-500 bg-white text-base font-medium">
                                            {driverDetail.balance}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap items-center justify-between p-1 py-6">
                            <strong className="text-xl">Total Amount : {totalAmount} </strong>
                            <p>
                                <button
                                    onClick={downloadPDF}
                                    disabled={downloading} // Disable button when downloading
                                    className={`px-4 py-3 bg-blue-400 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex ${downloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {downloading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.497L6.472 17.29zm11.445-11.445a8.003 8.003 0 011.273 10.528l-4.71-4.71 3.437-3.437z"></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    )}
                                    <span className="ml-2">{downloading ? 'Downloading...' : 'Download PDF'}</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDriverDetail;
