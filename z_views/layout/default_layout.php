<?php  return ["layout" => function($opt, $body, $head) { ?>

    <!doctype html>
    <html class="no-js" lang="en">
        <head>
            <?php $opt["layout_essentials_head"]($opt); ?>
            <?php $head($opt); ?>
            <title>Repair Support Launcher</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="<?= $opt["root"] ?>">
                    Repair Support Launcher 
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="<?= $opt["root"]; ?>">
                                <i class="fa fa-rocket"></i> 
                                Launcher
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?= $opt["root"]; ?>search">
                                <i class="fa fa-search"></i> 
                                Search
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?= $opt["root"]; ?>reporteditor">
                                <i class="fa fa-pen"></i> 
                                Editor
                            </a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0" action="<?= $opt["root"] ?>search">
                        <input name="q" class="form-control mr-sm-2" type="search" placeholder="Keywords, Topics, ...">
                        <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
                            <i class="fa fa-search"></i> 
                            Search
                        </button>
                    </form>
                </div>
            </nav>

            <?php $body($opt); ?>

            <?php $opt["layout_essentials_body"]($opt); ?>
        </body>
    </html>

<?php }, "lang" => [
    "en" => [
        "key" => "word",
        "key2" => "word2"
    ],
    "DE_Formal" => [
        "key" => "wort",
        "key2" => "wort2"
    ]
]]; ?>