"use strict";

function currentAge(date) {
  const [day, month, year] = date.split("-");
  const currentDate = new Date();
  const birthDate = new Date(year, month - 1, day);

  const ageInMs = currentDate - birthDate;
  const ageInDate = new Date(ageInMs);

  const ageYears = ageInDate.getUTCFullYear() - 1970;
  const ageMonths = ageInDate.getUTCMonth();
  const agedays = ageInDate.getUTCDate();

  return `${ageYears} years, ${ageMonths} months, ${agedays} days`;
}

const birthDate = prompt("<- Enter Your Birth Date : dd-mm-yyyy ->");
document.write(`<h3>${currentAge(birthDate)}</h3>`);
