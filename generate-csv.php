<?php
shell_exec("date > " . __DIR__ . "/date.txt");
$eventId = "290";
function get($idolId, $name){
    global $eventId;
	$base = "https://api.matsurihi.me/";
    $scoreList = "";
	for ($i = 1000; $i >= 150; $i -= 50){
		echo "$i...";
        $json = file_get_contents("$base/api/mltd/v2/events/$eventId/rankings/idolPoint/$idolId/logs/$i");
        $arr = json_decode($json, true)[0]["data"];
        $scoreList = $scoreList . $arr[count($arr) - 1]["score"] . ",";
		usleep(600000);
		echo "Done!\n";
	}
    file_put_contents( __DIR__ . "/{$name}.csv", $scoreList);
}


# 桃子
// get(49, "momoko");

# 律子
get(9, "ritsuko");

# 亜美
get(11, "ami");

# 真美
get(12, "mami");