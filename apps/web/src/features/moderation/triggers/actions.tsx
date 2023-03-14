import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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

export type Action = {
  type: (typeof ActionTypes)[number];
  value: string;
  mute_duration?: string;
  ban_duration?: string;
  warn_count?: number;
};

type ActionEntryProps = {
  index: number;
  onDelete?: () => void;
  onChange?: (action: Action) => void;
  defaultValues?: Action;
};
const ActionEntry = ({
  index,
  onDelete,
  onChange,
  defaultValues,
}: ActionEntryProps) => {
  const form = useForm<Action>({
    defaultValues,
  });
  const d = useDisclosure();
  const actionType = form.watch('type');

  useEffect(() => {
    onChange?.(form.getValues() as Action);
  }, [form.watch()]);

  return (
    <Box borderWidth="1px" rounded="lg">
      <HStack p={4} bg="#32323c5e" roundedTop="lg" userSelect="none">
        <Heading size="sm">Action #{index + 1}</Heading>
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

        {actionType === 'send-message' ? (
          <Textarea
            {...form.register('value')}
            placeholder="Message"
            rows={6}
            resize="none"
            variant="brand"
          />
        ) : actionType === 'mute' ? (
          <SimpleGrid columns={2}>
            <Text>Mute for</Text>
            <Input
              autoFocus
              placeholder="Enter time (eg: 1 day)"
              {...form.register('mute_duration')}
            />
          </SimpleGrid>
        ) : actionType === 'warn' ? (
          <SimpleGrid columns={2}>
            <Text>Warn count</Text>
            <Input
              autoFocus
              placeholder="Enter warnings count"
              {...form.register('warn_count')}
            />
          </SimpleGrid>
        ) : actionType === 'ban' ? (
          <SimpleGrid columns={2}>
            <Text>Ban for</Text>
            <Input
              autoFocus
              placeholder="Enter time (eg: 1 day)"
              {...form.register('ban_duration')}
            />
          </SimpleGrid>
        ) : null}
      </Stack>
    </Box>
  );
};

type TriggerActionsProps = {
  onChange?: (actions: Action[]) => void;
};
function TriggerActions({ onChange }: TriggerActionsProps) {
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    onChange?.(actions);
  }, [actions]);

  return (
    <>
      <Stack spacing={4}>
        {actions.map((action, index) => (
          <>
            <ActionEntry
              key={index}
              index={index}
              defaultValues={action}
              onDelete={() => {
                setActions(actions.filter((_, i) => i !== index));
              }}
              onChange={(action) => {
                setActions(actions.map((a, i) => (i === index ? action : a)));
              }}
            />
            {actions.length - 1 !== index && <Divider key={index} />}
          </>
        ))}
      </Stack>

      <Button
        mt={6}
        onClick={() => {
          setActions([...actions, { type: 'send-message', value: '' }]);
        }}
      >
        Add Action
      </Button>
    </>
  );
}

export { TriggerActions };
