import {useState} from 'react';

export const Counter = () => {
    const [count, setCount] = useState(0)

  const decreaseCount = () => {
    setCount(count-1);
  }
  const increaseCount = () => {
    setCount(count+1);
  }
  
  return (
    <div>
        <button onClick={decreaseCount}>- -</button>
            <h1>{count}</h1> 
        <button onClick={increaseCount}>++</button>
    </div>
  );
}

