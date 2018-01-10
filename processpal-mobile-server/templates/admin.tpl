$var title: Admin

<script>
$$(function() {
    $$("#tabs").tabs().css({
      'min-height': '400px',
      'overflow': 'auto'
    });
    loadEditUserList();
    loadGroups();
    showAdminTreatmentTypes();
    disableAddProcedure();
    $$("input").css("color", "black");
});
</script>

<div id="tabs">
    <ul>
      <li><a href="#uadmin">User Admin</a></li>
    </ul>
    <div id="uadmin">
        <form method="post">
        <div id="edit_user_list">
            <h3 style="margin-top:0px;">Users</h3>
            <table id="edit_user_table" style="cursor:pointer">
            </table>
 
        </div>
        <div id="edit_user">
            <input type="hidden" value="" id="edit_uid">
            <table style="padding-left:10px;border-left:2px solid #cacaca">
                <tr>
                    <td colspan="2">
                        <h3><div id="user_edit_message">New user</div></h3>
                    </td>
                </tr>
                <tr>
                    <td>Username:</td>
                    <td>
                        <input type="text" id="edit_uname">
                    </td>
                </tr>
                <tr>
                    <td>First Name:</td>
                    <td>
                        <input type="text" id="edit_first_name">
                    </td>
                </tr>
                <tr>
                    <td>Last Name:</td>
                    <td>
                        <input type="text" id="edit_last_name">
                    </td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>
                        <input type="text" id="edit_email">
                    </td>
                </tr>
                <tr>
                    <td>Groups:</td>
                    <td>
                        <select id="edit_user_groups" multiple>
                            
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>
                        <select id="edit_user_status">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="button" value="Save" onclick="saveUser()">
                        <input type="button" value="Reset password" onclick="resetPassword()" style="display:none" id="reset_pword_btn">
                        <input type="button" value="Clear" onclick="clearUserEdit()">
                    </td>
                </tr>
 
            </table>
        </div>

        </form>
    </div>


</div>

