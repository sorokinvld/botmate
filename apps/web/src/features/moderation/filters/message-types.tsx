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
import { UseFormReturn } from 'react-hook-form';

// todo: make this a component and reusable
type MessageTypesOption = {
  id: string;
  label: string;
  type: 'checkbox' | 'input';
  yes?: MessageTypesOption;
};
type MessageTypesType = {
  id: string;
  label: string;
  example?: string;
  options?: MessageTypesOption[];
};
const MessageTypes: MessageTypesType[] = [
  {
    id: 'links',
    label: 'Links',
    example: 'www.domain.com',
  },
  {
    id: 'mentions',
    label: 'Mentions',
  },
  {
    id: 'emojis',
    label: 'Emojis',
  },
  {
    id: 'files',
    label: 'Files',
    example: 'png',
    options: [
      {
        id: 'limit_file_size',
        label: 'Limit file size',
        type: 'checkbox',
        yes: {
          id: 'file_size',
          label: 'File size',
          type: 'input',
        },
      },
    ],
  },
  {
    id: 'stickers',
    label: 'Stickers',
    example: 't.me/addstickers/...',
  },
];

type OptionsGeneratorProps = {
  form: UseFormReturn;
  message_type: string;
  option: MessageTypesOption;
};
const OptionsGenerator = ({
  form,
  option,
  message_type,
}: OptionsGeneratorProps) => {
  return (
    <>
      <HStack key={option.id}>
        <Text>{option.label}</Text>
        <Spacer />
        {option.type === 'checkbox' ? (
          <>
            <Switch
              {...form.register(
                `message_type.${message_type}.${option.id}.enabled`,
              )}
            />
          </>
        ) : (
          <Input
            w="44"
            placeholder="Enter value"
            {...form.register(`message_type.${message_type}.${option.id}`)}
          />
        )}
      </HStack>

      {form.getValues(`message_type.${message_type}.${option.id}.enabled`) ? (
        option.yes ? (
          <OptionsGenerator
            form={form}
            option={option.yes}
            message_type={message_type}
          />
        ) : null
      ) : (
        ''
      )}
    </>
  );
};

type FilterMessageTypesProps = {
  form: UseFormReturn;
};
function FilterMessageTypes({ form }: FilterMessageTypesProps) {
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
            {activeMsgType ? (
              <Stack spacing={4}>
                <RadioButton
                  onChange={(v) => {
                    form.setValue(
                      `message_type.${activeMsgType?.id}.method`,
                      v,
                    );
                  }}
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
                  <Input
                    placeholder="Enter your filter"
                    {...form.register(
                      `message_type.${activeMsgType?.id}.filter`,
                    )}
                  />
                  {activeMsgType?.example && (
                    <FormHelperText>
                      Example: <b>{activeMsgType.example}</b>
                    </FormHelperText>
                  )}
                </FormControl>
                {activeMsgType.options?.map((option) => (
                  <OptionsGenerator
                    key={option.id}
                    form={form}
                    message_type={activeMsgType?.id}
                    option={option}
                  />
                ))}
              </Stack>
            ) : null}
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
    </Card>
  );
}

export { FilterMessageTypes };
