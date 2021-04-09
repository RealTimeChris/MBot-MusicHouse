// FoundationClasses.ts - Module for my "builder classes".
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');

module FoundationClasses {
    /**
     * Class representing a single song on YouTube.
     */
    export interface YouTubeSong {
        addedBy: string;
        id: string;
        name: string;
        thumbnailURL: string;
        url: string;
    }

    /**
     * Class representing a playlist of YouTube songs.
     */
    export interface Playlist {
        currentSong: YouTubeSong;
        loopAll: boolean;
        loopSong: boolean;
        playNext: boolean;
        songs: YouTubeSong[];
        textChannel: Discord.TextChannel | null;
        voiceChannel: Discord.VoiceChannel | null;
        volume: number;        
    }
    
    /**
     * Class representing a function/command.
     */
     export interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }

    /**
     * Class representing a command' return values.
     */
    export interface CommandReturnData {
        commandName: string;
    }

    /**
         * Class representing a function/command.
         */
    export interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }

    /**
     * Class representing a command' return values.
     */
    export interface CommandReturnData {
        commandName: string;
    }

    /**
    * Base abstract class for Discord classes.
    */
    export abstract class DiscordEntity {
        public readonly abstract id: string = '';
        public abstract getFromDataBase(): Promise<void>;
        public abstract writeToDataBase(): Promise<void>;
    }

    /**
    * Class representing the data that goes into a command.
    */
    export class CommandData {
        public args: string[] = [];
        public fromTextChannel: Discord.TextChannel | Discord.DMChannel | null = null;
        public fromTextChannelType: string = '';
        public guild: Discord.Guild | null = null;
        public guildMember: Discord.GuildMember | Discord.User | null = null;
        public interaction: any = null;
        public permsChannel: Discord.GuildChannel | null = null;
        public toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel |  null = null;
    
        public async initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction: any = null, guildMemberID: string = '', guildID: string = ''): Promise<void>{
            try{
                this.fromTextChannelType = fromTextChannelType;
                this.fromTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel | Discord.DMChannel;
                if (interaction !== null) {
                    this.interaction = interaction;
                }
                if (guildID !== '') {
                    this.guild  = await client.guilds.fetch(guildID);
                }
                if (guildMemberID !== '' && guildID !== '') {
                    this.guildMember = await this.guild!.members.fetch(guildMemberID);
                }
                else{
                    this.guildMember = await client.users.fetch(guildMemberID);
                }
                if (interaction !== null && fromTextChannelType !== 'dm') {
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = new Discord.GuildChannel(this.guild!, this.fromTextChannel);
                }
                if (interaction === null && fromTextChannelType !== 'dm') {
                    this.toTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel;
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction !== null && fromTextChannelType === 'dm') {
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction === null && fromTextChannelType === 'dm') {
                    this.toTextChannel = await this.guildMember.createDM(true);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                return;
            }
            catch(error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
        }
    }
}
export default FoundationClasses;
