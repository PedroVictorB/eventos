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

        $data = array();
        foreach ($eventos as $evento) {
            $data[] = array(
                'id' => $evento->id,
                'titulo' => $evento->titulo,
                'email' => $evento->email,
                'data' => date_format(date_create($evento->data), 'd/m/Y H:i'),
                'local' => $evento->local,
                'descricao' => $evento->descricao
            );
        }
        echo json_encode($data);
    }

    public function editarAction() {
        $evento = new Evento();
        $ok = $evento->save($this->request->getPost(), array('id', 'titulo', 'email', 'data', 'local', 'descricao'));

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

    public function readAction() {
        $valor = $this->request->getPost("valor");
        $evento = Evento::findFirst($valor);

        $data = array();
        $data[] = array(
            'id' => $evento->id,
            'titulo' => $evento->titulo,
            'email' => $evento->email,
            'data' => date_format(date_create($evento->data), 'Y-m-d\TH:i:s'),
            'local' => $evento->local,
            'descricao' => $evento->descricao
        );

        echo json_encode($data);
    }

}
