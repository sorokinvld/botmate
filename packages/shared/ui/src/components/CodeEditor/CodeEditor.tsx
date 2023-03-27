import { Box, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import Editor, { useMonaco, Monaco } from '@monaco-editor/react';
import { editorTheme } from './theme';

type CodeEditorProps = {};
function CodeEditor({}: CodeEditorProps) {
  const monaco = useMonaco();

  const beforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('botmate', editorTheme);
  };

  return (
    <SimpleGrid py={4} columns={10}>
      <GridItem colSpan={7}>
        <Box py={4} px={8} bg="surface" rounded="xl">
          <Heading size="md" mb={4}>
            script.js
          </Heading>
          <Editor
            height="500px"
            theme={'botmate'}
            defaultLanguage="typescript"
            defaultValue="// some comment"
            beforeMount={beforeMount}
            options={{
              minimap: {
                enabled: false,
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollbar: {
                vertical: 'hidden',
              },
              overviewRulerBorder: false,
            }}
          />
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}

export { CodeEditor };
