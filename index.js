#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";

const cloneLabels = (sourceRepo, destinationRepo) => {
  try {
    console.log(
      `Cloning missing labels from ${sourceRepo} to ${destinationRepo}...`
    );
    execSync(`gh label clone ${sourceRepo} --repo ${destinationRepo}`, {
      stdio: "inherit",
    });
    console.log("Missing labels successfully cloned.");
  } catch (error) {
    console.error("Failed to clone labels:", error);
  }
};

const importIssues = (destinationRepo, issues) => {
  issues.forEach((issue) => {
    const title = issue.title.replace(/"/g, '\\"');
    const body = issue.body.replace(/"/g, '\\"').replace(/\n/g, "\\n");
    const labels = issue.labels.map((label) => label.name).join(",");

    try {
      execSync(
        `gh issue create --repo ${destinationRepo} --title "${title}" --body "${body}" --label "${labels}"`,
        { stdio: "inherit" }
      );
      console.log(`Issue created: ${title}`);
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  });
};

const main = () => {
  const args = process.argv.slice(2);
  const sourceRepo = args[args.indexOf("--source") + 1];
  const destinationRepo = args[args.indexOf("--destination") + 1];

  cloneLabels(sourceRepo, destinationRepo);
  const issues = JSON.parse(fs.readFileSync("./issues.json", "utf8"));
  importIssues(destinationRepo, issues);
};

main();
