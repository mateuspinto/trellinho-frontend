if (localStorage.getItem("email") != undefined) {
  window.location.replace("http://localhost/tp_web/pages/home/home.html");
}

$(document).ready(function () {
  $("#user_data").submit(function (event) {
    event.preventDefault();

    if (!/\w+@\w+\.\w+(\.\w{2})?/.test($("#user_email").val())) {
      alert("Please give us a valid email address.");
      $("#user_email").focus();
      return;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($("#user_password").val())
    ) {
      alert(
        "Please enter an 8-character password with at least one letter and one number"
      );
      $("#user_password").focus();
      return;
    }

    var form_data = {
      email: $("#user_email").val(),
      password: $("#user_password").val(),
    };

    $.ajax({
      url: "http://localhost:8080/user/login",
      type: "POST",
      data: form_data,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
    })
      .done(function (response) {
        if (response.error) {
          console.log(response.error_message);
          alert(response.error_message);
        } else {
          // alert(JSON.stringify(response.response));
          localStorage.setItem("email", response.response.email);
          localStorage.setItem("name", response.response.name);
          window.location.replace(
            "http://localhost/tp_web/pages/home/home.html"
          );
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      })
      .always(function () {
        console.log("completou");
      });
  });

  $("#forgot_answer_form").submit(function (event) {
    event.preventDefault();

    if (!/\w+@\w+\.\w+(\.\w{2})?/.test($("#forgot_answer_email").val())) {
      alert("Please give us a valid email address.");
      $("#forgot_answer_email").focus();
      return;
    }

    var form_data = {
      email: $("#forgot_answer_email").val(),
    };

    $.ajax({
      url: "http://localhost:8080/user/security/question",
      type: "POST",
      data: form_data,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
    })
      .done(function (response) {
        if (response.error) {
          console.log(response.error_message);
          alert(response.error_message);
        } else {
          console.log(response);
          $("#forgotPasswordModal0").modal("hide");
          $("#question").val(response.response.security_question);
          $("#forgotPasswordModal1").modal("show");
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      })
      .always(function () {
        console.log("completou");
      });
  });

  $("#forgot_password_form").submit(function (event) {
    event.preventDefault();

    if (!/\w+@\w+\.\w+(\.\w{2})?/.test($("#forgot_answer_email").val())) {
      alert("Please give us a valid email address.");
      $("#forgot_answer_email").focus();
      return;
    }

    if ($("#answer").val().length == 0) {
      alert("Enter an answer");
      $("#answer").focus();
      return;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($("#new_password").val())
    ) {
      alert(
        "Please enter an 8-character password with at least one letter and one number"
      );
      $("#new_password").focus();
      return;
    }

    var form_data = {
      email: $("#forgot_answer_email").val(),
      security_answer: $("#answer").val(),
      password: $("#new_password").val(),
    };

    $.ajax({
      url: "http://localhost:8080/user/security/answer",
      type: "POST",
      data: form_data,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
    })
      .done(function (response) {
        if (response.error) {
          console.log(response.error_message);
          alert(response.error_message);
        } else {
          console.log(response);
          $("#forgotPasswordModal1").modal("hide");
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      })
      .always(function () {
        console.log("completou");
      });
  });

  $("#create_account_form").submit(function (event) {
    event.preventDefault();

    if ($("#create_name").val().length == 0) {
      alert("Enter a name");
      $("#create_name").focus();
      return;
    }

    if (!/\w+@\w+\.\w+(\.\w{2})?/.test($("#create_email").val())) {
      alert("Please give us a valid email address.");
      $("#create_email").focus();
      return;
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        $("#create_password").val()
      )
    ) {
      alert(
        "Please enter an 8-character password with at least one letter and one number"
      );
      $("#create_password").focus();
      return;
    }

    if ($("#create_security_question").val().length == 0) {
      alert("Enter a question");
      $("#create_security_question").focus();
      return;
    }

    if ($("#create_answer_question").val().length == 0) {
      alert("Enter an answer");
      $("#create_answer_question").focus();
      return;
    }

    if ($("#create_birthday_date").val().length == 0) {
      alert("Enter a date");
      $("#create_birthday_date").focus();
      return;
    }

    date = new Date($("#create_birthday_date").val());

    var form_data = {
      name: $("#create_name").val(),
      email: $("#create_email").val(),
      password: $("#create_password").val(),
      security_question: $("#create_security_question").val(),
      security_answer: $("#create_answer_question").val(),
      birthday_day: date.getDay(),
      birthday_month: date.getMonth() + 1,
      birthday_year: date.getFullYear(),
    };

    $.ajax({
      url: "http://localhost:8080/user/register",
      type: "POST",
      data: form_data,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
    })
      .done(function (response) {
        if (response.error) {
          console.log(response.error_message);
          alert(response.error_message);
        } else {
          console.log(response);
          $("#creaceAccountModal").modal("hide");
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      })
      .always(function () {
        console.log("completou");
      });
  });
});
