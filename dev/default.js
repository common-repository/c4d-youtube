var c4dYoutube = {};
(function($){
	"use strict";
	$(document).ready(function(){
		$('.c4d-youtube').each(function(){
			var api = $(this).attr('data-api-key'),
			id = $(this).attr('data-id'),
			type = $(this).attr('data-type'),
			uid = $(this).attr('id'),
			params = c4dYoutube[uid],
			url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
			self = this;
			
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: url + '&key=' + params['api-key'] + '&playlistId=' + params['id']
			}).done(function(data){
				if ( typeof data.items !== 'undefined' && data.items.length > 0 ){
					var count = params.count ? params.count : 5,
					html = [];
					$.each(data.items, function(index, el){
						if (typeof el.snippet.thumbnails !== 'undefined') {
							var img = el.snippet.thumbnails.medium.url,
							title = el.snippet.title,
							video = 'http://www.youtube.com/embed/' + el.snippet.resourceId.videoId + '?wmode=opaque&autoplay=1';
							if (index < count) {
								html.push('<div class="item"><div class="item-inner"><a rel="video-gallery" class="video-link fancybox.iframe" href="'+ video +'"><img alt="' + title + '" src="'+img+'"></a></div></div>');	
							}
						}
					});	
					$(self).append(html.join(''));
					if (type == 'slider') {
						$(self).owlCarousel({
							singleItem : true,
							autoPlay : false,
						    stopOnHover : false,
						 	// Navigation
						    navigation : false,
						    //Pagination
						    pagination : true,
						    paginationNumbers: false,
						 	//Auto height
						    autoHeight : true,
						    lazyLoad : true
						});
					}
					$(self).find('.video-link').fancybox({
						margin: 100,
						openEffect  : 'none',
						closeEffect : 'none',
						cyclic: true,
						helpers: {
					        media: {}
					    },
					    youtube: {
					        autoplay: 1,
					        hd: 1,
					        wmode: 'opaque', // shows X to close
					        vq: 'hd720' // default 720p hd quality
					    }
					});
	  			}
			});

			return;
		});
	});
})(jQuery);