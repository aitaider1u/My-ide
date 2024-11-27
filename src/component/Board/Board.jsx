import FilesBar from './../Board/FilesBar';
import ListOpenFiles from './../Board/Code/ListOpenFiles';
import { useSelector, useDispatch } from 'react-redux';
import { updateFile, updateCurrentFile } from './../../features/codeSlice';
import { useState, useEffect } from 'react';
import PreviewToggle from './PreviewToggle';
import Preview from './Preview';

function Board() {
    const currentFile = useSelector((state) => state.code.currentFile);
    const showIframe = useSelector((state) => state.code.showIframe);
    const files = useSelector((state) => state.code.value);
    const [code, setCode] = useState("");
    const dispatch = useDispatch();

    // Met à jour le code lorsqu'on change de fichier
    useEffect(() => {
        if (currentFile) {
            const file = files.find((file) => file.id === currentFile && file.isOpen);
            if (file) {
                setCode(file.code); // Mettre à jour le code
            } else {
                setCode(""); // Si aucun fichier valide trouvé
            }
        } else {
            setCode(""); // Si currentFile est null
        }
    }, [currentFile, files]); // Ajoutez `files` pour détecter les modifications

    const handleCodeChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode); // Mettre à jour l'état local
        dispatch(
            updateFile({
                id: currentFile,
                newCode: newCode,
            })
        );
    };

    return (
        <>
            <div className="flex w-full min-h-screen mt-1">
                <div className="w-2/12 h-full bg-teal-100 mr-1">
                    <FilesBar />
                </div>
                <div className="mr-1 relative flex-grow flex flex-col h-full rounded-md bg-slate-900 p-4">
                    <PreviewToggle />
                    {!showIframe && (
                        <>
                            <ListOpenFiles />
                            <textarea
                                value={code} // Utilise `value` au lieu de `defaultValue`
                                onChange={handleCodeChange}
                                className="flex-grow focus:outline-none focus:ring-0 resize-none block p-4 w-full text-xl font-mono bg-gray-800 rounded-md border border-gray-600 placeholder-gray-400 text-white caret-green-400"
                            />
                        </>
                    )}
                    {showIframe && <Preview />}
                </div>
            </div>
        </>
    );
}

export default Board;
