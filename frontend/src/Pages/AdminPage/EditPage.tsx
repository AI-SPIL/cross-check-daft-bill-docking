import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mengambil data dari location.state yang dikirim dari Dashboard
  const { sheetName, data: initialData } = location.state || {};
  const [tableData, setTableData] = useState(initialData || []);

  // Handle perubahan pada data tabel
  const handleInputChange = (e, rowIndex, column) => {
    const updatedTable = [...tableData];
    updatedTable[rowIndex][column] = e.target.value;
    setTableData(updatedTable);
  };

  // Handle tombol "Simpan"
  const handleSave = () => {
    console.log("Data yang disimpan:", tableData);
    alert("Perubahan telah disimpan!");
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  // Handle tombol "Batal"
  const handleCancel = () => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
      navigate(-1);
    }
  };

  if (!sheetName || !initialData) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-bold">
          Data tidak ditemukan. Harap kembali ke halaman dashboard.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Edit Sheet: {sheetName}
      </h1>

      <table className="table-auto w-full text-sm border-collapse border border-gray-300 mb-4">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Rincian Pekerjaan</th>
            <th className="border border-gray-300 px-4 py-2">Volume</th>
            <th className="border border-gray-300 px-4 py-2">Unit Price</th>
            <th className="border border-gray-300 px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.detail || ""}
                  onChange={(e) => handleInputChange(e, index, "detail")}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.wdrVolume || ""}
                  onChange={(e) => handleInputChange(e, index, "wdrVolume")}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.wdrUnitPrice || ""}
                  onChange={(e) => handleInputChange(e, index, "wdrUnitPrice")}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.remarks || ""}
                  onChange={(e) => handleInputChange(e, index, "remarks")}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Batal
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
