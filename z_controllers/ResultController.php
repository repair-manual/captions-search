<?php
    class ResultController extends z_controller {

        public function action_index(Request $req, Response $res) {
            $currentPage = $req->getGet("page");

            $results = $req->getModel("Search")->query(
                $req->getGet("query"),
                $currentPage
            );

            $mergedResult = [];
            foreach($results["data"] as $i => $result) {
                if(!isset($mergedResult[$result["videoId"]])) {
                    $mergedResult[$result["videoId"]] = [
                        "videoId" => $result["videoId"],
                        "title" => $result["title"],
                        "captions" => []
                    ];
                }
                $mergedResult[$result["videoId"]]["captions"][] = $result;
                unset($results[$i]);
            }

            $pagination = [
                1,
                $results["pages"]
            ];
            $pagination[] = $currentPage;
            $pagination[] = $currentPage + 1;
            $pagination[] = $currentPage + 2;
            $pagination[] = $currentPage - 1;
            $pagination[] = $currentPage - 2;

            $pagination = array_unique($pagination);
            $pagination = array_filter($pagination, function($page) use ($results) {
                return $page > 0 && $page <= $results["pages"];
            });
            sort($pagination);

            $res->render("result.php", [
                "results" => $mergedResult,
                "pagination" => $pagination,
                "current_page" => $currentPage
            ], "layout/empty.php");
        }
 
    }
?>