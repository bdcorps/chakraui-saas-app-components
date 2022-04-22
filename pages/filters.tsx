import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import React, { FunctionComponent } from "react";

interface FilterProps {}

const Filter: FunctionComponent<FilterProps> = () => {
  return (
    <Box>
      <Accordion allowToggle>
        <AccordionItem border="0">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Product Name
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="0">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Cost
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Filter;
