async function login(){
    const password = $("#password").val()
    const response = await $.post("/administrativo/acesso", { password })
    const urlParams = new URLSearchParams(window.location.search)
    if(response){
        localStorage.setItem("password", password)
        window.location = `/${urlParams.get('redirect')}`
    }else{
        window.location = "erro.html"
    }
}