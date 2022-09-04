# Delete an existing release


In the following example, delete a previously existing release before creating
a new one with the same tag.

```yml
name: Main

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Delete
        uses: The-PullRequest-Club/action-delete-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: tag-here
          # by default uses current repository; specify a different one using `github_repository: org/repo`

      - name: Release
        uses: softprops/action-gh-release@v1
        with:
          name: type-your-release-name
          tag_name: tag-here
```
