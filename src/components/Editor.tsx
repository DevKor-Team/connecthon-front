import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { axiosInstance } from '../hooks/queries';

interface IEditor {
    contents: string;
    setContents: React.Dispatch<React.SetStateAction<string>>;
}

type HookCallback = (url: string, text?: string) => void;

export type HookMap = {
    addImageBlobHook?: (blob: Blob | File, callback: HookCallback) => void;
};

const TextEditor: NextPage<IEditor> = ({ contents, setContents }) => {
    const editorRef = useRef<ToastEditor>(null);
    const plugins = [colorSyntax];

    const onChangeEditor = () => {
        if (editorRef.current) {
            setContents(editorRef.current.getInstance().getMarkdown());
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(contents);
        }
    }, []);

    return (
        <ToastEditor
            initialEditType="markdown"
            ref={editorRef}
            previewStyle="vertical"
            plugins={plugins}
            height="auto"
            initialValue={contents}
            onChange={onChangeEditor}
            hideModeSwitch={true}
            usageStatistics={true}
            hooks={{
                addImageBlobHook: async (blob, callback) => {
                    const data = new FormData();
                    data.append('image', blob);
                    const res = await axiosInstance.post(`/image`, data);
                    const imgUrl = res.data.url;
                    callback(imgUrl, 'description');
                },
            }}
        />
    );
};

export default TextEditor;
