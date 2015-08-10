$(document).ready(function() {

  var loadBlocks = function() {
    return $.ajax({
      url: "/blocks",
      method: "GET"
    })
  };

  var appendToList = function(data) {
    var list = [];
    for (var i in data) {
      list.push($("<li>", { text: data[i] }));
    }
    $(".block-list").append(list);
  };

  loadBlocks()
    .done(appendToList);

});
