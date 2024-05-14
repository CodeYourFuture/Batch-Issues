import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseArguments } from "./parseArguments.js";

describe("parseArguments", () => {
  [
    [],
    ["--source", "source/repo"],
    ["--destination", "destination/repo"],
  ].forEach((args) => {
    it(`rejects missing arguments for ${JSON.stringify(args)}`, () => {
      assert.throws(() => parseArguments(args));
    });
  });

  it("exposes provided arguments", () => {
    const destinationRepo = "destination/repo";
    const sourceRepo = "source/repo";
    assert.deepEqual(parseArguments([
      "--source", sourceRepo,
      "--destination", destinationRepo,
    ]), { destinationRepo, sourceRepo });
  });
});
