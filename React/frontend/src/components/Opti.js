import React from "react";

function Title() {
    console.log('loading title');
    return (
        <h1>React Hook : useMem & useCallback</h1>
    );
}

function ShowCount({count, title}) {
    console.log(`loading ShowCount: ${title}`);
    return (
        <p>{title} : {count}</p>
    );
}

function Baton({buttonClick, children}) {
    console.log(`loading Baton: ${children}`);
    return (
        <button onClick={buttonClick}>{children}</button>
    );  
}

export default function Opti() {
    const [count1, setCount1] = React.useState(0);
    const [count2, setCount2] = React.useState(0);

    const incrementByOne = React.useCallback(() => {
        setCount1((prv) => prv + 1);
    }, []);

    const incrementByFive = React.useCallback(() => {
        setCount2((prv) => prv + 5);
    }, []);

    const isOdd = React.useMemo(() => {
        console.log(`checking odd even: ${count1}`)
        let sum = 0;
        for(let i = 0; i <= 1000000000; i++) sum += i;
        return count1 % 2;
    }, [count1]);

    console.log("Loading OPTI");
    return (
        <div className="reactOpti">
            <Title/>
            <hr />
            <ShowCount count={count1} title={'Counter 1'}/>
            <p>{isOdd ? 'Odd' : 'Even'}</p>
            <Baton buttonClick={incrementByOne}>Increment by One</Baton>
            <hr />
            <ShowCount count={count2} title={'Counter 2'}/>
            <Baton buttonClick={incrementByFive}>Increment by Five</Baton>
        </div>
    );
}