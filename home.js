let datas = [];

// Import all element by DOM
const parent = document.getElementById('cards-container');
const priority = document.getElementById('priority-badge');
const countcard = document.getElementById('count-issue');
const openbutton = document.getElementById('openbtn');
const allbutton = document.getElementById('allbtn');
const closedbutton = document.getElementById('closedbtn');
const searchbutton = document.getElementById('searchbtn');
const search = document.getElementById('searchfield');



// showLoading spinner
const showloading  = () => {
parent.innerHTML = `<span class="loading loading-spinner loading-xl"></span>`
}
// API data

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
showloading();

fetch(url)
.then(res => res.json())

.then(data => {
    datas = data.data;
    parent.innerHTML = ""
    setTimeout(() => {
  showallcard(datas);
},300)
    
   
}).catch( error => console.error(" Error : " , error));





// handle all three button activity

allbutton.addEventListener('click',()=>{
  showloading();
  setTimeout(() => {
showallcard(datas);
  },300);
  allbutton.classList.add('btn-active')
  closedbutton.classList.remove('btn-active')
  openbutton.classList.remove('btn-active')
})
openbutton.addEventListener('click',()=>{
  showloading();
  setTimeout(() => {
showallcard(datas.filter(i => i.status === "open"));
  },300);
  allbutton.classList.remove('btn-active')
  closedbutton.classList.remove('btn-active')
  openbutton.classList.add('btn-active')
})
closedbutton.addEventListener('click',()=>{
  showloading();
setTimeout(() => {
showallcard(datas.filter(i => i.status === "closed"));
},300);
  allbutton.classList.remove('btn-active')
  closedbutton.classList.add('btn-active')
  openbutton.classList.remove('btn-active')
})
// show items depends on status
const showallcard = (datas) =>{
parent.innerHTML = "";

countcard.innerText = datas.length;
 datas.forEach(element => {
  let card = document.createElement('div');    
     card.innerHTML = `
      <div onclick ="showmodal(${element.id})" class="p-2  cursor-pointer space-y-2 border-t-4  ${element.status === 'open'? 'border-[#00A96E]':'border-[#A855F7]'} shadow-md rounded-md">
        <div class="flex justify-between">
          <img src="${element.status === "open"? 'assets/Open-Status.png':'assets/Closed- Status .png'}" alt="">
         <div class="badge badge-soft  font-bold ${element.priority === "high"? 'badge-error' : element.priority === "medium"? 'badge-warning' : 'badge-success'} ">${element.priority.toUpperCase()}</div>
         </div>
         <div >
         <h2    class=" font-bold line-clamp-1">${element.title}</h2>
         <p  class=" line-clamp-2 text-gray-600">${element.description}</p>
         </div>
         
        <div class="badge-container flex gap-2">
         <div class="badge badge-soft badge-warning font-bold ${element.labels.length === 1? 'hidden':''} "><span><i class="fa-solid fa-bug"></i></span> ${element.labels[0]}</div>
         <div class="badge badge-soft  line-clamp-1 badge-error font-bold ${element.labels.length === 1? 'hidden':''}"><span><i class="fa-solid fa-life-ring"></i></span>${element.labels[1]}</div>
        <div class="badge badge-soft  line-clamp-1 badge-success  font-bold ${element.labels.length === 2? 'hidden':''}"><span><i class="fa-brands fa-gg"></i></span>${element.labels[0]}</div>
         </div>
         <div class=" bg-gray-100 p-4 flex flex-col gap-3 rounded-md">
         <div>
         <p class="text-gray-500 font-semibold text-[14px]">${element.author}</p>
             <p class="text-gray-500 font-semibold text-[14px]">${element.updatedAt}</p>
         </div>
             <div class="badge badge-outline ${element.status === "open"?'badge-info':'badge-error'}">${element.status}</div>
         </div>
     </div>
 `
 parent.appendChild(card);

 })
};


//  Show modals
 const showmodal = (data) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${data}`)
  .then(res => res.json())
  .then(data => {
 element = data.data;
 const modals = document.getElementById('modals-container');
 modals.innerHTML = `
 <div class="modal-box">
    <div class="p-2 space-y-2 border-t-4  ${element.status === 'open'? 'border-[#00A96E]':'border-[#A855F7]'} shadow-md rounded-md">
        <div class="flex justify-between">
          <img src="${element.status === "open"? 'assets/Open-Status.png':'assets/Closed- Status .png'}" alt="">
         <div class="badge badge-soft  font-bold ${element.priority === "high"? 'badge-error' : element.priority === "medium"? 'badge-warning' : 'badge-success'} ">${element.priority.toUpperCase()}</div>
         </div>
         <div >
         <h2  onclick ="showmodal(${element.id})"  class=" cursor-pointer font-bold ">${element.title}</h2>
         <p  onclick ="showmodal(${element.id})" class=" cursor-pointer text-gray-600">${element.description}</p>
         </div>
         
        <div class="badge-container flex gap-2">
         <div class="badge badge-soft badge-warning font-bold ${element.labels.length === 1? 'hidden':''} "><span><i class="fa-solid fa-bug"></i></span> ${element.labels[0]}</div>
         <div class="badge badge-soft  badge-error font-bold ${element.labels.length === 1? 'hidden':''}"><span><i class="fa-solid fa-life-ring"></i></span>${element.labels[1]}</div>
        <div class="badge badge-soft   badge-success  font-bold ${element.labels.length === 2? 'hidden':''}"><span><i class="fa-brands fa-gg"></i></span>${element.labels[0]}</div>
         </div>
         <div class=" bg-gray-100 p-4 flex flex-row justify-between items-center rounded-md">
         <div>
         <p class="text-gray-500 font-semibold text-[14px]">${element.author}</p>
             <p class="text-gray-500 font-semibold text-[14px]">${element.updatedAt}</p>
         </div>
             <div class="badge badge-outline ${element.status === "open"?'badge-info':'badge-error'}">${element.status}</div>
         </div>
     </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-success">Close</button>
      </form>
    </div>
  </div>`
  modals.showModal();
  }).catch( error => console.error(" Error : " , error));}

// show cards depends search

searchbutton.addEventListener('click',function () {
  const searchvalue = search.value;
showsearchitem(searchvalue);
})




const showsearchitem = (text) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    datas = data.data;
    showallcard(datas);
  })
}

