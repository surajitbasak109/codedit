import codemirror from 'codemirror';
import codeDisplay from './display';
import codeEditor from './editor';
import transpile from './transpile';

const editorElm = document.querySelector('.js-code-editor');
const displayElm = document.querySelector('.js-code-display');
const errorElm = document.querySelector('.js-code-error');
const [run, clear] = document.querySelectorAll('button');

const shell = codeDisplay(displayElm);

const editor = codeEditor(
    editorElm,
    {},
    'const greet = "Hello World!";\n\ngreet;',
    code => {
        // shell.setValue(executeCode(codeToRun));
        try {
			const codeToRun = transpile(code);
            shell.replaceRange(
                '$ ' + eval(`${codeToRun}`) + '\n',
                codemirror.Pos(shell.lastLine())
            );
        } catch (error) {
            errorElm.innerHTML = error;
        }
    },
    data => {}
);

editor.setSize('100%', '500px');

run.addEventListener('click', () => {
    errorElm.innerHTML = '';
    // shell.setValue(executeCode(codeToRun));
    try {
		const codeToRun = transpile(editor.getValue());
        shell.replaceRange('$ ' + eval(`${codeToRun}`) + '\n', codemirror.Pos(shell.lastLine()));
    } catch (error) {
        errorElm.innerHTML = error;
    }
});

clear.addEventListener('click', _ => shell.setValue(''));
