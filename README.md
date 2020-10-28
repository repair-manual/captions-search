# Full-text Caption Search

## Explanation
This project is made to search through all captions from <a href="https://www.youtube.com/playlist?list=PLkVbIsAWN2lsHdY7ldAAgtJug50pRNQv0">this</a> playlist to help people find problems.

## Data Source
If you found and error while using this search. Please change it <a href="https://github.com/repair-manual/youtube-captions">here</a>.

## Codebase documentation
Please take a look at <a href="https://docs.zubzet.de/0.10.x/">this</a> documentation.

## How to setup and change stuff
- Clone this repository and it's submodules: `git clone --recurse-submodules https://github.com/repair-manual/captions-search.git /var/www/html/rrr_search`
- Be sure to use apache2. Otherwise you'll have to rewrite the .htaccess file
- Import the latest `db_dumps` into MariaDB or equivalent
- Change the settings in z_config/z_settings to your liking. (**Don't** push those if they include actual secrets)
- Always check out to a new branch before creating a pull request. Please name them like `feature/some-new-stuff`

## Deployment
- Every change is automatically mirrored to <a href="https://git.zierhut-it.de/repair-manual/captions-search">this</a> repository.
- The self-hosted drone CI and it's build logs can be found <a href="https://drone.zierhut-it.de/repair-manual/captions-search">here</a>.
- Please use [skip ci] in your commit message when changing files like the README.

## Contact
Hit me up on discord ALZlper#7355<br>
Email: alex (at) zierhut-it (dot) de