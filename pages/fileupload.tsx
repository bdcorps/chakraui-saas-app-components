import { CheckIcon, DeleteIcon, SpinnerIcon } from "@chakra-ui/icons";

import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Progress,
  Spacer,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface FileUploadProps {
  onSuccessAction: () => void;
  headerText: string;
  bodyText: string;
  buttonText: string;
  isDanger?: boolean;
}

const SuccessItem = () => {
  return (
    <VStack spacing={1} w="full">
      <VStack w="full">
        <HStack w="full">
          <HStack>
            <CheckIcon w={3} h={3} />
            <Text fontSize="sm">Presentation.pptx</Text>
            <Tag fontSize="xs">1.2MB</Tag>
          </HStack>
          <Spacer />
          <Box>
            <DeleteIcon w={3} h={3} />
          </Box>
        </HStack>
      </VStack>
      <VStack w="full" align="flex-start">
        <Box w="full">
          <Progress value={20} size="xs" colorScheme="green" />
        </Box>
      </VStack>
    </VStack>
  );
};

const LoadingItem = () => {
  return (
    <VStack spacing={1} w="full">
      <VStack w="full">
        <HStack w="full">
          <HStack>
            <SpinnerIcon w={3} h={3} />
            <Text fontSize="sm">Presentation.pptx</Text>
            <Tag size="sm">1.2MB</Tag>
          </HStack>
          <Spacer />
          <Box>
            <DeleteIcon w={3} h={3} />
          </Box>
        </HStack>
      </VStack>
      <Box w="full">
        <Progress value={20} size="xs" colorScheme="gray" />
      </Box>
    </VStack>
  );
};

const ErrorItem = () => {
  return (
    <VStack spacing={1} w="full">
      <VStack w="full">
        <HStack w="full">
          <HStack>
            <SpinnerIcon w={3} h={3} />
            <Text fontSize="sm">Presentation.pptx</Text>
            <Tag size="sm">1.2MB</Tag>
          </HStack>
          <Spacer />
          <Box>
            <DeleteIcon w={3} h={3} />
          </Box>
        </HStack>
      </VStack>
      <Box w="full">
        <Progress value={20} size="xs" colorScheme="red" />
      </Box>
    </VStack>
  );
};

const FileUpload = ({
  onSuccessAction,
  buttonText,
  headerText,
  bodyText,
  isDanger,
}: FileUploadProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    onSuccessAction();
    onClose();
  };

  return (
    <Box
      h="40vh"
      border="1px"
      borderColor="gray.200"
      // bg="gray.50"
      rounded="lg"
      p={4}
      w={400}
    >
      <VStack align="flex-start">
        <Button size="sm"> Select Files</Button>
        <Divider />
        <SuccessItem />
        <LoadingItem />
        <ErrorItem />
      </VStack>
    </Box>
  );
};
export default FileUpload;
