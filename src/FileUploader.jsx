import React, { useState } from 'react';
import axios from 'axios';
import './FileUploader.css'; // Import external CSS for better styling

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Validate file type (only allow CSV files)
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setErrorMessage('Please upload a valid CSV file.');
      setFile(null); // Clear the file selection
      setSuccessMessage('');
    } else {
      setFile(selectedFile);
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file first!');
      return;
    }

    setUploading(true); // Show loading state

    try {
      // Step 1: Request a presigned URL from API to upload the file to S3
      const response = await axios.post('https://133t0k5vhb.execute-api.us-east-2.amazonaws.com/dev/generatepresignedurl', {
        fileName: file.name,
        fileType: file.type,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
      console.log("response",response);
      

      const { uploadURL } = response.data;

      // Step 2: Upload the file to S3 using the presigned URL
      await axios.put(uploadURL, file, {
        headers: {
          'Content-Type': file.type,
          'Accept': 'application/json'
        },
      });

      // Step 3: Save file info to the database (like file URL)
      // const saveFileResponse = await axios.post('https://your-api-endpoint.com/save-file', {
      //   fileName: file.name,
      //   fileUrl: uploadURL, // Or the final S3 URL after upload
      //   fileType: file.type,
      // });

      // if (saveFileResponse.status === 200) {
      //   setSuccessMessage('File uploaded and saved to the database successfully!');
      // } else {
      //   setSuccessMessage('File uploaded successfully, but failed to save in the database.');
      // }
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('File upload failed. Please try again later.');
    }

    setUploading(false); // Hide loading state
  };

  return (
    <div className="file-uploader-container">
      <h1>Upload Your CSV File</h1>
      <div className="upload-box">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          {file ? file.name : 'Drag & drop or click to select a CSV file'}
        </label>
        <p className="error-message">{errorMessage}</p>
      </div>

      {uploading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default FileUploader;