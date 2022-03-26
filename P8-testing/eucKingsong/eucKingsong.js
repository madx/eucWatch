//kingsong euc module 
//euc.conn(euc.mac);
//euc.wri("lightsOn")
//temp
if (!euc.dash.lght) euc.dash.lght={"ride":0};
if (!euc.dash.ks) euc.dash.ks={"lift":1,"aLift":0,"aRide":0};
euc.tmp={};
//commands
euc.wri=function(i) {if (set.def.cli) console.log("not connected yet"); if (i=="end") euc.off(); return;};
euc.cmd=function(no,val){
	switch (no) {
		case "model":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x9B,20,90,90]; 
		case "serial":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x63,20,90,90]; 
		case "alarms":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x98,20,90,90]; 
		case "horn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x88,20,90,90]; 
		case "info1":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x53,20,90,90]; 
		case "info2":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x54,20,90,90]; 
		case "getHeadLight":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,20,90,90];
		case "lightsOn":euc.seq=0;euc.dash.light=1;return [170,85,18,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];  
		case "lightsOff": euc.seq=0;euc.dash.light=0;return [170,85,19,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];  
		case "lightsAuto":euc.seq=0;euc.dash.light=2;return [170,85,20,1,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		case "lightsCity": if (euc.night) {return euc.cmd("lightsAuto");} else {return euc.cmd("lightsOff");} break;
		case "getStrobe":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,20,90,90];
		case "strobeOn":euc.dash.strobe=1;return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90];
		case "strobeOff":euc.dash.strobe=0;return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,83,20,90,90];
		case "getLightMagic":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,20,90,90];
		case "setLightMagic":return [170,85,val,0,0,0,0,0,0,0,0,0,0,0,0,0,80,20,90,90];
		//
		case "getVoice":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,20,90,90];
		case "setVoice":return [170,85,val,val?1:0,0,0,0,0,0,0,0,0,0,0,0,0,115,20,90,90];
		//
		case "rideSoft":return [170,85,2,224,0,0,0,0,0,0,0,0,0,0,0,0,0x87,20,90,90];
		case "rideMed":return [170,85,1,224,0,0,0,0,0,0,0,0,0,0,0,0,0x87,20,90,90];
		case "rideHard":return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,0x87,20,90,90];  
		//
		case "getPoweOffTimeout":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,20,90,90];
		case "setPoweOffTimeout":return [170,85,1,0,val & 255,(val >> 8) & 255,0,0,0,0,0,0,0,0,0,0,63,20,90,90];

		//
		case "getLock":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,20,90,90];
		case "lock":euc.dash.lock=1;return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0x5d,20,90,90]; 
		case "unlock":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,94,20,90,90];
		case "unlock0":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x37,0x32,0x34,48,0x38,0x35,0x5D,20,90,90];
		case "unlock1":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x31,0x35,0x36,0x38,0x32,0x32,0x5d,20,90,90];
		case "unlock2":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x39,0x38,0x32,0x39,0x34,0x36,0x47,20,90,90];
		case "unlock3":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x39,48,0x34,0x31,0x33,0x39,0x5d,20,90,90];
		case "unlock4":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x38,0x37,0x35,0x34,0x36,0x37,0x47,20,90,90]; //ok for s18 old
		case "unlock5":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x37,0x32,0x34,48,0x38,0x35,0x47,20,90,90];
		case "unlock6":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x38,0x37,0x35,0x34,0x36,0x37,0x5D,20,90,90]; //ok for s18 old
		//case "unlock":euc.dash.lock=0;return [170,85,0,0,0,0,0,0,0,0,0x38,0x37,0x35,0x34,0x36,0x37,0x47,20,90,90];
		case "off":euc.seq=0;return [170,85,0,224,0,0,0,0,0,0,0,0,0,0,0,0,0x40,20,90,90];
		case "passSend":return    [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,0x44,20,90,90]; 
		case "passChange": return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),48+Number(euc.dash.passOld[0]),48+Number(euc.dash.passOld[1]),48+Number(euc.dash.passOld[2]),48+Number(euc.dash.passOld[3]),0,0,0,0,0,0,0x41,20,90,90]; //rf 43
		case "passClear": return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,0x42,20,90,90];  //rf 43
		case "passSet": return [170,85,48+Number(euc.dash.pass[0]),48+Number(euc.dash.pass[1]),48+Number(euc.dash.pass[2]),48+Number(euc.dash.pass[3]),0,0,0,0,0,0,0,0,0,0,0x41,20,90,90]; //rf 43
		case "calibrate":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x89,20,90,90];  
		case "tiltSet":euc.dash.tiltSet=(99<=euc.dash.tiltSet||-99>=euc.dash.tiltSet)?0:euc.dash.tiltSet;let tiltSet=(0<=euc.dash.tiltSet)?euc.dash.tiltSet:255+euc.dash.tiltSet;
			return [170,85,1,0,tiltSet,(tiltSet<=100)?0:255,0,0,0,0,0,0,0,0,0,0,0x8A,20,90,90]; //rf 8A
		case "liftOn":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0x7E,20,90,90]; //rf 4C
		case "liftOff":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x7E,20,90,90];
		case "setSpeedLimits":return [170,85,((euc.dash.limE[0])?euc.dash.lim[0]:(euc.dash.limE[1])?0x00:0xFF),0x00,(euc.dash.limE[1])?euc.dash.lim[1]:0,0x00,euc.dash.lim[2],0x00,euc.dash.lim[3],0x00,0x31,0x32,0x33,0x34,0x35,0x36,0x85,20,90,90]; //speed in kph, rf A4
		case "rideLedOn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x6C,20,90,90]; //rf 6E
		case "rideLedOff":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0x6C,20,90,90];
		case "musicLedOn":return [170,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0x7D,20,90,90]; //rf 6E
		case "musicLedOff":return [170,85,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0x6C,20,90,90]; //rf 4A
    }
};

