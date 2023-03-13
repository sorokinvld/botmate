import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiTrash } from 'react-icons/hi';

const ActionTypes = [
  'send-message',
  'ban',
  'kick',
  'mute',
  'unrestrict',
  'delete',
  'warn',
] as const;

type Action = {
  type: (typeof ActionTypes)[number];
  value: string;
};

type ActionEntryProps = {
  index: number;
  onDelete?: () => void;
};
const ActionEntry = ({ index, onDelete }: ActionEntryProps) => {
  const form = useForm<Action>();
  const d = useDisclosure();

  return (
    <Box borderWidth="1px" rounded="lg">
      <HStack p={4} bg="#32323c5e" roundedTop="lg" userSelect="none">
        <Heading size="sm">Action #{index}</Heading>
        <Text opacity={0.5} cursor="pointer" onClick={d.onToggle}>
          {d.isOpen ? 'Hide' : 'Show'} action details
        </Text>
        <Spacer />
        <IconButton
          aria-label="close"
          icon={<HiTrash />}
          onClick={onDelete ?? (() => {})}
        />
      </HStack>

      <Stack p={4} spacing={4} display={d.isOpen ? 'block' : 'none'}>
        <SimpleGrid columns={2}>
          <Text>Action type</Text>
          <Select {...form.register('type')}>
            {ActionTypes.map((actionType) => (
              <option key={actionType}>{actionType}</option>
            ))}
          </Select>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

type TriggerActionsProps = {};
function TriggerActions({}: TriggerActionsProps) {
  const [actions, setActions] = useState<Action[]>([]);

  return (
    <>
      <Stack spacing={4}>
        {actions.map((action, index) => (
          <>
            <ActionEntry
              index={index + 1}
              onDelete={() => {
                setActions(actions.filter((_, i) => i !== index));
              }}
            />
            {actions.length - 1 !== index && <Divider />}
          </>
        ))}
      </Stack>

      <Button
        mt={6}
        variant="solid"
        onClick={() => {
          setActions([...actions, { type: 'send-message', value: '' }]);
        }}
      >
        add action
      </Button>
    </>
  );
}

export { TriggerActions };
