import { Card, RadioButton } from '@atoms';
import {
  Stack,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Switch,
  FormControl,
  FormHelperText,
  ModalCloseButton,
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
  example?: string;
  options?: {
    [key: string]: MessageTypesOption;
  };
};
const MessageTypes: MessageTypesType[] = [
  {
    label: 'Links',
    example: 'www.domain.com',
  },
  {
    label: 'Mentions',
  },
  {
    label: 'Emojis',
  },
  {
    label: 'Files',
    example: 'png',
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
    example: 't.me/addstickers/...',
  },
];

type FilterMessageTypesProps = {};
function FilterMessageTypes({}: FilterMessageTypesProps) {
  const d = useDisclosure();
  const [activeMsgType, setActiveMsgType] = useState<MessageTypesType | null>(
    null,
  );

  return (
    <Card title="Message Type" description="Configure what must be filtered">
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
          <ModalCloseButton />
          <ModalHeader>{activeMsgType?.label}</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <RadioButton
                options={[
                  {
                    label: 'Allow',
                    value: 'allow',
                  },
                  {
                    label: 'Block',
                    value: 'block',
                  },
                ]}
              />
              <FormControl>
                <Input placeholder="Enter your filter" />
                {activeMsgType?.example && (
                  <FormHelperText>
                    Example: <b>{activeMsgType.example}</b>
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
            {/* <ButtonGroup>
              <Button onClick={d.onClose}>Close</Button>
            </ButtonGroup> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export { FilterMessageTypes };
