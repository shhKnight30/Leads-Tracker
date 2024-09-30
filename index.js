myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("tab-btn")
const delBtn = document.getElementById("del-btn")
const popBtn = document.getElementById("pop-btn")
const shiftBtn = document.getElementById("shift-btn")
const ulEl = document.getElementById("ul-el")

tabBtn.addEventListener("click",function(tabs){
    chrome.tabs.query({active: true , currentWindow : true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads',JSON.stringify(myLeads))
        render(myLeads)
    })
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads))
if(leadsFromLocalStorage){
    render(myLeads)
}

delBtn.addEventListener('dblclick',function(){
    localStorage.clear()
    myLeads=[]
    ulEl.textContent=''
    render(myLeads)
})

function render(leads){
    listItems =''
    for (let i = 0; i < leads.length; i++) {
        const element = leads[i];
        listItems += `
        <li>
            <a target="_blank" href="${element}">${element}</a>
        </li>
        `
        
    }
    ulEl.innerHTML = listItems

}

inputEl.addEventListener("keydown",function(){
    if(event.key==="Enter"){
        myLeads.push(inputEl.value)
        inputEl.value=""
        localStorage.setItem('myLeads',JSON.stringify(myLeads))
        render(myLeads)
    }
})

saveBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value =""
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    render(myLeads)
})

popBtn.addEventListener("click",function(){
    myLeads.pop()
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    render(myLeads)
})

shiftBtn.addEventListener("click",function(){
    myLeads.shift()
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    render(myLeads)
})