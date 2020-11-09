<?php return [ "head" => function($opt) { ?>

    <style>
        .popular-search {
            cursor: pointer;
        }
        .popular-search:hover {
            text-decoration: underline;
        }
    </style>

<?php }, "body" => function($opt) { ?> 

    <div class="container mt-4">
        <div class="row mb-3">
            <div class="col-12">
                <h3>
                    Repair Search
                </h3>
                <div class="form-inline my-2">
                    <div class="input-group w-100">
                        <input value="<?= $_GET["q"] ?? ""; ?>" type="text" class="form-control" id="query" placeholder="Keywords, Topics, ...">
                        <button type="submit" class="btn btn-outline-primary" id="btn-search">
                            <i class="fa fa-search"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div id="results">
                    <h5>You might want to search:</h5>
                    <div class="card-deck">
                        <?php foreach($opt["popularSearches"] as $search) { ?>
                            <div class="card mb-2">
                                <div class="card-body py-2 popular-search" onClick="popularSearch('<?= $search ?>');">
                                    <i class="fa fa-caret-right"></i>
                                    <?= $search ?>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $("#btn-search").on("click", runQuery);
        $("#query").on("keyup", function(e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                runQuery();
            }
        });

        var query = "";
        function runQuery() {
            query = $("#query").val();
            document.title = "Repair Search - "+query;
            updateResults();
            setHistory("q", query);
        }

        function popularSearch(query) {
            $("#query").val(query);
            runQuery();
        }

        function updateResults(page = 1) {
            $('#results').hide(0, () => {
                $('#results').html("loading...");
                $('#results').show();
                $.ajax({
                    url: Z.Request.rootPath+"result/?query="+query+"&page="+page,
                    success: (res) => {
                        $("#results").html(res);
                        $('#results').hide();
                        $('#results').show();
                    }
                });
            });
        }

        function setHistory(param, value) {
            var searchParams = new URLSearchParams(window.location.search)
            searchParams.set(param, value)
            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
            history.pushState(null, '', newRelativePathQuery)
        }

        <?php if(!empty($_GET["q"] ?? "")) { ?>
            runQuery();
        <?php } ?>
    </script>

<?php }, "lang" => [
    "en" => [
        "key1" => "word1"
    ],
    "DE_Formal" => [
        "key1" => "wort1"
    ]
]]; ?>