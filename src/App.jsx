import Banner from "./components/Banner"
import SearchAdd from "./components/SearchAdd"
import './App.css'
import { useEffect, useState} from 'react'
import { getFirestore, collection, onSnapshot , deleteDoc, doc} from 'firebase/firestore'
import app from './config/firebase'
import Modal from "./components/Modal"
import ContactList from "./components/ContactList"
function App() {

  const [openModal,setOpenModal] = useState(false)
  const [contacts, setContacts] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState()
  useEffect(() => {
    const db = getFirestore(app);
    const contactsRef = collection(db, 'contacts');

    const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      const fetchedContacts = [];
      snapshot.forEach((doc) => {
        fetchedContacts.push({ id: doc.id, ...doc.data() });
      });
      setContacts(fetchedContacts);
    });

    return () => {
      // Unsubscribe from the real-time listener when the component unmounts
      unsubscribe();
    };
  }, []);



  const handleEdit = (id) => {
    setId(id)
    setIsEdit((prev) => !prev)
    console.log(id);
    console.log(isEdit);
    setOpenModal((prev) => !prev)
  }
  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const db = getFirestore(app);
      const contactDocRef = doc(db, 'contacts', id);
  
      // Delete the document from Firestore
      await deleteDoc(contactDocRef);
  
      // After successful deletion, you can also update the contacts state if needed
    } catch (error) {
      console.error('Error deleting contact: ', error);
    }
  }
  const addBtnHanlder = () => {
    setOpenModal((prev) => !prev)
  }
  const closeModalHanlder = () => {
    setOpenModal((prev) => !prev)
    setIsEdit((prev) => !prev)
  }
  return (
    <>
      <Banner  />
      <SearchAdd addBtnHanlder={addBtnHanlder} />
      <Modal open={openModal} onClose={closeModalHanlder} isEdit={isEdit} id={id} />
      <ContactList contacts={contacts} handleEdit = {handleEdit} handleDelete={handleDelete}  />
    </>
  )
}

export default App
