import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import TriggerConditions from './conditions';

type CreateTriggerProps = {};
function CreateTrigger({}: CreateTriggerProps) {
  const form = useForm({
    defaultValues: {
      conditions: [],
    },
  });

  const addCondition = () => {};

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter trigger name" />
      </FormControl>

      <FormControl>
        <FormLabel>Mode</FormLabel>
        <Select>
          <option>All messages</option>
          <option>Only replies</option>
          <option>Only replies to bot</option>
        </Select>
      </FormControl>

      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Conditions</FormLabel>
          <TriggerConditions />
        </FormControl>
      </GridItem>
    </SimpleGrid>
  );
}

export { CreateTrigger };
