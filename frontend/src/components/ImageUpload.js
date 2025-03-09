import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ text: "Please select a file first!", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedImagesUrl((prevImages) => [...prevImages, response.data.imageUrl]); 
      setMessage({ text: "Image uploaded successfully!", type: "success" });
      setFile(null); // Clear file selection after upload
    } catch (error) {
      setMessage({ text: "Error uploading image. Please try again.", type: "error" });
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>

      <label htmlFor="file-upload" className="custom-file-upload">
        Choose File
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>Upload</button>

      {message.text && (
        <div className={`response-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {uploadedImagesUrl.length > 0 && (
        <div className="preview-container">
          <p>Uploaded Images:</p>
          <div className="image-grid">
            {uploadedImagesUrl.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Uploaded ${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
