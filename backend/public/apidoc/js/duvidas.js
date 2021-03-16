let codDuvida;

function showAnswer(){
    if($('#postar').is(':checked')){
        $('#resposta').prop('disabled',false)
    }
    else{
        $('#resposta').prop('disabled',true)
    } 
}

function resolver(){
    let resposta = null;
    console.log($('#resposta').val().length)
    if($('#resposta').val().length > 0){
        $.post(`/duvidas/${codDuvida}/resolver`, { resposta:$('#resposta').val() }, () => location.reload())
    }
    else
        $.post(`/duvidas/${codDuvida}/resolver`, {}, () => location.reload())
}

async function login(password){
    const response = await $.post("/administrativo/acesso", { password })
    if(response){
        localStorage.setItem("password", password)
    }else{
        window.location = "erro.html"
    }
}