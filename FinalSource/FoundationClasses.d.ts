import Discord = require('discord.js');
declare module FoundationClasses {
    /**
     * Class representing a single song on YouTube.
     */
    interface YouTubeSong {
        addedBy: string;
        id: string;
        name: string;
        thumbnailURL: string;
        url: string;
    }
    /**
     * Class representing a playlist of YouTube songs.
     */
    interface Playlist {
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
    interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }
    /**
     * Class representing a command' return values.
     */
    interface CommandReturnData {
        commandName: string;
    }
    /**
         * Class representing a function/command.
         */
    interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }
    /**
     * Class representing a command' return values.
     */
    interface CommandReturnData {
        commandName: string;
    }
    /**
    * Base abstract class for Discord classes.
    */
    abstract class DiscordEntity {
        abstract readonly id: string;
        abstract getFromDataBase(): Promise<void>;
        abstract writeToDataBase(): Promise<void>;
    }
    /**
    * Class representing the data that goes into a command.
    */
    class CommandData {
        args: string[];
        fromTextChannel: Discord.TextChannel | Discord.DMChannel | null;
        fromTextChannelType: string;
        guild: Discord.Guild | null;
        guildMember: Discord.GuildMember | Discord.User | null;
        interaction: any;
        permsChannel: Discord.GuildChannel | null;
        toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel | null;
        initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction?: any, guildMemberID?: string, guildID?: string): Promise<void>;
    }
}
export default FoundationClasses;
