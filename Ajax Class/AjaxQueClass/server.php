<?php
	/*
		This is an extremely basic server-side file for the AJAX test.
		It allows you to specify a duration (in seconds). This will
		cause the server to pause for that many seconds, emulating a
		busy process, such as a complex relational DB lookup.
	*/
	// This prevents IE from caching the page. VERY annoying problem.
	header ( "Pragma: no-cache" );
	header ( "Cache-Control: no-cache" );
	$delay = $_POST['delay'];

	if ( !$delay )
		{
		$delay = $_GET['delay'];
		}
	
	$id = $_POST['id'];

	if ( !$id )
		{
		$id = $_GET['id'];
		}
	
	$t = (time() + (abs ( $delay )));
	while ( time() <= $t ) {};	// Real, REAL basic delay
	
	if ( $id )
		{
		echo "(ID: $id) ";
		}
	
	echo "The request took $delay seconds to execute on the server.";
?>
