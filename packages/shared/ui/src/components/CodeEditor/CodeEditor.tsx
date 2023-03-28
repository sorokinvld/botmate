import { Box, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import Editor, { useMonaco, Monaco } from '@monaco-editor/react';
import { editorTheme } from './theme';

type CodeEditorProps = {};
function CodeEditor({}: CodeEditorProps) {
  const monaco = useMonaco();

  const beforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('botmate', editorTheme);
    // to the system and how the compiler is told to use ES6 (target=2).

    // validation settings
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    // extra libraries
    var libSource = [
      'declare class Bot {',
      '    /**',
      '     * Returns the next fact',
      '     */',
      '    static start():string',
      '}',
    ].join('\n');
    var libUri = 'ts:filename/facts.d.ts';
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

    var jsCode = [
      '"use strict";',
      '',
      'class Chuck {',
      '    greet() {',
      '        return Facts.next();',
      '    }',
      '}',
    ].join('\n');

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    });
  };

  return (
    <SimpleGrid py={4} columns={10}>
      <GridItem colSpan={{ base: 10, lg: 7 }}>
        <Box py={4} px={8} bg="surface" rounded="xl">
          <Heading size="md" mb={4}>
            script.js
          </Heading>
          <Editor
            height="500px"
            theme={'botmate'}
            defaultLanguage="javascript"
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
