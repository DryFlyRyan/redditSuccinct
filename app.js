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

  var getComments = function () {
    // console.log('get comments invoked');
    $('.succinct').each(function () {
      // console.log('looping through .succinct');
      var relLink = $(this).attr('data');
      // console.log(relLink);
      var parent = $(this).closest('.media');
      var longestComment = '';

      $.get('https://www.reddit.com/' + relLink + '.json', function (){
        // console.log("getting");
      })
      .done(function (data) {
        // console.log('done');
        console.log(data);
        var commentObj = data[1];
        // console.log(commentObj);
        var thread = commentObj.data.children;
        if (thread.length) {
          // console.log('thread: ', thread);
          console.log('body object: ', thread[0].data.body);
          for (var i = 0; i < thread.length; i++) {
            var target = thread[i].data.body_html;
            // console.log(target);
            var comment = [];
            // console.log(thread[i].data.body);
            if (target !== 'undefined') {
              comment = target;
              if (comment.length > longestComment.length) {
                longestComment = comment;
              }
            }
          }
          console.log(longestComment);
          $(parent).append('<div class="row start-hidden"></div>');
          $(parent).find('.start-hidden').append(longestComment);
        }
      });
    });
  };

  var getRequests = function () {

    $.get('https://www.reddit.com/r/science.json',
    function () {
    console.log('getting');
  }).done(function(data) {
      // console.log('done');
        console.log(data);

      for (var i=0; i < 20; i+=1) {
        var sublisting = data.data.children[i];
        if (sublisting.data.domain !== "self.science"){
          var $title = sublisting.data.title;
          var $thumb = sublisting.data.thumbnail;
          var $relLink = sublisting.data.permalink;
          var $formatLink = $relLink.substring(0, $relLink.length - 1);

          if (sublisting.data.thumbnail === 'default') {
            $newElemNoThumb($title, $formatLink );
          } else {
            $newElem($title, $thumb, $formatLink );
          }
        }
      }
      getComments();
    });
  };

  var get1 = getRequests();




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
