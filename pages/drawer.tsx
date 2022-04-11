import {
  ArrowForwardIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  MoonIcon,
  SearchIcon,
  StarIcon,
  SunIcon,
} from "@chakra-ui/icons";

import {
  Button,
  IconButton,
  Input,
  Select,
  chakra,
  Text,
  Link,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
  Box,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";

const Contents = () => {
  return (
    <VStack
      align="flex-start"
      justify="space-between"
      h="100vh"
      p={4}
      w="250px"
      bg="gray.50"
    >
      <Box w="full">
        <Heading fontSize="lg">SaaSBase</Heading>

        <VStack mt={10} align="flex-start" spacing={0} w="full">
          <Button
            width="100%"
            justifyContent="flex-start"
            size="sm"
            leftIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            variant="ghost"
          >
            Home
          </Button>

          <Button
            width="100%"
            justifyContent="flex-start"
            size="sm"
            leftIcon={<StarIcon />}
            colorScheme="blue"
            variant="ghost"
          >
            Orders
          </Button>

          <Button
            width="100%"
            justifyContent="flex-start"
            size="sm"
            leftIcon={<SunIcon />}
            colorScheme="blue"
            variant="ghost"
          >
            Reports
          </Button>

          <Box py={4}>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">
              SALES CHANNELS
            </Text>
          </Box>

          <Button
            width="100%"
            justifyContent="flex-start"
            size="sm"
            leftIcon={<MoonIcon />}
            colorScheme="blue"
            variant="ghost"
          >
            Online Store
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};
const DrawerExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Search database"
        variant="ghost"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.50">
          <DrawerCloseButton />
          {/* <DrawerHeader>SaaSBase</DrawerHeader> */}

          <DrawerBody>
            <Contents />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Header = ({ children }: any) => {
  return (
    <chakra.header id="header">
      <Flex w="100%" align="flex-start" justify="flex-start">
        <Box display={{ base: "flex", md: "none" }} p={4}>
          <DrawerExample />
        </Box>

        <Box display={{ base: "none", md: "flex" }}>
          <Contents />
        </Box>

        <VStack w="full">
          <Button variant="outline" m={4}>
            Log in
          </Button>

          <Box alignSelf="flex-start">{children}</Box>
        </VStack>
      </Flex>
    </chakra.header>
  );
};

const DrawerHome: NextPage = ({ children }: any) => {
  return (
    <Box>
      <Header>{children}</Header>
    </Box>
  );
};

export default DrawerHome;

// https://levelup.gitconnected.com/create-a-responsive-navigation-bar-using-chakraui-6489473e933
