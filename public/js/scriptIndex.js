/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

limite = 4;

$(document).ready(function () {
    $.ajax({
        type: "POST",
        data: {limite: limite},
        url: "evento/buscar",
        dataType: 'json',
        success: function (evento) {
            $texto = "";
            for (var i = 0; i < evento.length; i++) {
                $texto = $texto
                        + "<div class=\"panel panel-default\">"
                        + "<a class=\"btn btn-dark\" id=\"deletar\" style=\"float:right\" value=\"" + evento[i].id + "\">Deletar</a>"
                        + "<button class=\"btn btn-dark\" id=\"editar\" style=\"float:right\" value=\"" + evento[i].id + "\">Editar</button>"
                        + "<div class=\"panel-heading\">"
                        + "<p id=\"id_evento\" style=\"float:left\">" + evento[i].id + "</p>"
                        + "<h3 class=\"panel-title\">" + evento[i].titulo + "</h3>"
                        + "</div>"
                        + "<div class=\"panel-body\">"
                        + "Descrição: " + evento[i].descricao + "<br/>"
                        + "Data: " + evento[i].data + "<br/>"
                        + "Email: " + evento[i].email + "<br/>"
                        + "</div>"
                        + "<div class=\"panel-footer\">"
                        + "" + evento[i].local + ""
                        + "</div>"
                        + "</div>";
            }
            $("#lista_de_eventos").html($texto);
        },
        beforeSend: function () {
            $('#loading').css({display: "block"});
        },
        complete: function (msg) {
            $('#loading').css({display: "none"});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocorreu um erro: " + errorThrown + " :(");
        }
    });
});

$(document).on("click", "#deletar", function () {
    var valor = $(this).attr("value");
    if (confirm("Deletar evento " + valor + " ?")) {
        $.ajax({
            type: "POST",
            data: {valor: valor},
            url: "evento/deletar",
            success: function (result) {
                alert(result);
                refresh_lista_de_eventos();
            },
            beforeSend: function () {
                $('#loading').css({display: "block"});
            },
            complete: function (msg) {
                $('#loading').css({display: "none"});
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Ocorreu um erro: " + errorThrown + ":(");
            }
        });
    }
});

$(document).on("click", "#botao_editar", function (e) {
    e.preventDefault();
    var valor = $(this).attr("value");
    var titulo = $("input[name=editar_titulo]").val();
    var email = $("input[name=editar_email]").val();
    var data = $("input[name=editar_data]").val();
    var local = $("input[name=editar_local]").val();
    var descricao = $("textarea[name=editar_descricao]").val();

    $.ajax({
        type: "POST",
        data: {id: valor, titulo: titulo, email: email, data: data, local: local, descricao: descricao},
        url: "evento/editar",
        success: function (result) {
            alert(result);
            refresh_lista_de_eventos();
            $("#evento_update").html('');
        },
        beforeSend: function () {
            $('#loading').css({display: "block"});
        },
        complete: function (msg) {
            $('#loading').css({display: "none"});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocorreu um erro: " + textStatus + ":(");
        }
    });
});

$(document).on("click", "#editar", function (e) {
    var valor = $(this).attr("value");
    $.ajax({
        type: "POST",
        data: {valor: valor},
        url: "evento/read",
        dataType: 'json',
        success: function (evento) {
            $texto =
                    "<h2>Edite o evento</h2>"
                    + "<button class=\"btn btn-dark\" id=\"fechar_editar\" style=\"float:right\" value=\"" + evento[0].id + "\">Fechar</button>"
                    + "<form role=\"form\" class=\"col-md-40 col-md-offset-4\">"
                    + "<div class=\"col-lg-6\">"
                    + "<div class=\"well well-sm\"><strong style=\"color: #31b0d5\"><span class=\"glyphicon glyphicon-asterisk\"></span>Preenchimento obrigatório!</strong></div>"
                    + "<div class=\"form-group\">"
                    + "<label for=\"nome\">Titulo</label>"
                    + "<div class=\"input-group\">"
                    + "<input type=\"text\" class=\"form-control\" name=\"editar_titulo\" id=\"titulo\" placeholder=\"Coloque o novo titulo aqui!\" value=\"" + evento[0].titulo + "\" required>"
                    + "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"form-group\">"
                    + "<label for=\"email\">Email</label>"
                    + "<div class=\"input-group\">"
                    + "<input type=\"email\" class=\"form-control\" id=\"email\" name=\"editar_email\" placeholder=\"Coloque o novo email aqui!\" value=\"" + evento[0].email + "\" required>"
                    + "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"form-group\">"
                    + "<label for=\"data\">Data e Hora</label>"
                    + "<div class=\"input-group\">"
                    + "<input type=\"datetime-local\" class=\"form-control\" name=\"editar_data\" id=\"data\" placeholder=\"Coloque a nova data!\" value=\"" + evento[0].data + "\" required>"
                    + "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>"
                    + "</div>"
                    + " </div>"
                    + "<div class=\"form-group\">"
                    + "<label for=\"local\">Local</label>"
                    + "<div class=\"input-group\">"
                    + "<input type=\"text\" class=\"form-control\" name=\"editar_local\" id=\"local\" placeholder=\"Coloque o novo local aqui!\" value=\"" + evento[0].local + "\" required>"
                    + "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>"
                    + "</div>"
                    + "</div>"
                    + "<div class=\"form-group\">"
                    + "<label for=\"descricao\">Descrição</label>"
                    + "<div class=\"input-group\">"
                    + "<textarea name=\"editar_descricao\" id=\"descricao\" class=\"form-control\" rows=\"5\" required>" + evento[0].descricao + "</textarea>"
                    + "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>"
                    + "</div>"
                    + "</div>"
                    + "<button type=\"submit\" value=\"" + evento[0].id + "\" id=\"botao_editar\" class=\"btn btn-warning\">Editar</button>"
                    + "</div>"
                    + "</form>";
            $("#evento_update").html($texto);
            location.href = "#evento_update";
        },
        beforeSend: function () {
            $('#loading').css({display: "block"});
        },
        complete: function (msg) {
            $('#loading').css({display: "none"});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocorreu um erro: " + errorThrown + ":(");
        }
    });
});

$(document).on("click", "#fechar_editar", function (e) {
    $("#evento_update").html("");
});

$("#mais").click(function (e) {
    limite += 4;
    $.ajax({
        type: "POST",
        data: {limite: limite},
        url: "evento/buscar",
        success: function (result) {
            $("#lista_de_eventos").html(result);
        },
        beforeSend: function () {
            $('#loading').css({display: "block"});
        },
        complete: function (msg) {
            $('#loading').css({display: "none"});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocorreu um erro: " + textStatus + ":(");
        }
    });
});

$("#botaoCadastrar").click(function (e) {
    e.preventDefault();
    var titulo = $("input[name=titulo]").val();
    var email = $("input[name=email]").val();
    var data = $("input[name=data]").val();
    var local = $("input[name=local]").val();
    var descricao = $("textarea[name=descricao]").val();

    $.ajax({
        type: "POST",
        data: {titulo: titulo, email: email, data: data, local: local, descricao: descricao},
        url: "evento/cadastrar",
        success: function (result) {
            alert(result);
            refresh_lista_de_eventos();
            $("input[name=titulo]").val('');
            $("input[name=email]").val('');
            $("input[name=email2]").val('');
            $("input[name=data]").val('');
            $("input[name=local]").val('');
            $("textarea[name=descricao]").val('');
        },
        beforeSend: function () {
            $('#loading').css({display: "block"});
        },
        complete: function (msg) {
            $('#loading').css({display: "none"});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocorreu um erro: " + textStatus + ":(");
        }
    });
});

function refresh_lista_de_eventos() {
    $.ajax({
        type: "POST",
        data: {limite: limite},
        url: "evento/buscar",
        success: function (result) {
            $("#lista_de_eventos").html(result);
        },
        beforeSend: function () {
            $('#loading').css({display: "block"});
        },
        complete: function (msg) {
            $('#loading').css({display: "none"});
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ocorreu um erro: " + errorThrown + " :(");
        }
    });
}