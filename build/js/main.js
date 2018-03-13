$(document).ready(function(){   
        var xten={
            init: function() {
                var self = this;
                var a=navigator.userAgent.toLowerCase();
                // alert(a);
                //如果是PC打开显示引导页
                if(a.indexOf("iphone")===-1&&a.indexOf("ipad")===-1&&a.indexOf("ipod")===-1&&a.indexOf("android")===-1){
                    console.log('pc');
                    $('.page-wrap').html('<div class="pc-wrap"><div class="img-wrap"><img src="https://img.alicdn.com/tfs/TB1mx0wdXGWBuNjy0FbXXb4sXXa-990-674.jpg" width="990" height="674" alt=""><div id="qrcode" style="width:170px;height:170px;"></div></div></div>')
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        width : 170,
                        height : 170
                    });
                    qrcode.makeCode(window.location.href);
                }else{           
                    //移动端打开 如果是非钉钉APP 则跳转钉钉打开
                    if(a.indexOf('dingtalk')===-1){
                        window.location.href = "dingtalk://dingtalkclient/page/link?url="+encodeURIComponent(window.location.href);
                    }else{
                        //答题逻辑开始           
                        self.count = 1;
                        self.score = 0;
                        self.selectClickSwitch = true;
                        self.timeZoneOffset = self._getTimeZone();
                        self.bindEvent();
                        self.getServerTime(function(time){
                            self.getUserId(function(userId){
                                // time = '2018-03-21'
                                self.getHouerTime( function(hour){
                                    // hour=20;
                                    // time = '2018-03-20';
                                    if (time === '2018-03-20' && hour >= '18'){      
                                        $('.startGame').html('<img src="https://gw.alicdn.com/tfs/TB17st3df9TBuNjy1zbXXXpepXa-442-143.png" width="100%">');
                                        $('.startGame').addClass('endGame').removeClass('startGame');
                                        $('.goHome').remove();
                                        self.pageShow('.xten-index');
                                    }
                                    else if(time === '2018-03-21'){
                                        $('.score-con').html('<div class="this-score-wrap2">'+
                                            '<p class="totalScoreNum"></p>'+
                                            '</div>'+
                                            '<div class="rankWrap2">'+
                                            '<p class="totalRank">全员排名第<span class="totalRankNum"></span>名</p>'+
                                            '<span class="rankBtn"></span>'+
                                            '</div>'+
                                            '<div class="rewardWrap lastDay">'+
                                            '<img src="https://gw.alicdn.com/tfs/TB1oGUQc3mTBuNjy1XbXXaMrVXa-676-456.png" width="100%">'+
                                            '</div>'+
                                            '<a href="https://www.aliway.com/read.php?fid=38&tid=399167" target="_blank" class="rewardDetBtn"><img src="https://gw.alicdn.com/tfs/TB1NAJdbwmTBuNjy1XbXXaMrVXa-402-129.png" width="100%"></a>'+                
                                            '</div>'
                                        )
                                        self.renderMyScore();
                                        dd.ready(function(){
                                            dd.biz.navigation.setRight({
                                                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                                                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                                                text: '分享',//控制显示文本，空字符串表示显示默认文本
                                                onSuccess : function(result) {
                                                    $.ajax({
                                                        type:'get',
                                                        url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formProcInstData/getInstanceDatas.json',
                                                        data:{  
                                                            limit:1,
                                                            page:1,
                                                            originator:self.userId,
                                                            formUuid:'FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91',
                                                            _locale_time_zone_offset:self.timeZoneOffset
                                                        },
                                                        success:function(res){
                                                            var data = res.content.values[0].dataMap;
                                                            var _totalScore = data.numberField_jdicc6kx || '';
                                                            $.ajax({
                                                                type:'get',
                                                                url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=RANK("FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91","",QUERYEQ("textField_je3zchft",LOGINUSERWORKNO()),ORDERBYUNIT(ORDERBY("numberField_jdicc6kx","DESC"),ORDERBY("numberField_je3zchfu","ASC")))',
                                                                data:{
                                                                    _locale_time_zone_offset:self.timeZoneOffset
                                                                },
                                                                success:function(res){
                                                                    // console.log(res.content);
                                                                    var _totalRank = res.content || '';
                                                                    var _url = window.location.href;
                                                                    var _urlArr = _url.split('?');
                                                                    var _shareUrl ='';
                                                                    _urlArr.length === 1?_shareUrl = _url+'?inviterId='+userId:_shareUrl = _urlArr[0]+'?inviterId='+userId;
                                                                    dd.biz.util.share({
                                                                        type: 1,
                                                                        url: _shareUrl,
                                                                        title: '我在X10“效能达人”挑战赛的累计战绩'+_totalScore+'，全员排名第'+_totalRank+'，快来向我挑战！',
                                                                        content: '测试你的效能值有多高！参与答题赢天猫魔屏、天猫精灵、淘宝心选保温杯、U形枕......！',
                                                                        image:'https://gw.alicdn.com/tfs/TB11TCYbAyWBuNjy0FpXXassXXa-300-300.jpg',
                                                                        onSuccess: function(){
                                                                            setTimeout(function(){
                                                                                window.location.href='https://yida.alibaba-inc.com/s/x10/home'
                                                                            },2000)
                                                                        },
                                                                        onFail: function(err) {
                                                                            alert('钉钉分享失败'+JSON.stringify(err));
                                                                        }
                                                                    });
                                                                    
                                                                }
                                                            });
                                                        }
                                                    });
                                                },
                                                onFail : function(err) {}
                                            });
                                            });
                                    }else{
                                        self.pageShow('.xten-index');            
                                    }  
                                });
                                             
                            })
                        });
                    }    
                }
            },
            bindEvent: function() {
                var self = this;
                $('.startGame').on('click',function(){
                    self.getItem(self.userId,self.time);       
                });
                $('.myScoreBtn').on('click',function(){
                    self.renderMyScore();
                    $('.xten-score').find('.ruleBtn').hide();
                    $('.xten-score').append('<span class="backIndex"></span>')
                });
                $('.xten-wrap').on('click','.backIndex',function(){
                    self.pageShow('.xten-index');
                    $('.xten-score').find('.ruleBtn').show();
                    $('.xten-score').find('.backIndex').remove();
                })
                $('.xten-wrap').on('click','.item-select',function(){
                    if(self.selectClickSwitch){
                        self.selectClickSwitch = false;
                        var thisBtn = $(this);
                        var thisType = thisBtn.attr('data-select');
                        self.getItemRightAns(self.itemIdArr[self.count-1],function(res){
                            var trueAns = res.selectField_jdi5lyko;
                            if(trueAns === thisType){
                                self.clickRight(thisBtn);
                                
                            }else{
                                self.clickWrong(thisBtn,trueAns);
                            }
                            self.saveEndItem(self.userId,self.time,self.itemIdArr[self.count-1],thisType,trueAns)
        
                        })
                        // console.log(thisType);
                    }
                    
                });
                $('.ruleClose').on('click',function(){
                    $('.rulePop').hide();
                });
                $('.ruleBtn').on('click',function(){
                    $('.rulePop').show();
                });
                $('.xten-wrap').on('click','.rankBtn',function(){
                    $('.rankPop').show();
                    self.getAllRank();
                });
                $('.rankClose').on('click',function(){
                    $('.rankPop').hide();
                }); 
                $('.shareBtn').on('click', function(){
                    if($('.shareBtnWrap').hasClass('animshow')){
                        $('.shareBtnWrap').removeClass('animshow');
                    }else{
                        var url = window.location.href;
                        var urlArr = url.split('?');
                        var shareUrl ='';
                        var shareTitle = '';
                        var shareContent = '测试你的效能值有多高！参与答题赢天猫魔屏、天猫精灵、淘宝心选保温杯、U形枕......！';
                        urlArr.length === 1?shareUrl = url+'?inviterId='+self.userId:shareUrl = urlArr[0]+'?inviterId='+self.userId;
                        if(self.totalRank && self.totalScore){
                            shareTitle = '我在“X10效能达人”挑战赛的累计战绩'+self.totalScore+'，全员排名第'+self.totalRank+'，快来向我挑战！';
                        }else{
                            shareTitle = '我正在参与“X10效能达人”答题挑战赛，快来跟我PK！';   
                        }
                        $('.shareBtnWrap').addClass('animshow');  
                        var shareNwUrl = 'aliwork://linking/compose?shareLink='+encodeURIComponent(shareUrl)+'&context='+encodeURIComponent(shareContent)+'&content='+encodeURIComponent(shareTitle);
                        console.log(shareNwUrl,shareTitle);
                        $('.shareToNeiwaiBtn').attr('href',shareNwUrl);
                        $('.shareToNeiwaiBtn').on('click',function(){
                            $('.shareBtnWrap').removeClass('animshow');
                            setTimeout(function(){
                                window.location.href='https://yida.alibaba-inc.com/s/x10/home'
                            },2000)
                        });             
                        $('.shareToDingBtn').on('click', function(){
                            dd.ready(function(){
                                $.ajax({
                                    type:'get',
                                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formProcInstData/getInstanceDatas.json',
                                    data:{  
                                        limit:1,
                                        page:1,
                                        originator:self.userId,
                                        formUuid:'FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91',
                                        _locale_time_zone_offset:self.timeZoneOffset
                                    },
                                    success:function(res){
                                        var data = res.content.values;              
                                        if(data === null){
                                            var _totalScore = undefined;
                                        }else{
                                            var _totalScore = data[0].dataMap.numberField_jdicc6kx || '';
                                        }
                                        $.ajax({
                                            type:'get',
                                            url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=RANK("FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91","",QUERYEQ("textField_je3zchft",LOGINUSERWORKNO()),ORDERBYUNIT(ORDERBY("numberField_jdicc6kx","DESC"),ORDERBY("numberField_je3zchfu","ASC")))',
                                            data:{
                                                _locale_time_zone_offset:self.timeZoneOffset
                                            },
                                            success:function(res){
                                                // console.log(res.content);
                                                if(res.content === 0 || res.content === '0'){
                                                    var _totalRank = undefined;
                                                }else{
                                                    var _totalRank = res.content || '';
                                                }
                                                if( _totalRank && _totalScore){
                                                    var _shareTitle = '我在X10“效能达人”挑战赛的累计战绩'+_totalScore+'，全员排名第'+_totalRank+'，快来向我挑战！';
                                                }else{
                                                    var _shareTitle = '我正在参与“X10效能达人”答题挑战赛，快来跟我PK！';
                                                }
                                                dd.biz.util.share({
                                                    type: 1,
                                                    url: shareUrl,
                                                    title: _shareTitle,
                                                    content: '测试你的效能值有多高！参与答题赢天猫魔屏、天猫精灵、淘宝心选保温杯、U形枕......！',
                                                    image:'https://gw.alicdn.com/tfs/TB11TCYbAyWBuNjy0FpXXassXXa-300-300.jpg',
                                                    onSuccess: function() {
                                                        $('.shareBtnWrap').removeClass('animshow');
                                                        setTimeout(function(){
                                                            window.location.href='https://yida.alibaba-inc.com/s/x10/home'
                                                        },2000)
                                                    },
                                                    onFail: function(err) {
                                                        alert('钉钉分享失败'+JSON.stringify(err));
                                                    }
                                                });
                                                
                                            }
                                        });
                                    }
                                });
                            });   
                        });       
                    }  
                });
            },
            getHouerTime:function(fn){
                $.ajax({
                    tyep:'get',
                    url:'https://yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=TODAY()',
                    data:{},
                    success:function(res){
                        var date = new Date(res.content);
                        var h = date.getHours();
                        fn && fn(h)
                    }
                })
            },
            clickRight:function(thisBtn){
                var self = this;
                var thisItemScore = parseInt($('.subject-con').attr('data-fs'));
                self.score = self.score + thisItemScore;
                thisBtn.addClass('right');
                clearTimeout(self.timeId);
                $('.addscore').addClass('anim');
        
                setTimeout(function(){
                    if(self.count <10 ){
                        self.count = self.count +1;
                        self.getItemDet(self.itemIdArr[self.count-1]);
                        self.countDown(20);
                        $('.addscore').removeClass('anim');
                    }else{
                        self.renderMyScore();
                    }
                   
                },800);
            },
            clickWrong:function(thisBtn,type){
                var self = this;
                thisBtn.addClass('wrong');
                $('.select_'+type).addClass('right');
                clearTimeout(self.timeId);
                setTimeout(function(){
                    if(self.count <10 ){
                        self.count = self.count +1;
                        self.getItemDet(self.itemIdArr[self.count-1]);
                        self.countDown(20);
                    }else{
                        self.renderMyScore();
                    }         
                },1200)
            },
            getUserId: function(fn) {
                var self = this;
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=LOGINUSERWORKNO()',
                    data:{
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        self.userId = res.content
                        fn && fn(res.content)
                    }
                })
            },
            getServerTime: function(fn){
                var self = this;
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=TEXT(TODAY(),%22yyyy-MM-dd%22)',
                    data:{
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        self.time = res.content
                        // self.time = '2018-03-20'
                        fn && fn(res.content)
                    }
                })
            },
            getItem: function(userId,time) {
                var self = this;
                console.log(userId,time)
                $.ajax({
                    type:'post',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formdata/saveFormDataByDataMap.json',
                    data:{
                        formUuid:'FORM-EF6Y83URN24KISIGMJQ7FYU2X74RS42TBHX5IDJO',
                        dataMap:'{"textField_je3thh1a":"'+userId+'","textField_je3thh1b":"'+time+'"}',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log(res);
                        // fn && fn(res.content)
                        if(res.errorCode === "500" || res.errorCode === 500){
                            if(self.time === '2018-03-20'){
                                self.megBoxShow('亲，你的今日答题次数已用完！记得明天前来查看有否中奖哦！');
                            }else{
                                self.megBoxShow('亲，你的今日答题次数已用完，请明天再来！');
                            }
                        }else{
                            if(res.success === true || res.success === 'true' ){
                                self.answer = res.content;
                                self.getItemList(res.content);
                                var inviterId = self.getQuery().inviterId
                                if(inviterId && inviterId !== self.userId){
                                    self.saveInviter(self.userId,inviterId)
                                }
                            }      
                        }
                    }
                })
            },
            getItemList: function(itemId) {
                var self = this;
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formdata/getJsonFormData.json',
                    data:{
                        formInstId:itemId,
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        self.itemIdArr = JSON.parse(res.content.textareaField_jdi7btl1);
                        $('.allItemNum').html(self.itemIdArr.length);
                        self.getItemDet(self.itemIdArr[self.count-1]);
                        self.pageShow('.xten-item');
                        self.countDown(20);
                    }
                })
            },
            megBoxShow: function(meg){
                var megDom = $('.meg-box');
                megDom.html(meg);
                megDom.show();
                megDom.css({opacity: 1});
                setTimeout(function() {
                    megDom.css({opacity: 0});
                    megDom.hide();
                }, 1500);
            },
            getItemDet: function(subjectId) {
                var self = this;
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formProcInstData/getInstanceDatas.json',
                    data:{
                        formUuid:'FORM-EF6Y93URN29JIS399FTZ1AV3FLKA0B2PEXL5IDJO',
                        limit:10,
                        page:1,
                        manageUuid:'FORM-EF6YPZ1WO22JIS6N7OQ8ZLR3KJA8943GQ9J8IDJ31',
                        searchField:'[{"key":"textField_jdi8fiwk","value":"'+subjectId+'","type":"TEXT","componentName":"TextField"}]',
                        targetFields:'["textareaField_jdi5lykh","textField_jdi5lykj","textField_jdi5lykk","textField_jdi5lykl","textField_jdi5lykm","numberField_jdi5lyki"]',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log(res.content.values[0].dataMap);
                        self.renderItem(res.content.values[0].dataMap);
                    }
                })
            },
            getItemRightAns:function(subjectId,fn){
                var self = this;
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formProcInstData/getInstanceDatas.json',
                    data:{
                        formUuid:'FORM-EF6Y93URN29JIS399FTZ1AV3FLKA0B2PEXL5IDJO',
                        limit:1,
                        page:1,
                        manageUuid:'FORM-EF6YPZ1WO22JIS6N7OQ8ZLR3KJA8943GQ9J8IDJ31',
                        searchField:'[{"key":"textField_jdi8fiwk","value":"'+subjectId+'","type":"TEXT","componentName":"TextField"}]',
                        targetFields:'["selectField_jdi5lyko"]',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log(res.content.values[0].dataMap);
                        fn && fn(res.content.values[0].dataMap)        
                    }
                })
            },
            renderItem:function(itemObj){
                var self = this;
                self.selectClickSwitch = true;
                var item_score = itemObj.numberField_jdi5lyki;
                var item_text = itemObj.textareaField_jdi5lykh;
                var item_A = itemObj.textField_jdi5lykj;
                var item_B = itemObj.textField_jdi5lykk;
                var item_C = itemObj.textField_jdi5lykl;
                var item_D = itemObj.textField_jdi5lykm;
                $('.currentItemNum').html(self.count);
                $('.addscore').html('+'+item_score);
                var str = '<div class="subject-con" data-fs="'+item_score+'">'+
                        '<p class="item-text">'+item_text+'</p>'+
                        '<div class="item-select select_A" data-select="A">'+
                        '<p class="select-text"><span>A.</span>'+item_A+'</p>'+
                        '</div>'+
                        '<div class="item-select select_B" data-select="B">'+
                        '<p class="select-text"> <span>B.</span>'+item_B+'</p>'+
                        '</div>'+
                        '<div class="item-select select_C" data-select="C">'+
                        '<p class="select-text"><span>C.</span>'+item_C+'</p>'+
                        '</div>'+
                        '<div class="item-select select_D" data-select="D">'+
                        '<p class="select-text"><span>D.</span>'+item_D+'</p>'+
                        '</div>'+
                        '</div>';
                $('.item-con').html(str);
                self.saveStartItem(self.userId,self.time,self.itemIdArr[self.count-1]);
            },
            getQuery: function() {
                var url = window.location.href;
                var obj = {};
                var a = url.split('?');
                if (a.length === 1) return obj;
                var b = a[1].split('&');
                for ( var i = 0, length = b.length; i < length; i++) {
                    var c = b[i].split('=');
                    obj[c[0]] = c[1];
                }
                return obj;
            },
            saveInviter:function(userId,inviterId){
                var self = this;
                console.log(userId,inviterId);
                $.ajax({
                    type:'post',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formdata/saveFormDataByDataMap.json',
                    data:{
                        formUuid:'FORM-EF6YPZ1WO22JIS2HJBUN3YV1SINX3524DL68IDJW',
                        dataMap:'{"textField_je3za032":"'+inviterId+'","textField_je3za033":"'+userId+'"}',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log('保存邀请记录'+JSON.stringify(res));
                    }
                })
            },
            saveStartItem:function(userId,time,subjectId){
                var self = this;
                // console.log(userId,inviterId);
                $.ajax({
                    type:'post',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formdata/saveFormDataByDataMap.json',
                    data:{
                        formUuid:'FORM-EF6Y83URN23JISPVJ8OQ4OWY2BMNJS1FIY3CIDJ31',
                        dataMap:'{"textField_je43ehm4":"'+userId+'","textField_je43ehm5":"'+subjectId+'","textField_je43ehm6":"'+time+'"}',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        console.log('保存开始答题记录'+JSON.stringify(res));
                    }
                })
            },
            saveEndItem:function(userId,time,subjectId,userAns,trueAns){
                var self = this;
                // console.log(userId,inviterId);
                $.ajax({
                    type:'post',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formdata/saveFormDataByDataMap.json',
                    data:{
                        formUuid:'FORM-EF6Y83URN24KISIGMJQ7FYU2X74RS42ZPP8CIDJZ',
                        dataMap:'{"textField_je46piiy":"'+userId+'","textField_je46piiz":"'+time+'","textField_jdic8qzn":"'+subjectId+'","textField_jdicfi4y":"'+trueAns+'","textField_jdicfi4z":"'+userAns+'"}',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log(res);
                    }
                })
            },
            pageShow:function(className){
                var self = this;
                $('.xten-page').removeClass('show');
                $(className).addClass('show');
            },
            countDown:function (seconds){
                var self = this;
                if(seconds <0){
                    clearTimeout(self.timeId);
                    if(self.count < 10){
                        self.getItemRightAns(self.itemIdArr[self.count-1],function(res){
                            var trueAns = res.selectField_jdi5lyko;  
                            $('.select_'+trueAns).addClass('right');
                            self.saveEndItem(self.userId,self.time,self.itemIdArr[self.count-1],'',trueAns);
                            setTimeout(function(){
                                self.count = self.count +1;
                                self.getItemDet(self.itemIdArr[self.count-1]);
                                self.countDown(20);
                            },500)
                        })
                    }else{
                        self.renderMyScore();
                    }
                }else{
                    $('.countDown').html(seconds);
                    self.timeId = setTimeout(function(){
                        seconds--;
                        self.countDown(seconds);
                    },1000);
                }
            },
            renderMyScore:function(){
                var self = this;
                $('.this-score').html(self.score);
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/formProcInstData/getInstanceDatas.json',
                    data:{  
                        limit:1,
                        page:1,
                        originator:self.userId,
                        formUuid:'FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91',
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        var data = res.content.values
                        // console.log(data);
                        if(data === null){
                            $('.totalScore').html('暂无成绩');
                        }else{
                            self.totalScore = data[0].dataMap.numberField_jdicc6kx;
                            $('.totalScoreNum').html(self.totalScore);
                        }
                        
                       
                    }
                });
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=RANK("FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91","",QUERYEQ("textField_je3zchft",LOGINUSERWORKNO()),ORDERBYUNIT(ORDERBY("numberField_jdicc6kx","DESC"),ORDERBY("numberField_je3zchfu","ASC")))',
                    data:{
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log(res.content);
                        if(res.content === 0 || res.content === '0'){
                            $('.totalRank').html('暂无排名');
                        }else{
                            self.totalRank=res.content;
                            $('.totalRankNum').html(self.totalRank);
                        }
                    }  
                });       
                self.pageShow('.xten-score');        
            },
            getAllRank:function(){
                var self = this;
                $.ajax({
                    type:'get',
                    url:'//yida.alibaba-inc.com/alibaba/web/APP_EMUUIHXXZ83XE2LRBJCB/query/expression/evaluate.json?expression=RANKLIST("FORM-EF6Y83URN24JISLNNIMRKX72ZITIWK1T95CCIDJ91","",VARIABLES("textField_je3zchft","originator","numberField_jdicc6kx","numberField_je3zchfu"),ORDERBYUNIT(ORDERBY("numberField_jdicc6kx","DESC"),ORDERBY("numberField_je3zchfu","ASC")),PAGE(1,106))',
                    data:{
                        _locale_time_zone_offset:self.timeZoneOffset
                    },
                    success:function(res){
                        // console.log(res.content);
                        var rankList = res.content;
                        var len = rankList.length,htmStr='',i=0,name='',sec='',color='';
                        for(i=0;i<len;i++){
                            i%2===0?color='#00234e':color='#00295b';
                            rankList[i][3] === ''?sec='':sec = Math.round((parseInt(rankList[i][3]))/100)/10 +'秒';  
                            name = self.formtName(rankList[i][1])
                            htmStr+='<li class="rank-item" style="background:'+color+'">'+
                                        '<span class="rankNum">'+(i+1)+'</span>'+
                                        '<span class="userName">'+name+'</span>'+
                                        '<span class="userId">'+rankList[i][0]+'</span>'+
                                        '<span class="userScore">'+rankList[i][2]+'</span>'+
                                        '<span class="userAveTime">'+sec+'</span>'+
                                    '</li>';
                            $('.rank-list').html(htmStr);
                        }
                    }
                });
        
            },
            formtName:function(name){
                if(name.indexOf("(")>0){
                    strArr = name.split("(");
                    return strArr[0]
                }else {
                    return name;
                }
            },
            _getTimeZone:function(){
                var myDate = new Date();
                var timeZone = -myDate.getTimezoneOffset()*60* 1000;
                console.log(timeZone)
                return timeZone
            }
        }
        xten.init();
    
})
