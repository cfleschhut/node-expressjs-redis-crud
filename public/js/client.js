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
      formData = form.serialize();

    var alert = $(".alert");
    alert.addClass("hide");

    $.ajax({
      url: "/cities",
      method: "POST",
      data: formData
    })
    .fail(function(response) {
      var msg = JSON.parse(response.responseText).message;
      alert
        .removeClass("hide")
        .html(msg);
    })
    .done(function(response) {
      appendToList([response]);
      form.trigger("reset");
    });
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
