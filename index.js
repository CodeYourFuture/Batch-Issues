#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Recreating __dirname in ES6 module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const issuesFilePath = path.join(__dirname, "issues.json");

function fetchAndSaveIssues(sourceRepo) {
  try {
    console.log(`Fetching issues from ${sourceRepo}...`);
    const issues = execSync(
      `gh issue list --repo ${sourceRepo} --limit 1000 --state all --json title,body,labels`,
      {
        encoding: "utf8",
      }
    );
    fs.writeFileSync(issuesFilePath, issues);
    console.log("Issues successfully fetched and saved.");
  } catch (error) {
    console.error("Failed to fetch and save issues:", error);
  }
}

function cloneLabels(sourceRepo, destinationRepo) {
  console.log(
    `Cloning missing labels from ${sourceRepo} to ${destinationRepo}...`
  );
  execSync(`gh label clone ${sourceRepo} --repo ${destinationRepo}`, {
    stdio: "inherit",
  });
  console.log("Missing labels successfully cloned.");
}

function importIssues(destinationRepo) {
  if (!fs.existsSync(issuesFilePath)) {
    console.error(
      "No issues file found. Please ensure the issues file exists and try again."
    );
    return;
  }
  const issues = JSON.parse(fs.readFileSync(issuesFilePath, "utf8"));
  issues.forEach((issue) => {
    const title = issue.title;
    const body = issue.body;
    const labels = issue.labels.map((label) => label.name).join(",");

    try {
      execSync(
        `gh issue create --repo ${destinationRepo} --title "${title}" --body "${body}" --label "${labels}"`,
        {
          stdio: "inherit",
        }
      );
      console.log(`Issue created: ${title}`);
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  const sourceRepo = args[args.indexOf("--source") + 1];
  const destinationRepo = args[args.indexOf("--destination") + 1];

  fetchAndSaveIssues(sourceRepo);
  cloneLabels(sourceRepo, destinationRepo);
  importIssues(destinationRepo);
}

main();
