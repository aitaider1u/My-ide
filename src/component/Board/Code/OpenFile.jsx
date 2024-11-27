import { useDispatch } from 'react-redux';
import { updateCurrentFile, closeFile } from './../../../features/codeSlice';

function OpenFile({ id, name, isCurrentFile }) {
    const dispatch = useDispatch();
    const bgColor = isCurrentFile ? 'bg-slate-600' : 'bg-slate-800';

    return (
        <>
            <div
                onClick={() => dispatch(updateCurrentFile(id))}
                className={`flex items-center ${bgColor} text-white px-4 py-2 rounded shadow space-x-2`}
            >
                <span>{name}</span>
                <button
                    onClick={(event) => {
                        event.stopPropagation(); // Empêche la propagation vers le conteneur parent
                        dispatch(closeFile(id)); // Ferme le fichier
                    }}
                    className="text-red-400 hover:text-red-500"
                >
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9.293l4.146-4.147a1 1 0 011.415 1.415L11.414 10l4.147 4.146a1 1 0 01-1.415 1.415L10 11.414l-4.146 4.147a1 1 0 01-1.415-1.415L8.586 10 4.439 5.854a1 1 0 011.415-1.415L10 8.586z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </>
    );
}

export default OpenFile;
