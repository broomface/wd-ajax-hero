(function() {
  'use strict';

  const movies = [];


  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

// This is using the submit button inside the form div
$('form').submit(function(event){  // listener
  event.preventDefault()  // this keeps the submit at bey
});

function movie(id, poster, title, year){
  this.id = id;
  this.poster = poster;
  this.title = title;
  this.year = year;
}
// This uses the button, creates the function
$('button').on('click', function (){
  let $input = $('#search')[0].value; // input set, checking value
  if ($('#search')[0].value === ""){  // loop to verify if value is blank
      alert("Please enter a valid movie") // reminds to put in value
  }
$('#search')[0].value = "";  // clears value after submission


// this is the get request for the site and appended input
  var $xhr= $.getJSON("https://omdb-api.now.sh/?s=" + $input);
  $xhr.done(function(data){  // .done is the promise


    for (var i = 0; i < data.Search.length; i++){  // loop to add to object
        let poster = data.Search[i].Poster;
        let id = data.Search[i].imdbID;
        let title = data.Search[i].Title;
        let year = data.Search[i].year;
        let movobj = new movie(id, poster, title, year);
        movies.push(movobj);
        // pushes objects to movie array
    }
  movie = [];
  renderMovies(movie);  //

  });
});

})();
