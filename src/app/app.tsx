import React, { useState, useEffect } from 'react';

import FruitList from './fruit-list/index';
import Jar from './jar/index';
import { Fruit } from './types';
import { Loader, Title } from 'rizzui';


const API_URL = `https://api.allorigins.win/get?url=${encodeURIComponent('https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws')}`;

function App() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [addedFruits, setAddedFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setFruits(JSON.parse(result.contents));
      } catch (error) {
        setError((error as any)?.error?.message || 'Something went wrong.');
        console.error('Error fetching data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 3000);
      }
    };

    fetchData();
  }, []);

  const onAddFruit = (fruit: Fruit) => {
    setAddedFruits((prev) => [...prev, fruit]);
  }

  const onBulkAddFruits = (fruits: Fruit[]) => {
    setAddedFruits((prev) => [...prev, ...fruits]);
  }
  const onEmpty = () => {
    setAddedFruits([]);
  }

  if (loading) {
    return (

      <div className="flex items-center justify-center h-screen bg-gradient-to-t from-blue-200 to-purple-200">
        <div className='items-center flex flex-col gap-10'>
          <Title>Hang tight, we're picking the freshest fruits for you...</Title>
          <Loader size='xl' />
        </div>
      </div>
    )
  }
  if (error && error.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-t from-blue-200 to-purple-200">
        <div className='items-center ' >
          <Title>{error}</Title>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-blue-200 to-purple-200">
      <div className='flex w-[95%] justify-between gap-10 m-auto ' >
        <FruitList
          fruits={fruits}
          onAddFruit={onAddFruit}
          onBulkAddFruits={onBulkAddFruits}
        />
        <Jar addedFruits={addedFruits} onEmpty={onEmpty} />
      </div>
    </div>
  );
}

export default App;
