import fs from "fs";
import { createIssue } from "./createIssue.js";

export const cloneIssues = (
  destinationRepo,
  sourceIssuesFile,
  destinationIssuesFile
) => {
  // You need these files - go create them if you don't have them
  if (
    !fs.existsSync(sourceIssuesFile) ||
    !fs.existsSync(destinationIssuesFile)
  ) {
    throw new Error("Issues files not found. Please fetch issues first.");
  }

  // Grab our arrays of issues
  const issuesToClone = JSON.parse(fs.readFileSync(sourceIssuesFile, "utf8"));
  const existingIssues = JSON.parse(
    fs.readFileSync(destinationIssuesFile, "utf8")
  );

  // Dedupe
  const existingIssueTitles = new Set(
    existingIssues.map((issue) => issue.title)
  );

  // Clone
  issuesToClone.forEach((issue, index) => {
    if (existingIssueTitles.has(issue.title)) {
      console.log(`⏭️ Skipping existing issue: ${issue.title}`);
      return;
    }
    setTimeout(() => createIssue(destinationRepo, issue), index * 500); // rate limiting on this API
  });
};
