$(document).ready(function() {

console.log("doc ready");
  var $newElem = function (title, thumb, comment) {
    // console.log(title);
    // console.log(thumb);
    // console.log(comment);
    $('.main-content').append('<div class="row"><div class="article panel-default"><div class="media"><div class="container col-md-3"><div class="media-left media-middle"><a href="#"><img class="media-object" src="'+thumb+'" alt="..."></a></div></div><div class="container col-md-9"><div class="media-body"><h3 class="media-heading">' + title + '</h3></div><div class="row"><div class="media-body"><button type="button" class="succinct" name="succint">succinct</button><button type="button" name="button">comments</button><button type="button" name="button">original thread</button></div></div><div class="row start-hidden"> <p>'+ comment +'</div></div></div></div></div>');
  };

  var $newElemNoThumb = function (title, comment) {
    // console.log(title);
    // console.log(comment);
    $('.main-content').append('<div class="row"><div class="article panel-default"><div class="media"><div class="container col-md-3"><div class="media-left media-middle"><a href="#"><img class="media-object" src="http://placecreature.com/nicolas-cage/150/150" alt="..."></a></div></div><div class="container col-md-9"><div class="media-body"><h3 class="media-heading">' + title + '</h3></div><div class="row"><div class="media-body"><button type="button" class="succinct" name="succint">succinct</button><button type="button" name="button">comments</button><button type="button" name="button">original thread</button></div></div><div class="row start-hidden">' + comment + '</div></div></div></div></div>');

  };

  var testFunction = function () {
    return "test line";
  };

  var $getComments = function ($relLink) {
    var longestComment = 'test';
    $.get('https://www.reddit.com/' + $relLink + '.json', function (data) {
      console.log(data);
      var commentObj = data[1];
      // console.log("commentObj = ");
      // console.log(commentObj);
      var thread = commentObj.data.children;
      // console.log('thread = ');
      // console.log(thread);



      for (var i = 0; i < 10; i++) {
        var comment = [];
        if (thread[i].data.body !== undefined) {
          comment = thread[i].data.body;
          // console.log('comment = ');
          // console.log(comment);
        }
        if (comment.length > longestComment.length) {
          longestComment = comment;
        }
      }


      // console.log(longestComment);
      // console.log('longest comment = ');
      // console.log(longestComment);

    });
    console.log(longestComment);
    return "TEST PASS";
  };

  var getRequests = function () {

    $.get('https://www.reddit.com/r/science.json',
    function (data) {
      // console.log('done');
      // console.log(data);

      for (var i=0; i < 5; i+=1) {
        var sublisting = data.data.children[i];
        if (sublisting.data.domain !== "self.science"){
          // console.log(sublisting.data.title, sublisting.data.thumbnail, sublisting.data.permalink);
          var $title = sublisting.data.title;
          var $thumb = sublisting.data.thumbnail;
          var $relLink = sublisting.data.permalink;
          var $formatLink = $relLink.substring(0, $relLink.length - 1);

          // console.log("formatted link: " + $formatLink);
          // console.log("get request : https://www.reddit.com/" + $formatLink + ".json");

          var comment = $getComments($formatLink);

          console.log(comment);

          if (sublisting.data.thumbnail === 'default') {
            $newElemNoThumb($title, comment );
          } else {
            $newElem($title, $thumb, comment );
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

  $('body').on('click', '.succinct', function () {
    console.log('succinct push');
    var panel = $(this).closest('.media').find('.start-hidden');
    if ($(panel).is(':hidden')) {
      console.log('hidden p');
      $(panel).slideDown("slow");
    } else {

      $(panel).slideUp("slow");
    }
  });

});
