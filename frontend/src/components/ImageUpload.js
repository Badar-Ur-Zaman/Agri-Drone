import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // setUploadedImageUrl(response.data.imageUrl);
      setUploadedImagesUrl((prevImages) => [...prevImages, response.data.imageUrl]); // Append new image
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Upload an Image</h2>
        
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose File
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} />

        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        {uploadedImagesUrl && (
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
    </div>
  );
};

export default ImageUpload;
