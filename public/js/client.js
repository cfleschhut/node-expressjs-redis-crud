var appendToList = function(entries) {
  var list = [];
  for (var i in entries) {
    var entry = entries[i];
    if (!entry) { continue; }
    var content = '';
      content += '<a href="/cities/' + entry + '">' + entry + '</a>';
      content += '<button type="button" class="close" data-block="' + entry + '">&times;</button>';
    list.push($('<li>', { html: content, class: 'list-group-item' }));
  }
  $(".block-list").append(list);
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

  $(".block-list").on("click", "[data-block]", function(ev) {
    ev.preventDefault();
    var target = $(event.target);

    if (!confirm("Delete block?")) { return false; }

    $.ajax({
      url: "/blocks/" + target.data("block"),
      method: "DELETE"
    }).done(function(data) {
      target.parents("li").remove();
    });
  });

});
