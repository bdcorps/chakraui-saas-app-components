import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import DisplayValue from "./displayvalue";
import DrawerHome from "./drawer";
import DataTable from "./table";

const Home: NextPage = () => {
  return (
    <HStack align="flex-start" justify="flex-start">
      <DrawerHome />
      <Box p={10} w="full">
        <Box mb={4}>
          <Heading>Hello Olivia</Heading>
          <Text color="gray.400">All important metrics at a glance</Text>
        </Box>

        <DataTable />

        <Box mb={4}>
          <Text fontWeight="medium">Transaction History</Text>
        </Box>
        <Box maxW={500}>
          <DisplayValue label="Orders" value="$200.67"></DisplayValue>
          <DisplayValue label="Products" value="7"></DisplayValue>
          <DisplayValue label="Rate" value=".67"></DisplayValue>
        </Box>
      </Box>
    </HStack>
  );
};
export default Home;
