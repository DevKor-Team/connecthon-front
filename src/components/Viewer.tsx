import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface ViewerProps {
    resultContent: string;
}

export default function Result(props: ViewerProps) {
    return <Viewer initialValue={props.resultContent}></Viewer>;
}
