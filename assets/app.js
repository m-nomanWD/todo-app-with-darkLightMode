// DOM objects//
const chectBtn = document.querySelector("#check-btn");
const listContainer = document.querySelector(".list-raper");
const todoList = document.querySelector(".todo-list");
const header = document.querySelector("header");
const todoAdd = document.querySelector("#todo-add");
const filterBtnContainer = document.querySelector(".filter-btns");
const input = document.querySelector("input");
const counter = document.querySelector(".counter");
const clearListBtn = document.querySelector(".clear-complete");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completeBtn = document.querySelector(".completed");
const empty = document.querySelector(".empty");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const pathDark = "./assets/images/bg-desktop-dark.jpg";
const pathLight = "./assets/images/bg-desktop-light.jpg";
const statusbarBtns = document.querySelector(".stutus-bar");
const drag = document.querySelector(".drag");

// variables for handle the todo list
// "i" use for counte the value of list item how many are add or delete or complete
var i = 0;

// store the todo list items in the arry to use later to filter the arry
var allTasks = [];
// ********8 load the all the task from the local storage
window.addEventListener("DOMContentLoaded", () => {
  const list = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];

  i = 0;
  list.map((item) => {
    const todoItem = document.createElement("div");
    const arrt = document.createAttribute("data-id");
    arrt.value = item.id;
    if (item.flag === true) {
      // intiliz the structure of the todo task

      todoItem.innerHTML = `<div class="todo-add border ">
        <span class="check show-img "><img class= "check-img img-show" src="./assets/images/icon-check.svg" alt=""/></span>
        <div class="text-area done">
        
          <p  >${item.value}</p>
        </div>
        <span class="clear"
          ><img src="./assets/images/icon-cross.svg" alt=""
        /></span>
      </div>`;
    } else {
      todoItem.innerHTML = `<div class="todo-add border ">
        <span class="check "><img class= "check-img " src="./assets/images/icon-check.svg" alt=""/></span>
        <div class="text-area">

          <p   >${item.value}</p>
        </div>
        <span class="clear"
          ><img src="./assets/images/icon-cross.svg" alt=""
        /></span>
      </div>`;
      i = i + 1;
    }
    counter.textContent = i;

    // now append the child into the list
    todoList.appendChild(todoItem);
    todoItem.children[0].children[1].setAttributeNode(arrt);
    // empty the input control for add new task

    // the effect on the check box when user enter the new task

    // increment the counter value

    // hide the default text of the todo list
    empty.className = "hide";
    // spreade oprator to apply the array mathood on the node list we use this otherwise array mathod like map, filte canot be used
    allTasks = [...todoList.querySelectorAll(".todo-add")];

    // get the buttons
    const btnClear = todoItem.querySelector(".clear");
    const btnDone = todoItem.querySelector(".check");

    btnClear.addEventListener("click", () => {
      taskClear(btnClear);
    });
    btnDone.addEventListener("click", () => {
      taskDone(btnDone);
      // fill the checkbox to identify that task is done
      const img = btnDone.querySelector("img");
      img.classList.toggle("img-show");
    });
  });
});
// append the todo tasks in the list
chectBtn.addEventListener("click", () => {
  // validate if the user do not enter the value
  if (input.value === "") {
    alert("pleace enter a tast!");
  }
  // if user enter the value then add this into the list
  else {
    var indx = new Date().getTime().toString();
    value = input.value;
    addTasks(indx, value);

    addInLocalStorage(indx, value, false);
    indx = indx + 1;
  }
});

function addTasks(id, value) {
  // new dom element is created
  const todoItem = document.createElement("div");
  const arrt = document.createAttribute("data-id");
  arrt.value = id;

  // intiliz the structure of the todo task
  todoItem.innerHTML = `<div class="todo-add border ">
        <span class="check "><img class= "check-img" src="./assets/images/icon-check.svg" alt=""/></span>
        <div class="text-area">
        
          <p  >${value}</p>
        </div>
        <span class="clear"
          ><img src="./assets/images/icon-cross.svg" alt=""
        /></span>
      </div>`;
  // now append the child into the list
  todoList.appendChild(todoItem);

  todoItem.children[0].children[1].setAttributeNode(arrt);
  // empty the input control for add new task

  input.value = "";
  // the effect on the check box when user enter the new task
  effectsTimer(chectBtn);
  // increment the counter value
  counter.textContent = ++i;
  // hide the default text of the todo list
  empty.className = "hide";
  // spreade oprator to apply the array mathood on the node list we use this otherwise array mathod like map, filte canot be used
  allTasks = [...todoList.querySelectorAll(".todo-add")];

  // get the buttons
  const btnClear = todoItem.querySelector(".clear");
  const btnDone = todoItem.querySelector(".check");

  btnClear.addEventListener("click", () => {
    taskClear(btnClear);
  });
  btnDone.addEventListener("click", () => {
    taskDone(btnDone);
    // fill the checkbox to identify that task is done
    const img = btnDone.querySelector("img");
    img.classList.toggle("img-show");
  });
}
// ******** fillter bottons implementation ******** //
// show all the task list
allBtn.addEventListener("click", () => {
  allTasks.forEach((task) => {
    task.classList.remove("hide");
    task.classList.remove("show");
  });
  toggleActiveBtn(allBtn);
});
// show tasks that are not done
activeBtn.addEventListener("click", () => {
  allTasks.forEach((task) => {
    if (task.children[1].classList.contains("done")) {
      task.classList.remove("show");
      task.classList.add("hide");
    } else {
      task.classList.add("show");
      task.classList.remove("hide");
    }
  });
  toggleActiveBtn(activeBtn);
});
// show the tasks that are done
completeBtn.addEventListener("click", () => {
  allTasks.forEach((task) => {
    if (!task.children[1].classList.contains("done")) {
      task.classList.remove("show");
      task.classList.add("hide");
    } else {
      task.classList.add("show");
      task.classList.remove("hide");
    }
  });
  toggleActiveBtn(completeBtn);
});
// for clean all the list
clearListBtn.addEventListener("click", () => {
  todoList.innerHTML = ``;
  const list = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  localStorage.clear();
  resetToEmpty();
});
// functions//
// use for add effect on the check box on the todo adder
function effectsTimer(btn) {
  btn.classList.add("show-img");
  btn.children[0].classList.add("img-show");
  setInterval(() => {
    btn.classList.remove("show-img");
    btn.children[0].classList.remove("img-show");
  }, 1000);
}

