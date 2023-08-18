import { BiUser} from 'react-icons/bi'
import { AiOutlineEdit, AiFillDelete} from 'react-icons/ai'

const ContactList = ({ contacts, handleEdit, handleDelete}) => {
  console.log(contacts);
  
  return (
    <div className="container mt-4  flex justify-center ">
      <div className=" w-96 mx-4 flex flex-col gap-4">

 {
  contacts.map((contact) => (
<div className="flex p-2 bg-yellow-200 justify-center  relative  items-center gap-2 rounded-md" key={contact.id}>
        <div className='text-red-500 '>
          <BiUser  size={32}/>
        </div>
        <div className=" ml-3">
          <p className='font-semibold'>{contact.name}</p>
          <p>{contact.email}</p>
        </div>
        <div className=' ml-auto  flex gap-2 '>
          <button onClick={() => handleEdit(contact.id)} >
    < AiOutlineEdit size={32} />
          </button>
          <button className='text-blue-600' onClick={() => handleDelete(contact.id)}>
    <AiFillDelete size={32} />
          </button>
        </div>
      </div>
  ))
 }
      

    
    
      </div>

    </div>
  )
}

export default ContactList