euc.tmp.one=function(inpk){
	//speed
	euc.dash.spd=(inpk[5] << 8 | inpk[4])/100; 
	euc.dash.spdC = ( euc.dash.spd1 <= euc.dash.spd )? 2 : ( euc.dash.spd2 <= euc.dash.spd )? 1 : 0 ;	
	if ( euc.dash.hapS && euc.dash.spdC == 2 ) 
		euc.alert = 1 + Math.round((euc.dash.spd-euc.dash.spd1) / euc.dash.spdS) ; 	
	//amp
	this.amp=inpk[11] << 8 | inpk[10];
	if ( 32767 < this.amp ) this.amp = this.amp - 65536;
	euc.dash.amp = ( this.amp / 100 );
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= 0 || 15 <= euc.dash.amp)? 1 : 0;
	ampL.unshift(Math.round(euc.dash.amp));
	if (20<ampL.length) ampL.pop();
	euc.dash.ampC = ( euc.dash.ampH <= euc.dash.amp || euc.dash.amp <= euc.dash.ampL )? 2 : ( euc.dash.amp  <= -0.5 || 15 <= euc.dash.amp)? 1 : 0;
	if (euc.dash.hapA && euc.dash.ampC==2) {
		if (euc.dash.ampH<=euc.dash.amp)	euc.alert =  euc.alert + 1 + Math.round( (euc.dash.amp - euc.dash.ampH) / euc.dash.ampS) ;
		else euc.alert =  euc.alert + 1 + Math.round(-(euc.dash.amp - euc.dash.ampL) / euc.dash.ampS) ;
	}
	//volt
	euc.dash.volt=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.bat=Math.round(100* (euc.dash.volt*( 100/(16*euc.dash.bms)) - euc.dash.batE )  / (euc.dash.batF-euc.dash.batE) );
	batL.unshift(euc.dash.bat);
	if (20<batL.length) batL.pop();
	euc.dash.batC = (50 <= euc.dash.bat)? 0 : (euc.dash.bat <= euc.dash.batL)? 2 : 1;	
	if ( euc.dash.hapB && euc.dash.batC ==2 )  euc.alert ++; 
	//temp
	euc.dash.tmp = (inpk[13] << 8 | inpk[12])/100;
	euc.dash.tmpC=(euc.dash.tmpH - 5 <= euc.dash.tmp )? (euc.dash.tmpH <= euc.dash.tmp )?2:1:0;
	if (euc.dash.hapT && euc.dash.tmpC==2) euc.alert++; 
	//total mileage
	euc.dash.trpT = ((inpk[6] << 16) + (inpk[7] << 24) + inpk[8] + (inpk[9] << 8)) / 1000;
	euc.log.trp.forEach(function(val,pos){ if (!val) euc.log.trp[pos]=euc.dash.trpT;});
	//mode
	euc.dash.mode = inpk[14];
	//City lights 
	if ( euc.dash.aLight === "lightsCity" ) { 
		if ( euc.dash.amp < -1 && euc.dash.light ===1 ) {
			euc.wri("lightsAuto"); 
		}else if (euc.night && euc.dash.amp >= 0) {
			if ( 20 < euc.dash.spd && euc.dash.light !== 1  ) 
				euc.wri("lightsOn") ;
			else if ( euc.dash.spd < 10 && euc.dash.light !== 2  ) 
				euc.wri("lightsAuto") ;
		} else if (euc.dash.amp >= 0) {
			if ( 35 < euc.dash.spd && !euc.dash.strobe  ) 
				euc.wri("strobeOn") ;
			else if  ( euc.dash.spd < 30 && euc.dash.strobe  ) 
				euc.wri("strobeOff") ;
			else if  ( 25 < euc.dash.spd && euc.dash.light !== 1  ) 
				euc.wri("lightsOn") ;
			else if ( euc.dash.spd < 15 && euc.dash.light !== 2  ) 
				euc.wri("lightsAuto") ;
		}
	}
					
};
euc.tmp.two=function(inpk){
	euc.dash.trpL=((inpk[2] << 16) + (inpk[3] << 24) + inpk[4] + (inpk[5] << 8)) / 1000;
	euc.dash.time=Math.round((inpk[7] << 8 | inpk[6])/60);
	euc.dash.spdM=Math.round((inpk[9] << 8 | inpk[8])/100) ;
	euc.dash.fan=inpk[12];
					
};
euc.tmp.thre=function(inpk){
	euc.dash.spdL=(inpk[3] << 8 | inpk[2])/100;
	euc.dash.alrm=(euc.dash.spdL < euc.dash.spdT && euc.dash.spdL-5 < euc.dash.spd)?1:0;
	almL.unshift(euc.dash.alrm);
	if (20<almL.length) almL.pop();
	//haptic
	if (euc.dash.alrm) euc.alert=20;
};
euc.tmp.four=function(inpk){
	//console.log("model");
	if (!euc.dash.name) {
		euc.dash.model=String.fromCharCode.apply(String,inpk.slice(2,11));
		euc.dash.name=String.fromCharCode.apply(String,inpk.slice(5,8));
		if (euc.dash.model.includes("-")) {
			let model=euc.dash.name.split("-")[0];
			if (model.includes("S18") || model.includes("18L") ||  model.includes("18XL") || model.includes("16X") )
				euc.dash.bms = 1.25;
			else 
				euc.dash.bms = 1;
		} else euc.dash.bms=1.25;
		set.write("dash","slot"+require("Storage").readJSON("dash.json",1).slot+"Name",euc.dash.name);
	}	
};	
//start
euc.conn=function(mac){
	if ( global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected ) {
		if (set.def.cli) console.log("ble allready connected"); 
		global["\xFF"].BLE_GATTS.disconnect();return;
	}
	//connect 
	NRF.connect(mac,{minInterval:7.5, maxInterval:15})
	.then(function(g) {
	   return g.getPrimaryService(0xffe0);
	}).then(function(s) {
	  return s.getCharacteristic(0xffe1);
	//read
	}).then(function(c) {
//		inpk=new Uint8Array(event.target.value.buffer);
		var inpk=new Uint8Array(20);
		c.on('characteristicvaluechanged', function(event) {
			inpk.set(event.target.value.buffer);
            if (euc.busy) return;
			euc.alert=0;
			//if (set.def.cli) console.log("lll",inpk);
			switch (inpk[16]){				
				case  169:
					euc.tmp.one(inpk);
					break;
				case 185://trip-time-max_speed
					euc.tmp.two(inpk);
					break;
				case 245:
					euc.dash.pwr=inpk[15];
					break;
				case 246:
					euc.tmp.thre(inpk);
					break;	
				case 181:
					if (inpk[4]==0||inpk[4]==255) euc.dash.limE[0]=0;
					else {
						euc.dash.lim[0]=inpk[4];
						euc.dash.limE[0]=1;
					}
					if (inpk[6]==0) euc.dash.limE[1]=0; 
					else {
						euc.dash.lim[1]=inpk[6];
						euc.dash.limE[1]=1;
					}
					euc.dash.lim[2]=inpk[8];
					euc.dash.lim[3]=inpk[10];
					break;
				case 179://serial
					euc.dash.serial=String.fromCharCode.apply(String,inpk.slice(2,14))+String.fromCharCode.apply(String,inpk.slice(17,3));
					break;
				case 187://model
					euc.tmp.four(inpk);
					break;
				default: 
					if ( inpk[16] == 76) 
						euc.dash.ks.lift=inpk[2];
					else if ( inpk[16] == 85) 
						euc.dash.strb=inpk[2];
					else if ( inpk[16] == 110) 	
						euc.dash.lght.ride=1-inpk[2];
					else if ( inpk[16] == 95){
						if (inpk[2]==1){
							euc.dash.lock=1;
							if (inpk[4]==0&&inpk[5]==0&&inpk[6]==0&&inpk[7]==0&&inpk[8]==0&&inpk[9]==0)
								euc.wri("unlock6");
							else if (inpk[4]==48&&inpk[5]==48&&inpk[6]==48&&inpk[7]==48&&inpk[8]==48&&inpk[9]==48)	
								euc.wri("unlock0");
							else 
								euc.wri("unlock");
						}else euc.dash.lock=0;
						//euc.dash.lght.ride=1-inpk[2];	
						//la[1] << 8 | la[0] 
					}					
					else if ( inpk[16] == 63) 
						euc.dash.ks.offT=inpk[5] << 8 | inpk[4];
					//	
					if (set.def.cli) console.log(inpk);
					print(inpk[16],inpk[2])
					break;
			}
			//haptic
			if (!euc.buzz && euc.alert) { 
				if (!w.gfx.isOn&&(euc.dash.spdC||euc.dash.ampC||euc.dash.alrm)) face.go(set.dash[set.def.dash.face],0);
				euc.buzz=1;
				if (20 <= euc.alert) euc.alert = 20;
				var a=[];
				while (5 <= euc.alert) {
					a.push(200,500);
					euc.alert = euc.alert - 5;
				}
				for (let i = 0; i < euc.alert ; i++) a.push(200,150);
				digitalPulse(ew.pin.BUZZ,0,a); 
				setTimeout(() => { euc.buzz = 0; }, 3000);
			}
		});
		//on disconnect
		global["\u00ff"].BLE_GATTS.device.on('gattserverdisconnected', function(reason) {
		euc.off(reason);
		});
		return  c;
	//write
	}).then(function(c) {
		if (set.def.cli) console.log("EUC Kingsong connected"); 
		euc.wri= function(n,v) {
			if (euc.busy) { clearTimeout(euc.busy);euc.busy=setTimeout(()=>{euc.busy=0;},20);return;} 
			euc.busy=setTimeout(()=>{euc.busy=0;},50);
			//if (n=="end") c.stopNotifications();
			if (n=="hornOn"){
				euc.horn=1;
				if (euc.tmp.horn) {clearTimeout(euc.tmp.horn);euc.tmp.horn=0;}
				c.writeValue(euc.cmd("lock")).then(function() {
					euc.dash.lock=1;
					return c.writeValue(euc.cmd("lightsOn"));
				}).then(function() {	
					euc.dash.strb=1;
					return c.writeValue(euc.cmd("strobeOn"));
				}).then(function() {
					if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
					euc.tmp.horn=setInterval(() => {
						if (!BTN1.read()){
							if (euc.tmp.horn) {clearInterval(euc.tmp.horn);euc.tmp.horn=0;}
							c.writeValue(euc.cmd("unlock")).then(function() {		
								euc.dash.lock=0;
								euc.dash.strb=0;
								return c.writeValue(euc.cmd("strobeOff"));
							}).then(function() {
								euc.horn=0;
								if (euc.busy){clearTimeout(euc.busy);euc.busy=0;}
								return c.writeValue(euc.cmd(euc.dash.aLight));
							});
						}
					}, 200); 
				});
			} else if (n=="hornOff") {
				euc.horn=0;
				if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				return;
			} else if (n==="start") {
				euc.state="READY";
				buzzer([90,40,150]);
				c.writeValue(euc.cmd((euc.dash.passSend)?"passSend":(euc.dash.aLck)?"unlock":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto")).then(function() {	
					return c.writeValue(euc.cmd((euc.dash.aLck&&euc.dash.passSend)?"unlock":(euc.seq==0)?(euc.dash.lght.ride)?"rideLedOn":"rideLedOff":(euc.dash.aLight)?euc.dash.aLight:"lightsAuto"));
				}).then(function() {
					return (euc.seq==0)?(euc.dash.aLck||euc.dash.passSend)?c.writeValue(euc.cmd((euc.dash.lght.ride)?"rideLedOn":"rideLedOff")):"ok":c.writeValue(euc.cmd((euc.dash.aLight)?euc.dash.aLight:"lightsAuto"));
				}).then(function() {
					return ((euc.dash.aLck&&euc.dash.passSend)?c.writeValue(euc.cmd((euc.dash.lght.ride)?"rideLedOn":"rideLedOff")):"ok");
				}).then(function() {
					return c.startNotifications();
				}).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					return c.writeValue(euc.cmd("alarms"));	
				}).then(function() {
					euc.run=1;
					return c.writeValue(euc.cmd("model"));
				}).then(function() {
					if (euc.dash.ks.aLift) euc.dash.ks.lift=0;
					return ((euc.dash.ks.aLift)?c.writeValue(euc.cmd("liftOff")):"ok");
				}).catch(function(err)  {
					if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
					else euc.off("err-start");
				});
			}else if (euc.state=="OFF"||n=="end") {
				if (global['\xFF'].BLE_GATTS && global['\xFF'].BLE_GATTS.connected) {
					c.writeValue(euc.cmd((euc.dash.aLck)?"lock":"lightsOff")).then(function() {
						return ((euc.dash.aOff)?c.writeValue(euc.cmd("off")):true);	
					}).then(function() {
						return ((euc.seq)?c.writeValue(euc.cmd("lightsOff")):true);
					}).then(function() {
						return ((euc.dash.ks.aRide)?c.writeValue(euc.cmd("rideLedOff")):true);	
					}).then(function() {
						return ((euc.dash.ks.aLift)?c.writeValue(euc.cmd("liftOn")):true);
					}).then(function() {
						euc.run=0;
						return global["\xFF"].BLE_GATTS.disconnect();	
					}).catch(function(err)  {
						euc.state="OFF";
						if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
						if (global["\xFF"].BLE_GATTS&&global["\xFF"].BLE_GATTS.connected) global["\xFF"].BLE_GATTS.disconnect();
						else euc.off("err-off");
					});
				}else {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.state="OFF";
					euc.off("not connected");
					return;
				}
			}else { 
				c.writeValue(euc.cmd(n,v)).then(function() {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
				}).catch(function(err)  {
					if (euc.busy) {clearTimeout(euc.busy);euc.busy=0;}
					euc.off("err-rest");
				});
			}
		};
		if (!set.read("dash","slot"+set.read("dash","slot")+"Mac")) {
			euc.dash.mac=euc.mac; euc.dash.batF=420;euc.dash.batE=320;
			euc.updateDash(require("Storage").readJSON("dash.json",1).slot);
			set.write("dash","slot"+set.read("dash","slot")+"Mac",euc.mac);
		}
		if (!euc.run) { 
			euc.wri("start");
		} else {
			setTimeout(()=>{ 
				//console.log(global["\xFF"].bleHdl[54].value.buffer[0]);
				if (global["\xFF"].bleHdl[54]&& (global["\xFF"].bleHdl[54].value.buffer[0]==65 ||global["\xFF"].bleHdl[54].value.buffer[0]==188)){
					euc.wri("start");
				} else {
					euc.state="READY";
					c.startNotifications();
				}
			},500);
		}
	//reconect
	}).catch(function(err)  {
		euc.off(err);
	});
};
//catch
euc.off=function(err){
	if (euc.reconnect) {clearTimeout(euc.reconnect); euc.reconnect=0;}
	if (euc.state!="OFF") {
		euc.seq=1;
		//if (set.def.cli) console.log("EUC: Restarting");
		if ( err==="Connection Timeout"  )  {
			//if (set.def.cli) console.log("reason :timeout");
			euc.state="LOST";
			if ( set.def.dash.rtr < euc.run) {
				euc.tgl();
				return;
			}
			euc.run=euc.run+1;
			if (euc.dash.lock==1) buzzer(250);
			else  buzzer([250,200,250,200,250]);
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 5000);
		}else if ( err==="Disconnected"|| err==="Not connected")  {
			//if (set.def.cli) console.log("reason :",err);
			euc.state="FAR";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 1000);
		} else {
			//if (set.def.cli) console.log("reason :",err);
			euc.state="RETRY";
			euc.reconnect=setTimeout(() => {
				euc.reconnect=0;
				if (euc.state!="OFF") euc.conn(euc.mac); 
			}, 2000);
		}
	} else {
		if (set.bt===2) console.log("EUC OUT:",err);
		if (euc.busy) { clearTimeout(euc.busy);euc.busy=0;} 
		if ( euc.aOff==0 || euc.aOff==1 ) {euc.dash.aOff=euc.aOff;	delete euc.aOff;}
		if ( euc.aLck==0 || euc.aLck==1 )  {euc.dash.aLck=euc.aLck;	delete euc.aLck;}
		euc.off=function(err){if (set.bt===2) console.log("EUC off, not connected",err);};
		euc.wri=function(err){if (set.bt===2) console.log("EUC write, not connected",err);};
		euc.conn=function(err){if (set.bt===2) console.log("EUC conn, not connected",err);};
		euc.cmd=function(err){if (set.bt===2) console.log("EUC cmd, not connected",err);};
		euc.run=0;
		euc.tmp=0;
		global["\xFF"].bleHdl=[];
		NRF.setTxPower(set.def.rfTX);
    }
};