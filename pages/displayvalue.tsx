import { Text, Box, HStack } from "@chakra-ui/react";
import React from "react";

interface DisplayValueProps {
  label: string;
  value: string;
}

const DisplayValue = ({ label, value }: DisplayValueProps) => {
  return (
    <Box>
      <HStack w="full" justify="space-between">
        <Text color="gray.500">{label}</Text>
        <Text>{value}</Text>
      </HStack>
    </Box>
  );
};

export default DisplayValue;
