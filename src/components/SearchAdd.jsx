import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineSearch} from 'react-icons/ai'

const SearchAdd = ({addBtnHanlder}) => {
  return (
    <div className="flex justify-center gap-2">
        <div className="relative text-white">
        <input
          type='text'
          placeholder='Search Contact'
          className='p-2 pl-10 text-lg bg-transparent text-white rounded-md border border-amber-300 outline-none w-70'
        />
        <div className="absolute inset-y-0 left-0 p-2 flex items-center pointer-events-none">
          <AiOutlineSearch size={20} />
        </div>
      </div>
        <button className="rounded text-white" onClick={addBtnHanlder} >
        <IoIosAddCircle size={50} />
        </button>
    </div>
  )
}

export default SearchAdd