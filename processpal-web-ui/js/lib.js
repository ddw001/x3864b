// Copyright Jasper Steenkamp. jasper@bluemarket.co.za

var app_name = "ProcessPal";
var interface_version = app_name + "-1.0.0";
var domain_list = {
	//"za": "https://appserver.processpal.io/"
	"za": "http://localhost:8002/"
};

var is_live = true;

/*
var live_domain = "https://bluemarket.co.za";
var domain = live_domain;
var dev_domain = "https://bmdev.co.za";
var base_url = domain + "/store/";
 */

var domain = "";
var base_url = "";
var default_currency_symbol = "";
var is_touch_device = 'ontouchstart' in document.documentElement;
var unique_count = new Date().getTime();
var tpls = {};

var default_provider_id = 108;
var analytics = {
	APPLICATIONINIT: 1,
	SIGNIN: 2,
	SIGNOUT: 3,
	TAPRESENDPIN: 4,
	TAPREGISTER: 5,
	TAPSCANQRCODE: 19,
	TAPSCANAR: 20,
	TAPBACKBUTTON: 21,
	data: [],
	queue: [],
	is_queued: false,
	queue_time: 0,
	add: function (code, params) {
		var now = new Date().getTime();
		var param_str = "";
		if (params && params.constructor == Object) {
			comma = "";
			$.each(params, function (key, val) {
				param_str += comma + "{\"" + key + "\":" + val + "}"
				comma = ","
			});
		}
		var log = "[" + code + ",[" + param_str + "]," + now + "]";
		this.data.push(log);
	},
	getQueueString: function () {
		if (!this.is_queued) {
			this.is_queued = true;
			this.queue_time = new Date().getTime();
			this.queue = this.data;
			this.data = [];
		} else if (new Date().getTime() - this.queue_time > 60 * 1000) {
			// break the timeout and restore the data along with any possible new entries, will try again on next sync
			this.rollbackQueue();
			this.is_queued = false;
		}
		var qstr = "";
		var comma = "";
		$.each(this.queue, function (idx, q) {
			qstr += comma + q;
			comma = ","
		});
		return "[" + qstr + "]";
	},
	rollbackQueue: function () {
		this.is_queued = false;
		this.queue_time = 0;
		this.data = this.data.concat(this.queue);
		this.queue = [];

	}
};

