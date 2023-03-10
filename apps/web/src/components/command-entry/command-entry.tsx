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
import { CreateCommandDto } from '@api';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

const CodeEditor = dynamic(
  () => import('@uiw/react-codemirror').then((mod) => mod.default),
  { ssr: false },
);

type PartialCreateCommandDto = Partial<CreateCommandDto>;

type CommandEntryProps = {
  editMode?: boolean;
  onDone?: (data: PartialCreateCommandDto) => void;
  initialData?: PartialCreateCommandDto;
  isLoading?: boolean;
  onCancel?: () => void;
};
function CommandEntry({
  isLoading,
  onDone,
  initialData,
  onCancel,
}: CommandEntryProps) {
  const form = useForm<PartialCreateCommandDto>();
  const handleSubmit = async (data: PartialCreateCommandDto) => {
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
              <FormLabel>Alias</FormLabel>
              <Input
                {...form.register('name')}
                placeholder="Enter command alias"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Command</FormLabel>
              <Input
                {...form.register('command')}
                placeholder="Enter command (/start)"
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>Script</FormLabel>
            {/* <CodeEditor
              spellCheck="false"
              language="js"
              placeholder="Enter your script here..."
              padding={15}
              style={{
                fontSize: 12,
                borderWidth: 1,
                borderRadius: 6,
                minHeight: 400,
                backgroundColor: '#191a23',
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            /> */}
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

export { CommandEntry };
