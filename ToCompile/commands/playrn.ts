// playrn.ts - Module for my "play rn" command.
// Mar 11, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import ytdl = require('ytdl-core-discord');
import ytsr = require('ytsr');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'playrn',
	description: '__**Play Right Now Usage:**__ !playrn = SONGNAMETOSEARCH',
	function: Function()
};

/**
 * Plays the list of songs!
 */
async function playSongs(guildData: GuildData, commandData: FoundationClasses.CommandData, connection: Discord.VoiceConnection, discordUser: DiscordUser): Promise<void> {
	try {
		let guildDataNew = guildData;
		if (guildDataNew.playlist.songs.length === 0 && guildDataNew.playlist.currentSong.url === '') {
			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Empty Playlist:**__')
				.setDescription('------\n**Sorry, but there are no songs left in the playlist/queue!**\n------');
			const vchannel = commandData.guild?.client.channels.resolve(guildDataNew.playlist.voiceChannel!.id) as Discord.VoiceChannel;
			vchannel.leave();
			guildDataNew.playlist.textChannel = null;
			guildDataNew.playlist.voiceChannel = null;
			guildDataNew.playlist.playNext = true;
			guildDataNew.playlist.currentSong = {name: '', addedBy: '', url: '', thumbnailURL: '', id: ''};
			await guildDataNew.writeToDataBase();
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			return;
		}

		let dispatcher;
		if (guildDataNew.playlist.playNext === true) {
			let song: FoundationClasses.YouTubeSong;
			let footerString = '';
			if (guildDataNew.playlist.loopSong === true) {
				let songOne;
				if (guildDataNew.playlist.currentSong.url === ''){
					songOne = guildDataNew.playlist.songs.shift()!;
				}
				else {
					songOne = guildDataNew.playlist.currentSong;
				}
				song = songOne;
				footerString = 'Looping of the current song is enabled!';
			} else if (guildDataNew.playlist.loopAll === true) {
				let songOne;
				if (guildDataNew.playlist.songs.length === 0 && guildDataNew.playlist.currentSong.url !== ''){
					songOne = guildDataNew.playlist.currentSong;
				}
				else if (guildDataNew.playlist.currentSong.url === ''){
					songOne = guildDataNew.playlist.songs.shift();
				}
				else if (guildDataNew.playlist.songs.length > 0){
					songOne = guildDataNew.playlist.songs.shift();
				}
				song = songOne as FoundationClasses.YouTubeSong;
				footerString = 'Looping of the current playlist is enabled!';
			} else {
				song = guildDataNew.playlist.songs.shift()!;
			}
			guildDataNew.playlist.currentSong = song;
			dispatcher = connection.play(await ytdl(song.url), { type: 'opus' });

			dispatcher.on('start', async () => {
				const msgEmbed = new Discord.MessageEmbed();
				msgEmbed
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Now Playing:**__')
					.setFooter(footerString)
					.setDescription(`__**Title:**__ [${song.name}](${song.url})\n__**Added By:**__ <@!${song.addedBy}>\n__**Songs Remaining In Queue:**__ ${guildDataNew.playlist.songs.length}`)
					.setImage(song.thumbnailURL);
				await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				guildDataNew.playlist.playNext = false;
				await guildDataNew.writeToDataBase();
			})
				.on('finish', async () => {
					guildDataNew = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
		            await guildDataNew.getFromDataBase();
					guildDataNew.playlist.playNext = true;
					if (guildDataNew.playlist.loopAll === true && guildDataNew.playlist.loopSong === false){
                        guildDataNew.playlist.songs.push(guildDataNew.playlist.currentSong);
                    }
					await guildDataNew.writeToDataBase();
					playSongs(guildDataNew, commandData, connection, discordUser);
				})
				.on('error', async (error) => {
					console.log(error);
					const msgString = `------\n**${error}**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
				        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				        .setColor(guildData.borderColor as [number, number, number])
				        .setDescription(msgString)
				        .setTimestamp(Date() as unknown as Date)
				        .setTitle('__**Playback Error:**__')
			        await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				});

			dispatcher.setVolumeLogarithmic(guildDataNew.playlist.volume / 5);
			guildDataNew.playlist.playNext = false;
			await guildDataNew.writeToDataBase();
		}

		guildDataNew.playlist.playNext = false;
		await guildDataNew.writeToDataBase();

		return;
	} catch (error) {
		console.log(error);
		const msgString = `------\n**Sorry, there was an error trying to play that!**\n------`;
		let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Playback Issue:**__');
		let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		if (commandData.toTextChannel instanceof Discord.WebhookClient){
			msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
		}
		await msg.delete({timeout: 20000});
	}
}

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		commandReturnData.commandName = command.name;
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		const checkIfAllowedInChannel = await HelperFunctions.checkIfAllowedInChannel(commandData, discordUser);

		if (!checkIfAllowedInChannel) {
			return commandReturnData;
		}

		let guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
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
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        if (guildData.playlist.voiceChannel === null){
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
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
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
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message((commandData.guild as Discord.Guild).client, msg, commandData.fromTextChannel as Discord.TextChannel);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

		const guildMember = await commandData.guild?.members.fetch(commandData.guild.client.user!.id);
		guildMember?.voice.setSelfDeaf(true);

		if (commandData.args[0] !== undefined && commandData.args[0] !== '') {
			const searchResults = await ytsr(commandData.args[0]);

			const finalSearchResultItems: ytsr.Video[] = [];
            for (let x = 0; x < searchResults.items.length; x += 1) {
                if (searchResults.items[x]!.type === 'video') {
                    finalSearchResultItems.push(searchResults.items[x] as ytsr.Video);
                } else {
                    continue;
                }
            }

			const newSong: FoundationClasses.YouTubeSong = {
				addedBy: (commandData.guildMember as Discord.GuildMember).user.id,
				name: finalSearchResultItems[0]!.title,
				thumbnailURL: finalSearchResultItems[0]!.bestThumbnail.url!,
				url: (await ytdl.getInfo(finalSearchResultItems[0]!.id)).videoDetails!.video_url,
				id: (finalSearchResultItems[0] as ytsr.Video).id
			};

			guildData.playlist.voiceChannel = voiceChannel;
			guildData.playlist.textChannel = commandData.fromTextChannel as Discord.TextChannel;
			guildData.playlist.songs.push(newSong);
			guildData.playlist.volume = 5;
			await guildData.writeToDataBase();

			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Song Added To Playlist:**__')
				.setThumbnail(newSong.thumbnailURL)
				.setDescription(`__**New Song Added:**__ [${newSong.name}](${newSong.url})\n__**Added By:**__ <@!${newSong.addedBy}>\n__**Position In Queue:**__ ${guildData.playlist.songs.length}`);

			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);

			const connection = await voiceChannel.join();

			playSongs(guildData, commandData, connection, discordUser);
			await guildData.writeToDataBase();
		} else if (commandData.args[0] === undefined || commandData.args[0] === '') {
			const connection = await voiceChannel.join();
			
			if (connection.dispatcher !== null){
                const msgString = "------\n__**We're already playing music!**__\n------";
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor(guildData.borderColor as [number, number, number])
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Already Playing:**__')
                    .setDescription(msgString);
				let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient){
					newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
				}
				await newMessage.delete({timeout: 20000});
            }
			guildData.playlist.textChannel = commandData.fromTextChannel as Discord.TextChannel;
			guildData.playlist.voiceChannel = voiceChannel;
			guildData.playlist.volume = 5;
			await guildData.writeToDataBase();

			playSongs(guildData, commandData, connection, discordUser);
			await guildData.writeToDataBase();
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
