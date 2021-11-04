<?php
    require_once('includes/classes/class.mobile-detect.php');

    if (!defined('SITE_KEY'))define('SITE_KEY', '6LcU2fYaAAAAAECqen_Zv9nkELWRme_xRP5rQwcV');
    if (!defined('SECRET_KEY'))define('SECRET_KEY', '6LcU2fYaAAAAADfRJ8LCRpNsLz2PZeeNRpwdy27U');
    require_once('includes/classes/class.captcha.php');

    $errors = array();
    $detect = new Mobile_Detect;

	if($_SERVER['HTTP_HOST'] == 'localhost') {
        $base = 'http://localhost/';
		define("URL_BASE", "http://localhost/");
        $version = strtotime("now");
    }else{
        $base = 'https://elimonteiro.com/curso-lipomodelagem/';
		define("URL_BASE", "https://elimonteiro.com/curso-lipomodelagem/");
        $version = 0.1;
    }

    $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";