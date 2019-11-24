//event listener
/*global $*/
var clickedKeyWord;

$(document).ready(function(){
    
    $(".keywordLink").on("click",function(){
        clickedKeyWord = $(this).text().trim();
        //alert($(this).text().trim());
        $.ajax({
            method: "get",
               url: "/api/displayFavorites",
              data: {
                  "keyword" : $(this).text().trim(),
              },
           success: function(rows,status){
               
               $("#favorites").html("");
               rows.forEach(function(row){
                  $("#favorites").append("<img class='image' src='"+row.imageURL+"' width='150' height='150'>"); 
                  $("#favorites").append("<img class='favoriteIcon' src='img/fav_on.png' width='20'>");
               });
           }
        });//ajax
       
        
    });
    
});

$(document).on('click','.favoriteIcon',function(){
       //alert("it works!");
    //   alert($(this).prev().attr("src"));
       var imageURL = $(this).prev().attr("src") ;
       if($(this).attr("src")  == "img/fav_off.png"){
           $(this).attr("src","img/fav_on.png");
           
           updateFavorite(imageURL,"add"); //inserts a new record
           //alert(imageURL);
           
       } else {
           $(this).attr("src","img/fav_off.png");
           updateFavorite(imageURL,"delete"); //deletes record
       }
});

    function updateFavorite(imageURL,action){
        var finalKeyWord;
        //alert("BEFORE --Final:" + finalKeyWord + " clicked:"+clickedKeyWord);
        if(!$("#keyword"))
        {
            finalKeyWord = clickedKeyWord;
        } else {
            finalKeyWord = $("#keyword").val();
        }
        if(!finalKeyWord)
        {
            finalKeyWord = clickedKeyWord;
        }
        
        //alert("AFTER -- Final:" + finalKeyWord + " clicked:"+clickedKeyWord);
        $.ajax({
            method: "get",
               url: "/api/updateFavorites",
              data: {"imageURL" : imageURL,
                     "keyword"  : finalKeyWord,
                     "action"   : action
              }
        });//ajax
    }
    
    