import { execSync } from "child_process";
import fs from "fs";

export const fetchIssues = (repo, issuesFilePath) => {
  try {
    console.log(`Fetching issues from ${repo}...`);
    const issues = execSync(
      `gh issue list --repo ${repo} --limit 1000 --state all --json title,body,labels`,
      { encoding: "utf8" }
    );
    fs.writeFileSync(issuesFilePath, issues);
    console.info(`✅ Issues saved to ${issuesFilePath}.`);
  } catch (error) {
    console.error("❌ Failed to fetch and save issues:", error);
  }
};
