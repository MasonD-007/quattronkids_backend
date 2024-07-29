import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [randomData, setRandomData] = useState([]);

  async function fetchData() {
    
    const querySnapshot = await getDocs(query(collection(db, "data"), where("random", ">=", Math.random() * 100) ,limit(10)));
    /*const allData = querySnapshot.docs.map(doc => doc.data());
    // Shuffle the array
    const shuffledData = allData.sort(() => 0.5 - Math.random());

    // Get the first 10 items from the shuffled array
    const selectedData = shuffledData.slice(0, 10);

    setRandomData(selectedData);*/
    const randData = querySnapshot.docs.map(doc => doc.data());
    console.log(randData);
    setRandomData(randData);

  }

  useEffect(() => {
    //fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLocalStorage() {
    console.log(localStorage)
    localStorage.clear();
    console.log("Local Storage Cleared");
  };

  return (
    <div>
      <header style={{ fontWeight: "bold", fontSize: "large" }}>
        Hello, I will be retrieving data from Firestore in Firebase
      </header>

      <button style={{ margin: "12px", fontSize: "20px" }} onClick={fetchData}>
        Refresh The page to get new random data
      </button>

      
        {randomData.map((data, index) => (
          <div key={index} style={{ margin: "12px" }}>
            <div style={{ fontWeight: "bold" }}>Data {index + 1}</div>
            <li>{data.Address}</li>
            <li>{data.Contact}</li>
            <li>{data.Email}</li>
            <li>{data.Name}</li>
            <li>{data.Narrative}</li>
          </div>
        ))}
      
        <button onClick={handleLocalStorage}>Clear Local Storage</button>
    </div>
  );
}

export default App;