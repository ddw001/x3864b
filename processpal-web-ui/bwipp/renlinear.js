// BEGIN renlinear
BWIPJS.bwipp["renlinear"]=function() {
	function $f0(){
		//#line 101: args {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f1(){
		//#line 102: opt {def} forall 
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f2(){
		//#line 145: h y add maxh gt {/maxh h y add def} if
		this.stk[this.ptr++]="maxh"; //ident
		var t=this.dstk.get("h");
		if (t===undefined) throw new Error("dict: h: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("y");
		if (t===undefined) throw new Error("dict: y: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f3(){
		//#line 140: /h bhs i 2 idiv get 72 mul def  % Height from bhs
		this.stk[this.ptr++]="h"; //ident
		var t=this.dstk.get("bhs");
		if (t===undefined) throw new Error("dict: bhs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=72;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 141: /c d 2 div x add def            % Centre of the bar = x + d/2
		this.stk[this.ptr++]="c"; //ident
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 142: /y bbs i 2 idiv get 72 mul def  % Baseline from bbs
		this.stk[this.ptr++]="y"; //ident
		var t=this.dstk.get("bbs");
		if (t===undefined) throw new Error("dict: bbs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=72;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 143: /w d inkspread sub def          % bar width = digit - inkspread
		this.stk[this.ptr++]="w"; //ident
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("inkspread");
		if (t===undefined) throw new Error("dict: inkspread: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 144: bars i 2 idiv [h c y w] put     % Add the bar entry
		var t=this.dstk.get("bars");
		if (t===undefined) throw new Error("dict: bars: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
		this.stk[this.ptr++]=Infinity;
		var t=this.dstk.get("h");
		if (t===undefined) throw new Error("dict: h: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("c");
		if (t===undefined) throw new Error("dict: c: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("y");
		if (t===undefined) throw new Error("dict: y: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("w");
		if (t===undefined) throw new Error("dict: w: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
		if (i < 0) throw "array: underflow";
		var t = this.stk.splice(i+1, this.ptr-1-i);
		this.ptr = i;
		this.stk[this.ptr++]=BWIPJS.psarray(t);
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
		//#line 145: h y add maxh gt {/maxh h y add def} if
		var t=this.dstk.get("h");
		if (t===undefined) throw new Error("dict: h: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("y");
		if (t===undefined) throw new Error("dict: y: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("maxh");
		if (t===undefined) throw new Error("dict: maxh: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]>this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=$f2;
		var t6=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t6.call(this)==-1) return -1;
		}
	}
	function $f4(){
		//#line 147: bars i 2 idiv -1 put            % Dummy entry
		var t=this.dstk.get("bars");
		if (t===undefined) throw new Error("dict: bars: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
		this.stk[this.ptr++]=-1;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
	}
	function $f5(){
		//#line 138: /d sbs i get barratio mul barratio sub 1 add def  % d=digit*r-r+1
		this.stk[this.ptr++]="d"; //ident
		var t=this.dstk.get("sbs");
		if (t===undefined) throw new Error("dict: sbs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var t=this.dstk.get("barratio");
		if (t===undefined) throw new Error("dict: barratio: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("barratio");
		if (t===undefined) throw new Error("dict: barratio: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 139: sbs i get 0 ne {
		var t=this.dstk.get("sbs");
		if (t===undefined) throw new Error("dict: sbs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f3;
		//#line 146: } {
		this.stk[this.ptr++]=$f4;
		//#line 148: } ifelse
		var t7=this.stk[--this.ptr];
		var t8=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t8.call(this)==-1) return -1;
		} else {
			if (t7.call(this)==-1) return -1;
		}
	}
	function $f6(){
		//#line 150: /d sbs i get spaceratio mul spaceratio sub 1 add def  % d=digit*r-r+1 
		this.stk[this.ptr++]="d"; //ident
		var t=this.dstk.get("sbs");
		if (t===undefined) throw new Error("dict: sbs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var t=this.dstk.get("spaceratio");
		if (t===undefined) throw new Error("dict: spaceratio: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("spaceratio");
		if (t===undefined) throw new Error("dict: spaceratio: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f7(){
		//#line 136: /i exch def
		this.stk[this.ptr++]="i"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 137: i 2 mod 0 eq {           % i is even
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]%this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f5;
		//#line 149: } {
		this.stk[this.ptr++]=$f6;
		//#line 151: } ifelse
		var t9=this.stk[--this.ptr];
		var t10=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t10.call(this)==-1) return -1;
		} else {
			if (t9.call(this)==-1) return -1;
		}
		//#line 152: /x x d add def  % x+=d
		this.stk[this.ptr++]="x"; //ident
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("d");
		if (t===undefined) throw new Error("dict: d: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f8(){
		//#line 161: width 72 mul x div 1 scale
		var t=this.dstk.get("width");
		if (t===undefined) throw new Error("dict: width: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=72;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		var y=this.stk[--this.ptr];
		this.scale(this.stk[--this.ptr],y);
	}
	function $f9(){
		//#line 168: (<      >) 8 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setrgbcolor
		this.stk[this.ptr++]=255;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	}
	function $f10(){
		//#line 168: (<      >) 8 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setrgbcolor
		this.stk[this.ptr++]=BWIPJS.psstring("<      >");
		this.stk[this.ptr++]=8;
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
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr++]=1;
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		var t=this.stk[--this.ptr];
		if (t instanceof Function) t.call(this); else this.eval(t);
		this.stk[this.ptr++]=$f9;
		var t19=this.stk[--this.ptr];
		var t18=this.stk[--this.ptr];
		for (t17 in t18) {
			if (t18 instanceof BWIPJS.psstring || t18 instanceof BWIPJS.psarray) {
				if (t17.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t18.get(t17);
			} else {
				this.stk[this.ptr++]=t17;
				this.stk[this.ptr++]=t18[t17];
			}
			if (t19.call(this)==-1) break;
		}
		this.setrgb(this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1]);
		this.ptr-=3;
	}
	function $f11(){
		//#line 171: (<        >) 10 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setcmykcolor
		this.stk[this.ptr++]=255;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	}
	function $f12(){
		//#line 171: (<        >) 10 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setcmykcolor
		this.stk[this.ptr++]=BWIPJS.psstring("<        >");
		this.stk[this.ptr++]=10;
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
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr++]=1;
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		var t=this.stk[--this.ptr];
		if (t instanceof Function) t.call(this); else this.eval(t);
		this.stk[this.ptr++]=$f11;
		var t23=this.stk[--this.ptr];
		var t22=this.stk[--this.ptr];
		for (t21 in t22) {
			if (t22 instanceof BWIPJS.psstring || t22 instanceof BWIPJS.psarray) {
				if (t21.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t22.get(t21);
			} else {
				this.stk[this.ptr++]=t21;
				this.stk[this.ptr++]=t22[t21];
			}
			if (t23.call(this)==-1) break;
		}
		this.setcmyk(this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1]);
		this.ptr-=4;
	}
	function $f13(){
		//#line 166: /anycolor exch def
		this.stk[this.ptr++]="anycolor"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 167: anycolor length 6 eq {
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=6;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f10;
		//#line 169: } if
		var t20=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t20.call(this)==-1) return -1;
		}
		//#line 170: anycolor length 8 eq {
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=8;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f12;
		//#line 172: } if
		var t24=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t24.call(this)==-1) return -1;
		}
	}
	function $f14(){
		//#line 183: backgroundcolor (unset) ne { gsave backgroundcolor setanycolor fill grestore } if     
		this.gsave();
		var t=this.dstk.get("backgroundcolor");
		if (t===undefined) throw new Error("dict: backgroundcolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("setanycolor");
		if (t===undefined) throw new Error("dict: setanycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.fill();
		this.grestore();
	}
	function $f15(){
		//#line 186: bordercolor (unset) ne { bordercolor setanycolor } if
		var t=this.dstk.get("bordercolor");
		if (t===undefined) throw new Error("dict: bordercolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("setanycolor");
		if (t===undefined) throw new Error("dict: setanycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f16(){
		//#line 190: /textyoffset textyoffset borderwidth textyalign (above) eq { add } { sub } ifelse def
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	}
	function $f17(){
		//#line 190: /textyoffset textyoffset borderwidth textyalign (above) eq { add } { sub } ifelse def
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	}
	function $f18(){
		//#line 185: gsave
		this.gsave();
		//#line 186: bordercolor (unset) ne { bordercolor setanycolor } if
		var t=this.dstk.get("bordercolor");
		if (t===undefined) throw new Error("dict: bordercolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("unset");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f15;
		var t26=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t26.call(this)==-1) return -1;
		}
		//#line 187: borderwidth setlinewidth stroke
		var t=this.dstk.get("borderwidth");
		if (t===undefined) throw new Error("dict: borderwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.setlinewidth(this.stk[--this.ptr]);
		this.stroke();
		//#line 188: grestore
		this.grestore();
		//#line 190: /textyoffset textyoffset borderwidth textyalign (above) eq { add } { sub } ifelse def
		this.stk[this.ptr++]="textyoffset"; //ident
		var t=this.dstk.get("textyoffset");
		if (t===undefined) throw new Error("dict: textyoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("borderwidth");
		if (t===undefined) throw new Error("dict: borderwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textyalign");
		if (t===undefined) throw new Error("dict: textyalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("above");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f16;
		this.stk[this.ptr++]=$f17;
		var t27=this.stk[--this.ptr];
		var t28=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t28.call(this)==-1) return -1;
		} else {
			if (t27.call(this)==-1) return -1;
		}
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f19(){
		//#line 196: barcolor (unset) ne { barcolor setanycolor } if
		var t=this.dstk.get("barcolor");
		if (t===undefined) throw new Error("dict: barcolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("setanycolor");
		if (t===undefined) throw new Error("dict: setanycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f20(){
		//#line 199: aload pop newpath setlinewidth moveto 0 exch rlineto stroke
		var t=this.stk[this.ptr-1];
		for (var i = 0; i < t.length; i++) this.stk[this.ptr-1+i]=t.get(i);
		this.ptr += t.length;
		this.stk[this.ptr-1]=t;
		this.ptr--;
		this.newpath();
		this.setlinewidth(this.stk[--this.ptr]);
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		this.stk[this.ptr++]=0;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		this.stroke();
	}
	function $f21(){
		//#line 201: pop
		this.ptr--;
	}
	function $f22(){
		//#line 198: dup -1 ne {
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr++]=-1;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f20;
		//#line 200: } {
		this.stk[this.ptr++]=$f21;
		//#line 202: } ifelse
		var t31=this.stk[--this.ptr];
		var t32=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t32.call(this)==-1) return -1;
		} else {
			if (t31.call(this)==-1) return -1;
		}
	}
	function $f23(){
		//#line 207: textcolor (unset) ne { textcolor setanycolor } if
		var t=this.dstk.get("textcolor");
		if (t===undefined) throw new Error("dict: textcolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("setanycolor");
		if (t===undefined) throw new Error("dict: setanycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f24(){
	}
	function $f25(){
		//#line 214: 2 copy /s exch def /f exch def            
		this.stk[this.ptr++]=2;
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
		this.stk[this.ptr++]="s"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]="f"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 215: exch findfont exch scalefont setfont          
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr-1]=this.findfont(BWIPJS.psstring(this.stk[this.ptr-1]));
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.ptr--; this.stk[this.ptr-1].FontSize = this.stk[this.ptr];
		this.setfont(this.stk[--this.ptr]);
	}
	function $f26(){
		//#line 217: pop pop
		this.ptr--;
		this.ptr--;
	}
	function $f27(){
		//#line 220: showborder { borderwidth sub } if
		var t=this.dstk.get("borderwidth");
		if (t===undefined) throw new Error("dict: borderwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	}
	function $f28(){
		//#line 212: {} forall
		this.stk[this.ptr++]=$f24;
		var t39=this.stk[--this.ptr];
		var t38=this.stk[--this.ptr];
		for (t37 in t38) {
			if (t38 instanceof BWIPJS.psstring || t38 instanceof BWIPJS.psarray) {
				if (t37.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t38.get(t37);
			} else {
				this.stk[this.ptr++]=t37;
				this.stk[this.ptr++]=t38[t37];
			}
			if (t39.call(this)==-1) break;
		}
		//#line 213: 2 copy s ne exch f ne or {
		this.stk[this.ptr++]=2;
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
		var t=this.dstk.get("s");
		if (t===undefined) throw new Error("dict: s: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		var t=this.dstk.get("f");
		if (t===undefined) throw new Error("dict: f: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]||this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]|this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f25;
		//#line 216: } {
		this.stk[this.ptr++]=$f26;
		//#line 218: } ifelse
		var t40=this.stk[--this.ptr];
		var t41=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t41.call(this)==-1) return -1;
		} else {
			if (t40.call(this)==-1) return -1;
		}
		//#line 220: showborder { borderwidth sub } if
		var t=this.dstk.get("showborder");
		if (t===undefined) throw new Error("dict: showborder: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=$f27;
		var t42=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t42.call(this)==-1) return -1;
		}
		//#line 221: moveto show
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		this.show(this.stk[--this.ptr],0,0);
	}
	function $f29(){
		//#line 210: /s 0 def /f () def
		this.stk[this.ptr++]="s"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		this.stk[this.ptr++]="f"; //ident
		this.stk[this.ptr++]=BWIPJS.psstring("");
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 211: txt {
		var t=this.dstk.get("txt");
		if (t===undefined) throw new Error("dict: txt: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=$f28;
		//#line 222: } forall
		var t45=this.stk[--this.ptr];
		var t44=this.stk[--this.ptr];
		for (t43 in t44) {
			if (t44 instanceof BWIPJS.psstring || t44 instanceof BWIPJS.psarray) {
				if (t43.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t44.get(t43);
			} else {
				this.stk[this.ptr++]=t43;
				this.stk[this.ptr++]=t44[t43];
			}
			if (t45.call(this)==-1) break;
		}
	}
	function $f30(){
	}
	function $f31(){
		//#line 226: /txt [ txt { 0 get {} forall } forall ] def
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=$f30;
		var t48=this.stk[--this.ptr];
		var t47=this.stk[--this.ptr];
		for (t46 in t47) {
			if (t47 instanceof BWIPJS.psstring || t47 instanceof BWIPJS.psarray) {
				if (t46.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t47.get(t46);
			} else {
				this.stk[this.ptr++]=t46;
				this.stk[this.ptr++]=t47[t46];
			}
			if (t48.call(this)==-1) break;
		}
	}
	function $f32(){
		//#line 228: 0 1 txt length 1 sub { dup txt exch get tstr 3 1 roll put } for
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		var t=this.dstk.get("txt");
		if (t===undefined) throw new Error("dict: txt: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var t=this.dstk.get("tstr");
		if (t===undefined) throw new Error("dict: tstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=3;
		this.stk[this.ptr++]=1;
		var b=this.stk[--this.ptr]; var a=this.stk[--this.ptr];
		if (a > this.ptr) throw "roll: underflow: this.ptr="+this.ptr+",offset="+a;
		if (b < 0) var t=this.stk.splice(this.ptr-a, -b);
		else var t=this.stk.splice(this.ptr-a, a-b);
		this.stk.splice.apply(this.stk, [this.ptr-t.length, 0].concat(t));
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
	}
	function $f33(){
		//#line 226: /txt [ txt { 0 get {} forall } forall ] def
		this.stk[this.ptr++]="txt"; //ident
		this.stk[this.ptr++]=Infinity;
		var t=this.dstk.get("txt");
		if (t===undefined) throw new Error("dict: txt: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=$f31;
		var t51=this.stk[--this.ptr];
		var t50=this.stk[--this.ptr];
		for (t49 in t50) {
			if (t50 instanceof BWIPJS.psstring || t50 instanceof BWIPJS.psarray) {
				if (t49.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t50.get(t49);
			} else {
				this.stk[this.ptr++]=t49;
				this.stk[this.ptr++]=t50[t49];
			}
			if (t51.call(this)==-1) break;
		}
		for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
		if (i < 0) throw "array: underflow";
		var t = this.stk.splice(i+1, this.ptr-1-i);
		this.ptr = i;
		this.stk[this.ptr++]=BWIPJS.psarray(t);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 227: /tstr txt length string def
		this.stk[this.ptr++]="tstr"; //ident
		var t=this.dstk.get("txt");
		if (t===undefined) throw new Error("dict: txt: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 228: 0 1 txt length 1 sub { dup txt exch get tstr 3 1 roll put } for
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=1;
		var t=this.dstk.get("txt");
		if (t===undefined) throw new Error("dict: txt: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=$f32;
		var t56=this.stk[--this.ptr];
		var t54=this.stk[--this.ptr];
		var t53=this.stk[--this.ptr];
		var t52=this.stk[--this.ptr];
		for (var t55=t52; t53<0 ? t55>=t54 : t55<=t54; t55+=t53) {
			this.stk[this.ptr++]=t55;
			if (t56.call(this)==-1) break;
		}
	}
	function $f34(){
		//#line 230: /tstr alttext def
		this.stk[this.ptr++]="tstr"; //ident
		var t=this.dstk.get("alttext");
		if (t===undefined) throw new Error("dict: alttext: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f35(){
		//#line 235: 0
		this.stk[this.ptr++]=0;
	}
	function $f36(){
		//#line 241: currentfont /PaintType known {currentfont /PaintType get 2 eq} {false} ifelse
		this.stk[this.ptr++]=this.currentfont();
		this.stk[this.ptr++]="PaintType"; //ident
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=2;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
	}
	function $f37(){
		//#line 241: currentfont /PaintType known {currentfont /PaintType get 2 eq} {false} ifelse
		this.stk[this.ptr++]=false;
	}
	function $f38(){
		//#line 243: currentfont /StrokeWidth get 2 div 0 exch
		this.stk[this.ptr++]=this.currentfont();
		this.stk[this.ptr++]="StrokeWidth"; //ident
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=0;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		//#line 244: currentfont /FontMatrix get dtransform
		this.stk[this.ptr++]=this.currentfont();
		this.stk[this.ptr++]="FontMatrix"; //ident
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		var m=(BWIPJS.pstype(this.stk[this.ptr-1])=="arraytype"?this.stk[--this.ptr]:null);
		var dx=this.stk[this.ptr-2]; var dy=this.stk[this.ptr-1];
		var t=this.dtransform(m,dx,dy);
		this.stk[this.ptr-2]=t.dx; this.stk[this.ptr-1]=t.dy;
		//#line 245: dup mul exch dup mul add sqrt
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-1]=Math.sqrt(this.stk[this.ptr-1]);
		//#line 246: add
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	}
	function $f39(){
		//#line 237: gsave
		this.gsave();
		//#line 238: newpath 0 0 moveto (0) false charpath pathbbox
		this.newpath();
		this.stk[this.ptr++]=0;
		this.stk[this.ptr++]=0;
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		this.stk[this.ptr++]=BWIPJS.psstring("0");
		this.stk[this.ptr++]=false;
		this.charpath(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		var t=this.pathbbox();
		this.stk[this.ptr++]=t.llx; this.stk[this.ptr++]=t.lly;
		this.stk[this.ptr++]=t.urx; this.stk[this.ptr++]=t.ury;
		//#line 239: 4 1 roll pop pop pop
		this.stk[this.ptr++]=4;
		this.stk[this.ptr++]=1;
		var b=this.stk[--this.ptr]; var a=this.stk[--this.ptr];
		if (a > this.ptr) throw "roll: underflow: this.ptr="+this.ptr+",offset="+a;
		if (b < 0) var t=this.stk.splice(this.ptr-a, -b);
		else var t=this.stk.splice(this.ptr-a, a-b);
		this.stk.splice.apply(this.stk, [this.ptr-t.length, 0].concat(t));
		this.ptr--;
		this.ptr--;
		this.ptr--;
		//#line 240: grestore
		this.grestore();
		//#line 241: currentfont /PaintType known {currentfont /PaintType get 2 eq} {false} ifelse
		this.stk[this.ptr++]=this.currentfont();
		this.stk[this.ptr++]="PaintType"; //ident
		this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1]]!==undefined; this.ptr--;
		this.stk[this.ptr++]=$f36;
		this.stk[this.ptr++]=$f37;
		var t59=this.stk[--this.ptr];
		var t60=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t60.call(this)==-1) return -1;
		} else {
			if (t59.call(this)==-1) return -1;
		}
		//#line 242: currentfont /StrokeWidth known and {
		this.stk[this.ptr++]=this.currentfont();
		this.stk[this.ptr++]="StrokeWidth"; //ident
		this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1]]!==undefined; this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f38;
		//#line 247: } if
		var t61=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t61.call(this)==-1) return -1;
		}
	}
	function $f40(){
		//#line 253: textxalign (left) eq { /textxpos textxoffset def } if
		this.stk[this.ptr++]="textxpos"; //ident
		var t=this.dstk.get("textxoffset");
		if (t===undefined) throw new Error("dict: textxoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f41(){
		//#line 254: textxalign (right) eq { /textxpos x textxoffset sub textwidth sub def } if
		this.stk[this.ptr++]="textxpos"; //ident
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textxoffset");
		if (t===undefined) throw new Error("dict: textxoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("textwidth");
		if (t===undefined) throw new Error("dict: textwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f42(){
		//#line 255: textxalign (offleft) eq { /textxpos textwidth textxoffset add neg def } if
		this.stk[this.ptr++]="textxpos"; //ident
		var t=this.dstk.get("textwidth");
		if (t===undefined) throw new Error("dict: textwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textxoffset");
		if (t===undefined) throw new Error("dict: textxoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-1]=-this.stk[this.ptr-1];
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f43(){
		//#line 256: textxalign (offright) eq { /textxpos x textxoffset add def } if
		this.stk[this.ptr++]="textxpos"; //ident
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textxoffset");
		if (t===undefined) throw new Error("dict: textxoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f44(){
		//#line 258: /textxpos 0 def
		this.stk[this.ptr++]="textxpos"; //ident
		this.stk[this.ptr++]=0;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 259: /textgaps x textwidth sub tstr length 1 sub div def
		this.stk[this.ptr++]="textgaps"; //ident
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textwidth");
		if (t===undefined) throw new Error("dict: textwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("tstr");
		if (t===undefined) throw new Error("dict: tstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f45(){
		//#line 262: textyalign (above) eq { /textypos textyoffset maxh add 1 add def } if
		this.stk[this.ptr++]="textypos"; //ident
		var t=this.dstk.get("textyoffset");
		if (t===undefined) throw new Error("dict: textyoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("maxh");
		if (t===undefined) throw new Error("dict: maxh: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f46(){
		//#line 263: textyalign (center) eq { /textypos textyoffset maxh textascent sub 2 div add def } if
		this.stk[this.ptr++]="textypos"; //ident
		var t=this.dstk.get("textyoffset");
		if (t===undefined) throw new Error("dict: textyoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("maxh");
		if (t===undefined) throw new Error("dict: maxh: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textascent");
		if (t===undefined) throw new Error("dict: textascent: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f47(){
		//#line 224: textfont findfont textsize scalefont setfont
		var t=this.dstk.get("textfont");
		if (t===undefined) throw new Error("dict: textfont: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=this.findfont(BWIPJS.psstring(this.stk[this.ptr-1]));
		var t=this.dstk.get("textsize");
		if (t===undefined) throw new Error("dict: textsize: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.ptr--; this.stk[this.ptr-1].FontSize = this.stk[this.ptr];
		this.setfont(this.stk[--this.ptr]);
		//#line 225: alttext () eq {
		var t=this.dstk.get("alttext");
		if (t===undefined) throw new Error("dict: alttext: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f33;
		//#line 229: } {
		this.stk[this.ptr++]=$f34;
		//#line 231: } ifelse
		var t57=this.stk[--this.ptr];
		var t58=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t58.call(this)==-1) return -1;
		} else {
			if (t57.call(this)==-1) return -1;
		}
		//#line 234: tstr length 0 eq {
		var t=this.dstk.get("tstr");
		if (t===undefined) throw new Error("dict: tstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f35;
		//#line 236: } {
		this.stk[this.ptr++]=$f39;
		//#line 248: } ifelse
		var t62=this.stk[--this.ptr];
		var t63=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t63.call(this)==-1) return -1;
		} else {
			if (t62.call(this)==-1) return -1;
		}
		//#line 249: /textascent exch def
		this.stk[this.ptr++]="textascent"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 250: /textwidth tstr stringwidth pop tstr length 1 sub textgaps mul add def
		this.stk[this.ptr++]="textwidth"; //ident
		var t=this.dstk.get("tstr");
		if (t===undefined) throw new Error("dict: tstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.stringwidth(this.stk[--this.ptr]);
		this.stk[this.ptr++]=t.w; this.stk[this.ptr++]=t.h;
		this.ptr--;
		var t=this.dstk.get("tstr");
		if (t===undefined) throw new Error("dict: tstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("textgaps");
		if (t===undefined) throw new Error("dict: textgaps: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 252: /textxpos textxoffset x textwidth sub 2 div add def
		this.stk[this.ptr++]="textxpos"; //ident
		var t=this.dstk.get("textxoffset");
		if (t===undefined) throw new Error("dict: textxoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textwidth");
		if (t===undefined) throw new Error("dict: textwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 253: textxalign (left) eq { /textxpos textxoffset def } if
		var t=this.dstk.get("textxalign");
		if (t===undefined) throw new Error("dict: textxalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("left");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f40;
		var t64=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t64.call(this)==-1) return -1;
		}
		//#line 254: textxalign (right) eq { /textxpos x textxoffset sub textwidth sub def } if
		var t=this.dstk.get("textxalign");
		if (t===undefined) throw new Error("dict: textxalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("right");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f41;
		var t65=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t65.call(this)==-1) return -1;
		}
		//#line 255: textxalign (offleft) eq { /textxpos textwidth textxoffset add neg def } if
		var t=this.dstk.get("textxalign");
		if (t===undefined) throw new Error("dict: textxalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("offleft");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f42;
		var t66=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t66.call(this)==-1) return -1;
		}
		//#line 256: textxalign (offright) eq { /textxpos x textxoffset add def } if
		var t=this.dstk.get("textxalign");
		if (t===undefined) throw new Error("dict: textxalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("offright");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f43;
		var t67=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t67.call(this)==-1) return -1;
		}
		//#line 257: textxalign (justify) eq textwidth x lt and {
		var t=this.dstk.get("textxalign");
		if (t===undefined) throw new Error("dict: textxalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("justify");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		var t=this.dstk.get("textwidth");
		if (t===undefined) throw new Error("dict: textwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]<this.stk[this.ptr-1]; this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f44;
		//#line 260: } if
		var t68=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t68.call(this)==-1) return -1;
		}
		//#line 261: /textypos textyoffset textascent add 1 add neg def
		this.stk[this.ptr++]="textypos"; //ident
		var t=this.dstk.get("textyoffset");
		if (t===undefined) throw new Error("dict: textyoffset: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textascent");
		if (t===undefined) throw new Error("dict: textascent: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr++]=1;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-1]=-this.stk[this.ptr-1];
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 262: textyalign (above) eq { /textypos textyoffset maxh add 1 add def } if
		var t=this.dstk.get("textyalign");
		if (t===undefined) throw new Error("dict: textyalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("above");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f45;
		var t69=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t69.call(this)==-1) return -1;
		}
		//#line 263: textyalign (center) eq { /textypos textyoffset maxh textascent sub 2 div add def } if
		var t=this.dstk.get("textyalign");
		if (t===undefined) throw new Error("dict: textyalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("center");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f46;
		var t70=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t70.call(this)==-1) return -1;
		}
		//#line 264: textxpos textypos moveto textgaps 0 tstr ashow
		var t=this.dstk.get("textxpos");
		if (t===undefined) throw new Error("dict: textxpos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("textypos");
		if (t===undefined) throw new Error("dict: textypos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		var t=this.dstk.get("textgaps");
		if (t===undefined) throw new Error("dict: textgaps: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		var t=this.dstk.get("tstr");
		if (t===undefined) throw new Error("dict: tstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.show(this.stk[this.ptr-1],this.stk[this.ptr-3],this.stk[this.ptr-2]); this.ptr-=3;
	}
	function $f48(){
		//#line 209: textxalign (unset) eq textyalign (unset) eq and alttext () eq and {
		var t=this.dstk.get("textxalign");
		if (t===undefined) throw new Error("dict: textxalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("unset");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		var t=this.dstk.get("textyalign");
		if (t===undefined) throw new Error("dict: textyalign: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("unset");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		var t=this.dstk.get("alttext");
		if (t===undefined) throw new Error("dict: alttext: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=BWIPJS.psstring("");
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		if (typeof(this.stk[this.ptr-1])=="boolean") this.stk[this.ptr-2]=this.stk[this.ptr-2]&&this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]&this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f29;
		//#line 223: } {
		this.stk[this.ptr++]=$f47;
		//#line 265: } ifelse
		var t71=this.stk[--this.ptr];
		var t72=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t72.call(this)==-1) return -1;
		} else {
			if (t71.call(this)==-1) return -1;
		}
	}
	function $f49(){
		//#line 272: newpath
		this.newpath();
		//#line 273: guardleftpos neg guardwidth add guardleftypos guardwidth 2 div add moveto
		var t=this.dstk.get("guardleftpos");
		if (t===undefined) throw new Error("dict: guardleftpos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=-this.stk[this.ptr-1];
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("guardleftypos");
		if (t===undefined) throw new Error("dict: guardleftypos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		//#line 274: guardwidth neg guardheight -2 div rlineto
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=-this.stk[this.ptr-1];
		var t=this.dstk.get("guardheight");
		if (t===undefined) throw new Error("dict: guardheight: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=-2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 275: guardwidth guardheight -2 div rlineto
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("guardheight");
		if (t===undefined) throw new Error("dict: guardheight: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=-2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 276: stroke            
		this.stroke();
	}
	function $f50(){
		//#line 279: newpath
		this.newpath();
		//#line 280: guardrightpos x add guardwidth sub guardrightypos guardheight 2 div add moveto
		var t=this.dstk.get("guardrightpos");
		if (t===undefined) throw new Error("dict: guardrightpos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("x");
		if (t===undefined) throw new Error("dict: x: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("guardrightypos");
		if (t===undefined) throw new Error("dict: guardrightypos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("guardheight");
		if (t===undefined) throw new Error("dict: guardheight: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		var y=this.stk[--this.ptr];
		this.moveto(this.stk[--this.ptr],y);
		//#line 281: guardwidth guardheight -2 div rlineto
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("guardheight");
		if (t===undefined) throw new Error("dict: guardheight: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=-2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 282: guardwidth neg guardheight -2 div rlineto
		var t=this.dstk.get("guardwidth");
		if (t===undefined) throw new Error("dict: guardwidth: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-1]=-this.stk[this.ptr-1];
		var t=this.dstk.get("guardheight");
		if (t===undefined) throw new Error("dict: guardheight: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=-2;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
		var y=this.stk[--this.ptr];
		this.rlineto(this.stk[--this.ptr],y);
		//#line 283: stroke            
		this.stroke();
	}
	function $f51(){
		//#line 270: 0.75 setlinewidth
		this.stk[this.ptr++]=0.75;
		this.setlinewidth(this.stk[--this.ptr]);
		//#line 271: guardleftpos 0 ne {
		var t=this.dstk.get("guardleftpos");
		if (t===undefined) throw new Error("dict: guardleftpos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f49;
		//#line 277: } if
		var t74=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t74.call(this)==-1) return -1;
		}
		//#line 278: guardrightpos 0 ne {
		var t=this.dstk.get("guardrightpos");
		if (t===undefined) throw new Error("dict: guardrightpos: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=0;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f50;
		//#line 284: } if
		var t75=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t75.call(this)==-1) return -1;
		}
	}
	//#line 60: 20 dict begin          % Confine variables to local scope
	this.stk[this.ptr++]=20;
	this.stk[this.ptr-1]={};
	this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
	//#line 62: /args exch def   % We are given some arguments
	this.stk[this.ptr++]="args"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 65: /sbs [] def
	this.stk[this.ptr++]="sbs"; //ident
	this.stk[this.ptr++]=BWIPJS.psarray([]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 66: /bhs [] def
	this.stk[this.ptr++]="bhs"; //ident
	this.stk[this.ptr++]=BWIPJS.psarray([]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 67: /bbs [] def
	this.stk[this.ptr++]="bbs"; //ident
	this.stk[this.ptr++]=BWIPJS.psarray([]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 68: /txt [] def
	this.stk[this.ptr++]="txt"; //ident
	this.stk[this.ptr++]=BWIPJS.psarray([]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 69: /barcolor (unset) def
	this.stk[this.ptr++]="barcolor"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 70: /includetext false def
	this.stk[this.ptr++]="includetext"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 71: /textcolor (unset) def
	this.stk[this.ptr++]="textcolor"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 72: /textxalign (unset) def
	this.stk[this.ptr++]="textxalign"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 73: /textyalign (unset) def
	this.stk[this.ptr++]="textyalign"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 74: /textfont (Courier) def
	this.stk[this.ptr++]="textfont"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("Courier");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 75: /textsize 10 def
	this.stk[this.ptr++]="textsize"; //ident
	this.stk[this.ptr++]=10;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 76: /textxoffset 0 def
	this.stk[this.ptr++]="textxoffset"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 77: /textyoffset 0 def
	this.stk[this.ptr++]="textyoffset"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 78: /textgaps 0 def
	this.stk[this.ptr++]="textgaps"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 79: /alttext () def
	this.stk[this.ptr++]="alttext"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 80: /bordercolor (unset) def
	this.stk[this.ptr++]="bordercolor"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 81: /backgroundcolor (unset) def
	this.stk[this.ptr++]="backgroundcolor"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 82: /inkspread 0.15 def
	this.stk[this.ptr++]="inkspread"; //ident
	this.stk[this.ptr++]=0.15;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 83: /width 0 def
	this.stk[this.ptr++]="width"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 84: /barratio 1 def
	this.stk[this.ptr++]="barratio"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 85: /spaceratio 1 def
	this.stk[this.ptr++]="spaceratio"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 86: /showborder false def
	this.stk[this.ptr++]="showborder"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 87: /borderleft 10 def
	this.stk[this.ptr++]="borderleft"; //ident
	this.stk[this.ptr++]=10;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 88: /borderright 10 def
	this.stk[this.ptr++]="borderright"; //ident
	this.stk[this.ptr++]=10;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 89: /bordertop 1 def
	this.stk[this.ptr++]="bordertop"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 90: /borderbottom 1 def
	this.stk[this.ptr++]="borderbottom"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 91: /borderwidth 0.5 def
	this.stk[this.ptr++]="borderwidth"; //ident
	this.stk[this.ptr++]=0.5;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 92: /guardwhitespace false def
	this.stk[this.ptr++]="guardwhitespace"; //ident
	this.stk[this.ptr++]=false;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 93: /guardleftpos 0 def
	this.stk[this.ptr++]="guardleftpos"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 94: /guardleftypos 0 def
	this.stk[this.ptr++]="guardleftypos"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 95: /guardrightpos 0 def
	this.stk[this.ptr++]="guardrightpos"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 96: /guardrightypos 0 def
	this.stk[this.ptr++]="guardrightypos"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 97: /guardwidth 6 def
	this.stk[this.ptr++]="guardwidth"; //ident
	this.stk[this.ptr++]=6;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 98: /guardheight 7 def
	this.stk[this.ptr++]="guardheight"; //ident
	this.stk[this.ptr++]=7;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 101: args {def} forall
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
	//#line 102: opt {def} forall 
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
	//#line 104: /barcolor barcolor cvlit def
	this.stk[this.ptr++]="barcolor"; //ident
	var t=this.dstk.get("barcolor");
	if (t===undefined) throw new Error("dict: barcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 105: /textcolor textcolor cvlit def
	this.stk[this.ptr++]="textcolor"; //ident
	var t=this.dstk.get("textcolor");
	if (t===undefined) throw new Error("dict: textcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 106: /textxalign textxalign cvlit def
	this.stk[this.ptr++]="textxalign"; //ident
	var t=this.dstk.get("textxalign");
	if (t===undefined) throw new Error("dict: textxalign: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 107: /textyalign textyalign cvlit def
	this.stk[this.ptr++]="textyalign"; //ident
	var t=this.dstk.get("textyalign");
	if (t===undefined) throw new Error("dict: textyalign: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 108: /textfont textfont cvlit def
	this.stk[this.ptr++]="textfont"; //ident
	var t=this.dstk.get("textfont");
	if (t===undefined) throw new Error("dict: textfont: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 109: /textsize textsize cvr def
	this.stk[this.ptr++]="textsize"; //ident
	var t=this.dstk.get("textsize");
	if (t===undefined) throw new Error("dict: textsize: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 110: /textxoffset textxoffset cvr def
	this.stk[this.ptr++]="textxoffset"; //ident
	var t=this.dstk.get("textxoffset");
	if (t===undefined) throw new Error("dict: textxoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 111: /textyoffset textyoffset cvr def
	this.stk[this.ptr++]="textyoffset"; //ident
	var t=this.dstk.get("textyoffset");
	if (t===undefined) throw new Error("dict: textyoffset: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 112: /textgaps textgaps cvr def
	this.stk[this.ptr++]="textgaps"; //ident
	var t=this.dstk.get("textgaps");
	if (t===undefined) throw new Error("dict: textgaps: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 113: /alttext alttext cvlit def
	this.stk[this.ptr++]="alttext"; //ident
	var t=this.dstk.get("alttext");
	if (t===undefined) throw new Error("dict: alttext: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 114: /bordercolor bordercolor cvlit def
	this.stk[this.ptr++]="bordercolor"; //ident
	var t=this.dstk.get("bordercolor");
	if (t===undefined) throw new Error("dict: bordercolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 115: /backgroundcolor backgroundcolor cvlit def
	this.stk[this.ptr++]="backgroundcolor"; //ident
	var t=this.dstk.get("backgroundcolor");
	if (t===undefined) throw new Error("dict: backgroundcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 116: /inkspread inkspread cvr def
	this.stk[this.ptr++]="inkspread"; //ident
	var t=this.dstk.get("inkspread");
	if (t===undefined) throw new Error("dict: inkspread: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 117: /width width cvr def
	this.stk[this.ptr++]="width"; //ident
	var t=this.dstk.get("width");
	if (t===undefined) throw new Error("dict: width: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 118: /barratio barratio cvr def
	this.stk[this.ptr++]="barratio"; //ident
	var t=this.dstk.get("barratio");
	if (t===undefined) throw new Error("dict: barratio: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 119: /spaceratio spaceratio cvr def
	this.stk[this.ptr++]="spaceratio"; //ident
	var t=this.dstk.get("spaceratio");
	if (t===undefined) throw new Error("dict: spaceratio: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 120: /borderleft borderleft cvr def
	this.stk[this.ptr++]="borderleft"; //ident
	var t=this.dstk.get("borderleft");
	if (t===undefined) throw new Error("dict: borderleft: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 121: /borderright borderright cvr def
	this.stk[this.ptr++]="borderright"; //ident
	var t=this.dstk.get("borderright");
	if (t===undefined) throw new Error("dict: borderright: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 122: /bordertop bordertop cvr def
	this.stk[this.ptr++]="bordertop"; //ident
	var t=this.dstk.get("bordertop");
	if (t===undefined) throw new Error("dict: bordertop: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 123: /borderbottom borderbottom cvr def
	this.stk[this.ptr++]="borderbottom"; //ident
	var t=this.dstk.get("borderbottom");
	if (t===undefined) throw new Error("dict: borderbottom: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 124: /borderwidth borderwidth cvr def
	this.stk[this.ptr++]="borderwidth"; //ident
	var t=this.dstk.get("borderwidth");
	if (t===undefined) throw new Error("dict: borderwidth: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 125: /guardleftpos guardleftpos cvr def
	this.stk[this.ptr++]="guardleftpos"; //ident
	var t=this.dstk.get("guardleftpos");
	if (t===undefined) throw new Error("dict: guardleftpos: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 126: /guardleftypos guardleftypos cvr def
	this.stk[this.ptr++]="guardleftypos"; //ident
	var t=this.dstk.get("guardleftypos");
	if (t===undefined) throw new Error("dict: guardleftypos: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 127: /guardrightpos guardrightpos cvr def
	this.stk[this.ptr++]="guardrightpos"; //ident
	var t=this.dstk.get("guardrightpos");
	if (t===undefined) throw new Error("dict: guardrightpos: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 128: /guardrightypos guardrightypos cvr def
	this.stk[this.ptr++]="guardrightypos"; //ident
	var t=this.dstk.get("guardrightypos");
	if (t===undefined) throw new Error("dict: guardrightypos: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 129: /guardwidth guardwidth cvr def
	this.stk[this.ptr++]="guardwidth"; //ident
	var t=this.dstk.get("guardwidth");
	if (t===undefined) throw new Error("dict: guardwidth: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 130: /guardheight guardheight cvr def
	this.stk[this.ptr++]="guardheight"; //ident
	var t=this.dstk.get("guardheight");
	if (t===undefined) throw new Error("dict: guardheight: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 133: /bars sbs length 1 add 2 idiv array def
	this.stk[this.ptr++]="bars"; //ident
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
	this.stk[this.ptr-1]=BWIPJS.psarray(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 134: /x 0.00 def /maxh 0 def
	this.stk[this.ptr++]="x"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	this.stk[this.ptr++]="maxh"; //ident
	this.stk[this.ptr++]=0;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 135: 0 1 sbs length 1 add 2 idiv 2 mul 2 sub {
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	var t=this.dstk.get("sbs");
	if (t===undefined) throw new Error("dict: sbs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=2;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=$f7;
	//#line 153: } for
	var t15=this.stk[--this.ptr];
	var t13=this.stk[--this.ptr];
	var t12=this.stk[--this.ptr];
	var t11=this.stk[--this.ptr];
	for (var t14=t11; t12<0 ? t14>=t13 : t14<=t13; t14+=t12) {
		this.stk[this.ptr++]=t14;
		if (t15.call(this)==-1) break;
	}
	//#line 155: gsave
	this.gsave();
	//#line 157: currentpoint translate
	var t=this.currentpoint();
	this.stk[this.ptr++]=t.x;
	this.stk[this.ptr++]=t.y;
	var y=this.stk[--this.ptr];
	this.translate(this.stk[--this.ptr],y);
	//#line 160: width 0 ne {
	var t=this.dstk.get("width");
	if (t===undefined) throw new Error("dict: width: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=0;
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f8;
	//#line 162: } if
	var t16=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t16.call(this)==-1) return -1;
	}
	//#line 165: /setanycolor {
	this.stk[this.ptr++]="setanycolor"; //ident
	this.stk[this.ptr++]=$f13;
	//#line 173: } bind def
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 176: newpath
	this.newpath();
	//#line 177: borderleft neg borderbottom neg moveto
	var t=this.dstk.get("borderleft");
	if (t===undefined) throw new Error("dict: borderleft: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=-this.stk[this.ptr-1];
	var t=this.dstk.get("borderbottom");
	if (t===undefined) throw new Error("dict: borderbottom: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=-this.stk[this.ptr-1];
	var y=this.stk[--this.ptr];
	this.moveto(this.stk[--this.ptr],y);
	//#line 178: x borderleft add borderright add 0 rlineto
	var t=this.dstk.get("x");
	if (t===undefined) throw new Error("dict: x: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("borderleft");
	if (t===undefined) throw new Error("dict: borderleft: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	var t=this.dstk.get("borderright");
	if (t===undefined) throw new Error("dict: borderright: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=0;
	var y=this.stk[--this.ptr];
	this.rlineto(this.stk[--this.ptr],y);
	//#line 179: 0 maxh borderbottom add bordertop add rlineto
	this.stk[this.ptr++]=0;
	var t=this.dstk.get("maxh");
	if (t===undefined) throw new Error("dict: maxh: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("borderbottom");
	if (t===undefined) throw new Error("dict: borderbottom: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	var t=this.dstk.get("bordertop");
	if (t===undefined) throw new Error("dict: bordertop: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	var y=this.stk[--this.ptr];
	this.rlineto(this.stk[--this.ptr],y);
	//#line 180: x borderleft add borderright add neg 0 rlineto
	var t=this.dstk.get("x");
	if (t===undefined) throw new Error("dict: x: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("borderleft");
	if (t===undefined) throw new Error("dict: borderleft: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	var t=this.dstk.get("borderright");
	if (t===undefined) throw new Error("dict: borderright: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr-1]=-this.stk[this.ptr-1];
	this.stk[this.ptr++]=0;
	var y=this.stk[--this.ptr];
	this.rlineto(this.stk[--this.ptr],y);
	//#line 181: 0 maxh borderbottom add bordertop add neg rlineto    
	this.stk[this.ptr++]=0;
	var t=this.dstk.get("maxh");
	if (t===undefined) throw new Error("dict: maxh: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("borderbottom");
	if (t===undefined) throw new Error("dict: borderbottom: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	var t=this.dstk.get("bordertop");
	if (t===undefined) throw new Error("dict: bordertop: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr-1]=-this.stk[this.ptr-1];
	var y=this.stk[--this.ptr];
	this.rlineto(this.stk[--this.ptr],y);
	//#line 182: closepath
	this.closepath();
	//#line 183: backgroundcolor (unset) ne { gsave backgroundcolor setanycolor fill grestore } if     
	var t=this.dstk.get("backgroundcolor");
	if (t===undefined) throw new Error("dict: backgroundcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f14;
	var t25=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t25.call(this)==-1) return -1;
	}
	//#line 184: showborder {
	var t=this.dstk.get("showborder");
	if (t===undefined) throw new Error("dict: showborder: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f18;
	//#line 191: } if    
	var t29=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t29.call(this)==-1) return -1;
	}
	//#line 194: gsave
	this.gsave();
	//#line 195: 0 setlinecap
	this.stk[this.ptr++]=0;
	this.ptr--; //no-op
	//#line 196: barcolor (unset) ne { barcolor setanycolor } if
	var t=this.dstk.get("barcolor");
	if (t===undefined) throw new Error("dict: barcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f19;
	var t30=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t30.call(this)==-1) return -1;
	}
	//#line 197: bars {
	var t=this.dstk.get("bars");
	if (t===undefined) throw new Error("dict: bars: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f22;
	//#line 203: } forall
	var t35=this.stk[--this.ptr];
	var t34=this.stk[--this.ptr];
	for (t33 in t34) {
		if (t34 instanceof BWIPJS.psstring || t34 instanceof BWIPJS.psarray) {
			if (t33.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t34.get(t33);
		} else {
			this.stk[this.ptr++]=t33;
			this.stk[this.ptr++]=t34[t33];
		}
		if (t35.call(this)==-1) break;
	}
	//#line 204: grestore
	this.grestore();
	//#line 207: textcolor (unset) ne { textcolor setanycolor } if
	var t=this.dstk.get("textcolor");
	if (t===undefined) throw new Error("dict: textcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f23;
	var t36=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t36.call(this)==-1) return -1;
	}
	//#line 208: includetext {
	var t=this.dstk.get("includetext");
	if (t===undefined) throw new Error("dict: includetext: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f48;
	//#line 266: } if    
	var t73=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t73.call(this)==-1) return -1;
	}
	//#line 269: guardwhitespace {
	var t=this.dstk.get("guardwhitespace");
	if (t===undefined) throw new Error("dict: guardwhitespace: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f51;
	//#line 285: } if
	var t76=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t76.call(this)==-1) return -1;
	}
	//#line 287: grestore
	this.grestore();
	//#line 289: end
	this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
	psstptr = this.ptr;
}
// END OF renlinear
