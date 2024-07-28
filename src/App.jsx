import React, { useState } from 'react';
import { Firestore } from 'firebase/firestore';

function App() {
  const [data, setData] = useState([]);

 const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n');
      const data = rows.map(row => row.split(','));
      setData(data);
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    console.log("Getting data from the file");


    console.log("Uploading data to firestore");
    Firestore.
      .then(() => {
        console.log("Data uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };

  return (
    <div>
      <header style={{ fontWeight: "bold", fontSize: "large" }}>
        Hello, I will be retrieving data from firestore in firebase
      </header>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      <button style={{ margin: "12px", fontSize: "20px" }} onClick={handleUpload}>
        Click me to upload the data to firestore
      </button>
    </div>
  );
}

export default App;