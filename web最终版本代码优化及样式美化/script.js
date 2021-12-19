let time = new Date();
let year=time.getFullYear(); //获取当前年份
let month=time.getMonth(); 
let day=time.getDate(); 
let date=year+'年'+month+'月'+day+'日';

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
        let item = todoItems[i]
        let itemDiv = document.createElement("div");
        //动态地创建div节点
        itemDiv.className = "todo-item";

        let inputEl = document.createElement("input");
        //设置一个方框，用于让用户打勾做好的选项
        inputEl.type = "checkbox";
        inputEl.className="check"
        //checkbox可以打勾
        

        inputEl.addEventListener("change", (e) => {
            item.isFinished=true
            finishedItems.push(item)
            todoItems.splice(i, 1);
            alert('完成了一个任务')
            renderTodoItemList(todoItems, finishedItems)});

        let titleEl = document.createElement("div");
        titleEl.className = "title";
        titleEl.contentEditable="true" //让文档可以编辑
        //监听函数，监听到用户修改事项后，监听函数帮我们确定用户改动的文本的位置，然后框内改动后的值修改todoitems，
        //使用innerText插入文本
        titleEl.addEventListener("mousedown",(e)=>{
            //文本框监听到鼠标点击
            let mark=0
            //设计个标记mark，如果mark=0说明没有被执行过下面的函数，也就是用户还没改动。
            let sl=todoItems[i].title
            //存放一下点击的文本框改动前的事项，sl是点击文本框后就立刻保存
            titleEl.addEventListener("input",(e)=>{
            //文本框监听到改动，往下执行
                if(mark==0){ //mark的作用
                titleEl.addEventListener("mouseleave",(e)=>{
                //监听鼠标移出文本框事件
                if(sl!=titleEl.innerText){ //不相等说明用户改动了。
                if(mark==0 && confirm("确定改动？")){
                todoItems[i].title = titleEl.innerText;
                mark=1;  //mark设置成1，说明函数confirm被执行过，防止一直询问
                renderTodoItemList(todoItems, finishedItems);
            
                sl=titleEl.innerText}
                else{
                todoItems[i].title=sl; //sl存放一下点击的文本框改动前的事项。
                renderTodoItemList(todoItems, finishedItems); //重新恢复不修改的样子
                mark=1; //mark设置成1，说明函数被执行过
                }}})}})
            //监听器会确定i的值，也就是改动的位置

            //下面这行在控制台中打印，帮助调试程序。
            
        })
        //监听


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

        let finishedtime = document.createElement("div");
        finishedtime.className = "finishedtime";        //创建个div
        finishedtime.innerText = date;

        if (item.isImportance) {
            importanceEl.classList.add("open");
            itemDiv.classList.add("important")
        }
        

        titleEl.innerText = item.title;
    

        itemDiv.append(titleEl);
        itemDiv.append(importanceEl);
        itemDiv.append(finishedtime)      //插入创建的包含时间的div
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
            alert("请输入有效文本")
        }else{
        todoItems.push({
            title: inputEl.value,
            isFinished: false,
            isImportance: false,   })
        inputEl.value=""  //输入文本后，清空输入框
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