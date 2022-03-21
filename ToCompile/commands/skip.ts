// skip.ts - Module for my "skip" command.
// Mar 11, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'skip',
    description: '__**Skip Usage:**__ !skip, to skip the current song in the queue!',
    function: Function()
};

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
		const connection = await voiceChannel.join();

		if (connection.dispatcher === null) {
			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed.
				setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Skip Song Failure:**__')
				.setDescription('------\n**There needs to be music playing for you to be able to skip!**\n------');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}
		
		connection.dispatcher.end();

		const msgString = `------\n**We're skipping to the next song!**\n------`;
		let msgEmbed = new Discord.MessageEmbed()
			.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number])
			.setDescription(msgString)
			.setTimestamp(Date() as unknown as Date)
			.setTitle('__**Song Skipping:**__');
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
		}
		await newMessage.delete({timeout: 5000});
		
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
