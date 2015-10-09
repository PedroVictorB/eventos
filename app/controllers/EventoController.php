<?php

use Phalcon\Mvc\Controller;

class EventoController extends Controller {

    public function indexAction() {
        
    }

    public function cadastrarAction() {
        $evento = new Evento();
        $ok = $evento->save($this->request->getPost(), array('titulo', 'email', 'data', 'local', 'descricao'));

        if ($ok) {
            echo "Evento cadastrado!!";
        } else {
            echo "Os seguintes problemas foram gerados :\n";
            foreach ($evento->getMessages() as $message) {
                echo $message->getMessage(), "\n";
            }
        }
    }

    public function buscarAction() {
        $limite = $this->request->getPost("limite");

        $eventos = Evento::query()
                ->order("data")
                ->limit($limite)
                ->execute();

        foreach ($eventos as $evento) {
            echo "<div class=\"panel panel-default\">";
            echo "<a class=\"btn btn-dark\" id=\"deletar\" style=\"float:right\" value=\"" . $evento->id . "\">Deletar</a>";
            echo "<button class=\"btn btn-dark\" id=\"editar\" style=\"float:right\" value=\"" . $evento->id . "\">Editar</button>";
            echo "<div class=\"panel-heading\">";
            echo "<p id=\"id_evento\" style=\"float:left\">" . $evento->id . "</p>";
            echo "<h3 class=\"panel-title\">" . $evento->titulo . "</h3>";
            echo "</div>";
            echo "<div class=\"panel-body\">";
            echo "Descrição: " . $evento->descricao . "<br/>";
            echo "Data: " . date_format(date_create($evento->data), 'd/m/Y H:i') . "<br/>";
            echo "Email: " . $evento->email . "<br/>";
            echo "</div>";
            echo "<div class=\"panel-footer\">";
            echo "" . $evento->local . "";
            echo "</div>";
            echo "</div>";
        }
    }
    
    public function editarAction(){
        $evento = new Evento();
        $ok = $evento->save($this->request->getPost(), array('id','titulo', 'email', 'data', 'local', 'descricao'));
        
        if ($ok) {
            echo "Evento salvo!!";
        } else {
            echo "Os seguintes problemas foram gerados :\n";
            foreach ($evento->getMessages() as $message) {
                echo $message->getMessage(), "\n";
            }
        }
    }

    public function deletarAction() {
        $valor = $this->request->getPost("valor");
        $evento = Evento::findFirst($valor);

        if ($evento != false) {
            if ($evento->delete() == false) {
                echo "Algo aconteceu e o evento não foi deletado! \n";
                foreach ($evento->getMessages() as $message) {
                    echo $message, "\n";
                }
            } else {
                echo "O evento " . $valor . " foi deletado!";
            }
        }
    }

    public function formAction() {
        $valor = $this->request->getPost("valor");
        $evento = Evento::findFirst($valor);

        if ($evento != false) {
            echo "<h2>Edite o evento</h2>";
            echo "<button class=\"btn btn-dark\" id=\"fechar_editar\" style=\"float:right\" value=\"" . $evento->id . "\">Fechar</button>";
            echo "<form role=\"form\" class=\"col-md-40 col-md-offset-4\">";
            echo "<div class=\"col-lg-6\">";
            echo "<div class=\"well well-sm\"><strong style=\"color: #31b0d5\"><span class=\"glyphicon glyphicon-asterisk\"></span>Preenchimento obrigatório!</strong></div>";
            echo "<div class=\"form-group\">";
            echo "<label for=\"nome\">Titulo</label>";
            echo "<div class=\"input-group\">";
            echo "<input type=\"text\" class=\"form-control\" name=\"editar_titulo\" id=\"titulo\" placeholder=\"Coloque o novo titulo aqui!\" value\"".$evento->titulo."\" required>";
            echo "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>";
            echo "</div>";
            echo "</div>";
            echo "<div class=\"form-group\">";
            echo "<label for=\"email\">Email</label>";
            echo "<div class=\"input-group\">";
            echo "<input type=\"email\" class=\"form-control\" id=\"email\" name=\"editar_email\" placeholder=\"Coloque o novo email aqui!\" value\"".$evento->email."\" required>";
            echo "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>";
            echo "</div>";
            echo "</div>";
            echo "<div class=\"form-group\">";
            echo "<label for=\"data\">Data e Hora</label>";
            echo "<div class=\"input-group\">";
            echo "<input type=\"datetime-local\" class=\"form-control\" name=\"editar_data\" id=\"data\" placeholder=\"Coloque a nova data!\" value\"".$evento->data."\" required>";
            echo "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>";
            echo "</div>";
            echo " </div>";
            echo "<div class=\"form-group\">";
            echo "<label for=\"local\">Local</label>";
            echo "<div class=\"input-group\">";
            echo "<input type=\"text\" class=\"form-control\" name=\"editar_local\" id=\"local\" placeholder=\"Coloque o novo local aqui!\" value\"".$evento->local."\" required>";
            echo "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>";
            echo "</div>";
            echo "</div>";
            echo "<div class=\"form-group\">";
            echo "<label for=\"descricao\">Descrição</label>";
            echo "<div class=\"input-group\">";
            echo "<textarea name=\"editar_descricao\" id=\"descricao\" class=\"form-control\" rows=\"5\" value\"".$evento->descricao."\" required></textarea>";
            echo "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-asterisk\"></span></span>";
            echo "</div>";
            echo "</div>";
            echo "<button type=\"submit\" value=\"".$evento->id."\" id=\"botao_editar\" class=\"btn btn-warning\">Editar</button>";
            echo "</div>";
            echo "</form>";
        }else{
            echo "??";
        }
    }

}
