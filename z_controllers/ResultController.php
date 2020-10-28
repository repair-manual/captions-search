<?php
    class ResultController extends z_controller {

        public function action_index(Request $req, Response $res) {
            $res->render("result.php", [

            ], "layout/empty.php");
        }
 
    }
?>