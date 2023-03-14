import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { HiSave } from 'react-icons/hi';
import { Action, TriggerActions } from './actions';
import TriggerConditions, { Condition } from './conditions';

const TriggerModes = ['all', 'replies', 'replies-to-bot'] as const;
type Trigger = {
  name: string;
  mode: (typeof TriggerModes)[number];
  actions: Action[];
  conditions: Condition[];
};

type CreateTriggerProps = {};
function CreateTrigger({}: CreateTriggerProps) {
  const form = useForm<Trigger>({
    defaultValues: {
      conditions: [],
      actions: [],
    },
  });
  const name = form.watch('name');

  const addCondition = () => {};

  return (
    <>
      <HStack
        p={4}
        borderBottomWidth="1px"
        // position="sticky"
        // top={0}
      >
        <Heading size="md">{name || 'Unnamed Trigger'}</Heading>
        <Spacer />
        <Button variant="solid" leftIcon={<FiSave />}>
          save
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} p={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter trigger name" {...form.register('name')} />
        </FormControl>

        <FormControl>
          <FormLabel>Mode</FormLabel>
          <Select {...form.register('mode')}>
            {TriggerModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </Select>
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} p={4} spacing={6}>
        <FormControl>
          <FormLabel>Conditions</FormLabel>
          <TriggerConditions />
        </FormControl>

        <FormControl>
          <FormLabel>Actions</FormLabel>
          <TriggerActions
            onChange={(actions) => {
              form.setValue('actions', actions);
            }}
          />
        </FormControl>
      </SimpleGrid>
    </>
  );
}

export { CreateTrigger };
