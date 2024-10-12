import React, { useMemo } from 'react'
import { Fruit } from '../types';
import { Title, Text, Button } from 'rizzui';
import { fruitsEmoji, fruitsColor } from './config';
import FruitTable from '../fruit-list/fruit-table';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface JarProps {
  addedFruits: Fruit[],
  onEmpty: () => void,
}

function Jar(props: JarProps) {
  const { addedFruits, onEmpty } = props;

  const gridSize = 6;
  const cellSize = 23;


  const totalCalories = useMemo(() => {
    return addedFruits.reduce((sum, fruit) => sum + fruit.nutritions.calories, 0);
  }, [addedFruits]);

  const data = useMemo(() => {
    return Object.values(
      addedFruits.reduce((acc, fruit) => {
        if (acc[fruit.name]) {
          acc[fruit.name].calories += fruit.nutritions.calories;
        } else {
          acc[fruit.name] = {
            name: fruit.name,
            calories: fruit.nutritions.calories,
          };
        }
        return acc;
      }, {} as Record<string, { name: string; calories: number }>)
    );
  }, [addedFruits]);



  const hasFruit = addedFruits.length > 0;

  return (
    <div
      style={{ width: hasFruit ? '100%' : '40%' }}
      className='h-[600px] my-auto overflow-y-auto border p-4 rounded-md bg-white'>
      <div className='flex'>
        <div>
          <Title>Jar</Title>
          <Text>View Added fruits here</Text>
        </div>
      </div>
      <div className='flex my-4'>
        <Button className='ml-auto' onClick={() => onEmpty()}>Empty Jar</Button>
      </div>


      <div className='flex gap-20 my-4'>
        <div className='flex flex-col items-center gap-5' style={{ margin: !hasFruit ? 'auto' : '' }}>
          <div className='text-2xl font-semibold'>Total Calories</div>
          <div className='text-3xl font-bold'>{totalCalories.toLocaleString()}</div>
          <div className="mx-auto relative w-[140px] h-[230px] bg-gray-50 border rounded-lg shadow-lg overflow-hidden"
            style={{ borderRadius: '20px', borderTopLeftRadius: '45px', borderTopRightRadius: '45px' }}>
            <div style={{ borderWidth: '8px', borderColor: 'honeydew' }} className='w-full border border-1 shadow-sm absolute h-4'>&nbsp;</div>
            {addedFruits.map((fruit, index) => {
              const totalFruits = addedFruits.length;
              const row = Math.floor((totalFruits - 1 - index) / gridSize);
              const col = (totalFruits - 1 - index) % gridSize;
              return (
                <div
                  key={fruit.id}
                  className="falling-fruit text-2xl rounded-full"
                  style={{
                    left: `${col * cellSize}px`,
                    top: `-${row * cellSize}px`,
                    animation: 'fall 1s ease forwards',
                  }}
                >
                  {fruitsEmoji[fruit.name]}
                </div>
              );
            })}
          </div>

        </div>

        {hasFruit &&
          <div className="flex flex-col w-full ">
            <div className='flex w-full mx-auto items-center' >
              <PieChart width={380} height={420}>
                <Pie
                  data={data}
                  cx={180}
                  cy={180}
                  dataKey="calories"
                  nameKey="name"
                  label={({ name, calories }) => `${name}: ${calories}`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={fruitsColor[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        }
      </div>


      {hasFruit &&
        <div className='h-10 overflow-y mt-4'>
          <FruitTable fruits={addedFruits} />
        </div>
      }
    </div>
  )
}




export default Jar