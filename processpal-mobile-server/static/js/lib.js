

$(function() {
    $('input:text, input:password').button().css({
        'font' : 'inherit',
        'color' : 'inherit',
        'text-align' : 'left',
        'outline' : 'none',
        'cursor' : 'text'
    });
    $("input[type=submit]").button();
    $("input[type=button]").button();
    $("input[type=file]").button();
    $("select").menu();
});

function loadLotList() {
    var target = $("#lot_list_tbl");
    args = {
        ac:"get_lot_list",
        t:"json",
        auction_id:getAuctionId()
    };

    $.getJSON("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        $.each(json.rows, function(key, row) {
            console.log(row);
            var html = '<tr><td onclick="editLot('+row.lot_id+')">'+row.lot_title+'</td></tr>';
            target.append(html);
        });

    });
}

function getLot(lot_id, callback) {
    args = {
        ac:"get_lot",
        t:"json",
        lot_id: lot_id
    };
    $.get("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (!json.success) {
            return osd("Unable to get region list");
        } else {
            callback(json);
        }
    });
}


function editLot(lot_id) {
    getLot(lot_id, function(json) {
        if (json.success) {
            var r = json.row;
            setLotId(r.lot_id);
            $("#nl_lot_id").val(r.lot_id),
            $("#nl_lot_title").val(r.lot_title),
            $("#nl_type_id").val(r.type_id),
            $("#nl_res_price").val(r.res_price),
            $("#nl_lot_description").val(r.lot_description)
        }
    });
}

function loadAds() {
    var auction_id = getAuctionId();
}
function loadNotifications() {
    var auction_id = getAuctionId();
}


function loadRegionAuctionList(target_id, selected_val) {
    var target = $("#"+target_id);
    target.empty();
    target.append("<option value=\"0\">- Select Region -</option>");
    getRegionList(function(json) {
        $.each(json.rows, function(key, row) {
            var sel = '';
            if (selected_val && selected_val == row.region_id) {
                sel = " selected";
            }
            target.append('<option value="'+row.region_id+'" '+sel+'>'+row.region_description+'</option>');

        });
    });
}

function getRegionList(callback) {
    args = {
        ac:"get_region_list",
        t:"json"
    };
    $.get("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (!json.success) {
            return osd("Unable to get region list");
        } else {
            callback(json);
        }
    });
}


function closeMap() {
    $("#map_wrapper").hide();
}

function openMapSearch() {
    var lat = $("#e_latitude").val();
    var lng = $("#e_longitude").val();
    var name = "Auction Location";
    if (! lat || ! lng) {
        lat = -26.12831612064242;
        lng = 28.072128295898438;
    }

    showMap(lat, lng, name);
}


function loadAreaAuctionList(region_id, target_id, selected_val) {
    var target = $("#"+target_id);
    target.empty();
    target.append("<option value=\"0\">- Select Area -</option>");
    getAreaList(region_id, function(json) {
        $.each(json.rows, function(key, row) {
            var sel = '';
            if (selected_val && selected_val == row.area_id) {
                sel = " selected";
            }
            target.append('<option value="'+row.area_id+'" '+sel+'>'+row.area_description+'</option>');

        });
    });
}

function getAreaList(region_id, callback) {
    args = {
        ac:"get_area_list",
        t:"json",
        region_id: region_id
    };
    $.get("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (!json.success) {
            return osd("Unable to get region list");
        } else {
            callback(json);
        }
    });
}



function saveLot() {
    var args = {
        ac:"save_lot",
        t:"json",
        auction_id:getAuctionId(),
        lot_id:getLotId(),
        lot_title:$("#nl_lot_title").val(),
        lot_description:$("#nl_lot_description").val(),
        type_id:$("#nl_type_id").val(),
        res_price:$("#nl_res_price").val()
    };
    $.post("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (!json.success) {
            return osd("Unable to save lot");
        } else {
            if (json.lot_id) {
                setLotId(json.lot_id);
            }
            osd("Lot saved");
        }
    });
}

