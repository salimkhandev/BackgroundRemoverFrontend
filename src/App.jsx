import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
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
        responseType: 'blob',
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
            Magic Background Remover
          </h1>
          <p className="text-lg text-gray-600">
            Upload your image and watch the background disappear like magic!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:border-purple-300 hover:bg-gray-50 transition-all duration-200 rounded-xl cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-500">
                      {fileName}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="opacity-0"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={handleRemoveBg}
              disabled={!file || loading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                loading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600'
              } ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                'Remove Background'
              )}
            </button>
          </div>

          {imageSrc && (
            <div className="border-t border-gray-200 p-6 md:p-8 bg-gray-50 rounded-b-2xl animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Result</h2>
                <a
                  href={imageSrc}
                  download="no-bg.png"
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Download</span>
                </a>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-200">
                <img
                  src={imageSrc}
                  alt="No background"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
