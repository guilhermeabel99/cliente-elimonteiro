<?php
    require_once('classes/class.captcha.php');
    $ObjCaptcha= new Captcha();
    $result = $ObjCaptcha->getCaptcha($_POST['g-recaptcha-response']);

    if($result->success == true && $result->score > 0.5){
        include_once('classes/class.phpmailer.php');

        $username = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];

        $mail = new PHPMailer;
        $mail->IsSMTP();
        $mail->Host = "smtps.uhserver.com";
        $mail->Port = '465';
        $mail->SMTPAuth = true;
        $mail->Username = "carteiro@elimonteiro.com";
        $mail->Password = "uLFRWCW3";
        $mail->From = "contato@elimonteiro.com";
        $mail->FromName = 'Eli Monteiro';
        $mail->AddAddress("lucas@fcinco.digital");
        $mail->IsHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->SMTPDebug = 4;
        $mail->Subject  = "Curso Lipomodelagem Orgânica - Eli Monteiro";
        $mail->Body     = "<meta charset='UTF-8'><style> body { margin: 0; padding: 0; mso-line-height-rule: exactly; min-width: 100%;}.wrapper { display: table; table-layout: fixed; width: 100%; min-width: 620px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}body, .wrapper { background-color: #ffffff;}/* Basic */table { border-collapse: collapse; border-spacing: 0;}table.center { margin: 0 auto; width: 602px;}td { padding: 0; vertical-align: top;}.spacer,.border { font-size: 1px; line-height: 1px;}.spacer { width: 100%; line-height: 16px}.border { background-color: #e0e0e0; width: 1px;}.padded { padding: 0 24px;}img { border: 0; -ms-interpolation-mode: bicubic;}.image { font-size: 12px;}.image img { display: block;}strong, .strong { font-weight: 700;}h1,h2,h3,p,ol,ul,li { margin-top: 0;}ol,ul,li { padding-left: 0;}a { text-decoration: none; color: #616161;}.btn { background-color:#2196F3; border:1px solid #2196F3; border-radius:2px; color:#ffffff; display:inline-block; font-family:Roboto, Helvetica, sans-serif; font-size:14px; font-weight:400; line-height:36px; text-align:center; text-decoration:none; text-transform:uppercase; width:200px; height: 36px; padding: 0 8px; margin: 0; outline: 0; outline-offset: 0; -webkit-text-size-adjust:none; mso-hide:all;}/* Top panel */.title { text-align: left;}.subject { text-align: right;}.title, .subject { width: 300px; padding: 8px 0; color: #616161; font-family: Roboto, Helvetica, sans-serif; font-weight: 400; font-size: 12px; line-height: 14px;}/* Header */.logo { padding: 16px 0;}/* Logo */.logo-image {}/* Main */.main { -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24); -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);}/* Content */.columns { margin: 0 auto; width: 600px; background-color: #ffffff; font-size: 14px;}.column { text-align: left; background-color: #ffffff; font-size: 14px;}.column-top { font-size: 24px; line-height: 24px;}.content { width: 100%;}.column-bottom { font-size: 8px; line-height: 8px;}.content h1 { margin-top: 0; margin-bottom: 16px; color: #212121; font-family: Roboto, Helvetica, sans-serif; font-weight: 400; font-size: 20px; line-height: 28px;}.content p { margin-top: 0; margin-bottom: 16px; color: #212121; font-family: Roboto, Helvetica, sans-serif; font-weight: 400; font-size: 16px; line-height: 24px;}.content .caption { color: #616161; font-size: 12px; line-height: 20px;}/* Footer */.signature, .subscription { vertical-align: bottom; width: 300px; padding-top: 8px; margin-bottom: 16px;}.signature { text-align: left;}.subscription { text-align: right;}.signature p, .subscription p { margin-top: 0; margin-bottom: 8px; color: #616161; font-family: Roboto, Helvetica, sans-serif; font-weight: 400; font-size: 12px; line-height: 18px;}</style><center class='wrapper' style='margin-top: 10px;'> <table class='main center' width='602' border='0' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='column'> <div class='column-top'>&nbsp;</div> <table class='content' border='0' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='padded'> <h1>Um novo lead está interessado no curso de Lipomodelagem Orgânica!</h1>
        <p><strong>Nome:</strong> $username</p><p><strong>Telefone:</strong> $phone</p><p><strong>E-mail:</strong> $email</p>
        </td> </tr> </tbody> </table> <div class='column-bottom'>&nbsp;</div> </td> </tr> </tbody> </table> <div class='spacer'>&nbsp;</div></center>";

        $sended = $mail->Send();

        if($sended){
            $response_array['status'] = 'success';
            header('Content-type: application/json');
            echo json_encode($response_array);
            die;
            exit;
        }else{
            $response_array['status'] = 'error';
            $response_array['message'] = 'O e-mail não pode ser enviado!';
            header('Content-type: application/json');
            echo json_encode($response_array);
            die;
            exit;
        }
    }else{
        $response_array['status'] = 'error';
        $response_array['message'] = 'Tente novamente mais tarde!';
        header('Content-type: application/json');
        echo json_encode($response_array);
        die;
        exit;
    }