import { useBots, useService } from '@botmate/helper-plugin';
import {
  AppHeader,
  Box,
  Button,
  ButtonGroup,
  CodeEditor,
  Container,
  Divider,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Spacer,
} from '@botmate/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiTrash } from 'react-icons/fi';

function CreateScriptPage() {
  const { activeBot } = useBots();
  const [name, setName] = useState('');
  const [script, setScript] = useState('');
  const scriptService = useService('scripts');

  const save = (data: any) => {
    scriptService.runService('script.create', {
      name,
      script,
      bot: activeBot._id,
    });
  };

  return (
    <>
      <AppHeader
        showBackButton
        title="Create Script"
        actions={
          <>
            <Spacer />

            <Button leftIcon={<FiSave />} variant="success" onClick={save}>
              Save
            </Button>
          </>
        }
      />

      <Container maxW="7xl" py={4}>
        <SimpleGrid columns={10}>
          <GridItem colSpan={{ base: 10 }}>
            <Box bg="surface" rounded="lg">
              <HStack p={4}>
                <Input
                  autoFocus
                  borderWidth="0px"
                  placeholder="Script Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Spacer />
              </HStack>
              <Divider />
              <Box p={4}>
                <CodeEditor
                  onChange={(v) => {
                    setScript(v);
                  }}
                />
              </Box>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default CreateScriptPage;
