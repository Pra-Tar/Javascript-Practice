input=document.querySelector("input")
start=document.querySelector(".start")
display=document.querySelector(".div2")
stop1=document.querySelector(".stop")
reset=document.querySelector(".reset")

input.value=0
count=0
let timerID1=[]

function startTimer(){
    start.disabled = true
    let l=count
    for(let i=1;i<=l+1;i++){
        timerID1.push(setTimeout(()=>{
            display.innerHTML=count--
            if(count<0){
                display.innerHTML="Time Out!"
                start.disabled=false
            }
        },i*1000))
    }
    
}
start.addEventListener('click',()=>{
    if(input.value>0){
        count=input.value
        startTimer()
    }
    else
        alert("Enter number greater than 0.")
})

function clearTimeoutAll(timerID1) {
    console.log(1)
    while (timerID1.length > 0) {
      const timeoutId = timerID1.shift(); // Get and remove the first timeout ID from the queue
      clearTimeout(timeoutId); 
    }
}

reset.addEventListener('click',()=>{
    clearTimeoutAll(timerID1)
    input.value=0
    display.innerHTML=""
    start.disabled=false
})