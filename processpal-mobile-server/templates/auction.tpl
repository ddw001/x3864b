$var title: Auction

<script>
$$(function() {
    $$("#tabs").tabs().css({
      'min-height': '400px',
      'overflow': 'auto'
    });
    $$("#e_start_date").datepicker({ dateFormat: "yy-mm-dd" });
    loadRegionAuctionList("e_region_id");
    disableTabs();
    $$("#asearch").autocomplete({ source: doSearch, select:selectAuction,
        open: function() { 
            $$('#asearch').autocomplete("widget").width(300);
            return false;
        }   
    });
    $$("#upload_frame").load(function() {
        loadFileList();
    });
});
</script>



<div id="tabs">
  <ul>
    <li><a href="#auctions_tab">Auctions</a></li>
    <li><a href="#lots">Lots</a></li>
    <li><a href="#ads">Advert</a></li>
    <li><a href="#notifications">Notifications</a></li>
  </ul>
  <div id="auctions_tab">
        <div id="auctions_head">
            <div id="auctions_title" class="header">New Auction</div>
            <input type="text" id="asearch" placeholder="Search Auctions">
        </div>
        <div>
            <input type="hidden" id="e_auction_id" value="">
            <table id="auction_edit_tbl">
                <tr>
                    <td>Auction Title:</td>
                    <td>
                        <input type="text" id="e_title">
                    </td>
                    <td>Start Date:</td>
                    <td>
                        <input type="text" id="e_start_date">
                    </td>
                </tr>
                <tr>
                    <td>Region:</td>
                    <td>
                        <select id="e_region_id" onchange="loadAreaAuctionList(this.value, 'e_area_id')">
                        </select>
                    </td>
                    <td>Area:</td>
                    <td>
                        <select id="e_area_id">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Longitude:</td>
                    <td>
                        <input type="text" id="e_longitude" class="loc_lng">
                    </td>
                    <td>Latitude:</td>
                    <td>
                        <input type="text" id="e_latitude" class="loc_lat">
                    </td>
                    <td>
                        <input type="button" value="Find on map" onclick="openMapSearch()">
                    </td>
                </tr>
                <tr>
                    <td>Reference #</td>
                    <td>
                        <input type="text" id="e_ref_num">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="3">
                        <input type="button" value="Save" onclick="saveAuction()">
                        <input type="button" value="Clear" onclick="clearAuction()">
                    </td>
                </tr>
            </table>
        </div>
  </div>
  <div id="lots">
        <div id="lot_selector" style="float:left;padding-right:20px;margin-right:30px;height:100%;border-right:1px solid black">
            <div class="header">Existing Lots</div>
            <table id="lot_list_tbl" style="cursor:pointer"></table>
        </div>
        <div id="lot_editor" style="margin-left:30px">
            <div class="header">Edit Lot</div>
            <input type="hidden" id="nl_lot_id">
            <table>
                <tr>
                    <td>Title:</td>
                    <td>
                        <input type="text" id="nl_lot_title">
                    </td>
                    <td>Type:</td>
                    <td>
                        <select id="nl_type_id">
                            <option value="1">Residential</option>
                            <option value="2">Plot / Farm</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Reserve Price:</td>
                    <td>
                        <input type="text" id="nl_res_price">
                    </td>
                </tr>
                <tr>
                    <td valign="top">Description:</td>
                    <td colspan="3">
                        <textarea id="nl_lot_description" rows="8" cols="40"></textarea>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="button" value="Save" onclick="saveLot()">
                        <input type="button" value="Clear" onclick="clearLot()">
                    </td>
                </tr>
            </table>
            <table id="lot_upload_tbl" style="display:none">
                <tr>
                    <td>Upload Images</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <form method="POST" enctype="multipart/form-data" action="files" target="upload_frame">
                            <input type="hidden" name="ac" value="upload">
                            <input type="hidden" name="f" value="" class="upload_lot_id">
                            <input type="hidden" name="g" value="1,2">
                            <input type="file" name="uplfile" />
                            <br/>
                            <input value="Upload" type="submit" onclick="return submitUpload()"/>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div id="file_list">
                            <table id="file_list_tbl" style="min-width:400px">
                                <tr>
                                    <td><b>File</b></td>
                                    <td><b>Type</b></td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
            <iframe src="about:blank" style="display:none" frameborder="0" name="upload_frame" id="upload_frame"></iframe>
        </div>

  </div>
  <div id="ads">
        <div class="header">Adverts</div>
  </div>
  <div id="notifications">
        <div id="notify_head">
            <div class="header">Notifications</div>
        </div>
  </div>
</div>
  <!--
  <div id="files">
        <table id="newp_upload_tbl">
            <tr>
                <td>Upload File</td>
            </tr>
            <tr>
                <td>
                    <form method="POST" enctype="multipart/form-data" action="files" target="upload_frame">
                        <input type="hidden" name="ac" value="upload">
                        <input type="hidden" name="f" value="" class="upload_p_id">
                        <input type="hidden" name="g" value="1,2">
                        <select name="file_cat_id" id="file_cat_id">
                            <option value="">- Select file type -</option>
                            <option value="1">ID Document</option>
                            <option value="2">Accident Report</option>
                            <option value="3">First Medical Report</option>
                            <option value="4">Progress Report</option>
                            <option value="5">Final Report</option>
                        </select>
                        <input type="file" name="uplfile" />
                        <br/>
                        <input value="Upload" type="submit" onclick="return submitUpload()"/>
                    </form>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="file_list">
                        <table id="file_list_tbl" style="min-width:400px">
                            <tr>
                                <td><b>File</b></td>
                                <td><b>Type</b></td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <iframe src="about:blank" style="display:none" frameborder="0" name="upload_frame" id="upload_frame"></iframe>

  </div>
-->



<div id="map_wrapper" class="hidden">
 <div align="left" id="map_search">
   <input type="text" value="" id="searchbox" style="width:700px; font-size:15px;display:block">
   <input type="button" class="menu_item" value="Done" style="width:100px;height:30px;font-size:15px;" onclick="closeMap()">
  </div>
  <div align="left" id="map" style="width:800px; height: 600px; margin-top: 10px;">
...
  </div>
</div>
