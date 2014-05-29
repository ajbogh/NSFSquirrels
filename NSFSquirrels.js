var nsfwImages = [];
var flickrLimit = 30;
function constructURL(photo){
	return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
}

var things = document.querySelectorAll(".linklisting > .thing"), nsfwStamp;
for(var i=0; i<things.length; i++){
	if(things[i].querySelector("li.nsfw-stamp")){
		var thumb = things[i].querySelector("a.thumbnail > img");
		if(thumb){
			nsfwImages.push(thumb);
		}
	}
}

var QUERY = "squirrel";
var searchOnFlickr_ = 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=8f1b2047a7cb0c5a824c8edeb24f2ee8&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=date-posted-desc&' +
      'per_page=50';

var req = new XMLHttpRequest();
req.open("GET", this.searchOnFlickr_, true);
req.onload = function(){
	if(this.status != 200){ return; }

	var photos = this.responseXML.querySelectorAll('photo');
	for (var i = 0; i < photos.length && i < nsfwImages.length; i++) {
		nsfwImages[i].src = constructURL(photos[i]);
	}
}
req.send(null);
