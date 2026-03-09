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

