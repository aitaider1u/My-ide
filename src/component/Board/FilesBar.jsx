import JsIcon from './../../assets/js.svg';
import HtmlIcon from './../../assets/html.svg';
import CssIcon from './../../assets/css.svg';
import {openFile} from './../../features/codeSlice';
import { useSelector, useDispatch } from 'react-redux';


function FilesBar(){
    const dispatch = useDispatch()
    const files = useSelector((state) => state.code.value);
    const currentFile = useSelector((state) => state.code.currentFile);
    
    function getIconFile(typeFile){
        if(typeFile == 'css'){
            return CssIcon
        }
        if(typeFile == 'js'){
            return JsIcon
        }
        if(typeFile == 'html'){
            return HtmlIcon
        }
           
    }

    return(
        <>
        <div class="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
            <div>
                <div class="flex items-center space-x-2 text-lg font-bold text-gray-800 pb-4">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="text-3xl ">Project Folder</span>
                </div>

                <div class="ml-6 border-l-2 border-gray-300">

                {files.map(file => (
                    <>
                    <div  onClick={() => (dispatch(openFile(file.id)))} class="relative pl-4 pb-1">
                        <span class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 cursor-pointer">
                        <img src={getIconFile(file.type)} className='w-7' />
                        <span className="text-2xl">{file.name}</span>
                        </span>
                    </div>
                    </>
                ))}
            </div>
        </div>
    </div>  
    </>
    )

}

export default FilesBar