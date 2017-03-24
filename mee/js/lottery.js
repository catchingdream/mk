
var getup = {
	init: function() {
		var than = this;
		var clientwidth =document.body.clientWidth;
		var clientheight = document.body.clientHeight;
		than.flag=true;
		$('.swiper-container').css({'width': clientwidth, 'height': clientheight});
		than.slide();
		than.onfocus();
		than.submit();
		than.close();
		than.lottery();
		than.token=$('body').attr('data-token');
		than.awardsinfo();
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
		$('.wen-one').on('click', '.hide', function(e) {
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
		$('.submit').on('click', function() {
			var lei = $('.selected').val();
			var qus = $('.qustion').val();
			var ans = $('.ans').val();
			//提交内容
			if(!(qus=='')){
				$.ajax({
					url: '/xiaomi/question/submit.json',
					type: 'post',
					data: {
						_tb_token_:than.token,
						questionType: lei,
						questionDescription: qus,
						questionAnswer:ans
					},
					success: function(res){
						if(res.success){
							//提交成功查询提交次数
							$.ajax({
								url:'/xiaomi/question/count.json',
								type:'post',
								data:{},
								success:function(res){
									//console.log(res.content);
									if(res.content==1){
										//提交为1 进入抽奖
										$('.pop-once').show(0.5);
										$('.meng').show(0.5);
										than.close();
									}else{
										//提交不为1 不进入抽奖
										$('.pop-again').show(0.5);
										$('.meng').show(0.5);
										than.close();
									}
								},
								error:function(){

								}
							});

						}
					},
					error: function(err){
						//console.log(err)
					}
				});
			}

		});
	},
	// 关闭pop 进入抽奖页
	close: function() {
		$('.bl-wrap').on('click', '.close', function(e) {
			$(e.target).parent('.pop').hide(0.5);
			$('.meng').hide(0.5);
		});
		$('.bl-wrap').on('click', '.goback1', function(e) {
			$(e.target).parent('.pop').hide(0.5);
			$('.meng').hide(0.5);
		});
		if ($('.pop-once').css('display') == 'block') {
			setTimeout(function() {
				getlottery();
			}, 3000);
		}
		$('.lottery-enter').on('click', function() {
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
		$('.lottery-btn').on('click', function() {
			than.draw1('小内外');
			if (than.flag) {
				$.ajax({
					url: '/xiaomi/question/raffle.json',
					type: 'post',
					data: {
						_tb_token_:than.token
					},
					success: function(res){
						if (res.success) {
							var data = res.content;
							if (data.success) {
								var awardWords = '';
								if (data.content.goodLuck) {
									awardWords = data.content.awardWords;
									if (data.content.awardLevel == 4) {
										$('.pop-onefont h2').html('兑换码：' + data.content.awardCode);
									} else if (data.content.awardLevel == 1) {
										awardWords = '内外小蜜';
									}
								} else {
									awardWords = '';
								}
								than.draw1(awardWords);
							} else {
								alert('您已经抽过奖了');
							}
						}
					},
					error: function(err){
					}
				});
				than.flag = false;
			}else{
				alert('您已经没有抽奖机会了！');
			}
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
		var range_xm1 = -((6*740) - 172)/100 + 'rem';
		var range_xm2 = -((6*740) - 172)/100 + 'rem';
		var range_xm3 = -((4*740) - 172)/100 + 'rem';
		if (string == '内') {
			than.anim(range_1, range_xm1, range_xm2, range_xm3, string, 0);
			$('.bl-lottery').attr('data-info','1');
		} else if (string == '外') {
			than.anim(range_xm1, range_2, range_xm2, range_xm3, string, 0);
			$('.bl-lottery').attr('data-info','1');
		} else if (string == '小') {
			than.anim(range_xm1, range_xm2, range_3, range_xm3, string, 0);
			$('.bl-lottery').attr('data-info','1');
		} else if (string == '蜜') {
			than.anim(range_xm1, range_xm2, range_xm3, range_4, string, 0);
			$('.bl-lottery').attr('data-info','1');
		} else if (string == '内外' || string == '外内') {
			than.anim(range_1, range_2, range_xm2, range_xm3, '内外', 1);
			$('.bl-lottery').attr('data-info','2');
		} else if (string == '内小' || string == '小内') {
			than.anim(range_1, range_xm1, range_3, range_xm3, '内小', 1);
			$('.bl-lottery').attr('data-info','2');
		} else if (string == '内蜜' || string == '蜜内') {
			than.anim(range_1, range_xm1, range_xm2, range_4, '内蜜', 1);
			$('.bl-lottery').attr('data-info','2');
		} else if (string == '外小' || string == '小外') {
			than.anim(range_xm1, range_2, range_3, range_xm3, '外小', 1);
			$('.bl-lottery').attr('data-info','2');
		} else if (string == '外蜜' || string == '蜜外') {
			than.anim(range_xm1, range_2, range_xm3, range_4, '外蜜', 1);
			$('.bl-lottery').attr('data-info','2');
		} else if (string == '小蜜' || string == '蜜小') {
			than.anim(range_xm1, range_xm2, range_3, range_4, '小蜜', 1);
			$('.bl-lottery').attr('data-info','2');
		} else if (string == '内外小' || string == '内小外' || string == '外内小' || string == '外小内' || string == '小内外' || string == '小外内') {
			than.anim(range_1, range_2, range_3, range_xm1, '内外小', 2);
			$('.bl-lottery').attr('data-info','3');
		} else if (string == '内外蜜' || string == '内蜜外' || string == '外内蜜' || string == '外蜜内' || string == '蜜内外' || string == '蜜外内') {
			than.anim(range_1, range_2, range_xm1, range_4, '内外蜜', 2);
			$('.bl-lottery').attr('data-info','3');
		} else if (string == '外小蜜' || string == '外蜜小' || string == '蜜外小' || string == '蜜小外' || string == '小外蜜' || string == '小蜜外') {
			than.anim(range_xm1, range_2, range_3, range_4, '外小蜜', 2);
			$('.bl-lottery').attr('data-info','3');
		} else if (string == '内小蜜' || string == '内蜜小' || string == '蜜内小' || string == '蜜小内' || string == '小内蜜' || string == '小蜜内') {
			than.anim(range_1, range_xm1, range_3, range_4, '内小蜜', 2);
			$('.bl-lottery').attr('data-info','3');
		} else if (string == '内外小蜜') {
			than.anim(range_1, range_2, range_3, range_4, string, 3);
			$('.bl-lottery').attr('data-info','4');
		} else {
			than.anim(range_xm2, range_xm1, range_xm2, range_xm3,' ',4);
			$('.bl-lottery').attr('data-info','0');
		}
	},
	// 抽奖动画 中奖信息
	anim: function(x, y, z, t, string, num) {
		$(".scroll-1").animate({'transform': 'translateY(' + x + ')'}, 2700, 'swing');
		$(".scroll-2").animate({'transform': 'translateY(' + y + ')'}, 2900, 'swing');
		$(".scroll-3").animate({'transform': 'translateY(' + z + ')'}, 3000, 'swing');
		$(".scroll-4").animate({'transform': 'translateY(' + t + ')'}, 3000, 'swing');
		setTimeout(function(){
			$(".meng").show();
			$(".drawfont h1 em").eq(num).html('“' + string + '”');
			$(".drawfont").eq(num).show();
		},3000);
	},
	//查看中奖信息
	awardsinfo: function() {
		$.ajax({
			url: '/xiaomi/question/queryRaffle.json',
			type: 'post',
			data: {
			},
			success: function(res){
				$('.look-awardinfo').css({'display':'block !important'});
				$('.look-awardinfo').on('click', function() {
					var data = res.content;
					if (data.success) {
						if (data.content[0].content.goodLuck) {
							if (data.content[0].content.awardLevel == 4) {
								$('.look-awardinfo h2').html('兑换码：' + data.content[0].content.awardCode);
								showinfo(1);
							} else if (data.content[0].content.awardLevel == 3) {
								showinfo(2);
							} else if (data.content[0].content.awardLevel == 2) {
								showinfo(3);
							} else if (data.content[0].content.awardLevel == 1) {
								showinfo(4);
							}
						} else {
							showinfo(0);
						}
					}
				});
			},
			error: function(err){
			}
		});
		function showinfo(num){
			$(".meng").show();
			$(".pop-info").eq(num).show();
		}
	}

};
getup.init();