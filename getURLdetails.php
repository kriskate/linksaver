/// this is a trial and error file. Actual api file served is in static/api/getURLdetails.php


<?php
//has a problem with CURLOPT_FOLLOWLOCATION
function file_get_contents_curl($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

$url = $_REQUEST["url"];
$html = file_get_contents_curl($url);

preg_match('/<title>(.+)<\/title>/',$html,$matches);
$title = $matches[1];

echo  json_encode(array("url" => $url, "title" => $title));
?>



<?php
//tests
$url = $_REQUEST["url"];


$pattern = '/[<]title[>]([^<]*)[<][\/]titl/i';
$urlContents = file_get_contents($url);
preg_match($pattern, $urlContents, $matches);

echo "|";
echo trim($matches[1] . "\n");
echo "|";
?>



<?php
//has a problem with documents that have attributes on <title
$url = $_REQUEST["url"];

$urlContents = file_get_contents($url);
preg_match("/<title>(.*)<\/title>/i", $urlContents, $matches);

echo trim($matches[1] . "\n");
?>



<?php
// has a problem with securit checks
$url = $_REQUEST["url"];

$urlContents = file_get_contents($url);

$dom = new DOMDocument();
@$dom->loadHTML($urlContents);

$title = $dom->getElementsByTagName('title');

print($title->item(0)->nodeValue . "\n"); // "Example Web Page"
?>



<?php
// the regexp does not work
  function get_page_title($url){

  	if( !($data = file_get_contents($url)) ) return false;

  	if( preg_match("#(.+)<\/title>#iU", $data, $t))  {
  		return trim($t[1]);
  	} else {
  		return false;
  	}
  }

  $url = $_REQUEST["url"];
  print(get_page_title($url));
 ?>
