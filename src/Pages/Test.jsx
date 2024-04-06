import React, { useState } from 'react';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({ cloud_name: 'drgqnbnwk' });

const Test = () => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const imageUrlsArray = files.map((file) => URL.createObjectURL(file));
    setImageUrls(imageUrlsArray);
  };

  const uploadImages = async () => {
    const promises = images.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'Online_Shoping123'); // Replace with your upload preset

      try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${'drgqnbnwk'}/upload`,
          formData
        );
        return response.data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    });

    const uploadedImageUrls = await Promise.all(promises);
    console.log('Uploaded Image URLs:', uploadedImageUrls);

    // Push uploadedImageUrls to your database
    // Example: axios.post('/api/upload-images', { images: uploadedImageUrls });
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <button onClick={uploadImages}>Upload Images</button>
      <div>
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`image_${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }} />
        ))}
      </div>
    </div>
  );
};

export default Test;
