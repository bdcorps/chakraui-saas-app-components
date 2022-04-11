import {
  ChevronDownIcon,
  DragHandleIcon,
  ExternalLinkIcon,
  MoonIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Badge,
  Container,
  Center,
  Flex,
  Square,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Spacer,
  Wrap,
  WrapItem,
  SimpleGrid,
} from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";

import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, useRowSelect } from "react-table";

const DataTable = () => {
  const data = React.useMemo(
    () => [
      {
        fromUnit: "inches",
        toUnit: "millimetres (mm)",
        factor: "25.4",
        a: "25.4",
        b: "25.4",
        c: "25.4",
      },
      {
        fromUnit: "feet",
        toUnit: "centimetres (cm)",
        factor: "25.4",
        a: "25.4",
        b: "25.4",
        c: "25.4",
      },
      {
        fromUnit: "yards",
        toUnit: "metres (m)",
        factor: "25.4",
        a: "25.4",
        b: "25.4",
        c: "25.4",
      },
    ],
    []
  );

  const columns: any = React.useMemo(
    () => [
      {
        Header: "To convert",
        accessor: "fromUnit",
      },
      {
        Header: "Into",
        accessor: "toUnit",
      },
      {
        Header: "Multiply by",
        accessor: "factor",
      },
      {
        Header: "A",
        accessor: "a",
      },
      {
        Header: "B",
        accessor: "b",
      },
      {
        Header: "C",
        accessor: "c",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy, useRowSelect, (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }: any) => {
            console.log(getToggleAllRowsSelectedProps());

            const { onChange, indeterminate, checked } =
              getToggleAllRowsSelectedProps();
            return (
              <div>
                <Checkbox
                  onChange={onChange}
                  isIndeterminate={indeterminate}
                  isChecked={checked}
                />
              </div>
            );
          },
          Cell: ({ row }: any) => {
            console.log(row.getToggleRowSelectedProps());
            const { onChange, indeterminate, checked } =
              row.getToggleRowSelectedProps();
            return (
              <div>
                <Checkbox
                  onChange={onChange}
                  isIndeterminate={indeterminate}
                  isChecked={checked}
                />
              </div>
            );
          },
        },
        ...columns,
      ]);
    });

  // const colLength = data[0].length;
  const allOptions: any = {};

  for (const k of Object.keys(data[0])) {
    allOptions[k] = [
      ...new Set(
        data.map((d: any) => {
          return d[k];
        })
      ),
    ];
  }

  return (
    <Box w="full">
      <HStack spacing={4}>
        <Input placeholder="Search" w="40%" />

        <Spacer />

        <Popover>
          <PopoverTrigger>
            <Button rightIcon={<DragHandleIcon />} variant="outline">
              Filters
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverHeader fontWeight="medium">Filters</PopoverHeader>
              <PopoverBody>
                <VStack spacing={4}>
                  {Object.keys(data[0]).map((option: any, j: number) => {
                    const a = allOptions[option];
                    return (
                      <Select
                        placeholder={`Select ${option}`}
                        variant="unstyled"
                        key={j}
                      >
                        {a.map((b: any, i: number) => (
                          <option value="option1" key={i}>
                            {b}
                          </option>
                        ))}
                      </Select>
                    );
                  })}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                console.log("click download");
              }}
            >
              Edit
            </MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Box overflowX="auto">
        <Table {...getTableProps()} size="sm" mt={6} width="max-content">
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column: any, i) => (
                  <Th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell: any, i) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                      key={i}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <HStack p={4}>
        <Text color="gray.500" fontSize="sm">
          Showing 1 to 5 of 42 results
        </Text>
        <Spacer />
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </HStack>
    </Box>
  );
};

export default DataTable;
