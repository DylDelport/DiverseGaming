/* Twitch Stuff */
//clientID = ufuwup62tm3ys74xm30tajgshzim26

//stupid jshint stuff
/*globals $:false */
/* jshint browser: true */

//Global
var streamers = ["dunn85", "diversegaminglive", "saltnp3p", "ricksteeletv", "smoggie8", "th3namesbruce", "grandmonktv", "messeh", "taytay61", "webbo231287", "liamh", "dreamtrip", "thisisrich_", "fmginge"];   
var livestreams = [];
var streamShowing;

$(function() {
       
    
    streamShowing = false;
    $('#LIVESTREAMS').hide();
        
    getOnlineStreamers();
    
    window.setInterval(getOnlineStreamers, 30000); 
            
    $(".stream").on('click', function(){
        
        if ($(this).hasClass("selected")) {
        } else {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            
            var index = livestreams.indexOf(this.dataset.name);
            embedTwitchPlayer(index, true);                              
        }
            
    });
    
    
});

$(document).ajaxComplete(function() {
    $('#streamers-num span').text(streamers.length);
    $('#live-num span').text(livestreams.length);
    
    showOnlineStreamersIcon();
});

// Show streamer icons that are streaming
function showOnlineStreamersIcon() {
    for(var i=0; i < livestreams.length; i++) {
        var elementID = '#' + livestreams[i];
        $(elementID).show(); 
    }            
}

function embedTwitchPlayer(streamer, changeChannel){
    
    var options = {
        width: 854,
        height: 480,
        channel: livestreams[streamer],
        layout: "video",
        theme: "dark",
    }; 
    
    if(changeChannel){
        $('#player').remove(); 
        $('#twitch-Player').append('<div id="player"></div>')
    } 
    
    new Twitch.Embed("player", options);  
}

// Get streamers that are online that are in streamers array
function getOnlineStreamers() {
    
    for (var i=0; i < streamers.length; i ++){
        var target_streamer = streamers[i];
        
        $.ajax({
            type: "GET",
            url: 'https://api.twitch.tv/kraken/streams/'+ target_streamer + '?client_id=ufuwup62tm3ys74xm30tajgshzim26',
            success: function(data) {
                if(data.stream != null){
                    livestreams.push(data.stream.channel.name);
                }
            },
            complete: function() {                    
                console.log("I've searched for online streamers");
                if(streamShowing == false) {
                    if (livestreams.length > 0) {

                        embedTwitchPlayer(0, false);

                        $('#LIVESTREAMS').show();
                        $('#'+livestreams[0]).addClass('selected');
                        streamShowing = true;
                    }
                }             
            }
        });
    }
}