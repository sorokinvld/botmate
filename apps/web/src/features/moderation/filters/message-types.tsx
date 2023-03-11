import { useFiltersControllerSaveFiltersMutation } from '@api';
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
  Button,
  IconButton,
} from '@chakra-ui/react';
import { useActiveBot, useActiveChat } from '@hooks';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';

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
              {...form.register(`${message_type}.${option.id}.enabled`)}
            />
          </>
        ) : (
          <Input
            w="44"
            placeholder="Enter value"
            {...form.register(`${message_type}.${option.id}`)}
          />
        )}
      </HStack>

      {form.getValues(`${message_type}.${option.id}.enabled`) ? (
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

type FilterMessageTypesProps = {};
function FilterMessageTypes({}: FilterMessageTypesProps) {
  const form = useForm();
  const d = useDisclosure();
  const activeBot = useActiveBot();
  const activeChat = useActiveChat();
  const [activeMsgType, setActiveMsgType] = useState<MessageTypesType | null>(
    null,
  );
  const [saveFilter, { isLoading: isSaving }] =
    useFiltersControllerSaveFiltersMutation();

  const saveData = () => {
    const data = form.getValues();

    saveFilter({
      botId: activeBot?.id,
      chatId: activeChat?.chat_id,
      saveFilterDto: {
        type: 'messages',
        value: data,
      },
    });
  };

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
                    form.setValue(`${activeMsgType?.id}.method`, v);
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
                    {...form.register(`${activeMsgType?.id}.filter`)}
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

          <ModalFooter>
            <Button variant="solid" onClick={saveData}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export { FilterMessageTypes };
