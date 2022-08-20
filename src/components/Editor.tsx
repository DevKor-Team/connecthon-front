import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { axiosInstance } from '../hooks/queries';
import { useRecoilState } from 'recoil';
import { projectRecoilState } from '../recoil/project';
import { tempProjectRecoilState } from '../recoil/tempproject';

interface IEditor {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

type HookCallback = (url: string, text?: string) => void;

export type HookMap = {
    addImageBlobHook?: (blob: Blob | File, callback: HookCallback) => void;
};

function TextEditor() {
    const editorRef = useRef<ToastEditor>(null);
    const plugins = [colorSyntax];
    const [project, setProject] = useRecoilState(projectRecoilState);
    const [tempProject, setTempProject] = useRecoilState(tempProjectRecoilState);

    const onChangeEditor = () => {
        if (editorRef.current) {
            setTempProject({
                ...tempProject,
                content: editorRef.current.getInstance().getMarkdown(),
            });
        }
    };

    // useEffect(() => {
    //     if (editorRef.current) {
    //         editorRef.current.getInstance().setMarkdown(contents);
    //     }
    // }, []);

    return (
        <ToastEditor
            initialEditType="markdown"
            ref={editorRef}
            previewStyle="vertical"
            plugins={plugins}
            height="auto"
            initialValue={tempProject?.content}
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
}

export default TextEditor;

// import 'prismjs/themes/prism.css';

// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Editor } from '@toast-ui/react-editor';

// import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import { axiosInstance } from '../hooks/queries/index';
// import { useRecoilState } from 'recoil';
// import { projectRecoilState } from '../recoil/project';

// export default function Writer() {
//     const [project, setProject] = useRecoilState(projectRecoilState);
//     return (
//         <Editor
//             initialEditType="markdown"
//             previewStyle="vertical"
//             initialValue={project.content}
//             plugins={[colorSyntax]}
//             height={`auto`}
//             hooks={{
//                 addImageBlobHook: async (blob, callback) => {
//                     const data = new FormData();
//                     data.append('image', blob);
//                     const res = await axiosInstance.post(`/image`, data);
//                     const imgUrl = res.data.url;
//                     callback(imgUrl, 'description');
//                 },
//             }}
//         />
//     );
// }
