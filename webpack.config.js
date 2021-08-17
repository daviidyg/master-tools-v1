const { join } = require('path');
const { merge } = require('webpack-merge');

const ENVIRONMENT_FILE = join(__dirname, "src", "environment.ts");

module.exports = (env) => {
    env = {...env};

    let entorn = "loc";
    let path = "webpack.dev.config";
    let environmentDest = ENVIRONMENT_FILE;

    if (env && env["ENTORN"]) {
        entorn = env["ENTORN"];

        if (entorn !== "loc") {
            path = "webpack.prod.config";
            environmentDest = join(__dirname, "environments", `environment.${entorn}.ts`);
        }
    }

    const config = require(join(__dirname, "webpack.base.config"))(env, environmentDest);
    return merge({}, config, require(join(__dirname, path))(env));
};
