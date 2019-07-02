<?php
   if($_POST['honeypot'] != '') {
       die("You spammer!");
   };
?>
<?php
header('Content-type:text/html; charset=utf-8');
ini_set('display_errors', 0);
error_reporting(0);

//Conecta no banco de dados
function conectadb() {

	error_reporting(E_ALL^E_DEPRECATED);

	$servidor = "###.###.###.###";
	$usuario  = "USUARIO_DO_BANCO";
	$senha    = "SENHA_DO_BANCO";

	$dbcon = mysql_connect($servidor, $usuario, $senha);
	if (!$dbcon) {
		echo 'erro de conexão';
		exit;
	}

	$bd = mysql_select_db('senso013_theboxdb', $dbcon);

	if (!$bd) {
		echo 'erro de conexão';
		exit;
	}

	mysql_set_charset('utf8', $dbcon);

	return $dbcon;

}

// Desconecta do banco de dados | $conn é a váriavel de conexão
function desconectadb($conn) {
	$close = mysql_close($conn);
	if (!$close) {
		echo 'erro de conexão';
	} else {
		return true;
	}

}

$conn = conectadb();

/*
 *
 * Daqui para baixo e para ser utilizado no cadastro
 *
 */

// ID do projeto
$Projeto = 22;

// Seleciona o ultimo que foi enviado
$result = mysql_query("SELECT res_id FROM pessoas WHERE pro_id = '$Projeto' ORDER BY id DESC LIMIT 1 OFFSET 0");
if (mysql_num_rows($result)) {
	$Atual      = mysql_result($result, 0);
	$Proximo    = false;
	$ProximoRes = false;
} else {
	$Atual      = 0;
	$Proximo    = true;
	$ProximoRes = true;
	$ImoAtual   = 0;
}

// Pega as imobiliarias e responsaveis
$result = mysql_query("SELECT imobiliarias.id, imobiliarias.res_id, responsaveis.id, responsaveis.email  FROM imobiliarias, responsaveis WHERE imobiliarias.id = responsaveis.imo_id AND imobiliarias.pro_id = '$Projeto' ORDER BY imobiliarias.id, responsaveis.id ASC");

$Primeiro = true;
$imo_id   = 0;
while ($row = mysql_fetch_row($result)) {

	// Reseva os valores do primeiro
	if ($Primeiro) {
		$ImoPrimeiro = $row[0];
		$Primeiro    = false;
	}

	// Se passou o atual pega a proxima imobiliaria
	if ($Proximo AND $ImoAtual != $row[0]) {
		$imo_id = $row[0];
		$res_id = $row[1];
	}

	// Se For igual o atual pega os proximos valores
	if ($Atual == $row[2]) {
		$Proximo  = true;
		$ImoAtual = $row[0];
	}

	$Imobiliarias[$row[0]][] = array('ID' => $row[2], 'Email' => $row[3]);

}

// Se nao existe o imo_id pega o primeiro
if (!$imo_id) {
	$imo_id = $ImoPrimeiro;
	$res_id = 0;
}

// Foreach com a proxima imobiliaria
$Primeiro = false;
foreach ($Imobiliarias[$imo_id] as $Array) {

	if (!$Primeiro) {
		$Primeiro  = $Array['ID'];
		$res_email = $Array['Email'];
	}
	if ($ProximoRes) {
		$res_id    = $row[0];
		$res_email = $row[1];
		break;
	}
	// Se o ultimo for igual ao atual pega o proximo valor
	if ($Array['ID'] == $res_id) {$ProximoRes = true;

	}
}

if (!$ProximoRes) {$res_id = $Primeiro;
}

if ($res_id) {
	mysql_query("UPDATE imobiliarias SET res_id = '$res_id', updated_at = CURRENT_TIMESTAMP WHERE id = '$imo_id'");
}

/*
 *
 * Daqui para baixo é o cadastro no banco de dados
 *
 */

class Security {

	/**
	 * Minimum seconds since last previous non-ajax request, float, default 2.5 sec
	 */
	const SECONDS_SINCE_PREV_REQUEST = 2.5;

	/**
	 * Return true if passed minimum time since previous request
	 */
	protected static function isSessionRequestFrequencyOK() {
		$lastRequest = !empty($_SESSION['security']['lastRequest'])?
		$_SESSION['security']['lastRequest']:0;
		$t = microtime(true);
		if ($lastRequest) {
			$d = $t-$lastRequest;
			if ($d < self::SECONDS_SINCE_PREV_REQUEST) {
				mylog('Rejected too early request ['.($t-$lastRequest).'] < ['
					.self::SECONDS_SINCE_PREV_REQUEST.'] (remote IP: ['
					.$_SERVER['REMOTE_ADDR'].'])');
				return false;
			}
		}
		$_SESSION['security']['lastRequest'] = $t;
		return true;
	}

}

function tratarStrings($string) {
	return addslashes(htmlentities(utf8_decode(trim($string))));
}

// Passando os dados obtidos pelo formulário para as variáveis abaixo

$conexao = mysql_connect("192.185.212.129", "senso013_thebox", 'Ht1B~!PmkyuU');//essa linha irá fazer a conexão com o banco de dados.
if (!$conexao) {
	die("Erro de conexão com 192.185.212.129, o seguinte erro ocorreu -> ".mysql_error());
}
//aqui irei testar se houve falha de conexão

