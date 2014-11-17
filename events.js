function submit() {
  var word = document.getElementsByName("word")[0].value;
  mainQuery(word,function(data) {
    translateXML(data);
    chrome.runtime.getBackgroundPage(function(win) {
      win.fetchWordWithoutDeskDict(word, function(data) {
        //console.log(data);
        var $temp = $('<div />');
        $temp.html(data);
        var $spans = $temp.find('#yddTopBorderlr span');
        $spans.each(function() {
          var $span = $(this);
          var content = $span.text().trim();
          if (/^\[.+\]$/.test(content)) {
            //console.log(content);
            $('#result').prepend('<span>' + content + '</span><br />');
            return false;
          }
        });
      });
    });
  });
}

$(document).ready(function(){
    restore_options();
    document.getElementById('word').focus();
    changeIcon();
    $("#word").keydown(function(e){
      if(event.keyCode==13){
        submit();
      }
    });
    $('#search').click(submit);
   
});