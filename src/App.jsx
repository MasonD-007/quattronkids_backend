import React, {useEffect, useState} from 'react';
import { getDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [randomData, setRandomData] = useState([]);

  useEffect(() => {
    handleDataRetrieve();
  }, []);

  const handleDataRetrieve = async () => {
    const querySnapshot = await getDoc(collection(db, "data"));
    const allData = querySnapshot.docs.map(doc => doc.data());
    
    // Shuffle the array and get 10 random elements
    const shuffledData = allData.sort(() => 0.5 - Math.random());
    const selectedData = shuffledData.slice(0, 10);

    setRandomData(selectedData);
  };

  return (
    <div>
      <header style={{ fontWeight: "bold", fontSize: "large" }}>
        Hello, I will be retrieving data from firestore in firebase
      </header>

      <button style={{ margin: "12px", fontSize: "20px" }} >
        Refresh The page to get new random data
      </button>
      <div>
        {randomData.map((data, index) => (
          <div key={index}>
            {JSON.stringify(data)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;