var appendToList = function(blocks) {
  var list = [];
  for (var i in blocks) {
    var block = blocks[i];
    if (!block) { continue; }
    var content = '<a href="#" data-block="' + block.id + '">&times;</a> <a href="/blocks/' + block.id + '">' + block.name + '</a>';
    list.push($("<li>", { html: content }));
  }
  $(".block-list").append(list);
};

$(document).ready(function() {

  $.ajax({
    url: "/blocks",
    method: "GET"
  }).done(appendToList);

  $("form").on("submit", function(ev) {
    ev.preventDefault();

    var form = $(this),
      blockData = form.serialize();

    $.ajax({
      url: "/blocks",
      method: "POST",
      data: blockData
    })
    .fail(function(response) {
      console.log(JSON.parse(response.responseText).message);
    })
    .done(function(block) {
      appendToList([block]);
      form.trigger("reset");
    });
  });

  $(".block-list").on("click", "a[data-block]", function(ev) {
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
