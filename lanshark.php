<?php
  $fname = $_POST["filename"];
  print $fname;
  $path = exec("cd /home/pranav/Desktop/media_hub/build/scripts-2.7");
  echo $path;
  exec("lansharkd start");
  $output = passthru("lansharkc search $fname");
?>
