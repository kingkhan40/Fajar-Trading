import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function AddDriverReport() {
    const [driverName, setDriverName] = useState('');
    const [location, setLocation] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [price, setPrice] = useState('');
    const [fuel, setFuel] = useState('');
    const [containerNo, setContainerNo] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false); // Track uploading state

    useEffect(() => {
        const getCurrentDate = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            setCurrentDate(`${year}-${month}-${day}`);
        };

        getCurrentDate();

        // Simulate loading for 2 seconds
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Start uploading animation
        setUploading(true);

        setTimeout(async () => {
            const formData = {
                name: driverName,
                location,
                customerName,
                price: Number(price),
                fuel: Number(fuel),
                containerNo,
                date: currentDate
            };

            try {
                const response = await axios.post('https://web.fajrmuttrahtrading.com/driverReport/addDriverReport', formData);
                console.log('Form submitted:', response.data);

                setDriverName('');
                setLocation('');
                setCustomerName('');
                setPrice('');
                setFuel('');
                setContainerNo('');

                toast.success('Report submitted successfully!');
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit report. Please try again.');
            } finally {
                // Stop uploading animation after form submission
                setUploading(false);
            }
        }, 2000); // Simulate 2 second delay
    };

    if (loading) {
        return (
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
        );
    }

    return (
        <>
            <Header title={"Add Driver Report"} />

            <div className="container mx-auto items-center justify-center px-10 bg-white py-10 max-sm:px-2">

                <Link to="/">
                    <FaArrowAltCircleLeft size={28} />
                </Link>

                <div className="flex justify-center items-center h-auto">

                    <form className="w-full max-w-xl shadow-xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4 relative">
                            <label htmlFor="driverName" className="block text-gray-700 text-sm font-bold mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="driverName"
                                value={driverName}
                                onChange={(e) => setDriverName(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div className="absolute -top-4 font-semibold shadow-md bg-gray-50 rounded-xl right-0 mt-2 mr-3 text-gray-600">
                                <input
                                    type="date"
                                    id="id"
                                    name="name"
                                    placeholder="placeholder"

                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                                Location:
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">
                                Customer Name:
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                                Price:
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="fuel" className="block text-gray-700 text-sm font-bold mb-2">
                                Fuel:
                            </label>
                            <input
                                type="number"
                                id="fuel"
                                value={fuel}
                                onChange={(e) => setFuel(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="containerNo" className="block text-gray-700 text-sm font-bold mb-2">
                                Container No:
                            </label>
                            <input
                                type="text"
                                id="containerNo"
                                value={containerNo}
                                onChange={(e) => setContainerNo(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                disabled={uploading} // Disable button when uploading
                                className={`flex items-center justify-center w-full bg-gray-800 hover:bg-gray-900 text-white text-base py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {uploading ? (
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
                                <span className="ml-2">{uploading ? 'uploading...' : 'Upload'}</span>

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddDriverReport;
