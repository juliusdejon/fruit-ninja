import React from 'react'
import { Button, Text } from "rizzui";
import { Fruit } from '../types';

interface FruitItemProps {
  name: string,
  fruit: Fruit,
  onAdd: () => void,
}

function FruitItem(props: FruitItemProps) {
  const { onAdd, name } = props;
  return (
    <div className="border-b mb-2 px-4 py-2">
      <div className='flex items-center'>
        <Text>{name}</Text>
        <Button color='primary' className='ml-auto' onClick={() => onAdd()}>Add</Button>
      </div>
    </div>
  );
}

export default FruitItem