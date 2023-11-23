/* eslint-disable import/no-extraneous-dependencies */
const inflection = require("inflection");

module.exports = {
  prompt: async ({ prompter }) => {
    let { entityName } = await prompter.prompt({
      type: "input",
      name: "entityName",
      message: "What's the entity name?",
    });
    const { tableName } = await prompter.prompt({
      type: "input",
      name: "tableName",
      message: "How is called in the database?",
    });

    entityName = entityName.replace(/ /g, "_").replace(/[^\w]/g, "");

    const Entity = inflection.transform(entityName, [
      "singularize",
      "capitalize",
      "camelize",
    ]);
    const entities = inflection.camelize(
      inflection.pluralize(entityName),
      true
    );

    return {
      entityName,
      tableName,
      Entity,
      entities,
    };
  },
};
