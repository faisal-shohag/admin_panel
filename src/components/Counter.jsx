import { useState }from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    
    const countMe = () => {
        setCount(count+1)
    }
    return (
        <div >
            <h3>
                Counter: {count}
            </h3>
            <button onClick={countMe}>Add</button>
        </div>
    )
}