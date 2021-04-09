// setmusicchannel.ts - Module for my "set music channel" command.
// Mar 14, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'setmusicchannel',
	description: '__**Set Music Channel Usage**__ !setmusicchannel = ADD or !setmusicchannel = REMOVE in the channel you would like to add/remove.'
	+ ' Also !setmusicchannel = PURGE to remove all channels, or just !setmusicchannel to view the currently enabled channels!',
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

		const doWeHaveAdminPermission = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPermission === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
		await guildData.getFromDataBase();

		if (commandData.args[0] === undefined) {
			let msgString = '__You have the following channels enabled for controlling music, on this server:__\n------\n';

			for (let x = 0; x < guildData.musicChannelIDs!.length; x += 1) {
				const currentID = guildData.musicChannelIDs![x];

				msgString += `__**Channel #${x}:**__ <#${currentID}>\n`;
			}

			msgString += '------\n';

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Music Channels Enabled:**__')
				.setDescription(msgString);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove' && commandData.args[0].toLowerCase() !== 'purge' && commandData.args[0].toLowerCase() !== 'view') {
			const msgString = `------\n**Please enter either 'add', 'remove', or 'purge' only! (!setmusicchannel = ADDorREMOVEorPURGE)**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Missing Or Invalid Arguments:**__');
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() === 'add') {
			const newGameChannel = commandData.fromTextChannel;

			if (newGameChannel == null) {
				const msgString = `------\n**Sorry, but that channel could not be found!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
                	.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                	.setColor(guildData.borderColor as [number, number, number])
                	.setDescription(msgString)
                	.setTimestamp(Date() as unknown as Date)
                	.setTitle('__**Channel Issue:**__');
            	await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				return commandReturnData;
			}

			const channelID = commandData.fromTextChannel?.id;
			for (let x = 0; x < guildData.musicChannelIDs!.length; x += 1) {
				if (channelID === guildData.musicChannelIDs![x]) {
					const msgString = `------\n**That channel is already on the list of enabled channels!**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
                		.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                		.setColor(guildData.borderColor as [number, number, number])
                		.setDescription(msgString)
                		.setTimestamp(Date() as unknown as Date)
                		.setTitle('__**Already Enabled:**__');
            		await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					return commandReturnData;
				}
			}

			guildData.musicChannelIDs!.push(channelID!);
			await guildData.writeToDataBase();

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Music Channel Added:**__')
				.setDescription(`**You've succesfully added <#${channelID}> to your list of accepted music channels!**`);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() === 'remove') {
			let channelID = '';
			channelID = commandData.fromTextChannel!.id;

			let msgString = '';
			let isItPresent = false;
			for (let x = 0; x < guildData.musicChannelIDs!.length; x += 1) {
				if (channelID === guildData.musicChannelIDs![x]) {
					isItPresent = true;
					guildData.musicChannelIDs!.splice(x, 1);
					await guildData.writeToDataBase();
					msgString += `You've succesfully removed the channel <#${channelID}> from the list of enabled music channels!`;
				}
			}

			if (isItPresent === false) {
				const msgString = `------\n**That channel is not present on the list of enabled music channels!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
                	.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                	.setColor(guildData.borderColor as [number, number, number])
                	.setDescription(msgString)
                	.setTimestamp(Date() as unknown as Date)
	                .setTitle('__**Channel Issue:**__');
            	await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				return commandReturnData;
			}

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Music Channel Removed:**__')
				.setDescription(msgString);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() === 'purge') {
			let msgString = '';

			if (guildData.musicChannelIDs!.length > 0) {
				msgString = "__You've removed the following channels from your list of enabled music channels:__\n------\n";

				for (let x = 0; x < guildData.musicChannelIDs!.length; x += 1) {
					const currentID = guildData.musicChannelIDs![x];

					msgString += `__**Channel #${x}:**__ <#${currentID}>\n`;
				}

				msgString += '------\n__**The music commands will now work in ANY CHANNEL!**__';

				guildData.musicChannelIDs! = [];
				await guildData.writeToDataBase();
			} else {
				msgString += '**Sorry, but there are no channels to remove!**';
			}

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Music Channels Removed:**__')
				.setDescription(msgString);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
		}
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
