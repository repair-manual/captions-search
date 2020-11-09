<?php return [ "head" => function($opt) { ?>

    <style>
        .content {
            border: none;
            width: 100%;
            height: calc(100vh - (40px + 1.5rem));
            padding: 0px;
            margin: 0px;
        }
    </style>

<?php }, "body" => function($opt) { ?> 

    <iframe class="content" src="<?= $opt["root"]; ?>editor"></iframe>

<?php }, "lang" => [
    "en" => [
        "key1" => "word1"
    ],
    "DE_Formal" => [
        "key1" => "wort1"
    ]
]]; ?>