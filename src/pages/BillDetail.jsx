import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "../components/Header";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";

const BillDetail = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false); // State for download animation

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(
          "https://web.fajrmuttrahtrading.com/bill/getAllBills?page=1&limit=700"
        );
        const bills = response.data.result;
        const foundBill = bills.find((bill) => bill._id === id);
        if (foundBill) {
          setBill(foundBill);
        } else {
          setError("Bill not found");
        }
      } catch (error) {
        setError("Error fetching bill details");
        console.error("Error fetching bill details:", error);
      }
    };

    fetchBill();
  }, [id]);

  const downloadPDF = () => {
    setDownloading(true); // Start downloading animation
    setTimeout(() => {
      const input = document.getElementById("billDetail");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`bill_${bill.invoice_number}.pdf`);
        setDownloading(false); // End downloading animation
      });
    }, 2000); // Timeout of 2 seconds
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!bill) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  // Calculate the total extra charges
  const totalExtraCharges = bill.extraChargeData.reduce(
    (acc, charge) => acc + charge.price * charge.Qty,
    0
  );
  console.log(bill.extraChargeData, "hello sir");

  // Calculate the total amount including VAT and extra charges
  const totalAmountIncludingVATAndCharges =
    bill.totalAmount +
    bill.totalAmount * (bill.vatPercentage / 100) +
    totalExtraCharges;
  const totalAmountInWords = numberToWords(
    Math.round(totalAmountIncludingVATAndCharges)
  );

  return (
    <div id="billDetail">
      <Header title={" Bill Detail"} />
      <div className="container mx-auto h-auto items-center justify-center px-10 bg-white py-10 px-2">
        <Link to="/view">
          <FaArrowAltCircleLeft size={28} />
        </Link>
        <div className="py-8 px-2">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold my-2 border bg-white py-2 px-4 sm:rounded-lg">
              Invoice : {bill.invoice_number}
            </h2>
            <h2 className="border font-semibold text-xl bg-white py-2 px-4 sm:ml-2 mt-2 sm:mt-0 sm:rounded-lg">
              <strong>Date:</strong> {bill.date}
            </h2>
          </div>
          <div className="max-w-3xl my-5 bg-gray-200 border border-gray-500 rounded-lg overflow-hidden shadow-xl">
            <h2 className="text-xl font-semibold bg-blue-300 p-4 text-center rounded-t-lg">
              Bill To :
            </h2>
            <div className="bg-white p-4">
              <p className="flex items-center justify-between border-b-2 p-1 py-2">
                <strong className="font-bold">Name :</strong> {bill.name}
              </p>
              <p className="flex items-center justify-between border-b-2 p-1 py-2">
                <strong>Company :</strong> {bill.company}
              </p>
              <p className="flex items-center justify-between border-b-2 p-1 py-2">
                <strong>VAT No :</strong> {bill.vatNo}
              </p>
              <p className="flex items-center justify-between border-b-2 p-1 py-2">
                <strong>Email :</strong> {bill.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="py-3 flex items-center text-base p-2 text-gray-400 uppercase before:flex-1 before:border-t-2 before:border-gray-200 before:me-6 after:flex-1 after:border-t-2 after:border-gray-200 after:ms-6">
            {" "}
            Or{" "}
          </div>

          <h3 className="text-xl font-semibold my-2 text-center">
            Bill No : {bill.bl_no}
          </h3>
          <div className="px-4 sm:px-8 py-4 overflow-hidden overflow-x-auto">
  <div className="min-w-full overflow-x-auto">
    {bill.fieldsData.length > 0 ? (
      <table className="min-w-full leading-normal border border-gray-700">
        {/* Table Header */}
        <thead>
          <tr className="bg-blue-100 border border-gray-700">
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              Container No
            </th>
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              Customer Name
            </th>
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              Location
            </th>
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              Price
            </th>
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              Qty
            </th>
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              VAT (OMR)
            </th>
            <th className="px-5 py-3 border border-gray-700 text-center text-base font-bold text-gray-800 uppercase">
              Total
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {bill.fieldsData.map((field, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } border border-gray-700`}
            >
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {field.container_no}
              </td>
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {field.customer_name}
              </td>
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {field.location}
              </td>
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {field.price}
              </td>
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {field.Qty}
              </td>
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {((field.price * field.Qty * bill.vatPercentage) / 100).toFixed(
                  2
                )}
              </td>
              <td className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800">
                {(field.price * field.Qty).toFixed(2)}
              </td>
            </tr>
          ))}

          {/* Extra Charges Section */}
          {bill.extraChargeData.length > 0 && (
            <>
              <tr className="bg-blue-100 border border-gray-700">
                <td
                  colSpan="3"
                  className="px-5 py-3 text-left font-bold border border-gray-700"
                >
                  Extra Charge : <span className="ml-4"> {bill.extraChargeDescription || "No description provided"} </span> 
                </td>
                <td
                  className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800"
                >
                  {bill.extraChargeData[0].price}
                </td>
                <td
                  className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800"
                >
                  {bill.extraChargeData[0].Qty}
                </td>
                <td
                  className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800"
                >
                  {(
                    (bill.extraChargeData[0].price *
                      bill.extraChargeData[0].Qty *
                      bill.vatPercentage) /
                    100
                  ).toFixed(2)}
                </td>
                <td
                  className="px-5 py-3 border border-gray-700 text-center font-medium text-gray-800"
                >
                  {(
                    bill.extraChargeData[0].price *
                    bill.extraChargeData[0].Qty
                  ).toFixed(2)}
                </td>
              </tr>
            </>
          )}
        </tbody>

        {/* Table Footer */}
        <tfoot>
          <tr className="bg-blue-100 border border-gray-700">
            <td
              colSpan="6"
              className="px-5 py-3 text-left font-bold text-xl border border-gray-700"
            >
              Total Amount:
            </td>
            <td className="px-5 py-3 border border-gray-700 text-center font-bold text-xl">
              {totalAmountIncludingVATAndCharges.toFixed(2)}
            </td>
          </tr>
          <tr className="bg-white">
            <td
              colSpan="7"
              className="px-5 py-3 text-left font-medium uppercase text-base border-t border-gray-700"
            >
              Total Amount in Words:{" "}
              <span className="font-bold">
                {numberToWords(
                  Math.round(totalAmountIncludingVATAndCharges)
                )}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    ) : (
      <p className="text-center">No fields data available</p>
    )}
  </div>
</div>

          <p className="flex items-center justify-between border-b-2 p-1 py-2 bg-white px-4">
            <strong className="text-base font-bold">VAT Tax:</strong>{" "}
            {bill.vatPercentage}%
          </p>

          <p className="flex items-center justify-between border-b-2 p-1 py-2 bg-white px-4">
            <strong className="text-base font-bold">Total Amount:</strong>{" "}
            {totalAmountIncludingVATAndCharges.toFixed(2) || "N/A"}
          </p>

          <div className="flex flex-wrap items-center justify-between p-1 py-2">
            <p>
              <strong className="text-xl">Total Amount in Words : </strong>
              <span className="text-base font-bold uppercase">
                {totalAmountInWords}
              </span>
            </p>
            <button
              onClick={downloadPDF}
              disabled={downloading} // Disable button when downloading
              className={`px-4 py-3 bg-blue-400 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex ${
                downloading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {downloading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.497L6.472 17.29zm11.445-11.445a8.003 8.003 0 011.273 10.528l-4.71-4.71 3.437-3.437z"
                  ></path>
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
              <span className="ml-2">
                {downloading ? "Downloading..." : "Download In PDF"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;

const numberToWords = (number) => {
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "million", "billion"];

  if (number === 0) return "zero";

  let words = "";
  for (let i = 0; number > 0; i++) {
    if (number % 1000 !== 0) {
      words = convertHundreds(number % 1000) + thousands[i] + " " + words;
    }
    number = Math.floor(number / 1000);
  }

  return words.trim();

  function convertHundreds(num) {
    if (num === 0) {
      return "";
    } else if (num < 20) {
      return ones[num] + " ";
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + " " + ones[num % 10] + " ";
    } else {
      return (
        ones[Math.floor(num / 100)] + " hundred " + convertHundreds(num % 100)
      );
    }
  }
};
