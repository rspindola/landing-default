$(document).ready(function () {
    
    /****** Código de GeoLocalização, atualmente sem uso ******/
    /*window.local = '';
    var startPos;
    var geoSuccess = function (position) {
        startPos = position;
        window.local = '(' + startPos.coords.latitude + ',' + startPos.coords.longitude + ')';
        console.log(window.local);
    };

    var geoError = function (error) {
        console.log('Ocorreu um erro. Erro de código: ' + error.code);
        // Códigos de erros:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);*/

    /* Pegando os parametros da url */
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /* utm_source */
    if (getParameterByName('utm_source')) {
        var utm_source = getParameterByName('utm_source');
        Cookies.set('utm_source', utm_source, {
            expires: 7
        });
    } else if (Cookies.get('utm_source')) {
        var utm_source = Cookies.get('utm_source');
    } else {
        var utm_source = 'Desconhecido';
    }

    /* utm_medium */
    if (getParameterByName('utm_medium')) {
        var utm_medium = getParameterByName('utm_medium');
        Cookies.set('utm_medium', utm_medium, {
            expires: 7
        });
    } else if (Cookies.get('utm_medium')) {
        var utm_medium = Cookies.get('utm_medium');
    } else {
        var utm_medium = 'Desconhecido';
    }

    /* utm_campaign */
    if (getParameterByName('utm_campaign')) {
        var utm_campaign = getParameterByName('utm_campaign');
        Cookies.set('utm_campaign', utm_campaign, {
            expires: 7
        });
    } else if (Cookies.get('utm_campaign')) {
        var utm_campaign = Cookies.get('utm_campaign');
    } else {
        var utm_campaign = 'Desconhecido';
    }


    /* Formate telefone */
    var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('input[name="telefone-1"]').mask(SPMaskBehavior, spOptions);
    
    
    /* Validação do formulário */
    $('.form-1').validate({
        // Exibir erros
        showErrors: function (errorMap, errorList) {
            // Limpando tooltips para elementos válidos
            $.each(this.validElements(), function (index, element) {
                var $element = $(element);
                $element.data("title", "") // Desmarque a título - não há nenhum erro mais associado
                    .removeClass("error")
                    .tooltip("dispose");
            });
            
            // Criando novo tooltips para elementos inválidos
            $.each(errorList, function (index, error) {
                var $element = $(error.element);
                $element.tooltip("dispose") // Destruindo qualquer pré-existente tooltip assim que nós podemos repovoar com novos tooltips
                    .data("title", error.message)
                    .addClass("error")
                    .tooltip(); // Criar uma novo tooltip com base na messsage erro que acabamos de definir no título
            });
        },
        submitHandler: function (form) {
            // obter os dados do formulário
            var formData = {

                'nome': $('input[name=nome-1]').val(),
                'telefone': $('input[name=telefone-1]').val(),
                'email': $('input[name=email-1]').val(),
                'mensagem': $('textarea[name=mensagem-1]').val(),
                'honeypot': $('input[name=honeypot-1]').val(),
                
                'utm_source': utm_source,
                'utm_medium': utm_medium,
                'utm_campaign': utm_campaign,

            };

            $.ajax({                 
                })
                .done(function (json) {
                    if (json.erro !== null) {
                        $.ajax({
                                type: 'POST',
                                url: 'envia.php',
                                data: formData,
                                dataType: 'json',
                                encode: true
                            })
                            .done(function (data) {
                                console.log(formData);
                                if (data.response) {
                                    location.href='obrigado.html';
                                } else {
                                    $('.form-1').html('<div class="alert alert-warning">Houve um problema, tente novamente mais tarde.</div>');
                                }
                            });
                    } else {
                        $('.form-1').html('<div class="alert alert-warning">Houve um problema, tente novamente mais tarde.</div>');
                    }
                });


        }
    }); /* fechamento $(form)validate */
    /* Fim validação e envio formulário */

});