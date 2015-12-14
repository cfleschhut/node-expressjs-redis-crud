var appendToList = function(blocks) {
  var list = [];
  for (var i in blocks) {
    var block = blocks[i];
    if (!block) { continue; }
    var content = '';
      content += '<a href="/blocks/' + block.id + '">' + block.name + '</a>';
      content += '<button type="button" class="close" data-block="' + block.id + '">&times;</button>';
    list.push($('<li>', { html: content, class: 'list-group-item' }));
  }
  $(".block-list").append(list);
};

$(document).ready(function() {

  // load all cities

  $.ajax({
    url: "/blocks",
    method: "GET"
  }).done(appendToList);


  // add city

  $("form").on("submit", function(ev) {
    ev.preventDefault();

    var form = $(this),
      blockData = form.serialize();

    var alert = $(".alert");
    alert.addClass("hide");

    $.ajax({
      url: "/blocks",
      method: "POST",
      data: blockData
    })
    .fail(function(response) {
      var msg = JSON.parse(response.responseText).message;
      alert
        .removeClass("hide")
        .html(msg);
    })
    .done(function(block) {
      appendToList([block]);
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
