import {
  Stack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CreateConversationDto } from '@api';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

const CodeEditor = dynamic(
  () => import('@uiw/react-codemirror').then((mod) => mod.default),
  { ssr: false },
);

type PartialCreateConversationDto = Partial<CreateConversationDto>;

type ConversationProps = {
  editMode?: boolean;
  onDone?: (data: PartialCreateConversationDto) => void;
  initialData?: PartialCreateConversationDto;
  isLoading?: boolean;
  onCancel?: () => void;
};
function ConversationEntry({
  isLoading,
  onDone,
  initialData,
  onCancel,
}: ConversationProps) {
  const form = useForm<PartialCreateConversationDto>();
  const handleSubmit = async (data: PartialCreateConversationDto) => {
    onDone?.(data);
  };

  useEffect(() => {
    form.reset(initialData);
  }, [form, initialData]);

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack spacing={6}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...form.register('name')}
                placeholder="Enter conversation name"
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>Script</FormLabel>
            <CodeEditor
              height="400px"
              extensions={[javascript({ jsx: true })]}
              theme={tokyoNight}
              value={form.getValues('script')}
              onChange={(val) => form.setValue('script', val)}
            />
          </FormControl>
        </Stack>

        <ButtonGroup mt={6}>
          <Button variant="solid" type="submit" isLoading={isLoading}>
            Save
          </Button>
          <Button onClick={() => (onCancel ? onCancel() : null)}>Cancel</Button>
        </ButtonGroup>
      </form>
    </>
  );
}

export { ConversationEntry };
