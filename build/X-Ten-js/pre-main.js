
jQuery(function () {
    var per = 1;
    var jobNum, isSub = false ;
    // 清空文本框的值，让placeholder出现
    jQuery('.wb-input').val('');
    jQuery('.close-btn').on('click',function () {
        jQuery('.pop1').hide();
        jQuery('.wb-comment-pop').hide();
        jQuery('.pop-mask').hide();
    });
    jQuery('.J_join').on('click',function () {
        jQuery('.wb-comment-pop').show();
    });
    jQuery('.wb-publish').on('click',function () {
        var comment = jQuery('.J_input').val();
        if( comment.length > 5 ) {
            postToMsgSquare(jobNum,comment);
            saveInstance(comment);
            jQuery('.wb-comment-detail-box').scrollTop(0);
            jQuery('.wb-input').val('');
            jQuery('.wb-comment-pop').hide();
        } else {
            jQuery('.pop2').show();
            jQuery('.pop-mask2').show();
            setTimeout(function () {
                jQuery('.pop2').hide();
                jQuery('.pop-mask2').hide();
                jQuery('.wb-input').val('');
            },3000);
        }
    });
    jQuery('.J_sub').on('click',function () {
        jQuery('.J_subBtn').text('已提醒');
        jQuery('.J_subBtn2').text('已订阅提醒');
        jQuery('.pop1').show();
        jQuery('.pop-mask').show();
        setTimeout(function () {
            jQuery('.pop1').hide();
            jQuery('.pop-mask').hide();
        },2000);
        if (isSub == false) {
            isSub = true;
            postSubcribe(jobNum);
        }
    });

    getNowTime(); //获取当前时间计算倒计时
    getUserInfo(); //获取用户信息且获取是否订阅
    getInstance(); //获取当前评论信息
    getPageNum();
    function getPageNum() {
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
                    var pageNum = parseInt((Len/40) + 1)
                }else {
                    var pageNum = parseInt((Len/40));
                }
                if ( pageNum == 1) {
                    jQuery('.J_more').hide();
                }
                jQuery('.J_more').on('click',function () {
                    if (per < pageNum) {
                        per++;
                        appendInstance(per);
                    } else {
                        jQuery('.J_more').html('没有更多了');
                    }
                });

            },
            error: function () {
            }
        })
    }
    function postToMsgSquare(num,txt) {
        jQuery.ajax({
            type: 'post',
            url: 'https://yida.alibaba-inc.com/_gw/XTEN/PublishFeed.json',
            data: {
                userId:num,
                content:txt,
                attachImgUrl:"https://img.alicdn.com/tfs/TB1T0wqb3mTBuNjy1XbXXaMrVXa-182-142.jpg",
                attachTitle:"X10，为了阿里人的无限可能！参与答题挑战赛赢天猫魔屏，天猫精灵！",
                attachSummary:"不用写周报，0代码搭应用，消灭“健忘症“，拥有每个阿里人的智慧，一天做50000000张海报，人人都能玩大数据，一分钟养成专属机器人...3月14日，见证奇迹！",
                attachUrl:"https://yida.alibaba-inc.com/s/x10/home"
            },
            success: function (data) {
            },
            error: function (error) {

            }
        })
    }
    function getNowTime(){
        jQuery.ajax({
            type: "get",
            url: "https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/expression/evaluate.json?expression=TODAY()",
            data: {},
            success: function (data) {

                var Time1 = Number(new  Date('2018/3/7 00:00:00'));
                var Time2 = Number(new  Date('2018/3/8 00:00:00'));
                var Time3 = Number(new  Date('2018/3/9 00:00:00'));
                var Time4 = Number(new  Date('2018/3/10 00:00:00'));
                var Time5 = Number(new  Date('2018/3/11 00:00:00'));
                var Time6 = Number(new  Date('2018/3/12 00:00:00'));
                var Time7 = Number(new  Date('2018/3/13 00:00:00'));
                var Time8 = Number(new  Date('2018/3/14 00:00:00'));
                if (data.content < Time1) {
                    jQuery('.J_date8').show();
                } else if (Time1 <= data.content &&data.content < Time2 ) {
                    jQuery('.J_date7').show();
                } else if (Time2 <= data.content && data.content < Time3) {
                    jQuery('.J_date6').show();
                } else if (Time3 <= data.content && data.content < Time4) {
                    jQuery('.J_date5').show();
                } else if (Time4 <= data.content && data.content < Time5) {
                    jQuery('.J_date4').show();
                } else if (Time5 <= data.content && data.content < Time6) {
                    jQuery('.J_date3').show();
                } else if (Time6 <= data.content && data.content < Time7) {
                    jQuery('.J_date2').show();
                } else if (Time7 <= data.content && data.content < Time8) {
                    jQuery('.J_date1').show();
                }
            },
            error: function () {
            }
        })
    }
    function getUserInfo() {
        jQuery.ajax({
            type: "get",
            url: "https://yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=LOGINUSERWORKNO()",
            data: {},
            success: function (data) {
                jobNum = data.content;
                subscribe(jobNum);
            },
            error: function () {
            }
        })
    }
    function subscribe(num) {
        jQuery.ajax({
            type: "get",
            url: "https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formProcInstData/getInstanceDatas.json?",
            data: {
                page:1,
                limit:1,
                originator: num,
                formUuid:'FORM-EF6YOZ1WO2VR1TE3ICVWU9H1NAEXFU21ONMQ6EJ0',
                manageUuid:'FORM-EF6YOZ1WO2N22TB5IJOGWTEKOC5LXU1F59AV7EJJ'
            },
            success: function (data) {
                if (data.content.totalCount > 0) {
                    isSub = true; //已订阅
                    jQuery('.J_subBtn').text('已提醒')
                    jQuery('.J_subBtn2').text('已订阅提醒')
                }
            }
        })
    }
    function postSubcribe(num) {
        jQuery.ajax({
            type: "post",
            url: "https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formdata/saveFormDataByDataMap.json",
            data: {
                formUuid:'FORM-EF6YOZ1WO2VR1TE3ICVWU9H1NAEXFU21ONMQ6EJ0',
                dataMap:'{"textField_je7utwru":"'+num+'"}'
            },
            success: function (data) {
                if (data.success == 'true') {
                    isSub = true; //已订阅
                } else if(data.success == 'false') {
                    isSub = true;
                }
            }
        })
    }
    function getInstance() {
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
                var Len = data.values.length;
                jQuery('.wb-comment-list').html("");
                for ( var i = 0 ;i < Len;i++ ) {
                    var Tpl = '' +
                        '<li class="clearfix">' +
                        '<div class="wb-headImg"><img src="//a-work.alibaba-inc.com/photo/'+ data.values[i].originatorId +'.64x64.jpg"></div>'+
                        '<div class="wb-txt-bx">'+
                        '<div class="wb-nick">'+data.values[i].originatorDisplayName+'</div>'+
                        '<p class="wb-comment">'+
                        '<span>'+ data.values[i].dataMap.textareaField_je7vp2g8 +'</span>'+
                        '</p>'+
                        '</div>'+
                        '</li>';

                    jQuery('.wb-comment-list').append(Tpl);
                }
            },
            error: function () {
            }
        })
    }
    function appendInstance(pageNum) {
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
                var Len = data.values.length;
                for ( var i = 0 ;i < Len;i++ ) {
                    var Tpl = '' +
                        '<li class="clearfix">' +
                        '<div class="wb-headImg"><img src="//a-work.alibaba-inc.com/photo/'+ data.values[i].originatorId +'.64x64.jpg"></div>'+
                        '<div class="wb-txt-bx">'+
                        '<div class="wb-nick">'+data.values[i].originatorDisplayName+'</div>'+
                        '<p class="wb-comment">'+
                        '<span>'+ data.values[i].dataMap.textareaField_je7vp2g8 +'</span>'+
                        '</p>'+
                        '</div>'+
                        '</li>';

                    jQuery('.wb-comment-list').append(Tpl);
                }
            },
            error: function () {
            }
        })
    }
    function saveInstance(txt) {
        jQuery.ajax({
            type: 'post',
            url: 'https://yida.alibaba-inc.com/alibaba/web/APP_N4BBV9W4VV0WYBE06T6Q/query/formdata/saveFormDataByDataMap.json',
            data: {
                formUuid:"FORM-EF6YOZ1WO2M22TQO1FOZCSLUJSBE3U1ZKYOV7EJO",
                dataMap:'{"textareaField_je7vp2g8":"'+txt+'"}'
            },
            success: function (data) {
                getInstance();
                per = 1;
                getPageNum();
                jQuery('.J_more').html('点击查看更多');
            },
            error: function () {
            }
        })
    }
});

