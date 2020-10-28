<?php return ["body" => function($opt) { ?> 

    <?php foreach($opt["results"] as $videoId => $result) { ?>
        <div class="card mb-3">
            <div class="card-header">
                <span class="badge badge-secondary">
                    <?= count($result) ?> Mention(s)
                </span>
                <?= $result[0]["title"] ?? "No result available" ?>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <img class="img-thumbnail" src="https://img.youtube.com/vi/<?= $result[0]["videoId"] ?>/mqdefault.jpg">
                    </div>
                    <div class="col-12 col-md-6">
                        <?php $resultCount = count($result) - 1; ?>
                        <?php foreach($result as $i => $data) { ?>
                            <?php if($i == 5) { ?>
                                <div onclick="$('#<?= "$videoId-$i" ?>').toggle();" style="cursor: pointer;">
                                    <i class="fa fa-caret-down"></i>
                                    Show more
                                </div>
                                <div style="display: none;" id="<?= "$videoId-$i" ?>">
                            <?php } ?>

                            <div>
                                <?= $data["timestamp"]; ?>
                                <a href="https://youtu.be/<?= $data["videoId"]; ?>?t=<?= $opt["tsConvert"]($data["timestamp"]) ?>" target="_blank">
                                    <?= $data["caption"]; ?>
                                </a>
                            </div>

                            <?php if($i == $resultCount) { ?>
                                </div>
                            <?php } ?>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    <?php } ?>

<?php }]; ?>