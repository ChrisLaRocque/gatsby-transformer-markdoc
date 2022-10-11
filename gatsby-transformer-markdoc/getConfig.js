const fs = require("fs");
const path = require("path");
const Markdoc = require("@markdoc/markdoc");
// const { defaultObject } = require("./runtime");

exports.getConfig = async function getConfig(schemaDir) {
  // This imports the config as an in-memory object
  console.log("schemadir", schemaDir);
  // const dircontents = fs.readdirSync(schemaDir);
  // console.log("contents", dircontents);
  // const object = await fs.readFile(path.resolve(schemaDir, "tags"));

  const importAtBuildTime = async (resource) => {
    try {
      const object = await fs.readFile(
        path.resolve(schemaDir, resource),
        (err, data) => {
          if (err) console.error(err);
          console.log(data);
        }
      );
      return object;
    } catch (error) {
      console.log("error", error);
      return undefined;
    }
  };

  const cfg = {
    tags: await importAtBuildTime("tags"),
    nodes: await importAtBuildTime("nodes"),
    functions: await importAtBuildTime("functions"),
    ...(await importAtBuildTime("config")),
  };
  return cfg;
};
