<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require 'vendor/autoload.php';

if (isset($_GET['p'])){
    $page = $_GET['p'];
}

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, [
    'cache' =>  false, // . '/tmp'
]);

if($page === 'home'){
    echo $twig->render('home.twig');
}

if($page === 'admin'){
    echo $twig->render('admin.html.twig');
}

if($page === 'register'){
    echo $twig->render('register.html.twig');
}

if($page === 'forum'){

    echo $twig->render('forum.html.twig');

}