# GitHub Issue Migrator

This package automates bulk exporting and importing issues with the GitHub CLI (`gh`).

## Features

- Export issues from one GitHub repository to a JSON file.
- Import issues from a JSON file to another GitHub repository.
- Dynamically specify source and destination repositories.

## Prerequisites

- `gh` [(GitHub CLI)](https://cli.github.com/) must be installed and authenticated on your system:

```zsh
brew install gh
```

## Install

To install this package via npm:

```bash
npm install batch-issue-cloner
```

### Use

```bash
bic --source <source-repo> --destination <destination-repo>
```

Replace `<source-owner/source-repo>` and `<destination-owner/destination-repo>` with the appropriate GitHub owner and repository names.

### As an executable without installing

```zsh
npx batch-issue-cloner --source <source-repo> --destination <destination-repo>
```

## Notes

- Ensure that `gh` is logged into the GitHub account with access to both the source and destination repositories.
- The script requires Node.js to be installed on your machine.
- An `issues.json` file is automatically created and used within the script. Ensure the directory has write permissions.
