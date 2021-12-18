
let todoItems = []; //存放代办事项

let finishedItems = []; //存放已经完成的事项
        
function renderTodoItemList(todoItems, finishedItems) {
    //对代办事项的操作
    //下面是对代办事项进行一个放置
    let paneEl = document.querySelector("#todolist > .list-pane");
    //querySelector找节点的一个js内置函数
    paneEl.innerHTML = "";
    //设置一个" "用于存放代码
    
    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        let itemDiv = document.createElement("div");
        //动态地创建div节点
        itemDiv.className = "todo-item";

        let inputEl = document.createElement("input");
        //设置一个方框，用于让用户打勾做好的选项
        inputEl.type = "checkbox";
        inputEl.className="check"
        //checkbox可以打勾
        

        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            todoItems.splice(i, 1);
            alert('完成了一个任务')
            renderTodoItemList(todoItems, finishedItems)});

        let titleEl = document.createElement("div");
        titleEl.className = "title";
        titleEl.contentEditable="true" //让文档可以编辑
        //监听函数，监听到用户修改事项后，监听函数帮我们确定用户改动的文本的位置，然后框内改动后的值修改todoitems，
        //使用innerText插入文本
        titleEl.addEventListener("input",(e)=>{
            todoItems[i].title = titleEl.innerText
            //监听器会确定i的值，也就是改动的位置

            //下面这行在控制台中打印，帮助调试程序。
            console.log(todoItems)
            
        })


        //感叹号打勾字体变红部分
        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        

        if (item.isImportance) {
            importanceEl.classList.add("open");
            itemDiv.classList.add("important");
        }

        importanceEl.addEventListener("click", (e) => {
            console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
            } else {
                item.isImportance = true;
            }

            renderTodoItemList(todoItems, finishedItems);
        });


        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.className="deletexx"
        deleteBtn.addEventListener("click", (e) => {
    
            if (confirm("delete?")){
                todoItems.splice(i,1) //把事项从数组中删除
                console.log(deleteBtn.parentNode) 
                //parentnode，找到它的父亲节点，打印出来看看它的值
                //下面用remove把节点移出dom
                deleteBtn.parentNode.remove()
                }}
            );


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
    //FOR 循环控制i从0一步步往下加
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
            itemDiv.classList.add("important")
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
        //console.log(finishedid)
        if(inputEl.value==""){
            alert("请输入有效值")
        }else{
        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false,   })
        inputEl.value=""  //输入文本后，清空输入框。
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");}
            
      }
    

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
        
    })

    // let btnEl = document.querySelector("#todolist #add-btn");
}
renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);