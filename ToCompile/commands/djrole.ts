// djrole.ts - Module for my "dj role" command.
// Mar 18, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'djrole',
    description: '__**DJ Role Usage:**__ !djrole = create, rolename, rolehexcolorvalue, OR !djrole = add, @ROLEMENTION, or !djrole = remove',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
    
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM) {
            return commandReturnData;
        }

        const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (!doWeHaveAdminPerms) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

        let whatAreWeDoing;
        let hexColorValue;
        let roleName;
        let roleID;
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (commandData.args[0] !== undefined) {
            if (commandData.args[0].toLowerCase() !== 'create' && commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove') {
                const msgString = `------\n**Please, enter a proper first argument! (!djrole = create, rolename, rolehexcolorvalue, OR !djrole = add, @ROLEMENTION, or !djrole = remove, @ROLEMENTION)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
				    .setTitle('__**Missing Or Invalid Arguments:**__')
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }
            const rolementionRegExp = /<@&\d{18}>/;
            const roleIDRegExp = /\d{18}/;
            if (commandData.args[0].toLowerCase() === 'create') {
                if (commandData.args[1] === undefined) {
                    const msgString = `------\n**Please, enter a role name!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setDescription(msgString)
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                    let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                    return commandReturnData;
                }

                const argOne = commandData.args[1];
                roleName = argOne;

                if (commandData.args[2] === undefined) {
                    hexColorValue = 'E00202';
                } else {
                    const argTwo = commandData.args[2];
                    hexColorValue = argTwo;
                }
                whatAreWeDoing = 'create';
            } else if (commandData.args[0].toLowerCase() === 'add') {
                if (!rolementionRegExp.test(commandData.args[1]!) && !roleIDRegExp.test(commandData.args[1]!)) {
                    const msgString = `------\n**Please, enter a proper role mention!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setDescription(msgString)
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                    let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                    return commandReturnData;
                }

                const argOne = commandData.args[1]!.match(roleIDRegExp)![0];
                roleID = argOne;

                whatAreWeDoing = 'add';
            } else if (commandData.args[0].toLowerCase() === 'remove') {
                whatAreWeDoing = 'remove';
            }
        }

        if (whatAreWeDoing === 'viewing') {
            const roleManager = new Discord.RoleManager(commandData.guild!);
            const currentRole = await roleManager.fetch(guildData.djRoleID);

            let msgString = '';
            if (guildData.djRoleID === '') {
                msgString = '------\n__**DJ Role:**__ None!\n------';
            } else if (currentRole === null) {
                msgString = '------\n__**DJ Role:**__ None!\n------';

                guildData.djRoleID = '';
                await guildData.writeToDataBase();
            } else {
                msgString = `------\n__**DJ Role:**__ <@&${guildData.djRoleID}>\n------`;
            }
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date.now())
                .setTitle('__**DJ Role:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'create') {
            if (guildData.djRoleID !== '') {
                const msgString = `------\n*Sorry, but there is already a DJ role that has been created!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
				    .setTitle('__**Role Issue:**__')
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }
            const rolePermStrings: string[] = [];
            rolePermStrings[0] = 'CREATE_INSTANT_INVITE';
            rolePermStrings[1] = 'ADD_REACTIONS';
            rolePermStrings[2] = 'VIEW_CHANNEL';
            rolePermStrings[3] = 'SEND_MESSAGES';
            rolePermStrings[4] = 'CHANGE_NICKNAME';
            rolePermStrings[5] = 'USE_EXTERNAL_EMOJIS';
            rolePermStrings[6] = 'CONNECT';
            rolePermStrings[7] = 'EMBED_LINKS';
            rolePermStrings[8] = 'ATTACH_FILES';
            rolePermStrings[9] = 'SPEAK';

            const roleManager = new Discord.RoleManager(commandData.guild!);

            const role = await roleManager.create({
                data: {
                    name: roleName,
                    color: hexColorValue,
                    permissions: rolePermStrings as Discord.PermissionString[],
                    hoist: true,
                    mentionable: true,
                },
            });

            guildData.djRoleID = role.id;
            await guildData.writeToDataBase()

            const msgString = `------\n__You've created a new DJ Role!__\n------\n__**New DJ Role:**__ <@&${role.id}>\n------`;

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date.now())
                .setTitle('__**DJ Role Created:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'add') {
            const roleManager = new Discord.RoleManager(commandData.guild!);
            const currentRole = await roleManager.fetch(roleID);

            if (currentRole === null) {
                const msgString = `------\n**Sorry, but that is not apparently a role in this server!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
    				.setTitle('__**Role Issue:**__')
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }

            guildData.djRoleID = roleID as string;
            await guildData.writeToDataBase();

            const msgString = `------\n__You've added a new DJ Role!__\n------\n__**New DJ Role:**__ <@&${roleID}>\n------`;

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date.now())
                .setTitle('__**DJ Role Added:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'remove') {
            if (guildData.djRoleID === '') {
                const msgString = `------\n**Sorry, but there is no DJ role to remove!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
    				.setTitle('__**Role Issue:**__')
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }

            const roleManager = new Discord.RoleManager(commandData.guild!);
            const currentRole = await roleManager.fetch(guildData.djRoleID as string);

            let msgString;
            if (currentRole === null) {
                msgString = '------\n__You\'ve removed the DJ Role!__\n------\n__**Removed DJ Role:**__ DELETED\n------';
            } else {
                msgString = `------\n__You've removed the DJ Role!__\n------\n__**Removed DJ Role:**__ ${currentRole.name}\n------`;
            }
            guildData.djRoleID = '';
            await guildData.writeToDataBase();

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date.now())
                .setTitle('__**DJ Role Removed:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
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
