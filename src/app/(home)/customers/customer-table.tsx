import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

import { Customer } from '@/types'
interface CustomerTableProps {
  customer: Customer
}
const CustomerTable = ({ customer }: CustomerTableProps) => {
  const columns = Object.keys(customer);
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column}>{column}</TableColumn>}
      </TableHeader>
      <TableBody items={[customer]}>
        {(item) => (
          <TableRow key={String(item.id)}>
            {(columnKey) => <TableCell key={columnKey}>{item[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CustomerTable


