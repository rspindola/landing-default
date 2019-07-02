# Básicos e importantes
O framework principal é o Bootstrap 4, caso não esteja acostumado com a versão recente, comece lendo a página de Migração. No JS, os exigidos pelo Bootstrap: jQuery, o próprio bootstrap.js e o plugin que eles usam, o Popper. Além desses, os nossos arquivos proprietários que servem para a publicação dos formulários: validate, mask, cookie e envia.

* **jquery.validate.js** <br>
Plugin mais famoso de validação de formulários. <br>
Por causa dele, é necessário duplicar os códigos de acordo com a quantidade de formulários e nomear as classes. Em algumas páginas, você vai perceber que tem “form-1, form-2, form-3″ ou “formEnvia, formEnvia2, formEnvia3″. Quando for duplicar, atenção e renomear os names dos campos. <br>
(essa validação pode ser otimizada, eu sei, mas não consegui fazer à tempo. É uma modificação que seria bem-vinda.)

* **jquery.mask.js** <br>
Máscara do campo de telefone, para ele chegar formatado corretamente no theBox: (21) 12345-6789

* **cookie.js** <br>
Captura os cookies, essenciais nas campanhas de mídia, e coloca no envio do formulário

* **envia.js** <br>
É o arquivo que faz a mágica toda explicada acima. Se houver algum problema com o formulário, comece checando este arquivo e veja se está tudo correto, apontando para os elementos certos. Quando ele não está funcionando, após o envio a página fica em branco exibindo um data response = true.

* **Magnific Popup** <br>
Por padrão, o template já vem com Magnific Popup como galeria e um snippet que só carrega o Youtube após o clique, que reduz a velocidade de carregamento da página. Caso a landing não tenha nenhum dos dois, basta comentar esses códigos.

* **envia.php** <br>
É o arquivo que gera o lead e envia pro banco. Se algo não está sendo enviado ou chegando errado, é porque a comunicação com este não está correta. Ele também é responsável por um e-mail de resposta que em casos específicos precisa ter algum link ou arquivo, mas não é sempre.

* **Ícones** <br>
Os ícones usados, eu uso o Fontastic, um site que pega os ícones de outras libs e gera um arquivo só com os necessários para você. 

# Ferramentas de Desenvolvimento
Além do código em si, recentemente passei a usar ferramentas que ajudassem e agilizassem o desenvolvimento. Essas foram o NPM e Gulp. O npm você usa pra instalar as dependencias (bootstrap, jquery e etc) e o Gulp tanto para o desenvolvimento como para o build da versão com os arquivos otimizados e tudo mais. As instruções abaixo levam em consideração que voce conheça esses dois, se não, pare para estudá-los. Vai valer a pena e será necessário.

* **NPM** <br>
Uso para baixar os plugin/dependencias e executar os comandos do Gulp. Sempre que for colocar algum plugin na página, procura a página dele no github e veja que tem um código tipo npm install magnific-popup

* **Gulp** <br>
O gulp é um automatizador de tarefas. Você escreve instruções/scripts e ele executa, esses scripts ficam no arquivo guplfile.js. O gulpfile está comentado de acordo com o que cada função faz. No começo das funções aparece o nome delas usado para executar. Quando terminar o desenvolvimento, faça o build através do código npm run gulp build
Nas tasks de concatenar e as de deletar arquivos, preste bem atenção no CAMINHO e em QUAIS arquivos estão incluídos. Arquivos podem “sumir”ou dar problema por causa disso
Depois do build, sempre teste separadamente a versão final (na pasta dist)


# Testando formulário
Depois de concluído o código, a primeira coisa a ser feita é ajustar a váriavel $Projeto, dentro do envia.php, para o ID do projeto no theBox. Enquanto estiver testando use o ID 22, que te leva para o projeto de testes do theBox. Quando concluir os testes, substituia pelo ID correto do projeto.
<br><br>
Antes de iniciar os testes, preencha o corpo de e-mail presente no arquivo. Substitua “Nome completo do empreendimento” e “Nome do cliente” pelos respectivos valores.
<br><br>
Primeira coisa a se verificar, é se as origens do acesso/lead estão chegando corretamente. As origens são informações sobre a campanha, que chegam via url e são enviadas pelo formulários. Vem através dos parâmetros: utm_source e utm_medium na url.

![Exemplo 1](https://knowhow.agenciadigitalrj.com/wp-content/uploads/2018/05/Captura-de-Tela-2018-05-22-a%CC%80s-15.11.08.png)
![Exemplo 1](https://knowhow.agenciadigitalrj.com/wp-content/uploads/2018/05/Captura-de-Tela-2018-05-22-a%CC%80s-15.11.56.png)

Nosso envia é feito para nosso servidor, Hostgator, e funciona perfeitamente nele. Mas não é toda página que é hospedada aqui, então é necessário ajustar ele para algum outro ambiente de servidor. Geralmente, é Locaweb. O erro mais comum, relacionado apenas a parte do envio de e-mails, é que nosso e-mail com lead (que vai pro cliente) tem um header com e-mail diferente do domínio da página e então o servidor deles bloqueia. Qualquer dúvida seguir as instruções [deste link](https://wiki.locaweb.com.br/index.php?title=Como_enviar_e-mails_com_a_fun%C3%A7%C3%A3o_mail()_do_PHP&redirect=no).
<br><br>
O theBox é o nosso sistema de CRM interno, nele vemos e gerenciamos os leads que chegam através dos formulários. Sempre checar se os leads estão chegando corretamente, com tags de origem.

# Códigos de Mídia
Após desenvolver e publicar a página, envie o endereço da página para Mídia (Diana ou Rafael) para que eles gerem os códigos. Geralmente são de Google Analytics e Facebook Pixel. Mas podem variar ou aumentar de acordo com cada landing. Esses códigos serve para rastrear os acessos, cliques e o que mais o pessoal quiser. Os códigos-base você coloca, geralmente, antes do </body> ou do </head> depende.
<br><br>
Os códigos de evento rastreiam os cliques em elementos específicos(botão) ou páginas específicas (página de obrigado) e são customizados de acordo com a necessidade do site ou da campanha. Geralmente esses códigos são incluídos através do onclick, mas pode ser necessários ativá-los através do JS como em sites WordPress que o conteúdo é gerado dinamicamente. Isso varia de site pra site.
