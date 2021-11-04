<?php
class Captcha{
    public function getCaptcha($secret_key)
    {
        if (!defined('SITE_KEY'))define('SITE_KEY', '6LcU2fYaAAAAAECqen_Zv9nkELWRme_xRP5rQwcV');
        if (!defined('SECRET_KEY'))define('SECRET_KEY', '6LcU2fYaAAAAADfRJ8LCRpNsLz2PZeeNRpwdy27U');

        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".SECRET_KEY."&response={$secret_key}");
        $return = json_decode($response);
        return $return;
    }
}