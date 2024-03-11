import { useEffect, useState } from 'react';

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(data=> {setUsers(data)})
    }, [])

    return (
        <>
        <h3>Users: {users.length}</h3>
        <ul>
            {users.map(user=><li>{user.name}</li>)}
        </ul>
        </>
    )
}

/** 
 * 
 * 
 * **/