/* A code snippet for grabbing the user's geolocation and populating two fields with latitude and longitude. */


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {timeout: 10000, enableHighAccuracy: true});
    } else {
      	$("#Field33").val("Geolocation not supported on user's browser.");
    	$("#Field34").val("Geolocation not supported on user's browser.");
    }
  }
  
  //Geolocation error scenarios
  function handleError(err) {
    if (err.code == 1) {
      $("#Field33").val("Declined by user.");
      $("#Field34").val("Declined by user.");
    } else if (err.code == 2) {
      $("#Field33").val("Position unavailable.");
      $("#Field34").val("Position unavailable.");
    } else if (err.code == 3) {
      $("#Field33").val("Geolocation timed out.");
      $("#Field34").val("Geolocation timed out.");
    }
  }
  
  function showPosition(position) {
    $("#Field33").val(position.coords.latitude);
    $("#Field34").val(position.coords.longitude);
  }
  
  getLocation();