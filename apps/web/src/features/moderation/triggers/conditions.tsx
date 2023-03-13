import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiTrash } from 'react-icons/hi';

const ConditionTypes = ['text', 'photo', 'sticker', 'regex'] as const;
const MatchTypes = ['full-match', 'partial', 'starts-with', 'regex'] as const;

type Condition = {
  type: (typeof ConditionTypes)[number];
  matchType: (typeof MatchTypes)[number];
  value: string;
};

type ConditionEntryProps = {
  index: number;
  onDelete?: () => void;
  onChange?: (condition: Condition) => void;
};
const ConditionEntry = ({ index, onDelete, onChange }: ConditionEntryProps) => {
  const form = useForm<Condition>();
  const d = useDisclosure();

  useEffect(() => {
    onChange?.(form.getValues());
  }, [form.watch()]);

  return (
    <Box borderWidth="1px" rounded="lg">
      <HStack p={4} bg="#32323c5e" roundedTop="lg" userSelect="none">
        <Heading size="sm">Condition #{index}</Heading>
        <Text opacity={0.5} cursor="pointer" onClick={d.onToggle}>
          {d.isOpen ? 'Hide' : 'Show'} condition details
        </Text>
        <Spacer />
        <IconButton
          aria-label="close"
          icon={<HiTrash />}
          onClick={onDelete ?? (() => {})}
        />
      </HStack>

      <Stack p={4} spacing={4} display={d.isOpen ? 'block' : 'none'}>
        <Box>
          <Text>Condition value</Text>
          <Textarea
            mt={2}
            placeholder="Enter condition value"
            rows={5}
            resize="none"
            flex={1}
            variant="brand"
            {...form.register('value')}
          />
        </Box>

        <SimpleGrid columns={2}>
          <Text>Message type</Text>

          <Select {...form.register('type')}>
            {ConditionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </SimpleGrid>

        <SimpleGrid columns={2}>
          <Text>Match type</Text>
          {/* todo: better text styling */}
          <Select {...form.register('matchType')}>
            {MatchTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

function TriggerConditions() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [entry, setEntry] = useState(false);

  return (
    <Box>
      <Stack spacing={4}>
        {conditions.map((condition, index) => (
          <>
            <ConditionEntry
              key={index}
              index={index + 1}
              onDelete={() => {
                setConditions(conditions.filter((_, i) => i !== index));
              }}
              onChange={(val) => {
                console.log('val', val);
              }}
            />
            {conditions.length - 1 !== index && <Divider />}
          </>
        ))}
      </Stack>

      <ButtonGroup mt={6}>
        <Button
          variant="solid"
          onClick={() => {
            setConditions([
              ...conditions,
              { type: 'text', matchType: 'full-match', value: '' },
            ]);
          }}
        >
          Add condition
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default TriggerConditions;
