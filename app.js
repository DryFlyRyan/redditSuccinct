$(document).ready(function() {

console.log("doc ready");

// Global Variables
// var longestComment = '';


// Spare:
// <div class="row start-hidden">'+ comment +'</div>

  var $newElem = function (title, thumb, data) {
    // console.log(title);
    // console.log(thumb);
    // console.log(comment);
    $('.main-content').append('<div class="row"><div class="article panel-default"><div class="media"><div class="container col-md-3"><div class="media-left media-middle"><a href="#"><img class="media-object" src="'+thumb+'" alt="..."></a></div></div><div class="container col-md-9"><div class="media-body"><h3 class="media-heading">' + title + '</h3></div><div class="row"><div class="media-body"><button type="button" class="succinct" data="'+data+'" name="succint">succinct</button><button type="button" name="button">comments</button><button type="button" name="button">original thread</button></div></div></div></div></div></div>');
  };

  var $newElemNoThumb = function (title, data) {
    // console.log(title);
    // console.log(comment);
    $('.main-content').append('<div class="row"><div class="article panel-default"><div class="media"><div class="container col-md-3"><div class="media-left media-middle"><a href="#"><img class="media-object" src="http://placecreature.com/nicolas-cage/150/150" alt="..."></a></div></div><div class="container col-md-9"><div class="media-body"><h3 class="media-heading">' + title + '</h3></div><div class="row"><div class="media-body"><button type="button" class="succinct" data = "'+ data +'" name="succint">succinct</button><button type="button" name="button">comments</button><button type="button" name="button">original thread</button></div></div></div></div></div></div>');

  };

  var testFunction = function () {
    return "test line";
  };

  var $getComments = function ($relLink) {
    $('.succinct').each(function () {
      var relLink = $(this).attr('data');
      var parent = $(this).closest('.media');
      var longestComment = '';
      $.get('https://www.reddit.com/' + relLink + '.json', function (){
        console.log("getting");
      })
      .done(function (data) {
        console.log('done');
        var commentObj = data[1];
        var thread = commentObj.data.children;
        $(thread).each(function() {
          var comment = [];
          if (thread[i].data.body !== undefined) {
            comment = thread[i].data.body;

            if (comment.length > longestComment.length) {
              longestComment = comment;

            }
          }
        });
        $(parent).append('<div class="row start-hidden"><p>'+longestComment+'</p</div>');
      });
    )};
  ;
  };

  var getRequests = function () {

    $.get('https://www.reddit.com/r/science.json',
    function (data) {
      // console.log('done');
        console.log(data);

      for (var i=0; i < 5; i+=1) {
        var sublisting = data.data.children[i];
        if (sublisting.data.domain !== "self.science"){
          var $title = sublisting.data.title;
          var $thumb = sublisting.data.thumbnail;
          var $relLink = sublisting.data.permalink;
          var $formatLink = $relLink.substring(0, $relLink.length - 1);
          $getComments($formatLink);

          if (sublisting.data.thumbnail === 'default') {
            $newElemNoThumb($title, $formatLink );
          } else {
            $newElem($title, $thumb, $formatLink );
          }
        }
      }

    });

  };


  getRequests();

  // $.get('python.py')
  //     .done(function (data) {
  //       console.log(data);
  //     });

  $('body').on('click', '.succinct', function (event) {
    // console.log('succinct push');
    //
    // console.log(event.target);
    // console.log($(this));

    console.log('it\'s clicking');
    var parent = $(this).closest('.media');
    var hiddenP = $(parent).find('.start-hidden');

    if ($(hiddenP).is(':hidden')) {
      console.log('second if');
      $(hiddenP).slideDown('slow');
    } else {
      console.log('else');
      $(hiddenP).slideUp("slow");
    }

});

});
