let buttons = document.querySelectorAll('button')
let alertP = document.querySelector('.alert')
let textInput = document.querySelector('input')
let lisItems = document.querySelector('.list_container')
let grocery = ''
let editting = false
let target 


window.addEventListener('DOMContentLoaded',initialDisplay)
textInput.addEventListener('change',(e)=>{
    grocery = e.target.value
})

buttons.forEach((item)=>{
    buttons = document.querySelectorAll('button')
    item.onclick=(e)=>{
        let clearBtn=document.getElementById('clearAll');
        e.preventDefault()
        if(item.id=="submit"){
            if(editting==true){
                change()
            }else{
                submit(clearBtn)
            }
        }
        if(item.id=='clearAll'){
           clearAll(clearBtn)

        }
    }
})

function displays(){
    const id = new Date().getTime().toString()
    console.log(id)
    const contentDiv = document.createElement('div')
    let attr = document.createAttribute('class')
    attr.value="listItems"
    let idAttr = document.createAttribute("id")
    idAttr.value =`${id}`
    contentDiv.setAttributeNode(attr)
    contentDiv.setAttributeNode(idAttr)
    console.log(contentDiv)
    let firstcap = grocery.charAt(0).toUpperCase()
    let rest = grocery.slice(1)

    grocery = firstcap + rest
    console.log(grocery)
    let content = 
                `
                    <p>${grocery}</p>
                    <div class="icons">
                        <button id="edit">
                            <i class="fa-solid fa-pen-to-square pen"></i>
                        </button>
                        <button id="clear">
                            <i class="fa-solid fa-trash trash"></i>
                        </button>
                    </div>
                `
    contentDiv.innerHTML=content
    lisItems.appendChild(contentDiv)
    localStorage.setItem(id,grocery)
    let btns = document.querySelectorAll(".list_Container button")
    btns.forEach((item)=>{
        item.onclick=()=>{
            if(item.id =="clear"){
                clrItem(item)
            }
            if(item.id=="edit"){
                target = item
                editItem(item)
            }
        }
    })
}

function submit(clr){
     if(textInput.value !==""){
            displays()
            textInput.value=''
            clr.classList.remove('clear')
            alertP.style.backgroundColor="rgb(102, 241, 121)"
            alertP.innerText="Item Added to List"
            setTimeout(()=>{
            alertP.style.backgroundColor="transparent"
            alertP.innerText=""
        },1000)
    }else{
            alertP.style.backgroundColor="rgb(236, 157, 157)"
            alertP.innerText="Please Add Item"
            setTimeout(()=>{
            alertP.style.backgroundColor="transparent"
            alertP.innerText=""
            },1000)
    }
}

function clearAll(clr){
    lisItems.innerHTML=""
        clr.classList.add('clear')
        alertP.style.backgroundColor="rgb(236, 157, 157)"
        alertP.innerText="Empty List"
        textInput.value=''
        localStorage.clear()
        setTimeout(()=>{
        alertP.style.backgroundColor="transparent"
        alertP.innerText=""
    },1000)
    editting=false
    document.querySelector("#submit").innerText="Submit"
}
function clrItem(item){
    let list = item.parentElement.parentElement
    list.remove()
    localStorage.removeItem(list.id)
    textInput.value=''
    document.querySelector("#submit").innerText="Submit"
    if(localStorage.length==0){
        document.getElementById("clearAll").classList.add('clear')
        alertP.style.backgroundColor="rgb(236, 157, 157)"
        alertP.innerText="Empty List"
        textInput.value=''
        setTimeout(()=>{
        alertP.style.backgroundColor="transparent"
        alertP.innerText=""
    },1000)
    }
    editting=false
}

function editItem(item){
    let list = item.parentElement.parentElement
    let editText = localStorage.getItem(list.id)
    console.log(editText)  
    textInput.value=editText
    document.querySelector("#submit").innerText="Edit";
    editting = true
}

function change(){
    if(grocery==""){
        alertP.style.backgroundColor="rgb(236, 157, 157)"
        alertP.innerText="Please Add Item"
        setTimeout(()=>{
            alertP.style.backgroundColor="transparent"
            alertP.innerText=""
        },1000)
    }else{
        let firstcap = grocery.charAt(0).toUpperCase()
        let rest = grocery.slice(1)
        grocery = firstcap + rest
        let list = target.parentElement.parentElement
        list.firstElementChild.innerText = grocery
        localStorage.setItem(list.id,grocery)
        textInput.value=""
        editting=false
        document.querySelector("#submit").innerText="Submit"
        alertP.style.backgroundColor="rgb(102, 241, 121)"
        alertP.innerText="Item Updated"
        setTimeout(()=>{
            alertP.style.backgroundColor="transparent"
            alertP.innerText=""
        },1000)
    }
}

function initialDisplay(){
    if(localStorage.length !==0 ){

        let objList = Object.entries(localStorage)
        objList.forEach((item)=>{
            const contentDiv = document.createElement('div')
                let attr = document.createAttribute('class')
                attr.value="listItems"
                let idAttr = document.createAttribute("id")
                idAttr.value =`${item[0]}`
                contentDiv.setAttributeNode(attr)
                contentDiv.setAttributeNode(idAttr)
                console.log(contentDiv)
                let content = 
                    `
                        <p>${item[1]}</p>
                        <div class="icons">
                            <button id="edit">
                                <i class="fa-solid fa-pen-to-square pen"></i>
                            </button>
                            <button id="clear">
                                <i class="fa-solid fa-trash trash"></i>
                            </button>
                        </div>
                    `
        contentDiv.innerHTML=content
        lisItems.appendChild(contentDiv)
        let btns = document.querySelectorAll(".list_Container button")
        btns.forEach((item)=>{
            item.onclick=()=>{
                if(item.id =="clear"){
                    clrItem(item)
                }
                if(item.id=="edit"){
                    target = item
                    editItem(item)
                }
            }
        })
        })
    }else{
        let clearBtn=document.getElementById('clearAll');
        clearBtn.classList.add("clear")
    }

}
