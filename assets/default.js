var c4dYoutube={};!function(e){"use strict";e(document).ready(function(){e(".c4d-youtube").each(function(){var t=(e(this).attr("data-api-key"),e(this).attr("data-id"),e(this).attr("data-type")),i=e(this).attr("id"),a=c4dYoutube[i],n="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet",o=this;e.ajax({type:"GET",dataType:"json",url:n+"&key="+a["api-key"]+"&playlistId="+a.id}).done(function(i){if("undefined"!=typeof i.items&&i.items.length>0){var n=a.count?a.count:5,d=[];e.each(i.items,function(e,t){if("undefined"!=typeof t.snippet.thumbnails){var i=t.snippet.thumbnails.medium.url,a=t.snippet.title,o="http://www.youtube.com/embed/"+t.snippet.resourceId.videoId+"?wmode=opaque&autoplay=1";e<n&&d.push('<div class="item"><div class="item-inner"><a rel="video-gallery" class="video-link fancybox.iframe" href="'+o+'"><img alt="'+a+'" src="'+i+'"></a></div></div>')}}),e(o).append(d.join("")),"slider"==t&&e(o).owlCarousel({singleItem:!0,autoPlay:!1,stopOnHover:!1,navigation:!1,pagination:!0,paginationNumbers:!1,autoHeight:!0,lazyLoad:!0}),e(o).find(".video-link").fancybox({margin:100,openEffect:"none",closeEffect:"none",cyclic:!0,helpers:{media:{}},youtube:{autoplay:1,hd:1,wmode:"opaque",vq:"hd720"}})}})})})}(jQuery);