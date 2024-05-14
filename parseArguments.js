export const parseArguments = (args) => {
  const sourceIndex = args.indexOf("--source");
  const destinationIndex = args.indexOf("--destination");

  if (sourceIndex === -1 || destinationIndex === -1) {
    throw new Error("Please provide both --source and --destination arguments");
  }

  return {
    sourceRepo: args[sourceIndex + 1],
    destinationRepo: args[destinationIndex + 1],
  };
};
