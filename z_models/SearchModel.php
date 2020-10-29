<?php

    class SearchModel extends z_model {

        public function query($query, $page = 1, $limit = 10) {
            $offset = $limit * ($page-1);
            $sql = "SELECT c.*, v.`title` AS title
                    FROM `caption` AS c
                    LEFT JOIN `video` AS v
                    ON v.`videoId` = c.`videoId`
                    WHERE MATCH(c.`caption`) AGAINST(?)
                    LIMIT ? OFFSET ?";
            $this->exec($sql, "sii", $query, $limit, $offset);
            $results = $this->resultToArray();
            foreach($results as $i => $result) {
                $results[$i]["time"] = $this->convertTimestampToTime(
                    $result["timestamp"]
                );
            }
            $results["data"] = $results;
            $results["pages"] = ceil($this->getPageCount($query) / $limit);
            return $results;
        }

        private function convertTimestampToTime($ts) {
            if(substr_count($ts, ":") == 1) {
                $ts = "00:$ts";
            }
            $ts = preg_replace("/^([\d]{1,2})\:([\d]{2})$/", "00:$1:$2", $ts);
            sscanf($ts, "%d:%d:%d", $hours, $minutes, $seconds);
            return $hours * 3600 + $minutes * 60 + $seconds;
        }

        private function getPageCount($query) {
            $sql = "SELECT COUNT(*) AS CNT
                    FROM `caption`
                    WHERE MATCH(`caption`) AGAINST(?)";
            return $this->exec($sql, "s", $query)->resultToLine()["CNT"];
        }

    }

?>