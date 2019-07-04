var respostas = null;
var respostasDefault = null;

$(document).ready(function(){
    $.getJSON("https://josenelsoncultri.github.io/lulubot/data/custom_answers.json", function(data){
        respostas = $.parseJSON(JSON.stringify(data));
    });
    $.getJSON("https://josenelsoncultri.github.io/lulubot/data/default_answers.json", function(data){
        respostasDefault = $.parseJSON(JSON.stringify(data));
    });    


    $("#user_message").change(function(e){
        var chatHistory = $("#chat_history");
        var actual_message = "<strong>você:</strong> " + $(this).val();
        var bot_answer = processarResposta($(this).val());
        var bot_full_answer = "LuluBOT: " + bot_answer;

        chatHistory.html(chatHistory.html() + (chatHistory.html().trim() != "" ? "<br />" : "") + actual_message);
        $(this).val("");
        
        var delay = 2000;

        lockText();
        setTimeout(function(){
            chatHistory.html(chatHistory.html() + (chatHistory.html().trim() != "" ? "<br />" : "") + bot_full_answer);
            doScroll();
            unlockText();
        }, delay);

        doScroll();
    });
});

function lockText()
{
    var user_message = $("#user_message");
    user_message.prop("disabled", true);
    user_message.val("LuluBOT está digitando, aguarde...");
}

function unlockText()
{
    var user_message = $("#user_message");
    user_message.prop("disabled", false);
    user_message.val("");
    user_message.focus();
}

function doScroll()
{
    if ($("#auto_scroll").is(":checked"))
    {
        $("#chat_history").scrollTop($("#chat_history").prop("scrollHeight"));
    }
}

function processarResposta(mensagem)
{
    var resposta_encontrada = "";
    for(var i = 0; i < respostas.length; i++)
    {
        if (mensagem.indexOf(respostas[i].tag) > -1) 
        {
            resposta_encontrada = respostas[i].answer.trim();
            break;
        }
    }

    if (resposta_encontrada.trim() != "")
    {
        return resposta_encontrada.trim();
    }
    else
    {
        var x = Math.floor(Math.random() * respostasDefault.length);
        var resp = "";
        
		if (respostasDefault[x].img_url)
		{
			resp += " <img src=\"" + respostasDefault[x].img_url + "\" />";
        }
        else if (respostasDefault[x].xingamento)
        {
            resp = respostasDefault[x].xingamento;
        }

        return resp;
    }
}