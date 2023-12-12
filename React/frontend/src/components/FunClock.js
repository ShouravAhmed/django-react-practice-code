import React from "react";
import Button from './Button';

export default function FunClock() {
    const [date, setDate] = React.useState(new Date());
    const [local, setLocal] = React.useState('en-US');
    const [count, setCount] = React.useState(0);
    const [clockVisibility, setClockVisibility] = React.useState(true);

    React.useEffect(() => {
        console.log("Document Title Updated");
        document.title = `Clicked ${count} times`;
    }, [count]);

    React.useEffect(() => {
        console.log('starting clock.');
        const clock = setInterval(tick, 1000);

        return () => {
            console.log('stoping clock.');
            clearInterval(clock);
        };
    }, []);

    const handleClick = () => {
        if (local === 'en-US') {
            setLocal('bn-BD');
        }
        else {
            setLocal('en-US');
        }
        setCount(count + 1);
    }
    const tick = () => {
        console.log('clock ticking.');
        setDate(new Date());
    };

    return (
        <div>
            {clockVisibility && 
            <div>
                <h1 className="heading">
                    <span className="text">{date.toLocaleTimeString(local)}</span>
                </h1>
                <Button local={local} change={handleClick}/>
            </div>}
            <button onClick={() => {setClockVisibility((prv) => !prv)}}>{clockVisibility ? 'Disable' : 'Enable'}</button>
        </div>
    );
}