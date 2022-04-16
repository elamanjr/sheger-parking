let loginBtn = document.getElementById("loginBtn")
let form = document.getElementById("login-form")


loginBtn.onclick=(event)=>{

    event.preventDefault();
    event.stopPropagation();

    let fields = [username,password];

    fields.forEach (key=>{
    key=key.id
            if(form[key].value.trim().length==0){
            document.getElementById(key+"Error").outerHTML = `<div id="`+key+`Error" class="errorMessage">*this field can't be empty</div>`
            }
            else{
                document.getElementById(key+"Error").innerHTML=``
            }

        })
        location.replace("/html/overview.html")
}