import React, {useEffect, useState} from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [randomData, setRandomData] = useState([]);
  
  async function fetchData() {
      const querySnapshot = await getDocs(query(collection(db, "data"), limit(1000)));
      const allData = querySnapshot.docs.map(doc => doc.data());
      // Shuffle the array
      const shuffledData = allData.sort(() => 0.5 - Math.random());

      // Get the first 10 items from the shuffled array
      const selectedData = shuffledData.slice(0, 10);

      setRandomData(selectedData);
    }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <header style={{ fontWeight: "bold", fontSize: "large" }}>
        Hello, I will be retrieving data from firestore in firebase
      </header>

      <button style={{ margin: "12px", fontSize: "20px" }} onClick={fetchData}>
        Refresh The Page or Click Here To Get New Data From The Database
      </button>

      <div>
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
      </div>
    </div>
  );
}

export default App;