function clearLot() {
    setLotId("");
    hideLotUpload();
    $("#nl_lot_title").val("");
    $("#nl_type_id").val("");
    $("#nl_lot_description").val("");
    $("#nl_res_price").val("");
}








function saveAuction() {
    var args = {
        ac:"save_auction",
        t:"json",
        auction_id:$("#e_auction_id").val(),
        title:$("#e_title").val(),
        start_date:$("#e_start_date").val(),
        region_id:$("#e_region_id").val(),
        area_id:$("#e_area_id").val(),
        longitude:$("#e_longitude").val(),
        latitude:$("#e_latitude").val(),
        ref_num:$("#e_ref_num").val()
    };
    $.post("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (!json.success) {
            return osd("Unable to save auction");
        } else {
            if (json.auction_id) {
                setAuctionId(json.auction_id);
                enableTabs();
            }
            setEdit();
            osd("Auction saved");
        }
    });
}

function getLotId() {
    return $("#nl_lot_id").val();
}

function setLotId(id) {
    $("#nl_lot_id").val(id);
    showLotUpload();
    $(".upload_lot_id").val(id);
    loadFileList();
}

function showLotUpload() {
    $("#lot_upload_tbl").show();
}

function hideLotUpload() {
    $("#lot_upload_tbl").hide();
}


function getAuctionId() {
    return $("#e_auction_id").val();
}

function setAuctionId(id) {
    $("#e_auction_id").val(id);
}

function doSearch(request, response) {
    args = {
        ac:"search",
        s:request.term
    };
    $.get("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (!json.success) {
            return osd("Unable to complete search");
        } else {
            response(json.rows);
        }
    });
}

function loadAuction(id) {
    var args = {
        ac: "get_auction",
        auction_id: id
    };
    $.get("auction", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (json.success) {
            var r = json.row;
            setAuctionId(r.auction_id);
            $("#e_title").val(r.title);
            $("#e_start_date").val(r.start_date);
            $("#e_region_id").val(r.region_id);
            $("#e_area_id").val(r.area_id);
            $("#e_longitude").val(r.longitude);
            $("#e_latitude").val(r.latitude);
            $("#e_ref_num").val(r.ref_num);
            setEdit();
            enableTabs();
            loadAreaAuctionList(r.region_id, "e_area_id", r.area_id);
            /*
            setTimeout(function() {
                getReview();
            }, 2000);
            */
        } else {
            osd(json.message);

        }

    });
}

function disableTabs() {
    $("#tabs").tabs( "option", "disabled", [ 1, 2, 3 ] );
}
function enableTabs() {
    loadFileList();
    $("#tabs").tabs( "enable" );
}

function setEdit() {
    $("#auctions_title").html("Edit Auction");
    loadLotList();
    loadAds();
    loadNotifications();
    //$("#newp_upload_tbl").show();
}

function setNew() {
    $("#auctions_title").html("New Auction");
    disableTabs();
    //$("#newp_upload_tbl").hide();
}

function submitUpload() {
    if ($("#file_cat_id").val() == "") {
        osd("Please select a file type");
        return false;
    }
    return true;
}

function loadFileList() {
    var target = $("#file_list_tbl");
    var i = 0;
    target.find("tr").each(function(key, val) {
        if (i > 0) {
            val.remove();
        }
        i++;
    });
    args = {
        ac:"get_file_list",
        t:"json",
        lot_id:getLotId()
    }
    $.getJSON("files", args, function(json) {
        checkSession(json);
        if (json.success == 0) {
            return;
        }
        $.each(json, function(key, row) {
            var html = '<tr><td style="cursor:pointer" onclick="loadFile('+row.file_id+')"><u>';
            html+= row.file_name + '</u></td><td>' + row.file_cat_description + '</td></tr>';
            target.append(html)
        });
    });
}

