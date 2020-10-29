<?php return ["body" => function($opt) { ?> 

    <?php if (count($opt["results"]) > 0) { ?>
        <?php foreach($opt["results"] as $result) { ?>
            <div class="card mb-3">
                <div class="card-header">
                    <span class="badge badge-secondary">
                        <?= count($result["captions"]) ?> Match(es)
                    </span>
                    <?= $result["title"] ?? "No result available" ?>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <img class="img-thumbnail" src="https://img.youtube.com/vi/<?= $result["videoId"] ?>/mqdefault.jpg">
                        </div>
                        <div class="col-12 col-md-6">
                            <?php foreach($result["captions"] as $i => $caption) { ?>
                                <div>
                                    <?= $caption["timestamp"]; ?>
                                    <a href="https://youtu.be/<?= $caption["videoId"]; ?>?t=<?= $caption["time"] ?>" target="_blank">
                                        <?= $caption["caption"]; ?>
                                    </a>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php } ?>
    <?php } else { ?>
        <div class="col-12 mb-3">
            No results.
        </div>
    <?php } ?>

    <?php if(count($opt["pagination"]) > 1) { ?>
        <nav>
            <h5>Pages</h5>
            <ul class="pagination">
                <?php foreach ($opt["pagination"] as $i => $page) { ?>
                    <li class="page-item <?= $page == $opt["current_page"] ? "active" : "" ?>">
                        <a class="page-link mr-2" href="#page-<?= $page ?>" onClick='updateResults(<?= $page ?>); return false;'>
                            <?= $page; ?>
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </nav>
    <?php } ?>

<?php }]; ?>