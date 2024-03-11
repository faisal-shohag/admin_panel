import { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { collection, doc, getDocs, onSnapshot, updateDoc }from 'firebase/firestore';
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const usersRef = collection(db, "users")

  useEffect(()=>{
    // const getUsers = async () => {
    //   const data = await getDocs(usersRef);
    //   let all_users = data.docs.map(doc=> ({...doc.data(), id: doc.id}))
    //   setUsers(all_users)
    // }
    // getUsers()
    const unsub = onSnapshot(usersRef, (snapshot)=>{
      const u = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}))
      setUsers(u)
      
    })

    return ()=>unsub();

  }, [])

  const handleStatus =  async(status, id) => {
    const docRef = doc(db, 'users', id)
    await updateDoc(docRef, {access: status})
  }

  return (
    <>
      <h2 className='font-bold text-3xl flex justify-center items-center gap-5'><img className='h-10' src={logo}/> Admin Panel</h2>
      <div className='flex flex-col gap-5 items-center mt-10'>
       {users.map((user)=>{
        if(user.access=="admin"){
          return <div key={user.id} className='text-left bg-pink-500 text-gray-200 p-5 rounded-xl min-w-[360px]'>
          <div><span className='font-bold'>Name: </span>{user.displayName}</div>
          <div><span className='font-bold'>User ID: </span>{user.id}</div>
          <div><span className='font-bold'>Phone:</span> {user.phone}</div>
          <div className='font-bold'> Status: <span>ADMIN</span></div>
         </div>
        } else if(user.access=="waiting"){
          return <div key={user.id} className='text-left bg-orange-500 text-white p-5 rounded-xl min-w-[360px]'>
          <div className=''>Name: {user.displayName ?  user.displayName : "Unknown"}</div>
          <div><span className='font-bold'>User ID: </span>{user.id}</div>
          <div><span className='font-bold'>Phone:</span> {user.phone}</div>
          <div className='font-bold mb-5'> Status: <span>Waiting</span></div>
          <div className='flex justify-center items-center gap-10'>
            <button onClick={()=>handleStatus('accept', user.id)} className='bg-green-500'>Accept</button>
            {/* <button onClick={()=>handleStatus('waiting', user.id)} className='bg-red-500'>Deny</button> */}
          </div>
         </div>
        }
        else if(user.access=="denied"){
          return <div key={user.id} className='text-left bg-red-600 text-white p-5 rounded-xl min-w-[360px]'>
          <div className=''>Name: {user.displayName ?  user.displayName : "Unknown"}</div>
          <div><span className='font-bold'>User ID: </span>{user.id}</div>
          <div><span className='font-bold'>Phone:</span> {user.phone}</div>
          <div className='mb-5 font-bold'> Status: <span>Denied</span></div>
          <div className='flex justify-center items-center gap-10'>
            <button className='bg-green-500'>Accept</button>
            <button className='bg-orange-500'>Make waiting</button>
          </div>
         </div>
        }
        else{
          return <div key={user.id} className='text-left bg-green-500 text-white p-5 rounded-xl min-w-[360px]'>
          <div className=''>Name: {user.displayName ?  user.displayName : "Unknown"}</div>
          <div><span className='font-bold'>User ID: </span>{user.id}</div>
          <div><span className='font-bold'>Phone:</span> {user.phone}</div>
          <div className='mb-5 font-bold'> Status: <span>Accepted</span></div>
          <div className='flex justify-center items-center gap-10'>
            {/* <button onClick={()=>handleStatus('waiting', user.id)} className='bg-red-500'>Deny</button> */}
            <button onClick={()=>handleStatus('waiting', user.id)} className='bg-orange-500'>Make waiting</button>
          </div>
         </div>
        }
       })}
      </div>
    </>
  )
}




export default App
