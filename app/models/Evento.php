<?php

use Phalcon\Mvc\Model;

class Evento extends Model
{
    public $id;

    public $titulo;

    public $email;
    
    public $data;
    
    public $local;
    
    public $descricao;
}