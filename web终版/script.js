//根据i值随着待办事项长度变化而变化的特性
//采用拼接字符串的方法来创建出不同的id。
let todoItems = []; //存放代办事项
let finishedid=[];  //存放打勾后的盒子的id
let finishedid2=[];
let importantid=[]; //存放重要事项的id；
let finishedItems = []; //存放已经完成的事项
//数组排序函数
function myFunction(arr){
	arr.sort(function(a,b){return a-b});
}




function delitebyvaluesort(arr,text) {
    if(text!=0){
    for (let i = 0; i < arr.length; i++) {  
    //console.log(text)
    if (text <= arr[i]) {    
    //console.log('找到了：'+arr[i]+'下标：'+i);   
    //查找到以后执行id调整 
    arr[i]=arr[i]-1;
    console.log(arr)
    
    //splice参数说明：第一个参数是要删除的下标，第二个是删除下标后面的几条数据，包括自己，写1就是删除自身一个，要是2它会把自身和后面的一位也删掉
    
    //如果数组里要是有多个元素是同样的值，就把下面return false;注释掉，不然只会删除最前面的一个元素
    
    }
    } 
    }else {  
    arr.splice(0,1)
    for(let l=0;l<arr.length;l++){
       arr[l]=arr[l]-1
    }

    }
    
    }
    

    function delitem(arr,text) {
        //根据值来删除的函数
        for (let i = 0; i < arr.length; i++) {
        
        if (text == arr[i]) {
        
        console.log('找到了：'+arr[i]+'下标：'+i);
        
        //查找到以后执行删除
        
        arr.splice(i,1);
        
        //splice参数说明：第一个参数是要删除的下标，第二个是删除下标后面的几条数据，包括自己，写1就是删除自身一个，要是2它会把自身和后面的一位也删掉
        
        //如果数组里要是有多个元素是同样的值，就把下面return false;注释掉，不然只会删除最前面的一个元素
        
        return false;
        
        } else {
        
        console.log('没找到：'+text);
        
        }
        
        }
        
        }
        
function renderTodoItemList(todoItems, finishedItems) {
    //对代办事项的操作
    //下面是对代办事项进行一个放置
    let paneEl = document.querySelector("#todolist > .list-pane");
    //querySelector找节点的一个js内置函数
    paneEl.innerHTML = "";
    //设置一个" "用于存放代码
    
    //下面是添加代办事项的代码，其中我给每一个事项都赋值了一个id
    for (let i=0; i < todoItems.length; i++ ) {
        let item = todoItems[i];
        //console.log(item);
        let itemDiv = document.createElement("div");
        //动态地创建div节点
        itemDiv.className = "todo-item";
        //用拼接的方法创建不同的id，i是一个数字，从0编号到代办事项的最后一个
        itemDiv.id="c"+i; //赋值id，方便根据找到待办事项（按顺序排列）

        let inputEl = document.createElement("input");
        //设置一个方框，用于让用户打勾做好的选项
        inputEl.type = "checkbox";
        //checkbox可以打勾
        inputEl.id="boxs"+i;
        

        inputEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            //这边我认为打钩不移动出去好
            //改成一个打钩一次后了（也就是完成了任务）checkbox按钮就失效了。
            var  flag=document.getElementById('boxs'+i).checked;
            if (flag){
                document.getElementById(i).classList.add("che")
                alert('耶，完成了一个任务')
                //prompt("开心吗?")
                //打勾后按钮就失效(getElementById一个根据id找元素的方法)
                document.getElementById('boxs'+i).disabled=true

                };
                //存储了打勾事项的id
                finishedid.push(i);
                finishedid2.push(i)

        });

        let titleEl = document.createElement("div");
        titleEl.className = "title";
        titleEl.contentEditable="true"
        //给事项的id赋值
        titleEl.id=i

        //感叹号打勾字体变红部分
        let importanceEl = document.createElement("div");
        importanceEl.className = "important-flag"
        importanceEl.innerText = "!";
        importanceEl.id="a"+i
        

        importanceEl.addEventListener("click", (e) => {
            //console.log("click: ", item);
            if (item.isImportance) {
                item.isImportance = false;
                importanceEl.classList.remove("open");
                var cq=document.getElementById(i)
                cq.style.color="black"
                delitem(importantid,i)
            } else {
                item.isImportance = true;
                importanceEl.classList.add("open");
                var cq=document.getElementById(i)
                cq.style.color="red"
                importantid.push(i)
            }
        });


        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.id="b"+i
        deleteBtn.addEventListener("click", (e) => {
    
            if (confirm("delete?")){
                de=document.getElementById("c"+i)
                de.remove()
                todoItems.splice(i,1)
                finishedid.sort(function(a,b){return a-b});
                //console.log(finishedid)
                delitebyvaluesort(finishedid,i)
                importantid.sort(function(a,b){return a-b});
                delitebyvaluesort(importantid,i)
                console.log(importantid)

                //importantid.splice(i,1)
                //console.log(importantid)
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
        for (let i=0; i < finishedid.length; i++ ) {
            //if (finishedid[0]!="0"){
                //for (let i=0; i < finishedid.length; i++ ){
                //finishedid[i]=finishedid[i]-1;
                //console.log(finishedid[i]);}
            //这些是失败的探索
            //}
            //else{
                //for (let j=0; j < finishedid.length; j++ ){
                    //if(finishedid[j]==finishedid2[j+1]){
                    //finishedid[j]=finishedid[j]-1;}
                    //console.log(finishedid[j]);}
            //}
            let fid = finishedid[i];
            document.getElementById("boxs"+fid).disabled=true;
            //console.log(fid);
            //sc="boxs"+fid
            //str=fid.charAt(sc.length-1) //取finishedid的最后一个数字
            //为什么?试试下面这一行(去掉下面这行的双斜杠)
            //console.log(fid)
            
            document.getElementById(fid).classList.add("che")
        }
        for(let j=0; j<importantid.length; j++){
            let imp=importantid[j];
            document.getElementById(imp).style.color="red";

        }

    
    });

    hisBtnEl.addEventListener("click", (e)=>{
        if (hisBtnEl.classList.contains("open")) {
            hisBtnEl.classList.remove("open");
            renderTodoItemList(todoItems, finishedItems)
            for (let i=0; i < finishedid.length; i++ ) {
            let fid = finishedid[i];
            document.getElementById("boxs"+fid).disabled=true;
            
            document.getElementById(fid).classList.add("che");}
            for(let j=0; j<importantid.length; j++){
                let imp=importantid[j];
                console.log(imp)
                document.getElementById(imp).style.color="red";
                
            }    
        } 

            
        else {
            hisBtnEl.classList.add("open");
            renderFinishedItemList(todoItems, finishedItems)
        }
        
    })

    // let btnEl = document.querySelector("#todolist #add-btn");
}

renderInputPane(todoItems, finishedItems);
renderTodoItemList(todoItems, finishedItems);