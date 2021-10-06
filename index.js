var Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const { readdirSync } = require('fs');
const { join } = require('path')

const prefix = "!";
const token = "YOUR TOKEN HERE";

client.on('ready', () => {
    client.user.setActivity("Made by August#6458 || displayminjadine on yt");
    console.log("Bot is ready")
    });


client.commands = new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));//gets file name
  client.commands.set(command.name, command);
}
client.on("error", console.error);
client.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.on("message", message => {
const db = require('quick.db');
if (message.author.bot || !message.guild) return;
if (db.get(`automod.${message.guild.id}.antilink`) == 'yes') {
  const links = "discord.gg/"
const link = /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
if (message.content.includes(links)) {
  message.delete().catch(() => {})
  message.channel.send("No invite links are allowed in this server!")
}
if (link.test(message.content)) {
message.delete().catch(() => {});
message.channel.send("<@"+message.author.id+">, no links are allowed in this server!")
}
}
if (db.get(`automod.${message.guild.id}.antiswear`) == 'yes') {
const swearwords = ['swearword1','swearword2','swearword3','swearword4' , 'swearword5'];
if (swearwords.some(str => message.content.includes(str))) {
message.delete().catch(() => {});
message.channel.send('<@'+message.author.id+'>, no swearing is allowed in this server!')
}
}
});


client.login(token)
