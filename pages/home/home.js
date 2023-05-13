if (localStorage.getItem("email") == undefined) {
  window.location.replace("http://localhost/pages/login/login.html");
}

function load_tasks() {
  $.ajax({
    url: "http://localhost:8080/task/get",
    type: "POST",
    data: {},
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    crossDomain: true,
  })
    .done(function (response) {
      console.log(response);

      if (response.error) {
        console.log(response.error_message);
        alert(response.error_message);
      } else {
        html = "";
        $.each(response.response.tasks, function (index, value) {
          console.log(value);
          status_task = [];
          if (value.status == 0) {
            status_task[0] = "selected";
          } else if (value.status == 1) {
            status_task[1] = "selected";
          } else {
            status_task[2] = "selected";
          }
          html +=
            '<div class="col">' +
            '<div class="card h-100">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' +
            value.title +
            "</h5>" +
            '<p class="card-text">' +
            value.description +
            "</p>" +
            '<p class="card-text" style="font-weight: bolder;"> Location: ' +
            value.location +
            "</p>" +
            '<div class="mb-3">' +
            '<label class="form-label">Status</label>' +
            '<select class="form-select" aria-label="Default select example" id="status_task" onchange="set_status(' +
            value.id +
            ',this)">' +
            '<option value="0"' +
            status_task[0] +
            ">To do</option>" +
            '<option value="1"' +
            status_task[1] +
            ">Doing</option>" +
            '<option value="2"' +
            status_task[2] +
            ">Done</option>" +
            "</select>" +
            "</div>" +
            '<button type="button" class="btn btn-danger" onclick="del_task(' +
            value.id +
            ')">Delete</button>' +
            "</div>" +
            "</div>" +
            "</div>";
        });
        $("#tasks").empty("").append(html);
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    })
    .always(function () {
      console.log("completou");
    });
}

function set_status(id, status_task) {
  var form_data = {
    id: id,
    status: status_task.value,
  };

  $.ajax({
    url: "http://localhost:8080/task/status/set",
    type: "POST",
    data: form_data,
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    crossDomain: true,
  })
    .done(function (response) {
      console.log(response);

      if (response.error) {
        console.log(response.error_message);
        alert(response.error_message);
      } else {
        load_tasks();
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    })
    .always(function () {
      console.log("completou");
    });
  load_tasks();
}

function del_task(id) {
  var form_data = {
    id: id,
  };

  // alert(JSON.stringify(form_data));

  $.ajax({
    url: "http://localhost:8080/task/delete",
    type: "POST",
    data: form_data,
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    crossDomain: true,
  })
    .done(function (response) {
      console.log(response);

      if (response.error) {
        console.log(response.error_message);
        alert(response.error_message);
      } else {
        load_tasks();
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    })
    .always(function () {
      console.log("completou");
    });
}

$(document).ready(function () {
  $("#username_storage").append(localStorage.getItem("name"));

  load_tasks();

  $("#task_form").submit(function (event) {
    event.preventDefault();

    if ($("#title").val().length == 0) {
      alert("Enter a title");
      $("#title").focus();
      return;
    }

    if ($("#description").val().length == 0) {
      alert("Enter a description");
      $("#description").focus();
      return;
    }

    if ($("#location").val().length == 0) {
      alert("Enter a location");
      $("#location").focus();
      return;
    }

    if ($("#target_date").val().length == 0) {
      alert("Enter a date");
      $("#target_date").focus();
      return;
    }

    date = new Date($("#target_date").val());

    var form_data = {
      title: $("#title").val(),
      description: $("#description").val(),
      location: $("#location").val(),
      target_year: date.getFullYear(),
      target_month: date.getMonth() + 1,
      target_day: date.getDay(),
      priority: $("#priority").val(),
    };

    // alert(JSON.stringify(form_data));

    $.ajax({
      url: "http://localhost:8080/task/register",
      type: "POST",
      data: form_data,
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
    })
      .done(function (response) {
        console.log(response);

        if (response.error) {
          console.log(response.error_message);
          alert(response.error_message);
        } else {
          load_tasks();
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      })
      .always(function () {
        console.log("completou");
      });
  });

  $("#logout_button").on("click", function (event) {
    event.preventDefault();

    $.ajax({
      url: "http://localhost:8080/user/logout",
      type: "POST",
      data: {},
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
          localStorage.clear();
          window.location.replace(
            "http://localhost/pages/login/login.html"
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
});
