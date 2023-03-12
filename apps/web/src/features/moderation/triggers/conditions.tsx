import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiTrash } from 'react-icons/hi';

const ConditionEntry = () => {
  return (
    <Box p={4} bg="blackAlpha.400" rounded="xl">
      <HStack>
        <Heading size="sm">Condition #1</Heading>
        <Spacer />
        <IconButton aria-label="close" icon={<HiTrash />} />
      </HStack>
      <SimpleGrid columns={3} mt={4}>
        <GridItem colSpan={1}>
          <Text>Condition type</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Stack>
            <Select>
              <option>Text</option>
              <option>Photo</option>
              <option>Sticker</option>
            </Select>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

function TriggerConditions() {
  const [] = useState();
  const [entry, setEntry] = useState(false);

  return (
    <Box>
      <ConditionEntry />

      <Button
        mt={4}
        variant={entry ? 'outline' : 'solid'}
        onClick={() => setEntry(!entry)}
      >
        {entry ? 'Cancel' : 'Add Condition'}
      </Button>
    </Box>
  );
}

export default TriggerConditions;