function loadFile(id) {
    var url = "files?ac=get&f="+id;
    window.open(url);
    /*
    $.getJSON("files", args, function(json) {
        checkSession(json);
        $.each(json, function(key, row) {
    */
}

function selectAuction(event, ui) {
    loadAuction(ui.item.value);
    return false;
}

function clearAuction() {
    setAuctionId("");
    $("input[type=text]").val("");
    $("select").val("");
    $("textarea").html("");
    setNew();
}

function mkJSON(in_obj) {
        if (typeof in_obj == "string") {
            return $.parseJSON(in_obj);
        } else {
            return in_obj;
        }
}


//--------------------------------------
//Admin
//--------------------------------------

function loadEditUserList() {
    var target = $("#edit_user_table");
    $.getJSON("admin?ac=get_user_list&t=json", function(json) {
        json = mkJSON(json);
        checkSession(json);
        $.each(json, function(key, row) {
            var html = '<tr><td onclick="editUser('+row.uid+')">'+row.first_name+'</td></tr>';
            target.append(html);
        });

    });
}

function loadGroups() {
    var target = $("#edit_user_groups");
    target.empty();
    $.getJSON("admin?ac=get_group_list&t=json", function(json) {
        json = mkJSON(json);
        checkSession(json);
        $.each(json, function(key, row) {
            target.append('<option value="'+row.group_id+'">'+row.group_description+'</option>');
        });
    });
}

function saveUser() {
    var email = $("#edit_email").val();
    if (!isValidEmailAddress(email)) {
        return osd("Please enter a valid email address");
    }
    var args = {
        ac: "usave",
        t: "json",
        uid: $("#edit_uid").val(),
        uname: $("#edit_uname").val(),
        first_name: $("#edit_first_name").val(),
        last_name: $("#edit_last_name").val(),
        email: email,
        user_status: $("#edit_user_status").val()
    }
    $.post("admin", args, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (json.success) {
            osd("Record saved successfully");
        } else if (json.message) {
            osd(message);
        } else {
            osd("An unknown error occurred");
        }
    }).fail(function() {
        osd("A network error occurred");
    });
}

function clearUserEdit() {
        $("#edit_uid").val("");
        $("#edit_uname").val("");
        $("#edit_first_name").val("");
        $("#edit_last_name").val("");
        $("#edit_email").val("");
        $("#edit_user_status").val("");

        $("#user_edit_message").html("New User");
        $("#reset_pword_btn").hide();

}

function editUser(uid) {
    getUser(uid, function(json) {
        $("#edit_uid").val(json.uid);
        $("#edit_uname").val(json.uname);
        $("#edit_first_name").val(json.first_name);
        $("#edit_last_name").val(json.last_name);
        $("#edit_email").val(json.email);
        $("#edit_user_status").val(json.user_status);
        $("#user_edit_message").html("Existing User");
        $("#reset_pword_btn").show();
    });
}


function getUser(uid, callback) {
    $.getJSON("admin?ac=get_user&t=json&uid="+uid, function(json) {
        json = mkJSON(json);
        checkSession(json);
        if (json && json.uid) {
            callback(json);
        }
    });

}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}


String.prototype.replaceAll = function (replaceThis, withThis) {
    var re = new RegExp(replaceThis,"g");
    return this.replace(re, withThis);
};


function checkSession(json) {
    if (json.success == 0) {
        if (json.code == 2) {
            window.location = "/login?r=t"
        } else if (json.code == 1) {
            window.location = "/login"
        }
    }
}

function osd(message) {
  $.notify_osd.create({
    'text'        : message,
    //'icon'        : 'images/icon.png',     // icon path, 48x48
    'sticky'      : false,                 // if true, timeout is ignored
    'timeout'     : 4,                     // disappears after 6 seconds
    'dismissable' : true                   // can be dismissed manually
  });

}



