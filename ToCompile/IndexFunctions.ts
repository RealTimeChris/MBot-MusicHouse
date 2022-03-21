// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import EventEmitter from 'events';
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';
import botCommands from './CommandIndex';

module IndexFunctions{
    export async function onHeartBeat(client: Discord.Client, discordUser: DiscordUser){
        try{
            await discordUser.updateDataCacheAndSaveToFile(client);
        }
        catch(error){
            console.log(error);
        }
        
    }

    export async function onReady(client: Discord.Client, discordUser: DiscordUser, eventEmitter: EventEmitter) {
        try {
            await discordUser.initializeInstance(client);
            await (client.user as Discord.ClientUser).setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
            eventEmitter.emit('HeartBeat');

        } catch (error) {
            console.log(error);
        }
    }

    export async function onMessage(msg: Discord.Message, client: Discord.Client, discordUser: DiscordUser) {
        if (client.users.resolve(msg.author.id) === null) {
            console.log('Non-found user! Better escape!');
            return;
        }
        if (msg.author.id === client.user?.id) {
            console.log('Better not track our own messages!');
            return;
        }
        if (msg.content.startsWith(discordUser.userData.prefix)) {
            let command = '';
            let args: string[] = [];
            if (msg.content.indexOf(' =') === -1) {
                command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0]!.trim().toLowerCase();
            } else {
                command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                for (let x = 0; x < args.length; x += 1) {
                    args[x] = args[x]!.trim();
                }
            }
    
            if (!botCommands.has(command)) {
                return;
            }
            try{
                const commandData = new FoundationClasses.CommandData();
                if (msg.channel.type !== 'dm' && msg.member !== null) {
                    await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member?.id, msg.guild?.id);
                }
                else{
                    await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
                }
                commandData.args = args;
        
                if (msg.deletable) {
                    await msg.delete();
                }
        
                try {			
                    console.log(`Command: '${command}' entered by user: ${msg.author.username}`)
                    const cmdReturnData = await botCommands.get(command)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
                    console.log(`Completed Command: ${cmdReturnData.commandName}`);
                } catch (error) {
                    console.log(error);
                    msg.reply('There was an error trying to execute that command!');
                }
                return;
            }
            catch(error) {
                console.log(error);
            }
            
        } else if (msg.author.id !== client.user?.id) {
            try{
                const command = 'message';
    
                if (!botCommands.has(command)) {
                    return;
                }
                try {
                    console.log(`Standard message entered: ${msg.author.username}`);
                    const cmdName = await botCommands.get(command)?.function(msg);
                    console.log(`Completed Command: ${cmdName}`);
                    
                } catch (error) {
                    console.log(error);
                    msg.reply('There was an error trying to process that message!');
                }
                return;
            }
            catch(error) {
                console.log(error);
            }		
        }
    }

    export async function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser): Promise<void> {
        try{
            const {channel_id} = interaction;
            const channel = await client.channels.fetch(channel_id);
            let id_full, guild_id_full, options_full, name_full;
            const commandData = new FoundationClasses.CommandData();
            if (await channel.type === 'dm') {
                let {user:{id}, guild_id, data:{options, name}} = interaction;
                id_full = id;
                guild_id_full = guild_id;
                options_full = options;
                name_full = name;
                await commandData.initialize(client, channel_id, channel.type, interaction, id_full);
            }
            else {
                let {member:{user:{id}}, guild_id, data:{options, name}} = interaction;
                id_full = id;
                guild_id_full = guild_id;
                options_full = options;
                name_full = name;
                await commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full);
            }
            if (name_full === 'botinfo') {
                const name = 'musichouse';
                commandData.args[0] = name;
            }
            const nameSolid = name_full;
            if (name_full === 'clear') {
        
            }
            if (name_full === "deletedbentry") {
                const {value:value1} = options_full[0];
                commandData.args[0] = 'musichouse';
                commandData.args[1] = value1;
            }
            if (name_full === "displayguildsdata") {
                const name = 'musichouse';
                commandData.args[0] = name;
            }
            if (name_full === 'djrole') {
                name_full = options_full[0].name;
                if (name_full === 'remove') {
                    commandData.args[0] = 'remove';
                }
                else if (name_full === 'display') {
                    
                }
                else if (name_full === 'add') {
                    const roleID = options_full[0].options[0].value;
                    commandData.args[0] = 'add';
                    commandData.args[1] = roleID;
                }
                else if (name_full === 'create') {
                    const roleName = options_full[0].options[0].value;
                    let roleColor;
                    if (options_full[0].options[1] !== undefined) {
                        roleColor = options_full[0].options[1].value;
                    }
                    commandData.args[0] = 'create';
                    commandData.args[1] = roleName;
                    commandData.args[2] = roleColor;
                }
            }
            if (name_full === 'editplaylist') {
        
            }
            if (name_full === 'help') {
                if (options_full[0].options !==  undefined) {
                    const {value} = options_full[0].options[0];
                    commandData.args[0] = 'musichouse';
                    commandData.args[1] = value;
                }
            }
            if (name_full === 'listdbguilds') {
                commandData.args[0] = 'musichouse';
            }
            if (name_full === 'loop') {
                const areWeLooping = options_full[0].value;
                commandData.args[0] = areWeLooping;
            }
            if (name_full === 'loopsong') {
                const areWeLooping = options_full[0].value;
                commandData.args[0] = areWeLooping;
            }
            if (name_full === 'musichouseoptions') {
        
            }
            if (name_full == 'play') {
                if (options_full !== undefined) {
                    const songName = options_full[0].value;
                    commandData.args[0] = songName;
                }
            }
            if (name_full === 'playrn') {
                if (options_full !== undefined) {
                    const songName = options_full[0].value;
                    commandData.args[0] = songName;
                }
            }
            if (name_full === 'setbordercolor') {
                commandData.args[0] = 'musichouse';
                const redChannelValue = options_full[0].value;
                const greenChannelValue = options_full[1].value;
                const blueChannelValue = options_full[2].value;
                commandData.args[1] = redChannelValue.toString();
                commandData.args[2] = greenChannelValue.toString();
                commandData.args[3] = blueChannelValue.toString();
            }
            if (name_full === 'setmusicchannel') {
                name_full = options_full[0].name;
                if (name_full === 'add') {
                    commandData.args[0] = 'add';
                }
                else if (name_full === 'remove') {
                    commandData.args[0] = 'remove';
                }
                else if (name_full === 'display') {
        
                }
                else if (name_full === 'purge') {
                    commandData.args[0] = 'purge';
                }
            }
            if (name_full === 'shuffle') {
        
            }
            if (name_full === 'skip') {
        
            }
            if (name_full === 'slashcommands') {
        
            }
            if (name_full === 'stop') {
        
            }
            if (name_full === 'test') {
        
            }
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data:{
                    type: 5
                }
            });
            if (commandData.guildMember instanceof Discord.GuildMember) {
                console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.user.username}`);
            }
            else if (commandData.guildMember instanceof Discord.User) {
                console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.username}`);
            }	
            const returnData = await botCommands.get(nameSolid)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
        }
        catch(error) {
            console.log(error);
        }
    }

    export async function onVoiceStatusUpdate(newVoiceState: Discord.VoiceState, client: Discord.Client, discordUser: DiscordUser) {
        try {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: newVoiceState.guild!.id, name: newVoiceState.guild!.name, memberCount: newVoiceState.guild!.memberCount});
            await guildData.getFromDataBase();
            if (newVoiceState.member!.id === discordUser.userData.userID && newVoiceState.channelID === null && guildData.playlist.textChannel !== null) {
                const currentTextChannel = await client.channels.fetch(guildData.playlist.textChannel!.id) as Discord.TextChannel;
                const guildAuditLogs = await newVoiceState.guild.fetchAuditLogs({limit: 1, type: 'MEMBER_DISCONNECT'});
                let auditLogsEntry: Discord.GuildAuditLogsEntry;
                setTimeout(async () => {
                    auditLogsEntry = guildAuditLogs.entries.find((auditLogEntry: Discord.GuildAuditLogsEntry) =>
                    auditLogEntry.action === 'MEMBER_DISCONNECT' && Date.now() - auditLogEntry.createdTimestamp < 5000)!;
                    if (auditLogsEntry !== undefined) {
                        const msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setColor(guildData.borderColor  as [number, number, number])
                            .setDescription(`------\n__**I've been kicked from the voice channel! Saving playlist and stopping!**__\n__**Kicked By:**__ <@!${auditLogsEntry?.executor.id}> (${auditLogsEntry?.executor.tag})\n-----`)
                            .setTimestamp(Date.now())
                            .setTitle('__**Kicked From Channel:**__')
                            .setAuthor(client.user?.username, client.user?.avatarURL()!);
                        await currentTextChannel.send(msgEmbed);
                    }
                    if (guildData.playlist.loopAll === true || guildData.playlist.loopSong === true) {
                        guildData.playlist.songs.unshift(guildData.playlist.currentSong);
                    }
                    guildData.playlist.voiceChannel = null;
                    guildData.playlist.textChannel = null;
                    guildData.playlist.playNext = true;
                    guildData.playlist.currentSong = {name: '', id: '', url: '', thumbnailURL: '', addedBy: ''};
                    await guildData.writeToDataBase();
                }, 2000);
            }
    
            if (guildData.playlist.voiceChannel != null) {
                const currentVoiceChannel = await client.channels.fetch(guildData.playlist.voiceChannel!.id) as Discord.VoiceChannel;
                if (currentVoiceChannel.members.size === 1 && currentVoiceChannel.members.first()!.id === client.user?.id) {
                    const currentTextChannel = await client.channels.fetch(guildData.playlist.textChannel!.id) as Discord.TextChannel;
                    const msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setColor(guildData.borderColor as [number, number, number])
                        .setDescription('------\n__**Nobody left in the voice channel! Saving playlist and stopping!**__\n-----')
                        .setTimestamp(Date.now())
                        .setTitle('__**Empty Voice Channel:**__')
                        .setAuthor(client.user.username, client.user.avatarURL()!);
                    const newMsg = await currentTextChannel.send(msgEmbed);
                    currentVoiceChannel.leave();
                    if ((guildData.playlist.loopAll === true || guildData.playlist.loopSong === true) && guildData.playlist.currentSong.id !== '') {
                        guildData.playlist.songs.unshift(guildData.playlist.currentSong);
                    }
                    guildData.playlist.voiceChannel = null;
                    guildData.playlist.textChannel = null;
                    guildData.playlist.playNext = true;
                    guildData.playlist.currentSong = {name: '', id: '', url: '', thumbnailURL: '', addedBy: ''};
                    await guildData.writeToDataBase();
                    await newMsg.delete({timeout:20000});
                }
            }
    
            if (newVoiceState.selfDeaf === false) {
                const guildMember = newVoiceState.member;
                guildMember!.voice.setSelfDeaf(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default IndexFunctions;
