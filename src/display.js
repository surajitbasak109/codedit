import codemirror from 'codemirror';

export default function codeDisplay(elm, value) {
    const displayEditor = codemirror(elm, {
        value: value || '',
        lineNumbers: false,
        readOnly: true,
    });

	return displayEditor;
}
