// stop.js - Module for my "stop" command.
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
	name: 'stop',
	description: '__**Stop Usage:**__ !stop',
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
			const msgString = `------\n**Therer is already no music playing as I am not in any voice channels!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Stopping Issue:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
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

		const vchannel = commandData.guild?.client.channels.resolve(guildData.playlist.voiceChannel!.id) as Discord.VoiceChannel;
		vchannel.leave();
		if ((guildData.playlist.loopAll === true || guildData.playlist.loopSong === true) && guildData.playlist.currentSong.id !== '') {
			guildData.playlist.songs.unshift(guildData.playlist.currentSong);
		}
		guildData.playlist.playNext = true;
		guildData.playlist.textChannel = null;
		guildData.playlist.voiceChannel = null;
		guildData.playlist.currentSong = {addedBy: '', url:'', thumbnailURL: '', id: '', name: ''};
		await guildData.writeToDataBase();

		const msgEmbed = new Discord.MessageEmbed();

		msgEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number])
			.setTimestamp(Date.now())
			.setTitle('__**Stopped Playback:**__')
			.setDescription(`\n------\n__**Songs Remaining In Queue:**__ ${guildData.playlist.songs.length}\n------`);
		await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);

	   return commandReturnData;
   } catch (error) {
	   return new Promise((resolve, reject) => {
		   reject(error);
	   });
   }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
