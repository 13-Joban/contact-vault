import { useEffect, useState } from 'react';
import app from '../config/firebase';
import { getFirestore, collection, getDoc, doc,  updateDoc,  addDoc } from 'firebase/firestore';

const Modal = ({ open, onClose, isEdit , id }) => {
  if (!open) return null;

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (isEdit && id) {
        const db = getFirestore(app);
        const contactDocRef = doc(db, 'contacts', id);

        try {
          const contactDoc = await getDoc(contactDocRef);
          if (contactDoc.exists()) {
            const contactData = contactDoc.data();
            setName(contactData.name);
            setEmail(contactData.email);
          }
        } catch (error) {
          console.error('Error fetching contact details: ', error);
        }
      }
    }
    fetchContactDetails()

  }, [isEdit, id])


  const [ name, setName] = useState('')
  const [ email, setEmail] = useState('')
 
  const addContactHandler = async () => {

    if(id && name && email){
      try {
        const db = getFirestore(app);
        const contactDocRef = doc(db, 'contacts', id);

        await updateDoc(contactDocRef, {
          name,
          email,
        });

        setName('');
        setEmail('');
        onClose();
      } catch (error) {
        console.error('Error updating contact: ', error);
      }
    }

    else if(name && email) {

      try {
       

      // Get a Firestore instance
      const db = getFirestore(app);

        // Reference to the "contacts" collection in Firestore
        const contactsRef = collection(db, 'contacts');
        

        // Add a new document with the name and email
       await addDoc(contactsRef, {
        name,
        email,
      });
      
      setEmail('')
      setName('')
      onClose();
      } catch (error) {
        console.error('Error adding contact: ', error);
        
      }
      
     
    }



   
    

  }



  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="w-80 bg-white rounded-lg p-4 relative z-10">
        <div className="space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="w-full border border-black p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full border border-black p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-yellow-300 rounded-md p-2 text-lg"
            onClick={addContactHandler}
          >
         { isEdit ? 'Update Contact' : 'Add Contact'}   
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
