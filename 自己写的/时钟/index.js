var WINDOW_width=1026;
var WINDOW_height=768;
var raduis=10;

// 时钟位置
var LEFT=0;
var TOP=0;


var shijian=new Date();
var shi=shijian.getHours();
var fen=shijian.getMinutes();
var miao=shijian.getSeconds();


// 彩球列
var caiqiulie=[];



const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]


window.onload=function(){
	
	WINDOW_width=document.documentElement.clientWidth;
	WINDOW_height=document.documentElement.clientHeight;
	
	LEFT=WINDOW_width/5;
	TOP=WINDOW_height/7;
	
	raduis=(WINDOW_width*3/5/(15*6+9*2))-1;
	
	 var canvas=document.getElementById('canvas');
	 canvas.width=WINDOW_width;
	 canvas.height=WINDOW_height;
	 
	 
	 var context=canvas.getContext('2d');
	 
	 setInterval(function(){
		 huatu(context);
		 update();
	 },50)
	 
	 
}
function huatu(ctx){
	ctx.clearRect(0,0,WINDOW_width, WINDOW_height);

	
	huashuzhi(LEFT,TOP,parseInt(shi/10),ctx);
	huashuzhi(LEFT+15*(raduis+1),TOP,parseInt(shi%10),ctx);
	
	huashuzhi(LEFT+(15*2)*(raduis+1),TOP,10,ctx);
	
	huashuzhi(LEFT+(15*2+9)*(raduis+1),TOP,parseInt(fen/10),ctx);
	huashuzhi(LEFT+(15*3+9)*(raduis+1),TOP,parseInt(fen%10),ctx);
	
	huashuzhi(LEFT+(15*4+9)*(raduis+1),TOP,10,ctx);
	
	huashuzhi(LEFT+(15*4+9*2)*(raduis+1),TOP,parseInt(miao/10),ctx);
	huashuzhi(LEFT+(15*5+9*2)*(raduis+1),TOP,parseInt(miao%10),ctx);
	
	for(i in caiqiulie){
		ctx.fillStyle =caiqiulie[i].color;
		ctx.beginPath();
		ctx.arc(caiqiulie[i].x,caiqiulie[i].y,raduis,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();	 
	}
	
	
}

function huashuzhi(left,top,zhi,ctx){
	// ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
	ctx.fillStyle ="#33B5E5";
	for(let y in shuzi[zhi]){
		for(let x in shuzi[zhi][y]){
			if(shuzi[zhi][y][x]==1){
				ctx.beginPath();
				ctx.arc(left+2*(raduis+1)*x+(raduis+1),top+2*(raduis+1)*y+(raduis+1),raduis,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();	
			}
		}
	}
}


function update(){
	
	let xinshijian=new Date();
	let xinshi=xinshijian.getHours();
	let xinfen=xinshijian.getMinutes();
	let xinmiao=xinshijian.getSeconds();
	
	
	if(xinshi!=shi){
		tianjiacaiqiu(LEFT,TOP,parseInt(shi/10));
		tianjiacaiqiu(LEFT+15*(raduis+1),TOP,parseInt(shi%10));
		shi=xinshi;
	}
	if(xinfen!=fen){
		tianjiacaiqiu(LEFT+(15*2+9)*(raduis+1),TOP,parseInt(fen/10));
		tianjiacaiqiu(LEFT+(15*3+9)*(raduis+1),TOP,parseInt(fen%10));
		fen=xinfen;

	}
	if(xinmiao!=miao){
		tianjiacaiqiu(LEFT+(15*4+9*2)*(raduis+1),TOP,parseInt(miao/10));
		tianjiacaiqiu(LEFT+(15*5+9*2)*(raduis+1),TOP,parseInt(miao%10));
		miao=xinmiao;
	}
	
	caiqiudonghua();
}




// 添加彩球
function tianjiacaiqiu(left,top,zhi){
	for(let y in shuzi[zhi]){
		for(let x in shuzi[zhi][y]){
			if(shuzi[zhi][y][x]==1){
				var caiqiu={
					x:left+2*(raduis+1)*x+(raduis+1),
					y:top+2*(raduis+1)*y+(raduis+1),
					color:colors[Math.floor(Math.random()*colors.length)],
					vx:Math.pow(-1,Math.ceil( Math.random()*1000 ) ) * 4,
					vy:-5,
					g:1.5+Math.random(),
				};
				caiqiulie.push(caiqiu);
			}
		}
	}
}


// 彩球动画
function caiqiudonghua(){
	
	for(let i in caiqiulie){
		
		caiqiulie[i].x+=caiqiulie[i].vx;
		caiqiulie[i].y+=caiqiulie[i].vy;
		
		
		
		
		// 根据高度改变加速度
		var c = 1.0;
		if( caiqiulie[i].y + raduis + caiqiulie[i].vy >= WINDOW_height ){
			c = ( WINDOW_height - (caiqiulie[i].y+ raduis) ) / caiqiulie[i].vy;
		}
		caiqiulie[i].vy += c * caiqiulie[i].g;
		
		
		
		// 落地后反弹
		if(caiqiulie[i].y>=WINDOW_height-raduis){
			  caiqiulie[i].y = WINDOW_height-raduis;
			caiqiulie[i].vy = -Math.abs(caiqiulie[i].vy)*0.7;
		}
		
	}
	var cnt=0;
	
	for(let i in caiqiulie){
		if(caiqiulie[i].x+raduis>0 && caiqiulie[i].x<WINDOW_width-raduis){
			caiqiulie[cnt++]=caiqiulie[i];
		}
	}
	while(caiqiulie.length>cnt){
		caiqiulie.pop();
	}

	console.log(caiqiulie.length);
}

