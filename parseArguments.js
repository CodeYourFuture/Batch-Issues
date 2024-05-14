import { parseArgs } from "node:util";

export const parseArguments = (args) => {
  const { values } = parseArgs({
    args,
    options: {
      "destination": { short: "d", type: "string" },
      "source": { short: "s", type: "string" },
    },
  });

  if (!values.destination || !values.source) {
    throw new Error("Please provide both --source and --destination arguments");
  }

  return {
    sourceRepo: values.source,
    destinationRepo: values.destination,
  };
};
