<?php
    class IndexController extends z_controller {
        public function action_index(Request $req, Response $res) {
            $res->render("launcher.php");
        }
    }
?>