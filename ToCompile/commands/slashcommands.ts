// slashcommands.ts - Module for declaring my slash commands.
// Mar 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordInteractions from 'slash-commands';
import SlashCommands = require('slash-commands');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'slashcommands',
    description: '!slashcommands',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try{
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
        
        const interaction = new DiscordInteractions({applicationId: discordUser.userData.userID,
            publicKey: discordUser.userData.publicKey,
            authToken: discordUser.userData.botToken})

        const commands = await interaction.getApplicationCommands();
        for (let x = 0; x < commands.length; x += 1) {
            //const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
            //console.log(newInteraction);
        }
/*
        const botinfo = {
            "name": "botinfo",
            "description": "Displays info about the current bot.",
            "options":[]
        }

        // Create Global Command
        await interaction.createApplicationCommand(botinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const clear = {
            "name": "clear",
            "description": "Clears the current playlist/queue"
        }

        await interaction.createApplicationCommand(clear).then((value: SlashCommands.ApplicationCommand) => console.log(value)).catch((error: Error) => console.log(error.message));

        const deletedbentry = {
            "name": "deletedbentry",
            "description": "Used to delete database entries, based on their key.",
            "options":[{
                "name": "entrykey",
                "description": "The database key to prune from the database.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": true,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(deletedbentry).then((value: SlashCommands.ApplicationCommand) => console.log(value)).catch((error: Error) => console.log(error.message));

        const displayguildsdata = {
            "name": "displayguildsdata",
            "description": "Display info about the servers that the bot is in.",
            "options":[]                        
        }

        // Create Global Command
        await interaction.createApplicationCommand(displayguildsdata).then(error => console.log(error)).catch(error => console.log(error.message));

        const djrole = {
            "name": "djrole",
            "description": "Adds, creates, removes, or displays the current DJ role, which controls who can use the music bot.",
            "options":[
                {
                    "name": "add",
                    "description": "Adds an already existant role as the DJ role.",
                    "type" : SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "options":[
                        {
                            "name": "role",
                            "description": "Which role to add as the DJ controller.",
                            "required": true,
                            "type": SlashCommands.ApplicationCommandOptionType.ROLE,
                        }
                    ]
                },
                {
                    "name": "remove",
                    "description": "Removes the DJ role as a music bot controller.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                },
                {
                    "name": "display",
                    "description": "Display the current DJ role.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "create",
                    "description": "Creates a role to be used for controlling the music bot.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "options": [
                        {
                            "name": "name",
                            "description": "The name of the DJ role to be created.",
                            "type": SlashCommands.ApplicationCommandOptionType.STRING,
                            "required": true
                        },
                        {
                            "name": "colorhexvalue",
                            "description": "The hex-style color value to be used. Defaults if not set.",
                            "type": SlashCommands.ApplicationCommandOptionType.STRING,
                            "required": false
                        }
                    ]
                }
                ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(djrole).then((value: SlashCommands.ApplicationCommand) => console.log(value)).catch((error: Error) => console.log(error.message));

        const editplaylist = {
            "name": "editplaylist",
            "description": "Edit the current playlist/queue of songs."
        }

        // Create Global Command
        await interaction.createApplicationCommand(editplaylist).then((value: SlashCommands.ApplicationCommand) => console.log(value)).catch((error: Error) => console.log(error.message));

        const help = {
            "name": "help",
            "description": "Displays help about the bot's various commands.",
            "options":[{
                  
                    "name": "group1",
                    "description": "The first group of commands.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "required": false,
                    "options":[{
                        "name": "commandname",
                        "description": " The name of the command, from group 1.",
                        "type": SlashCommands.ApplicationCommandOptionType.STRING,
                        "required": false,
                        "choices": [{
                                        "name":"clear",
                                        "value":"clear"
                                    },
                                    {
                                        "name": "deletedbentry",
                                        "value": "deletedbentry"
                                    },
                                    {
                                        "name":"djrole",
                                        "value": "djrole"
                                    },
                                    {
                                        "name":"editplaylist",
                                        "value":"editplaylist"
                                    },
                                    {
                                        "name":"help",
                                        "value":"help"
                                    },
                                    {
                                        "name":"listdbguilds",
                                        "value":"listdbguilds"
                                    },
                                    {
                                        "name":"loop",
                                        "value":"loop"
                                    },
                                    {
                                        "name":"loopsong",
                                        "value":"loopsong"
                                    },
                                    {
                                        "name":"musichouseoptions",
                                        "value":"musichouseoptions"
                                    },
                                    {
                                        "name":"play",
                                        "value":"play"
                                    }
                            ]
                        }]
                },
                {  
                    "name": "group2",
                    "description": "The second group of commands.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "required": false,
                    "options":[{
                        "name": "commandname",
                        "description": " The name of the command, from group 2.",
                        "type": SlashCommands.ApplicationCommandOptionType.STRING,
                        "required": false,
                        "choices": [{
                                        "name":"playrn",
                                        "value":"playrn"
                                    },
                                    {
                                        "name":"setmusicchannel",
                                        "value":"setmusicchannel"
                                    },
                                    {
                                        "name":"shuffle",
                                        "value":"shuffle"
                                    },
                                    {
                                        "name":"skip",
                                        "value":"skip"
                                    },
                                    {
                                        "name":"slashcommands",
                                        "value":"slashcommands"
                                    },
                                    {
                                        "name":"stop",
                                        "value":"stop"
                                    },
                                    {
                                        "name":"test",
                                        "value":"test"
                                    }
                            ]
                        }]
                    }
            ]
        }
        
        // Create Global Command
        await interaction.createApplicationCommand(help).then(value => console.log(value)).catch(error => console.log(error.message));
        
        const listdbguilds = {
            "name": "listdbguilds",
            "description": "Lists all of the database server entries for which the bot is no longer a member.",
        }

        // Create Global Command
        await interaction.createApplicationCommand(listdbguilds).then(value => console.log(value)).catch(error => console.log(error.message));
    
        const loop = {
            "name": "loop",
            "description": "Toggles the looping of the entire playlist/queue on or off.",
            "options": [{
                "name": "status",
                "description": "Enables or disables the looping of the playlist/queue.",
                "type": SlashCommands.ApplicationCommandOptionType.BOOLEAN,
                "required": true
            }]
        }

        // Create Global Command.
        await interaction.createApplicationCommand(loop).then(value => console.log(value)).catch(error => console.log(error.message));

        const loopsong = {
            "name": "loopsong",
            "description": "Toggles the looping of the current song on or off.",
            "options": [{
                "name": "status",
                "description": "Enables or disables the looping of the current song.",
                "type": SlashCommands.ApplicationCommandOptionType.BOOLEAN,
                "required": true
            }]
        }

        // Create Global Command.
        await interaction.createApplicationCommand(loopsong).then(value => console.log(value)).catch(error => console.log(error.message));

        const musichouseoptions = {
            "name": "musichouseoptions",
            "description": "Displays a list of options for this bot, and the commands associated with them."
        }

        // Create Global Command.
        await interaction.createApplicationCommand(musichouseoptions).then(value => console.log(value)).catch(error => console.log(error.message));

        const play = {
            "name": "play",
            "description": "Play a song, or add one to the playlist/queue.",
            "options": [{
                "name": "name",
                "description": "The name of the song or the YouTube URL to play.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": false
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(play).then(value => console.log(value)).catch(error => console.log(error.message));

        const playrn = {
            "name": "playrn",
            "description": "Play a song, or add one to the playlist/queue, but withou searching YouTube first.",
            "options": [{
                "name": "name",
                "description": "The name of the song or the YouTube URL to play.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": false
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(playrn).then(value => console.log(value)).catch(error => console.log(error.message));

        const setbordercolor = {
            "name":"setbordercolor",
            "description": "Sets the default border color for chat messages sent out by this bot.",
            "options":[
                {
                    "name":"redchannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name":"greenchannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name":"bluechannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setbordercolor).then(value => console.log(value)).catch(error => console.log(error.message));

        const setmusicchannel = {
            "name": "setmusicchannel",
            "description": "Adds or removes a channel to the list of allowed music-bot-controlling channels.",
            "options":[
                {
                    "name": "add",
                    "description": "Adds the current channel to the list of allowed music-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "remove",
                    "description": "Removes the current channel from the list of allowed music-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "display",
                    "description": "Displays the current list of allowed music-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "purge",
                    "description": "Purges the current list of allowed music-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                }
        ]}

        // Create Global Command
        await interaction.createApplicationCommand(setmusicchannel).then(value => console.log(value)).catch(error => console.log(error.message));

        const shuffle = {
            "name": "shuffle",
            "description": "Shuffles the current playlist/queue."
        }

        // Create Global Command
        await interaction.createApplicationCommand(shuffle).then(value => console.log(value)).catch(error => console.log(error.message));

        const skip = {
            "name": "skip",
            "description": "Skips the currently playing song, to play the next one in the current playlist/queue."
        }

        // Create Global Command
        await interaction.createApplicationCommand(skip).then(value => console.log(value)).catch(error => console.log(error.message));

        const slashcommands = {
            "name": "slashcommands",
            "description": "Declares the slash commands to the Discord servers!",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(slashcommands).then(value => console.log(value)).catch(error => console.log(error.message));

        const stop =  {
            "name": "stop",
            "description": "Causes the bot to stop playing music, save the playlist and leave the channel."
        }

        // Create Global Command
        await interaction.createApplicationCommand(stop).then(value => console.log(value)).catch(error => console.log(error.message));

        const test = {
            "name": "test",
            "description": "Testing module, for experimentation!",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(test).then(value => console.log(value)).catch(error => console.log(error.message));
*/
        const globalCommands = await interaction.getApplicationCommands();

        let msgString = `------\n**Yes, IT'S COMPLETED! You have ${globalCommands.length} commands registered!**\n------\n`;
        let msgEmbeds: Discord.MessageEmbed[] = [];
        for (let x = 0; x < globalCommands.length; x += 1) {
            msgString += `__**Name**__: ${globalCommands[x]?.name} __**Description**__: ${globalCommands[x]?.description}\n`;
            if (msgString.length >= 1900 || x === globalCommands.length - 1) {
                let msgEmbed = new Discord.MessageEmbed();
                if (commandData.guildMember instanceof Discord.User) {
                    msgEmbed
                        .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                        .setColor([254, 254, 254])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Registered Commands:**__');
                }
                else {
                    msgEmbed
                        .setAuthor((commandData.guildMember as Discord.GuildMember)!.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor([254, 254, 254])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Registered Commands:**__');
                }
                
                msgString += `------`;
                let currentMsgEmbed = msgEmbed;
                currentMsgEmbed.setDescription(msgString);
                msgEmbeds.push(currentMsgEmbed);
                msgString = `------\n**Yes, IT'S COMPLETED! You have ${globalCommands.length} commands registered!**\n------\n`;
            }
        }
        for (let x = 0; x < msgEmbeds.length; x += 1) {
            msgEmbeds[x]?.setTitle(`__**Registered Commands, (${(x + 1).toString()} of ${msgEmbeds.length}): **__`);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbeds[x]!);
        }

        return commandReturnData;
    }
    catch(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
