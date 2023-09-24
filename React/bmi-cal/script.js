document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let height = document.querySelector("#height").value;
    height = (height * 2.54) / 100.0;

    const weight = document.querySelector("#weight").value;

    const BMI = (weight / (height * height)).toFixed(2);

    console.log(`height: ${height}, weight: ${weight}, BMI: ${BMI}`)

    let comment = `BMI is ${BMI}: `;


    if (BMI >= 25.0) {
        comment = comment + "You are Overweight";
    }
    else if (BMI >= 18.5) {
        comment = comment + "You are Healthy";
    }
    else {
        comment = comment + "You are UnderWeight";
    }

    console.log(comment)

    document.querySelector("#result").innerHTML = `
    <h2>${comment}</h2>   
    `

});