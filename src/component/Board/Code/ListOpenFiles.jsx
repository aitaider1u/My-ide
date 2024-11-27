import OpenFile from "./OpenFile";
import { useSelector } from 'react-redux';

function ListOpenFiles() {
    const files = useSelector((state) => state.code.value);
    const currentFile = useSelector((state) => {
        console.log("hello world");
        return state.code.currentFile;
    });
    const filesQueue = useSelector((state) => state.code.filesQueue);

    // Trouve un fichier par son ID
    function getFile(id) {
        return files.find((file) => file.id === id);
    }

    return (
        <> 
            <div key={`${currentFile}-${filesQueue.size}`} className="pb-4 pl-2 rounded-md shadow-lg h-10 flex space-x-4 content-center items-center">
                {filesQueue.map((id) => {
                    const file = getFile(id); // Trouve le fichier
                    if (!file) return null;

                    return (
                        <OpenFile
                            key={file.id}
                            id={file.id}
                            name={file.name}
                            isCurrentFile={currentFile === file.id}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default ListOpenFiles;
