<?php
    class ReporteditorController extends z_controller {
        public function action_index(Request $req, Response $res) {
            $res->render("editor.php");
        }
    }
?>