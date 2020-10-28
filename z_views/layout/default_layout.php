<?php  return ["layout" => function($opt, $body, $head) { ?>

    <!doctype html>
    <html class="no-js" lang="en">
        <head>
            <?php $opt["layout_essentials_head"]($opt); ?>
            <?php $head($opt); ?>
        </head>
        <body>
            <nav class="navbar navbar-dark bg-dark fixed-top">
                <a class="navbar-brand" href="#">
                    Louis Rossman Repair Video Search
                </a>
            </nav>

            <div style="margin-top: 72px;">
                <?php $body($opt); ?>
            </div>

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