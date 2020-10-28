<?php
    class ResultController extends z_controller {

        public function action_index(Request $req, Response $res) {
            $query = $req->getGet("query");
            $query = explode(" ", $query);

            $results = [];
            foreach($query as $keyword) {
                if(strlen($keyword) < 2) continue;
                $captions = $req->getModel("Search")->query($keyword);
                foreach($captions as $caption) {
                    if(!isset($results[$caption["videoId"]])) {
                        $results[$caption["videoId"]] = [];
                    }
                    $results[$caption["videoId"]][] = $caption;
                }
            }

            usort($results, function($a, $b) {
                return count($b) <=> count($a);
            });

            $res->render("result.php", [
                "results" => $results,
                "tsConvert" => function($ts) {
                    if(substr_count($ts, ":") == 1) {
                        $ts = "00:$ts";
                    }
                    $ts = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $ts);
                    sscanf($ts, "%d:%d:%d", $hours, $minutes, $seconds);
                    return $hours * 3600 + $minutes * 60 + $seconds;
                }
            ], "layout/empty.php");
        }
 
    }
?>