import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";

const EmptyState: NextPage = () => {
  return (
    <VStack align="flex-start" justify="flex-start">
      <Box w={30} h={30} bg="gray.400"></Box>
      <Text>Use reviews to block fewer legitimate payments.</Text>
      <Text>
        With Radar for Fraud Teams , you can set up rules to manually review
        select payments, helping you allow more legitimate payments and prevent
        revenue loss.
      </Text>
    </VStack>
  );
};
export default EmptyState;
