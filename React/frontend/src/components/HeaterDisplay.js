export default function HeaterDisplay({temperature}) {
    return (
        <fieldset>
            <legend>Display</legend>
            <h3>{temperature >= 100 ? 'Water will Boil.' : 'Water would not boil.'}</h3>
        </fieldset>
    );
}