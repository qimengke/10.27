var mySwiper;
$(function(){
	loadSwiper();
	getGoods(1)
})

function loadSwiper(){
	mySwiper = new Swiper("#banner",{
		autoplay:1000,
		pagination:".swiper-pagination"
	})
}

function getGoods(goodsID){
	$.ajax({
		type:"get",
		data:{goodsID:goodsID},
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		success:function(data){
			var imgs = data[0].goodsBenUrl;
	        var imgsArray = eval(imgs);
	        var $slides =$("#slides")
//			console.log(imgsArray.length);
			for(var i =0;i<imgsArray.length;i++){
//				<div class="swiper-slide"><img src="http://temp.im/640x800/aaffdd/fff" width="100%"/></div>
			var detailImg = $("<div class='swiper-slide'><img src='"+imgsArray[i]+"' width='100%'/></div>")
			$slides.append(detailImg);
			}
			$("#detail").text(data[0].detail);
			loadSwiper();
		}
	});
	
	
}
