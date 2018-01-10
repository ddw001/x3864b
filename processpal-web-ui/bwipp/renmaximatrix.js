// BEGIN renmaximatrix
BWIPJS.bwipp["renmaximatrix"]=function() {
	function $f0(){
		//#line 378: args {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f1(){
		//#line 379: opt {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f2(){
		//#line 392: y 2 mod 0 eq {x} {x 0.5 add} ifelse
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f3(){
		//#line 392: y 2 mod 0 eq {x} {x 0.5 add} ifelse
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0.5;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	}
	function $f4(){
		//#line 389: dup 
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		//#line 390: /x exch 30 mod def 
		this.stk[this.ptr++]="x"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr++]=30;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]%this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 391: /y exch 30 idiv def
		this.stk[this.ptr++]="y"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr++]=30;
		this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 392: y 2 mod 0 eq {x} {x 0.5 add} ifelse
		var t=this.dstk.get("y");
		if (t===undefined) throw new Error("dict: y: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]%this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f2;
		this.stk[this.ptr++]=$f3;
		var t6=this.stk[--this.ptr];
		var t7=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t7.call(this)==-1) return -1;
		} else {
			if (t6.call(this)==-1) return -1;
		}
		//#line 393: 32 y sub 0.8661 mul
		this.stk[this.ptr++]=32;
		var t=this.dstk.get("y");
		if (t===undefined) throw new Error("dict: y: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=0.8661;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		//#line 394: moveto
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		//#line 395: 0     0.5774 rmoveto
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=0.5774;
		var y=this.stk[--this.ptr];
		this.rmoveto(this.stk[--this.ptr],y);
		//#line 396: -0.5 -0.2887 rlineto
		this.stk[this.ptr++]=-0.5;
		this.stk[this.ptr++]=-0.2887;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 397: 0    -0.5774 rlineto
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=-0.5774;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 398: 0.5  -0.2887 rlineto
		this.stk[this.ptr++]=0.5;
		this.stk[this.ptr++]=-0.2887;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 399: 0.5   0.2887 rlineto
		this.stk[this.ptr++]=0.5;
		this.stk[this.ptr++]=0.2887;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 400: 0     0.5774 rlineto
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=0.5774;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 401: -0.5  0.2887 rlineto
		this.stk[this.ptr++]=-0.5;
		this.stk[this.ptr++]=0.2887;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 402: closepath fill
		this.closepath();
		this.fill();
	}
	//#line 373: 20 dict begin
	this.stk[this.ptr++]=20;
	this.stk[this.ptr-1]={};
	this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
	//#line 375: /args exch def   % We are given some arguments
	this.stk[this.ptr++]="args"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 378: args {def} forall
	var t=this.dstk.get("args");
	if (t===undefined) throw new Error("dict: args: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f0;
	var t2=this.stk[--this.ptr];
	var t1=this.stk[--this.ptr];
	for (t0 in t1) {
		if (t1 instanceof BWIPJS.psstring || t1 instanceof BWIPJS.psarray) {
			if (t0.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t1.get(t0);
		} else {
			this.stk[this.ptr++]=t0;
			this.stk[this.ptr++]=t1[t0];
		}
		if (t2.call(this)==-1) break;
	}
	//#line 379: opt {def} forall
	var t=this.dstk.get("opt");
	if (t===undefined) throw new Error("dict: opt: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f1;
	var t5=this.stk[--this.ptr];
	var t4=this.stk[--this.ptr];
	for (t3 in t4) {
		if (t4 instanceof BWIPJS.psstring || t4 instanceof BWIPJS.psarray) {
			if (t3.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t4.get(t3);
		} else {
			this.stk[this.ptr++]=t3;
			this.stk[this.ptr++]=t4[t3];
		}
		if (t5.call(this)==-1) break;
	}
	//#line 381: gsave
	this.gsave();
	//#line 383: currentpoint translate
	var t=this.currentpoint();
	this.stk[this.ptr++]=t.x;
	this.stk[this.ptr++]=t.y;
	var y=this.stk[--this.ptr];
	this.translate(this.stk[--this.ptr],y);
	//#line 385: 2.4945 dup scale  % from 1pt to 1.88mm
	this.stk[this.ptr++]=2.4945;
	this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
	var y=this.stk[--this.ptr];
	this.scale(this.stk[--this.ptr],y);
	//#line 386: 0.5 0.5774 translate
	this.stk[this.ptr++]=0.5;
	this.stk[this.ptr++]=0.5774;
	var y=this.stk[--this.ptr];
	this.translate(this.stk[--this.ptr],y);
	//#line 388: pixs {
	var t=this.dstk.get("pixs");
	if (t===undefined) throw new Error("dict: pixs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f4;
	//#line 403: } forall
	var t10=this.stk[--this.ptr];
	var t9=this.stk[--this.ptr];
	for (t8 in t9) {
		if (t9 instanceof BWIPJS.psstring || t9 instanceof BWIPJS.psarray) {
			if (t8.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t9.get(t8);
		} else {
			this.stk[this.ptr++]=t8;
			this.stk[this.ptr++]=t9[t8];
		}
		if (t10.call(this)==-1) break;
	}
	//#line 406: newpath 14 13.8576 0.5774 0 360 arc closepath
	this.newpath();
	this.stk[this.ptr++]=14;
	this.stk[this.ptr++]=13.8576;
	this.stk[this.ptr++]=0.5774;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=360;
	this.arc(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1],true); this.ptr-=5;
	this.closepath();
	//#line 407: 14 13.8576 1.3359 360 0 arcn closepath fill
	this.stk[this.ptr++]=14;
	this.stk[this.ptr++]=13.8576;
	this.stk[this.ptr++]=1.3359;
	this.stk[this.ptr++]=360;
	this.stk[this.ptr++]=0;
	this.arc(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1],false); this.ptr-=5;
	this.closepath();
	this.fill();
	//#line 408: newpath 14 13.8576 2.1058 0 360 arc closepath
	this.newpath();
	this.stk[this.ptr++]=14;
	this.stk[this.ptr++]=13.8576;
	this.stk[this.ptr++]=2.1058;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=360;
	this.arc(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1],true); this.ptr-=5;
	this.closepath();
	//#line 409: 14 13.8576 2.8644 360 0 arcn closepath fill
	this.stk[this.ptr++]=14;
	this.stk[this.ptr++]=13.8576;
	this.stk[this.ptr++]=2.8644;
	this.stk[this.ptr++]=360;
	this.stk[this.ptr++]=0;
	this.arc(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1],false); this.ptr-=5;
	this.closepath();
	this.fill();
	//#line 410: newpath 14 13.8576 3.6229 0 360 arc closepath
	this.newpath();
	this.stk[this.ptr++]=14;
	this.stk[this.ptr++]=13.8576;
	this.stk[this.ptr++]=3.6229;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=360;
	this.arc(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1],true); this.ptr-=5;
	this.closepath();
	//#line 411: 14 13.8576 4.3814 360 0 arcn closepath fill
	this.stk[this.ptr++]=14;
	this.stk[this.ptr++]=13.8576;
	this.stk[this.ptr++]=4.3814;
	this.stk[this.ptr++]=360;
	this.stk[this.ptr++]=0;
	this.arc(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1],false); this.ptr-=5;
	this.closepath();
	this.fill();
	//#line 413: grestore
	this.grestore();
	//#line 415: end
	this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
	psstptr = this.ptr;
}
// END OF renmaximatrix
