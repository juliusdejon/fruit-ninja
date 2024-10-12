import React from 'react'
import { Button, Table } from 'rizzui'

import { Fruit } from '../types';

interface FruitTableProps {
  fruits: Fruit[],
  onAdd?: (fruit: Fruit) => void,
}

function FruitTable(props: FruitTableProps) {
  const { fruits, onAdd } = props;

  return (
    <CommonTable onAdd={onAdd}>
      {fruits.map((fruit) =>
        <Table.Row>
          <Table.Cell>{fruit.name}</Table.Cell>
          <Table.Cell>{fruit.family}</Table.Cell>
          <Table.Cell>{fruit.order}</Table.Cell>
          <Table.Cell>{fruit.genus}</Table.Cell>
          <Table.Cell>{fruit.nutritions.calories}</Table.Cell>
          {onAdd &&
            <Table.Cell><Button color='primary' onClick={() => onAdd(fruit)}>Add</Button></Table.Cell>
          }
        </Table.Row>
      )}
    </CommonTable>
  )
}


function CommonTable({ children, onAdd }: { children: React.ReactNode, onAdd?: (fruit: Fruit) => void, }) {
  return (
    <Table variant='minimal'>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Family</Table.Head>
          <Table.Head>Order</Table.Head>
          <Table.Head>Genus</Table.Head>
          <Table.Head>Amount of Calories</Table.Head>
          {onAdd && <Table.Head>Action </Table.Head>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {children}
      </Table.Body>
    </Table>
  )
}
export default FruitTable