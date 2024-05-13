# Batch Issue Cloner

[![npm version](https://badge.fury.io/js/batch-issue-cloner.svg)](https://badge.fury.io/js/batch-issue-cloner)

This package automates bulk exporting and importing issues with the GitHub CLI (`gh`).

## Features

- Export issues from one GitHub repository to a JSON file.
- Import issues from a JSON file to another GitHub repository.
- Specify source and destination repositories on the command line.

## Prerequisites

- `gh` [(GitHub CLI)](https://cli.github.com/) must be installed and authenticated on your system:

```zsh
brew install gh
```

## Install

```bash
npm install batch-issue-cloner
```

### Use

```zsh
npx batch-issue-cloner --source <source-repo> --destination <destination-repo>
```

## Notes

- Check that `gh` is logged into the GitHub account with access to both the source and destination repositories.
- An `issues.json` file is automatically created and used within the script. Ensure the directory has write permissions.
