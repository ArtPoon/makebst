<html>
<head>
    <title>Redirecting...</title>
    <!--<meta http-equiv="refresh" content="0;URL=example.html">-->
</head>
<body>
<?php
$fp = fopen('/Library/WebServer/Documents/makebst/stdin.txt', 'w');
fwrite($fp, "n\n/Library/WebServer/Documents/makebst/merlin.mbs\ncustom\nfoo\nn\n/Library/WebServer/Documents/makebst/merlin.mbs\nn\n*\n");
foreach ($_POST as $key => $value) {
	//echo $key . ": " . $value . "<br/>";
	fwrite($fp, $value . "\n");
}
fwrite($fp, "y\n");
fclose($fp);

// run LaTeX
$status = shell_exec ("/usr/texbin/latex /Library/WebServer/Documents/makebst/makebst.tex < stdin.txt > stdout.txt");
//echo "<pre>$status</pre>";
//$foo = preg_match ("/\\ans=/", $status, $matches);

/*
// for debugging
$handle = fopen("stdout.txt", 'r');
$counter = 0;
$keys = array_keys($_POST);
echo "<table>";
while (!feof($handle)) {
	$line = fgets($handle);
	$text = htmlspecialchars($line);
	$result = preg_match("/\\\\ans=  You have selected: (.+)$/", $text, $match);
	if ($result) {
		if ($counter > 0) {
			$key = $keys[$counter-1];
			$value = $_POST[$key];
			echo "<tr><td>$key</td><td>$value</td><td>$match[1]</td></tr>";
		}
		$counter++;
	}
}
fclose($handle);
echo "</table>";
*/


// run bibtex2html
//$status = shell_exec ("export TMPDIR=.; /usr/local/bin/bibtex2html -c /usr/texbin/bibtex -s /Library/WebServer/Documents/makebst/custom.bst -nokeys -nolinks -noheader -nofooter -noabstract -nokeywords -nodoi /Library/WebServer/Documents/makebst/example.bib 2>&1");
//echo "<pre>$status</pre>";

// display HTML
//echo file_get_contents('example.html');

// actually, compiling directly with LaTex and bibtex and then 
// calling ImageMagick convert from pdf to png works better
$status = shell_exec ("/usr/texbin/latex /Library/WebServer/Documents/makebst/example.tex"); 
$status = shell_exec ("/usr/texbin/bibtex example");
$status = shell_exec ("/usr/texbin/latex /Library/WebServer/Documents/makebst/example.tex"); 
$status = shell_exec ("/usr/texbin/latex /Library/WebServer/Documents/makebst/example.tex");
$status = shell_exec ("/usr/texbin/dvipng /Library/WebServer/Documents/makebst/example.dvi > /dev/null");
//$status = shell_exec ("/usr/local/bin/convert -density 150 /Library/WebServer/Documents/makebst/example.pdf /Library/WebServer/Documents/makebst/example.png 2>&1 > stdout5.txt");
echo $status;
echo '<img src="example1.png">';
?>

</body>
</html>
