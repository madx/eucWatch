//dash simple 
face[0] = {
	offms: (set.def.off[face.appCurr])?set.def.off[face.appCurr]:10000,
	g:w.gfx,
	spd:[],
	init: function(){
		if (euc.dash.info.get.makr=="Begode") euc.wri("extendedPacket");
		this.g.clear();
		this.spdC=[0,13,7,7];
		this.ampC=[1,2992,7,7];
		this.tmpC=[1,2992,7,7];
		this.batC=[4,1,7,7];
		this.spd=euc.dash.live.spd-1;
		this.amp=-1;
		this.tmp=-1;
		this.pwm=-1;
		this.pwm1=-1;
		this.bat=-1;
		this.volt=-1;
		this.conn=0;
		this.spdF=euc.dash.opt.unit.fact.spd*((set.def.dash.mph)?0.625:1);
		this.trpF=euc.dash.opt.unit.fact.dist*((set.def.dash.mph)?0.625:1);
		this.g.setColor(0,1);
		this.g.fillRect(0,0,239,75); //amp 
		this.g.setColor(1,14);
		this.g.setFont("Vector",16);
		this.g.drawString("WHEEL PWM %",20,10);
		this.g.flip();
		this.run=true;
	},
	show : function(o){
		if (!this.run) return;
		if (euc.state=="READY") {
			if (this.pwm!=euc.dash.live.pwm) this.pwmf();
			if (this.spd!=Math.round(euc.dash.live.spd)) this.spdf();
			if (this.tmp!=euc.dash.live.tmp.toFixed(1))	this.tmpf();
			if (set.def.dash.batS){	if (this.bat!=euc.dash.live.bat)	this.batf();}
			else  if (this.volt!=euc.dash.live.volt.toFixed(1)) this.vltf();
			if (this.pwm1!=euc.dash.live.pwm) this.pwmE();
		} else if (euc.state=="OFF")  {
			setTimeout(function(){
				face.go("dashOff",0);
			},150);
			return;
		//rest
		} else  {
			if (euc.state!=this.conn) {
				this.conn=euc.state;
				this.g.setColor(0,0);
				this.g.fillRect(0,0,239,239);
				this.g.setColor(1,15);
				this.g.setFont("Vector",50);
				this.g.drawString(euc.state,(125-this.g.stringWidth(euc.state)/2),95);
				this.g.flip();
				this.spd=euc.dash.live.spd-1;this.pwm=-1;this.pwm1=-1;this.time=0;this.amp=-1;this.tmp=-1;this.volt=-1;this.bat=-1;this.trpL=-1;this.conn=0;this.lock=2;this.run=true;}
		}
		//refresh 
		this.tid=setTimeout(function(t){
			t.tid=-1;
			t.show();
		},50,this);
	},
	pwmf: function(){
		this.pwm=euc.dash.live.pwm;
		this.g.setColor(0,75<this.pwm?7:1);
		this.g.fillRect(155,0,239,35); //amp 
		this.g.setColor(1,15);
		this.g.setFontVector(43);
		this.g.drawString(this.pwm,(200-(this.g.stringWidth(this.pwm)/2)),-2); 
		this.g.flip();
	},
	pwmE: function(){
		this.pwm1=euc.dash.live.pwm;
		if (this.pwm<65) {
			this.g.setColor(1,3);
			this.g.fillRect(5,51,5+this.pwm1*2.4,70); //amp 	
			this.g.flip();	
		}else if (65 <= this.pwm) {
			this.g.setColor(1,3);
			this.g.fillRect(5,51,150,70); //amp 	
			this.g.flip();	
			this.g.setColor(1,13);
			this.g.fillRect(155,51,5+this.pwm1*2.4,70); //amp 	
			this.g.flip();	
		}
		this.g.flip();
		this.g.setColor(1,1);
		this.g.fillRect(5+this.pwm1*2.4,51,239,70); //amp 	
		this.g.flip();	
	},
	tmpf: function(){
		this.tmp=euc.dash.live.tmp.toFixed(1);
		this.g.setColor(0,this.tmpC[euc.dash.alrt.tmp.cc]);
		this.g.fillRect(0,200,119,239);       
		this.g.setColor(1,15);
		this.g.setFontVector(35);
		let temp=((set.def.dash.farn)?this.tmp*1.8+32:this.tmp).toString().split(".");
		let size=5+this.g.stringWidth(temp[0]);
		this.g.drawString(temp[0], 5,203); 
		if (temp[0]<100) {
			this.g.setFontVector(25);
			this.g.drawString("."+temp[1],size,210); 
			size=size+this.g.stringWidth(temp[1]);
		}
		this.g.setFontVector(12);
		this.g.drawString((set.def.dash.farn)?"°F":"°C",3+size,205); 
		this.g.flip();
	},
	batf: function(){
		this.bat=euc.dash.live.bat;
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122,200,239,239);
		this.g.setColor(1,15);
		this.g.setFontVector(35);
		this.g.drawString(this.bat,225-(this.g.stringWidth(this.bat)),203);
		this.g.setFontVector(16);
		this.g.drawString("%",227,208);
		this.g.flip();
	},
	vltf: function(){
		this.volt=euc.dash.live.volt.toFixed(1);
		this.g.setColor(0,this.batC[euc.dash.alrt.bat.cc]);
		this.g.fillRect(122,200,239,239);
		this.g.setColor(1,15);
		let volt=this.volt.toString().split(".");
		this.g.setFontVector(12);
		this.g.drawString("V",230,220); 
		let size=230;
		if (volt[0]<100) {
			this.g.setFontVector(25);
			size=size-this.g.stringWidth("."+volt[1]);
			this.g.drawString("."+volt[1],size,210); 
		}
		this.g.setFontVector(35);
		this.g.drawString(volt[0], size-this.g.stringWidth(volt[0]),203); 
		this.g.flip();
	},
	spdf: function(){
		if (Math.round(euc.dash.live.spd)<this.spd) this.spd--; else this.spd++;
		//this.spd=Math.round(euc.dash.live.spd);
		this.g.setColor(0,(euc.dash.alrt.spd.cc==1)?0:this.spdC[euc.dash.alrt.spd.cc]);
		this.g.fillRect(0,80,239,195);
		this.g.setColor(1,(euc.dash.alrt.spd.cc==1)?13:15);
		this.g.setFontVector(110);	  
		this.g.drawString(Math.round(this.spd*this.spdF),130-(this.g.stringWidth(Math.round(this.spd*this.spdF))/2),90); 
		this.g.flip();
	},
	ampf: function(){
		this.amp=euc.dash.live.amp;
		this.g.setColor(0,this.ampC[euc.dash.alrt.amp.cc]);
		this.g.fillRect(80,200,160,239); //amp 
		this.g.setColor(1,15);
		this.g.setFontVector(25);
		this.g.drawString(this.amp|0,(122-(this.g.stringWidth(this.amp|0)/2)),205); 
		this.g.flip();
	},
	tid:-1,
	run:false,
	clear : function(){
		this.run=false;
		if (this.tid>=0) clearTimeout(this.tid);
		this.tid=-1;
		return true;
	},
	off: function(){
		this.g.off();
		this.clear();
	} 
};
//loop face
face[1] = {
	offms:1000,
	init: function(){
		return true;
	},
	show : function(){
		if (euc.state=="OFF") face.go("main",0); else {face.pageCurr=0;face.go(set.dash[set.def.dash.face],-1);}
	return true;
	},
	clear: function(){
		return true;
	},
	off: function(){
		return true;
	},
};	

