<?php return [ "head" => function($opt) { ?>

    <style>
        .form-control-borderless {
            border: none;
        }

        .form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
            border: none;
            outline: none;
            box-shadow: none;
        }
    </style>

<?php }, "body" => function($opt) { ?> 

    <div class="container">
        <div class="row">
            <div class="col-12">
                <form class="card card-sm">
                    <div class="card-body row no-gutters align-items-center py-1">
                        <div class="col-auto">
                            <i class="fas fa-search h4 text-body"></i>
                        </div>
                        <!--end of col-->
                        <div class="col">
                            <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords">
                        </div>
                        <!--end of col-->
                        <div class="col-auto">
                            <button class="btn btn-lg btn-primary" type="submit">
                                Search
                            </button>
                        </div>
                        <!--end of col-->
                    </div>
                </form>
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