//conectando com a tabela do banco de dados
$banco = mysql_select_db("senso013_thebox");//nome da tabela onde os dados serão armazenados

$nome           = mysql_real_escape_string($_POST['nome']);
$nomeremetente = 'Sistema The Box - Nome Completo do Empreendimento/Projeto <atendimento@sensorialbr.com>';

$email  	    = tratarStrings($_POST['email']);
$headers = "From: ".$email."\nContent-type: text/html";# o ‘text/html' é o tipo mime da mensagem

$emaildestinatario = "backup@sensorialbr.com,";
$emaildestinatario .= $res_email;
$telefone 		= tratarStrings($_POST['telefone']);
$assunto  = "Landing Nome Completo do Empreendimento/Projeto - Nome do Cliente";

//$outros = $_POST['outros'];
$coords = $_POST['getGeo'];
$sistema .= "Sist. Oper. Usuario: ".$_SERVER['HTTP_USER_AGENT']." <br>";
$mensagem 		= mysql_real_escape_string($_POST['mensagem']);

$utm_source   = stripslashes(trim($_POST["utm_source"]));
$utm_medium   = stripslashes(trim($_POST["utm_medium"]));
$utm_term     = stripslashes(trim($_POST["utm_term"]));
$utm_content  = stripslashes(trim($_POST["utm_content"]));
$utm_campaign = stripslashes(trim($_POST["utm_campaign"]));

$data = $_POST['date'];

mysql_query("SET NAMES utf8");


/*=====  End of Aqui começam os cadastros no banco de dados  ======*/

/* Inserindo na tabela Pessoas */

mysql_query("INSERT INTO `pessoas` ( `nome` , `email` , `telefone` , `mensagem`, `coords`, `origem` , `peca` , `term` , `content` , `campaign` , `sistema` , `created_at` , `res_id` , `pro_id` )
    VALUES ('$nome', '$email', '$telefone', '$mensagem', '$coords' , '$utm_source' , '$utm_medium' , '$utm_term' , '$utm_content' , '$utm_campaign' ,  '$sistema' , CURRENT_TIMESTAMP ,'$res_id', '$Projeto')");

// Inserindo caso seja uma nova origem
$ad_origem = "INSERT INTO leads (origem, pro_id, created_at)
SELECT '$utm_source', '$Projeto', CURRENT_TIMESTAMP
FROM leads
WHERE NOT EXISTS(
SELECT origem, pro_id
FROM leads
WHERE origem = '$utm_source'
AND pro_id = '$Projeto'
) LIMIT 1";

mysql_query($ad_origem) or die("Erro");
$ultimo_id = mysql_insert_id();

/* Inserindo campo de valores para o lead */
if ($ultimo_id != 0) {
	$date = date('Y-m-d');
	mysql_query("INSERT INTO `leads_valores` (`inicio`, `fim`, `lea_id`, `created_at`) VALUES ('$date ', '$date ', '$ultimo_id', CURRENT_TIMESTAMP)");
}

/* Montando a mensagem a ser enviada no corpo do e-mail. */
$mensagemHTML = '	<P>Landing Nome Completo do Empreendimento/Projeto - Você tem um novo lead! - Cadastro no form</P>
					<p><b>Nome:</b> '.$nome.'
					<p><b>E-Mail:</b> '.$email.'
					<p><b>Telefone:</b> '.$telefone.'
					<p><b>Mensagem:</b> '.$mensagem.'
					<p><b>Data Envio:</b> '.date("d/m/Y h:i:s").'
					<p><b>Sistema:</b> '.$sistema.'

					<p><b>Peça:</b> '.$utm_source.'
					<p><b>Origem:</b> '.$utm_medium.'
					<p><b>Term:</b> '.$utm_term.'
					<p><b>Content:</b> '.$utm_content.'
					<p><b>Campaign:</b> '.$utm_campaign.'
					<hr>';

// O remetente deve ser um e-mail do seu domínio conforme determina a RFC 822.
// O return-path deve ser ser o mesmo e-mail do remetente.
$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $nomeremetente\r\n";// remetente
$headers .= "Return-Path: $emaildestinatario \r\n";// return-path
$envio = mail($emaildestinatario, $assunto, $mensagemHTML, $headers);

// $data = [];
if($envio) {
  $data['response'] = true;
} else {
  $data['response'] = false;
}

/* Antigo responsável pela página de Obrigado, se necessário só des-comentar as linhas abaixo */
// $enderecoIndex = "href='obrigado.html#obrigado";
// if ($origem_url) {$enderecoIndex .= "?".$origem_url;
// }

// $enderecoContato = "href='obrigado.html#obrigado";
// if ($origem_url) {$enderecoContato .= "?".$origem_url;
// }

//AUTO RESPOSTA
$headers_ = "MIME-Version: 1.0\r\n";
$headers_ .= "Content-type: text/html; charset=iso-8859-1\r\n";

$headers_ .= "From:  $titulo <$email>\n";
//$site     = "http://www.even.com.br/";
$titulo   = "Contato de Nome Completo do Empreendimento/Projeto";
$mensagem = " Obrigado por entrar em contato!<br/>
			Retornaremos em breve.";

mail($email, $titulo, $mensagem, $headers_);



desconectadb($conn);

header('Content-Type: application/json');
exit( json_encode($data) );

?>
