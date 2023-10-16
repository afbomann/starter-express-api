//API VARIABLES
const express = require('express')
const app = express()
const PORT = 8080

//DISCORD VARIABLES
const { Client, Events, GatewayIntentBits, IntentsBitField, EmbedBuilder } = require('discord.js');
const { token, prefix } = require('./config.json');
const { json } = require('express/lib/response');

const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
    ]
});

//API
app.use(express.json())

app.listen(PORT, () => console.log(`API running! | http://localhost:${PORT}`))

app.post('/verify', (req, res) => {
    const { UserId } = req.body;

    if (userId) {
        verifiedUsers.add(userId);
        console.log(`User with ID ${userId} has been verified.`);
        res.status(200).send({ message: 'Verification successful' });
      } else {
        res.status(400).send({ message: 'Invalid request' });
      }
}) 

//DISCORD BOT
client.once(Events.ClientReady, c => {
	console.log(`Discord bot running! | Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
    if(message.content.startsWith(`${prefix}`)) {
        const SplitMessage = message.content.split(' ');

        if(message.content === `${prefix}cmds` || message.content === `${prefix}commands`) {
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Rank System Commands')
            .setAuthor({ name: 'Made by Logisteaf',  url: 'https://discord.com/invite/Mb39vnkzkJ' })
            .addFields(
                { name: 'Commands:', value: `${prefix}link username/userid - Links your roblox account\n${prefix}unlink - Unlinks your roblox account\n${prefix}setup - Sets up the bot\n${prefix}rank username/userid number - Ranks a player`, },
                { name: 'Examples:', value: `${prefix}link logisteaf\n${prefix}unlink\n${prefix}setup\n${prefix}rank logisteaf 6`, }
            )
            .setFooter({ text: 'Logisteaf’s Services'});
        
        message.channel.send({ embeds: [exampleEmbed] });
            }

            if(SplitMessage[0] === `${prefix}link`) {
                const UsernameOrUserId = SplitMessage[1]

                if(!UsernameOrUserId) {
                    message.reply('Please provide a username or userid!')
                } else {
                const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Linking Roblox Account: ${UsernameOrUserId} . . .`)
            .addFields(
                { name: 'Steps:', value: `Step 1: Join any game with this rank system installed\nStep 2: Type ${prefix}verify in the chat`, }
            )
            .setFooter({ text: 'Logisteaf’s Services'});
        
        message.channel.send({ embeds: [exampleEmbed] });
            }      
        }
        if(message.content === `${prefix}setup`) {
            const serverid = message.guild.id
            
            console.log(serverid)
    
            fetch(`http://localhost:8080/createserver/${serverid}`)
        }
}  
})

client.login(token);
