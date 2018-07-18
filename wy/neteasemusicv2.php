<?php
header("Content-type: text/html; charset=utf-8");
$header_ip = array(
  'CLIENT-IP:88.88.88.88',
  'X-FORWARDED-FOR:88.88.88.88',
);
//设置referer,否则请求会被拒绝
$referer='http://music.163.com';

$ch = curl_init();

$songid = substr($_SERVER['QUERY_STRING'],7);

curl_setopt ($ch, CURLOPT_URL, 'http://music.163.com/api/song/detail/?id='.$songid.'&ids=['.$songid.']');

//伪造来源referer
curl_setopt ($ch,CURLOPT_REFERER,$referer);

//伪造来源ip
curl_setopt($ch, CURLOPT_HTTPHEADER, $header_ip);

//加上这个表示执行curl_exec是把输出做为返回值,不会输出到浏览器
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
$out_put=curl_exec ($ch);
curl_close($ch);
echo $out_put; 
?>