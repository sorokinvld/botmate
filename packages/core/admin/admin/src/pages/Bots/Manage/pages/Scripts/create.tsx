import { AppHeader, Box, CodeEditor, Container } from '@botmate/ui';

function ScriptsCreatePage() {
  return (
    <Box flex={1}>
      <AppHeader title="Create Script" showBack />

      <Container maxW="7xl">
        <CodeEditor />
      </Container>
    </Box>
  );
}

export default ScriptsCreatePage;
