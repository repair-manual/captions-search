<?php
    class IndexController extends z_controller {

        public function action_index(Request $req, Response $res) {
            $res->render("search.php");
        }

        public function action_import(Request $req, Response $res) {
            global $argc;
            if ($argc == 0) return;
            
            $data = [];
            foreach(scandir('data/captions') as $file) {
                if(in_array($file, [".", ".."])) continue;
                $id = explode(".", $file)[0];
                $file = file_get_contents("data/captions/$file");
                $file = explode("\n", $file);
                unset($file[0]);
                $tmp = [];
                foreach($file as $i => $line) {
                    if(empty($line)) continue;
                    if(substr($line, 0, 2) == "--") {
                        $line = str_replace("-", "", $line);
                        $tmp[$line] = $file[$i+1];
                    }
                }
                $data[$id] = $tmp;
            }

            $counter = 1;
            foreach($data as $videoId => $file) {
                echo "$counter: $videoId\n";
                foreach($file as $timestamp => $caption) {
                    $req->getModel("Caption")->addCaption(
                        $caption,
                        $timestamp,
                        $videoId
                    );
                }
                $counter++;
            }
        }

    }
?>