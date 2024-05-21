const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generating Short ID for" + url,
    });
  }
  message.reply({
    content: `Hi ${message.author.globalName}, welcome to Souvik Das's Server. Bot this side!`,
  });
});

client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!");
});

client.login(
  "MTI0MTk2Mjg2MjcxNzU3MTEwMg.GIK8pz.7u8kwUppmY4Ikm0YLZXLcWhhS5D3sLwcJdhzOI"
);
