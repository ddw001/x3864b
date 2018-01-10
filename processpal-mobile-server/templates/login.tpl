$def with (args)

<script>
$$(function() {
});

</script>

<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="static/css/notify-osd.css">
    <link rel="stylesheet" href="static/css/smoothness/jquery-ui-1.10.3.custom.css">
    <link rel="stylesheet" href="static/css/style.css">
    <script src="static/js/jquery-1.10.2.min.js"></script>
    <script src="static/js/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="static/js/lib.js"></script>
    <script src="static/js/notify-osd.js"></script>
</head>
<body>
<div id="main_menu" style="width:100%">
    <img src="static/images/vans-auctioneers-logo.jpg">
</div>
<br>
<h2>Login</h2>
<form method="post" action="login">
    <input type="text" name="uname" id="uname"><br>
    <input type="password" name="pword" id="pword">
    <input type="submit" value="Login">
</form>
$args.get("msg")

</body>
</html>
