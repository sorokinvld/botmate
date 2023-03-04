import { Card, RadioButton } from '@/libs/ui';
import {
  Stack,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
  Input,
  Switch,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';

// todo: make this a component and reusable
type MessageTypesOption = {
  label: string;
  type: 'checkbox' | 'input';
  yes?: MessageTypesOption;
};
type MessageTypesType = {
  label: string;
  exceptionExample?: string;
  options?: {
    [key: string]: MessageTypesOption;
  };
};
const MessageTypes: MessageTypesType[] = [
  {
    label: 'Links',
    exceptionExample: 'www.domain.com',
  },
  {
    label: 'Mentions',
  },
  {
    label: 'Emojis',
  },
  {
    label: 'Files',
    exceptionExample: 'png',
    options: {
      limit_file_size: {
        label: 'Limit file size',
        type: 'checkbox',
        yes: {
          label: 'File size',
          type: 'input',
        },
      },
    },
  },
  {
    label: 'Stickers',
    exceptionExample: 't.me/addstickers/...',
  },
];

type FilterMessageTypesProps = {};
function FilterMessageTypes({}: FilterMessageTypesProps) {
  const d = useDisclosure();
  const [activeMsgType, setActiveMsgType] = useState<MessageTypesType | null>(
    null,
  );

  return (
    <Card
      title="Message Type"
      description="Configure what must be filtered"
      minW="300px"
    >
      <Stack>
        {MessageTypes.map((type) => (
          <HStack key={type.label}>
            <Text size="sm">{type.label}</Text>
            <Spacer />
            <Text
              userSelect="none"
              cursor="pointer"
              fontWeight="semibold"
              _hover={{
                opacity: 0.8,
              }}
              transition="opacity 0.2s"
              onClick={() => {
                setActiveMsgType(type);
                d.onOpen();
              }}
            >
              Allow all
            </Text>
          </HStack>
        ))}
      </Stack>

      <Modal
        isOpen={d.isOpen}
        onClose={d.onClose}
        trapFocus={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{activeMsgType?.label}</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <RadioButton options={['Allow', 'Block']} />
              <FormControl>
                <Input placeholder="Enter your filter" />
                {activeMsgType?.exceptionExample && (
                  <FormHelperText>
                    Example: <b>{activeMsgType.exceptionExample}</b>
                  </FormHelperText>
                )}
              </FormControl>
              {/* todo: make it a reusable component, and support nested values */}
              {activeMsgType?.options &&
                Object.entries(activeMsgType.options).map(([key, value]) => (
                  <HStack key={key}>
                    <Text>{value.label}</Text>
                    <Spacer />
                    {value.type === 'checkbox' ? (
                      <Switch />
                    ) : (
                      <Input placeholder="Enter value" />
                    )}
                  </HStack>
                ))}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button onClick={d.onClose}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export { FilterMessageTypes };
