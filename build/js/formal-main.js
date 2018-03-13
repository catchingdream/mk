var fun = {
    init: function() {
        var self = this;
        self.per = 1;
        self.pageNum;
        self.name = ['阿里内外', '宜搭', 'AONE', '语雀', '鲁班', 'DEMO+', 'DataWorks', 'Data V', 'AliNLP', '机器人工厂'];
        self.vediorandom();
        self.initslide();
        // jQuery(window).resize(function(){
        //     self.initslide();
        // })
        self.video();
        self.getUserInfo();//获取当前工号
        self.getLikedNum();//获取点赞数
        self.getTopInfo();//获取铜牌排行
        // self.getPageNum();
        // self.appendInstance(1); //获取当前评论信息
        self.bindEvent();
        self.scrollEvent();
    },
    vediorandom: function() {
        var self = this;
        var arr = [
            '<img class="coverimg" src="https://img.alicdn.com/tfs/TB18.vtdDtYBeNjy1XdXXXXyVXa-896-505.jpg" /><video src="//cloud.video.taobao.com/play/u/2837399553/p/1/e/6/t/1/50085698499.mp4" webkit-playsinline="" playsinline="" x-webkit-airplay="" poster="https://img.alicdn.com/tfs/TB18.vtdDtYBeNjy1XdXXXXyVXa-896-505.jpg" preload="auto" loop="ture" class="wb_video" width="100%" height="100%"></video>',
            '<img class="coverimg" src="https://img.alicdn.com/tfs/TB18ZxBduuSBuNjy1XcXXcYjFXa-896-503.jpg" /><video src="//cloud.video.taobao.com/play/u/2837399553/p/1/e/6/t/1/50085738041.mp4" webkit-playsinline="" playsinline="" x-webkit-airplay="" poster="https://img.alicdn.com/tfs/TB18ZxBduuSBuNjy1XcXXcYjFXa-896-503.jpg" preload="auto" loop="ture" class="wb_video" width="100%" height="100%"></video>',
            '<img class="coverimg" src="https://img.alicdn.com/tfs/TB17IxBduuSBuNjy1XcXXcYjFXa-896-499.jpg" /><video src="//cloud.video.taobao.com/play/u/2837399553/p/1/e/6/t/1/50085696457.mp4" webkit-playsinline="" playsinline="" x-webkit-airplay="" poster="https://img.alicdn.com/tfs/TB17IxBduuSBuNjy1XcXXcYjFXa-896-499.jpg" preload="auto" loop="ture" class="wb_video" width="100%" height="100%"></video>',
            '<img class="coverimg" src="https://img.alicdn.com/tfs/TB16EvtdDtYBeNjy1XdXXXXyVXa-896-499.jpg" /><video src="//cloud.video.taobao.com/play/u/2837399553/p/1/e/6/t/1/50085682728.mp4" webkit-playsinline="" playsinline="" x-webkit-airplay="" poster="https://img.alicdn.com/tfs/TB16EvtdDtYBeNjy1XdXXXXyVXa-896-499.jpg" preload="auto" loop="ture" class="wb_video" width="100%" height="100%"></video>',
            '<img class="coverimg" src="https://img.alicdn.com/tfs/TB14ZxBduuSBuNjy1XcXXcYjFXa-896-504.jpg" /><video src="//cloud.video.taobao.com/play/u/2837399553/p/1/e/6/t/1/50085730736.mp4" webkit-playsinline="" playsinline="" x-webkit-airplay="" poster="https://img.alicdn.com/tfs/TB14ZxBduuSBuNjy1XcXXcYjFXa-896-504.jpg" preload="auto" loop="ture" class="wb_video" width="100%" height="100%"></video>'
            ];
        var res = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            var j = Math.floor(Math.random() * arr.length);
            res[i] = arr[j];
            arr.splice(j, 1);
        }
        jQuery('.vedio').each(function(i, e) {
            jQuery('.vedio').eq(i).html(res[i]);
        });
    },
    initslide: function() {
        var self = this;
        // 宽度小于1200
        var browser = navigator.appName;  
        var b_version = navigator.appVersion;  
        var version = b_version.split(";"); 
        var trim_Version = 10;
        if (version[1]) {
            trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, "")) || 10; 
        } 
        if (trim_Version <= 9) {  
            alert("您的IE浏览器版本太低，建议升级版本！或者使用Chrome浏览器观看");  
            jQuery('.swiper-wrapper').css({'margin': '0 auto', 'font-size': '0', 'width': '640px', 'overflow-y': 'hidden'});
            // jQuery('.swiper-container').css({'overflow-x': 'scroll'});
            jQuery('.swiper-slide').css({'display': 'inline-block'});
            jQuery('.swiper-pagination').css({'display': 'none'});
        } else if (document.body.clientWidth > 1200) {
            self.swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                initialSlide :2,
                shortSwipes : false,
                longSwipesRatio : 0.1,
                slidesPerView: 'auto',
                centeredSlides: true,
                loop : true,
                slideToClickedSlide: true,
                on:{
                    slideChange: function() {
                        jQuery('.wb_video').trigger('pause');
                        jQuery('.wb_video').attr('id', '');//移除id
                        jQuery('.j_play').removeClass('icon-pause').addClass('icon-play');
                        jQuery('.j_play').show();
                    },
                },
                coverflowEffect: {
                    rotate: 10,
                    stretch: 100,
                    depth: 200,
                    modifier: 2.5,
                    slideShadows : true
                },
                pagination: {
                    el: '.swiper-pagination',
                }
            });
        } else {
            jQuery('.vedio').addClass('J_video');
            self.swiper = new Swiper('.swiper-container', {
                direction : 'horizontal',
                initialSlide :2,
                slidesPerView: 'auto',
                loop : true,
                on:{
                    slideChange: function() {
                        jQuery('.wb_video').trigger('pause');
                        jQuery('.wb_video').attr('id', '');//移除id
                        jQuery('.j_play').removeClass('icon-pause').addClass('icon-play');
                        jQuery('.j_play').show();
                    },
                },
                pagination: {
                    el: '.swiper-pagination',
                }
            });
        }
    },
    getUserInfo: function() {
        var self = this;
        jQuery.ajax({
            type: 'get',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=LOGINUSERWORKNO()',
            data: {},
            success: function (data) {
                var jobNum = data.content;
                self.jobNum = jobNum;
                self.getUserLiked(jobNum);
                jQuery('.m-section').on('click', 'em', function(e) {
                    var n = jQuery('.m-section em').index(jQuery(e.currentTarget));
                    var proName = jQuery('.m-section li').eq(n).find('.get-pro').attr('data-proname');
                    self.saveUserLiked(jobNum + "", proName + "", n);
                    // console.log(jobNum, proName);
                });
                
            },
            error: function () {
            }
        })
    },
    // 获取是否点赞
    getUserLiked: function(uname) {
        var self = this;
        jQuery.ajax({
            type: 'get',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formProcInstData/getInstanceDatas.json',
            data: {
                page: 1,
                limit: 40,
                formUuid: 'FORM-EF6YOZ1WO2O22TKD1IPRR84W7RGP0L1PTYPW7EJU',
                originator: uname,
                manageUuid: 'FORM-EF6YOZ1WO2N22TUXHJOQHQINE6947V1JYQ9Y7EJR'
            },
            success: function (data) {
                var arr = data.content.values;
                if (arr != null) {
                    for (var i = 0, j = arr.length; i < j; i++) {
                        for (var s = 0, k = self.name.length; s < k; s++) {
                            if (arr[i].dataMap.textField_je7wpzzg == self.name[s]) {
                                jQuery('.m-section li').eq(s).find('em').css({'background-position': '0 bottom'});
                            }
                        }
                    }
                }
                // console.log('是否点赞:',arr);
                
            },
            error: function () {
            }
        })
    },
    // 保存点赞记录
    saveUserLiked: function(uname, proName, n) {
        var self = this;
        jQuery.ajax({
            type: 'post',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formdata/saveFormDataByDataMap.json',
            data: {
                formUuid:"FORM-EF6YOZ1WO2O22TKD1IPRR84W7RGP0L1PTYPW7EJU",
                dataMap:'{"textField_je7wpzzf":"'+uname+'","textField_je7wpzzg":"'+proName+'"}'
            },
            success: function (data) {
                var liked = data.success;
                if (liked == true || liked == 'true') {
                    jQuery('.m-section li').eq(n).find('em').css({'background-position': '0 bottom'});
                } else if (liked == false || liked == 'false') {
                    jQuery('.wb-error-tip-msg').html('您已经点过赞了！');
                    jQuery('.pop2').show();
                    jQuery('.pop-mask2').show();
                    setTimeout(function () {
                        jQuery('.pop2').hide();
                        jQuery('.pop-mask2').hide();
                    },3000);
                }
                self.getLikedNum(proName, 1, n);
                // console.log(data);
                
            },
            error: function () {
            }
        })
    },
    // 获取点赞数
    getLikedNum: function(proName, n, p) {
        var self = this;
        jQuery.ajax({
            type: 'get',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formProcInstData/getInstanceDatas.json',
            data: {
                page: 1,
                limit: 40,
                formUuid: 'FORM-EF6YOZ1WO2N22TUXHJOQHQINE6947V1WMTUW7EJO',
                manageUuid:'FORM-EF6YOZ1WO2M22TQO1FOZCSLUJSBE3U1ZOBGY7EJ01'
            },
            success: function (data) {
                var arr = data.content.values;
                if (arr != null) {
                    for (var i = 0, j = arr.length; i < j; i++) {
                        for (var s = 0, k = self.name.length; s < k; s++) {
                            if (arr[i].dataMap.textField_je7wuuk6 == self.name[s]) {
                                jQuery('.m-section li').eq(s).find('i').html(arr[i].dataMap.numberField_je7wuuk7);
                            }
                        }
                        if (n == 1 && arr[i].dataMap.numberField_je7wuuk7 == proName) {
                            jQuery('.m-section li').eq(p).find('i').html(arr[i].dataMap.numberField_je7wuuk7);
                        }
                    }
                }
                // console.log('点赞数:',arr);
            },
            error: function () {
            }
        })
    },
    // 答题排行榜
    getTopInfo: function(txt) {
        var self = this;
        var str = '';
        jQuery.ajax({
            type: 'post',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=RANKLIST("FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91","",VARIABLES("textField_je3zchft","originator","numberField_jdicc6kx","numberField_je3zchfu"),ORDERBYUNIT(ORDERBY("numberField_jdicc6kx","DESC"),ORDERBY("numberField_je3zchfu","ASC")),PAGE(1,100))',
            data: {},
            success: function (data) {
                var content = data.content;
                // console.log(content);
                if (content != null) {
                    if (content.length <= 7) {
                        jQuery('.m-box').css({'overflow-y': 'hidden'});
                    }
                    for (var i = 0, j = content.length; i < j; i++) {
                        var n = i + 1;
                        var time = (content[i][3]/1000).toFixed(1);
                        if (i % 2 == 0) {
                            str = str + '<li><span class="span1">'+n+'</span><span class="span2">'+content[i][1]+'</span><span class="span3">'+content[i][0]+'</span><span class="span4">'+content[i][2]+'</span><span class="span5">'+time+'秒</span></li>';
                        } else if (i % 2 == 1) {
                            str = str + '<li class="active"><span class="span1">'+n+'</span><span class="span2">'+content[i][1]+'</span><span class="span3">'+content[i][0]+'</span><span class="span4">'+content[i][2]+'</span><span class="span5">'+time+'秒</span></li>';
                        }
                    }
                }
                jQuery('.m-box ul').html(str);
                // console.log(str);
            },
            error: function () {
            }
        })
    },
    bindEvent: function() {
        var self = this;
        jQuery('.wb-input').val('');
        jQuery('.close-btn').on('click',function () {
            jQuery('.wb-comment-pop').hide();  
            jQuery('.pop-mask2').hide();
            jQuery('.pop-video').hide();    
            jQuery('.pop-video video').trigger('pause');
            jQuery('.pop-video video').attr('id', ''); //移除id
            // self.swiper.slideNext();
            jQuery('.swiper-wrapper').css({'WebkitTransform': 'translate3d('+self.translates+'px,0,0)','transform':'translate3d('+self.translates+'px,0,0)'});
        });
        jQuery('.J_join').on('click',function () {
            jQuery('.wb-comment-pop').show();
        });
        jQuery('.wb-publish').on('click',function () {
            var comment = jQuery('.J_input').val();
            if( comment.length > 5 ) {
                self.postToMsgSquare(self.jobNum,comment);
                self.saveInstance(comment);
                jQuery('.wb-comment-detail-box').scrollTop(0);
                jQuery('.wb-input').val('');
                jQuery('.wb-comment-pop').hide();
            } else {
                jQuery('.wb-error-tip-msg').html('请输入5个字以上的评论');
                jQuery('.pop2').show();
                jQuery('.pop-mask2').show();
                setTimeout(function () {
                    jQuery('.pop2').hide();
                    jQuery('.pop-mask2').hide();
                    jQuery('.wb-input').val('');
                },3000);
            }
        });
        jQuery('.J_more').on('click',function () {
            if (self.per < self.pageNum) {
                self.per++;
                self.appendInstance(self.per);
            } else {
                jQuery('.J_more').html('没有更多了');
            }
        });
        jQuery('.m-nav a').on('click',function(e) {
            jQuery('.m-nav a').css({'color': '#fff'});
            jQuery(this).css({'color': '#00fff6'});
        });
        jQuery('.prev-btn').click(function(){
            self.swiper.slidePrev();
        })
        jQuery('.next-btn').click(function(){
            self.swiper.slideNext();
        })
    },
    // 保存评论
    saveInstance: function(txt) {
        var self = this;
        jQuery.ajax({
            type: 'post',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formdata/saveFormDataByDataMap.json',
            data: {
                formUuid:"FORM-EF6YOZ1WO2M22TQO1FOZCSLUJSBE3U1ZKYOV7EJO",
                dataMap:'{"textareaField_je7vp2g8":"'+txt+'"}'
            },
            success: function (data) {
                self.appendInstance(1);
                self.per = 1;
                self.getPageNum();
                jQuery('.J_more').html('点击查看更多');
                jQuery('.wb-error-tip-msg').html('评论成功');
                jQuery('.pop2').show();
                jQuery('.pop-mask2').show();
                setTimeout(function () {
                    jQuery('.pop2').hide();
                    jQuery('.pop-mask2').hide();
                    jQuery('.wb-input').val('');
                },3000);
            },
            error: function () {
            }
        })
    },
    // 获取评论
    appendInstance: function(pageNum) {
        var self = this;
        jQuery.ajax({
            type: 'get',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formProcInstData/getInstanceDatas.json',
            data: {
                page: pageNum,
                limit: 40,
                manageUuid:'FORM-EF6YOZ1WO2EN3TT5PXU30UG3H3F1WS3MZLCJ9EJA',
                formUuid: 'FORM-EF6YOZ1WO2M22TQO1FOZCSLUJSBE3U1ZKYOV7EJO'
            },
            success: function (data) {
                data = data.content;
                if (data.values !== null){
                    var Len = data.values.length;
                    if (pageNum < 2) {
                        jQuery('.wb-comment-list').html("");
                    }
                    for ( var i = 0 ;i < Len;i++ ) {
                        var Tpl = '' +
                            '<li class="clearfix">' +
                            '<div class="wb-headImg"><img src="//work.alibaba-inc.com/photo/'+ data.values[i].originatorId +'.40x40.jpg"></div>'+
                            '<div class="wb-txt-bx">'+
                            '<div class="wb-nick">'+data.values[i].originatorDisplayName+'</div>'+
                            '<p class="wb-comment">'+
                            '<span>'+ data.values[i].dataMap.textareaField_je7vp2g8 +'</span>'+
                            '</p>'+
                            '</div>'+
                            '</li>';
    
                        jQuery('.wb-comment-list').append(Tpl);
                    }
                }
            },
            error: function () {
            }
        })
    },
    getPageNum: function() {
        var self = this;
        jQuery.ajax({
            type: 'get',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formProcInstData/getInstanceDatas.json',
            data: {
                page: 1,
                limit: 40,
                manageUuid:'FORM-EF6YOZ1WO2EN3TT5PXU30UG3H3F1WS3MZLCJ9EJA',
                formUuid: 'FORM-EF6YOZ1WO2M22TQO1FOZCSLUJSBE3U1ZKYOV7EJO'
            },
            success: function (data) {
                data = data.content;
                var Len = data.totalCount;
                if( Len % 40 !== 0 ){
                    self.pageNum = parseInt((Len/40) + 1)
                }else {
                    self.pageNum = parseInt((Len/40));
                }
                if ( self.pageNum < 2) {
                    jQuery('.J_more').hide();
                }

            },
            error: function () {
            }
        })
    },
    // 发布到消息广场
    postToMsgSquare: function(num,txt) {
        var self = this;
        num = num.replace(/\b(0+)/gi,"");
        jQuery.ajax({
            type: 'post',
            url: 'https://yida.alibaba-inc.com/_gw/XTEN/PublishFeed.json',
            data: {
                userId:num,
                content:txt,
                attachImgUrl:"https://img.alicdn.com/tfs/TB1T0wqb3mTBuNjy1XbXXaMrVXa-182-142.jpg",
                attachTitle:"X10创新产品发布会重磅来袭！参与答题挑战赛赢天猫魔屏、天猫精灵！",
                attachSummary:"谜底揭晓：0代码搭应用，一键以事找人，不用写周报，一分钟养成智能机器人...究竟是什么？立即参与火爆内网的答题挑战赛，丰厚奖品先到先得！",
                attachUrl:"https://yida.alibaba-inc.com/s/x10/home"
            },
            success: function (data) {
            },
            error: function (error) {

            }
        })
    },
    scrollEvent: function() {
        var self = this;
        var arr = [];
        arr.push(jQuery('#floor1').offset().top - 50);
        arr.push(jQuery('#floor2').offset().top - 160);
        arr.push(jQuery('#floor3').offset().top - 100);
        // arr.push(jQuery('#floor4').offset().top - 200);
        jQuery(window).on('scroll', function() {
            var top = jQuery(window).scrollTop();
            if (top <=arr[0]) {
                jQuery('.m-nav a').css({'color': '#fff'});
            } else if (top > arr[0] && top <= arr[1]) {
                jQuery('.m-nav a').css({'color': '#fff'});
                jQuery('.m-nav a').eq(0).css({'color': '#00fff6'});
            } else if (top > arr[1] && top <= arr[2]) {
                jQuery('.m-nav a').css({'color': '#fff'});
                jQuery('.m-nav a').eq(1).css({'color': '#00fff6'});
            } else if (top > arr[2]) {
                jQuery('.m-nav a').css({'color': '#fff'});
                jQuery('.m-nav a').eq(2).css({'color': '#00fff6'});
            } 
            // else if (top > arr[3]) {
            //     jQuery('.m-nav a').css({'color': '#fff'});
            //     jQuery('.m-nav a').eq(3).css({'color': '#00fff6'});
            // }
        });
    },
    video: function() {
        var self = this;
        var lastRunTime = Date.now();
        // 判断egde浏览器
        var userAgent = navigator.userAgent;
        var isEdge = userAgent.indexOf("Edge") > -1;
        if (isEdge) {
           jQuery('.vedio').addClass('J_video'); 
           jQuery('.vedio img').show();
           jQuery('.vedio video').hide();
        }

        jQuery('body').on('click', 'video', function(e) {
            var curPlayBtn = jQuery(e.currentTarget).parent().prev();
            var curVideo = curPlayBtn.next().find('.wb_video');  //当前video
            if (curPlayBtn.css('display') == 'none') {
                curPlayBtn.addClass('icon-play').removeClass('icon-pause');
                curVideo.trigger('pause');
                curVideo.removeClass('play').addClass('pause');
                curPlayBtn.show();
            }
        }).on('mouseenter', '.video-container', function(e) {
            var curPlayBtn = jQuery(e.currentTarget).find('.j_play'); //获取播放按钮
            curPlayBtn.show();
            // setTimeout(function() {
            //     curPlayBtn.fadeOut(); 
            // }, 2000);
        }).on('mouseleave', '.video-container', function(e) {
            var curPlayBtn = jQuery(e.currentTarget).find('.j_play'); //获取播放按钮
            if (curPlayBtn.hasClass('icon-play')) {
            } else {
                curPlayBtn.hide();
            }
        }).on('click', '.j_play', function(e) {//播放
            var curPlayBtn = jQuery(e.currentTarget);  //获取当前按钮
            var curVideo = curPlayBtn.next().find('.wb_video');  //当前video
            var curWarp = curPlayBtn.parent(); //视频外层容器
            var _html = curPlayBtn.next().html();
            var currentTime = Date.now();
            var protectTime = 100;//设置保护性延时 单位毫秒，不要小于50 建议100以上
            if ((currentTime - lastRunTime) < protectTime) {
                return;//两次执行太过频繁，直接退出
            }
            if (curPlayBtn.hasClass('icon-play')) { //播放
                jQuery('.wb_video').trigger('pause');
                jQuery('.wb_video').attr('id', '');//移除id
                jQuery('.j_play').removeClass('icon-pause').addClass('icon-play');
                jQuery('.j_play').show();
                var currentTime = Date.now();
                var protectTime = 100;//设置保护性延时 单位毫秒，不要小于50 建议100以上
                if ((currentTime - lastRunTime) < protectTime) {
                return;//两次执行太过频繁，直接退出
                }
                if (curPlayBtn.next().hasClass('J_video')) {
                    var str = curPlayBtn.next().html();
                    if (str.indexOf("div")!=-1) {
                        str = str.split('<div')[1];
                        str = '<div' + str;
                        if (document.body.clientWidth < 1200) {
                            jQuery('.pop-video').css({'height': '5.2rem'});
                        } else {
                            jQuery('.pop-video').css({'height': '610px'});
                        }
                    } else {
                        str = str.split('<video')[1];
                        str = '<video controls="controls"' + str;
                        if (document.body.clientWidth < 1200) {
                            jQuery('.pop-video').css({'height': '4.4rem'});
                        } else {
                            jQuery('.pop-video').css({'height': '524px'});
                        }
                    }
                    jQuery('.pop-video div').html(str);
                    jQuery('.pop-video').show();
                    jQuery('.pop-mask2').show();
                    jQuery('.pop-video video').trigger('play');
                    jQuery('.pop-video video').attr('id', 'video_id'); //添加id

                    jQuery('.swiper-wrapper').attr('id', 'slidebox');
                    self.translates = document.defaultView.getComputedStyle(document.getElementById('slidebox'),null).transform;
                    self.translates = parseFloat(self.translates.substring(7).split(',')[4]);
                } else {
                    curVideo.trigger('play');
                    curVideo.attr('id', 'video_id'); //添加id
                    var a=navigator.userAgent;
                    // pc
                    if(a.indexOf("iPhone")===-1&&a.indexOf("iPad")===-1&&a.indexOf("iPod")===-1&&a.indexOf("Android")===-1){
                        curPlayBtn.addClass('icon-pause').removeClass('icon-play');
                        curPlayBtn.hide();
                        curVideo.removeClass('pause').addClass('play');
                    } else {
                        var eleVideo = document.getElementById('video_id');
                        eleVideo.addEventListener("x5videoexitfullscreen", function(){
                            curPlayBtn.next().html(_html);
                        })
                        // eleVideo.controls = false;
                    }
                }
            } else {
                curPlayBtn.addClass('icon-play').removeClass('icon-pause');
                curVideo.trigger('pause');
                curVideo.removeClass('play').addClass('pause');
            }
        });
    }
}
fun.init();