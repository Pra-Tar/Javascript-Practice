// ------------------Section-1-------------------------
// Section-1 : Displays already exsisting data in the API

const listItem=document.querySelector('#list-item')
const todoText=document.querySelector('#todo-text')
const submit=document.querySelector('#submit')
let user_Id=0

function displayData(data){
    data.forEach(d => {
        newEle=document.createElement('li')
        newEle.id = `l_${d.id}`
        newEle.innerHTML=`
            <input type="checkbox" id="c_${d.id}" onchange="checkUncheck('c_${d.id}')">
            <span id="s_${d.id}">${d.title}</span>
            <button id="b_${d.id}">Delete</button>
        `
        listItem.appendChild(newEle)
        user_Id+=1
    });
}




function fetchData(){
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((res)=>{
        if(!res.ok){
            throw new Error(`Result status :${res.status}`)
        }
        return res.json()
    }).then(data=>displayData(data))
    .catch((err)=>{
        console.log(err)
    })
}


fetchData()

//-------------------Section-1-----------------------


//-------------------Section-2----------------------
// Section:2 Adding a new resource in UI as well as posting it on API 

submit.addEventListener('click',()=>{
    txt = todoText.value
    if(txt!=''){
        console.log(txt, user_Id)
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            body:JSON.stringify({
                title:`${txt}`,
                body:'bar',
                id:user_Id+1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => response.json()).then((data) => {
            displayData([data])

        }).catch((err)=>{console.log(err)})
    }
})


//-------------------Section-2----------------------



//------------------Section-3---------------------
//Section-3: Deleting a task 
// we will use event delegation so that we dont have to attach event listner on every single 
// li element rather we will apply it on its parent ul.


listItem.addEventListener('click', (event) => {
    if (event.target.id.startsWith('b_')) {
      const li = event.target.closest('li');
      li.remove();
    }
});

//------------------Section-3-------------------

function checkUncheck(id){
    checkbox=document.querySelector(`#${id}`)
    idNumber= id.slice(2,3)

    if(checkbox.checked){
        document.querySelector(`#s_${idNumber}`).style.textDecoration = 'line-through'
    }
    else{
        document.querySelector(`#s_${idNumber}`).style.textDecoration = 'none'
    }
}
