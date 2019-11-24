const request = require('request');
const mysql = require('mysql');


module.exports = {

    /**
     * Return random image URLs from an API
     * @param string keyword = search term
     * @param int    imageCount = number of random images to return
     * @return array of image URLs
    */
    getRandomImages_cb: function (keyword, imageCount, callback){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+ imageCount + "&client_id=a4aed4f0fcb93e79526a2a488f4ff0f4c07ff8a2a0e23978874674b9161cf78e";
        console.log(requestURL);
        
        request(requestURL, function (error, response, body) {
      if(!error){
          var parsedData = JSON.parse(body);
          var imageURLs= [];
          for (let i = 0; i <imageCount; i++){
              imageURLs.push(parsedData[i].urls.regular);
          }
          //return imageURLs;
          callback(imageURLs);
        } else {
            console.log("results", {"error": "Unable to access API"});
        }
        
        }); //request
    },
    
    
    /**
     * Return random image URLs from an API
     * @param string keyword = search term
     * @param int    imageCount = number of random images to return
     * @return array of image URLs
    */
    getRandomImages : function (keyword, imageCount){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+ imageCount + "&client_id=a4aed4f0fcb93e79526a2a488f4ff0f4c07ff8a2a0e23978874674b9161cf78e";
        
        
        return new Promise( function(resolve,reject) {
            request(requestURL, function (error, response, body) {
          if(!error){
              var parsedData = JSON.parse(body);
              var imageURLs= [];
              for (let i = 0; i <imageCount; i++){
                  imageURLs.push(parsedData[i].urls.regular);
              }
              //return imageURLs;
              
              resolve(imageURLs);
            } else {
                console.log("results", {"error": "Unable to access API"});
            }
            
            }); //request
        }); //promise
    }, //function
    
    /**
     * creates database connection
     * @return db connection
     */
    createConnection: function(){
            var conn = mysql.createConnection({
               host: "cst336db.space",
               user: "cst336_dbUser027",
               password: "fhlwkc",
               database: "cst336_db027"
    });
        return conn;
    }
};