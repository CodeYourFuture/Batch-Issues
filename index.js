#!/usr/bin/env node

import fs from "fs";
import { execSync, spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { parseArguments } from "./parseArguments.js";
import { fetchIssues } from "./fetchIssues.js";
import { cloneLabels } from "./cloneLabels.js";
import { cloneIssues } from "./cloneIssues.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceIssuesFile = path.join(__dirname, "sourceIssues.json");
const destinationIssuesFile = path.join(__dirname, "destinationIssues.json");

const main = () => {
  try {
    const args = process.argv.slice(2);
    const { sourceRepo, destinationRepo } = parseArguments(args);
    // write a list of issues you want to copy
    fetchIssues(sourceRepo, sourceIssuesFile);
    // write a list of issues that already exist in the destination repository to avoid duplicates
    fetchIssues(destinationRepo, destinationIssuesFile);
    // clone labels from the source repository to the destination repository because labels are not created by the create issues command
    cloneLabels(sourceRepo, destinationRepo);
    // now go do the list
    cloneIssues(destinationRepo, sourceIssuesFile, destinationIssuesFile);
  } catch (error) {
    console.error(error.message);
  }
};

main();
