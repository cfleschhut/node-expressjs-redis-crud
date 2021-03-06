var appendToList = function(entries) {
  var list = [];
  for (var i in entries) {
    var entry = entries[i];
    if (!entry) { continue; }
    var content = '';
      content += '<a href="/cities/' + entry + '">' + entry + '</a>';
      content += '<button type="button" class="close" data-entry="' + entry + '">&times;</button>';
    list.push($('<li>', { html: content, class: 'list-group-item' }));
  }
  $(".entry-list").append(list);
};

$(document).ajaxStart(function() {
  $(".loading-spinner").show();
}).ajaxStop(function() {
  $(".loading-spinner").hide();
});

$(document).ready(function() {

  // load all cities

  $.ajax({
    url: "/cities",
    method: "GET"
  }).done(appendToList);


  // add city

  $("form").on("submit", function(ev) {
    ev.preventDefault();

    var form = $(this),
      formData = form.serialize(),
      requiredFields = form.find(".form-group.required"),
      alert = $(".alert");

    alert.remove();

    $.ajax({
      url: "/cities",
      method: "POST",
      data: formData
    })
    .fail(function(response) {
      var msg = JSON.parse(response.responseText).message;
      requiredFields.addClass("has-error");
      var template = $($("#alert_tmpl").html());
      $("#flash-msg-wrapper")
        .html(template.html(msg));
    })
    .done(function(response) {
      appendToList([response]);
      $(document.body).animate({ scrollTop: 0 }, 200);
      form.trigger("reset");
    });
  });

  $("form").on("change", "[required]", function() {
    $(this).parent().removeClass("has-error");
  });


  // delete city

  $(".entry-list").on("click", "[data-entry]", function(ev) {
    ev.preventDefault();
    var target = $(event.target);

    if (!confirm("Delete city?")) { return false; }

    $.ajax({
      url: "/cities/" + target.data("entry"),
      method: "DELETE"
    }).done(function(data) {
      target.parents("li").remove();
    });
  });

});
