$(document).ready(function () {
  $("#register_form").submit(function (event) {
    event.preventDefault();

    var form_data = {
      user_name: $("#user_name").val(),
      user_email: $("#user_email").val(),
      user_password: $("#user_password").val(),
      security_question: $("#security_question").val(),
      answer_question: $("#answer_question").val(),
    };

    $.ajax({
      url: "http://localhost/tp_web/crud/create/create_user.php",
      type: "POST",
      data: { data_request: form_data },
    })
      .done(function (resposta) {
        console.log(resposta);
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      })
      .always(function () {
        console.log("completou");
      });
  });
});
