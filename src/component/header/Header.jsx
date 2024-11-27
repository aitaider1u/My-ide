import developer from './../../assets/developer.png'


function Header(params) {
    
    return (
        <>
            <div className="flex bg-gray-900 h-20  content-center items-center m">
                <div className=' pl-2 flex content-center items-center min-w-min p-4'>
                    <img src={developer} alt=""  className='w-1/12 h-6/12'/>
                    <p className='pl-3 text-blue-100 text-3xl'>Zinou<span className=' text-blue-100 text-xl'>'s IDE</span> </p>
                </div>
            </div>
        </>
    )
}


export default Header;