$var title: User admin

<h1>User Admin</h1>


<script>
$$(function(){
    loadEditUserList();
    loadGroups();
    $$("input").css("color", "black");
});
</script>

<form method="post" style="color:white;">
    <div id="edit_user_list">
        <table style="color:white;" id="edit_user_table">
        </table>

    </div>
    <div id="edit_user">
        <input type="hidden" value="" id="edit_uid">
        <table style="color:white;">
            <tr>
                <td colspan="2">
                    <div id="user_edit_message">New user</div>
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
