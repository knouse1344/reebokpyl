<?php
$ip=$_SERVER['REMOTE_ADDR'];
include 'a.php';



$a = new DateTime('now');
$b = new DateTime('2015-04-4');

$d=$a->diff($b);
$days=$d->days;
//print_r($days);
$output['h']=$days;




$ts=$_GET['time'];
$e=strtolower($_GET['email']);
$m=$_GET['type'];

$output['email']=$e;
$output['time']=$ts;


$output['e']=[9,9];
$output['g']="d";

if ( $m == 'new' )
{
	//continue;
	
	ob_start(); 
	$view="/_design/stuff/_view/email?key=\"$e\"";
	$result = $sag->get($view);
	ob_end_clean();  
	$games=$result->body->rows;
	//print_r($games);
	$count=count($games);
	if ( $count > 0 )
	{
		$output['g']="d";
		//continue 2;
	}
	else
	{
		ob_start(); 
		$view="/_design/stuff/_view/ip?key=\"$ip\"";
		$result = $sag->get($view);
		ob_end_clean();  
		$games=$result->body->rows;
		//print_r($games);
		$count=count($games);
		if ( $count > 500 )
		{
			$output['g']="d";
			//continue 2;
		}
		else
		{
			ob_start();
			$result = $sag->get("prize_table");
			ob_end_clean();  
			$p=$result->body;	
			//echo "<pre>";
			//print_r($p);
			//echo "fwqef";
			// ya ya 
			
			$ii=0;
			while ( $ii < 2 )
			{
				$boom=rand(1,15);
				//echo "$boom\n";
				if ($boom < 9 )
				{
					//headband
					$headband=$p->headband;
					//echo $headband;
					if ($boom == 1 && (($days*20) < $headband ))
					{
						$prize=$boom;
					}

					//bag
					if ($boom == 2 && (($days*10) < $p->bag))
					{
						$prize=$boom;
					}

					//waterbottle
					if ($boom == 3 && (($days*20) < $p->waterbottle))
					{
						$prize=$boom;
					}

					//phonecase
					if ($boom == 4 && (($days*10) < $p->phonecase))
					{
						$prize=$boom;
					}
					
					//giftcard
					//
					if ($boom == 5 && (($days*35) < $p->coupon))
					{
						$prize=$boom;
					}		
					
					//ufc
					if ($boom == 6 && (0 < $p->ufc))
					{
						$prize=$boom;
					}
					
					//shoes
					if ($boom == 7 && (($days*7) < $p->shoes))
					{
						$prize=$boom;
					}
					
					//waterbottle
					if ($boom == 8 && (($days*1) < $p->giftcard))
					{
						$prize=$boom;
					}
					
					if ( !$prize )
					{
						//whammy
						$prize=9;
					}
					
				}
				else	{ $prize=9;	}
				$boomer[$ii]=$prize;
				$ii++;
				unset($prize);
			}
			
			
			
			$output['e']=$boomer;
			//$output['e']=[5,9];
			
			
			//$output['code']="youwontext";
			
			
			$output['g']="r";
			$post = new stdClass();

			$post->type="email_check";


			$post->timestamp=$_GET['time'];
			$post->email=$e;
			$post->ip=$ip;
			$post->array=$boomer;
			//print_r($post);
			

			ob_start(); 
			$result=$sag->post($post);
			ob_end_clean(); 
			$id=$result->body->id;
			//echo "$id";
			$output['id']=$id;
			//echo json_encode($output);
			//print_r($result->body->id);
		}
		
		
		//whammy codes
		if ( in_array(9, $output['e']) )
		{
			$file = "Pump_Experience_15_off_031715.csv";
			$f = fopen($file, 'r');
			$line = fgets($f);
			fclose($f);
			//echo $line;
			$output['wcode']=$line;
			
			$contents = file_get_contents($file);
			$page=explode("\n", $contents);
			unset($page[0]);
			$page=implode("\n", $page);
			//$first_line = substr($contents, 0, 32);
			file_put_contents($file, $page);
			
		}
		
		
		if ( in_array(5, $output['e']) )
		{
			$file = "Pump_Experience_20_off_031715.csv";
			$f = fopen($file, 'r');
			$line = fgets($f);
			fclose($f);
			//echo $line;
			$output['code']=$line;
			
			$contents = file_get_contents($file);
			$page=explode("\n", $contents);
			unset($page[0]);
			$page=implode("\n", $page);
			//$first_line = substr($contents, 0, 32);
			file_put_contents($file, $page);
			
		}		
		
		
		
		
	}
}



if ( $m == 'redemption' )
{
	$post = new stdClass();
	
	$round=$_GET['round'];
	if ($round==3)	{ $round = 1; $prize_won=$_GET['a'];}
	else 			{ $round = 2; $prize_won=$_GET['b'];}
	

	if ($prize_won == 1) { $prize_won="headband"; }
	if ($prize_won == 2) { $prize_won="bag"; }
	if ($prize_won == 3) { $prize_won="waterbottle"; }
	if ($prize_won == 4) { $prize_won="phonecase"; }
	if ($prize_won == 5) { $prize_won="coupon"; }
	if ($prize_won == 6) { $prize_won="ufc"; }
	if ($prize_won == 7) { $prize_won="shoes"; 	$post->gender=$_GET['gender'];	$post->shoesize=$_GET['shoesize'];}
	if ($prize_won == 8) { $prize_won="giftcard"; }	
	
	$post->type=$m;

	$post->timestamp=$_GET['time'];
	$post->email=$e;
	$post->ip=$ip;
	//print_r($post);
	$post->prize_won=$prize_won;
	$post->round=$round;
	$post->firstname=$_GET['firstname'];
	$post->lastname=$_GET['lastname'];
	$post->streetaddress=$_GET['streetaddress'];
	$post->streetaddress2=$_GET['streetaddress2'];
	$post->city=$_GET['city'];
	$post->zipcode=$_GET['zipcode'];

	
	
	ob_start(); 
	$result=$sag->post($post);
	ob_end_clean(); 
	$id=$result->body->id;
	//echo "$id";
	$output['id']=$id;
			

			
	ob_start();
	$result = $sag->get("prize_table");
	ob_end_clean();  
	$p=$result->body;
	$p->$prize_won=$p->$prize_won-1;
	ob_start(); 
	$result=$sag->post($p);
	ob_end_clean(); 

			
			

	
	$output['email']=$e;
	$output['time']=$ts;
	$output['prize_won']=$prize_won;
}




//$output['ip']=$ip;


echo json_encode($output);

?>