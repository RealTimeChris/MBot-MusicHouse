import Discord = require('discord.js');
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';
declare module HelperFunctions {
    /**
     * Functino for sending out a message, using the appropriate channel.
     */
    function sendMessageWithCorrectChannel(commandData: FoundationClasses.CommandData, messageContents: String | Discord.MessageEmbed, atUserID?: string | null): Promise<Discord.Message>;
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): Promise<boolean>;
    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    function areWeInADM(commandData: FoundationClasses.CommandData): Promise<boolean>;
    /**
    * Checks if we have admin permissions in the current channel.
    */
    function doWeHaveAdminPermission(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean>;
    /**
     * Checks to see if we are allowed to use a given channel for given activities.
     */
    function checkIfAllowedInChannel(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean>;
    /**
     * Checks to see if the user has a DJ role.
     */
    function checkIfWeHaveControl(commandData: FoundationClasses.CommandData, guildData: GuildData): Promise<boolean>;
}
export default HelperFunctions;
