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
        <div class="row mb-3">
            <div class="col-12">
                <div class="card card-sm">
                    <div class="card-body row no-gutters align-items-center py-1">
                        <div class="col-auto">
                            <i class="fas fa-search h4 text-body"></i>
                        </div>
                        <!--end of col-->
                        <div class="col">
                            <input id="query" class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords">
                        </div>
                        <!--end of col-->
                        <div class="col-auto">
                            <button class="btn btn-lg btn-primary" id="submit">
                                Search
                            </button>
                        </div>
                        <!--end of col-->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div id="results">
                    Results
                </div>
            </div>
        </div>
    </div>

    <script>
        var query = "";
        $("#submit").on("click", () => {
            query = $("#query").val();
            updateResults();
        });

        function updateResults(page = 1) {
            $('#results').slideUp(150, () => {
                $('#results').html("loading...");
                $('#results').slideDown(50);
                $.ajax({
                    url: Z.Request.rootPath+"result/?query="+query+"&page="+page,
                    success: (res) => {
                        $("#results").html(res);
                        $('#results').hide();
                        $('#results').slideDown(150);
                    }
                });
            });
        }
    </script>

<?php }, "lang" => [
    "en" => [
        "key1" => "word1"
    ],
    "DE_Formal" => [
        "key1" => "wort1"
    ]
]]; ?>