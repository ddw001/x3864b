<?php
    // establishing DB connection
    $host = "localhost";
    $port = "8081";
    $dbname = "processpal";
    $dbname = "processpal";
    $dbpwd = "lapp";
    // connection string
    // pg_connect() is native PHP function for PostgreSQL
    $dbconn = pg_connect("$host $port $dbname $dbuser $dbpwd");
    // validating DB connection
    if(!$dbconn) {
    exit("There was an error establishing database connection");
    }    
?>

$result = ($dbconn, "SELECT tbl_workspaces;"); or exit("Error - Querying Database");

if ($result) {
  // creating an associative array to store the chart attributes        
  $arrData = array(
    "chart" => array(
            // caption and sub-caption customization
            "caption"=> "Workflows",
            "captionFontSize"=> "24",
            "captionFontColor"=> "#4D394B",
            "captionPadding"=> "20",
            // font and text size customization
            "baseFont"=> "Merriweather, sans-serif",
            "baseFontColor"=> "#ABA39D",
            "outCnvBaseColor"=> "#ABA39D",
            "baseFontSize"=> "15",
            "outCnvBaseFontSize"=> "15",
            // div line customization
            "divLineColor"=> "#ABA39D",
            "divLineAlpha"=> "22",
            "numDivLines"=> "5",
            // y-axis scale customization
            "yAxisMinValue"=> "0",
            "yAxisMaxValue"=> "30000",
            // tool-tip customization
            "toolTipBorderColor"=> "#ABA8B7",
            "toolTipBgColor"=> "#F5F3F1",
            "toolTipPadding"=> "13",
            "toolTipAlpha"=> "50",
            "toolTipBorderThickness"=> "2",
            "toolTipBorderAlpha"=> "30",
            "toolTipColor"=> "#4D394B",
            "plotToolText"=> "<div style='text-align: center; line-height: 1.5;'>\$label<br>\$value Medals<div>",
            // other customizations
            "theme"=> "fint",
            "paletteColors"=> "#7B5A85",
            "showBorder"=> "0",
            "bgColor"=> "#FAF6F3",
            "canvasBgColor"=> "#FAF6F3",
            "bgAlpha"=> "100",
            "showValues"=> "0",
            "formatNumberScale"=> "0",
            "plotSpacePercent"=> "33",
            "showcanvasborder"=> "0",
            "showPlotBorder"=> "0"
    )
  );
    $arrData["data"] = array();
    // iterating over each data and pushing it into $arrData array
    while($row = pg_fetch_array($result)) {
        array_push($arrData["data"], array(
            "label" => $row["workspace_id"],
            "value" => $row["workspace"]
            )
        );
    }    
  $jsonEncodedData = json_encode($arrData);
}

// syntax to create the chart instance
$chartVar = new FusionCharts("type of chart", "unique chart ID", "chart width", "chart height", "HTML container ID", "data format (JSON/XML)", "chart data");


// chart instance
$postgresChart = new FusionCharts("column2d", "topMedalChart" , '100%', 450, "postgres-chart", "json", $jsonEncodedData);

// calling render method
$postgresChart->render();
// closing DB connection
pg_close($dbconn);