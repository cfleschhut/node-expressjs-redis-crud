$(document).ready(function() {

  var appendToList = function(blocks) {
    var list = [];
    var block, content;
    for (var i in blocks) {
      block = blocks[i];
      content = '<a href="/blocks/' + block + '">' + block + '</a>'
      list.push($("<li>", { html: content }));
    }
    $(".block-list").append(list);
  };

  $.ajax({
    url: "/blocks",
    method: "GET"
  }).done(appendToList);

  $("form").on("submit", function(ev) {
    ev.preventDefault();
    var form = $(this);
    var blockData = form.serialize();

    $.ajax({
      url: "/blocks",
      method: "POST",
      data: blockData
    }).done(function(blockName) {
      appendToList([blockName]);
      form.trigger("reset");
    });
  });

});
