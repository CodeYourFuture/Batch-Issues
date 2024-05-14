import fs from "fs";
import { execSync, spawnSync } from "child_process";

export const cloneLabels = (sourceRepo, destinationRepo) => {
  try {
    console.log(`Cloning labels from ${sourceRepo} to ${destinationRepo}...`);
    execSync(`gh label clone ${sourceRepo} --repo ${destinationRepo}`, {
      stdio: "inherit",
    });
    console.log("🏷️ Labels successfully cloned.");
  } catch (error) {
    console.error("❌ Failed to clone labels:", error);
  }
};
