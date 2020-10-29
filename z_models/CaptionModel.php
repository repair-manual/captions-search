<?php

    class CaptionModel extends z_model {

        public function addCaption($caption, $timestamp, $videoId) {
            if(strlen($timestamp) > 20) {
                echo "$timestamp\n";
                return;
            }

            if($this->captionExists($timestamp, $videoId)) {
                $sql = "UPDATE `caption` SET `caption`=? WHERE `timestamp`=? AND `videoId`=?";
                $this->exec($sql, "sss", $caption, $timestamp, $videoId);
                return;
            }

            $sql = "INSERT INTO `caption`(`caption`, `timestamp`, `videoId`) VALUES (?, ?, ?)";
            $this->exec($sql, "sss", $caption, $timestamp, $videoId);
        }

        public function captionExists($timestamp, $videoId) {
            $sql = "SELECT `id` FROM `caption` WHERE `timestamp`=? AND `videoId`=?";
            $this->exec($sql, "ss", $timestamp, $videoId);
            return $this->countResults() > 0;
        }

        public function getByVideoId($videoId) {
            $sql = "SELECT * FROM `caption` WHERE `videoId`=?";
            return $this->exec($sql, "s", $videoId)->resultToArray();
        }
    }

?>