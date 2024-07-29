import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveBg = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', file);

    try {
      const response = await axios.post('https://background-removerbackend.vercel.app/remove-bg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Expecting binary data
      });

      const url = URL.createObjectURL(response.data);
      setImageSrc(url);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Remove Background</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full mb-4"
        />
        <button
          onClick={handleRemoveBg}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Processing...' : 'Remove Background'}
        </button>
        {imageSrc && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Result:</h2>
            <img src={imageSrc} alt="No background" className="w-full rounded-lg shadow-md" />
            <a
              href={imageSrc}
              download="no-bg.png"
              className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
