// BEGIN upcacomposite
if (!BWIPJS.bwipp["upca"]) BWIPJS.load("bwipp/upca.js");
if (!BWIPJS.bwipp["gs1-cc"]) BWIPJS.load("bwipp/gs1-cc.js");
if (!BWIPJS.bwipp["renlinear"]) BWIPJS.load("bwipp/renlinear.js");
if (!BWIPJS.bwipp["renmatrix"]) BWIPJS.load("bwipp/renmatrix.js");
BWIPJS.bwipp["upcacomposite"]=function() {
	this.dict["upca"]=BWIPJS.bwipp["upca"];
	this.dict["gs1-cc"]=BWIPJS.bwipp["gs1-cc"];
	this.dict["renlinear"]=BWIPJS.bwipp["renlinear"];
	this.dict["renmatrix"]=BWIPJS.bwipp["renmatrix"];
	function $f0(){
		//#line 15493: token false eq {exit} if dup length string cvs (=) search
		return -1;
	}
	function $f1(){
		//#line 15494: true eq {cvlit exch pop exch def} {cvlit true def} ifelse
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.ptr--;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f2(){
		//#line 15494: true eq {cvlit exch pop exch def} {cvlit true def} ifelse
		this.stk[this.ptr++]=true;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f3(){
		//#line 15493: token false eq {exit} if dup length string cvs (=) search
		var a=/^\s*([^\s]+)(\s+.*)?$/.exec(this.stk[this.ptr-1]);
		if (a) {
			this.stk[this.ptr-1]=BWIPJS.psstring(a[2]===undefined?"":a[2]);
			this.stk[this.ptr++]=BWIPJS.psstring(a[1]);
			this.stk[this.ptr++]=true;
		} else {
			this.stk[this.ptr-1]=false;
		}
		this.stk[this.ptr++]=false;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f0;
		var t0=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t0.call(this)==-1) return -1;
		}
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
		var t=this.stk[this.ptr-2].toString();
		this.stk[this.ptr-1].assign(0,t);
		this.stk[this.ptr-2]=this.stk[this.ptr-1].subset(0,t.length);
		this.ptr--;
		this.stk[this.ptr++]=BWIPJS.psstring("=");
		var h=this.stk[this.ptr-2];
		var t=h.indexOf(this.stk[this.ptr-1]);
		if (t==-1) {
			this.stk[this.ptr-1]=false;
		} else {
			this.stk[this.ptr-2]=h.subset(t+this.stk[this.ptr-1].length);
			this.stk[this.ptr-1]=h.subset(t,this.stk[this.ptr-1].length);
			this.stk[this.ptr++]=h.subset(0,t);
			this.stk[this.ptr++]=true;
		}
		//#line 15494: true eq {cvlit exch pop exch def} {cvlit true def} ifelse
		this.stk[this.ptr++]=true;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f1;
		this.stk[this.ptr++]=$f2;
		var t1=this.stk[--this.ptr];
		var t2=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t2.call(this)==-1) return -1;
		} else {
			if (t1.call(this)==-1) return -1;
		}
	}
	function $f4(){
		//#line 15491: 1 dict begin
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-1]={};
		this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
		//#line 15492: options {
		var t=this.dstk.get("options");
		if (t===undefined) throw new Error("dict: options: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=$f3;
		//#line 15495: } loop
		var t3=this.stk[--this.ptr];
		while (true) {
			if (t3.call(this)==-1) break;
		}
		//#line 15496: currentdict end /options exch def
		this.stk[this.ptr++]=this.dict;
		this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
		this.stk[this.ptr++]="options"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f5(){
		//#line 15498: options {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f6(){
		//#line 15502: /linear exch def
		this.stk[this.ptr++]="linear"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 15503: pop
		this.ptr--;
		//#line 15504: /comp exch def
		this.stk[this.ptr++]="comp"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f7(){
		//#line 15506: pop
		this.ptr--;
	}
	function $f8(){
		//#line 15522: 0 1  93 {0} repeat  1 0
		this.stk[this.ptr++]=0;
	}
	function $f9(){
		//#line 15523: 1 0  93 {0} repeat  0 1
		this.stk[this.ptr++]=0;
	}
	function $f10(){
		//#line 15524: 0 1  93 {0} repeat  1 0
		this.stk[this.ptr++]=0;
	}
	//#line 15482: 20 dict begin            % Confine variables to local scope
	this.stk[this.ptr++]=20;
	this.stk[this.ptr-1]={};
	this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
	//#line 15484: /options exch def
	this.stk[this.ptr++]="options"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 15485: /barcode exch def
	this.stk[this.ptr++]="barcode"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 15487: /dontdraw false def
	this.stk[this.ptr++]="dontdraw"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 15490: options type /stringtype eq {
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr++]="stringtype"; //ident
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f4;
	//#line 15497: } if
	var t4=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t4.call(this)==-1) return -1;
	}
	//#line 15498: options {def} forall
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f5;
	var t7=this.stk[--this.ptr];
	var t6=this.stk[--this.ptr];
	for (t5 in t6) {
		if (t6 instanceof BWIPJS.psstring || t6 instanceof BWIPJS.psarray) {
			if (t5.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t6.get(t5);
		} else {
			this.stk[this.ptr++]=t5;
			this.stk[this.ptr++]=t6[t5];
		}
		if (t7.call(this)==-1) break;
	}
	//#line 15501: barcode (|) search {
	var t=this.dstk.get("barcode");
	if (t===undefined) throw new Error("dict: barcode: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("|");
	var h=this.stk[this.ptr-2];
	var t=h.indexOf(this.stk[this.ptr-1]);
	if (t==-1) {
		this.stk[this.ptr-1]=false;
	} else {
		this.stk[this.ptr-2]=h.subset(t+this.stk[this.ptr-1].length);
		this.stk[this.ptr-1]=h.subset(t,this.stk[this.ptr-1].length);
		this.stk[this.ptr++]=h.subset(0,t);
		this.stk[this.ptr++]=true;
	}
	this.stk[this.ptr++]=$f6;
	//#line 15505: } {
	this.stk[this.ptr++]=$f7;
	//#line 15507: } ifelse
	var t8=this.stk[--this.ptr];
	var t9=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t9.call(this)==-1) return -1;
	} else {
		if (t8.call(this)==-1) return -1;
	}
	//#line 15509: gsave
	this.gsave();
	//#line 15511: options (lintype) (ean13) put
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("lintype");
	this.stk[this.ptr++]=BWIPJS.psstring("ean13");
	if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
		this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
	else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
	this.ptr-=3;
	//#line 15512: options (inkspread) (0) put
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("inkspread");
	this.stk[this.ptr++]=BWIPJS.psstring("0");
	if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
		this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
	else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
	this.ptr-=3;
	//#line 15513: options (dontdraw) true put
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("dontdraw");
	this.stk[this.ptr++]=true;
	if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
		this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
	else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
	this.ptr-=3;
	//#line 15516: linear options //upca exec //renlinear exec
	var t=this.dstk.get("linear");
	if (t===undefined) throw new Error("dict: linear: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("upca");
	if (t===undefined) throw new Error("//upca: undefined");
	this.stk[this.ptr++]=t;
	var t=this.stk[--this.ptr];
	if (t instanceof Function) t.call(this); else this.eval(t);
	var t=this.dstk.get("renlinear");
	if (t===undefined) throw new Error("//renlinear: undefined");
	this.stk[this.ptr++]=t;
	var t=this.stk[--this.ptr];
	if (t instanceof Function) t.call(this); else this.eval(t);
	//#line 15519: -1 72 rmoveto <<
	this.stk[this.ptr++]=-1;
	this.stk[this.ptr++]=72;
	var y=this.stk[--this.ptr];
	this.rmoveto(this.stk[--this.ptr],y);
	this.stk[this.ptr++]=Infinity;
	//#line 15520: /ren //renmatrix
	this.stk[this.ptr++]="ren"; //ident
	var t=this.dstk.get("renmatrix");
	if (t===undefined) throw new Error("//renmatrix: undefined");
	this.stk[this.ptr++]=t;
	//#line 15521: /pixs [
	this.stk[this.ptr++]="pixs"; //ident
	this.stk[this.ptr++]=Infinity;
	//#line 15522: 0 1  93 {0} repeat  1 0
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr++]=93;
	this.stk[this.ptr++]=$f8;
	var t12=this.stk[--this.ptr];
	var t10=this.stk[--this.ptr];
	for (var t11=0; t11<t10; t11++) {
		if (t12.call(this)==-1) break;
	}
	this.stk[this.ptr++]=1;
	this.stk[this.ptr++]=0;
	//#line 15523: 1 0  93 {0} repeat  0 1
	this.stk[this.ptr++]=1;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=93;
	this.stk[this.ptr++]=$f9;
	var t15=this.stk[--this.ptr];
	var t13=this.stk[--this.ptr];
	for (var t14=0; t14<t13; t14++) {
		if (t15.call(this)==-1) break;
	}
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	//#line 15524: 0 1  93 {0} repeat  1 0
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr++]=93;
	this.stk[this.ptr++]=$f10;
	var t18=this.stk[--this.ptr];
	var t16=this.stk[--this.ptr];
	for (var t17=0; t17<t16; t17++) {
		if (t18.call(this)==-1) break;
	}
	this.stk[this.ptr++]=1;
	this.stk[this.ptr++]=0;
	//#line 15525: ]
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 15526: /pixx 97
	this.stk[this.ptr++]="pixx"; //ident
	this.stk[this.ptr++]=97;
	//#line 15527: /pixy 3
	this.stk[this.ptr++]="pixy"; //ident
	this.stk[this.ptr++]=3;
	//#line 15528: /height 6 72 div
	this.stk[this.ptr++]="height"; //ident
	this.stk[this.ptr++]=6;
	this.stk[this.ptr++]=72;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	//#line 15529: /width 97 72 div
	this.stk[this.ptr++]="width"; //ident
	this.stk[this.ptr++]=97;
	this.stk[this.ptr++]=72;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	//#line 15530: /opt options
	this.stk[this.ptr++]="opt"; //ident
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	//#line 15531: >> //renmatrix exec
	var t = {};
	for (var i = this.ptr-1; i >= 1 && this.stk[i] !== Infinity; i-=2) {
		if (this.stk[i-1] === Infinity) throw "dict: malformed stack";
		t[this.stk[i-1]]=this.stk[i];
	}
	if (i < 0 || this.stk[i]!==Infinity) throw "dict: underflow";
	this.ptr = i;
	this.stk[this.ptr++]=t;
	var t=this.dstk.get("renmatrix");
	if (t===undefined) throw new Error("//renmatrix: undefined");
	this.stk[this.ptr++]=t;
	var t=this.stk[--this.ptr];
	if (t instanceof Function) t.call(this); else this.eval(t);
	//#line 15534: -2 6 rmoveto comp options //gs1-cc exec //renmatrix exec
	this.stk[this.ptr++]=-2;
	this.stk[this.ptr++]=6;
	var y=this.stk[--this.ptr];
	this.rmoveto(this.stk[--this.ptr],y);
	var t=this.dstk.get("comp");
	if (t===undefined) throw new Error("dict: comp: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("gs1-cc");
	if (t===undefined) throw new Error("//gs1-cc: undefined");
	this.stk[this.ptr++]=t;
	var t=this.stk[--this.ptr];
	if (t instanceof Function) t.call(this); else this.eval(t);
	var t=this.dstk.get("renmatrix");
	if (t===undefined) throw new Error("//renmatrix: undefined");
	this.stk[this.ptr++]=t;
	var t=this.stk[--this.ptr];
	if (t instanceof Function) t.call(this); else this.eval(t);
	//#line 15536: grestore
	this.grestore();
	//#line 15538: end
	this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
	psstptr = this.ptr;
}
// END OF upcacomposite
