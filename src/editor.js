import codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';

export default function codeEditor(container, settings, value, onSave, onChange) {
    const editor = codemirror(container, {
        value: value || '',
        mode: { name: 'javascript', globalVars: true },
        theme: 'dracula',
        tabSize: 2,
        lineNumbers: true,
        autofocus: true,
        foldGutter: true,
        gutters: [],
        styleSelectedText: true,
		autoCloseBrackets: true,
		matchBrackets: true,
		lineWrapping: true,
        ...settings,
    });

    const save = () => onSave(editor.getValue());
    const change = () => onChange(editor.getValue());

    editor.on('change', change);
    editor.setOption('extraKeys', {
        'Ctrl-S': save,
        'Cmd-S': save,
        'Ctrl-Space': 'autocomplete',
    });

    codemirror.normalizeKeyMap();
    container.addEventListener('click', () => editor.focus());
    editor.focus();

    return editor;
}