//touch-main
touchHandler[0]=function(e,x,y){
	switch (e) {
	case 5: //tap event
		/*if (x < 120 && 200 <y ){//temp/clock
			if (set.def.dash.clkS==undefined) set.def.dash.clkS=0;
			set.def.dash.clkS=1-set.def.dash.clkS;
			face[0].time=-1;face[0].tmp=-1;
			buzzer([30,50,30]);
		}else */if (120 < x && 200<y ){//batery percentage/voltage
			if (set.def.dash.batS==undefined) set.def.dash.batS=0;
			set.def.dash.batS=1-set.def.dash.batS;
			face[0].bat=-1;face[0].volt=-1;
			buzzer([30,50,30]);
		}
		else{	
			buzzer(40);
		}
		this.timeout();
		break;
    case 1: //slide down event
		if (euc.dash.info.get.makr=="Begode") euc.wri("mainPacket");
		if (set.def.dash.face+1>=set.dash.length) set.def.dash.face=0; else set.def.dash.face++;
		face.go(set.dash[set.def.dash.face],0);
		return;
    case 2: //slide up event
		if (y>160&&x<50) {
			if (w.gfx.bri.lv!==7) {this.bri=w.gfx.bri.lv;w.gfx.bri.set(7);}
			else w.gfx.bri.set(this.bri);
			buzzer([30,50,30]);
			this.timeout();
		}else if (Boolean(require("Storage").read("settings"))) {face.go("settings",0);return;}
        this.timeout();
		break;
    case 3: //slide left event
		if (euc.dash.info.get.makr=="Begode") euc.wri("mainPacket");
		(euc.state=="READY")?face.go('dash'+require("Storage").readJSON("dash.json",1)['slot'+require("Storage").readJSON("dash.json",1).slot+'Maker'],0):(euc.state=="OFF")?face.go("dashGarage",0):buzzer(40);
		return;
    case 4: //slide right event (back action)
		if (euc.dash.info.get.makr=="Begode") euc.wri("mainPacket");
		face.go("main",0);
		return;
    case 12: //touch and hold(long press) event
		buzzer(40);
		this.timeout();
		break;
    }
};