// to delete the spacific task from the list
function taskClear(btnClear) {
  // so we want to remove the task that's way target the parent Element and remove it
  const id = btnClear.parentElement.children[1].dataset.id;
  removeFromLocalStroge(parseInt(id));
  btnClear.parentElement.remove();

  // use the DOM first access the parent than target the spacific node or children
  if (!btnClear.parentElement.children[1].classList.contains("done")) {
    i = i - 1;
    counter.textContent = i;
    // check wheather all the tasks are remove so show the default text
    if (i === 0) {
      empty.className = "empty";
    }
  }
}
// to mark the spacific task on the list
function taskDone(btnDone) {
  btnDone.classList.toggle("show-img");
  btnDone.parentElement.children[1].classList.toggle("done");
  console.log(btnDone);
  const list = JSON.parse(localStorage.getItem("list"));
  const id = btnDone.parentElement.children[1].dataset.id;
  parseInt(id);
  const newList = list.map((task) => {
    if (task.id == id) {
      if (btnDone.parentElement.children[1].classList.contains("done")) {
        task.flag = true;
        console.log(task);

        return task;
      } else {
        task.flag = false;
        console.log(task);

        return task;
      }
    } else {
      console.log(task);
      return task;
    }
  });
  localStorage.setItem("list", JSON.stringify(newList));
  if (btnDone.classList.contains("show-img")) {
    i = i - 1;
    counter.textContent = i;
  } else {
    i = i + 1;
    counter.textContent = i;
  }
}

function resetToEmpty() {
  allTasks = [];

  empty.className = "empty";
  i = 0;
  counter.textContent = i;
  console.log(allTasks);
}
//function for add the blue color on the actice filter btn
function toggleActiveBtn(clickedBtn) {
  const filterBtns = document.querySelectorAll("#filter-btn");
  filterBtns.forEach((btn) => {
    btn.classList.remove("active-filter");
  });
  clickedBtn.classList.add("active-filter");
}
// ********** local storage implementation**************//

// fucction for add tasks into local storge
function addInLocalStorage(id, value, flag) {
  let task = { id, value, flag };
  const list = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  list.push(task);
  localStorage.setItem("list", JSON.stringify(list));
}
// function for reomve items from local stroge
function removeFromLocalStroge(id) {
  const list = JSON.parse(localStorage.getItem("list"));
  const newLit = list.filter((item) => {
    if (id == item.id) {
      console.log(id, item.id);
    } else {
      console.log(id, item.id);

      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(newLit));
}

//****** */ toggle between light and dark mode //
// $ light mode properties

sun.addEventListener("click", () => {
  sun.style.display = "none";
  moon.style.display = "block";
  todoAdd.style.backgroundColor = "white";
  header.style.background = `url(${pathLight}) center/cover no-repeat`;

  listContainer.style.backgroundColor = "white";
  document.body.style.backgroundColor = "white";
  filterBtnContainer.style.backgroundColor = "white";
  filterBtnContainer.style.color = "hsl(236, 9%, 61%)";

  statusbarBtns.style.color = "hsl(236, 9%, 61%)";
  drag.style.color = "hsl(236, 9%, 61%)";
  // filterBtnContainer.style.boxShadow = " 0px 8px 18px 0px hsl(236, 33%, 92%)";
  listContainer.style.boxShadow = "   0px 8px 18px 0px hsl(236, 33%, 92%)";
});
// dark mode properties
moon.addEventListener("click", () => {
  sun.style.display = "block";
  moon.style.display = "none";
  header.style.background = `url(${pathDark}) center/cover no-repeat`;
  todoAdd.style.backgroundColor = "hsl(235, 24%, 19%)";
  listContainer.style.backgroundColor = "hsl(235, 24%, 19%)";
  document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
  filterBtnContainer.style.color = "hsl(235, 19%, 35%)";
  filterBtnContainer.style.backgroundColor = "hsl(235, 24%, 19%)";
  statusbarBtns.style.color = "hsl(235, 19%, 35%)";
  drag.style.color = "hsl(235, 19%, 35%)";
  filterBtnContainer.style.boxShadow = " none";
  listContainer.style.boxShadow = " 0px 8px 48px 8px hsl(235, 21%, 11%)";
});
