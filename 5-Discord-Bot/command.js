const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "create",
    description: "Creates a new short URL!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTI0MTk2Mjg2MjcxNzU3MTEwMg.GIK8pz.7u8kwUppmY4Ikm0YLZXLcWhhS5D3sLwcJdhzOI"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1241962862717571102"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
