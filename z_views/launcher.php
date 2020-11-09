<?php return [ "head" => function($opt) { ?>

<?php }, "body" => function($opt) { ?> 

    <div class="container mt-4">
        <div class="card-deck mb-3">
            <!-- SEARCH -->
            <div class="card shadow">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h5 class="mb-0 mt-1">
                            <i class="fa fa-database mr-1"></i> 
                            Repair Search
                        </h5>
                        <a href="<?= $opt["root"] ?>search" class="d-none d-md-block btn btn-sm btn-outline-primary">
                            <i class="fa fa-search mr-1"></i>
                            Find a solution
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <a href="<?= $opt["root"] ?>search" class="mb-2 d-block d-md-none btn btn-sm btn-outline-primary">
                        <i class="fa fa-search mr-1"></i>
                        Find a solution
                    </a>
                    <p class="card-text">
                        Searches through 180k+ captions and find relevant videos 
                        as well as the important timestamps that include your 
                        queried problem. Every entry from the Repair Report Editor 
                        is also indexed and made available for searching here. 
                    </p>
                </div>
                <div class="card-footer text-muted">
                    Source code available on 
                    <a href="https://github.com/repair-manual/captions-search" target="_blank">
                        <i class="fa fa-github"></i>
                        Github
                    </a>
                </div>
                <div class="card-footer text-muted">
                    Made by
                    <a href="https://zierhut-it.de" target="_blank">
                        Zierhut IT - Alex Zierhut
                    </a>
                </div>
            </div>

            <!-- EDITOR -->
            <div class="card shadow">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h5 class="mb-0 mt-1">
                            <i class="fa fa-file-text mr-1"></i> 
                            Repair Report Editor
                        </h5>
                        <a href="<?= $opt["root"] ?>reporteditor" class="d-none d-md-block btn btn-sm btn-outline-primary">
                            <i class="fa fa-pen mr-1"></i>
                            Create a report
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <a href="<?= $opt["root"] ?>reporteditor" class="d-block d-md-none mb-2 btn btn-sm btn-outline-primary">
                        <i class="fa fa-pen mr-1"></i>
                        Create a report
                    </a>
                    <p class="card-text">
                        Help us gather information from Rossmann's videos! Use 
                        this editor to assign a video, fill in the issues 
                        described and then upload them to Github for collaboration 
                        or get a MediaWiki formatted text to copy into the wiki.
                    </p>
                </div>
                <div class="card-footer text-muted">
                    Source code available on 
                    <a href="https://github.com/repair-manual/rm-reports-app" target="_blank">
                        <i class="fa fa-github"></i>
                        Github
                    </a>
                </div>
                <div class="card-footer text-muted">
                    Made by 
                    <a href="https://github.com/KararTY" target="_blank">
                        Karar Al-Remahy
                    </a>
                </div>
            </div>
        </div>
        <div class="card-deck">
            <!-- WIKI -->
            <div class="card shadow">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h5 class="mb-0 mt-1">
                            <i class="fa fa-book mr-1"></i> 
                            The Wiki
                        </h5>
                        <a href="https://wiki2.rossmanngroup.com/" target="blank" class="d-none d-md-block btn btn-sm btn-outline-primary">
                            <i class="fa fa-external-link mr-1"></i>
                            Open the wiki
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <a href="https://wiki2.rossmanngroup.com/" target="blank" class="d-block d-md-none mb-2 btn btn-sm btn-outline-primary">
                        <i class="fa fa-external-link mr-1"></i>
                        Open the wiki
                    </a>
                    <p class="card-text">
                        The wiki is a place to learn about repair as well as
                        share and document your knowledge with others. It contains
                        detailed guidelines regarding problems encountered while
                        fixing devices as well as standards on meta topics like
                        customer service.
                    </p>
                </div>
                <div class="card-footer text-muted">
                    Discussions are being had on 
                    <a href="https://github.com/repair-manual/discussion/projects/1" target="_blank">
                        <i class="fa fa-github"></i>
                        Github
                    </a>
                </div>
            </div>
        </div>
    </div>

<?php }, "lang" => [
    "en" => [
        "key1" => "word1"
    ],
    "DE_Formal" => [
        "key1" => "wort1"
    ]
]]; ?>