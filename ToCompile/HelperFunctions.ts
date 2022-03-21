// HelperFunctions.ts - Module for my "helper functions".
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

"use strict";

import Discord = require('discord.js');
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';

module HelperFunctions{
    /**
     * Functino for sending out a message, using the appropriate channel.
     */
    export async function sendMessageWithCorrectChannel(commandData: FoundationClasses.CommandData, messageContents: String | Discord.MessageEmbed, atUserID: string | null = null): Promise<Discord.Message>{
        try{
            let returnMessage: Discord.Message;
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                    const msgEmbeds: Discord.MessageEmbed[] = [];
                    msgEmbeds.push(messageContents);
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}>`, {embeds: msgEmbeds, split: false});
                }
                else if (atUserID === null) {
                    returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
                }
                else{
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                }
            }
            else if (commandData.toTextChannel instanceof Discord.TextChannel) {
                if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}>`, {embed: messageContents});
                }
                else if (atUserID === null) {
                    returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
                }
                else{
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                }			
            }
            else if (commandData.toTextChannel instanceof Discord.DMChannel) {
                returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
            }

            return returnMessage!;
        }
        catch(error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
     export async function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): Promise<boolean> {
        let isCommander = false;
        for (let x = 0; x < commanderIDs.length; x += 1) {
            if (userID === commanderIDs[x]) {
                isCommander = true;
                break;
            }
        }
        return isCommander;
    }

    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    export async function areWeInADM(commandData: FoundationClasses.CommandData): Promise<boolean> {
        try { 
            const currentChannelType = commandData.fromTextChannelType;

            if (currentChannelType === 'dm') {
                const msgString = `------\n**Sorry, but we can't do that in a direct message!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Direct Message Issue:**__');
                let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                }
                msg.delete({timeout: 20000});
                
                return true;
            }
            return false;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Checks if we have admin permissions in the current channel.
    */
    export async function doWeHaveAdminPermission(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean> {
        try {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
            await guildData.getFromDataBase();

            const currentChannelPermissions = (commandData.guildMember as Discord.GuildMember).permissionsIn(commandData.permsChannel!);

            const permissionStrings = 'ADMINISTRATOR';

            const areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);

            const areTheyACommander = await checkForBotCommanderStatus(commandData.guildMember!.id,
                discordUser.userData.botCommanders);

            if (areTheyAnAdmin === true || areTheyACommander === true) {
                return true;
            }

            const msgString = `------\n**Sorry, but you don't have the permissions required for that!**\n------`
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Permissions Issue:**__");
            let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout:20000});
            return false;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Checks to see if we are allowed to use a given channel for given activities.
     */
    export async function checkIfAllowedInChannel(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean> {
        try {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
            await guildData.getFromDataBase();
            let isItFound = true;
            if (guildData.musicChannelIDs.length > 0) {
                isItFound = false;
                let msgString = `------\n**Sorry, but please do that in one of the following channels:**\n------\n`;
                const msgEmbed = new Discord.MessageEmbed();
                for (let x = 0; x < guildData.musicChannelIDs.length; x += 1) {
                    if (commandData.fromTextChannel!.id === guildData.musicChannelIDs[x]) {
                        isItFound = true;
                        break;
                    } else {
                        msgString += `<#${guildData.musicChannelIDs[x]}>\n`;
                    }
                }
                msgString += '------';
                if (isItFound === false) {
                    msgEmbed
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setDescription(msgString)
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle("__**Permissions Issue:**__")
                    let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout:20000});
                    return isItFound;
                }
            }
            return isItFound;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Checks to see if the user has a DJ role.
     */
    export async function checkIfWeHaveControl(commandData: FoundationClasses.CommandData, guildData: GuildData): Promise<boolean> {
        try {
            if (guildData.djRoleID === '') {
                return true;
            }
            let doWeHaveControl = false;

            const guildMemberRoleManager = new Discord.GuildMemberRoleManager(commandData.guildMember as Discord.GuildMember);
            const memberRoleArray = guildMemberRoleManager.cache.array();

            for (let x = 0; x < memberRoleArray.length; x += 1) {
                if ((memberRoleArray[x] as Discord.Role).id === guildData.djRoleID) {
                    doWeHaveControl = true;
                    break;
                }
            }

            if (!doWeHaveControl) {
                const msgString = `------\n**Sorry, but you lack the permissions to do that!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setDescription(msgString)
                    .setColor(guildData.borderColor as [number, number, number])
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('Permissions Issue');
                let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) { 
                    msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
            }
            return doWeHaveControl;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}
export default HelperFunctions;
