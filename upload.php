<?php
	if(!empty($_FILES['file'])){
		$ext = pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
                $image = time().'.'.$ext;
                move_uploaded_file($_FILES["file"]["tmp_name"], 'images/'.$image);
		//echo true;
	}else{
		// echo '<pre>',print_r($_POST['file']);
		//echo "not found";
	}
echo json_encode($_POST);
?>
