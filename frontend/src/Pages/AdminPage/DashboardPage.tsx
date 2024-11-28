import React, { useState } from "react";

export function Dashboard() {
  const [odsFile, setOdsFile] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [showSheets, setShowSheets] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [dragActiveOds, setDragActiveOds] = useState(false);
  const [dragActiveExcel, setDragActiveExcel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRemark, setSelectedRemark] = useState(null);
  const [remarksDetails, setRemarksDetails] = useState("");
  const [remarksFilter, setRemarksFilter] = useState<"all" | "match" | "needToCheck">("all");
  const [showData, setShowData] = useState(false);
  const [processedData, setProcessedData] = useState([]); // Data hasil dari backend

  // Handle file upload for ODS file
  const handleOdsUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOdsFile(file);
      console.log("ODS file uploaded:", file.name);
    }
  };

  // Handle file upload for Excel file
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
      console.log("Excel file uploaded:", file.name);
    }
  };

  // Handle file drop
  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === "ods") setOdsFile(file);
      else if (type === "excel") setExcelFile(file);
    }
    if (type === "ods") setDragActiveOds(false);
    if (type === "excel") setDragActiveExcel(false);
  };

  // Handle process button click
  const handleProcess = async () => {
    if (!odsFile || !excelFile) {
      alert("Mohon unggah kedua file sebelum memproses!");
      return;
    }

    const formData = new FormData();
    formData.append("odsFile", odsFile);
    formData.append("excelFile", excelFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProcessedData(data.processed_data); // Simpan data dari backend
        setShowSheets(true);
        setShowData(true);
        alert("File berhasil diproses!");
      } else {
        alert("Terjadi kesalahan saat memproses file!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal terhubung ke backend!");
    }
  };

  // Filter remarks based on selected filter
  const filteredData = processedData.filter((row) => {
    if (remarksFilter === "all") return true;
    return row.remarks === remarksFilter;
  });

  return (
    <div className="bg-gray-50 p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Dashboard</h1>
      <p className="text-gray-700 mb-6 text-center">
        Silakan unggah file ODS dan Excel, lalu klik tombol "Proses" untuk memulai.
      </p>

      {/* File upload container */}
      <div className="flex flex-wrap justify-between gap-4">
        <div
          className={`flex-1 border-dashed border-2 rounded-lg p-6 text-center ${dragActiveOds ? "border-green-500 bg-green-50" : "border-gray-300"} ${odsFile ? "border-green-500 bg-green-50" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "ods")}
        >
          <p className="text-gray-700">Drag & drop file ODS di sini, atau klik tombol di bawah.</p>
          <input type="file" id="ods-file" accept=".ods" onChange={handleOdsUpload} className="hidden" />
          <label htmlFor="ods-file" className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600 cursor-pointer">
            Pilih File ODS
          </label>
          {odsFile && <p className="mt-2 text-sm text-green-600">File ODS: {odsFile.name}</p>}
        </div>

        <div
          className={`flex-1 border-dashed border-2 rounded-lg p-6 text-center ${dragActiveExcel ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${excelFile ? "border-blue-500 bg-blue-50" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "excel")}
        >
          <p className="text-gray-700">Drag & drop file Excel di sini, atau klik tombol di bawah.</p>
          <input type="file" id="excel-file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="hidden" />
          <label htmlFor="excel-file" className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 cursor-pointer">
            Pilih File Excel
          </label>
          {excelFile && <p className="mt-2 text-sm text-blue-600">File Excel: {excelFile.name}</p>}
        </div>
      </div>

      <button
        onClick={handleProcess}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 w-full my-6"
      >
        Proses
      </button>

      {showSheets && (
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2, 3, 4, 5, 6, 7].map((sheet) => (
            <button
              key={sheet}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-gray-300 shadow-md"
              onClick={() => setSelectedSheet(sheet)}
            >
              Sheet {sheet}
            </button>
          ))}
        </div>
      )}

      {showData && (
        <>
          <div className="mt-6 mb-4 flex justify-center">
            <select
              value={remarksFilter}
              onChange={(e) => setRemarksFilter(e.target.value as "all" | "match" | "needToCheck")}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="all">Semua</option>
              <option value="match">Match</option>
              <option value="needToCheck">Need to Check</option>
            </select>
          </div>

          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="border-b p-2">Pekerjaan</th>
                <th className="border-b p-2">WDR Volume</th>
                <th className="border-b p-2">WDR Unit Price</th>
                <th className="border-b p-2">WDR Total</th>
                <th className="border-b p-2">Draf Volume</th>
                <th className="border-b p-2">Draf Unit Price</th>
                <th className="border-b p-2">Draf Total</th>
                <th className="border-b p-2">Satuan</th>
                <th className="border-b p-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="p-2 text-center">{row.pekerjaan}</td>
                  <td className="p-2 text-center">{row.wdrVolume}</td>
                  <td className="p-2 text-center">{row.wdrUnitPrice}</td>
                  <td className="p-2 text-center">{row.wdrTotal}</td>
                  <td className="p-2 text-center">{row.drafVolume}</td>
                  <td className="p-2 text-center">{row.drafUnitPrice}</td>
                  <td className="p-2 text-center">{row.drafTotal}</td>
                  <td className="p-2 text-center">{row.satuan}</td>
                  <td className="p-2 text-center">{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
