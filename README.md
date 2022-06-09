# Valuecase CDN
Public CDN repository for web assets (web components, images, ...). The resources are intended to be served via jsDelivr.

## Naming conventions

Each directory in this repository represents one "library". The of a directory ideally originates from the repository name, 
that has been build and deployed to this repository.

## How new versions should be pushed

Please push the deployment of your library to a new direction or the existing directory having the same name like the source repository/project.

Ideally a __github action__ builds and deploys the built assets. 

## Version Tags

This repository uses a github action to automatically create a new version tag after changes have been pushed to this repository.

## Using the CDN assets

jsDelivr has the following syntax:

```
https://cdn.jsdelivr.net/gh/{user}/{repository}(@{optional version})/{path to file}
```

This README for example can be accessed with the following link:

```
https://cdn.jsdelivr.net/gh/valuecase-de/valuecase-cdn/README.md
```

You can add different version attributes:

- `@{tag}`
- `@{commit hash}`
- `@latest`

An example:

```
https://cdn.jsdelivr.net/gh/valuecase-de/valuecase-cdn@v1.12.0/README.md
```
