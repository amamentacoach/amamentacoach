async function login(){
    const password = $("#password").val()
    const response = await $.post("/administrativo/acesso", { password })
    if(response){
        localStorage.setItem("logado", true)
        window.location = "/duvidas"
    }else{
        window.location = "erro.html"
    }
}