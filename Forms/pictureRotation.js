/* A script for rotating pictures based on a numeric value that represents their EXIF orientation. Each picture and its orientation is assumed to be on a table row. */

$(document).ready(function() {
  
  $("#q8").hide();
  $("#q13").hide();

  jQuery.fn.rotate = function(degrees) {
      $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                   '-moz-transform' : 'rotate('+ degrees +'deg)',
                   '-ms-transform' : 'rotate('+ degrees +'deg)',
                   'transform' : 'rotate('+ degrees +'deg)'});
      return $(this);
  };
  
  if ($('#Field8').is('div')) {
    $("#q13").hide();
    var email = $('#Field19').text();
    var customerNameAddition = "Dear " + $("#Field12").text() + ",<br><br>";
    var titleAddition = "<p>" + $("#Field10").text() + "<br>" + $("#Field11").text() + "</p>";
    $("#form-title-wrap").html($("#form-title-wrap").html() + titleAddition);
    var message = document.getElementById('Field3');
    var wordsInName = $("#Field9").text().split(" ");
    var firstName = wordsInName[0];
    message.innerHTML = customerNameAddition + message.innerHTML + "<br><br>Thank you,<br>" + firstName + "<br><a>" + email + "</a>";
    $(".cf-helptext").remove();
    $("#q3 > .cf-label").remove();
    $(".cf-col-label").remove();
    if ($("#Field8").text() == "") {
      $('#q18').hide();
    } else {
      var imageHash = JSON.parse($("#Field8").text());
      for (var key in imageHash) {
        $row = $('.hideRowLabel').filter(function(index) { 
          return $(this).text() === (key); 
        });
        $tr = $row.parent('tr');
        var orientation = $tr.children('[data-title="Orientation"]').children('.cf-field').children('div').text();
        var photo = $tr.children('[data-title="Attachment"]').empty().append('<img id="' +key+ '" class="photo" src="' + imageHash[key] + '">');
        if (orientation == "6") {
          $tr.children('[data-title="Attachment"]').css('padding-top', '150px');
          $(photo).rotate(90);
        } else if (orientation == "3") {
          $(photo).rotate(180);
        } else if (orientation == "8") {
          $tr.children('[data-title="Attachment"]').css('padding-top', '150px');
          $(photo).rotate(270);
        }
      }
    }
  }
});