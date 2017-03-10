
var getup = {
	init: function() {
		var than = this;
		var clientwidth =document.body.clientWidth;
		var clientheight = document.body.clientHeight;
		$('.swiper-container').css({'width': clientwidth, 'height': clientheight});
		than.slide();
		than.onfocus();
		than.submit();
		than.close();
		than.lottery();
		than.share();
	},
	// 初始化slide
	slide: function() {
		var mySwiper = new Swiper ('.swiper-container', {
	        direction: 'vertical',
	        loop: false
	    });		
	},
	// 获取焦点
	onfocus: function() {
		$('.wen-one').on('tap click', '.hide', function(e) {
			var target = $(e.target);
			target.hide(0.5);
			target.siblings('textarea').focus();
		});
		$('.wen-one').on('blur', 'textarea', function(e) {
			var val = $(e.target).val();
			if (val == '' || val == null || val == undefined) {
				$(e.target).siblings('.hide').show(0.5);
			}
		});
	},
	// 提交问题
	submit: function() {
		var than = this;
		$('.submit').on('tap click', function() {
			var lei = $('.selected').val();
			var qus = $('.qustion').val();
			var ans = $('.ans').val();
			if (qus != '') {
				// 判断第几次提交问题
				console.log(lei,qus,ans);
				// 第一次
				$.ajax({
					url: './xiaomi/question/submit.json',
					data: {
						questionType: lei,
						questionDescription: qus,
						questionAnswer:ans
					},
					type: 'post',
					success: function(res){
						console.log(res);
					},
					error: function(err){
						console.log(err)
					}
				})
				$('.pop-once').show(0.5);
				$('.meng').show(0.5);
				than.close();



			}
		});
	},
	// 关闭pop 进入抽奖页
	close: function() {
		$('.bl-wrap').on('tap click', '.close', function(e) {
			$(e.target).parent('.pop').hide(0.5);
			$('.meng').hide(0.5);
		});
		if ($('.pop-once').css('display') == 'block') {
			setTimeout(function() {
				getlottery();
			}, 3000);
		}
		$('.lottery-enter').on('tap click', function() {
			getlottery();
		});
		function getlottery() {
			$('.pop-once').hide(0.5);
			$('.meng').hide(0.5);
			$('.bl-question').hide(0.5);
			$('.bl-lottery').show(0.5);
			$('.swiper-last').css('background-color', '#f85e0b!important');
		}
	},
	// 抽奖
	lottery: function() {
		var than = this;
		$('.lottery-btn').on('tap click', function() {
			than.draw1('');
			$('.hand').addClass('move');
		});
	},
	// 中奖
	draw1: function(string) {
		var than = this;
		// 内
		var range_1 = -((4*740) - 24)/100 + 'rem';
		// 外
		var range_2 = -((4*740) + 124)/100 + 'rem';
		// 小
		var range_3 = -((4*740) + 272)/100 + 'rem';
		// 蜜
		var range_4 = -((4*740) + 420)/100 + 'rem';
		// 小蜜LOGO
		var range_xm1 = ((5*740) + 172)/100 + 'rem';
		var range_xm2 = -((6*740) - 172)/100 + 'rem';
		var range_xm3 = -((4*740) - 172)/100 + 'rem';
		if (string == '内') {
			than.anim(range_1, range_xm1, range_xm2, range_xm3, string, 0);
		} else if (string == '外') {
			than.anim(range_xm1, range_2, range_xm2, range_xm3, string, 0);
		} else if (string == '小') {
			than.anim(range_xm1, range_xm2, range_3, range_xm3, string, 0);
		} else if (string == '蜜') {
			than.anim(range_xm1, range_xm2, range_xm3, range_4, string, 0);
		} else if (string == '内外') {
			than.anim(range_1, range_2, range_xm2, range_xm3, string, 1);
		} else if (string == '内小') {
			than.anim(range_1, range_xm1, range_3, range_xm3, string, 1);
		} else if (string == '内蜜') {
			than.anim(range_1, range_xm1, range_xm2, range_4, string, 1);
		} else if (string == '外小') {
			than.anim(range_xm1, range_2, range_3, range_xm3, string, 1);
		} else if (string == '外蜜') {
			than.anim(range_xm1, range_2, range_xm3, range_4, string, 1);
		} else if (string == '小蜜') {
			than.anim(range_xm1, range_xm2, range_3, range_4, string, 1);
		} else if (string == '内外小') {
			than.anim(range_1, range_2, range_3, range_xm1, string, 2);
		} else if (string == '内外蜜') {
			than.anim(range_1, range_2, range_xm1, range_4, string, 2);
		} else if (string == '外小蜜') {
			than.anim(range_xm1, range_2, range_3, range_4, string, 2);
		} else if (string == '内小蜜') {
			than.anim(range_1, range_xm1, range_3, range_4, string, 2);
		} else if (string == '内外小蜜') {
			than.anim(range_1, range_2, range_3, range_4, string, 3);
		} else {
			than.anim(range_xm2, range_xm1, range_xm2, range_xm3,' ',4);
		}
	},
	// 抽奖动画 中奖信息
	anim: function(x, y, z, t, string, num, one) {
		$(".scroll-1").animate({'background-position-y': x}, 2700, 'swing');
		$(".scroll-2").animate({'background-position-y': y}, 2900, 'swing');
		$(".scroll-3").animate({'background-position-y': z}, 3000, 'swing');
		$(".scroll-4").animate({'background-position-y': t}, 3000, 'swing');
		if(one != ''){
			$(".drawfont h2").html('兑换码：' + string);
		}
		setTimeout(function(){
			$(".meng").show();
			$(".drawfont h1 em").html('“' + string + '”');
			$(".drawfont").eq(num).show();
		},3000);
	},
	//分享
	share: function() {
		$('.share').on('tap click', function(){
			alert(JSON.stringify(dd.biz.util))
			dd.biz.util.share({
			    type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
			    url: 'http://h5.m.taobao.com/alicare/meebot.html?source=dingding:dingd8e1123006514592_inner&auth_vendor=dd&corpId=dingd8e1123006514592&type=dingding_inner',
			    title: '我正在体验内外小蜜，你也来试试吧！',
			    content: '我正在体验内外小蜜，你也来试试吧！',
			    image: 'https://gw.alicdn.com/tps/TB1IyAoPVXXXXavXFXXXXXXXXXX-300-300.jpg',
			    onSuccess: function() {
			        // alert(1);
			        $('.meng').show();
			        $('.pop-share').show();
			    },
			    onFail: function(err) {
					// alert('失败回调了：'+JSON.stringify(err))

			    }
			})
		});
	}

}
getup.init();