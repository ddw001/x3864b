// BEGIN posicode
if (!BWIPJS.bwipp["renlinear"]) BWIPJS.load("bwipp/renlinear.js");
BWIPJS.bwipp["posicode"]=function() {
	this.dict["renlinear"]=BWIPJS.bwipp["renlinear"];
	function $f0(){
		//#line 7978: token false eq {exit} if dup length string cvs (=) search
		return -1;
	}
	function $f1(){
		//#line 7979: true eq {cvlit exch pop exch def} {cvlit true def} ifelse
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.ptr--;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f2(){
		//#line 7979: true eq {cvlit exch pop exch def} {cvlit true def} ifelse
		this.stk[this.ptr++]=true;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f3(){
		//#line 7978: token false eq {exit} if dup length string cvs (=) search
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
		//#line 7979: true eq {cvlit exch pop exch def} {cvlit true def} ifelse
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
		//#line 7976: 1 dict begin
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-1]={};
		this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
		//#line 7977: options {
		var t=this.dstk.get("options");
		if (t===undefined) throw new Error("dict: options: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=$f3;
		//#line 7980: } loop
		var t3=this.stk[--this.ptr];
		while (true) {
			if (t3.call(this)==-1) break;
		}
		//#line 7981: currentdict end /options exch def
		this.stk[this.ptr++]=this.dict;
		this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
		this.stk[this.ptr++]="options"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f5(){
		//#line 7983: options {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f6(){
		//#line 8001: dup msg exch j exch putinterval
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		//#line 8002: length j add 1 add /j exch def
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]="j"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8003: pop
		this.ptr--;
		//#line 8004: dup 0 3 getinterval cvi msg exch j 1 sub exch put
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=3;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.stk[this.ptr-1]=parseInt(this.stk[this.ptr-1],10);
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8005: dup length 3 sub 3 exch getinterval
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=3;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=3;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
	}
	function $f7(){
		//#line 8007: dup msg exch j exch putinterval
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		//#line 8008: length j add /j exch def
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]="j"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8009: /barcode msg 0 j getinterval def
		this.stk[this.ptr++]="barcode"; //ident
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8010: exit
		return -1;
	}
	function $f8(){
		//#line 8000: (^) search {
		this.stk[this.ptr++]=BWIPJS.psstring("^");
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
		//#line 8006: } {
		this.stk[this.ptr++]=$f7;
		//#line 8011: } ifelse 
		var t8=this.stk[--this.ptr];
		var t9=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t9.call(this)==-1) return -1;
		} else {
			if (t8.call(this)==-1) return -1;
		}
	}
	function $f9(){
		//#line 7996: /msg barcode length string def
		this.stk[this.ptr++]="msg"; //ident
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 7997: /j 0 def
		this.stk[this.ptr++]="j"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 7998: barcode
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 7999: { % loop
		this.stk[this.ptr++]=$f8;
		//#line 8012: } loop
		var t10=this.stk[--this.ptr];
		while (true) {
			if (t10.call(this)==-1) break;
		}
	}
	function $f10(){
		//#line 8061: version (a) eq version (b) eq or {/normal} {/limited} ifelse get 
		this.stk[this.ptr++]="normal"; //ident
	}
	function $f11(){
		//#line 8061: version (a) eq version (b) eq or {/normal} {/limited} ifelse get 
		this.stk[this.ptr++]="limited"; //ident
	}
	function $f12(){
		//#line 8073: encs j get dup type /stringtype eq {0 get} if  % convert string to ASCII if required
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
	}
	function $f13(){
		//#line 8072: /j exch def
		this.stk[this.ptr++]="j"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8073: encs j get dup type /stringtype eq {0 get} if  % convert string to ASCII if required
		var t=this.dstk.get("encs");
		if (t===undefined) throw new Error("dict: encs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr-1]=BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr++]="stringtype"; //ident
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f12;
		var t14=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t14.call(this)==-1) return -1;
		}
		//#line 8074: charvals j get exch i put 
		var t=this.dstk.get("charvals");
		if (t===undefined) throw new Error("dict: charvals: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
	}
	function $f14(){
		//#line 8069: /i exch def
		this.stk[this.ptr++]="i"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8070: /encs charmaps i get def
		this.stk[this.ptr++]="encs"; //ident
		var t=this.dstk.get("charmaps");
		if (t===undefined) throw new Error("dict: charmaps: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8071: 0 1 2 {
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr++]=$f13;
		//#line 8075: } for
		var t19=this.stk[--this.ptr];
		var t17=this.stk[--this.ptr];
		var t16=this.stk[--this.ptr];
		var t15=this.stk[--this.ptr];
		for (var t18=t15; t16<0 ? t18>=t17 : t18<=t17; t18+=t16) {
			this.stk[this.ptr++]=t18;
			if (t19.call(this)==-1) break;
		}
	}
	function $f15(){
		//#line 8081: raw {/encoding (raw) def} if
		this.stk[this.ptr++]="encoding"; //ident
		this.stk[this.ptr++]=BWIPJS.psstring("raw");
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f16(){
		//#line 8087: i barlen eq {exit} if
		return -1;
	}
	function $f17(){
		//#line 8087: i barlen eq {exit} if
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("barlen");
		if (t===undefined) throw new Error("dict: barlen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f16;
		var t26=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t26.call(this)==-1) return -1;
		}
		//#line 8088: /cw barcode i 1 add 3 getinterval cvi def
		this.stk[this.ptr++]="cw"; //ident
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=3;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.stk[this.ptr-1]=parseInt(this.stk[this.ptr-1],10);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8089: cws j cw put
		var t=this.dstk.get("cws");
		if (t===undefined) throw new Error("dict: cws: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cw");
		if (t===undefined) throw new Error("dict: cw: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8090: /i i 4 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=4;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8091: /j j 1 add def
		this.stk[this.ptr++]="j"; //ident
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f18(){
		//#line 8084: /cws barlen array def
		this.stk[this.ptr++]="cws"; //ident
		var t=this.dstk.get("barlen");
		if (t===undefined) throw new Error("dict: barlen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=BWIPJS.psarray(this.stk[this.ptr-1]);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8085: /i 0 def /j 0 def
		this.stk[this.ptr++]="i"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]="j"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8086: { % loop
		this.stk[this.ptr++]=$f17;
		//#line 8092: } loop
		var t27=this.stk[--this.ptr];
		while (true) {
			if (t27.call(this)==-1) break;
		}
		//#line 8093: /cws cws 0 j getinterval def
		this.stk[this.ptr++]="cws"; //ident
		var t=this.dstk.get("cws");
		if (t===undefined) throw new Error("dict: cws: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8094: /text () def
		this.stk[this.ptr++]="text"; //ident
		this.stk[this.ptr++]=BWIPJS.psstring("");
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f19(){
		//#line 8110: i barlen eq {exit} if
		return -1;
	}
	function $f20(){
		//#line 8115: /char fncvals barcode i 1 add 4 getinterval get def
		this.stk[this.ptr++]="char"; //ident
		var t=this.dstk.get("fncvals");
		if (t===undefined) throw new Error("dict: fncvals: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=4;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8116: text j ( ) putinterval
		var t=this.dstk.get("text");
		if (t===undefined) throw new Error("dict: text: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring(" ");
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		//#line 8117: /i i 4 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=4;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f21(){
		//#line 8119: /i i 1 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f22(){
		//#line 8114: barcode i 1 add get 94 ne {
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=94;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f20;
		//#line 8118: } {
		this.stk[this.ptr++]=$f21;
		//#line 8120: } ifelse
		var t30=this.stk[--this.ptr];
		var t31=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t31.call(this)==-1) return -1;
		} else {
			if (t30.call(this)==-1) return -1;
		}
	}
	function $f23(){
		//#line 8110: i barlen eq {exit} if
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("barlen");
		if (t===undefined) throw new Error("dict: barlen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f19;
		var t29=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t29.call(this)==-1) return -1;
		}
		//#line 8111: /char barcode i get def
		this.stk[this.ptr++]="char"; //ident
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8112: text j char put
		var t=this.dstk.get("text");
		if (t===undefined) throw new Error("dict: text: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("char");
		if (t===undefined) throw new Error("dict: char: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8113: parsefnc char 94 eq and i barlen 4 sub lt and {
		var t=this.dstk.get("parsefnc");
		if (t===undefined) throw new Error("dict: parsefnc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("char");
		if (t===undefined) throw new Error("dict: char: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=94;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("barlen");
		if (t===undefined) throw new Error("dict: barlen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=4;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]<this.stk[this.ptr-1]; this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f22;
		//#line 8121: } if
		var t32=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t32.call(this)==-1) return -1;
		}
		//#line 8122: msg j char put
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("char");
		if (t===undefined) throw new Error("dict: char: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8123: /i i 1 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8124: /j j 1 add def
		this.stk[this.ptr++]="j"; //ident
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f24(){
		//#line 8132: exch get cws exch j exch put
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var t=this.dstk.get("cws");
		if (t===undefined) throw new Error("dict: cws: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8133: /j j 1 add def
		this.stk[this.ptr++]="j"; //ident
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f25(){
		//#line 8139: i msglen eq {exit} if
		return -1;
	}
	function $f26(){
		//#line 8145: /char2 i 1 add msglen lt {msg i 1 add get} {-99} ifelse def
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
	}
	function $f27(){
		//#line 8145: /char2 i 1 add msglen lt {msg i 1 add get} {-99} ifelse def
		this.stk[this.ptr++]=-99;
	}
	function $f28(){
		//#line 8149: char1 cset load enc
		var t=this.dstk.get("char1");
		if (t===undefined) throw new Error("dict: char1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8150: /i i 1 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8151: exit
		return -1;
	}
	function $f29(){
		//#line 8156: sf2 cset load enc
		var t=this.dstk.get("sf2");
		if (t===undefined) throw new Error("dict: sf2: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8157: char1 set2 enc
		var t=this.dstk.get("char1");
		if (t===undefined) throw new Error("dict: char1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("set2");
		if (t===undefined) throw new Error("dict: set2: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8158: /i i 1 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8159: exit
		return -1;
	}
	function $f30(){
		//#line 8165: la1 cset load enc
		var t=this.dstk.get("la1");
		if (t===undefined) throw new Error("dict: la1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8166: /cset (set1) def
		this.stk[this.ptr++]="cset"; //ident
		this.stk[this.ptr++]=BWIPJS.psstring("set1");
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f31(){
		//#line 8168: la0 cset load enc
		var t=this.dstk.get("la0");
		if (t===undefined) throw new Error("dict: la0: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8169: /cset (set0) def
		this.stk[this.ptr++]="cset"; //ident
		this.stk[this.ptr++]=BWIPJS.psstring("set0");
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f32(){
		//#line 8164: cset (set0) eq {
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("set0");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f30;
		//#line 8167: } {
		this.stk[this.ptr++]=$f31;
		//#line 8170: } ifelse
		var t39=this.stk[--this.ptr];
		var t40=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t40.call(this)==-1) return -1;
		} else {
			if (t39.call(this)==-1) return -1;
		}
		//#line 8171: exit
		return -1;
	}
	function $f33(){
		//#line 8174: sf1 cset load enc
		var t=this.dstk.get("sf1");
		if (t===undefined) throw new Error("dict: sf1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8175: char1 set1 enc
		var t=this.dstk.get("char1");
		if (t===undefined) throw new Error("dict: char1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("set1");
		if (t===undefined) throw new Error("dict: set1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f34(){
		//#line 8177: sf0 cset load enc
		var t=this.dstk.get("sf0");
		if (t===undefined) throw new Error("dict: sf0: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8178: char1 set0 enc
		var t=this.dstk.get("char1");
		if (t===undefined) throw new Error("dict: char1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("set0");
		if (t===undefined) throw new Error("dict: set0: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("enc");
		if (t===undefined) throw new Error("dict: enc: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f35(){
		//#line 8173: cset (set0) eq {
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("set0");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f33;
		//#line 8176: } {
		this.stk[this.ptr++]=$f34;
		//#line 8179: } ifelse 
		var t41=this.stk[--this.ptr];
		var t42=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t42.call(this)==-1) return -1;
		} else {
			if (t41.call(this)==-1) return -1;
		}
		//#line 8180: /i i 1 add def
		this.stk[this.ptr++]="i"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8181: exit
		return -1;
	}
	function $f36(){
		//#line 8144: /char1 msg i get def
		this.stk[this.ptr++]="char1"; //ident
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8145: /char2 i 1 add msglen lt {msg i 1 add get} {-99} ifelse def
		this.stk[this.ptr++]="char2"; //ident
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("msglen");
		if (t===undefined) throw new Error("dict: msglen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]<this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=$f26;
		this.stk[this.ptr++]=$f27;
		var t35=this.stk[--this.ptr];
		var t36=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t36.call(this)==-1) return -1;
		} else {
			if (t35.call(this)==-1) return -1;
		}
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8148: cset load char1 known { 
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("char1");
		if (t===undefined) throw new Error("dict: char1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1]]!==undefined; this.ptr--;
		this.stk[this.ptr++]=$f28;
		//#line 8152: } if
		var t37=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t37.call(this)==-1) return -1;
		}
		//#line 8155: set2 char1 known {
		var t=this.dstk.get("set2");
		if (t===undefined) throw new Error("dict: set2: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("char1");
		if (t===undefined) throw new Error("dict: char1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1]]!==undefined; this.ptr--;
		this.stk[this.ptr++]=$f29;
		//#line 8160: } if 
		var t38=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t38.call(this)==-1) return -1;
		}
		//#line 8163: cset load char2 known not {
		var t=this.dstk.get("cset");
		if (t===undefined) throw new Error("dict: cset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get(this.stk[this.ptr-1]);
		if (t===undefined) throw "load: undefined";
		this.stk[this.ptr-1]=t;
		var t=this.dstk.get("char2");
		if (t===undefined) throw new Error("dict: char2: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1]]!==undefined; this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-1]=!this.stk[this.ptr-1];
		else this.stk[this.ptr-1]=~this.stk[this.ptr-1];
		this.stk[this.ptr++]=$f32;
		//#line 8172: } { 
		this.stk[this.ptr++]=$f35;
		//#line 8182: } ifelse
		var t43=this.stk[--this.ptr];
		var t44=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t44.call(this)==-1) return -1;
		} else {
			if (t43.call(this)==-1) return -1;
		}
		//#line 8184: exit
		return -1;
	}
	function $f37(){
		//#line 8139: i msglen eq {exit} if
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("msglen");
		if (t===undefined) throw new Error("dict: msglen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f25;
		var t34=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t34.call(this)==-1) return -1;
		}
		//#line 8141: {  % common exit
		this.stk[this.ptr++]=$f36;
		//#line 8185: } loop
		var t45=this.stk[--this.ptr];
		while (true) {
			if (t45.call(this)==-1) break;
		}
	}
	function $f38(){
		//#line 8099: /fncvals <<
		this.stk[this.ptr++]="fncvals"; //ident
		this.stk[this.ptr++]=Infinity;
		//#line 8100: (FNC1) fn1
		this.stk[this.ptr++]=BWIPJS.psstring("FNC1");
		var t=this.dstk.get("fn1");
		if (t===undefined) throw new Error("dict: fn1: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8101: (FNC2) fn2
		this.stk[this.ptr++]=BWIPJS.psstring("FNC2");
		var t=this.dstk.get("fn2");
		if (t===undefined) throw new Error("dict: fn2: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8102: (FNC3) fn3
		this.stk[this.ptr++]=BWIPJS.psstring("FNC3");
		var t=this.dstk.get("fn3");
		if (t===undefined) throw new Error("dict: fn3: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8103: (FNC4) fn4
		this.stk[this.ptr++]=BWIPJS.psstring("FNC4");
		var t=this.dstk.get("fn4");
		if (t===undefined) throw new Error("dict: fn4: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		//#line 8104: >> def
		var t = {};
		for (var i = this.ptr-1; i >= 1 && this.stk[i] !== Infinity; i-=2) {
			if (this.stk[i-1] === Infinity) throw "dict: malformed stack";
			t[this.stk[i-1]]=this.stk[i];
		}
		if (i < 0 || this.stk[i]!==Infinity) throw "dict: underflow";
		this.ptr = i;
		this.stk[this.ptr++]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8107: /msg barlen array def
		this.stk[this.ptr++]="msg"; //ident
		var t=this.dstk.get("barlen");
		if (t===undefined) throw new Error("dict: barlen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=BWIPJS.psarray(this.stk[this.ptr-1]);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8108: /text barlen string def
		this.stk[this.ptr++]="text"; //ident
		var t=this.dstk.get("barlen");
		if (t===undefined) throw new Error("dict: barlen: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8109: /i 0 def /j 0 def {
		this.stk[this.ptr++]="i"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]="j"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]=$f23;
		//#line 8125: } loop
		var t33=this.stk[--this.ptr];
		while (true) {
			if (t33.call(this)==-1) break;
		}
		//#line 8126: /msg msg 0 j getinterval def
		this.stk[this.ptr++]="msg"; //ident
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8127: /msglen msg length def
		this.stk[this.ptr++]="msglen"; //ident
		var t=this.dstk.get("msg");
		if (t===undefined) throw new Error("dict: msg: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8128: /text text 0 j getinterval def
		this.stk[this.ptr++]="text"; //ident
		var t=this.dstk.get("text");
		if (t===undefined) throw new Error("dict: text: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8131: /enc {
		this.stk[this.ptr++]="enc"; //ident
		this.stk[this.ptr++]=$f24;
		//#line 8134: } bind def
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8136: /cws barcode length 2 mul array def
		this.stk[this.ptr++]="cws"; //ident
		var t=this.dstk.get("barcode");
		if (t===undefined) throw new Error("dict: barcode: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-1]=BWIPJS.psarray(this.stk[this.ptr-1]);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8137: /i 0 def /j 0 def /cset (set0) def
		this.stk[this.ptr++]="i"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]="j"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]="cset"; //ident
		this.stk[this.ptr++]=BWIPJS.psstring("set0");
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8138: {
		this.stk[this.ptr++]=$f37;
		//#line 8187: } loop
		var t46=this.stk[--this.ptr];
		while (true) {
			if (t46.call(this)==-1) break;
		}
		//#line 8188: /cws cws 0 j getinterval def
		this.stk[this.ptr++]="cws"; //ident
		var t=this.dstk.get("cws");
		if (t===undefined) throw new Error("dict: cws: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f39(){
		//#line 8252: /v v 7682 xor def
		this.stk[this.ptr++]="v"; //ident
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=7682;
		if (typeof(this.stk[this.ptr-1])=="boolean")
			this.stk[this.ptr-2]=!this.stk[this.ptr-2]&&this.stk[this.ptr-1] || this.stk[this.ptr-2]&&!this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]^this.stk[this.ptr-1];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f40(){
		//#line 8251: cw v xor 1 and 0 ne {
		var t=this.dstk.get("cw");
		if (t===undefined) throw new Error("dict: cw: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1])=="boolean")
			this.stk[this.ptr-2]=!this.stk[this.ptr-2]&&this.stk[this.ptr-1] || this.stk[this.ptr-2]&&!this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]^this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=1;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f39;
		//#line 8253: } if
		var t48=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t48.call(this)==-1) return -1;
		}
		//#line 8254: /v v -1 bitshift def
		this.stk[this.ptr++]="v"; //ident
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=-1;
		if (this.stk[this.ptr-1]<0) this.stk[this.ptr-2]>>>=-this.stk[this.ptr-1];
		else this.stk[this.ptr-2]<<=this.stk[this.ptr-1];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8255: /cw cw -1 bitshift def
		this.stk[this.ptr++]="cw"; //ident
		var t=this.dstk.get("cw");
		if (t===undefined) throw new Error("dict: cw: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=-1;
		if (this.stk[this.ptr-1]<0) this.stk[this.ptr-2]>>>=-this.stk[this.ptr-1];
		else this.stk[this.ptr-2]<<=this.stk[this.ptr-1];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f41(){
		//#line 8249: /cw exch def
		this.stk[this.ptr++]="cw"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8250: 6 {
		this.stk[this.ptr++]=6;
		this.stk[this.ptr++]=$f40;
		//#line 8256: } repeat 
		var t51=this.stk[--this.ptr];
		var t49=this.stk[--this.ptr];
		for (var t50=0; t50<t49; t50++) {
			if (t51.call(this)==-1) break;
		}
	}
	function $f42(){
		//#line 8263: /v v 292 add def
		this.stk[this.ptr++]="v"; //ident
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=292;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f43(){
		//#line 8261: /v v 1023 and def
		this.stk[this.ptr++]="v"; //ident
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1023;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8262: v 824 gt v 853 lt and {
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=824;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]>this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=853;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]<this.stk[this.ptr-1]; this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f42;
		//#line 8264: } if 
		var t55=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t55.call(this)==-1) return -1;
		}
	}
	function $f44(){
		//#line 8266: /v v 1023 and 45 add def
		this.stk[this.ptr++]="v"; //ident
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1023;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=45;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f45(){
		//#line 8272: sum v eq {exit} if
		return -1;
	}
	function $f46(){
		//#line 8275: /w w 1 add def
		this.stk[this.ptr++]="w"; //ident
		var t=this.dstk.get("w");
		if (t===undefined) throw new Error("dict: w: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8276: d r w 2 add put
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("r");
		if (t===undefined) throw new Error("dict: r: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("w");
		if (t===undefined) throw new Error("dict: w: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8277: /sum t def
		this.stk[this.ptr++]="sum"; //ident
		var t=this.dstk.get("t");
		if (t===undefined) throw new Error("dict: t: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f47(){
		//#line 8280: d r w 2 add put
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("r");
		if (t===undefined) throw new Error("dict: r: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("w");
		if (t===undefined) throw new Error("dict: w: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 8281: /r r 1 add def
		this.stk[this.ptr++]="r"; //ident
		var t=this.dstk.get("r");
		if (t===undefined) throw new Error("dict: r: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8282: /w 0 def
		this.stk[this.ptr++]="w"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f48(){
		//#line 8285: /c c 1 add def
		this.stk[this.ptr++]="c"; //ident
		var t=this.dstk.get("c");
		if (t===undefined) throw new Error("dict: c: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8286: /w w 1 add def
		this.stk[this.ptr++]="w"; //ident
		var t=this.dstk.get("w");
		if (t===undefined) throw new Error("dict: w: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8287: /sum t def
		this.stk[this.ptr++]="sum"; //ident
		var t=this.dstk.get("t");
		if (t===undefined) throw new Error("dict: t: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f49(){
		//#line 8272: sum v eq {exit} if
		var t=this.dstk.get("sum");
		if (t===undefined) throw new Error("dict: sum: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f45;
		var t58=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t58.call(this)==-1) return -1;
		}
		//#line 8273: /t sum c2w r get c get add def
		this.stk[this.ptr++]="t"; //ident
		var t=this.dstk.get("sum");
		if (t===undefined) throw new Error("dict: sum: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("c2w");
		if (t===undefined) throw new Error("dict: c2w: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("r");
		if (t===undefined) throw new Error("dict: r: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var t=this.dstk.get("c");
		if (t===undefined) throw new Error("dict: c: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8274: t v eq {
		var t=this.dstk.get("t");
		if (t===undefined) throw new Error("dict: t: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f46;
		//#line 8278: } if
		var t59=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t59.call(this)==-1) return -1;
		}
		//#line 8279: t v gt {
		var t=this.dstk.get("t");
		if (t===undefined) throw new Error("dict: t: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]>this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=$f47;
		//#line 8283: } if
		var t60=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t60.call(this)==-1) return -1;
		}
		//#line 8284: t v lt {
		var t=this.dstk.get("t");
		if (t===undefined) throw new Error("dict: t: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("v");
		if (t===undefined) throw new Error("dict: v: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]<this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=$f48;
		//#line 8288: } if
		var t61=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t61.call(this)==-1) return -1;
		}
	}
	function $f50(){
		//#line 8290: 20 0 1 4 {d exch get sub} for
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	}
	function $f51(){
		//#line 8293: /d [ d {1 add} forall ] def
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	}
	function $f52(){
		//#line 8293: /d [ d {1 add} forall ] def
		this.stk[this.ptr++]="d"; //ident
		this.stk[this.ptr++]=Infinity;
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=$f51;
		var t70=this.stk[--this.ptr];
		var t69=this.stk[--this.ptr];
		for (t68 in t69) {
			if (t69 instanceof BWIPJS.psstring || t69 instanceof BWIPJS.psarray) {
				if (t68.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t69.get(t68);
			} else {
				this.stk[this.ptr++]=t68;
				this.stk[this.ptr++]=t69[t68];
			}
			if (t70.call(this)==-1) break;
		}
		for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
		if (i < 0) throw "array: underflow";
		var t = this.stk.splice(i+1, this.ptr-1-i);
		this.ptr = i;
		this.stk[this.ptr++]=BWIPJS.psarray(t);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f53(){
		//#line 8297: /i exch def
		this.stk[this.ptr++]="i"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8298: cbs 5 i sub 2 mul 1 add d i get 47 add put
		var t=this.dstk.get("cbs");
		if (t===undefined) throw new Error("dict: cbs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=5;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=47;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
	}
	function $f54(){
		//#line 8307: /i exch def
		this.stk[this.ptr++]="i"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 8308: sbs j encs cws i get get putinterval
		var t=this.dstk.get("sbs");
		if (t===undefined) throw new Error("dict: sbs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("encs");
		if (t===undefined) throw new Error("dict: encs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("cws");
		if (t===undefined) throw new Error("dict: cws: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		//#line 8309: /j j 6 add def
		this.stk[this.ptr++]="j"; //ident
		var t=this.dstk.get("j");
		if (t===undefined) throw new Error("dict: j: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=6;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f55(){
		//#line 8321: /sbs [sbs {48 sub} forall]
		this.stk[this.ptr++]=48;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	}
	function $f56(){
		//#line 8322: /bhs [sbs length 1 add 2 idiv {height} repeat]
		var t=this.dstk.get("height");
		if (t===undefined) throw new Error("dict: height: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f57(){
		//#line 8323: /bbs [sbs length 1 add 2 idiv {0} repeat]
		this.stk[this.ptr++]=0;
	}
	//#line 7955: 20 dict begin                  % Confine variables to local scope
	this.stk[this.ptr++]=20;
	this.stk[this.ptr-1]={};
	this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
	//#line 7957: /options exch def        % We are given an option string
	this.stk[this.ptr++]="options"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7958: /barcode exch def        % We are given a barcode string
	this.stk[this.ptr++]="barcode"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7960: /dontdraw false def
	this.stk[this.ptr++]="dontdraw"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7961: /includetext false def    % Enable/disable text
	this.stk[this.ptr++]="includetext"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7962: /textfont /Courier def
	this.stk[this.ptr++]="textfont"; //ident
	this.stk[this.ptr++]="Courier"; //ident
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7963: /textsize 10 def
	this.stk[this.ptr++]="textsize"; //ident
	this.stk[this.ptr++]=10;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7964: /textxoffset 0 def
	this.stk[this.ptr++]="textxoffset"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7965: /textyoffset -7 def
	this.stk[this.ptr++]="textyoffset"; //ident
	this.stk[this.ptr++]=-7;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7966: /height 1 def
	this.stk[this.ptr++]="height"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7967: /encoding (auto) def
	this.stk[this.ptr++]="encoding"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("auto");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7968: /version (a) def
	this.stk[this.ptr++]="version"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("a");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7969: /checkoffset 0 def
	this.stk[this.ptr++]="checkoffset"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7970: /raw false def
	this.stk[this.ptr++]="raw"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7971: /parse false def
	this.stk[this.ptr++]="parse"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7972: /parsefnc false def
	this.stk[this.ptr++]="parsefnc"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7975: options type /stringtype eq {
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
	//#line 7982: } if
	var t4=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t4.call(this)==-1) return -1;
	}
	//#line 7983: options {def} forall
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
	//#line 7985: /textfont textfont cvlit def
	this.stk[this.ptr++]="textfont"; //ident
	var t=this.dstk.get("textfont");
	if (t===undefined) throw new Error("dict: textfont: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7986: /textsize textsize cvr def
	this.stk[this.ptr++]="textsize"; //ident
	var t=this.dstk.get("textsize");
	if (t===undefined) throw new Error("dict: textsize: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7987: /textxoffset textxoffset cvr def
	this.stk[this.ptr++]="textxoffset"; //ident
	var t=this.dstk.get("textxoffset");
	if (t===undefined) throw new Error("dict: textxoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7988: /textyoffset textyoffset cvr def
	this.stk[this.ptr++]="textyoffset"; //ident
	var t=this.dstk.get("textyoffset");
	if (t===undefined) throw new Error("dict: textyoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7989: /encoding encoding cvlit def
	this.stk[this.ptr++]="encoding"; //ident
	var t=this.dstk.get("encoding");
	if (t===undefined) throw new Error("dict: encoding: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7990: /version version cvlit def
	this.stk[this.ptr++]="version"; //ident
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7991: /checkoffset checkoffset cvi def
	this.stk[this.ptr++]="checkoffset"; //ident
	var t=this.dstk.get("checkoffset");
	if (t===undefined) throw new Error("dict: checkoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseInt(this.stk[this.ptr-1],10);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7992: /height height cvr def
	this.stk[this.ptr++]="height"; //ident
	var t=this.dstk.get("height");
	if (t===undefined) throw new Error("dict: height: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 7995: parse {
	var t=this.dstk.get("parse");
	if (t===undefined) throw new Error("dict: parse: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f9;
	//#line 8013: } if
	var t11=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t11.call(this)==-1) return -1;
	}
	//#line 8015: /barlen barcode length def
	this.stk[this.ptr++]="barlen"; //ident
	var t=this.dstk.get("barcode");
	if (t===undefined) throw new Error("dict: barcode: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8018: /la0  -1 def  /la1  -2 def  /la2  -3 def 
	this.stk[this.ptr++]="la0"; //ident
	this.stk[this.ptr++]=-1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="la1"; //ident
	this.stk[this.ptr++]=-2;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="la2"; //ident
	this.stk[this.ptr++]=-3;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8019: /sf0  -4 def  /sf1  -5 def  /sf2  -6 def 
	this.stk[this.ptr++]="sf0"; //ident
	this.stk[this.ptr++]=-4;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="sf1"; //ident
	this.stk[this.ptr++]=-5;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="sf2"; //ident
	this.stk[this.ptr++]=-6;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8020: /fn1  -7 def  /fn2  -8 def  /fn3  -9 def  /fn4 -10 def
	this.stk[this.ptr++]="fn1"; //ident
	this.stk[this.ptr++]=-7;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="fn2"; //ident
	this.stk[this.ptr++]=-8;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="fn3"; //ident
	this.stk[this.ptr++]=-9;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="fn4"; //ident
	this.stk[this.ptr++]=-10;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8023: <<
	this.stk[this.ptr++]=Infinity;
	//#line 8024: /normal
	this.stk[this.ptr++]="normal"; //ident
	//#line 8025: [
	this.stk[this.ptr++]=Infinity;
	//#line 8027: [ (0)  (^)  (') ]  [ (1)  (;)   27 ]  [ (2)  (<)   28 ]  % 0-2 
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("0"),BWIPJS.psstring("^"),BWIPJS.psstring("'")]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("1"),BWIPJS.psstring(";"),27]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("2"),BWIPJS.psstring("<"),28]);
	//#line 8028: [ (3)  (=)   29 ]  [ (4)  (>)   30 ]  [ (5)  (?)   31 ]  % 3-5
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("3"),BWIPJS.psstring("="),29]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("4"),BWIPJS.psstring(">"),30]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("5"),BWIPJS.psstring("?"),31]);
	//#line 8029: [ (6)  (@)  (!) ]  [ (7)  ([)  (") ]  [ (8)   92  (#) ]  % 6-8
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("6"),BWIPJS.psstring("@"),BWIPJS.psstring("!")]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("7"),BWIPJS.psstring("["),BWIPJS.psstring("\"")]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("8"),92,BWIPJS.psstring("#")]);
	//#line 8030: [ (9)  (])  (&) ]  [ (A)  (a)    1 ]  [ (B)  (b)    2 ]  % 9-11
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("9"),BWIPJS.psstring("]"),BWIPJS.psstring("&")]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("A"),BWIPJS.psstring("a"),1]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("B"),BWIPJS.psstring("b"),2]);
	//#line 8031: [ (C)  (c)    3 ]  [ (D)  (d)    4 ]  [ (E)  (e)    5 ]  % 12-14
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("C"),BWIPJS.psstring("c"),3]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("D"),BWIPJS.psstring("d"),4]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("E"),BWIPJS.psstring("e"),5]);
	//#line 8032: [ (F)  (f)    6 ]  [ (G)  (g)    7 ]  [ (H)  (h)    8 ]  % 15-17
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("F"),BWIPJS.psstring("f"),6]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("G"),BWIPJS.psstring("g"),7]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("H"),BWIPJS.psstring("h"),8]);
	//#line 8033: [ (I)  (i)    9 ]  [ (J)  (j)   10 ]  [ (K)  (k)   11 ]  % 18-20
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("I"),BWIPJS.psstring("i"),9]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("J"),BWIPJS.psstring("j"),10]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("K"),BWIPJS.psstring("k"),11]);
	//#line 8034: [ (L)  (l)   12 ]  [ (M)  (m)   13 ]  [ (N)  (n)   14 ]  % 21-23
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("L"),BWIPJS.psstring("l"),12]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("M"),BWIPJS.psstring("m"),13]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("N"),BWIPJS.psstring("n"),14]);
	//#line 8035: [ (O)  (o)   15 ]  [ (P)  (p)   16 ]  [ (Q)  (q)   17 ]  % 24-26
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("O"),BWIPJS.psstring("o"),15]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("P"),BWIPJS.psstring("p"),16]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("Q"),BWIPJS.psstring("q"),17]);
	//#line 8036: [ (R)  (r)   18 ]  [ (S)  (s)   19 ]  [ (T)  (t)   20 ]  % 27-29
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("R"),BWIPJS.psstring("r"),18]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("S"),BWIPJS.psstring("s"),19]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("T"),BWIPJS.psstring("t"),20]);
	//#line 8037: [ (U)  (u)   21 ]  [ (V)  (v)   22 ]  [ (W)  (w)   23 ]  % 30-32
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("U"),BWIPJS.psstring("u"),21]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("V"),BWIPJS.psstring("v"),22]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("W"),BWIPJS.psstring("w"),23]);
	//#line 8038: [ (X)  (x)   24 ]  [ (Y)  (y)   25 ]  [ (Z)  (z)   26 ]  % 33-35
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("X"),BWIPJS.psstring("x"),24]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("Y"),BWIPJS.psstring("y"),25]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("Z"),BWIPJS.psstring("z"),26]);
	//#line 8039: [ (-)  (_)   40 ]  [ (.)  (`)   41 ]  [ ( )  127    0 ]  % 36-38
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("-"),BWIPJS.psstring("_"),40]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("."),BWIPJS.psstring("`"),41]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring(" "),127,0]);
	//#line 8040: [ ($)  ({)  (*) ]  [ (/)  (|)  (,) ]  [ (+)  (})  (:) ]  % 39-41
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("$"),BWIPJS.psstring("{"),BWIPJS.psstring("*")]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("/"),BWIPJS.psstring("|"),BWIPJS.psstring(",")]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("+"),BWIPJS.psstring("}"),BWIPJS.psstring(":")]);
	//#line 8041: [ (%)  (~)  fn1 ]  [ la1  la0  fn2 ]  [ sf1  sf0  fn3 ]  % 42-44
	this.stk[this.ptr++]=Infinity;
	this.stk[this.ptr++]=BWIPJS.psstring("%");
	this.stk[this.ptr++]=BWIPJS.psstring("~");
	var t=this.dstk.get("fn1");
	if (t===undefined) throw new Error("dict: fn1: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("la1");
	if (t===undefined) throw new Error("dict: la1: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("la0");
	if (t===undefined) throw new Error("dict: la0: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("fn2");
	if (t===undefined) throw new Error("dict: fn2: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("sf1");
	if (t===undefined) throw new Error("dict: sf1: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("sf0");
	if (t===undefined) throw new Error("dict: sf0: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("fn3");
	if (t===undefined) throw new Error("dict: fn3: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8042: [ sf2  sf2  fn4 ]                                        % 45
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("sf2");
	if (t===undefined) throw new Error("dict: sf2: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("sf2");
	if (t===undefined) throw new Error("dict: sf2: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("fn4");
	if (t===undefined) throw new Error("dict: fn4: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8043: ]
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8044: /limited
	this.stk[this.ptr++]="limited"; //ident
	//#line 8045: [
	this.stk[this.ptr++]=Infinity;
	//#line 8046: [ (0)  -98  -98 ]  [ (1)  -98   -98 ]  [ (2)  -98  -98 ]  % 0-2
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("0"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("1"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("2"),-98,-98]);
	//#line 8047: [ (3)  -98  -98 ]  [ (4)  -98   -98 ]  [ (5)  -98  -98 ]  % 3-5
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("3"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("4"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("5"),-98,-98]);
	//#line 8048: [ (6)  -98  -98 ]  [ (7)  -98   -98 ]  [ (8)  -98  -98 ]  % 6-8
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("6"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("7"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("8"),-98,-98]);
	//#line 8049: [ (9)  -98  -98 ]  [ (A)  -98   -98 ]  [ (B)  -98  -98 ]  % 9-11
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("9"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("A"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("B"),-98,-98]);
	//#line 8050: [ (C)  -98  -98 ]  [ (D)  -98   -98 ]  [ (E)  -98  -98 ]  % 12-14
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("C"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("D"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("E"),-98,-98]);
	//#line 8051: [ (F)  -98  -98 ]  [ (G)  -98   -98 ]  [ (H)  -98  -98 ]  % 15-17
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("F"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("G"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("H"),-98,-98]);
	//#line 8052: [ (I)  -98  -98 ]  [ (J)  -98   -98 ]  [ (K)  -98  -98 ]  % 18-20
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("I"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("J"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("K"),-98,-98]);
	//#line 8053: [ (L)  -98  -98 ]  [ (M)  -98   -98 ]  [ (N)  -98  -98 ]  % 21-23
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("L"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("M"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("N"),-98,-98]);
	//#line 8054: [ (O)  -98  -98 ]  [ (P)  -98   -98 ]  [ (Q)  -98  -98 ]  % 24-26
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("O"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("P"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("Q"),-98,-98]);
	//#line 8055: [ (R)  -98  -98 ]  [ (S)  -98   -98 ]  [ (T)  -98  -98 ]  % 27-29
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("R"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("S"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("T"),-98,-98]);
	//#line 8056: [ (U)  -98  -98 ]  [ (V)  -98   -98 ]  [ (W)  -98  -98 ]  % 30-32
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("U"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("V"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("W"),-98,-98]);
	//#line 8057: [ (X)  -98  -98 ]  [ (Y)  -98   -98 ]  [ (Z)  -98  -98 ]  % 33-35
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("X"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("Y"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("Z"),-98,-98]);
	//#line 8058: [ (-)  -98  -98 ]  [ (.)  -98   -98 ]                     % 36-37
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("-"),-98,-98]);
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("."),-98,-98]);
	//#line 8059: ]
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8060: >> 
	var t = {};
	for (var i = this.ptr-1; i >= 1 && this.stk[i] !== Infinity; i-=2) {
		if (this.stk[i-1] === Infinity) throw "dict: malformed stack";
		t[this.stk[i-1]]=this.stk[i];
	}
	if (i < 0 || this.stk[i]!==Infinity) throw "dict: underflow";
	this.ptr = i;
	this.stk[this.ptr++]=t;
	//#line 8061: version (a) eq version (b) eq or {/normal} {/limited} ifelse get 
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("a");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("b");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]||this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]|this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f10;
	this.stk[this.ptr++]=$f11;
	var t12=this.stk[--this.ptr];
	var t13=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t13.call(this)==-1) return -1;
	} else {
		if (t12.call(this)==-1) return -1;
	}
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	//#line 8062: /charmaps exch def
	this.stk[this.ptr++]="charmaps"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8065: /charvals [
	this.stk[this.ptr++]="charvals"; //ident
	this.stk[this.ptr++]=Infinity;
	//#line 8066: charmaps length dict charmaps length dict charmaps length dict
	var t=this.dstk.get("charmaps");
	if (t===undefined) throw new Error("dict: charmaps: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr-1]={};
	var t=this.dstk.get("charmaps");
	if (t===undefined) throw new Error("dict: charmaps: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr-1]={};
	var t=this.dstk.get("charmaps");
	if (t===undefined) throw new Error("dict: charmaps: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr-1]={};
	//#line 8067: ] def
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8068: 0 1 charmaps length 1 sub {
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	var t=this.dstk.get("charmaps");
	if (t===undefined) throw new Error("dict: charmaps: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=$f14;
	//#line 8076: } for
	var t24=this.stk[--this.ptr];
	var t22=this.stk[--this.ptr];
	var t21=this.stk[--this.ptr];
	var t20=this.stk[--this.ptr];
	for (var t23=t20; t21<0 ? t23>=t22 : t23<=t22; t23+=t21) {
		this.stk[this.ptr++]=t23;
		if (t24.call(this)==-1) break;
	}
	//#line 8077: /set0 charvals 0 get def
	this.stk[this.ptr++]="set0"; //ident
	var t=this.dstk.get("charvals");
	if (t===undefined) throw new Error("dict: charvals: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=0;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8078: /set1 charvals 1 get def
	this.stk[this.ptr++]="set1"; //ident
	var t=this.dstk.get("charvals");
	if (t===undefined) throw new Error("dict: charvals: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=1;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8079: /set2 charvals 2 get def
	this.stk[this.ptr++]="set2"; //ident
	var t=this.dstk.get("charvals");
	if (t===undefined) throw new Error("dict: charvals: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=2;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8081: raw {/encoding (raw) def} if
	var t=this.dstk.get("raw");
	if (t===undefined) throw new Error("dict: raw: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f15;
	var t25=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t25.call(this)==-1) return -1;
	}
	//#line 8083: encoding (raw) eq {
	var t=this.dstk.get("encoding");
	if (t===undefined) throw new Error("dict: encoding: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("raw");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f18;
	//#line 8095: } if
	var t28=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t28.call(this)==-1) return -1;
	}
	//#line 8097: encoding (auto) eq { 
	var t=this.dstk.get("encoding");
	if (t===undefined) throw new Error("dict: encoding: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("auto");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f38;
	//#line 8189: } if  % auto encoding
	var t47=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t47.call(this)==-1) return -1;
	}
	//#line 8192: <<   % ";"=11, "<"=12
	this.stk[this.ptr++]=Infinity;
	//#line 8193: /a
	this.stk[this.ptr++]="a"; //ident
	//#line 8194: [ (141112) (131212) (121312) (111412) (131113)
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("141112"),BWIPJS.psstring("131212"),BWIPJS.psstring("121312"),BWIPJS.psstring("111412"),BWIPJS.psstring("131113"),BWIPJS.psstring("121213"),BWIPJS.psstring("111313"),BWIPJS.psstring("121114"),BWIPJS.psstring("111214"),BWIPJS.psstring("111115"),BWIPJS.psstring("181111"),BWIPJS.psstring("171211"),BWIPJS.psstring("161311"),BWIPJS.psstring("151411"),BWIPJS.psstring("141511"),BWIPJS.psstring("131611"),BWIPJS.psstring("121711"),BWIPJS.psstring("111811"),BWIPJS.psstring("171112"),BWIPJS.psstring("161212"),BWIPJS.psstring("151312"),BWIPJS.psstring("141412"),BWIPJS.psstring("131512"),BWIPJS.psstring("121612"),BWIPJS.psstring("111712"),BWIPJS.psstring("161113"),BWIPJS.psstring("151213"),BWIPJS.psstring("141313"),BWIPJS.psstring("131413"),BWIPJS.psstring("121513"),BWIPJS.psstring("111613"),BWIPJS.psstring("151114"),BWIPJS.psstring("141214"),BWIPJS.psstring("131314"),BWIPJS.psstring("121414"),BWIPJS.psstring("111514"),BWIPJS.psstring("141115"),BWIPJS.psstring("131215"),BWIPJS.psstring("121315"),BWIPJS.psstring("111415"),BWIPJS.psstring("131116"),BWIPJS.psstring("121216"),BWIPJS.psstring("111316"),BWIPJS.psstring("121117"),BWIPJS.psstring("111217"),BWIPJS.psstring("111118"),BWIPJS.psstring("1<111112"),BWIPJS.psstring("111111111;1")]);
	//#line 8205: /b
	this.stk[this.ptr++]="b"; //ident
	//#line 8206: [ (151213) (141313) (131413) (121513) (141214)
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("151213"),BWIPJS.psstring("141313"),BWIPJS.psstring("131413"),BWIPJS.psstring("121513"),BWIPJS.psstring("141214"),BWIPJS.psstring("131314"),BWIPJS.psstring("121414"),BWIPJS.psstring("131215"),BWIPJS.psstring("121315"),BWIPJS.psstring("121216"),BWIPJS.psstring("191212"),BWIPJS.psstring("181312"),BWIPJS.psstring("171412"),BWIPJS.psstring("161512"),BWIPJS.psstring("151612"),BWIPJS.psstring("141712"),BWIPJS.psstring("131812"),BWIPJS.psstring("121912"),BWIPJS.psstring("181213"),BWIPJS.psstring("171313"),BWIPJS.psstring("161413"),BWIPJS.psstring("151513"),BWIPJS.psstring("141613"),BWIPJS.psstring("131713"),BWIPJS.psstring("121813"),BWIPJS.psstring("171214"),BWIPJS.psstring("161314"),BWIPJS.psstring("151414"),BWIPJS.psstring("141514"),BWIPJS.psstring("131614"),BWIPJS.psstring("121714"),BWIPJS.psstring("161215"),BWIPJS.psstring("151315"),BWIPJS.psstring("141415"),BWIPJS.psstring("131515"),BWIPJS.psstring("121615"),BWIPJS.psstring("151216"),BWIPJS.psstring("141316"),BWIPJS.psstring("131416"),BWIPJS.psstring("121516"),BWIPJS.psstring("141217"),BWIPJS.psstring("131317"),BWIPJS.psstring("121417"),BWIPJS.psstring("131218"),BWIPJS.psstring("121318"),BWIPJS.psstring("121219"),BWIPJS.psstring("1<121312"),BWIPJS.psstring("121212121<1")]);
	//#line 8217: /limiteda
	this.stk[this.ptr++]="limiteda"; //ident
	//#line 8218: [ (111411) (111312) (111213) (111114) (121311)
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("111411"),BWIPJS.psstring("111312"),BWIPJS.psstring("111213"),BWIPJS.psstring("111114"),BWIPJS.psstring("121311"),BWIPJS.psstring("121212"),BWIPJS.psstring("121113"),BWIPJS.psstring("141111"),BWIPJS.psstring("131211"),BWIPJS.psstring("131112"),BWIPJS.psstring("171111"),BWIPJS.psstring("161211"),BWIPJS.psstring("151311"),BWIPJS.psstring("141411"),BWIPJS.psstring("131511"),BWIPJS.psstring("121611"),BWIPJS.psstring("111711"),BWIPJS.psstring("161112"),BWIPJS.psstring("151212"),BWIPJS.psstring("141312"),BWIPJS.psstring("131412"),BWIPJS.psstring("121512"),BWIPJS.psstring("111612"),BWIPJS.psstring("151113"),BWIPJS.psstring("141213"),BWIPJS.psstring("131313"),BWIPJS.psstring("121413"),BWIPJS.psstring("111513"),BWIPJS.psstring("141114"),BWIPJS.psstring("131214"),BWIPJS.psstring("121314"),BWIPJS.psstring("111414"),BWIPJS.psstring("131115"),BWIPJS.psstring("121215"),BWIPJS.psstring("111315"),BWIPJS.psstring("121116"),BWIPJS.psstring("111216"),BWIPJS.psstring("111117"),BWIPJS.psstring("151111"),BWIPJS.psstring("1")]);
	//#line 8227: /limitedb
	this.stk[this.ptr++]="limitedb"; //ident
	//#line 8228: [ (121512) (121413) (121314) (121215) (131412)
	this.stk[this.ptr++]=BWIPJS.psarray([BWIPJS.psstring("121512"),BWIPJS.psstring("121413"),BWIPJS.psstring("121314"),BWIPJS.psstring("121215"),BWIPJS.psstring("131412"),BWIPJS.psstring("131313"),BWIPJS.psstring("131214"),BWIPJS.psstring("151212"),BWIPJS.psstring("141312"),BWIPJS.psstring("141213"),BWIPJS.psstring("181212"),BWIPJS.psstring("171312"),BWIPJS.psstring("161412"),BWIPJS.psstring("151512"),BWIPJS.psstring("141612"),BWIPJS.psstring("131712"),BWIPJS.psstring("121812"),BWIPJS.psstring("171213"),BWIPJS.psstring("161313"),BWIPJS.psstring("151413"),BWIPJS.psstring("141513"),BWIPJS.psstring("131613"),BWIPJS.psstring("121713"),BWIPJS.psstring("161214"),BWIPJS.psstring("151314"),BWIPJS.psstring("141414"),BWIPJS.psstring("131514"),BWIPJS.psstring("121614"),BWIPJS.psstring("151215"),BWIPJS.psstring("141315"),BWIPJS.psstring("131415"),BWIPJS.psstring("121515"),BWIPJS.psstring("141216"),BWIPJS.psstring("131316"),BWIPJS.psstring("121416"),BWIPJS.psstring("131217"),BWIPJS.psstring("121317"),BWIPJS.psstring("121218"),BWIPJS.psstring("141212"),BWIPJS.psstring("1")]);
	//#line 8237: >>
	var t = {};
	for (var i = this.ptr-1; i >= 1 && this.stk[i] !== Infinity; i-=2) {
		if (this.stk[i-1] === Infinity) throw "dict: malformed stack";
		t[this.stk[i-1]]=this.stk[i];
	}
	if (i < 0 || this.stk[i]!==Infinity) throw "dict: underflow";
	this.ptr = i;
	this.stk[this.ptr++]=t;
	//#line 8238: version get /encs exch def
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	this.stk[this.ptr++]="encs"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8240: /c2w [
	this.stk[this.ptr++]="c2w"; //ident
	this.stk[this.ptr++]=Infinity;
	//#line 8241: [ 495 330 210 126  70  35  15   5 ]
	this.stk[this.ptr++]=BWIPJS.psarray([495,330,210,126,70,35,15,5]);
	//#line 8242: [ 165 120  84  56  35  20  10   4 ]
	this.stk[this.ptr++]=BWIPJS.psarray([165,120,84,56,35,20,10,4]);
	//#line 8243: [  45  36  28  21  15  10   6   3 ] 
	this.stk[this.ptr++]=BWIPJS.psarray([45,36,28,21,15,10,6,3]);
	//#line 8244: [   9   8   7   6   5   4   3   2 ]
	this.stk[this.ptr++]=BWIPJS.psarray([9,8,7,6,5,4,3,2]);
	//#line 8245: [   1   1   1   1   1   1   1   1 ]
	this.stk[this.ptr++]=BWIPJS.psarray([1,1,1,1,1,1,1,1]);
	//#line 8246: ] def
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8247: /v 0 def
	this.stk[this.ptr++]="v"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8248: cws {
	var t=this.dstk.get("cws");
	if (t===undefined) throw new Error("dict: cws: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f41;
	//#line 8257: } forall
	var t54=this.stk[--this.ptr];
	var t53=this.stk[--this.ptr];
	for (t52 in t53) {
		if (t53 instanceof BWIPJS.psstring || t53 instanceof BWIPJS.psarray) {
			if (t52.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t53.get(t52);
		} else {
			this.stk[this.ptr++]=t52;
			this.stk[this.ptr++]=t53[t52];
		}
		if (t54.call(this)==-1) break;
	}
	//#line 8258: /v v checkoffset add def
	this.stk[this.ptr++]="v"; //ident
	var t=this.dstk.get("v");
	if (t===undefined) throw new Error("dict: v: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("checkoffset");
	if (t===undefined) throw new Error("dict: checkoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8260: version (limiteda) eq version (limitedb) eq or {
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("limiteda");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("limitedb");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]||this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]|this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f43;
	//#line 8265: } {
	this.stk[this.ptr++]=$f44;
	//#line 8267: } ifelse
	var t56=this.stk[--this.ptr];
	var t57=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t57.call(this)==-1) return -1;
	} else {
		if (t56.call(this)==-1) return -1;
	}
	//#line 8269: /d [ 2 2 2 2 2 2 ] def
	this.stk[this.ptr++]="d"; //ident
	this.stk[this.ptr++]=BWIPJS.psarray([2,2,2,2,2,2]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8270: /r 0 def /c 0 def /w 0 def /sum 0 def
	this.stk[this.ptr++]="r"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="c"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="w"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="sum"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8271: {
	this.stk[this.ptr++]=$f49;
	//#line 8289: } loop
	var t62=this.stk[--this.ptr];
	while (true) {
		if (t62.call(this)==-1) break;
	}
	//#line 8290: 20 0 1 4 {d exch get sub} for
	this.stk[this.ptr++]=20;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr++]=4;
	this.stk[this.ptr++]=$f50;
	var t67=this.stk[--this.ptr];
	var t65=this.stk[--this.ptr];
	var t64=this.stk[--this.ptr];
	var t63=this.stk[--this.ptr];
	for (var t66=t63; t64<0 ? t66>=t65 : t66<=t65; t66+=t64) {
		this.stk[this.ptr++]=t66;
		if (t67.call(this)==-1) break;
	}
	//#line 8291: d exch 5 exch put
	var t=this.dstk.get("d");
	if (t===undefined) throw new Error("dict: d: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.stk[this.ptr++]=5;
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
		this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
	else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
	this.ptr-=3;
	//#line 8292: version (b) eq version (limitedb) eq or {  
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("b");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	var t=this.dstk.get("version");
	if (t===undefined) throw new Error("dict: version: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("limitedb");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
	this.ptr--;
	if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]||this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]|this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f52;
	//#line 8294: } if
	var t71=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t71.call(this)==-1) return -1;
	}
	//#line 8295: /cbs (111111111111) 12 string copy def
	this.stk[this.ptr++]="cbs"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("111111111111");
	this.stk[this.ptr++]=12;
	this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
	if (typeof(this.stk[this.ptr-1])=="number") {
		for (var n=this.stk[--this.ptr],t=this.ptr+n; this.ptr<t; this.ptr++) this.stk[this.ptr]=this.stk[this.ptr-n];
	} else if (this.stk[this.ptr-1] instanceof BWIPJS.psstring||this.stk[this.ptr-1] instanceof BWIPJS.psarray) {
		this.stk[this.ptr-1].assign(0,this.stk[this.ptr-2]);
		this.stk[this.ptr-2]=this.stk[this.ptr-1].subset(0,this.stk[this.ptr-2].length);
		this.ptr--;
	} else {
		var src=this.stk[this.ptr-2]; var dst=this.stk[this.ptr-1];
		for (var i in src) dst[i]=src[i];
		this.stk[this.ptr-2]=dst;
		this.ptr--;
	}
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8296: 5 -1 0 {
	this.stk[this.ptr++]=5;
	this.stk[this.ptr++]=-1;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=$f53;
	//#line 8299: } for
	var t76=this.stk[--this.ptr];
	var t74=this.stk[--this.ptr];
	var t73=this.stk[--this.ptr];
	var t72=this.stk[--this.ptr];
	for (var t75=t72; t73<0 ? t75>=t74 : t75<=t74; t75+=t73) {
		this.stk[this.ptr++]=t75;
		if (t76.call(this)==-1) break;
	}
	//#line 8302: /sbs cws length 6 mul 31 add string def
	this.stk[this.ptr++]="sbs"; //ident
	var t=this.dstk.get("cws");
	if (t===undefined) throw new Error("dict: cws: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=6;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=31;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8303: encs encs length 2 sub get dup 
	var t=this.dstk.get("encs");
	if (t===undefined) throw new Error("dict: encs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("encs");
	if (t===undefined) throw new Error("dict: encs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
	//#line 8304: sbs exch 0 exch putinterval 
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.stk[this.ptr++]=0;
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
	//#line 8305: length /j exch def
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]="j"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8306: 0 1 cws length 1 sub {
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	var t=this.dstk.get("cws");
	if (t===undefined) throw new Error("dict: cws: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=$f54;
	//#line 8310: } for
	var t81=this.stk[--this.ptr];
	var t79=this.stk[--this.ptr];
	var t78=this.stk[--this.ptr];
	var t77=this.stk[--this.ptr];
	for (var t80=t77; t78<0 ? t80>=t79 : t80<=t79; t80+=t78) {
		this.stk[this.ptr++]=t80;
		if (t81.call(this)==-1) break;
	}
	//#line 8311: sbs j cbs putinterval
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("j");
	if (t===undefined) throw new Error("dict: j: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("cbs");
	if (t===undefined) throw new Error("dict: cbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
	//#line 8312: /j j 12 add def
	this.stk[this.ptr++]="j"; //ident
	var t=this.dstk.get("j");
	if (t===undefined) throw new Error("dict: j: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=12;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8313: encs encs length 1 sub get dup
	var t=this.dstk.get("encs");
	if (t===undefined) throw new Error("dict: encs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("encs");
	if (t===undefined) throw new Error("dict: encs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
	else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
	this.ptr--;
	this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
	//#line 8314: sbs exch j exch putinterval
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	var t=this.dstk.get("j");
	if (t===undefined) throw new Error("dict: j: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
	//#line 8315: length j add /j exch def
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	var t=this.dstk.get("j");
	if (t===undefined) throw new Error("dict: j: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]="j"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8316: /sbs sbs 0 j getinterval def
	this.stk[this.ptr++]="sbs"; //ident
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=0;
	var t=this.dstk.get("j");
	if (t===undefined) throw new Error("dict: j: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 8319: <<
	this.stk[this.ptr++]=Infinity;
	//#line 8320: /ren //renlinear
	this.stk[this.ptr++]="ren"; //ident
	var t=this.dstk.get("renlinear");
	if (t===undefined) throw new Error("//renlinear: undefined");
	this.stk[this.ptr++]=t;
	//#line 8321: /sbs [sbs {48 sub} forall]
	this.stk[this.ptr++]="sbs"; //ident
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f55;
	var t84=this.stk[--this.ptr];
	var t83=this.stk[--this.ptr];
	for (t82 in t83) {
		if (t83 instanceof BWIPJS.psstring || t83 instanceof BWIPJS.psarray) {
			if (t82.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t83.get(t82);
		} else {
			this.stk[this.ptr++]=t82;
			this.stk[this.ptr++]=t83[t82];
		}
		if (t84.call(this)==-1) break;
	}
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8322: /bhs [sbs length 1 add 2 idiv {height} repeat]
	this.stk[this.ptr++]="bhs"; //ident
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
	this.stk[this.ptr++]=$f56;
	var t87=this.stk[--this.ptr];
	var t85=this.stk[--this.ptr];
	for (var t86=0; t86<t85; t86++) {
		if (t87.call(this)==-1) break;
	}
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8323: /bbs [sbs length 1 add 2 idiv {0} repeat]
	this.stk[this.ptr++]="bbs"; //ident
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
	this.stk[this.ptr++]=$f57;
	var t90=this.stk[--this.ptr];
	var t88=this.stk[--this.ptr];
	for (var t89=0; t89<t88; t89++) {
		if (t90.call(this)==-1) break;
	}
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8324: /txt [ [text textxoffset textyoffset textfont textsize] ]
	this.stk[this.ptr++]="txt"; //ident
	this.stk[this.ptr++]=Infinity;
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("text");
	if (t===undefined) throw new Error("dict: text: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("textxoffset");
	if (t===undefined) throw new Error("dict: textxoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("textyoffset");
	if (t===undefined) throw new Error("dict: textyoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("textfont");
	if (t===undefined) throw new Error("dict: textfont: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("textsize");
	if (t===undefined) throw new Error("dict: textsize: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	//#line 8325: /textxalign (center)
	this.stk[this.ptr++]="textxalign"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("center");
	//#line 8326: /opt options
	this.stk[this.ptr++]="opt"; //ident
	var t=this.dstk.get("options");
	if (t===undefined) throw new Error("dict: options: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	//#line 8327: >>
	var t = {};
	for (var i = this.ptr-1; i >= 1 && this.stk[i] !== Infinity; i-=2) {
		if (this.stk[i-1] === Infinity) throw "dict: malformed stack";
		t[this.stk[i-1]]=this.stk[i];
	}
	if (i < 0 || this.stk[i]!==Infinity) throw "dict: underflow";
	this.ptr = i;
	this.stk[this.ptr++]=t;
	//#line 8329: dontdraw not //renlinear if
	var t=this.dstk.get("dontdraw");
	if (t===undefined) throw new Error("dict: dontdraw: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-1]=!this.stk[this.ptr-1];
	else this.stk[this.ptr-1]=~this.stk[this.ptr-1];
	var t=this.dstk.get("renlinear");
	if (t===undefined) throw new Error("//renlinear: undefined");
	this.stk[this.ptr++]=t;
	var t91=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t91.call(this)==-1) return -1;
	}
	//#line 8331: end
	this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
	psstptr = this.ptr;
}
// END OF posicode
