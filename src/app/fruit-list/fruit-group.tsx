import React, { useState } from 'react'
import { Button, Text } from "rizzui";
import { Fruit } from '../types';

import FruitItem from './fruit-item';


interface FruitGroupProps {
  name: string,
  fruits: Fruit[],
  onBulkAddFruits: (fruits: Fruit[]) => void,
  onAdd: (fruit: Fruit) => void,
}
function FruitGroup(props: FruitGroupProps) {
  const { name, fruits, onAdd, onBulkAddFruits } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <details
      open={isOpen}
      onToggle={toggleDetails}

      className="mb-4">
      <summary
        className="border-b mb-2 px-4 py-2 cursor-pointer w-full flex">
        <Text as="span"
          onClick={toggleDetails}
        >{name}</Text>
        <Button color='primary' className='ml-auto mr-4' onClick={() => onBulkAddFruits(fruits)}>Add</Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 transition-transform duration-300 group-open:rotate-180 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <div
        className={`pl-4 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className={`transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {fruits.map((fruit) => (
            <FruitItem
              key={fruit.id}
              name={`${fruit.name} ${fruit.nutritions.calories}`}
              fruit={fruit}
              onAdd={() => onAdd(fruit)}
            />
          ))}
        </p>
      </div>

      {/* <div className={`pl-4 transition-transform duration-600 transform ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
      </div> */}
    </details>
  );
}

export default FruitGroup