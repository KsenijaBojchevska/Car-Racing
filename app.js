$(function () {
  let raceBtn = $("#raceBtn");
  $("#raceBtn").prop("disabled", false);
  $("#startOverBtn").prop("disabled", false);

  function setInitialCarDataIfPresent() {
    // data e lista od objekti od klasa FinishedTimes
    let data = JSON.parse(localStorage.getItem("carInfo"));

    if (data != null) {
      $("#prevSessionData").html(localStorage.getItem("carInfo"));
    }


    /* if (data != null) {
      for (let i = 0; i < localStorage.getItem("carInfo").length; i++) {
        $("#prevSessionData").html(
          `
         
          ${data.car} finished in ${data.place} with a time of ${data.time}
          
          
          `
        )
      }
    } */


  }

  function raceCounter() {
    const countBlock = $("#carCounter");
    const body = $("#raceTrack");

    body.css("opacity", "0.5");
    countBlock.css("opacity", "1");

    let counter = 3;

    countBlock.html("");
    countBlock.show();

    const interval = setInterval(function () {
      countBlock.html(counter);
      counter--;

      if (counter == -1) {
        countBlock.hide();
        clearInterval(interval);
        body.css("opacity", "1");
      }
    }, 1000);
  }

  function addToLocalStorage(carData) {
    let data = JSON.parse(localStorage.getItem("carInfo"));
    /*  $('car').val(data.car)
     $('time').val(data.time)
     $('place').val(data.place)
  */


    if (data == null || data.length == 2) {
      const list = new Array();
      list.push(carData);
      localStorage.setItem("carInfo", JSON.stringify(list));
    } else if (data.length == 1) {
      const list = new Array();
      list.push(data);
      list.push(carData);
      localStorage.setItem("carInfo", JSON.stringify(list));
    }
  }

  setInitialCarDataIfPresent();

  raceBtn.click(function () {
    raceCounter();

    setTimeout(function () {
      function checkIfComplete() {
        if (isComplete == false) {
          isComplete = true;
        } else {
          place = "second";
        }
      }

      let carWidth = $("#car1").width();
      let raceTrackWidth = $(window).width() - carWidth - 12;

      let raceTime1 = Math.floor(Math.random() * 5000 + 1);
      let raceTime2 = Math.floor(Math.random() * 5000 + 1);


      let isComplete = false;
      let place = "first";
      $("#raceBtn").prop("disabled", true);
      $("#startOverBtn").prop("disabled", true);
      $("#car1").animate({ left: raceTrackWidth, }, raceTime1, function () {
        checkIfComplete();
        $("#raceInfo1 p").html(`<div class="border border-white">Finished in:
          <span style="color: white;font-weight: bold; "> ${place} </span> place with a time of: 
           <span style="color: white;font-weight: bold; "> ${raceTime1} </span>
           milliseconds! </div>`
        );

        $("#raceBtn").prop("disabled", false);
        $("#startOverBtn").prop("disabled", false);
        const mainTrack = $('.mainTrack');
        $('.mainTrack').css("opacity", "0.5");
        $("#raceFinish").show();
        addToLocalStorage(new FinishedTimes("car1", raceTime1, place));
        $('.prevTime').show()
      }
      );

      $("#car2").animate({ left: raceTrackWidth }, raceTime2, function () {
        checkIfComplete();
        $("#raceInfo2 p").html(`<div class="border border-white">Finished in: 
        <span style="color: red; font-weight: bold;"> ${place} </span> place with a time of: 
         <span style="color: red;font-weight: bold;"> ${raceTime2} </span>
         milliseconds! </div>`
        );

        addToLocalStorage(new FinishedTimes("car2", raceTime2, place));
        $('.prevTime').show()

      });


    }, 4000);
  });

  $("#startOverBtn").click(function () {
    $(".car").css("left", "0");
    $(".raceInfo p").text("");
    const mainTrack = $('.mainTrack');
    $('.mainTrack').css("opacity", "1");
    $("#raceFinish").hide();
    $('.prevTime').hide()
  });
});

class FinishedTimes {
  car;
  time;
  place;

  constructor(car, time, place) {
    this.car = car;
    this.time = time;
    this.place = place;
  }
}