var session = {
	last_activity: 0,
	current_longitude: 0,
	current_latitude: 0,
	// place_id = Gimbal id, loc_id = provider location id on BlueMarket


	setCountry: function (country_code) {
		if (country_code) {
			domain = domain_list[country_code];
		}
		amplify.store("country_code", country_code);
		$("#country_code").val(country_code);
		//$("#reg_country_code").val(country_code);
		this.setBaseURL();
	},

	setBaseURL: function () {
		var country_code = amplify.store("country_code");
		if (!country_code) {
			country_code = "za";
			amplify.store("country_code", country_code);
		}
		domain = domain_list[country_code];
		base_url = domain;
		//base_url = domain + "/store/";
	},
	/*
	setIsLive: function() {
	is_live = true;
	domain = live_domain;
	base_url = domain + "/store/";
	},
	setIsDev: function() {
	is_live = false;
	domain = dev_domain;
	base_url = domain + "/store/";
	},
	 */
	updatePosition: function (lng, lat) {
		console.log("**** updatePosition");
		console.log("**** lng: " + lng);
		console.log("**** lat: " + lat);
		this.current_longitude = parseFloat(lng);
		this.current_latitude = parseFloat(lat);
		console.log("**** this.lng: " + this.current_longitude);
		console.log("**** this.lat: " + this.current_latitude);
	},
	hasGPS: function () {
		return this.current_latitude != 0;
	},
	resetDeviceEmailMessage: function (elem) {
		elem.removeClass("error");
		var telId = elem.attr('id');
		$('#' + telId + '_valid').hide();
		$('#' + telId + '_error').hide();
	},
	updateUserName: function (dom_elem) {
		var uname = $(dom_elem).val();
		amplify.store("uname", uname);
		if (uname.indexOf("@") > -1) {
			amplify.store("email", uname);
		} else {
			amplify.store("cellnum", uname);
		}
		/*
		var telInput = $(dom_elem),
		telId = telInput.attr('id'),
		errorMsg = $('#'+telId+"_error"),
		validMsg = $('#'+telId+"_valid");

		session.resetDeviceEmailMessage(telInput);

		if ($.trim(telInput.val())) {
		if (telInput.intlTelInput("isValidNumber")) {
		validMsg.show();
		} else {
		telInput.addClass("error");
		errorMsg.show();
		}
		amplify.store("email", telInput.val().replaceAll(" ", ""))
		}
		 */
	},
	updateLinkName: function (dom_elem) {
		var link_uname = $(dom_elem).val();
		amplify.store("link_uname", link_uname);
	},
	isValidSession: function () {
		if (!amplify.store("token") || !amplify.store("email")) {
			return false;
		} else {
			return true;
		}
	},
	updateUserSettings: function () {
		var user_data = amplify.store("user_data");
		user_data.allow_proximity_alert = $("#allow_proximity_alert").prop('checked');
		user_data.allow_push_notification = $("#allow_push_notification").prop('checked');
		amplify.store("user_data", user_data);
		this.submitUserData(false);

	},
	updateSearchSettings: function () {
		var user_data = amplify.store("user_data");
		user_data.show_everything = $("#search_show_everything").prop('checked');
		user_data.show_places = $("#search_show_places").prop('checked');
		user_data.show_products = $("#search_show_products").prop('checked');
		user_data.show_specials = $("#search_show_specials").prop('checked');
		user_data.show_competitions = $("#search_show_competitions").prop('checked');
		user_data.show_events = $("#search_show_events").prop('checked');
		amplify.store("user_data", user_data);
		this.submitUserData(false);

	},

	updateUserEmail: function () {
		var email = $("#about_me_email_address").val();
		email = email.trim();
		if (!isValidEmailAddress(email)) {
			return appNav.showDialog({
				message: "Please enter a valid email address",
				back: appNav.closeDialog
			});
		}
		var user_data = amplify.store("user_data");
		user_data.email_address = $("#about_me_email_address").val();
		amplify.store("user_data", user_data);
		this.submitUserData(true);

	},

	updateUserData: function () {
		var user_data = amplify.store("user_data");
		user_data.fname = $("#about_me_fname").val();
		user_data.email_address = $("#about_me_email_address").val();
		user_data.lname = $("#about_me_lname").val();
		amplify.store("user_data", user_data);
		this.submitUserData(true);
	},
	submitUserData: function (show_success) {
		var user_data = amplify.store("user_data");
		var args = {
			fname: user_data.fname,
			lname: user_data.lname,
			email_address: user_data.email_address,
			allow_proximity_alert: user_data.allow_proximity_alert,
			allow_push_notification: user_data.allow_push_notification
		};
		if (show_success) {
			appNav.showLoading();
		}
		$.post(base_url + "update_user_data/" + mkSessURL(), args, function (json) {
			appNav.hideLoading();
			if (json.success) {
				if (show_success) {
					appNav.showDialog({
						message: "Updated successfully",
						back: function () {
							appNav.closeDialog();
							appNav.popTemplate();
						}
					});
				}
			} else {
				appNav.showDialog({
					message: "Unable to update!",
					back: function () {
						appNav.closeDialog();
					}
				});

			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
	isValidSessionResponse: function (json) {
		if (json.code && json.code == "1") {
			return false;
		} else {
			return true;
		}
	},

	validateOTP: function () {
		var uid = amplify.store("uid");
		var otp = $("#otp_txt").val();
		if (!otp) {
			return appNav.showDialog({
				message: "Please enter your One-Time PIN",
				back: appNav.closeDialog
			});
		}
		appNav.showLoading();
		$.post(base_url + "otp", {
			uid: uid,
			otp: otp
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				amplify.store("token", json.token);
				ui.showHome(true);
			} else {
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}

		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},

	sendOTP: function () {
		var uname = amplify.store("uname");
		if (!uname) {
			return appNav.showDialog({
				message: "Please enter a user name",
				back: appNav.closeDialog
			});
		}
		appNav.showLoading();
		$.get(base_url + "otp", {
			"uname": uname
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				amplify.store("uid", json.uid);
				var args = {
					hide_toolbar: true,
					win_id: "otp_win",
					uname: uname
				};
				return appNav.pushTemplate("otp_win_tpl", args);
			} else {
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});

	},
    
    login: function () {
		var uname = amplify.store("uname");
        var pword = $("#pword").val();
		if (!uname) {
			return appNav.showDialog({
				message: "Please enter a user name",
				back: appNav.closeDialog
			});
		}
        if (!pword) {
			return appNav.showDialog({
				message: "Please enter a password",
				back: appNav.closeDialog
			});
		}
		appNav.showLoading();
		$.post(base_url + "login", {
			"uname": uname,
            "pword": pword
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				amplify.store("token", json.token);
                amplify.store("uid", json.uid);
				ui.showHome(true);
			} else {
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}

		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},
    
    changePassword: function () {
		var uname = amplify.store("uname");
        var old_pword = $("#old_pword").val();
        var new_pword = $("#new_pword").val();
        var new_pword2 = $("#new_pword2").val();
        if (!old_pword) old_pword = "";
        if (new_pword != new_pword2) {
			return appNav.showDialog({
				message: "New passwords must match",
				back: appNav.closeDialog
			});
		}
		if (!uname) {
			return appNav.showDialog({
				message: "No username, please contact support",
				back: appNav.closeDialog
			});
		}
		appNav.showLoading();
		$.post(base_url + "change_password", {
			"uname": uname,
            "new_pword": new_pword,
            "old_pword": old_pword
		}, function (json) {
			appNav.hideLoading();
			if (!json.error && !jQuery.isEmptyObject(json)) {
                appNav.showDialog({
                    message: json.message,
                    ok: function () {
                        appNav.closeDialog();
                        setTimeout(function () {
                            ui.showHome(true);;
                        }, 300);
                    }
                });
			} else {
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}

		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},
    
	sendLinkOTP: function () {
		var uname = amplify.store("link_uname");
		if (!uname) {
			return appNav.showDialog({
				message: "Please enter a user name",
				back: appNav.closeDialog
			});
		}
		appNav.showLoading();
		$.get(base_url + "otp", {
			"uname": uname
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				amplify.store("link_uid", json.uid);
				var args = {
					hide_toolbar: true,
					win_id: "link_otp_win",
					uname: uname
				};
				return appNav.pushTemplate("link_otp_win_tpl", args);
			} else {
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});

	},

	validateLinkOTP: function () {
		var link_uid = amplify.store("link_uid");
		var uid = amplify.store("uid");
		var otp = $("#otp_txt").val();
		if (!otp) {
			return appNav.showDialog({
				message: "Please enter your One-Time PIN",
				back: appNav.closeDialog
			});
		}
		appNav.showLoading();
		$.post(base_url + "userLinkLogins", {
			uid: uid,
			link_uid: link_uid,
			otp: otp
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				ui.showHome(true);
			} else {
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}

		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},

	resendOTP: function () {
		var email = amplify.store("email");
		if (!email) {
			return appNav.showDialog({
				"message": "Please enter your phone number first",
				"back": appNav.closeDialog
			});
		}
		var args = {
			uid: email
		}
		appNav.showLoading();
		$.post(base_url + "resend_otp", args, function (json) {
			appNav.hideLoading();
			if (json.success) {
				appNav.showDialog({
					"message": "Your One Time Pin has been sent successfully",
					"back": appNav.closeDialog
				});
			} else {
				appNav.showDialog({
					"message": json.message,
					"back": appNav.closeDialog
				});

			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},
	doRegister: function () {
		var telInput = $('#reg_email_txt');
		var num = telInput.val();
		var fname = $("#reg_first_name").val();
		var lname = $("#reg_last_name").val();
		var email = $("#reg_email").val();
		var pword1 = $("#reg_pword1").val().trim();
		var pword2 = $("#reg_pword2").val().trim();
		/*
		if (!isValidEmailAddress(email)) {
		$("#register_message").html("Please enter a valid email address");
		return;
		}
		 */
		if (pword1 != pword2) {
			$("#register_message").html("Your passwords do not match");
			return;
		}
		if (pword1.length < 6) {
			$("#register_message").html("Please use a password of at least 6 characters");
			return;
		}
		if (!num || !fname || !lname || !pword1) { // || !idno) { // validate idno and num...
			$("#register_message").html("Please enter your number, names and a password");
			return;
		}

		if (!telInput.intlTelInput("isValidNumber")) {
			$("#register_message").html(
				"Please enter a valid telephone number for the selected country.");
			return;
		}

		// now get international number.
		num = telInput.intlTelInput("getNumber");

		var args = {
			name: fname,
			surname: lname,
			email: email,
			pword: pword1,
			num: num
		};
		appNav.showLoading();
		analytics.add(analytics.TAPREGISTER);
		$.post(base_url + "register", args, function (json) {
			// give to 3 seconds for OTP to send and arrive.
			setTimeout(function () {
				appNav.hideLoading();
				if (json.success) {
					amplify.store("waiting_for_otp", 1);
					$("#login_otp").show();
					appNav.showDialog({
						message: json.message,
						back: function () {
							appNav.closeDialog();
							appNav.popTemplate();
							setTimeout(function () {
								session.showLogin();
							}, 500);
							// The resend OTP button should only show in 20 seconds.
							$("#resend_otp").hide();
							setTimeout(function () {
								$("#resend_otp").show();
							}, 20 * 1000);
						}
					});
				} else {
					appNav.showDialog({
						message: "Unable to subscribe. " + json.message,
						back: function () {
							appNav.closeDialog();
						}
					});

				}
			}, 3 * 1000);
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
	closeRegisterWin: function () {
		appNav.popTemplate();
	},
	applyIntlTelInput: function () {
		$(".phone-input").intlTelInput({
			initialCountry: "za",
			autoPlaceholder: "polite",
			preferredCountries: ["za", "na", "zw", "zm", "mz"],
		});
	},
	showRegisterWin: function () {
		var num = amplify.store("email");
		if (!num) {
			num = "";
		}
		appNav.showBack();
		appNav.pushTemplate(
			"register_tpl", {
			title: "Register",
			email_txt: num,
			hide_toolbar: true,
			win_id: "register_win"
		},
			function () {
			session.applyIntlTelInput();
			session.resetDeviceEmailMessage($('#reg_email_txt'));
		});

		$("#register_info").hide();
		var country_code = amplify.store("country_code");
		if (country_code) {
			//$("#reg_country_code").val(country_code);
		}

		$("#register_init input").enterKey(function () {
			$("input").blur();
		});
	},

	showResetPIN: function () {
		appNav.showBack();
		appNav.pushTemplate("reset_pin_tpl", {
			hide_toolbar: true,
			win_id: "reset_pin_win"
		});

	},
	resetPIN: function () {
		analytics.add(analytics.TAPRESENDPIN);
		var num = amplify.store("email");
		var pword1 = $("#reset_pword1").val().trim();
		var pword2 = $("#reset_pword2").val().trim();
		if (pword1 == "") {
			appNav.showDialog({
				message: "Please enter a password",
				back: function () {
					appNav.closeDialog();
				}
			});
			return;

		}
		if (pword1 != pword2) {
			appNav.showDialog({
				message: "Your passwords do not match",
				back: function () {
					appNav.closeDialog();
				}
			});
			return;

		}

		if (!num) {
			appNav.showDialog({
				message: "Please enter your mobile number first",
				back: function () {
					appNav.closeDialog();
				}
			});
			return;
		}
		appNav.showLoading();
		var args = {
			uid: num,
			pword: pword1
		};
		$.post(base_url + "reset_pin", args, function (json) {
			appNav.hideLoading();
			if (json.success) {
				amplify.store("waiting_for_otp", 1);
				$("#login_otp").show();
				appNav.popTemplate();
				appNav.showDialog({
					message: "Your One Time Pin will be sent to you shortly",
					back: function () {
						appNav.closeDialog();
					}
				});
			} else {
				appNav.showDialog({
					message: json.message,
					back: function () {
						appNav.closeDialog();
					}
				});

			}
		}).fail(function () {
			appNav.showDialog({
				message: "Unable to connect to server, are you online?",
				back: function () {
					appNav.closeDialog();
				}
			});

		});
	},
	registerDevice: function (id) {
		console.log("**** got device id: " + id);
		if (id != "") {
			$.getJSON(base_url + "reg_android/" + mkSessURL() + "?id=" + id + "&u=" + getUnique(), function (json) {
				if (json.success) {
					amplify.store("android_id", id);
				}
			});
		}
	},
	registeriOSDevice: function (id) {
		if (id != "") {
			if (id != amplify.store("ios_id")) {
				$.getJSON(base_url + "reg_ios/" + mkSessURL() + "?id=" + id + "&u=" + getUnique(), function (json) {
					if (json.success) {
						amplify.store("ios_id", id);
					}
				});
			}
		}
	},

	/*
	validatePIN: function() {
	var pin = $("#device_pin_txt").val().replaceAll('  ', '');
	/ *
	var country_code = $("#country_code").val();
	var otp = $("#device_otp_txt").val();
	if (!country_code) {
	$("#session_message").html("Please select your country");
	return;
	}
	 * /
	var email = $('#email_txt').val();
	if (!email) {
	$("#session_message").html("Invalid username");
	return;
	}
	/ *
	var waiting_for_otp = amplify.store("waiting_for_otp");
	if (waiting_for_otp) {
	if (!otp) {
	$("#session_message").html("Please enter your One Time Pin");
	return;
	}
	}
	console.log('!!!!!!')
	 * /

	// now get international number.

	var args = {
	uname: email,
	pword: pin
	};
	//analytics.add(analytics.SIGNIN);
	appNav.showLoading();
	$.post(base_url + "login", args, function(json) {
	appNav.hideLoading();
	if (! json.error) {
	amplify.store("token", json.token);
	//var user_data = amplify.store("user_data");
	//amplify.store("waiting_for_otp", 0);
	//user_data.fname = json.fname;
	//user_data.lname = json.lname;
	//user_data.allow_proximity_alert = json.allow_proximity_alert;
	//user_data.allow_push_notification = json.allow_push_notification;
	//amplify.store("user_data", user_data);
	appNav.popTemplate();
	if (appNav.isRootWindow()) {
	appNav.window_stack = [];
	appNav.title_stack = [];
	$("#window_main").html("");
	ui.showHome();
	//session.setEncKeys(json.privkey, json.pubkey);
	} else {
	appNav.popTemplate();
	console.log("Not root window...");
	}
	if (FirebasePlugin) {
	FirebasePlugin.getToken(function(token){
	console.log( "TOKEN: " + token );
	if (device.platform == "Android") {
	session.registerDevice(token);
	} else if (device.platform == "iOS") {
	session.registeriOSDevice(token);
	}
	console.log( token );
	});
	}

	} else {
	appNav.showDialog({
	message: "Unable to log in. " + json.error,
	back: function() {
	appNav.closeDialog();
	}
	});
	if (json.otp_required) {
	amplify.store("waiting_for_otp", 1);
	$("#login_otp").show();
	$("#session_message").html("Please enter your One Time Pin");
	}

	}
	}).fail(function() {
	appNav.hideLoading();
	appNav.showDialog({
	message: "Unable to connect!",
	back: function() {
	appNav.closeDialog();
	}
	});


	});
	},
	setEncKeys: function(priv, pub) {
	var priv_enc = Tea.encrypt(priv, amplify.store("token"));
	amplify.store("_private_key", priv_enc);
	amplify.store("_public_key", pub);
	},
	getEncKeys: function() {
	var priv = Tea.decrypt(amplify.store("_private_key"), amplify.store("token"));
	var pub = amplify.store("_public_key");
	return {"privkey": priv, "pubkey": pub};
	},

	getLastStoreTS: function() {
	var ts = amplify.store("last_store_ts");
	if (!ts) {
	ts = "1900-01-01 00:00:00";
	}
	return ts;
	},
	setLastStoreTS: function(ts) {
	amplify.store("last_store_ts", ts);
	},
	 */
	showLogin: function () {
		//session.resetDeviceEmailMessage($('#email_txt'));
		session.logout();
		var uname = amplify.store("uname");
		if (!uname) {
			uname = "";
		}
		appNav.setNavRight("");
		appNav.setNavLeft("");
		/*
		var checkOTP = function() {
		var waiting_for_otp = amplify.store("waiting_for_otp");

		if (waiting_for_otp) {
		$("#login_otp").show();
		// The resend OTP button should only show in 20 seconds.
		$("#resend_otp").hide();
		setTimeout(function(){
		$("#resend_otp").show();
		}, 20 * 1000);
		}
		}
		 */

		var args = {
			uname_txt: uname,
			hide_toolbar: true,
			win_id: "login_win",
			//onFocusRestored: checkOTP
		}
		appNav.pushTemplate("login_win_tpl", args);
		//checkOTP();
		var country_code = amplify.store("country_code");
		if (country_code) {
			$("#country_code").val(country_code);
		} else {
			$("#country_code").val("");
		}
		$("#login_win input").enterKey(function () {
			$("input").blur();
		});
	},
	logout: function (is_timeout) {
		console.log("Calling logout");
		analytics.add(analytics.SIGNOUT);
		amplify.store("token", "");
	},

	setupAjax: function () {
		$.ajaxSetup({
			dataType: 'json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-ProcessPal-Token', amplify.store("token"));
				xhr.setRequestHeader('X-ProcessPal-User', amplify.store("uid"));
				xhr.setRequestHeader('X-ProcessPal-Analytics', analytics.getQueueString());
			},
			complete: function (xhr, status) {
				if (status == "success") {}
				if (status == "error") {
					analytics.rollbackQueue();
				} else {
					analytics.is_queued = false;
				}
			}
			//headers: {'X-BlueMarket-Token': }
		});
	},
	init: function () {
		this.setupAjax();
		this.setBaseURL();
		if (!amplify.store("user_data")) {
			amplify.store("user_data", {
				show_places: 1,
				show_products: 1,
				show_specials: 1,
				show_competitions: 1,
				show_events: 1
			});
		}
		console.log("init session");
	}

}

var ui = {
	id: "ui",
	name: "UI",
	search_win_id: "",
	settings_open: false,
	settings_animating: false,
	search_settings_open: false,
	search_settings_animating: false,
	is_provider_scan: false,
	app_paused: false,
	cell_animation_speed: 500,
	window_animation_speed: 200,
	push: false,
	jsPlumb: null,
    convertClick: function () {
        $('img[onclick]').each( function (ix, el) {
            var jquery_el = $(el);
            jquery_el.on('touchstart click', function (event) {
                event.preventDefault();
                setTimeout(jquery_el.attr('onclick'),0);
            });
        });
    },
	createWorkflow: function () {
		var name = $("#new_workflow_name").val().trim();
		if (!name || name == "") {
			return appNav.showDialog({
				message: "Please enter a workflow name",
				back: appNav.closeDialog
			});
		}
		var workspace_id = amplify.store("current_workspace_id");
		var args = {
			workspace_id: workspace_id,
			name: name
		};
		appNav.showLoading();
		$.post(base_url + "workflow", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				appNav.popTemplate();
				ui.showWorkspace(workspace_id);
				console.log(json);
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	createWorkspace: function () {
		var name = $("#new_workspace_name").val().trim();
		if (!name || name == "") {
			return appNav.showDialog({
				message: "Please enter a workspace name",
				back: appNav.closeDialog
			});
		}
		var args = {
			name: name
		};
		appNav.showLoading();
		$.post(base_url + "workspace", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				appNav.popTemplate();
				ui.showHome(true);
				console.log(json);
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
    
    createRole: function () {
		var name = $("#new_role_name").val().trim();
		if (!name || name == "") {
			return appNav.showDialog({
				message: "Please enter a role name",
				back: appNav.closeDialog
			});
		}
		var args = {
			role_name: name
		};
		appNav.showLoading();
		$.post(base_url + "role", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				appNav.popTemplate();
				ui.showRoles(true);
				console.log(json);
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
    
    addRoleMember: function () {
		var name = $("#new_role_member_name").val().trim();
        var role_id = amplify.store('current_role_id');
		if (!name || name == "") {
			return appNav.showDialog({
				message: "Please enter an email/cell number",
				back: appNav.closeDialog
			});
		}
		var args = {
			role_id: role_id,
            member: name
		};
		appNav.showLoading();
		$.post(base_url + "role/invite", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				appNav.popTemplate();
				ui.showRole(role_id);
				console.log(json);
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	showNewWorkspace: function () {
		ui.closeSettings();
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		appNav.pushTemplate("new_workspace_tpl", {
			hide_toolbar: true
		});

	},

	showNewWorkflow: function () {
		ui.closeSettings();
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		appNav.pushTemplate("new_workflow_tpl", {
			hide_toolbar: true
		});

	},
    
    showNewRole: function () {
		ui.closeSettings();
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		appNav.pushTemplate("new_role_tpl", {
			hide_toolbar: true
		});

	},
    
    showNewRoleMember: function () {
		ui.closeSettings();
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		appNav.pushTemplate("new_role_member_tpl", {
			hide_toolbar: true
		});

	},
	setupPush: function () {
		if (FirebasePlugin) {
			FirebasePlugin.onTokenRefresh(function (token) {
				console.log("TOKEN: " + token);
				if (device.platform == "Android") {
					session.registerDevice(token);
				} else if (device.platform == "iOS") {
					session.registeriOSDevice(token);
				}
				console.log(token);
			});
			FirebasePlugin.getToken(function (token) {
				console.log("TOKEN: " + token);
				if (device.platform == "Android") {
					session.registerDevice(token);
				} else if (device.platform == "iOS") {
					session.registeriOSDevice(token);
				}
				console.log(token);
			});
		}
	},
	registerPush: function () {
		console.log("**** In registerPush");
		try {
			PushNotification;
		} catch (e) {
			console.log(e);
			return;
		}
		console.log("**** Object exists");
		ui.push = PushNotification.init({
				android: {
					senderID: "962219371058"
				},
				ios: {
					alert: "true",
					badge: "false",
					sound: "true"
				}
			});
		ui.push.on('registration', function (data) {
			console.log("**** Got data back");
			console.log(JSON.stringify(data));
			if (!data.registrationId) {
				return;
			}
			if (device.platform == "Android") {
				session.registerDevice(data.registrationId);
			} else if (device.platform == "iOS") {
				session.registeriOSDevice(data.registrationId);
			}
			// data.registrationId
		});
		ui.push.on('notification', function (data) {
			appNav.showDialog({
				message: data.message,
				back: appNav.closeDialog
			});
			console.log(data);
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
		});
	},

	setAppResumed: function () {
		ui.app_paused = false;
	},
	setAppPaused: function () {
		ui.app_paused = true;
	},
	setOffline: function () {},
	setOnline: function () {},

	showTC: function () {
		ui.closeSettings();
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		appNav.pushTemplate("tc_tpl", {
			hide_toolbar: true
		});
	},
	showPrivacyPolicy: function () {
		ui.closeSettings();
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		appNav.pushTemplate("privacy_policy_tpl");
	},
	viewAboutMe: function () {

		// If we are not logged in prompt user to register/login.
		if (!amplify.store('user_data') || !amplify.store('token')) {
			ui.closeSettings();
			session.showLogin();
			return
		}

		appNav.setNavRight("");
		appNav.showBack();
		ui.closeSettings();
		appNav.pushTemplate("about_me_tpl", {
			hide_toolbar: true
		});

		var user_data = amplify.store("user_data");
		$("#about_me_fname").val(user_data.fname);
		$("#about_me_email_address").val(amplify.store("email"));
		$("#about_me_lname").val(user_data.lname);
		$("#about_me_cellno").val(amplify.store("cellnum"));
		$("#about_me_country_code").val(amplify.store("country_code"));

		$("#about_me_div input").enterKey(function () {
			$("input").blur();
		});
	},

	viewLinkLogin: function () {

		// If we are not logged in prompt user to register/login.
		if (!amplify.store('user_data') || !amplify.store('token')) {
			ui.closeSettings();
			session.showLogin();
			return
		}

		appNav.setNavRight("");
		appNav.showBack();
		ui.closeSettings();
		appNav.pushTemplate("link_login_tpl", {
			hide_toolbar: true
		});
	},
    
    viewChangePassword: function () {

		// If we are not logged in prompt user to register/login.
		if (!amplify.store('user_data') || !amplify.store('token')) {
			ui.closeSettings();
			session.showLogin();
			return
		}

		appNav.setNavRight("");
		appNav.showBack();
		ui.closeSettings();
		appNav.pushTemplate("change_password_tpl", {
			hide_toolbar: true
		});
	},

	updateActivityTitle: function () {
		var title = $(".activity_title_input").val();
		var activity_id = amplify.store("current_activity_id");
		var workflow_id = amplify.store("current_workflow_id");

		//var act = ui.getActivityById(activity_id);
		var activities = amplify.store("activities_" + workflow_id);
		if (!activities) {
			return;
		}
		activities[activity_id].name = title;
		amplify.store("activities_" + workflow_id, activities);
		$("#activity_name_" + activity_id).html(title);
	},
	showScanMain: function () {
		analytics.add(analytics.TAPSCAN);
		appNav.setNavRight("");
		appNav.showBack();
		appNav.pushTemplate("scan_main_tpl", {
			hide_toolbar: true
		});
	},

	startScanner: function (is_provider_scan) {
		ui.closeSettings();
		if (is_provider_scan) {
			analytics.add(analytics.PROVIDERTAPSCANCODE);
		} else {
			analytics.add(analytics.TAPSCANQRCODE);
		}
		this.is_provider_scan = is_provider_scan;

		cordova.plugins.barcodeScanner.scan(
			function (result) {
			if (result.text != "") {
				ui.loadCode(result.text);
			}
			/*
			alert("We got a barcode\n" +
			"Result: " + result.text + "\n" +
			"Format: " + result.format + "\n" +
			"Cancelled: " + result.cancelled);
			 */
		},
			function (error) {
			appNav.showDialog({
				message: error.toString(),
				back: appNav.closeDialog
			});
		});
	},
	loadCode: function (code) {

		//A very little key will open a very heavy door.
		var bm_domain = "https://bluemarket.co.za";

		if (code.substr(0, domain.length) != domain && code.substr(0, bm_domain.length) != bm_domain) {
			appNav.showDialog({
				message: "Sorry, you have scanned an incompatible code",
				back: function () {
					appNav.closeDialog();
				}
			});
			return;
		}

		code = code.replace(domain, "");
		code = code.replace(bm_domain, "");
		//      "/r/d157235e"

		var parts = code.split("/");
		console.log(parts);
		if (parts[1] == "ps") {
			if (parts.length <= 2) {
				appNav.showDialog({
					message: "Sorry, you have scanned an invalid code",
					back: function () {
						appNav.closeDialog();
					}
				});
				return;
			}
			var v_code = "";
			if (parts.length == 4) {
				v_code = parts[3];
			}
			this.doProviderScan(parts[2], v_code);
		}
	},

	closeSettings: function () {
		if (this.settings_open) {
			this.showSettings();
		}
	},
	closeSearchSettings: function () {
		if (this.search_settings_open) {
			this.showSearchSettings();
		}
	},

	showSettings: function () {
		if (ui.settings_animating) {
			return;
		}
		$("#toolbar_div").css("top", (appNav.getBodyHeight() + 16) + 'px');
		analytics.add(analytics.TAPSETTINGSMENU);
		var slide = $(window).width() - 60; // width of icons next to screen
		ui.settings_animating = true;
		if (!this.settings_open) {
			var user_data = amplify.store("user_data");
			if (user_data.allow_push_notification) {
				$("#allow_push_notification").iCheck('check');
			}
			if (user_data.allow_proximity_alert) {
				$("#allow_proximity_alert").iCheck('check');
			}

			$("#allow_push_notification").on('ifChanged', function () {
				session.updateUserSettings();
			});
			$("#allow_proximity_alert").on('ifChanged', function () {
				session.updateUserSettings();
			});

			var settings_div = $("#settings_div");
			settings_div.css("left", (slide * -1) + 'px');
			settings_div.css("width", slide + "px");
			settings_div.css("display", "block");
			$("#body_div").velocity({
				translateX: slide + 'px'
			}, 300, function () {
				ui.settings_animating = false;
			});
			//$("#body_div").bind("click", function() {
			//    ui.showSettings();
			settings_div.velocity({
				translateX: slide + 'px'
			}, 300);
			this.settings_open = true;
		} else {
			var settings_div = $("#settings_div");
			$("#body_div").velocity({
				translateX: '0px'
			}, 300, function () {});
			settings_div.velocity({
				translateX: '0px'
			}, 300, function () {
				settings_div.css("width", slide + "px");
				settings_div.css("display", "none");
				ui.settings_animating = false;
			});

			$("#body_div").off();
			this.settings_open = false;

		}
	},
	showWorkspaceSettings: function () {
		appNav.clearNav();
		appNav.showBack();
		var id = appNav.pushTemplate("workspace_settings_tpl", {
				hide_toolbar: true,
				win_id: "workspace_settings"
			});

	},

	getCurrentWorkspace: function () {
		var workspace = {};
		var workspaces = amplify.store("workspaces");
		if (!workspaces) {
			return workspace;
		}
		var workspace_id = amplify.store("current_workspace_id");
		$.each(workspaces, function (idx, ws) {
			if (ws.workspace_id == workspace_id) {
				workspace = ws;
			}
		});
		return workspace;
	},

	showAPIDetail: function () {
		appNav.clearNav();
		appNav.showBack();
		var workspace = ui.getCurrentWorkspace();
		var args = {
			hide_toolbar: true,
			win_id: "main_settings",
			api_key: workspace.api_key,
			secret_key: workspace.secret_key
		};
		var id = appNav.pushTemplate("api_settings_tpl", args);
	},

	showMainSettings: function () {
		appNav.clearNav();
		appNav.showBack();
		var id = appNav.pushTemplate("main_settings_tpl", {
				hide_toolbar: true,
				win_id: "main_settings"
			});

	},

	getActivityRunData: function (activity_id, callback) {
		$.getJSON(base_url + "activity/feedback", {
			activity_id: activity_id
		}, function (json) {
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				json["_run_id"] = json["run_id"];
				amplify.store("current_run_data", json);
				if (callback) {
					callback(json);
				}
				console.log(json);
			} else {
				if (callback) {
					callback(null);
				}
				/*
				appNav.showDialog({
				message: json.error,
				back: function() {
				appNav.closeDialog();
				}
				});
				 */
			}
		}).fail(function () {
			if (callback) {
				callback(null);
			}
		});
	},
    
    getWorkflowFeedback: function (workflow_id, callback) {
		$.get(base_url + "feedback", {
			workflow_id: workflow_id
		}, function (json) {
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				amplify.store("current_workflow_data", json);
				if (callback) {
					callback(json);
				}
				console.log(json);
			} else {
				if (callback) {
					callback(null);
				}
				/*
				appNav.showDialog({
				message: json.error,
				back: function() {
				appNav.closeDialog();
				}
				});
				 */
			}
		}).fail(function () {
			if (callback) {
				callback(null);
			}
		});
	},
    
	getRunData: function (run_id, callback) {
		$.getJSON(base_url + "feedback", {
			run_id: run_id
		}, function (json) {
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				json["_run_id"] = run_id;
				amplify.store("current_run_data", json);
				if (callback) {
					callback(json);
				}
				console.log(json);
			} else {
				if (callback) {
					callback(null);
				}
				/*
				appNav.showDialog({
				message: json.error,
				back: function() {
				appNav.closeDialog();
				}
				});
				 */
			}
		}).fail(function () {
			if (callback) {
				callback(null);
			}
		});
	},

	showHome: function (clear_all) {
		if (clear_all) {
			appNav.popAll();
		}
		appNav.setNavLeft('<img src="images/menu.png" class="button" onclick="ui.showSettings()" style="max-height:15px;">');
		appNav.setNavRight('<img class="button" src="images/settings.png" style="max-height:35px" onclick="ui.showMainSettings()">');
		var id = appNav.pushTemplate("main_tpl", {
				hide_toolbar: true,
				win_id: "main"
			});
        ui.closeSettings();
        console.log("showing loading");
        setTimeout(appNav.showLoading(), 100);
		$.getJSON(base_url + "workspaces", {}, function (json) {
			if (!session.isValidSessionResponse(json)) {
                appNav.hideLoading();
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				amplify.store("workspaces", json);
				ui.displayWorkspaces();

				console.log(json);
			} else {
                appNav.hideLoading();
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});
	},
    showRoles: function (clear_all) {
		if (clear_all) {
			appNav.popAll();
		}
		appNav.setNavLeft('<img src="images/menu.png" class="button" onclick="ui.showSettings()" style="max-height:15px;">');
		appNav.setNavRight('<img class="button" src="images/settings.png" style="max-height:35px" onclick="ui.showMainSettings()">');
		var id = appNav.pushTemplate("roles_tpl", {
				hide_toolbar: true,
				win_id: "roles"
			});
		appNav.showLoading();
        ui.closeSettings();
		$.getJSON(base_url + "roles", {}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				amplify.store("roles", json.data);
				ui.displayRoles();

				console.log(json);
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});
	},
	displayWorkspaces: function () {
		var target = $("#workspace_list");
		var workspaces = amplify.store("workspaces");
		if (!workspaces) {
			return target.html("No workspaces to display");
		}
		var html = "";
		$.each(workspaces, function (idx, workspace) {
			html += $.loadUITemplate("workspace_cell_tpl", {
				id: workspace.workspace_id,
				name: workspace.name
			});
		});
		target.html(html);
        appNav.hideLoading();

	},
    displayRoles: function () {
		var target = $("#roles_list");
		var roles = amplify.store("roles");
		if (!roles) {
			return target.html("No roles to display");
		}
		var html = "";
		$.each(roles, function (idx, role) {
			html += $.loadUITemplate("roles_cell_tpl", {
				id: role.role_id,
				name: role.role_name
			});
		});
		target.html(html);

	},

	showWorkspace: function (workspace_id) {
		amplify.store("current_workspace_id", workspace_id);
		appNav.clearNav();
		//appNav.setNavRight('<img class="button" src="images/settings.png" style="max-height:35px" onclick="showWorkspaceSettings(\''+workspace_id+'\')">');

		appNav.setNavRight('<img class="button" src="images/settings.png" style="max-height:35px" onclick="ui.showWorkspaceSettings()">');

		appNav.showBack();
		var id = appNav.pushTemplate("workspace_tpl", {
				hide_toolbar: true,
				win_id: "workspace_win"
			});
		appNav.showLoading();
		$.getJSON(base_url + "workspace", {
			id: workspace_id
		}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				return session.showLogin();
			}
			if (!json.error) {
				console.log(json);
				var target = $("#workflow_list");
				var html = "";
				amplify.store("workspace_" + workspace_id, json);
				$.each(json.workflows, function (idx, workflow) {
					//amplify.store("workflow_
					html += $.loadUITemplate("workflow_cell_tpl", {
						id: workflow.workflow_id,
						name: workflow.name,
						workspace_id: workspace_id
					})
				});
				target.html(html);

			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});
	},
    showRole: function (role_id) {
		amplify.store("current_role_id", role_id);
		appNav.clearNav();
		appNav.showBack();
		var id = appNav.pushTemplate("role_tpl", {
				hide_toolbar: true,
				win_id: "role_win"
			});
		appNav.showLoading();
		$.getJSON(base_url + "role/members", {
			role_id: role_id
		}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				return session.showLogin();
			}
			if (!json.error) {
				console.log(json);
				var target = $("#role_members");
				var html = "";
				amplify.store("role_members_" + role_id, json);
				$.each(json, function (idx, role_member) {
					html += $.loadUITemplate("role_member_cell_tpl", {
						id: role_member.uid,
						first_name: role_member.first_name,
                        last_name: role_member.last_name,
                        email: role_member.email,
                        cellnum: role_member.cellnum,
                        last_name: role_member.first_name
					})
				});
				target.html(html);

			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});
	},
	loadWorkflowInit: function (workflow_id) {
		appNav.clearNav();
		appNav.showBack();
		appNav.hideToolbar();
		var args = {
			hide_toolbar: true,
			win_id: "workflow_init_win",
			id: workflow_id
		};
		return appNav.pushTemplate("workflow_init_tpl", args);
	},
	loadWorkflow: function (workflow_id, callback) {

		amplify.store("current_workflow_id", workflow_id);
		var uid = amplify.store("uid");
		appNav.showLoading();
		$.getJSON(base_url + "workflow", {
			id: workflow_id
		}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				return session.showLogin();
			}
			if (!json.error) {
				console.log(json);
				amplify.store("workflow_" + workflow_id, json);
				if (json.activities) {
					var activities = {};
					$.each(json.activities, function (act_idx, act) {
						if (act.questions) {
							var out_questions = {};
							$.each(act.questions, function (q_idx, question) {
								out_questions[question.question_id] = question;
							});
							act.questions = out_questions;
						}
						activities[act.activity_id] = act;
					});
					amplify.store("activities_" + workflow_id, activities);
				}
				if (json.connections) {
					amplify.store("connections_" + workflow_id, json.connections);
				}

				if (callback) {
					callback(json);
				}

			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
    

	loadAndDisplayWorkflow: function (workflow_id) {

		amplify.store("current_workflow_id", workflow_id);
		var uid = amplify.store("uid");

		ui.loadWorkflow(workflow_id, function (json) {
			var is_owner = false;
			appNav.clearNav();
			if (uid == json.owner_uid) {
				appNav.setNavRight('<div class="nav_link button" onclick="ui.showWorkflowEditor(\'' + workflow_id + '\')"><img class="back_arrow" src="images/edit_workflow.png" style="max-height:35px"></div>');
				is_owner = true;
			}
			if (json.initial_activity) {
				appNav.showBack();
				amplify.store("current_run_id", uuid4());
				var id = appNav.pushTemplate("workflow_tpl", {
						hide_toolbar: true,
						win_id: "workflow_win"
					});
				ui.showActivity(json.initial_activity);
			} else {
				ui.showBlankActivity(workflow_id, is_owner);
			}
      setTimeout(function () {
          $("#workflow_name").html("WorkFlow: "+amplify.store("workflow_" + workflow_id).name)
      }, 400);
		});

	},
    
    loadAndDisplayWorkflowData: function (workflow_id) {

		amplify.store("current_workflow_id", workflow_id);
		var uid = amplify.store("uid");
        appNav.showLoading();
		ui.getWorkflowFeedback(workflow_id, function (json) {
			var is_owner = false;
			appNav.clearNav();
			if (uid == json.created_by_uid) {
				appNav.setNavRight('<div class="nav_link button" onclick="ui.showWorkflowEditor(\'' + workflow_id + '\')"><img class="back_arrow" src="images/edit_workflow.png" style="max-height:35px"></div>');
				is_owner = true;
			}
      appNav.showBack();
      var id = appNav.pushTemplate("workflow_feedback_tpl", {
          hide_toolbar: true,
          win_id: "workflow_feedback_win"
      });
      setTimeout(function () {
          $("#workflow_name").html("WorkFlow: "+amplify.store("workflow_" + workflow_id).name)
      }, 400);
      console.log(json);
      var arr = $.map(json, function(el) { return [$.map(el.feedback_data, function(ele) { return ele })] });
      console.log(arr);
      var headers = [];
      var rows = {};
      $.each(json, function(i, row){
          if (!(row.run_id in rows)) rows[row.run_id] = row.feedback_data;
          else rows[row.run_id] = $.extend(rows[row.run_id], row.feedback_data);
          $.each(Object.keys(row.feedback_data), function(i, val){
              if(!headers.includes(val)) {
                  headers.push(val);
              }
          });
      });
      var rowArray = [];
      for (var row in rows) {
        rowArray.push(rows[row]);
      }
      var columns = [];
      $.each(headers, function(i, val){
          columns.push({
              'title': val,
              'data': val,
              'defaultContent': '<i>Not set</i>'
          });
      });
       
      var feedback_table = $('#feedback_table').DataTable( {
          data: rowArray,
          columns: columns,
          dom: 'Bfrtip',
          buttons: [
            {
                extend: 'csv',
                filename: amplify.store("workflow_" + workflow_id).name
            },
            {
                extend: 'pdf',
                filename: amplify.store("workflow_" + workflow_id).name
            },
            {
                extend: 'excel',
                filename: amplify.store("workflow_" + workflow_id).name
            },
              'copy', 'print'
          ]
      } );
      
      $('#feedback_table tbody').on('click', 'td', function () {
          var data = feedback_table.cell( this ).data();
          if ($.type(data) != 'object') return;
          appNav.pushTemplate("workflow_subfeedback_tpl", {
              hide_toolbar: true,
              win_id: "workflow_subfeedback_win"
          });
          arrayified_data = [];
          sub_columns = [];
          var subtable_name = $(feedback_table.column( this ).header()).html();
          var index = -1;
          sub_columns.push({'title': subtable_name});
          $.each(data, function(row_key, row){
              if (index == -1) {
                $.each(row, function(cell_key){
                    sub_columns.push({'title': cell_key});
                });
              }
              arrayified_data.push([]);
              index++;
              arrayified_data[index].push(row_key);
              $.each(row, function(cell_key, cell){
                  arrayified_data[index].push(cell);
              });
          });
          setTimeout(function () {
            var feedback_subtable = $('#feedback_subtable').DataTable( {
                data: arrayified_data,
                columns: sub_columns,
                dom: 'Bfrtip',
                buttons: [
                  {
                      extend: 'csv',
                      filename: amplify.store("workflow_" + workflow_id).name
                  },
                  {
                      extend: 'pdf',
                      filename: amplify.store("workflow_" + workflow_id).name
                  },
                  {
                      extend: 'excel',
                      filename: amplify.store("workflow_" + workflow_id).name
                  },
                    'copy', 'print'
                ]
            } );
          },300);
      });
      
      appNav.hideLoading();
		});

	},
	//Jan
	loadAndDisplayWorkflowGraph: function (workflow_id){
		amplify.store("current_workflow_id", workflow_id);
		var uid = amplify.store("uid");
        appNav.showLoading();
		ui.getWorkflowFeedback(workflow_id, function (json) {
			var is_owner = false;
			appNav.clearNav();
			if (uid == json.created_by_uid) {
				appNav.setNavRight('<div class="nav_link button" onclick="ui.showWorkflowEditor(\'' + workflow_id + '\')"><img class="back_arrow" src="images/edit_workflow.png" style="max-height:35px"></div>');
				is_owner = true;
			}
      appNav.showBack();
      var id = appNav.pushTemplate("workflow_feedchart_tpl", {
          hide_toolbar: true,
          win_id: "workflow_feedchart_win"
      });
      setTimeout(function () {
          $("#workflow_name").html("WorkFlow: "+amplify.store("workflow_" + workflow_id).name)
      }, 400);
      console.log(json);
      
      
      
      var arr = $.map(json, function(el) { return [$.map(el.feedback_data, function(ele) { return ele })] });
      console.log(arr);
      var headers = [];
      var rows = {};
      $.each(json, function(i, row){
          if (!(row.run_id in rows)) rows[row.run_id] = row.feedback_data;
          else rows[row.run_id] = $.extend(rows[row.run_id], row.feedback_data);
          $.each(Object.keys(row.feedback_data), function(i, val){
              if(!headers.includes(val)) {
                  headers.push(val);
              }
          });
      });
      var rowArray = [];
      for (var row in rows) {
        rowArray.push(rows[row]);
      }
      var columns = [];
      $.each(headers, function(i, val){
          columns.push({
              'title': val,
              'data': val,
              'defaultContent': '<i>Not set</i>'
          });
      }); 
     
      
     // gson = new Gson();
      
      
      // Form the SQL query that returns 
      //$sql="SELECT workflow_id FROM tbl_workflows";

      // Execute the query
      //pt=con.prepareStatement(sql);    
      //rs=pt.executeQuery();
      
      // The 'chartobj' map object holds the chart attributes and data.
      //var chartobj = new map();
      var chartobj = $.map(json, function(el) { return [$.map(el.feedback_data, function(ele) { return ele })] });
      console.log(arr);
       chartobj = new HashMap();
           
      chartobj.put("caption", "Workflow");
      chartobj.put("showValues", "0");
      chartobj.put("theme", "zune");

      // Push the data into the array using map object.
      var arrData = new ArrayList();
      while(rs.next()) {
          map.lv.get= new HashMap();
          lv.put("label", rs.getString("Current_workflow_tpl"));
          lv.put("value", rs.getString("Worflow"));
          arrData.add(lv);             
      }
      
      //close the connection.
      rs.close();

      //create 'dataMap' map object to make a complete FC datasource.
       var dataMap = new LinkedHashMap();  
  /*
      gson.toJson() the data to retrieve the string containing the
      JSON representation of the data in the array.
  */
       dataMap.put("chart", Json(chartobj));
       dataMap.put("data", Json(arrData));

      FusionCharts = new FusionCharts(
                  //type of chart
      			"column2d",				
                  //unique chart ID
                  "chart1",				
                  //width and height of the chart
                  "500","300",			
                  //div ID of the chart container
                  "chart",				
                  //data format
                  "json",					
                  //data source
                  gson.toJson(dataMap) 	
              );
      
     /* FusionCharts.ready(function(){
		    var revenueChart = new FusionCharts({
		        "type": "column2d",
		        "renderAt": "chart",
		        "width": "500",
		        "height": "300",
		        "dataFormat": "json",
		        "dataSource":  {
		          "chart": {
		            "caption": "#workflowname",
		            "subCaption": "current_workflow_id",
		            "xAxisName": "Month",
		            "yAxisName": "Revenues (In USD)",
		            "theme": "fint"
		         },
		         "data": [
		            {
		               "label": "Jan",
		               "value": "420000"
		            },
		            {
		               "label": "Feb",
		               "value": "810000"
		            },
		            {
		               "label": "Mar",
		               "value": "720000"
		            },
		            {
		               "label": "Apr",
		               "value": "550000"
		            },
		            {
		               "label": "May",
		               "value": "910000"
		            },
		            {
		               "label": "Jun",
		               "value": "510000"
		            },
		            {
		               "label": "Jul",
		               "value": "680000"
		            },
		            {
		               "label": "Aug",
		               "value": "620000"
		            },
		            {
		               "label": "Sep",
		               "value": "610000"
		            },
		            {
		               "label": "Oct",
		               "value": "490000"
		            },
		            {
		               "label": "Nov",
		               "value": "900000"
		            },
		            {
		               "label": "Dec",
		               "value": "730000"
		            }
		          ]
		      }

		  }); */
		revenueChart.render();
		
       
      var feedback_table = $('#feedback_table').DataTable( {
          data: rowArray,
          columns: columns,
          dom: 'Bfrtip',
          buttons: [
            {
                extend: 'csv',
                filename: amplify.store("workflow_" + workflow_id).name
            },
            {
                extend: 'pdf',
                filename: amplify.store("workflow_" + workflow_id).name
            },
            {
                extend: 'excel',
                filename: amplify.store("workflow_" + workflow_id).name
            },
              'copy', 'print'
          ]
      } );
      
      $('#feedback_table tbody').on('click', 'td', function () {
          var data = feedback_table.cell( this ).data();
          if ($.type(data) != 'object') return;
          appNav.pushTemplate("workflow_subfeedback_tpl", {
              hide_toolbar: true,
              win_id: "workflow_subfeedback_win"
          });
          arrayified_data = [];
          sub_columns = [];
          var subtable_name = $(feedback_table.column( this ).header()).html();
          var index = -1;
          sub_columns.push({'title': subtable_name});
          $.each(data, function(row_key, row){
              if (index == -1) {
                $.each(row, function(cell_key){
                    sub_columns.push({'title': cell_key});
                });
              }
              arrayified_data.push([]);
              index++;
              arrayified_data[index].push(row_key);
              $.each(row, function(cell_key, cell){
                  arrayified_data[index].push(cell);
              });
          });
          setTimeout(function () {
            var feedback_subtable = $('#feedback_subtable').DataTable( {
                data: arrayified_data,
                columns: sub_columns,
                dom: 'Bfrtip',
                buttons: [
                  {
                      extend: 'csv',
                      filename: amplify.store("workflow_" + workflow_id).name
                  },
                  {
                      extend: 'pdf',
                      filename: amplify.store("workflow_" + workflow_id).name
                  },
                  {
                      extend: 'excel',
                      filename: amplify.store("workflow_" + workflow_id).name
                  },
                    'copy', 'print'
                ]
            } );
          },300);
      });
      
      appNav.hideLoading();
		});

		
		
	//})
      
      
      
      
	},



	showBlankActivity: function (workflow_id, is_owner) {
		//appNav.clearNav();
		appNav.showBack();
		if (is_owner) {
			var id = appNav.pushTemplate("blank_activity_owner_tpl", {
					hide_toolbar: true,
					win_id: "blank_activity_win",
					workflow_id: workflow_id
				});
		} else {
			var id = appNav.pushTemplate("blank_activity_tpl", {
					hide_toolbar: true,
					win_id: "blank_activity_win"
				});
		}

	},

	resetFormIcon: function (type) {
		if (type == "form_icon") {
			$(".form_icon_container").html('<div class="activity_drop draggable drag-drop icon_circle blue_background" data-type="form_icon">F</div>');
		} else if (type == "notify_icon") {
			$(".notify_icon_container").html('<div class="activity_drop draggable drag-drop icon_circle green_background" data-type="notify_icon">N</div>');
		} else if (type == "role_icon") {
			$(".role_icon_container").html('<div class="activity_drop draggable drag-drop icon_circle orange_background" data-type="role_icon">R</div>');
		} else if (type == "api_icon") {
			$(".api_icon_container").html('<div class="activity_drop draggable drag-drop icon_circle purple_background" data-type="api_icon">API</div>');
		} else if (type == "timer_icon") {
			$(".timer_icon_container").html('<div class="activity_drop draggable drag-drop icon_circle pink_background" data-type="timer_icon">T</div>');
		} else if (type == "payment_icon") {
			$(".payment_icon_container").html('<div class="activity_drop draggable drag-drop icon_circle red_background" data-type="payment_icon">$</div>');
		}

	},
	setDroppable: function (target, accept, on_drag_enter, on_drag_drop) {
		console.log("ACCEPT");
		console.log(accept);
		console.log("TARGET");
		console.log(target);
		interact(target).dropzone({
			// only accept elements matching this CSS selector
			accept: accept,
			// Require a 75% element overlap for a drop to be possible
			overlap: 0.75,

			// listen for drop related events:

			ondropactivate: function (event) {
				// add active dropzone feedback
				//console.log("ondropactivate")
				//event.target.classList.add('drop-active');
			},
			ondragenter: function (event) {
				//console.log("ondragenter >>>>>>>>>>>>")
				if (on_drag_enter) {
					on_drag_enter(event);
				}
				// feedback the possibility of a drop
				//dropzoneElement.classList.add('drop-target');
				//draggableElement.classList.add('can-drop');
				//draggableElement.textContent = 'Dragged in';
			},
			ondragleave: function (event) {
				//console.log("ONDRAG LEAVE >>>>>>>>");
				// remove the drop feedback style
				//event.target.classList.remove('drop-target');
				//event.relatedTarget.classList.remove('can-drop');
				//event.relatedTarget.textContent = 'Dragged out';
			},
			ondrop: function (event) {
				console.log("ONDRAG DROP >>>>>>>>");

				if (on_drag_drop) {
					on_drag_drop(event);
				}
			},
			ondropdeactivate: function (event) {
				console.log("ONDRAG DEACTIVATE >>>>>>>>");
				// remove active dropzone feedback
				//event.target.classList.remove('drop-active');
				//event.target.classList.remove('drop-target');
			}
		});

	},

	/*
	makePermanentActivityConnection: function(from_id, to_id) {
	var connector_id = uuid4();
	$(".activity_object[data-id=" + from_id + "]").connections({
	to: ".activity_object[data-id=" + to_id + "]",
	'class': 'activity_connection activity_connection_' + connector_id,
	within: '.activity_drop_zone'
	});
	return connector_id;
	},
	 */

	storeActivity: function (workflow_id, act_id, act_obj) {
		/*
		var activities = amplify.store("activities_" + workflow_id);
		if (! activities) {
		activities = {};
		}
		 */
		var activities = ui.getActivitiesByWorkflowId(workflow_id);
		activities[act_id] = act_obj;
		//workflow["activities"] = activities;
		amplify.store("activities_" + workflow_id, activities);
	},
	storeConnection: function (workflow_id, from_id, to_id, connection_id) {
		var connections = amplify.store("connections_" + workflow_id);
		if (!connections) {
			connections = [];
		}
		var exists = false;
		$.each(connections, function (idx, cnx) {
			if ((cnx.from_id == from_id || cnx.to_id == from_id) && (cnx.from_id == to_id || cnx.to_id == to_id)) {
				console.log("CONNECTION exists");
				exists = true;
			}
		});
		if (exists) {
			console.log("Connection seems to already exist");
			return;
		}
		connections.push({
			from_id: from_id,
			to_id: to_id,
			connection_id: connection_id
		});
		//workflow["connections"] = connections;
		amplify.store("connections_" + workflow_id, connections);
		console.log("connections_" + workflow_id);

	},
	/*
	redrawConnections: function(workflow_id) {
	return;



	if (! workflow_id) {
	workflow_id = amplify.store("current_workflow_id");
	}
	$(".activity_connection").remove();
	var connections = amplify.store("connections_" + workflow_id);
	if (!connections) {
	return;
	}
	$.each(connections, function(idx, conn) {
	$(".activity_object[data-id=" + conn.from_id + "]").connections({
	to: $(".activity_object[data-id=" + conn.to_id + "]"),
	"class": "activity_connection activity_connection_" + conn.connection_id,
	within: '.activity_drop_zone'
	});
	$(".activity_connection_" + conn.connection_id).attr("data-connection-id", conn.connection_id);
	if (conn.question_ref) {
	var pretty = conn.question_ref + " " + conn.check_condition.replace("_", " ") + " " + conn.check_value;
	$(".activity_connection_" + conn.connection_id).html('<div class="connector_text_wrap"><div class="connector_text">'+pretty+'</div></div>');
	}
	//$(".activity_connection_" + conn.connection_id).attr("onclick", "ui.connectionClick('"+conn.connection_id+"')");
	});
	$(".activity_connection").on("blur", function(event) {
	$(event.target).css("border-color", "white");
	});
	$(".activity_connection").on("click", function(event) {
	$(".activity_connection").css("border-color", "white");
	$(event.target).css("border-color", "yellow");
	var connection_id = $(event.target).attr("data-connection-id");
	if (! connection_id) {
	connection_id = $(event.target).closest(".activity_connection").attr("data-connection-id");
	}
	ui.showConnectionEditor(connection_id);
	});
	$(".activity_object").css("z-index", "4000");
	},
	 */
	saveConnectionRule: function (connection_id) {
		var workflow_id = amplify.store("current_workflow_id");
		var connections = ui.getConnectionsByWorkflowId(workflow_id);
		var conn = null;
		$.each(connections, function (idx, connection) {
			if (connection.connection_id == connection_id) {
				conn = connection;
			};
		});
		var question_type_id = $("#connection_question_ref").find("option:selected").attr("data-type");
		if (question_type_id == "7") {
			conn.check_value = $("#connection_check_value_yes_no").val();
			conn.check_condition = "is";
		} else {
			conn.check_value = $("#connection_check_value").val();
			conn.check_condition = $("#connection_check_condition").val();
		}
		conn.question_ref = $("#connection_question_ref").val();
		connections[connection_id] = conn;
		amplify.store("connections_" + workflow_id, connections);
		appNav.popTemplate();
    
    if (conn.question_ref) {
      var pretty = conn.question_ref + " " + conn.check_condition.replace("_", " ") + " " + conn.check_value;
    }
    else {
      if (unlabled_connections[conn.from_id]["unlabled"] == 1) {
        if (unlabled_connections[conn.from_id]["total"] == 1) var pretty = "always";
        else var pretty = "else";
      }
      else var pretty = "Click to define rule";
    }
    ui.workflow_connections[connection_id].removeOverlay("label_" + connection_id);
    ui.workflow_connections[connection_id].addOverlay(["Label", {
        label: pretty,
        id: "label_" + connection_id,
        labelStyle: {
          fill: "#222222",
          color: "white",
          padding: "2px"
        }
      }
    ]); 
		/*    
		setTimeout(ui.jsPlumb.deleteEveryConnection, 200);
		setTimeout(function () {
			ui.renderConnections(workflow_id);
		}, 500);
		 */
	},
	deleteConnectionRule: function (connection_id) {
		var workflow_id = amplify.store("current_workflow_id");
		var connections = ui.getConnectionsByWorkflowId(workflow_id);
		var out_connections = [];
		$.each(connections, function (idx, connection) {
			if (connection.connection_id != connection_id) {
				out_connections.push(connection);
			};
		});
		amplify.store("connections_" + workflow_id, out_connections);
		var conns = ui.jsPlumb.select().getLabel();
		$.each(conns, function (idx, conn) {
			if (conn[1].id == connection_id) {
				ui.jsPlumb.deleteConnection(conn[1]);
			}
		});
		//jsPlumb.deleteConnectionsForElement("7da2fbfe-7848-4a13-8fd0-8a2e00211151")
		appNav.popTemplate();
		//setTimeout(ui.redrawConnections, 500);
		//ui.redrawConnections();
	},
	connectionQuestionChange: function () {
		var question_type_id = $("#connection_question_ref").find("option:selected").attr("data-type");
		console.log(question_type_id);
		if (question_type_id == "7") {
			$("#connection_check_value_yes_no").show();
			$("#connection_check_value").hide();
			$("#connection_check_condition").hide();
		} else {
			$("#connection_check_value_yes_no").hide();
			$("#connection_check_value").show();
			$("#connection_check_condition").show();
		}
	},
	showConnectionEditor: function (connection_id) {
		console.log(connection_id);
		var workflow_id = amplify.store("current_workflow_id");
		appNav.clearNav();
		appNav.showBack();
		var args = {
			name: name,
			connection_id: connection_id,
			hide_toolbar: true,
			win_id: "edit_connection"
		};
		var id = appNav.pushTemplate("edit_connection_tpl", args);
		var questions = ui.getQuestions();
		$.each(questions, function (question_ref, question) {
			$("#connection_question_ref").append('<option data-type="' + question.question_type_id + '" value="' + question_ref + '">[' + question_ref + '] ' + question.question_text + '</option>');
		});
		var connection = ui.getConnection(workflow_id, connection_id);
		if (!connection) {
			return;
		}
		if (connection.question_ref) {
			$("#connection_question_ref").val(connection.question_ref);
		}
		if (connection.check_condition) {
			$("#connection_check_condition").val(connection.check_condition);
		}
		if (connection.check_value) {
			$("#connection_check_value").val(connection.check_value);
			$("#connection_check_value_yes_no").val(connection.check_value);
		}
		ui.connectionQuestionChange();

	},
	getConnection: function (workflow_id, connection_id) {
		var connections = ui.getConnectionsByWorkflowId(workflow_id);
		var connection = null;
		$.each(connections, function (idx, conn) {
			if (conn.connection_id == connection_id) {
				connection = conn;
			}
		});
		return connection;

	},
	getActivitiesByWorkflowId: function (workflow_id) {
		var activities = amplify.store("activities_" + workflow_id);
		if (!activities) {
			activities = {};
		}
		return activities;

	},
	getConnectionsByWorkflowId: function (workflow_id) {
		var connections = amplify.store("connections_" + workflow_id);
		if (!connections) {
			connections = {};
		}
		return connections;
	},
	renderActivities: function (workflow_id) {
        setTimeout(function () {
            ui.loadActivityEndPoint("connector_1");
        }, 300);
		var activities = ui.getActivitiesByWorkflowId(workflow_id);
		$.each(activities, function (act_id, act) {
			var args = {
				top: act.position_top,
				left: act.position_left,
				id: act_id,
				name: (act.name || "")
			};

			try {
				var type = act.type ? act.type : ui.getActivityTypeDesc(act.activity_type_id);
				console.log("--------------");
				console.log(act);
				console.log(type);
				console.log("------------->");
				$(".activity_drop_zone").append($.loadUITemplate("activity_" + type + "_object_tpl", args));
				setTimeout(function () {
					ui.loadActivityEndPoint(act_id);
                    ui.convertClick();
				}, 300);
			} catch (e) {
				console.log("COULD NOT LOAD ACTIVITY");
				console.log(e);
			}
		});
		/*
		console.log(">>>>>>>>>>>>><<<<<<<<<<<<");
		setTimeout(function() {
		ui.redrawConnections(workflow_id);
		}, 500);
		 */
		/*
		var connections = ui.getConnectionsByWorkflowId(workflow_id);
		$.each(connections, function(idx, conn) {

		});
		 */
	},
	getActivityTypeDesc: function (activity_type_id) {
		var type_short_desc = "form";
		console.log("getting for type " + activity_type_id);
		$.each(ui.activity_types, function (t_short, type) {
			if (type.type_id == activity_type_id) {
				type_short_desc = t_short;
			}
		});
		console.log(type_short_desc);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		return type_short_desc;
	},

	activity_types: {
		"form": {
			display_name: "Form",
			type_id: 1
		},
		"notify": {
			display_name: "Notification",
			type_id: 2
		},
		"timer": {
			display_name: "Timer",
			type_id: 4
		},
		"calc": {
			display_name: "Calculation",
			type_id: 5
		},
		"role": {
			display_name: "Role",
			type_id: 3
		},
		"api": {
			display_name: "API",
			type_id: 7
		},
		"payment": {
			display_name: "Payment",
			type_id: 8
		}

	},

	showActivityEditor: function (activity_id) {
		var workflow_id = amplify.store("current_workflow_id");
		amplify.store("current_activity_id", activity_id);
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[activity_id];
		act.type = act.type ? act.type : ui.getActivityTypeDesc(act.activity_type_id)
			console.log(act.type);
		if (act.type == "form") {
			ui.showFormEditor(workflow_id, activity_id, act);
		} else if (act.type == "notify") {
			ui.showNotifyEditor(workflow_id, activity_id, act);
		} else if (act.type == "timer") {
			ui.showTimerEditor(workflow_id, activity_id, act);
		} else if (act.type == "role") {
			ui.showRoleEditor(workflow_id, activity_id, act);
		} else if (act.type == "api") {
			ui.showAPIEditor(workflow_id, activity_id, act);
		} else if (act.type == "payment") {
			ui.showPaymentEditor(workflow_id, activity_id, act);
		}

	},

	getQuestions: function (workflow_id) {
		if (!workflow_id) {
			workflow_id = amplify.store("current_workflow_id");
		}
		var activities = amplify.store("activities_" + workflow_id);
		var result = {};
		if (!activities) {
			return result;
		}
		$.each(activities, function (activity_id, act) {
			if (act.questions) {
				$.each(act.questions, function (q_id, question) {
					if (question.question_type_id == "0") {
						return;
					}
					result[question.question_ref] = question;
				});
			}
		});
		return result;
	},

	updateQuestionPosition: function (question_id, top, left) {
		var workflow_id = amplify.store("current_workflow_id");
		//var activities = amplify.store("activities_" + workflow_id);

		var type_id = $("#question_type_selector").val();
		var act_id = amplify.store("current_activity_id");

		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.questions) {
			return;
		}
		if (!act.questions[question_id]) {
			return;
		}
		var args = {
			question_id: question_id,
			question_type_id: type_id
		};
		$(".question_data").each(function (idx, el) {
			var obj = $(el);
			args[obj.attr("id")] = obj.val();
		});
		console.log(args);
		act.questions[question_id] = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);

	},

	showAddQuestion: function () {
		var slider = $("#add_question_selector");
		slider.css("left", $(window).width() + "px");
		slider.css("display", "block");
		var win_width = $(window).width();

		var slide_to = win_width - (win_width * 0.38);
		slider.css("width", (win_width * 0.38) + "px");
		slider.velocity({
			left: slide_to
		}, 300, function () {});

	},
	closeAddQuestion: function () {
		var slider = $("#add_question_selector");
		var slide_to = $(window).width();
		slider.velocity({
			left: slide_to
		}, 300, function () {
			slider.css("display", "none");
		});

	},
    toggleScroll: function () {
        if ($("#edit_question_list").css("touch-action") == "auto") {
            $("#edit_question_list").css("touch-action", "none");
        } else {
            $("#edit_question_list").css("touch-action", "auto");
        }
		

	},

	showTimerEditor: function (workflow_id, activity_id, act) {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.timer) {
			act.timer = {
				timer_rule: "fixed"
			};
		}
		appNav.clearNav();
		appNav.showBack();
		var name = act.name || act.type
			var args = {
			name: name,
			hide_toolbar: false,
			win_id: "edit_activity"
		};
		appNav.showToolbar("edit_activity_toolbar_tpl", {
			activity_id: activity_id
		});

		var id = appNav.pushTemplate("edit_activity_timer_tpl", args);

		//$("#notify_to").val(act.notify.to_email);
		$.each(act.timer, function (key, value) {
			$("#" + key).val(value);
		});

		ui.setTimerRules();
	},

	setTimerRules: function () {
		var rule = $("#timer_rule").val();
		$(".timer_options").hide();
		$("[data-rule=" + rule + "]").show();
	},

	saveTimer: function () {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		if (!act.timer) {
			act.timer = {};
		}

		var args = {};

		$(".timer_option").each(function (idx, el) {
			var name = $(el).attr("id");
			var value = $(el).val();
			args[name] = value;
		});

		act.timer = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();

	},
	showPaymentEditor: function (workflow_id, activity_id, act) {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		console.log(act);
		if (!act.payment) {
			act.payment = {
				payment_description: "",
				payment_total: "0"
			};
		}
		appNav.clearNav();
		appNav.showBack();
		var name = act.name || act.type
			var args = {
			name: name,
			hide_toolbar: false,
			win_id: "edit_activity"
		};
		appNav.showToolbar("edit_activity_toolbar_tpl", {
			activity_id: activity_id
		});
		var id = appNav.pushTemplate("edit_activity_payment_tpl", args);
		$("#payment_description").val(act.payment.payment_description);
		$("#payment_total").val(act.payment.payment_total);
	},

	showAPIEditor: function (workflow_id, activity_id, act) {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.api) {
			act.api = {
				api_user: "",
				api_password: "",
				api_url: "",
				api_method: "",
				api_params: ""
			};
		}
		appNav.clearNav();
		appNav.showBack();
		var name = act.name || act.type
			var args = {
			name: name,
			hide_toolbar: false,
			win_id: "edit_activity"
		};
		appNav.showToolbar("edit_activity_toolbar_tpl", {
			activity_id: activity_id
		});
		var id = appNav.pushTemplate("edit_activity_api_tpl", args);
		$("#api_user").val(act.api.api_user);
		$("#api_password").val(act.api.api_password);
		$("#api_url").val(act.api.api_url);
		$("#api_method").val(act.api.api_method);
		$("#api_params").val(act.api.api_params);
	},

	savePayment: function () {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		if (!act.payment) {
			act.payment = {};
		}
		var args = {
			payment_description: $("#payment_description").val(),
			payment_total: $("#payment_total").val()
		};

		act.payment = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();

	},

	saveAPI: function () {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		if (!act.api) {
			act.api = {};
		}
		var args = {
			api_user: $("#api_user").val(),
			api_password: $("#api_password").val(),
			api_url: $("#api_url").val(),
			api_method: $("#api_method").val(),
			api_params: $("#api_params").val()
		};

		act.api = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();

	},

	showRoleEditor: function (workflow_id, activity_id, act) {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.role) {
			act.role = {
				role_email: "",
				role_body: ""
			};
		}
		appNav.clearNav();
		appNav.showBack();
		var name = act.name || act.type
			var args = {
			name: name,
			hide_toolbar: false,
			win_id: "edit_activity"
		};
		appNav.showToolbar("edit_activity_toolbar_tpl", {
			activity_id: activity_id
		});
		var id = appNav.pushTemplate("edit_activity_role_tpl", args);
		$("#role_email").val(act.role.role_email);
		$("#role_body").val(act.role.role_body);

		$("#role_type").val(act.role.role_type);

		var roles = amplify.store("roles");
		if (!roles) {
			roles = [];
		}
		$.each(roles, function (idx, role) {
			$("#select_role_id").append('<option value="' + role.role_id + '">' + role.role_name + '</option>');
		});
		$("#select_role_id").val(act.role.role_id || '');
		ui.changeActivityRoleType();
		ui.loadActivityRoleMembers(function () {
			$("#select_uid").val(act.role.uid || '');
		});
	},
	loadActivityRoleMembers: function (callback) {
		var role_id = $("#select_role_id").val();
		ui.getRoleMembers(role_id, function (rows) {
			$.each(rows, function (idx, row) {
				$("#select_uid").append('<option value="' + row.uid + '">' + row.email || row.cellnum + '</option>');
			});
			if (callback) {
				callback();
			}
		});
	},

	saveRole: function () {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		var role_type = $("#role_type").val();
		var role_id = $("#select_role_id").val();
		var uid = $("#select_uid").val();
		var role_email = $("#role_email").val();
		var role_body = $("#role_body").val();
		if (!act.role) {
			act.role = {};
		}
		var args = {
			role_email: role_email,
			role_body: role_body,
			role_type: role_type,
			role_id: role_id,
			uid: uid
		};

		act.role = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();

	},

	showNotifyEditor: function (workflow_id, activity_id, act) {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.notify) {
			act.notify = {
				to_email: "",
				bcc_email: "",
				subject: "",
				body: ""
			};
		}
		appNav.clearNav();
		appNav.showBack();
		var name = act.name || act.type
			var args = {
			name: name,
			hide_toolbar: false,
			win_id: "edit_activity"
		};
		appNav.showToolbar("edit_activity_toolbar_tpl", {
			activity_id: activity_id
		});
		var id = appNav.pushTemplate("edit_activity_notify_tpl", args);
		$("#notify_to").val(act.notify.to_email);
		$("#notify_bcc").val(act.notify.bcc_email);
		$("#notify_subject").val(act.notify.subject);
		$("#notify_body").val(act.notify.body);
	},

	saveNotify: function () {
		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		if (!act.notify) {
			act.notify = {};
		}
		var args = {
			to_email: $("#notify_to").val(),
			bcc_email: $("#notify_bcc").val(),
			subject: $("#notify_subject").val(),
			body: $("#notify_body").val()
		};

		act.notify = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();

	},
    
    //Workflow deleting
    showDeleteWorkflow: function (workflow_id) {
		console.log("deleting ",workflow_id);
		appNav.showDialog({
			message: "Are you sure you want to delete this WorkFlow?",
			ok: function () {
				ui.doDeleteWorkflow(workflow_id);
			},
			cancel: appNav.closeDialog
		});
	},
    
	doDeleteWorkflow: function (workflow_id) {
        appNav.showLoading(null, null, "Deleting...");
		$.get(base_url + "delete/workflow", {
			"workflow": workflow_id
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
                var workspace_id = amplify.store("current_workspace_id");
                amplify.store("workflow_" + workflow_id, "");
				appNav.closeDialog();
				setTimeout(function () {
                    appNav.hideLoading();
					ui.showWorkspace(workspace_id);
				}, 300);
			} else {
                appNav.hideLoading();
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},
    
    //Workspace deleting
    showDeleteWorkspace: function (workspace_id) {
		console.log("deleting ",workspace_id);
		appNav.showDialog({
			message: "Are you sure you want to delete this WorkSpace?",
			ok: function () {
				ui.doDeleteWorkspace(workspace_id);
			},
			cancel: appNav.closeDialog
		});
	},
    
	doDeleteWorkspace: function (workspace_id) {
        appNav.showLoading(null, null, "Deleting...");
		$.get(base_url + "delete/workspace", {
			"workspace": workspace_id
		}, function (json) {
			if (!json.error) {
				appNav.closeDialog();
				setTimeout(function () {
                    appNav.hideLoading();
					ui.showHome(true);
				}, 300);
			} else {
                appNav.hideLoading();
				appNav.showDialog({
					"message": json.error,
					"back": appNav.closeDialog
				});

			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				"message": "A network error occurred",
				"back": appNav.closeDialog
			});
		});
	},
    
    //Form Item deleting
    showDeleteFormItem: function (question_id) {
		console.log(question_id);
		appNav.showDialog({
			message: "Are you sure you want to delete this form item?",
			ok: function () {
				ui.doDeleteFormItem(question_id);
				var activity_id = amplify.store("current_activity_id");
                appNav.popTemplate();
				appNav.closeDialog();
				setTimeout(function () {
					ui.showActivityEditor(activity_id);
				}, 300);
			},
			cancel: appNav.closeDialog
		});
	},
    doDeleteFormItem: function (question_id) {
		var workflow_id = amplify.store("current_workflow_id");
        var activity_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		delete activities[activity_id]['questions'][question_id];
		amplify.store("activities_" + workflow_id, activities);
	},
    
    //Activity deleting
    showDeleteActivity: function (activity_id) {
		console.log(activity_id);
		appNav.showDialog({
			message: "Are you sure you want to delete this activity?",
			ok: function () {
				ui.doDeleteActivity(activity_id);
				var workflow_id = amplify.store("current_workflow_id");
				appNav.popTemplate();
				appNav.closeDialog();
				setTimeout(function () {
					ui.showWorkflowEditor(workflow_id);
				}, 300);
			},
			cancel: appNav.closeDialog
		});
	},
	doDeleteActivity: function (activity_id) {
		var workflow_id = amplify.store("current_workflow_id");
		var activities = amplify.store("activities_" + workflow_id);
		delete activities[activity_id];
		amplify.store("activities_" + workflow_id, activities);
	},
    // Opens the editor for a form element
	showFormEditor: function (workflow_id, activity_id, act) {

		appNav.clearNav();
		appNav.showBack();
		var name = act.name || act.type
			var args = {
			name: name,
			activity_id: activity_id,
			hide_toolbar: false,
			win_id: "edit_activity"
		};
		appNav.showToolbar("edit_activity_toolbar_tpl", {
			activity_id: activity_id
		});
		var id = appNav.pushTemplate("edit_activity_form_tpl", args);

		ui.setDroppable(".designer_questions_drop_zone", ".designer_question_draggable", null, function (event) {
			console.log(event);

		});

		ui.setDroppable(".designer_questions_drop_zone", ".draggable_question_type", null, function (event) {

			console.log(event);
			var offset = $(".designer_questions_drop_zone").offset();
			var x = event.dragEvent.clientX - offset.left;
			var y = event.dragEvent.clientY - offset.top;
			y = y + 60;
			x = x - 30;
			var type_id = (event.relatedTarget.getAttribute('data-question-type') || "");

			var workflow_id = amplify.store("current_workflow_id");

			var act_id = amplify.store("current_activity_id");

			var activities = amplify.store("activities_" + workflow_id);
			var act = activities[act_id];
			if (!act.questions) {
				act.questions = {};
			}
			question_id = uuid4();
			var label_position_top = y;
			var label_position_left = x;
			var position_top = y + 30;
			var position_left = x;
			var q_count = (Object.keys(act.questions).length)++;
			var question_ref = "question_" + q_count;
			var args = {
				label_position_top: label_position_top,
				label_position_left: label_position_left,
				question_ref: question_ref,
				position_top: position_top,
				position_left: position_left,
				question_id: question_id,
				question_type_id: type_id,
				question_text: "Edit this question",
			};

			if (type_id == 7) {
				args.options = '<input type="checkbox" class="switchery">';
			}

			act.questions[question_id] = args;
			activities[act_id] = act;
			amplify.store("activities_" + workflow_id, activities);
			var type_ref = ui.question_types[type_id].ref;
			$("#edit_question_list").append($.loadUITemplate("designer_question_" + type_ref + "_tpl", args));

			console.log(".label[data-question-id=" + question_id + "]");
			if (label_position_top) {
				$(".label[data-question-id=" + question_id + "]").css("position", "absolute");
				$(".label[data-question-id=" + question_id + "]").css("top", label_position_top + "px");
				$(".label[data-question-id=" + question_id + "]").css("left", label_position_left + "px");
			}
			$(".question_input[data-question-id=" + question_id + "]").css("position", "absolute");
			$(".question_input[data-question-id=" + question_id + "]").css("top", position_top + "px");
			$(".question_input[data-question-id=" + question_id + "]").css("left", position_left + "px");
			if (type_id == 7) {
				try {
					new Switchery(document.querySelector(".switchery"));
				} catch (e) {}
			}

			$(event.relatedTarget).css("transform", "translate(0,0)");
			$(event.relatedTarget).attr("data-x", "0");
			$(event.relatedTarget).attr("data-y", "0");
		});

		ui.setSnapDraggable(".draggable_question_type", ".designer_questions_drop_zone", null, function (event) {}, function (event) {
			$(event.target).css("color", "green");
		});

		ui.setSnapDraggable(".designer_question_draggable", ".designer_questions_drop_zone", null, function (event) {

			var question_id = (event.target.getAttribute('data-question-id') || "");

			var offset = $(".designer_questions_drop_zone").offset();
			var workflow_id = amplify.store("current_workflow_id");
			//var offset = $(".activity_drop_zone").offset();
			//var x = event.clientX + offset.left;
			//var y = event.clientY;
			/*
			if (offset.top < 0) {
			offset.top = offset.top * -1;
			y = event.clientY + offset.top;
			}
			 */
			var pos = $(event.target).position();
			var x = pos.left;
			var y = (offset.top - pos.top - 161) * -1;
			//y = y + 60;
			var act_id = amplify.store("current_activity_id");
			var activities = amplify.store("activities_" + workflow_id);
			var act = activities[act_id];
			if (!act.questions) {
				act.questions = {};
			}
			var label_position_top;
			var label_position_left;
			var position_top;
			var position_left;
			if ($(event.target).hasClass("label")) {
				label_position_top = y;
				label_position_left = x;
				act.questions[question_id].label_position_top = y;
				act.questions[question_id].label_position_left = x;
				/*
				$(".label[data-question-id="+question_id+"]").css("position", "relative");
				$(".label[data-question-id="+question_id+"]").css("top", label_position_top + "px");
				$(".label[data-question-id="+question_id+"]").css("left", label_position_left + "px");
				 */
			} else {
				position_top = y;
				position_left = x;
				act.questions[question_id].position_top = y;
				act.questions[question_id].position_left = x;

			}

			activities[act_id] = act;
			amplify.store("activities_" + workflow_id, activities);

		});
		if (!act.questions || jQuery.isEmptyObject(act.questions)) {
			act.questions = {};
			var btn_id = uuid4();
			var btn = {
				question_id: btn_id,
				activity_id: activity_id,
				question_text: "Submit",
				question_type_id: "0"
			};
			act.questions[btn_id] = btn;
			var activities = amplify.store("activities_" + workflow_id);

			activities[activity_id] = act;
			amplify.store("activities_" + workflow_id, activities);

		}
		var options_id = 0;
		$.each(act.questions, function (question_id, question) {
			if (!question.question_type_id && question.question_type_id != "0") {
				return;
			}
			var type_ref = ui.question_types[question.question_type_id].ref;
			$("#edit_question_list").append($.loadUITemplate("designer_question_" + type_ref + "_tpl", question));
			if (!question.label_position_top && !question.position_top) {
				return;
			}
			if (question.label_position_top) {
				$(".label[data-question-id=" + question_id + "]").css("position", "absolute");
				$(".label[data-question-id=" + question_id + "]").css("top", question.label_position_top + "px");
				$(".label[data-question-id=" + question_id + "]").css("left", question.label_position_left + "px");
			}
			if (question.position_left < 0) {
				question.position_left = 0;
			}
			$(".question_input[data-question-id=" + question_id + "]").css("position", "absolute");
			$(".question_input[data-question-id=" + question_id + "]").css("top", question.position_top + "px");
			$(".question_input[data-question-id=" + question_id + "]").css("left", question.position_left + "px");

			if (question.question_type_id == 7) {
				new Switchery(document.getElementById("question_" + question_id));
			} else if (question.question_type_id == 8) {
				if (question.question_options) {

					var options = question.question_options.split("\n");
					var target = $("#options_for_" + question_id);
					$.each(options, function (idx, opt) {
						options_id++;
						target.append('<option value="' + opt + '">' + opt + '</option>');
					});
				}
			}

		});

	},
    // Show the editor for a 'question' type form element
	showEditFormQuestion: function (question_id) {
    amplify.store("current_question_id",question_id);
		if (!question_id) {
			question_id = uuid4();
		}
		appNav.clearNav();
		appNav.showBack();
		var args = {
			question_id: question_id,
			hide_toolbar: true,
			win_id: "edit_question"
		};
		var id = appNav.pushTemplate("edit_form_question_tpl", args);
		ui.setQuestionOptions(question_id);
	},
    // Show the editor for a 'submit' button
	showEditFormSubmit: function (question_id) {
		if (!question_id) {
			question_id = uuid4();
		}
		appNav.clearNav();
		appNav.showBack();
		var args = {
			question_id: question_id,
			hide_toolbar: true,
			win_id: "edit_question"
		};
		var id = appNav.pushTemplate("edit_form_submit_tpl", args);

		var workflow_id = amplify.store("current_workflow_id");
		var act_id = amplify.store("current_activity_id");
		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];
		if (!act.questions) {
			act.questions = {};
		}
		var question = act.questions[question_id];
        console.log(question);
        $("#question_text").val(question.question_text);
	},
	question_types: {
		"0": {
			desc: "Submit Button",
			ref: "submit"
		},

		"1": {
			desc: "Short Text",
			ref: "short_text"
		},
		"2": {
			desc: "Long Text",
			ref: "long_text"
		},
		"3": {
			desc: "Rich Text",
			ref: "rich_text"
		},
		"4": {
			desc: "Date",
			ref: "date"
		},
		"5": {
			desc: "Number",
			ref: "number"
		},
		"6": {
			desc: "Email",
			ref: "email"
		},
		"7": {
			desc: "Yes / No",
			ref: "yes_no"
		},
		"8": {
			desc: "Multiple Choice",
			ref: "multi_choice"
		},
		"9": {
			desc: "Auto Complete",
			ref: "auto_complete"
		},
		"10": {
			desc: "Dropdown",
			ref: "dropdown"
		},
		"11": {
			desc: "Statement",
			ref: "statement"
		},
		"12": {
			desc: "File Upload",
			ref: "file_upload"
		},
		"13": {
			desc: "Button",
			ref: "button"
		},
		"14": {
			desc: "Table",
			ref: "table"
		}
	},
	toggleDataLinkKeyColumn: function (key) {
		var data_set_id = $("#data_link").val();
		if (!data_set_id) {
			return;
		}
		var data_sets = amplify.store("data_sets");
		$("#data_link_key").empty();
		$.each(data_sets, function (idx, set) {
			if (set.data_set_id == data_set_id) {
				if (set.col_names) {
					$.each(set.col_names, function (col_idx, col_name) {
						$("#data_link_key").append('<option value="' + col_name + '">' + col_name + '</option>');
					});
				}
			}
		});
		if (key) {
			$("#data_link_key").val(key);
		}

	},
	toggleDataLinkOptions: function () {
		var selected = $("#data_link").val();
		if (selected == "" || selected == null) {
      $("#data_link").val("");
			$("#manual_data_options").show();
			$("#imported_data_options").hide();
		} else {
			$("#manual_data_options").hide();
			$("#imported_data_options").show();
		}

	},
	setQuestionOptions: function (question_id, is_change) {

		//var type_id = $("#question_type_selector").val();

		var workflow_id = amplify.store("current_workflow_id");

		//var type_id = $("#question_type_selector").val();
		var act_id = amplify.store("current_activity_id");

		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.questions) {
			act.questions = {};
		}
		var question = act.questions[question_id];

		if (is_change) {
			var type = ui.question_types[$("#question_type_selector").val()].ref;

		} else {
			var type = ui.question_types[question.question_type_id].ref;

		}
		var args = {};

		$("#edit_question_options").html($.loadUITemplate("edit_question_type_" + type + "_tpl", args));
        
		$("#edit_question_options .ckeditor").ckeditor({
			// Define the toolbar groups as it is a more accessible solution.
			toolbarGroups: [{
					"name": "basicstyles",
					"groups": ["basicstyles"]
				}, {
					"name": "links",
					"groups": ["links"]
				}, {
					"name": "paragraph",
					"groups": ["list", "blocks"]
				}, {
					"name": "document",
					"groups": ["mode"]
				}, {
					"name": "insert",
					"groups": ["insert"]
				}, {
					"name": "styles",
					"groups": ["styles"]
				}
			],
			removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar,Image'
		});
		/*
		CKEDITOR.replace("strinsert_strings", [{'value': '*|FIRSTNAME|*', 'name': 'First name'},{'value': '*|LASTNAME|*', 'name': 'Last name'},{'value': '*|INVITEURL|*', 'name': 'Activore invite URL'},
		]
		);
		 */

		if (!is_change) {
			$("#question_type_selector").val(question.question_type_id);
		}

		if (type == "auto_complete" || type == "multi_choice" || type == "dropdown") {

			var data_sets = amplify.store("data_sets");
			if (data_sets) {
				$.each(data_sets, function (idx, set) {
					if (set.col_names) {
						$("#data_link").append('<option value="' + set.data_set_id + '">' + set.data_set_name + '</option>');
					}
				});
			}
		}

		if (type == "statement") {
			if (!question.statement_width) {
				question.statement_width = 250;
			}
			if (!question.statement_height) {
				question.statement_height = 100;
			}
			$("#question_text").css("height", question.statement_height + "px");
			$("#question_text").css("width", question.statement_width + "px");
			$("#statement_width").on("input", function () {
				$("#question_text").css("width", $("#statement_width").val() + "px");
				$("#question_text").css("max-width", $("#statement_width").val() + "px");
			});
			$("#statement_height").on("input", function () {
				$("#question_text").css("height", $("#statement_height").val() + "px");
				$("#question_text").css("max-height", $("#statement_height").val() + "px");
			});
		}

		$.each(question, function (key_name, value) {
			if (value == null) {
				value = "";
			}
			if (!$.isNumeric(value)) {
				value = value.replaceAll("<br>", "\n");
			}
			$("#" + key_name).val(value);
		});
		if (type == "auto_complete" || type == "multi_choice" || type == "dropdown") {
			ui.toggleDataLinkOptions();
			ui.toggleDataLinkKeyColumn(question["data_link_key"]);
		}

	},
  
  refreshQuestionDataSets: function (question_id) {
    var workflow_id = amplify.store("current_workflow_id");

		//var type_id = $("#question_type_selector").val();
		var act_id = amplify.store("current_activity_id");

		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.questions) {
			act.questions = {};
		}
		var question = act.questions[question_id];

    var type = ui.question_types[question.question_type_id].ref;
    
    if (type == "auto_complete" || type == "multi_choice" || type == "dropdown") {

			var data_sets = amplify.store("data_sets");
			if (data_sets) {
				$.each(data_sets, function (idx, set) {
					if (set.col_names && $("#data_link option[value='"+set.data_set_id+"']").length == 0) {
						$("#data_link").append('<option value="' + set.data_set_id + '">' + set.data_set_name + '</option>');
					}
				});
			}
		}
    
    if (type == "auto_complete" || type == "multi_choice" || type == "dropdown") {
			ui.toggleDataLinkOptions();
			ui.toggleDataLinkKeyColumn(question["data_link_key"]);
		}
      
  },

	saveFormQuestion: function (question_id) {
		var workflow_id = amplify.store("current_workflow_id");

		var type_id = $("#question_type_selector").val();
		var act_id = amplify.store("current_activity_id");

		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.questions) {
			act.questions = {};
		}
		if (!question_id) {
			question_id = uuid4();
		}

		act.questions[question_id]["question_id"] = question_id;
		act.questions[question_id]["question_type_id"] = type_id;

		/*
		var args = {
		question_id: question_id,
		question_type_id: type_id
		};
		 */
		$(".question_data").each(function (idx, el) {
			var obj = $(el);
			if (obj.attr("data-format") == "nl2br") {
				act.questions[question_id][obj.attr("id")] = obj.val().replaceAll("\n", "<br>");
			} else {
				act.questions[question_id][obj.attr("id")] = obj.val();
			}
		});
		//act.questions[question_id] = args;
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();
		setTimeout(function () {
			ui.showActivityEditor(act_id);
		}, 600);

		//var act = ui.getActivityById(act_id);
	},
    
    saveFormSubmit: function (question_id) {
		var workflow_id = amplify.store("current_workflow_id");

		var type_id = $("#question_type_selector").val();
		var act_id = amplify.store("current_activity_id");

		var activities = amplify.store("activities_" + workflow_id);
		var act = activities[act_id];

		if (!act.questions) {
			act.questions = {};
		}
		if (!question_id) {
			question_id = uuid4();
		}

		act.questions[question_id]["question_id"] = question_id;
		act.questions[question_id]["question_type_id"] = type_id;

		/*
		var args = {
		question_id: question_id,
		question_type_id: type_id
		};
		 */
        act.questions[question_id]["question_text"] = $("#question_text").val();
        act.questions[question_id]["question_type_id"] = "0";
		
		activities[act_id] = act;
		amplify.store("activities_" + workflow_id, activities);
		appNav.popTemplate();
		setTimeout(function () {
			ui.showActivityEditor(act_id);
		}, 600);

		//var act = ui.getActivityById(act_id);
	},

	storeServerWorkflow: function (workflow_id, json) {
		if (json.activities) {
			var out_act = {}
			$.each(json.activities, function (idx, act) {
				var type_short_desc = "form";
				$.each(ui.activity_types, function (t_short, type) {
					if (type.type_id == act.activity_type_id) {
						type_short_desc = t_short;
					}
				});
				act["type"] = type_short_desc;
				var out_questions = {};
				if (act.questions) {
					$.each(act.questions, function (qidx, question) {
						out_questions[question.question_id] = question;
					});
				}
				act["questions"] = out_questions;
				out_act[act.activity_id] = act;
				console.log("ACT");
				console.log(act);
			});
			amplify.store("activities_" + workflow_id, out_act);
			amplify.store("workflow_" + workflow_id, json);
		}
	},

	showPublishWorkflow: function (workflow_id) {

		appNav.clearNav();
		appNav.showBack();
		var args = {
			name: name,
			hide_toolbar: true,
			win_id: "publish_workflow_win"
		};
		var id = appNav.pushTemplate("publish_workflow_tpl", args);

	},

	deployWorkflow: function () {
		var workflow_id = amplify.store("current_workflow_id");
		var set_to = $("#publish_to").val();
		if (set_to == "") {
			return;
		} else if (set_to == "roles") {
			var roles = $("#publish_role_select").val();
			ui.deployRolesWorkflow(workflow_id, roles);
		} else if (set_to == "free") {}
		else if (set_to == "paid") {}

	},
	deployRolesWorkflow: function (workflow_id, roles) {
		var args = {
			workflow_id: workflow_id,
			roles: JSON.stringify(roles)
		};
		appNav.showLoading(null, null, "Publishing...");
		$.post(base_url + "workflow/roles", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				appNav.popTemplate();
				appNav.showDialog({
					message: "Your workflow has been published successfully",
					back: appNav.closeDialog
				});
			} else {
				appNav.showDialog({
					message: "Unable to publish your workflow at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	changePublishTo: function () {
		var set_to = $("#publish_to").val();
		console.log(set_to);
		$(".publish_options").hide();
		$("#deploy_button").show();
		if (set_to == "") {
			$("#deploy_button").hide();

		} else if (set_to == "roles") {
			ui.getRoles(function (roles) {
				$.each(roles, function (idx, role) {
					$("#publish_role_select").append('<option value="' + role.role_id + '">' + role.role_name + '</option>');
				});
				$("#publish_to_roles").show();
			});
		} else if (set_to == "free") {}
		else if (set_to == "paid") {
			$("#publish_to_paid").show();
		}
	},

	showCreateDataSet: function () {
		appNav.clearNav();
		appNav.showBack();
		var args = {
			name: name,
			hide_toolbar: true,
			win_id: "new_data_set_win"
		};
		var id = appNav.pushTemplate("new_data_set_tpl", args);
	},

	showWorkflowData: function (workflow_id) {
		console.log(workflow_id);
		/*
		if (set_id == "_new") {
		return ui.showCreateDataSet();
		}
		ui.getDataSet(set_id, function(data) {
		console.log(data);
		$("#data_viewer").html( $.loadUITemplate("data_viewer_tpl", {set_id: set_id}));

		var table_data = [];
		$.each(data.rows, function(idx, row) {
		table_data.push(row.col_data);
		});
		console.log("COL DATA");
		console.log(table_data);
		var container = document.getElementById("data_viewer_table");
		var hot = new Handsontable(container, {
		data: table_data,
		rowHeaders: true,
		colHeaders: data.col_names,
		dropdownMenu: true
		});
		$("#data_file").on("change", function(event) {

		event.stopPropagation(); // Stop stuff happening
		event.preventDefault(); // Totally stop stuff happening

		var file = $(this)[0].files[0];
		var upload = new Upload(file);
		upload.doUpload(set_id, base_url + "data_upload", function(data) {
		ui.showDataSet(set_id);
		});
		});
		});
		 */
	},

	showDataSet: function (set_id) {
		if (set_id == "_new") {
			return ui.showCreateDataSet();
		}
		ui.getDataSet(set_id, function (data) {
			console.log(data);
			$("#data_viewer").html($.loadUITemplate("data_viewer_tpl", {
					set_id: set_id
				}));

			var table_data = [];
			$.each(data.rows, function (idx, row) {
				table_data.push(row.col_data);
			});
			console.log("COL DATA");
			console.log(table_data);
			var container = document.getElementById("data_viewer_table");
			var hot = new Handsontable(container, {
					data: table_data,
					rowHeaders: true,
					colHeaders: data.col_names,
					dropdownMenu: true
				});
			$("#data_file").on("change", function (event) {

				event.stopPropagation(); // Stop stuff happening
				event.preventDefault(); // Totally stop stuff happening

				var file = $(this)[0].files[0];
				var upload = new Upload(file);
				upload.doUpload(set_id, base_url + "data_upload", function (data) {
					ui.showDataSet(set_id);
				});
			});
		});
	},

	createDataSet: function () {
		var data_set_name = $("#new_data_set_name").val();

		args = {
			data_set_name: data_set_name
		};
		appNav.showLoading(null, null, "Creating data set...");
		$.post(base_url + "create_data_set", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				appNav.popTemplate();
				ui.showMaintainData();
			} else {
				appNav.showDialog({
					message: "Unable to invite member at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	getDataSet: function (set_id, callback) {
		appNav.showLoading();
		$.getJSON(base_url + "data_set", {
			set_id: set_id
		}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				console.log(json);
				if (callback) {
					callback(json);
				}
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	showMaintainRoles: function () {
		appNav.clearNav();
		appNav.showBack();
		var args = {
			name: name,
			hide_toolbar: true,
			win_id: "maintain_roles_win"
		};
		var id = appNav.pushTemplate("maintain_roles_tpl", args);
		ui.getRoles(function (roles) {
			ui.showMaintainRoleList(roles);
		});

	},

	showMaintainData: function () {
		appNav.clearNav();
		appNav.showBack();
		var args = {
			name: name,
			hide_toolbar: true,
			win_id: "maintain_data_win"
		};
		var id = appNav.pushTemplate("maintain_data_tpl", args);
		ui.getDataSets(function (data) {
			$.each(data, function (idx, set) {
				$("#current_data_sets").append('<option value="' + set.data_set_id + '">' + set.data_set_name + '</option>');
			});
			//ui.showMaintainRoleList(roles);
		});

	},

	getDataSets: function (callback, silent) {
		if (!silent) {
			appNav.showLoading();
		}
		$.getJSON(base_url + "data_sets", {}, function (json) {
			if (!silent) {
				appNav.hideLoading();
			}
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				amplify.store("data_sets", json);
				if (callback) {
					callback(json);
				}
			} else {
				if (!silent) {
					appNav.showDialog({
						message: json.error,
						back: function () {
							appNav.closeDialog();
						}
					});
				}
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	getRoleById: function (role_id) {
		var roles = amplify.store("roles");
		var role = null;
		if (!roles) {
			return role;
		}
		$.each(roles, function (idx, stored_role) {
			if (stored_role.role_id == role_id) {
				role = stored_role;
			}
		});
		return role;
	},

	showMaintainRole: function (role_id) {
		var role = ui.getRoleById(role_id);
		if (!role) {
			return;
		}
		appNav.clearNav();
		appNav.showBack();
		//appNav.showToolbar("maintain_role_tpl", {workflow_id: workflow_id});
		var args = {
			hide_toolbar: true,
			win_id: "maintain_role_win",
		};
		$.extend(args, role);
		var id = appNav.pushTemplate("maintain_role_tpl", args);
		ui.getRoleMembers(role_id, function (rows) {
			ui.showRoleMembers(rows);
		});
	},
	showRoleMembers: function (members) {
		var html = "";
        html += `
            <tr>
                <th style="text-align:left;width: 50%;">Cell Number</th>
                <th style="text-align:left">Email</th>
            </tr>
            `
		$.each(members, function (idx, member) {
			member.email = member.email || "Not Linked";
			member.cellnum = member.cellnum || "Not Linked";
			html += "<tr class='generic_row_roles'>"+
                "<td>"+member.cellnum+"</td>"+
                "<td>"+member.email+"</td>"+
            "</tr>"
		});
        
		$("#role_member_list").html(html);
	},

	sendRoleInvite: function (role_id) {
		var member = $("#invite_role_member").val();
		args = {
			role_id: role_id,
			member: member
		};
		appNav.showLoading(null, null, "Sending Invite...");
		$.post(base_url + "role/invite", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				ui.showRoleMembers(json);
			} else {
				appNav.showDialog({
					message: "Unable to invite member at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	showDeleteRole: function (role_id) {
		appNav.showDialog({
			message: "Are you sure you want to delete this role?",
			ok: function () {
				appNav.closeDialog();
				appNav.popTemplate();
				ui.deleteRole(role_id);
			},
			cancel: appNav.closeDialog
		});
	},

	deleteRole: function (role_id) {
		args = {
			role_id: role_id
		};
		appNav.showLoading(null, null, "Deleting Role...");
		$.post(base_url + "role/delete", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				ui.showMaintainRoleList(json);
			} else {
				appNav.showDialog({
					message: "Unable to delete the role at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
	showMaintainRoleList: function (roles) {
		var html = "";
		$.each(roles, function (idx, role) {
			html += $.loadUITemplate("maintain_role_cell_tpl", role);
		});
		$("#edit_role_list").html(html);

	},
	addNewRole: function () {
		var role_name = $("#new_role_name").val();
		args = {
			role_name: role_name
		};
		appNav.showLoading(null, null, "Saving...");
		$.post(base_url + "role", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				ui.showMaintainRoles();
				//ui.showMaintainRoleList(json);
			} else {
				appNav.showDialog({
					message: "Unable to create role at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
	getRoleMembers: function (role_id, callback) {
		appNav.showLoading();
		$.getJSON(base_url + "role/members", {
			role_id: role_id
		}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				console.log(json);
				if (callback) {
					callback(json);
				}
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	getRoles: function (callback) {
		appNav.showLoading();
		$.getJSON(base_url + "roles", {}, function (json) {
			appNav.hideLoading();
			if (!session.isValidSessionResponse(json)) {
				setTimeout(session.showLogin, 800);
				return;
				//return session.showLogin();
			}
			if (!json.error) {
				amplify.store("roles", json);

				console.log(json);
				if (callback) {
					callback(json);
				}
			} else {
				appNav.showDialog({
					message: json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "There seems to be a problem with your connection",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	changeActivityRoleType: function () {
		var role_type = $("#role_type").val();
		if (role_type == "email") {
			$(".select_role").hide();
			$(".select_role_member").hide();
			$(".select_email").show();
		} else if (role_type == "person") {
			$(".select_role").show();
			$(".select_role_member").show();
			$(".select_email").hide();
		} else if (role_type == "anyone" || role_type == "round_robin") {
			$(".select_role").show();
			$(".select_role_member").hide();
			$(".select_email").hide();
		}
	},

	saveWorkflow: function (workflow_id) {
		var workflow = amplify.store("workflow_" + workflow_id);
		var activities = amplify.store("activities_" + workflow_id);
		var connections = amplify.store("connections_" + workflow_id);
		workflow["activities"] = activities;
		workflow["connections"] = connections;
		args = {
			workflow: JSON.stringify(workflow)
		};
		appNav.showLoading(null, null, "Saving...");
		$.post(base_url + "update/workflow", args, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				ui.storeServerWorkflow(workflow_id, json);
				appNav.showDialog({
					message: "Workflow saved successfully",
					ok: appNav.closeDialog
				});
			} else {
				appNav.showDialog({
					message: "Unable to submit at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	runWorkflow: function (workflow_id) {
		//var workflow = amplify.store("workflow_" + workflow_id);
		/*
		var activities = amplify.store("activities_" + workflow_id);
		var connections = amplify.store("connections_" + workflow_id);
		console.log(activities);
		console.log(connections);
		$.each(connections, function(conn_idx, conn) {
		});
		 */
		var activity = ui.getNextActivity(workflow_id);
		console.log(activity);
	},

	getNextActivity: function (workflow_id, current_activity_id) {
		if (!current_activity_id) {
			return ui.getFirstActivity(workflow_id);
		}
		var connections = amplify.store("connections_" + workflow_id);
		$.each(connections, function (conn_idx, conn) {});
	},

	getFirstActivity: function (workflow_id) {
		var connections = amplify.store("connections_" + workflow_id);
		var first_conn = null;
		$.each(connections, function (conn_idx, conn) {
			if (conn.from_id == "1") {
				first_conn = conn.to_id;
			}
		});
		return ui.getActivityById(first_conn);
	},
    //Set up listeners for events on activity blocks in the workflow
	setActivityDrop: function (workflow_id) {
		ui.jsPlumb.draggable($(".activity_object"), {
			drag: function (event) { //gets called on every drag
				return true;
			},
			drop: function (event, ui) {
				return true;
			},
			stop: function (drag_event) {
				console.log("stop event");
				var event = drag_event.e;
                /*
				var type = (event.target.getAttribute('data-type') || "");
				var offset = $(".activity_drop_zone").offset();
                */
				/*
				if (event.clientX - offset.left < 0) {
				ui.resetFormIcon(type);
				}
				if (event.clientY - offset.top < 0) {
				ui.resetFormIcon(type);
				}
				 
				var workflow_id = amplify.store("current_workflow_id");
				//var offset = $(".activity_drop_zone").offset();
				var x = event.clientX - offset.left;
				var y = event.clientY - offset.top;
                */
                
                var workflow_id = amplify.store("current_workflow_id");
				//var offset = $(".activity_drop_zone").offset();
				var x = drag_event.pos[0];
				var y = drag_event.pos[1];
                
                console.log(drag_event.pos[0],drag_event.pos[1]);
                
                /*
				var x_diff = event.clientX - x;
				if (x_diff < 100) {
					x = x - 120;
				}*/

				var id = (event.target.getAttribute('data-id') || event.target.closest(".activity_object").getAttribute('data-id'));

				var activities = amplify.store("activities_" + workflow_id);
				activities[id].position_top = y;
				activities[id].position_left = x;

				amplify.store("activities_" + workflow_id, activities);

				return true;

			}
		});
	},

	drawConnection: function (connection_id, from, to) {
		var conn = ui.jsPlumb.connect({
				source: from,
				target: to,
				id: connection_id,
				ConnectionOverlays: [
					["Arrow", {
							width: 10,
							length: 10,
							location: 1,
							id: "arrow"
						}
					],
				],
                anchor: "Continuous",
				connector: "Flowchart",
				paintStyle: {
					strokeWidth: 2,
					stroke: 'white',
                    outlineStroke: "transparent",
                    outlineWidth: 4 
				},
                HoverPaintStyle: {
                    stroke: 'blue',
                    strokeWidth: 3
                }
			});
		if (conn) {
			conn.id = connection_id;
		}
		return conn;
	},

	loadActivityEndPoint: function (act_id) {
		console.log("activity connection: " + act_id);
        var el = $("#" + act_id);
        // initialise draggable elements.
        //ui.jsPlumb.draggable(el);
        ui.jsPlumb.draggable(el, {
			drag: function (event) { //gets called on every drag
				return true;
			},
			drop: function (event, ui) {
				return true;
			},
			stop: function (drag_event) {
				console.log("stop event");
				var event = drag_event.e;
                /*
				var type = (event.target.getAttribute('data-type') || "");
				var offset = $(".activity_drop_zone").offset();
                */
				/*
				if (event.clientX - offset.left < 0) {
				ui.resetFormIcon(type);
				}
				if (event.clientY - offset.top < 0) {
				ui.resetFormIcon(type);
				}
				 
				var workflow_id = amplify.store("current_workflow_id");
				//var offset = $(".activity_drop_zone").offset();
				var x = event.clientX - offset.left;
				var y = event.clientY - offset.top;
                */
                
                var workflow_id = amplify.store("current_workflow_id");
				//var offset = $(".activity_drop_zone").offset();
				var x = drag_event.pos[0];
				var y = drag_event.pos[1];
                
                console.log(drag_event.pos[0],drag_event.pos[1]);
                
                /*
				var x_diff = event.clientX - x;
				if (x_diff < 100) {
					x = x - 120;
				}*/

				var id = (event.target.getAttribute('data-id') || event.target.closest(".activity_object").getAttribute('data-id'));

				var activities = amplify.store("activities_" + workflow_id);
				activities[id].position_top = y;
				activities[id].position_left = x;

				amplify.store("activities_" + workflow_id, activities);

				return true;

			}
		});

        ui.jsPlumb.makeSource(el, {
            filter: ".handle",
            anchor: "Continuous",
            connectorStyle: {
                stroke: "white",
                strokeWidth: 2,
                outlineStroke: "transparent",
                outlineWidth: 4 
            },
            connectionType:"basic"
        });
        
        if (act_id != "connector_1") {
            ui.jsPlumb.makeTarget(el, {
                dropOptions: { hoverClass: "dragHover" },
                anchor: "Continuous",
                allowLoopback: false
            });
        }
        /*
		var endpointOptions = {
			connectorOverlays: [
				["Arrow", {
						width: 10,
						length: 10,
						location: 1,
						id: "arrow"
					}
				],
			],
			maxConnections: -1,
			isSource: true,
			isTarget: true,
			anchors: ["Top", "Bottom", "Left", "Right"],
			connector: ["StateMachine", {
					curviness: 60
				}
			],
			connectorStyle: {
				strokeWidth: 3,
				stroke: 'white'
			},
			scope: "blueline",
			dragAllowedWhenFull: true
		};
		setTimeout(function () {
			ui.jsPlumb.addEndpoint($("#" + act_id), {
				uuid: act_id
			}, endpointOptions);
		}, 1000);
        */
	},
    // Function for activity icons in the side panel to be turned into activities
	setActivityInitDrop: function (workflow_id) {
		ui.jsPlumb.draggable($(".activity_drop"), {
			start: function (event) {

				var offset = $(".activity_drop_zone").offset();
				var x = event.e.clientX - offset.left + 40;
				var y = event.e.clientY - offset.top;

				$(event.el).css("position", "absolute");
				$(event.el).css("top", y);
				$(event.el).css("left", x);

			},
			stop: function (event) {
				console.log("stop");
				//var offset = $(".activity_drop_zone").offset();
				//var x = event.e.clientX - offset.left;
				//var y = event.e.clientY - offset.top;
                var x = event.pos[0];
				var y = event.pos[1];
				var dropped_type = ($(event.el).attr('data-type') || "");
				var type = dropped_type.replace("_icon", "");
				var id = uuid4();
				$(".activity_drop_zone").append($.loadUITemplate("activity_" + type + "_object_tpl", {
						top: y,
						left: x,
						id: id
					}));
				var name_el = $("#activity_name_" + id);
				name_el.html(name_el.attr("data-default"));
				act_obj = {
					type: type,
					name: ui.activity_types[type].display_name,
					position_top: y,
					position_left: x,
					id: id
				};
				ui.storeActivity(workflow_id, id, act_obj);
				ui.loadActivityEndPoint(id);

				ui.resetFormIcon(dropped_type);
				ui.setActivityInitDrop(workflow_id);
				setTimeout(function () {
					//ui.setActivityDrop(workflow_id);
                    ui.convertClick();
				}, 800);
			},
			drag: function (event) {
				//$(event).target.css("top", event.y);
				//$(event).target.css("left", event.x);

			}
		});

	},
  workflow_connections: {},
	renderConnections: function (workflow_id) {
    workflow_connections = [];
		var connections = amplify.store("connections_" + workflow_id);
		if (!connections) {
			connections = [];
		}
    var unlabled_connections = {};
    $.each(connections, function (idx, conn) {
      if (!(conn.from_id in unlabled_connections)) unlabled_connections[conn.from_id] = {"unlabled":0,"total":0};
      if (!conn.question_ref) unlabled_connections[conn.from_id]["unlabled"]++;
      unlabled_connections[conn.from_id]["total"]++;
    });
    console.log("unlabled_connections");
    console.log(unlabled_connections);
		$.each(connections, function (idx, conn) {

			console.log("conn " + conn.connection_id);
			console.log("from " + conn.from_id);
			console.log("to " + conn.to_id);
			if (conn.from_id == "00000000-0000-0000-0000-000000000000") {
				conn.from_id = "connector_1";
			}
			var new_conn = ui.drawConnection(conn.connection_id, conn.from_id, conn.to_id);
      ui.workflow_connections[conn.connection_id] = new_conn;
			if (!new_conn) {
				return;
			}
      if (conn.from_id != "connector_1") {
        if (conn.question_ref) {
          var pretty = conn.question_ref + " " + conn.check_condition.replace("_", " ") + " " + conn.check_value;
        }
        else {
          if (unlabled_connections[conn.from_id]["unlabled"] == 1) {
            if (unlabled_connections[conn.from_id]["total"] == 1) var pretty = "always";
            else var pretty = "else";
          }
          else var pretty = "Click to define rule";
        }
        console.log("ref: "+conn.question_ref);
        new_conn.addOverlay(["Label", {
              label: pretty,
              id: "label_" + conn.connection_id,
              labelStyle: {
                fill: "#222222",
                color: "white",
                padding: "2px"
              }
            }
          ]);
        }

		});

	},

	createNewJsPlumb: function () {

		ui.jsPlumb = jsPlumb.getInstance({
            Endpoint: ["Dot", {radius: 2}],
            Connector:"Flowchart",
            HoverPaintStyle: {
                stroke: "blue",
                strokeWidth: 3
            },
            paintStyle: {
                strokeWidth: 2,
                stroke: 'white',
                outlineStroke: "transparent",
                outlineWidth: 4 
            },
            ConnectionOverlays: [
                ["Arrow", {
                        width: 10,
                        length: 10,
                        location: 1,
                        id: "arrow"
                    }
                ],
            ]
        });
        /*
		ui.jsPlumb.importDefaults({
			PaintStyle: {
				strokeWidth: 13,
				stroke: 'rgba(200,0,0,0.5)'
			},
			LabelStyle: {
				color: "black"
			},
			DragOptions: {
				cursor: "crosshair"
			},
			Endpoints: [["Dot", {
						radius: 7
					}
				], ["Dot", {
						radius: 11
					}
				]],
			EndpointStyles: [{
					fill: "#225588"
				}, {
					fill: "#558822"
				}
			]
		});*/

		ui.jsPlumb.bind("click", function (info) {
			console.log("click");
			console.log(info);
			ui.showConnectionEditor(info.id);
			return true;
		});

		ui.jsPlumb.bind("beforeDrop", function (info) {
			console.log("BEFORE DROP");
			console.log(info);
			var workflow_id = amplify.store("current_workflow_id");
			var to_id = info.targetId;
			var from_id = info.sourceId;
			var connection_id = uuid4();
			info.connection.id = connection_id;
      ui.workflow_connections[connection_id] = info.connection;
			ui.storeConnection(workflow_id, from_id, to_id, connection_id);
      info.connection.addOverlay(["Label", {
          label: "Click to define rule",
          id: "label_" + connection_id,
          labelStyle: {
            fill: "#222222",
            color: "white",
            padding: "2px"
          }
        }
      ]); 
			return true;
		});

	},
	showWorkflowEditor: function (workflow_id) {
        console.log("################RUNNNING#############");

		if (!amplify.store("workflow_" + workflow_id)) {

			ui.loadWorkflow(workflow_id, function (json) {
				ui.showEditor(workflow_id);

			});
		} else {
			ui.showEditor(workflow_id);

		}
	},
    
    showEditor: function (workflow_id) {
        ui.createNewJsPlumb();
        amplify.store("current_workflow_id", workflow_id);
        var workflow = amplify.store("workflow_" + workflow_id);
        console.log("ui.showWorkflowEditor('" + workflow_id + "')");

        appNav.clearNav();
        appNav.showBack();
        appNav.showToolbar("designer_toolbar_tpl", {
            workflow_id: workflow_id
        });
        var args = {
            hide_toolbar: false,
            win_id: "workflow_editor",
            top: '10',
            left: 120,
            workflow_id: workflow_id
        };
        var id = appNav.pushTemplate("workflow_editor_tpl", args);
        ui.renderActivities(workflow_id);

        setTimeout(function () {
            ui.renderConnections(workflow_id);
            $("#workflow_name").html("WorkFlow: "+amplify.store("workflow_" + workflow_id).name)
        }, 400);
        ui.setActivityInitDrop(workflow_id);

    },

	setSnapDraggable: function (target, restriction, handle, on_drop, on_start, on_move) {
		var inter;
		if (handle) {
			inter = interact(target).allowFrom(handle);
		} else {
			inter = interact(target);
		}
		inter.draggable({
/*
			snap: {
				targets: [
					interact.createSnapGrid({
						x: 10,
						y: 10
					})
				],
				range: Infinity,
				relativePoints: [{
						x: 0,
						y: 0
					}
				]
			},
			restrict: {
				restriction: restriction,
				elementRect: {
					top: 0,
					left: 0,
					bottom: 1,
					right: 1
				},
				endOnly: true
			},*/

			// enable inertial throwing
			// keep the element within the area of it's parent
			// enable autoScroll
			//autoScroll: true,
			onstart: function (event) {
                //$(event.currentTarget.parentElement).css("touch-action", "none");
				if (on_start) {
					on_start(event);
				}
			},
			// call this function on every dragmove event
			onmove: function (event) {
				dragMoveListener(event)
				if (on_move) {
					on_move(event);
				}
			},

			// call this function on every dragend event
			onend: function (event) {
				console.log("DRAG END");
                //$(event.currentTarget.parentElement).css("touch-action", "auto");
				if (on_drop) {
					on_drop(event);
				}
			}
		});

	},

	/*
	setDraggable: function(target, restriction, handle, on_drop, on_start, on_move) {
	var inter;
	if (handle) {
	inter = interact(target).allowFrom(handle);
	} else {
	inter = interact(target);
	}
	inter.draggable({

	//inertia: true,
	restrict: {
	restriction: restriction,
	elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
	endOnly: true
	},



	// enable inertial throwing
	// keep the element within the area of it's parent
	// enable autoScroll
	autoScroll: true,
	onstart: function(event) {
	if (on_start) {
	on_start(event);
	}
	},
	// call this function on every dragmove event
	onmove: function(event) {
	dragMoveListener(event)
	if (on_move) {
	on_move(event);
	}
	},

	// call this function on every dragend event
	onend: function (event) {
	//console.log(event);
	if (on_drop) {
	on_drop(event);
	}
	}
	});


	},
	 */

	/*
	<select class="input-block-level type" id="type_QnwXXZTNrQWq5zZpc" data-id="QnwXXZTNrQWq5zZpc">
	<option>Short text</option>
	<option>Long text</option>
	<option>Rich text</option>
	<option>Date</option>
	<option>Number</option>
	<option>Email</option>
	<option>Yes / No</option>
	<option>Multiple choice</option>
	<option>Auto complete</option>
	<option>Dropdown</option>
	<option>Statement</option>
	<option>File Upload</option>
	<option>Button</option>
	</select>
	 */
	showActivity: function (act_id) {
		amplify.store("current_activity_id", act_id);
		var act = ui.getActivityById(act_id);
		if (act.activity_type_id == 1) {
			return ui.showFormActivity(act);
		} else if (act.activity_type_id == 2) {
			return ui.doNotifyActivity(act);
		} else if (act.activity_type_id == 7) {
			return ui.doAPIActivity(act);
		} else if (act.activity_type_id == 8) {
			return ui.showPaymentActivity(act);
		}
	},
	doNotifyActivity: function (act) {
		var run_id = amplify.store("current_run_id");
		console.log("NOTIFY Activity");
		console.log(act);
		act_id = act.activity_id;
		var args = {
			activity_id: act_id,
			run_id: run_id,
			data: {}
		};

		appNav.showLoading();
		$.post(base_url + "feedback", {
			payload: JSON.stringify(args)
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				if (json.activity_id == "end") {
					appNav.popTemplate();
					setTimeout(ui.showActivityEnd, 500);
				} else {
					ui.showActivity(json.activity_id);
				}
				console.log(json);
			} else {
				appNav.showDialog({
					message: "Unable to send notification at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	showPaymentActivity: function (act) {
		act_id = act.activity_id;
		ui.getRunData(amplify.store("current_run_id"), function (data) {
			if (data == null) {
				data = amplify.store("current_run_data");
			}
			var target = $("#question_list");
			var url = "";
			$.each(data, function (key, value) {
				url += key + "=" + value + "&";
				//question.question_text = question.question_text.replaceAll("@" + key, value);
			});
			console.log(url);
			target.html('<iframe src="https://pay.processpal.io?' + url + '" style="width:100%;height:100%"></iframe>');
		});

	},

	doAPIActivity: function (act) {
		var run_id = amplify.store("current_run_id");
		console.log("API Activity");
		console.log(act);
		act_id = act.activity_id;
		var args = {
			activity_id: act_id,
			run_id: run_id,
			data: {}
		};

		appNav.showLoading();
		$.post(base_url + "feedback", {
			payload: JSON.stringify(args)
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				if (json.activity_id == "end") {
					appNav.popTemplate();
					setTimeout(ui.showActivityEnd, 500);
				} else {
					ui.showActivity(json.activity_id);
				}
				console.log(json);
			} else {
				appNav.showDialog({
					message: "Unable to call API at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},

	showFormActivity: function (act) {
		var data_call = null;
		var data_var = null;
		if (act.single_run_id == 1) {
			data_call = ui.getActivityRunData;
			data_var = act.activity_id;
		} else {
			data_call = ui.getRunData;
			data_var = amplify.store("current_run_id");
		}

		act_id = act.activity_id;
		data_call(data_var, function (data) {
			if (data == null) {
				data = amplify.store("current_run_data");
			}
			var target = $("#question_list");
			target.html("");
			var options_id = 0;
			$.each(act.questions, function (idx, question) {
				if (!ui.question_types[question.question_type_id]) {
					return;
				}

				$.each(data, function (key, value) {
					question.question_text = question.question_text.replaceAll("@" + key, value);
          question.question_text = question.question_text.replaceAll('\n', '');
          question.question_text = question.question_text.replaceAll('\r', '');
          question.question_text = question.question_text.replaceAll('&nbsp;', '');
				});

				var tpl = "question_" + ui.question_types[question.question_type_id].ref + "_tpl";
				var label_style = "";
				var style = "";
				if (question.label_position_left && question.position_left) {
					label_style = "position:absolute;top:" + question.label_position_top + ";left:" + question.label_position_left;
					style = "position:absolute;top:" + question.position_top + ";left:" + question.position_left;
				} else if (question.position_left){
                    style = "position:absolute;top:" + question.position_top + ";left:" + question.position_left;
                } else {
					label_style = "text-align:center";
					style = "text-align:center";
				}
				question["label_style"] = label_style;
				question["style"] = style;
				target.append($.loadUITemplate(tpl, question));

				if (question.question_type_id == 7) {
					var sw = new Switchery(document.getElementById(question.question_id));
					if (data[question.question_ref] == "Yes") {
						sw.setPosition(true);
						sw.handleOnchange(true);
					}
					if (question.read_only == 1) {
						sw.disable();
					}
				} else if (question.question_type_id == 8 || question.question_type_id == 10) { // multi choice and select
					if (question.data_link && question.data_link != "00000000-0000-0000-0000-000000000000") {
						var key = question.data_link_key;
						var set_id = question.data_link;

						$.getJSON(base_url + "data_set_column", {
							set_id: set_id,
							data_link_key: key
						}, function (json) {
							$.each(json.rows, function (row_idx, row) {
								$("#" + question.question_id).append('<option value="' + row + '">' + row + '</option>');

							});

						});

					} else if (question.question_options) {
						var options = question.question_options.split("\n");
						$.each(options, function (opt_idx, opt) {
							$("#" + question.question_id).append('<option value="' + opt + '">' + opt + '</option>');
						});
					}
				} else if (question.question_type_id == 9) { // auto complete
					if (question.data_link && question.data_link != "00000000-0000-0000-0000-000000000000") {
						var key = question.data_link_key;
						var set_id = question.data_link;
						$("#" + question.question_id).autocomplete({
							serviceUrl: base_url + "data_set_column?set_id=" + set_id + "&data_link_key=" + key,
							paramName: 'rows',
							transformResult: function (response) {
								json = $.parseJSON(response);
								return {
									suggestions: $.map(json.rows, function (dataItem) {
										return {
											value: dataItem,
											data: dataItem
										};
									})
								};
							}
						});

					} else if (question.question_options) {
						var options = question.question_options.split("\n");
						var complete = [];
						$.each(options, function (opt_idx, opt) {
							complete.push({
								value: opt,
								data: opt
							});
						});
						$("#" + question.question_id).autocomplete({
							lookup: complete
						});
					}

				} else if (question.question_type_id == 11) { // statement

				} else if (question.question_type_id == 4) {
					console.log(".answer[data-ref=" + question.ref + "]");
					$(".answer[data-ref=" + question.ref + "]").pickadate({
						format: 'yyyy-mm-dd',
						formatSubmit: 'yyyy-mm-dd'
					});
				} else if (question.question_type_id == 14) { // Table
          $($("label[for='"+question.question_id+"']").find("tbody")[0]).addClass("answer");
          var rows = $($("label[for='"+question.question_id+"']").find("tbody")[0]).children('tr');
          var cell_contents;
          console.log($("label[for='"+question.question_id+"']").find("tbody")[0]);
          $(rows).each( function(row_index,row) {
            if (row_index != 0) {
              $(row).children().each( function(cell_index,cell) {
                cell_contents = $(cell).html();
                if ($(cell).is(':empty')) $(cell).html("<input></input>");
                else {
                  var cell_obj = $(cell);
                  cell_obj.html("<input disabled></input>");
                  $(cell_obj.children('input')[0]).val(cell_contents);
                }
              });
            };
          });
        };

			});
		});
	},
	submitActivity: function () {
		var run_id = amplify.store("current_run_id");
		var act_id = amplify.store("current_activity_id");
		var data = {};
		$(".answer").each(function (idx, el) {
			if ($(el).is(':checkbox')) {
				if ($(el).prop("checked")) {
					value = "Yes";
				} else {
					value = "No";
				}
				var key = $(el).attr("data-ref");
				data[key] = value;
				/*
				if ($(el).hasClass("yes_no")) {
				debugger;
				var value = "";
				$(el).find("input[type=checkbox]").each(function(chk_idx, chk) {
				var opt = $(chk).attr("data-option");
				if ($(chk).prop("checked")) {
				value += opt + " = Yes"
				}
				console.log( $(chk).prop("checked") );
				});
				 */
			} else if ($(el).is("select")) {
				var value = $(el).val();
				if ($.isArray(value)) {
					value = value.join(", ");
				}
				var key = $(el).attr("data-ref");
				data[key] = value;

			} else if ($(el).is("tbody")) {
        var rows = $(el).children('tr');
        var headings = [];
        var row_titles = [];
        var table_title = "";
        $(rows).each( function(row_index,row) {
          if (row_index == 0) {
            $(row).children().each( function(cell_index,cell) {
              if (cell_index == 0) {
                table_title  = $(cell).html();
                data[table_title] = {};
              } else {
                headings.push($(cell).html());
              }
            });
          } else {
            $(row).children().each( function(cell_index,cell) {
              if (cell_index == 0) {
                row_titles.push($($(cell).children()[0]).val());
                data[table_title][row_titles[row_index-1]] = {};
              }
              else data[table_title][row_titles[row_index-1]][headings[cell_index-1]] = $($(cell).children()[0]).val();
            });
          };
        });
        

			} else {
				var value = $(el).val();
				var key = $(el).attr("data-ref");
				data[key] = value;
			}
		});
		var args = {
			activity_id: act_id,
			run_id: run_id,
			data: data
		};

		appNav.showLoading();
		$.post(base_url + "feedback", {
			payload: JSON.stringify(args)
		}, function (json) {
			appNav.hideLoading();
			if (!json.error) {
				if (json.activity_id == "end") {
					appNav.popTemplate();
					setTimeout(ui.showActivityEnd, 500);
				} else {
					ui.showActivity(json.activity_id);
				}
				console.log(json);
			} else {
				appNav.showDialog({
					message: "Unable to submit at this time: " + json.error,
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}).fail(function () {
			appNav.hideLoading();
			appNav.showDialog({
				message: "Unable to connect!",
				back: function () {
					appNav.closeDialog();
				}
			});
		});

	},
	showActivityEnd: function () {
		appNav.clearNav();
		appNav.showBack();
		var id = appNav.pushTemplate("activity_completed_tpl", {
				hide_toolbar: true,
				win_id: "activity_completed_win"
			});
	},
	getActivityById: function (act_id) {
		var current_workflow_id = amplify.store("current_workflow_id");
		//var workflow = amplify.store("workflow_" + current_workflow_id);
		var activities = amplify.store("activities_" + current_workflow_id);
		return activities[act_id];
		/*
		var found = false;
		$.each(workflow.activities, function(idx, act) {
		if (! found && act.id == act_id) {
		found = act;
		}
		});
		return found;
		 */
	},

	initTouchSwipe: function () {
		$("#settings_div").touchwipe({
			wipeLeft: function () {
				if (ui.settings_open) {
					ui.closeSettings();
				}
			},
			min_move_x: 18,
			preventDefaultEvents: false
		});

		$("#body_div").touchwipe({
			wipeRight: function () {
				if (ui.search_settings_open) {
					ui.closeSearchSettings();
				}
			},

			wipeLeft: function () {
				if (ui.settings_open) {
					ui.closeSettings();
				}
			},
			min_move_x: 18,
			preventDefaultEvents: false
		});

	},

	initJSPlumb: function () {

		jsPlumb.ready(function () {
			console.log("JSP ready");
		});
	},

	init: function () {
		var currency = amplify.store("default_currency_symbol");
		if (currency) {
			default_currency_symbol = currency;
		}

		this.getDataSets(null, true);
		this.showHome();
		this.initTouchSwipe();
		this.initJSPlumb();
		this.loaded = true;
	}
}

var appNav = {
	id: "appNav",
	name: "App Navigation",
	tpls: {},
	show_toolbar: true,
	show_navbar: true,
	toolbar_height: 60,
	navbar_height: 60,
	loading_timeout: 0,
	window_stack: [],
	title_stack: [],
	z_count: 1,

	update: function (id) {
		this.setBodyScroll("#" + id);
	},
	isRootWindow: function () {
		return this.window_stack.length == 1;
	},
	setTitle: function (title_txt, config) {
		//var show_settings = false;
		var show_settings = config.show_settings == true ? true : false;
		var show_back = config.show_back == true ? true : false;
		var settings_tpl = config.settings_tpl ? config.settings_tpl : "";
		this.title_stack.push({
			title: title_txt,
			show_back: show_back,
			show_settings: show_settings
		});
		if (!title_txt) {
			title_txt = "";
		}
		var result = "";
		var parts = title_txt.split(" ");

		if (show_back) {
			result += '<img class="arrow_left button" onclick="appNav.popWindow()" src="images/btn_back_112x76.png">';
			//result+= '<div class="arrow_left" onclick="appNav.popWindow()"></div>';
		}
		$.each(parts, function (idx, part) {
			if (idx == 0) {
				result += '<font color="#034EA1">' + part + '</font>&nbsp;';
			} else {
				result += '<font color="#034EA1">' + part + '</font>&nbsp;'; // keeping it the same..

			}
		});
		if (show_settings) {
			result = '<img src="images/tel.png" style="margin-top:12px;height:38px;width:38px;margin-left:0px" class="menu_link button" onclick="ui.showSettings()">' + result;
		}
		result = '<div class="title_wrap">' + result + '</div>';
		$(".title_text").html(result);
	},
	loadTemplates: function () {
		$(".tpl").each(function (idx, el) {
			var id = $(el).attr("id");
			if (!id) {
				return;
			}
			appNav.tpls[id] = $(el).html();
			$(el).remove();
		});
	},
	pushTemplate: function (tpl_name, args, callback) {
		if (!args) {
			args = {};
		}
		var html = $.loadUITemplate(tpl_name, args);
		return this.pushWindow(html, args, callback);
	},
	popAll: function () {
		for (var i = 0; i <= this.window_stack.length; i++) {
			this.popWindow();
		}
		this.popWindow();
		this.popWindow();
	},
	popTemplate: function (cnt, callback) {
		if (cnt && !isNaN(cnt)) {
			for (i = 0; i < cnt; i++) {
				this.popWindow(callback);
			}
		} else {
			this.popWindow(callback);
		}
	},
	showBack: function () {
		this.setNavLeft('<a class="nav_link button" href="javascript:appNav.goBack()"><img class="back_arrow" src="images/arrow_back.png" style="max-height:35px"></a>');
	},
	clearNav: function () {
		this.setNavLeft("");
		this.setNavRight("");
	},
	setNavLeft: function (content, win_id) {
		try {
			//this.window_stack[this.window_stack.length -1].settings.nav_left = content;
		} catch (e) {
			// pass
		}
		if (win_id) {
			$.each(appNav.window_stack, function (idx, win) {
				if (win.win_id == win_id) {
					win.settings.nav_left = content;
				}
			});
		}
		$("#navbar_left").html(content);
	},
	setNavRight: function (content, win_id) {
		try {
			//:this.window_stack[this.window_stack.length -1].settings.nav_right = content;
		} catch (e) {
			// pass
		}
		if (win_id) {
			$.each(appNav.window_stack, function (idx, win) {
				if (win.win_id == win_id) {
					win.settings.nav_right = content;
				}
			});
		}

		$("#navbar_right").html(content);
	},
	setToolbarContent: function (content) {
		$("#toolbar_div").html(content);
	},
	getNavLeft: function () {
		return $("#navbar_left").html();
	},
	getNavRight: function () {
		return $("#navbar_right").html();
	},
	getToolbarContent: function () {
		return $("#toolbar_div").html();
	},

	pushWindow: function (content, config, callback) {

		// save previous nav buttons and restore when doing a pop

		try {
			var win_id = config.win_id ? config.win_id : "";
		} catch (e) {
			win_id = "";
		}
		if (win_id && $('[--data-win-id="' + win_id + '"]').length) {
			return this.updateWindow(content, config, callback);
		}

		block_click = true;
		var target = $("#window_main");
		var title = "";
		if (!config) {
			config = {};
		}
		if (config.fullscreen) {
			var target = $("body");
		}
		/*
		if (config.title) {
		title = config.title;
		setTimeout(function() {
		appNav.setTitle(title, config);
		}, 300);
		}
		console.log("Pushing: "+ title);
		 */
		try {
			var prev_id = this.window_stack[this.window_stack.length - 1].id;
			$("#" + prev_id).css("display", "none");
		} catch (e) {
			//console.log(e);
			// never mind
		}
		var id = "win__" + this.window_stack.length;
		//var left = $(window).width() * -1;
		var left = 0;
		this.z_count += 1;
		var html = '<div id="' + id + '" --data-win-id="' + win_id + '" style="left:' + left + 'px;z-index:' + this.z_count + ';overflow:auto" class="window_wrap overthrow">';
		html += '<div class="content_wrap" id="content_wrap_' + id + '" style="min-height:100%;height:100%"></div></div>';
		var that = this;
		//$("#"+id).css("height", $(window).height());
		if (config.hide_toolbar) {
			config.toolbar_content = "";
			this.hideToolbar();
		} else {
			this.showToolbar();
			config.toolbar_content = this.getToolbarContent();
		}
		if (config.show_back) {
			this.showBack();
		}
		//var settings = config.settings ? config.settings : {};
		target.append(html);

		$("#content_wrap_" + id).css("height", ($(window).height() + 10) + "px");
		$("#content_wrap_" + id).html(content + '<br>');
		this.update(id);
		setTimeout(function () {
			$("#content_wrap_" + id).append('<br> <br>');
		}, 500);
		config.nav_right = this.getNavRight();
		config.nav_left = this.getNavLeft();
		this.window_stack.push({
			id: id,
			settings: config,
			win_id: win_id
		});
		$("#" + id).css('display', 'none');
		setTimeout(function () {
			//$("#"+id).velocity('transition.slideRightBigIn', ui.window_animation_speed, function() {
			$("#" + id).css("left", $(window).width() + "px");
			$("#" + id).css("display", "block");
			$("#" + id).velocity({
				left: 0
			}, ui.window_animation_speed, function () {
				block_click = false;
				if (callback) {
					callback();
				}
			});
		}, 100);

		return id;
	},
	updateWindow: function (content, config, callback) {
		$('[--data-win-id="' + config.win_id + '"] .content_wrap').html(content);

	},
	getWindowSettings: function () {
		return this.window_stack[this.window_stack.length - 1].settings;
	},
	popWindow: function (callback) {
		if (this.window_stack.length <= 1) {
			return;
		}
		block_click = true;
		var obj = this.window_stack.pop();

		var id = obj.id;
		var that = this;
		that.title_stack.pop();
    var windowTitle = this.window_stack[this.window_stack.length - 1].win_id
		setTimeout(function () {
			var title_obj = that.title_stack[that.title_stack.length - 1];
			that.title_stack.pop();
			var stack = that.window_stack[that.window_stack.length - 1];
			$("#" + stack.id).css("display", "block");
      console.log(windowTitle);
      if (windowTitle == "maintain_roles_win") { //This is a horrible hack
        var roles = amplify.store("roles");
        if (!roles) {
          roles = [];
        }
        $("#select_role_id").html("");
        $.each(roles, function (idx, role) {
          $("#select_role_id").append('<option value="' + role.role_id + '">' + role.role_name + '</option>');
        });
      } else if (windowTitle == "edit_question") {
        ui.getDataSets(function () {
          setTimeout(ui.refreshQuestionDataSets(amplify.store("current_question_id")))
          },100);
      }
			that.setNavRight(stack.settings.nav_right);
			that.setNavLeft(stack.settings.nav_left);
			that.setToolbarContent(stack.settings.toolbar_content);
			if (stack.settings.hide_toolbar) {
				that.hideToolbar();
			} else if (!stack.settings.hide_toolbar) {
				that.showToolbar();
			}
			try {
				that.setTitle(title_obj.title, title_obj);
			} catch (e) {
				//pass
			}
			if (stack.settings.onFocusRestored) {
				stack.settings.onFocusRestored();
			}
			//$(".title_wrap").velocity({opacity: 1}, 200);
			block_click = false;
		}, 10);

		//$(".title_wrap").velocity({opacity: 0}, 200);
		block_touch_move = true;

		setTimeout(function () {
			console.log("ID: " + id);
			$("#" + id).velocity({
				translateX: $(window).width()
			}, ui.window_animation_speed, function () {
				$("#" + id).remove();
				if (callback) {
					callback();
				}

			});
			block_touch_move = false;
		}, 50);

		/*
		setTimeout(function() {
		//$("#"+id).velocity({left: ($(window).width()*-1) + 'px'}, 300, function() {
		//$("#"+id).velocity({opacity: 0}, 200, function() {
		$("#"+id).remove();
		if (callback) {
		callback();
		}
		block_touch_move = false;
		//});
		}, 20);
		 */

		// Hack to fix handling of jquery datepicker pop up.
		if (document.is_android4) {
			$("#ticket_date").datepicker('hide');
		}
	},

	handleNotification: function (type, id) {
		appNav.hideNotification();
		if (type == "voucher") {
			ui.showVoucher(id);
		} else if (type == "order") {
			ui.showOrderDetail(id);
		}
	},

	showNotification: function (type, id, message) {
		var nwin = $("#notification_win");
		var nbody = $("#notification_win_body");
		nbody.empty();
		var html = $.loadUITemplate("notification_cell_tpl", {
				message: message,
				type: type,
				id: id
			});
		nbody.append('<tr><td colspan="3">' + html + '</td></tr>');
		nwin.css("bottom", "-200px");
		nwin.css("left", (($(window).width() / 2) - 100) + "px");
		nwin.show();
		nwin.velocity({
			bottom: "-3px"
		}, 300);
	},
	hideNotification: function () {
		var nwin = $("#notification_win");
		nwin.velocity({
			bottom: "-200px"
		}, 300, function () {
			nwin.hide();

		});

	},
	showLoading: function (max_time, callback, message) {
		if (!max_time || max_time == 0) {
			max_time = 10000;
		}

		this.loading_timeout = 0;
		$("#loading_div").remove();
		if (!message) {
			message = "Loading..."
		}
		var html = $.loadUITemplate("loading_tpl", {
				message: message
			});
		$("body").append(html);
		$("#loading_div").show();
		setTimeout(function () {
			if (callback) {
				callback();
			}
		}, 100);
		this.loading_timeout = new Date().getTime() + max_time;
	},
	hideLoading: function () {
		setTimeout(function () {
			appNav.loading_timeout = 0;
			$("#loading_div").remove();
		}, 10);
	},
	closeDialog: function () {
		$("#dialog_div").remove();
	},

	closePopup: function () {
		$("#popup_div").remove();

	},
	showPopup: function (settings) {
		this.closePopup();
		var html = $.loadUITemplate("popup_tpl", {
				popup_html: $.loadUITemplate(settings.tpl, settings.args),
			});
		$("body").append(html);
	},

	showDialog: function (args) {
		this.closeDialog();
		var html = $.loadUITemplate("dialog_tpl", {
				dialog_text: args.message,
			});
		$("body").append(html);
		if (args.ok) {
			$("#dialog_ok_click").bind("click", args.ok);
			$("#dialog_ok_click").show();
		}
		if (args.cancel) {
			$("#dialog_cancel_click").bind("click", args.cancel);
			$("#dialog_cancel_click").show();
		}
		if (args.back) {
			$("#dialog_back_click").bind("click", args.back);
			$("#dialog_back_click").show();
		}
	},
	goBack: function () {
		analytics.add(analytics.TAPBACKBUTTON);
		if (appNav.window_stack.length <= 1) {
			navigator.app.exitApp();
		} else {
			appNav.popTemplate();
		}
	},
	setAutoClearLoader: function () {
		var that = this;
		setInterval(function () {
			if (that.loading_timeout == 0) {
				return;
			}
			if (new Date().getTime() >= that.loading_timeout) {
				that.hideLoading();
				appNav.showDialog({
					message: "A timeout occurred, please try again...",
					back: function () {
						appNav.closeDialog();
					}
				});
			}
		}, 1000);
	},
	showToolbar: function (tpl_name, args) {
		if (tpl_name) {
			if (!args) {
				args = {};
			}
			var html = $.loadUITemplate(tpl_name, args);
			$("#toolbar_div").html(html);
		}
		this.hide_toolbar = false;
		//this.window_stack[this.window_stack.length].settings.hide_toolbar = false;
		$("#toolbar_div").css("display", "block");
		$("#toolbar_div").velocity({
			bottom: "0px"
		}, 200, function () {});
	},

	hideToolbar: function () {
		this.hide_toolbar = true;
		$("#toolbar_div").velocity({
			bottom: "-65px"
		}, 200, function () {
			$("#toolbar_div").css("display", "none");
		});
		this.setBodyScroll();
	},
	getBodyHeight: function () {
		var height = $(window).height();
		if (this.show_navbar) {
			height = height - this.navbar_height;
		}
		if (!this.hide_toolbar) {
			height = height - this.toolbar_height;
		}
		return height;
	},
	setOrientationUpdate: function () {
		window.addEventListener("orientationchange", function () {
			console.log("orentation changed");
			$.each(appNav.window_stack, function (idx, w) {
				console.log("UPDATING ID: " + w.id);
				appNav.update(w.id);
			});
			console.log(screen.orientation); // e.g. portrait
		});
	},

	setBodyScroll: function (id) {
		if (!id) {
			try {
				id = "#" + appNav.window_stack[appNav.window_stack.length - 1].id;
			} catch (e) {
				return;
			}
		}
		$(id).css("height", (this.getBodyHeight() - 18) + 'px');
		//setDroidButtons();
		//var scroller = new IScroll(id, {bounce:true, click:false, preventDefault: false});
	},
	init: function () {
		console.log("App Nav init");
		this.setAutoClearLoader();
		this.loadTemplates();
		this.setOrientationUpdate();
		this.loaded = true;

	}
}

document.addEventListener('click', function (event) {
	//beep();
	// Doing nothing in this method lets the event proceed as normal
},
	true // Enable event capturing!
);

String.prototype.replaceAll = function (replaceThis, withThis) {
	var re = new RegExp(replaceThis, "g");
	return this.replace(re, withThis);
};

function mkSessURL() {
	// to be replaced by proper OTP
	return amplify.store("email") + "/" + interface_version;
}

function showCode(target_id, code, code_type, callback) {
	if (!code_type && code_type != 0) {
		code_type = 1;
	}
	var bw = new BWIPJS;
	bw.bitmap(new Bitmap);
	if (code_type == 0) {
		bw.scale(2, 2);
	} else {
		bw.scale(3, 3);
	}
	var elt = symdesc[code_type];
	var opts = {};
	opts.inkspread = bw.value(0);
	if (needyoffset[elt.sym] && !opts.textxalign && !opts.textyalign &&
		!opts.alttext && opts.textyoffset === undefined)
		opts.textyoffset = bw.value(-10);
	bw.push(code);
	bw.push(opts);

	bw.call(elt.sym);
	bw.bitmap().show(target_id, "N");
	if (callback) {
		callback();
	}
}

$.loadUITemplate = function (id, args) {
	var html = appNav.tpls[id];
	console.log("Template: " + id);
	html = html.replaceAll("<!--", "").replaceAll("-->", "");
	if (args) {
		$.each(args, function (key, val) {
			html = html.replaceAll("{" + key + "}", val);
		});
	}
	return html;
}

function _loadClass(cls_id, cls) {
	if (cls.styles) {
		$("style[data-cls=" + cls_id + "]").remove();
		var css_str = "<style data-cls=\"" + cls_id + "\">\n";
		$.each(cls.styles, function (skey, s) {
			$.each(s, function (okey, c) {
				css_str += okey + "{ ";
				$.each(c, function (prop, prop_val) {
					css_str += prop + ":" + prop_val + ";\n";
				});
				css_str += "}\n ";
			});

		});
		css_str += "</style>\n";
		$(css_str).appendTo("head");
	}
	if (!cls.loaded) {
		cls.init();
	}
}

var init_list = [
	appNav,
	session,
	ui
];

function init() {
	//window.addEventListener('load', function() {
	//    FastClick.attach(document.body);
	//}, false);
	document.body.style.webkitTouchCallout = 'none';
	document.body.style.KhtmlUserSelect = 'none';
	$.each(init_list, function (k, cls) {
		if (!cls.loaded) {
			cls.init();
		}
	});

	/*
	document.body.addEventListener("touchmove", function(e) {
	if (block_touch_move){
	e.preventDefault();
	}
	}, false);
	 */
}

function getUnique() {
	return ++unique_count;
}

function getGUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
		function (c) {
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
}
function getShortGUID() {
	return 'xxxxxxxx-yxxx'.replace(/[xy]/g,
		function (c) {
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
}

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
}

function shuffle(array) {
	var currentIndex = array.length,
	temporaryValue,
	randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function allUpperToNormal(upper_string) {
	return upper_string.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});

}

function dateStringToArray(dstring) { // input = 2013-12-25 23:56
	try {
		var dtime = dstring.split(" ");
		var date_parts = dtime[0].split("-");
		var time_parts = dtime[1].split(":");
		var result = [date_parts[0], date_parts[1], date_parts[2], time_parts[0], time_parts[1]];
	} catch (e) {
		var result = [];
	}
	return result;
}
function dateToArray(date_obj) {
	var year = date_obj.getFullYear();
	var month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
	var day = ("0" + date_obj.getDate()).slice(-2);
	var hours = ("0" + date_obj.getHours()).slice(-2);
	var minutes = ("0" + date_obj.getMinutes()).slice(-2);
	return [year, month, day, hours, minutes];
}
function dateInRange(target_array, from_array, to_array) {
	var ta = target_array;
	var f = from_array;
	var t = to_array;
	var target = '' + ta[0] + ta[1] + ta[2] + ta[3] + ta[4];
	var from = '' + f[0] + f[1] + f[2] + f[3] + f[4];
	var to = '' + t[0] + t[1] + t[2] + t[3] + t[4];
	if (target <= to && target >= from) {
		return true;
	} else {
		return false;
	}
}

function pushURL(url) {
	$("body").append('<iframe src="' + url + '" id="tmpframe"></iframe>');
	$("#tmpframe").remove();
}

function pad(str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

function dragMoveListener(event, add_event) {
	var target = event.target,
	// keep the dragged position in the data-x/data-y attributes
	x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	// translate the element
	target.style.webkitTransform =
		target.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';
	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
	if (add_event) {
		add_event(event);
	}

}

window.dragMoveListener = dragMoveListener;
// this is used later in the resizing and gesture demos


$.fn.enterKey = function (fnc) {
	return this.each(function () {
		$(this).keypress(function (ev) {
			var keycode = (ev.keyCode ? ev.keyCode : ev.which);
			if (keycode == '13') {
				fnc.call(this, ev);
			}
		})
	})
}

function uuid4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

var Upload = function (file) {
	this.file = file;
};

Upload.prototype.getType = function () {
	return this.file.type;
};
Upload.prototype.getSize = function () {
	return this.file.size;
};
Upload.prototype.getName = function () {
	return this.file.name;
};
Upload.prototype.doUpload = function (set_id, url, callback) {

	var that = this;
	var formData = new FormData();

	// add assoc key values, this will be posts values
	formData.append("data_file", this.file, this.getName());
	formData.append("set_id", set_id);
	//formData.append("upload_file", true);

	$.ajax({
		type: "POST",
		url: url,
		xhr: function () {
			var myXhr = $.ajaxSettings.xhr();
			if (myXhr.upload) {
				myXhr.upload.addEventListener('progress', that.progressHandling, false);
			}
			return myXhr;
		},
		success: function (data) {
			callback(data);
			// your callback here
		},
		error: function (error) {
			// handle error
		},
		async: true,
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		timeout: 60000
	});
};

Upload.prototype.progressHandling = function (event) {
	return;
	var percent = 0;
	var position = event.loaded || event.position;
	var total = event.total;
	var progress_bar_id = "#progress-wrp";
	if (event.lengthComputable) {
		percent = Math.ceil(position / total * 100);
	}
	// update progressbars classes so it fits your code
	$(progress_bar_id + " .progress-bar").css("width", +percent + "%");
	$(progress_bar_id + " .status").text(percent + "%");
};
