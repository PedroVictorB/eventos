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
        url: "evento/form",
        success: function (result) {
            $("#evento_update").html(result);
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