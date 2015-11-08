$(document).ready(function() {

console.log("doc ready");
  var $newElem = function (title, thumb) {
    // console.log("new elem function");
    $('.main-content').append('<div class="row"><div class="article"><div class="media"><div class="media-left media-middle"><a href="#"><img class="media-object" src="'+ thumb + '" alt="..."></a></div><div class="media-body"><h4 class="media-heading">'+title+'</h4></div></div></div></div>');
  };

  var $newElemNoThumb = function (title) {
    // console.log("new elem function");
    $('.main-content').append('<div class="row"><div class="article"><div class="media"><div class="media-left media-middle"><a href="#"><img class="media-object" src="http://placecreature.com/nicolas-cage/150/150" alt="..."></a></div><div class="media-body"><h4 class="media-heading">'+title+'</h4></div></div></div></div>');
  };

  var $getComments = function ($relLink) {
    $.get('https://www.reddit.com/' + $relLink + '.json', function (data) {
      // console.log('get comments');
      // console.log(data);
    });
  };

  var getRequests = function () {

    $.get('https://www.reddit.com/r/science.json',
    function (data) {
      // console.log('done');
      // console.log(data);

      // for (var i=0; i<10; i+=1) {
      //   var sublisting = data.data.children[i];
      //   if (sublisting.data.domain !== "self.science"){
      //     console.log(sublisting.data.title, sublisting.data.thumbnail, sublisting.data.permalink);
      //     var $title = sublisting.data.title;
      //     var $thumb = sublisting.data.thumbnail;
      //     var $relLink = sublisting.data.permalink;
      //     var $formatLink = $relLink.substring(0, $relLink.length - 1);
      //
      //     console.log("formatted link: " + $formatLink);
      //     console.log("get request : https://www.reddit.com/" + $formatLink + ".json");
      //     $getComments($formatLink);

          // if (sublisting.data.thumbnail === 'default') {
          //   $newElemNoThumb($title);
          // } else {
          //   $newElem($title, $thumb);
          // }
    //     }
    //   }
    //
    });

  };

  $.get('https://www.reddit.com//r/science/comments/3rvwml/purdue_researchers_successfully_target_achilles.json', function (data) {
    console.log(data);
    var commentObj = data[1];
    var thread = commentObj.data.children;
    var longestComment = '';
    for (var i = 0; i < thread.length; i++) {
      var comment = thread[i].data.body;
      // console.log(comment);
      // console.log(comment.length);
      if (comment.length > longestComment.length) {
        longestComment = comment;
      }
    }
    console.log(longestComment);
  });


  getRequests();

  // $.get('python.py')
  //     .done(function (data) {
  //       console.log(data);
  //     });

  $('#succinct').on('click', function () {
    var panel = $(this).closest('.media').find('.start-hidden');
    if ($(panel).is(':hidden')) {
      console.log('hidden p');
      $(panel).slideDown("slow");
    } else {
      $(panel).slideUp("slow");
    }
  });

});
