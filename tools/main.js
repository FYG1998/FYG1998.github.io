$(function() {
	$.ajax({
		//请求方式    
		type: "GET",
		//文件位置    
		url: "https://naiop.github.io/tools/data.json",
		//返回数据格式为json,也可以是其他格式如    
		dataType: "json",
		//请求成功后要执行的函数，拼接html    
		success: function(data) {
			var str = "";
			console.log(str);
			$.each(data, function(i, n) {
				console.log(i);
				console.log(n);
				var sj = Math.ceil(Math.random() * 7) //随机产生数
				console.log(sj);
				str += "<div class='col-lg-4 tool-item'> <a href='" + n.url + "'><div class='maple-tool-item image-shadow'><span class='maple-tool-icon maple-tool-item-color" + sj + "'>" + n.ico + "</span><h3 class='maple-tool-name'>" + n.title + "</h3><span class='maple-tool-describe'>" + n.desc + "</span><div class='maple-tool-tags'><span class='maple-tool-tag' title='工具类型'>" + n.tag1 + "</span><span class='maple-tool-tag' title='工具说明'>" + n.tag2 + "</span></div><div style='overflow: hidden;'><span class='maple-tool-in' title='点击打开工具 '> Open</span></div></div></a></div>";
			});
			str += "";
			$("#test").append(str);
		}
	});
});
