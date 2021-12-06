
let todoItems = [];

let finishedItems = [];

function renderTodoItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";
    //找到代办事项的css样式
    

    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        console.log(item);
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";
        itemDiv.id="c"+i; //根据id删元素

        let inputEl = document.createElement("input");
        //读取用户输入值
        inputEl.type = "checkbox";

        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            //console.log(i)
            todoItems.splice(i, 1); //这边我认为打钩不移动出去好


            //console.log("finshed:", i, todoItems, finishedItems );
            renderTodoItemList(todoItems, finishedItems);

        });

        let titleEl = document.createElement("div");
        titleEl.className = "title";
        titleEl.contentEditable="true"
        titleEl.id=i

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        importanceEl.id="a"+i

        
        //在这里删除了递归，感觉这样能增加代码易读性，或者还有好处（因为少了递归函数）
        //可以加快运行速度？
        importanceEl.addEventListener("click", (e) => {
            //console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
                importanceEl.classList.remove("open");
                var cq=document.getElementById(i)
                cq.style.color="black"
            } else {
                item.isImportance = true;
                importanceEl.classList.add("open");
                var cq=document.getElementById(i)
                //检验一下cq console.log(cq.className)
                cq.style.color="red"
            }
        });


        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.id="b"+i
        deleteBtn.addEventListener("click", (e) => {
    
            if (confirm("delete?")){
                ccq=document.getElementById("c"+i)
                //console.log(ccq.id)
                //console.log(ccq.className)
                ccq.remove()
                console.log(todoItems)
                todoItems.splice(i,1)
            }
            });


        titleEl.innerText = item.title;
        //往itemdiv加节点
        itemDiv.append(inputEl);
        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(deleteBtn);
        
        paneEl.append(itemDiv);
    }

}

function renderFinishedItemList(todoItems, finishedItems) {

    let paneEl = document.querySelector("#todolist > .list-pane");
    paneEl.innerHTML = "";

    for (let i=0; i < finishedItems.length; i++ ) {
        let item = finishedItems[i];
        let itemDiv = document.createElement("div");
        itemDiv.className = "todo-item";


        let titleEl = document.createElement("div");
        titleEl.className = "title";

        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        if (item.isImportance) {
            importanceEl.classList.add("open");
        }
        

        titleEl.innerText = item.title;

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        
        paneEl.append(itemDiv);
    }

}


function renderInputPane(todoItems) {
    let inputPaneEl = document.querySelector("#todolist > .input-pane");

    let addBtnEl = inputPaneEl.querySelector("#add-btn");
    let hisBtnEl = inputPaneEl.querySelector("#his-btn");

    addBtnEl.addEventListener("click", (e)=>{
        let inputEl = inputPaneEl.querySelector("input");

        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false, 
        })
        
        //console.log("add a item: ", inputEl.value);
        renderTodoItemList(todoItems, finishedItems);
    });

    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            renderTodoItemList(todoItems, finishedItems)
        } else {
            hisBtnEl.classList.add("open");
            renderFinishedItemList(todoItems, finishedItems)
        }
    });

    // let btnEl = document.querySelector("#todolist #add-btn");
}

renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);