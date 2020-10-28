<?php

    class SearchModel extends z_model {

        public function query($query) {
            $query = "%$query%";
            $sql = "SELECT c.*, v.`title` 
                    FROM `caption` AS c
                    LEFT JOIN `video` AS v
                    ON c.`videoId` = v.`videoId`
                    WHERE `caption`
                    LIKE ?";
            $this->exec($sql, "s", $query);
            return $this->resultToArray();
        }

    }

?>