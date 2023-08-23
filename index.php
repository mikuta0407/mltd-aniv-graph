<html>
	<head>
		<title>MLTD Graph</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
	</head>
	<body>

	<p><?php echo str_replace("\n", "", file_get_contents(__DIR__ . "/date.txt"));?></p>
<?php

$labelStr = "";
for ($i = 1000; $i >= 150; $i -= 50){
	$labelStr = $labelStr . "\"$i\"";
	if ($i != 150){
		$labelStr = $labelStr . ",";
	}
}

function view($name, $r, $g, $b){
	global $labelStr;
	$scoreList = file_get_contents(__DIR__ . "/{$name}.csv"); 
	?>

	<style><?php echo "#ex_chart_$name {max-width:640px;max-height:480px;}";?></style>
	<canvas id="ex_chart_<?php echo $name;?>"></canvas>
	<script>
	var <?php echo $name;?>Ctx = document.getElementById('ex_chart_<?php echo $name;?>');

	var <?php echo $name;?>Data = {
		labels: [<?php echo $labelStr; ?>],
		datasets: [{
			label: '<?php echo $name;?>',
			data: [<?php echo $scoreList;?>],
			borderColor: '<?php echo "rgba($r, $g, $b, 1)";?>'
		}]
	};

	var ex_chart_<?php echo $name;?> = new Chart(<?php echo $name;?>Ctx, {
		type: 'line',
		data: <?php echo $name;?>Data,
		options: []
	});
	</script>
	<?php
	
}

//view("momoko" ,239, 184, 100);
view("ritsuko" ,1, 168, 96);
view("ami", 252, 212, 36);
view("mami", 199, 184, 60);

?>

		</script>
	</body>
</html>