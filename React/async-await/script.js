"use strict";

console.log(1);
console.log(2);
console.log(3);
console.log("----------------------");

function logger() {
  console.log("1");
  console.log("2");
}
logger();
console.log(3);
console.log("----------------------");

function logger2() {
  console.log(1);
  logger3();
  console.log(3);
  function logger3() {
    console.log(2);
  }
}
logger2();
console.log(4);
console.log("----------------------");

const first = function () {
  setTimeout(() => {
    console.log(1);
  }, 1000);
};
const second = function () {
  setTimeout(() => {
    console.log(2);
    console.log("======================");
  }, 3000);
  console.log(3);
};
const third = function () {
  console.log(4);
};
first();
second();
third();
console.log("----------------------");

const first1 = function (fun) {
  setTimeout(() => {
    console.log(11);
    fun(third3);
  }, 1000);
};
const second2 = function (fun) {
  setTimeout(() => {
    console.log(22);
    fun();
  }, 3000);
};
const third3 = function () {
  console.log(33);
  console.log("----------------------");
};
first1(second2);

function callbackHell() {
  setTimeout(() => {
    const data = { user: "ahmed" };
    console.log(`data fetched:`, data);
    setTimeout(() => {
      console.log(`data saved in DB`);
    }, 2000);
    return data;
  }, 1000);
}
callbackHell();

//==============================================

const promise = new Promise(async (resolve, reject) => {
  try {
    console.log("%cfatching data", "color: blue");
    const todo = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    ).then((response) => {
      let sum = 0;
      for (let i = 1; i <= 100000000; i++) sum += i;
      console.log("%cdata fetched", "color: green");
      return response.json();
    });
    console.log("resolving");
    resolve(todo);
  } catch (error) {
    console.log("fatching error");
    reject(error);
  }
});
promise
  .then((data) => {
    console.table(data);
  })
  .catch((error) => {
    console.log("%cFetching Error | ", "color: red;", error);
  });

//======================================================
async function getTodos() {
  setTimeout(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const todo = await response.json();
      console.table(todo);
      // --
    } catch (exception) {
      console.log("%cError: ", exception);
    }
  }, 5000);
  console.log("%cgetTodos finished", "color: orange");
}
getTodos();
console.log("%cfinished", "color: purple");
