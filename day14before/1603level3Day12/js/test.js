var myScroll;
var navScroll;
$(function(){
	load();
	getData(1);
	navScroll();
	getIconData();
//阻止它默认事件	
document.addEventListener("touchmove",function(e){
	e.preventDefault();
})
	
$("#wrapper").on("touchend",function(){
	//下拉刷新
	if(myScroll.y>0){
	  $("#scrollbar").html("");
	  getData(1);
	}
	//上拉刷新
	if(myScroll.y<myScroll.maxScrollY-50){		
		getData(2);
	}
})
})
 function load(){
 	myScroll = new IScroll("#wrapper",{
 		mouseWheel:true,
 		scrollbars:true,
 		//禁止滚动条来进行控制
// 		interactiveScrollbars:false
 	})
 	
 }

function navScroll(){
	navScroll = new IScroll("#nav",{
		scrollX:true,
		click:true
	})
}

function getData(id){
//	$("#loading").show();
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:" http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{classID:id},
		success:function(data){
			if(data.length){
				 var $scrollBox = $("#scrollbar");
				$.each(data,function(index){
			     //拼接字符串
			     var $prodbox = $("<div class='prodbox'>");
			     var imgBox = $("<div class='imgBox'>图片加载中....</div>");
			     var thisimg = $("<img src='"+data[index].goodsListImg+"' />");
			     var prodname = $("<div class='prodname'>"+data[index].goodsName+"</div>");
			     var pricebox =$("<div class='pricebox'>"+data[index].price+"</div>");
			     $prodbox.append(imgBox);
			     $prodbox.append(prodname);
			     $prodbox.append(pricebox);
			     thisimg.on("load",function(){
			     	myScroll.refresh();
			     	imgBox.empty();
			     	imgBox.append(thisimg);
			     });
			     $scrollBox.append($prodbox);
				});
				
			}
			
			
		}
		
	})
}

function getIconData(){
	var navWidth=0;
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
	    success:function(data){
	    	var thisdata = JSON.parse(data);
	    	var $group =$("#iconfontGroup");
	    	$.each(thisdata,function(index){
	    		navWidth+=50;
	    		var icons = $("<i class='iconfont iconbox'>"+thisdata[index].icon+"</i>")
	    		$group.append(icons);
	    		icons.on("click",function(){
	    		   $("#scrollbar").html("")
	    		   getData(thisdata[index].classID);
	    		})
	    	})
	    	$("#iconfontGroup").width(navWidth);
	    	navScroll.refresh();
	    }
		
		
	})
	
	
	
	
}