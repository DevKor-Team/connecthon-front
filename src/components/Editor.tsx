import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { EditorProps, Editor as EditorType } from '@toast-ui/react-editor';
import { MutableRefObject } from 'react';

interface WriterProps {
    editorRef: MutableRefObject<EditorType | undefined>;
    prevContent: string;
}

export default function Writer(props: WriterProps) {
    return <Editor ref={props.editorRef} initialEditType="markdown" previewStyle="vertical" plugins={[colorSyntax]} height={`auto`} initialValue={props.prevContent} />;
}
