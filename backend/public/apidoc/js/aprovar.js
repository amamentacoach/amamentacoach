function showAnswer(){
    if($('#postar').is(':checked')){
        $('#resposta').prop('disabled',false)
    }
    else{
        $('#resposta').prop('disabled',true)
    } 
}

function aprovar(idMae){
    $.post(`/maes/${idMae}/aprovar`, {}, () => location.reload())
}

function reprovar(idMae){
    $.post(`/maes/${idMae}/reprovar`, {}, () => location.reload())
}

async function login(){
    const password = localStorage.getItem("password")
    const response = await $.post("/administrativo/acesso", { password })
    if(!response){
        window.location = "/login?redirect=aprovar"
    }
}