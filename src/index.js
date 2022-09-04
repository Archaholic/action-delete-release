const { Octokit } = require("@octokit/rest");
const {env} = require ("process");
const token = env.GITHUB_TOKEN
const [owner, repo] = env.INPUT_GITHUB_REPOSITORY.split("/")
const tag_name = env.INPUT_TAG_NAME

const octokit = new Octokit({
    auth: token
});


octokit.repos.listReleases({
    owner,
    repo
}).then(res => {

    const release = res.data.find(release => release["tag_name"] === tag_name);
    const release_id = release["id"];
    console.log("Found release with id %d", release_id)

    if (release_id) {
        octokit.repos.deleteRelease({
            owner,
            repo,
            release_id
        }).catch(err => {
            console.error("Unable to delete the release");
        })
    }
    else {
        console.error("Unable to find release with tag %s", tag_name)
    }

}).catch(err => {
        if(err.status === 404){
            console.error("Release not found.");
            return
        }
        console.error("Unable to find and delete release");
        console.error(err);
    }
)
