var RunGame=RunGame||{};RunGame.init=function(){this.WebGL=Laya.WebGL,this.Stage=Laya.Stage,this.Stat=Laya.Stat,this.Handler=Laya.Handler,this.Text=Laya.Text,this.Sprite=Laya.Sprite,this.Event=Laya.Event,Laya.init(1624,750,Laya.WebGL),Laya.stage.scaleMode="fixedheight",Laya.stage.screenMode=Laya.Stage.SCREEN_HORIZONTAL,Laya.stage.alignH="center",Laya.stage.alignV="middle",this.mapIndex=0,this.Mix=0,this.allStones=[],this.allCoins=[],this.lastStone=null,this.loadImages()},RunGame.loadImages=function(){this.loader=Laya.loader,this.stage=Laya.stage,this.width=this.stage.width,this.height=this.stage.height,this.timer=Laya.timer,this.Url=[];for(var t in this.manifest)this[t]=this.manifest[t],this.Url.push(this[t]);this.loader.load(this.Url,this.Handler.create(this,this.onAssetloaded),this.Handler.create(this,this.onLoading,null,!1))},RunGame.onLoading=function(t){console.log("加载进度: "+t)},RunGame.onAssetloaded=function(){this.bg=new this.Sprite,this.bg.loadImage(this.bgUrl),this.bg.x=0,this.bg.y=0,this.bg.size(this.width,this.height),this.stage.addChild(this.bg),this.initW=250,this.initH=400,this.man=createMan(this.initW,this.initH,this.manUrl),this.guide=new this.Sprite,this.manSize=this.man.size(),this.guide.graphics.drawRect(0,0,this.manSize.w,this.manSize.h,"#000"),this.stage.on(this.Event.CLICK,this,this.manJump),this.resizeType=!0,this.mapHandle(),window.addEventListener("resize",function(){var t=this.width,i=document.documentElement.clientWidth,A=document.documentElement.clientHeight;if(i<A?(this.width=Math.ceil(A/i*750),this.height=750):(this.width=Math.ceil(i/A*750),this.height=750),this.bg.size(this.width,this.height),this.resizeType){for(var h=0;h<Math.ceil((this.width-t)/162);h++)this.setStone();this.resizeType=!1}}.bind(this))},RunGame.resize=function(){var t=this.width;if(this.width=this.stage.width,this.height=this.stage.height,this.bg.size(this.width,this.height),console.log(Laya.stage),this.resizeType){for(var i=0;i<Math.ceil((this.width-t)/162);i++)this.setStone();this.resizeType=!1}},RunGame.mapHandle=function(){this.Mix=Math.floor(Math.random()*this.mapData.length),this.stoneImage={A:RunGame.groundUrl,B:RunGame.highUrl,C:null};for(var t=0;t<Math.ceil(this.width/162)+1;t++)this.setStone();this.timer.frameLoop(1,this,this.tick)},RunGame.manJump=function(){this.man.jumpNum<this.man.jumpMax&&this.man.jump()},RunGame.setStone=function(){var t=this.mapData[this.Mix].charAt(this.mapIndex),i=this.coinCode[this.Mix].charAt(this.mapIndex),A=null,h=Stone.create(this.width,t,this.stoneImage[t]);h.x=null==this.lastStone?0:this.lastStone.x+this.lastStone.width,this.allStones.push(h),"#"===i&&(A=Coin.create(),this.allCoins.push(A),A.x=h.x+h.width/2-A.width/2,A.y="C"==t?280:h.y-A.height/2-110),this.lastStone=h,this.mapIndex++,this.mapIndex>=this.mapData[this.Mix].length&&(this.Mix=Math.floor(Math.random()*this.mapData.length),this.mapIndex=0)},RunGame.tick=function(){this.man.update(),this.guide.x=this.man.Animal.x+(this.manSize.picw-this.manSize.w)/2,this.guide.y=this.man.Animal.y,this.man.ground.length=0;var t=this.stoneHandle();this.man.ground[0]&&!t&&(this.man.ground.sort(function(t,i){return i.height-t.height}),this.man.endy=this.man.ground[0].y-this.manSize.h);for(var i=0;i<this.allCoins.length;i++){var A=this.allCoins[i];A.update(),Math.abs(this.guide.x+this.manSize.w/2-(A.x+A.width/2))<=(this.manSize.w+A.width)/2&&Math.abs(this.guide.y+this.manSize.h/2-(A.y+A.height/2))<=(this.manSize.h+A.height)/2&&(Coin.recover(A),this.allCoins.splice(i,1),i--),A.x+A.width<=0&&(Coin.recover(A),this.allCoins.splice(i,1),i--)}},RunGame.stoneHandle=function(){var t=!1,i=null,A=this;return this.allStones.forEach(function(h){h.update(),h.x<=-h.width&&(i=h);Math.abs(h.x+h.width/2-(A.guide.x+A.manSize.w/2))<=(A.manSize.w+h.width)/2&&-1==A.man.ground.indexOf(h)&&(A.man.ground.push(h),h.y<A.guide.y+A.manSize.h-10&&(A.man.Animal.x=h.x-(A.manSize.picw+A.manSize.w)/2,t=!0))}),i&&(Stone.recover(i),this.allStones.splice(0,1),this.setStone()),t},RunGame.Reopen=function(){this.man.Reopen(),this.allStones.forEach(function(t){Stone.recover(t)}),this.allCoins.forEach(function(t){Coin.recover(t)}),this.mapIndex=0,this.Mix=0,this.allStones=[],this.allCoins=[],this.lastStone=null,this.mapHandle()},RunGame.manifest={manUrl:"images/man.atlas",bgUrl:"images/bg.jpg",coinsUrl:"images/coins.png",groundUrl:"images/ground.jpg",highUrl:"images/high.jpg"},RunGame.mapData=["AAAACBBAAACABBAAACAABBBAAAABAAAAAACABCABCABCAAAABBBBBBAAAAACAAAAAAAAAAAABBBBBBAAAAAACACACACACAAAABBBBAAAAACAAAAAAAAAAAABBBBBBAAAAAACACACACACAABBAAAAAAABBA","AAAAAAAACAABAAAAAAAAAAAAAAABBBBBBCBBBBBBBBAAAAAAAAAAAAAAAAAAAAAAAAACACACACACACACACACACBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBCBCBCBCAAAAAAAAAAAAAAAAAA","AAAAAAAACAABAAAAAAAAAAAACACACACACACACACABAABABABABABABABACBCBCBCBCBCBCBCBCBCBCBCBCBCBCBCABABACBCBCACACACACACACACACACACACACACACACACACACACACACAAAAAAAAAAAAAAAA"],RunGame.coinCode=["--------##########----------------############-#--#---##############-----------------##########-#-#-#-#-#-#-#-##-------################-------------###","--#--#-------####----------##----###-----####-#--#---####-#-#-#-######------####------#####-#-#-#-#-#-#-#-##-------################---############--###","-------#--#-------####----------##----##--##############---------######------####------#####-#-#-#-#-#-#-#-##----------################-------------###"],RunGame.init();