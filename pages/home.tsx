import { ExternalLinkIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";
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
import { Button, IconButton, Input, Select } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import DrawerHome from "./drawer";
import DataTable from "./table";

const Home: NextPage = () => {
  return (
    <Box>
      <DrawerHome>
        <DataTable />
      </DrawerHome>
    </Box>
  );
};
export default Home;
