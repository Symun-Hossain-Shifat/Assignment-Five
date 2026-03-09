document.getElementById('signin-btn').addEventListener('click',function(event){
    event.preventDefault();
    const user = document.getElementById('username');
const uservalue = user.value;

const pass = document.getElementById('password');
const passvalue = pass.value;

 if(uservalue === 'admin' && passvalue === 'admin123' ){
    alert('Sign In Successfull');
    window.location.assign("index.html");
 }else{
    alert('Invalid Information');
    return;
 }
})