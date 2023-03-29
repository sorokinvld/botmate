import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';

type CodeEditorProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};
function CodeEditor({ defaultValue, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      value={defaultValue || ''}
      height="300px"
      extensions={[javascript({ jsx: true })]}
      onChange={(val) => {
        onChange && onChange(val);
      }}
      theme={aura}
      style={{
        backgroundColor: 'red',
      }}
    />
  );
}

export { CodeEditor };
