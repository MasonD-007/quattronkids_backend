import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [randomData, setRandomData] = useState([]);

  /**
   * Fetches data from the Firestore collection "data".
   * Retrieves 10 documents 
   */
  async function fetchData() {
    try{
    // Check if the data has already been fetched
      if(randomData.length === 0) {
    // Create a query to fetch documents from the collection "data"

        const q = query(
          collection(db, "data"),
          limit(10)
        );

      // Execute the query and get the documents
        const querySnapshot = await getDocs(q);

      // Map the documents to their data
        const randData = querySnapshot.docs.map(doc => doc.data());

      // Update the state with the fetched data
        setRandomData(randData);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  } 

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header style={{ fontWeight: "bold", fontSize: "20px" }}>
        Hello, I will be retrieving data from Firestore in Firebase
      </header>

      <h3>By: Mason Drake</h3>

      {randomData.map((data, index) => (
        <div key={index} style={{ margin: "12px" }}>
          <div style={{ fontWeight: "bold" }}>Company Number {index + 1}</div>
          <li>{data.Address}</li>
          <li>{data.Contact}</li>
          <li>{data.Email}</li>
          <li>{data.Name}</li>
          <li>{data.Narrative}</li>
        </div>
      ))}
    </div>
  );
}

export default App;