import React, { useState } from 'react';
import { FiUpload, FiCheck, FiAlertTriangle } from 'react-icons/fi';

const AttendanceUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    } else {
      setFile(null);
      setMessage({ type: 'error', text: 'Please upload a valid Excel file (.xlsx)' });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file first' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/student/upload-attendance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: data.message });
      setFile(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error uploading file. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Attendance Data</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex-1">
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <FiUpload className="mr-2" />
              <span>{file ? file.name : 'Choose Excel File'}</span>
            </div>
          </label>
          
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`px-4 py-2 rounded-md flex items-center ${
              !file || uploading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-red-700 text-white hover:bg-red-800'
            }`}
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="mr-2" />
                Upload
              </>
            )}
          </button>
        </div>

        {message.text && (
          <div className={`p-3 rounded-md flex items-center ${
            message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message.type === 'error' ? (
              <FiAlertTriangle className="mr-2" />
            ) : (
              <FiCheck className="mr-2" />
            )}
            {message.text}
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>• File must be in .xlsx format</p>
          <p>• Required columns: Roll Number, Name, Subject1, Subject2, Subject3</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceUpload; 