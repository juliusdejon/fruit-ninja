import React, { useState } from 'react'
import { Fruit, GroupBy, ViewBy } from '../types';
import { Select, Text, Title } from "rizzui";

import FruitItem from './fruit-item';
import FruitGroup from './fruit-group'
import FruitTable from './fruit-table';

import { groupBy } from './helpers';

import { groupOptions, viewOptions } from './config';
interface FruitListProps {
  fruits: Fruit[],
  onAddFruit: (fruit: Fruit) => void,
  onBulkAddFruits: (fruits: Fruit[]) => void,
}

function FruitList(props: FruitListProps) {
  const { fruits, onAddFruit, onBulkAddFruits } = props;
  const [group, setGroup] = useState<GroupBy>(GroupBy.None);
  const [view, setView] = useState<ViewBy>(ViewBy.List);

  const action = (
    <div className='flex gap-2'>
      <Select
        className='ml-auto w-[100px]'
        label="View by"
        options={viewOptions}
        value={view}
        onChange={(val: { label: string, value: ViewBy }) => {
          setView(val.value)
        }}
      />
      {view === ViewBy.List &&
        <Select
          className='w-[100px]'
          label="Group by"
          options={groupOptions}
          value={group}
          onChange={(val: { label: string, value: GroupBy }) => {
            setGroup(val.value)
          }}
        />
      }
    </div>
  )

  const groupedFruits = groupBy(fruits, group.toLowerCase() as keyof Fruit);

  const content = view === ViewBy.Table ?
    <FruitTable
      fruits={fruits}
      onAdd={(fruit) => onAddFruit(fruit)}
    />
    : group === GroupBy.None
      ? (
        fruits.map((fruit) => (
          <FruitItem
            key={fruit.id}
            fruit={fruit}
            name={`${fruit.name}
            ${fruit.nutritions.calories}`}
            onAdd={() => onAddFruit(fruit)}
          />
        ))
      ) : (
        Object.entries(groupedFruits).map(([key, fruits]) => (
          <FruitGroup
            key={key}
            fruits={fruits as unknown as Fruit[]}
            name={key}
            onBulkAddFruits={onBulkAddFruits}
            onAdd={(fruit: Fruit) => onAddFruit(fruit)}
          />
        ))
      )

  return (
    <div className='h-[600px] my-auto w-full overflow-y-auto border p-4 rounded-md bg-white'>
      <div className='flex'>
        <div>
          <Title>List of Fruits</Title>
          <Text>Select fruits here</Text>
        </div>
      </div>
      {action}
      <div className='mt-4'>
        {content}
      </div>
    </div >
  )
}

export default FruitList

