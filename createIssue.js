import { spawnSync } from "child_process";

export const createIssue = (destinationRepo, issue) => {
  const title = issue.title;
  const body = issue.body;
  const labels = issue.labels.map((label) => label.name).join(",");

  try {
    const result = spawnSync(
      "gh",
      [
        "issue",
        "create",
        "--repo",
        destinationRepo,
        "--title",
        title,
        "--body",
        body,
        "--label",
        labels,
      ],
      { stdio: "inherit" }
    );

    if (result.error) {
      throw result.error;
    }

    console.log(`Issue created: ${title}`);
  } catch (error) {
    console.error(`❌ Failed to create issue: ${title}`, error);
  }
};
