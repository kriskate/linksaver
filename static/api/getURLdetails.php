<?php

function page_title($url) {

    $page = @file_get_contents($url);

    if (!$page) return null;

    $matches = array();

    if (preg_match('/<title>(.*?)<\/title>/', $page, $matches)) {
        $tor = $matches[1];
        $errors = array("Error 400 (Bad Request)!!1" => 1,"301 Moved Permanently" => 2);
        if(array_key_exists($tor, $errors)){
          $tor = null;
        }
        return $tor;
    }
    else {
        return null;
    }
}

$url = $_REQUEST["url"];
echo page_title($url);
?>
