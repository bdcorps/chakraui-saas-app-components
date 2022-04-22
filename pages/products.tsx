import {
  Box,
  Button,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
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
          <Heading>Products</Heading>
          <Text color="gray.400">All important metrics at a glance</Text>
        </Box>

        <Tabs>
          <TabList>
            <Tab>All Products</Tab>
            <Tab>Archived</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </HStack>
  );
};
export default Home;
