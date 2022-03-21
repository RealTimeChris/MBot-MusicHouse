// editplaylist.ts - Module for my "edit playlist" command.
// Mar 11, 2021
// Chris M.
// https://ithub/com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'editplaylist',
    description: '__**Edit Playlist Usage:**__ !editplaylist, and then follow the directions!',
    function: Function()
};

async function updateMessageEmbed(guildData: GuildData, message: Discord.Message, newMessage: Discord.Message, currentPageIndex: number): Promise<Discord.MessageEmbed[]> {
    const msgEmbedFields: Discord.EmbedField[][] = [[], []];
    msgEmbedFields.splice(0, 1);
    let msgEmbedFieldsPage = 0;
    for (let y = 0; y < guildData.playlist.songs.length; y += 1) {
        if (y % 25 === 0 && y > 0) {
            msgEmbedFieldsPage += 1;
            msgEmbedFields.push([]);
        }
        const msgEmbedField = {
            name: `__**${y + 1} of ${guildData.playlist.songs.length}**__`,
            value: `__**Title**__ [${(guildData.playlist.songs[y]!).name}](${(guildData.playlist.songs[y]!).url})\n__**Added By:**__ <@!${
                (guildData.playlist.songs[y]!).addedBy}>`,
            inline: false,
        };
        msgEmbedFields[msgEmbedFieldsPage]!.push(msgEmbedField);
    }
    msgEmbedFieldsPage = 0;
    let newMsgEmbeds = [];
    for (let y = 0; y < msgEmbedFields.length; y += 1) {
        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed
            .setAuthor(message.author.username, message.author.avatarURL()!)
            .setColor(guildData.borderColor as [number, number, number])
            .setTimestamp(Date.now())
            .setTitle(`__**Playlist, Page ${y + 1} of ${msgEmbedFields.length}**__`)
            .setFooter('React with ✅ to edit the contents of the current page. React with ❌ to exit!')
            .setDescription('__**React with ✅ to edit the contents of the current page. React with ❌ to exit!**__').fields = msgEmbedFields[y]!;
        newMsgEmbeds.push(msgEmbed);
    }
    await newMessage.edit(newMsgEmbeds[currentPageIndex]!);
    return newMsgEmbeds;
}

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
        
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const checkIfAllowedInChannel = await HelperFunctions.checkIfAllowedInChannel(commandData, discordUser);

        if (checkIfAllowedInChannel === false) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

        if (!(commandData.fromTextChannel as Discord.TextChannel).permissionsFor(commandData.guild?.client.user as Discord.User)?.has('MANAGE_MESSAGES')) {
			const msgString = `------\n**I need the Manage Messages permission in this channel, for this command!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Permissions Issue:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
            return commandReturnData;
		}

        const doWeHaveControl = await HelperFunctions.checkIfWeHaveControl(commandData, guildData);

        if (!doWeHaveControl) {
            return commandReturnData;
        }

        const voiceChannel = (commandData.guildMember as Discord.GuildMember).voice.channel;

        if (!voiceChannel) {
            const msgString = `------\n**You need to be in a voice channel to issue music commands!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Voice Channel Issue:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        if (guildData.playlist.voiceChannel === null) {
            await voiceChannel.join();
            guildData.playlist.textChannel = commandData.fromTextChannel as Discord.TextChannel;
            guildData.playlist.voiceChannel = voiceChannel;
            await guildData.writeToDataBase();
            const permissions = voiceChannel.permissionsFor(commandData.guild!.client.user!);
            if (!permissions!.has('CONNECT') || !permissions!.has('SPEAK')) {
                const msgString = `------\n**I need the permissions to join and speak in your voice channel!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor(guildData.borderColor as [number, number, number])
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Permissions Issues:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }
        }
        else if (voiceChannel.id !== guildData.playlist.voiceChannel!.id) {
            const msgString = `------\n**You need to be in the correct voice channel to issue music commands!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Voice Channel Issue:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message((commandData.guild as Discord.Guild).client, msg, commandData.fromTextChannel as Discord.TextChannel);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        let currentPageIndex = 0;
        let newMessage: Discord.Message;
        newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, `<@!${commandData.guildMember?.id}>`);
        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
            newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
        }        

        if (guildData.playlist.songs.length === 0) {
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date.now())
                .setTitle('__**Empty Playlist:**__')
                .setDescription('------\n__**Sorry, but there is nothing here to display!**__\n------');
            await newMessage.edit(msgEmbed);
            return commandReturnData;
        }

        const msgEmbedFields: Discord.EmbedField[][] = [[], []];
        msgEmbedFields.splice(0, 1);
        let msgEmbedFieldsPage = 0;
        for (let y = 0; y < guildData.playlist.songs.length; y += 1) {
            if (y % 25 === 0 && y > 0) {
                msgEmbedFieldsPage += 1;
                msgEmbedFields.push([]);
            }
            const msgEmbedField = {
                name: `__**${y + 1} of ${guildData.playlist.songs.length}**__`,
                value: `__**Title**__ [${guildData.playlist.songs[y]!.name}](${guildData.playlist.songs[y]!.url})\n__**Added By:**__ <@!${
                    guildData.playlist.songs[y]!.addedBy}>`,
                inline: false,
            };
            msgEmbedFields[msgEmbedFieldsPage]!.push(msgEmbedField);
        }
        let msgEmbeds: Discord.MessageEmbed[] = [];
        msgEmbedFieldsPage = 0;
        for (let y = 0; y < msgEmbedFields.length; y += 1) {
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date.now())
                .setTitle(`__**Playlist, Page ${y + 1} of ${msgEmbedFields.length}**__`)
                .setFooter('React with ✅ to edit the contents of the current page. React with ❌ to exit!')
                .setDescription('__**React with ✅ to edit the contents of the current page. React with ❌ to exit!**__').fields = msgEmbedFields[y]!;
            msgEmbeds.push(msgEmbed);
        }
        newMessage.edit(msgEmbeds[currentPageIndex]!);
        const userID = commandData.guildMember?.id;
        newMessage.react('✅');
        newMessage.react('◀️');
        newMessage.react('▶️');
        newMessage.react('❌');
        const filter = (reaction: Discord.MessageReaction, user: Discord.User) => (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌'
            || reaction.emoji.name === '✅') && user.id === commandData.guildMember!.id;
        const reactionCollector = newMessage.createReactionCollector(filter, { time: 120000 });
        reactionCollector.on('collect', async (reaction) => {
            reactionCollector.resetTimer({ time: 120000 });
            if (reaction.emoji.name === '❌') {
                reactionCollector.stop('User exited.');
            } else if (reaction.emoji.name === '▶️' && (currentPageIndex === (msgEmbeds.length - 1))) {
                reaction.users.remove(userID);
                currentPageIndex = 0;
                const messageEmbed = msgEmbeds[currentPageIndex];
                await newMessage.edit(messageEmbed!);
            } else if (reaction.emoji.name === '▶️' && (currentPageIndex < msgEmbeds.length)) {
                reaction.users.remove(userID);
                currentPageIndex += 1;
                const messageEmbed = msgEmbeds[currentPageIndex];
                await newMessage.edit(messageEmbed!);
            } else if (reaction.emoji.name === '◀️' && (currentPageIndex > 0)) {
                reaction.users.remove(userID);
                currentPageIndex -= 1;
                const messageEmbed = msgEmbeds[currentPageIndex];
                await newMessage.edit(messageEmbed!);
            } else if (reaction.emoji.name === '◀️' && (currentPageIndex === 0)) {
                reaction.users.remove(userID);
                currentPageIndex = msgEmbeds.length - 1;
                const messageEmbed = msgEmbeds[currentPageIndex];
                await newMessage.edit(messageEmbed!);
            }
            else if (reaction.emoji.name === '✅') {
                await reaction!.users.remove(userID);
                for (let x = 0; x < msgEmbeds.length; x += 1) {
                    msgEmbeds[x]!.description = "__Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber> <destinationTrackNumber>'"+
                        "to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.__\n";
                    msgEmbeds[x]!.setFooter("Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber> <destinationTrackNumber>' to swap"+
                        " tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                }
                const messageFilter = (filteredMessage: Discord.Message) => filteredMessage.member!.id === userID;
                await newMessage.edit(msgEmbeds[currentPageIndex]!);
                for (let y = 0; y < 1; y) {
                    const messageCollection = await newMessage.channel.awaitMessages(messageFilter, { max: 1, time: 120000 });

                    if (messageCollection.first() === undefined) {
                        msgEmbeds.splice(currentPageIndex, 1);
                        msgEmbeds = await updateMessageEmbed(guildData, newMessage, newMessage, currentPageIndex);
                        break;
                    }
                    const args2 = messageCollection.first()!.content.split(/ +/, 3);

                    if (args2[0]!.toLowerCase() !== 'remove' && args2[0]!.toLowerCase() !== 'swap' && args2[0]!.toLowerCase() !== 'exit'
                        && args2[0]!.toLowerCase() !== 'shuffle') {
                        for (let x = 0; x < msgEmbeds.length; x += 1) {
                            msgEmbeds[x]!.description = "__**PLEASE ENTER A PROPER INPUT!**__\n__Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>"+
                                " <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist."
                            + '\nType exit to exit.__\n';
                            msgEmbeds[x]!.setFooter("PLEASE ENTER A PROPER INPUT!\nType 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber> "+
                                "<destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                        }
                        await newMessage.edit(msgEmbeds[currentPageIndex]!);
                        await messageCollection.first()!.delete();
                        continue;
                    } else if (args2[0]!.toLowerCase() === 'remove') {
                        if ((parseInt(args2[1]!, 10) - 1) < 0 || (parseInt(args2[1]!, 10) - 1)
                                >= guildData.playlist.songs.length || args2[1]! === undefined) {
                            for (let x = 0; x < msgEmbeds.length; x += 1) {
                                msgEmbeds[x]!.description = "__**PLEASE ENTER A PROPER INPUT!**__\n__Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>"+
                                    " <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist."
                                + '\nType exit to exit.__\n';
                                msgEmbeds[x]!.setFooter("PLEASE ENTER A PROPER INPUT!\nType 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>"+
                                    "<destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                            }
                            await newMessage.edit(msgEmbeds[currentPageIndex]!);
                            await messageCollection.first()!.delete();
                            continue;
                        }
                        const removeIndex = parseInt(args2[1], 10) - 1;

                        guildData.playlist.songs.splice(removeIndex, 1);
                        await guildData.writeToDataBase();
                        await messageCollection.first()!.delete();
                        msgEmbeds.splice(currentPageIndex, 1);
                        msgEmbeds = await updateMessageEmbed(guildData, newMessage, newMessage, currentPageIndex);
                        break;
                    } else if (args2[0]!.toLowerCase() === 'exit') {
                        await messageCollection.first()!.delete();
                        msgEmbeds.splice(currentPageIndex, 1);
                        msgEmbeds = await updateMessageEmbed(guildData, newMessage, newMessage, currentPageIndex);
                        break;
                    } else if (args2[0]!.toLowerCase() === 'swap') {
                        if ((parseInt(args2[1]!, 10) - 1) < 0 || (parseInt(args2[1]!, 10) - 1)
                                >= guildData.playlist.songs.length || (parseInt(args2[2]!, 10) - 1)
                                < 0 || (parseInt(args2[2]!, 10) - 1) >= guildData.playlist.songs.length
                                || args2[1]! === undefined || args2[2]! === undefined) {
                            for (let x = 0; x < msgEmbeds.length; x += 1) {
                                msgEmbeds[x]!.description = "__**PLEASE ENTER A PROPER INPUT!**__\n__Type 'remove <trackNumber>' to remove a track.\nType 'swap"+
                                    " <sourceTrackNumber> <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist."
                                + '\nType exit to exit.__\n';
                                msgEmbeds[x]!.setFooter("PLEASE ENTER A PROPER INPUT!\nType 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>"
                                    +" <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                            }
                            await newMessage.edit(msgEmbeds[currentPageIndex]!);
                            await messageCollection.first()!.delete();
                            continue;
                        }

                        const sourceIndex = parseInt(args2[1]!, 10) - 1;
                        const destinationIndex = parseInt(args2[2]!, 10) - 1;
                        const tempSong = guildData.playlist.songs[sourceIndex];
                        guildData.playlist.songs[sourceIndex] = guildData.playlist.songs[destinationIndex]!;
                        guildData.playlist.songs[destinationIndex] = tempSong!;
                        await guildData.writeToDataBase();
                        await messageCollection.first()!.delete();
                        msgEmbeds.splice(currentPageIndex, 1);
                        msgEmbeds = await updateMessageEmbed(guildData, newMessage, newMessage, currentPageIndex);
                        break;
                    } else if (args2[0]!.toLowerCase() === 'shuffle') {
                        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
                        await guildData.getFromDataBase();
                        const newSongArray: FoundationClasses.YouTubeSong[] = [];
                        while (guildData.playlist.songs.length > 0) {
                            const randomIndex = Math.trunc(Math.random() * guildData.playlist.songs.length);
                            newSongArray.push(guildData.playlist.songs[randomIndex]!);
                            guildData.playlist.songs.splice(randomIndex, 1);
                        }
                        guildData.playlist.songs = newSongArray;
                        await guildData.writeToDataBase();
                        await messageCollection.first()!.delete();
                        msgEmbeds.splice(currentPageIndex, 1);
                        msgEmbeds = await updateMessageEmbed(guildData, newMessage, newMessage, currentPageIndex);
                        break;
                    }
                }
            }
        });
  
        reactionCollector.on('end', async () => {
            await newMessage.reactions.removeAll();
        });
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
