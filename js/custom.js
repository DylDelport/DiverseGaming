/* Twitch Stuff */
//clientID = ufuwup62tm3ys74xm30tajgshzim26

$(function() {
        
    var streamers = ["edberg", "dunn85", "diversegaminglive", "saltnp3p", "ricksteeletv", "smoggie8", "th3namesbruce", "grandmonktv", "messeh", "taytay61", "webbo231287"];   
        
    var livestreams = [];
    
    // Get streamers that are online that are in streamers array
    for (var i=0; i < streamers.length; i ++){
        
        var target_streamer = streamers[i];
        
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/'+ streamers[i],
            headers: {
            'client-ID': 'ufuwup62tm3ys74xm30tajgshzim26'
            },
            success: function(dataI) {
                //console.log(dataI);
                
                $.getJSON('https://api.twitch.tv/kraken/streams/'+ dataI.name + '?client_id=ufuwup62tm3ys74xm30tajgshzim26').done(function (dataII) {
                                      
                    if(dataII.stream == null){ 
                    } else {       
                        console.log(dataII.stream);
                        livestreams.push(dataII.stream.channel.name);
                        var elementID = '#' + dataII.stream.channel.name;
                        $(elementID).show();
                    }
                });
            },
            error: function(err) {
                console.log("Error: User not found");
            }
        }); 
        
    }
    
    // Show streamer icons that are streaming
    for (var q = 0; q < livestreams.length; q ++){
    }    
    
    if (livestreams.length > 0) {
        var options = {
            width: 854,
            height: 480,
            channel: livestreams[0],
            layout: "video",
            theme: "dark",
        };
                
        var embed = new Twitch.Embed("twitch-MainPlayer", options);
    }
    
        
        
    $(".stream").on('click', function(){
        
        if ($(this).hasClass("selected")) {
        } else {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            
            var player = embed.getPlayer();
            
            var text = $(this).data("name");
            options.channel = text;
            player.setChannel(text);
        }
            
    });
    
    
});

 

// Create a request variable and assign a new XMLHttpRequest object to it. 
//var request = new XMLHttpRequest();


// Open a new connection, using the GET request on the URL endpoint
//request.open('GET', 'https://api.twitch.tv/helix/streams?user_id=5678', true);
//
//request.onload = function () {
//    // Begin accessing JSON data here
//    var data = JSON.parse(this.response);
//
//    if (request.status >= 200 && request.status < 400) {
//        data.forEach(login => {
//          // Log each movie's title
////          console.log();
//        });
//    } else {
//        console.log('error');
//    }
//
//
//    $(document).ready(function () {
//
//    });
//  }

//// Send request
//request.send();

