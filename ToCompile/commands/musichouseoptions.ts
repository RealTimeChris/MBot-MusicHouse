// musichouseoptions.ts - Module for my "musichouse options" command.
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
    name: 'musichouseoptions',
    description: '__**Janny Options Usage:**__ !musichouseoptions.',
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

        const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (doWeHaveAdminPerms === false) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
		await guildData.getFromDataBase();

        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed
            .setAuthor((commandData.guild?.client.user as Discord.User).username, (commandData.guild?.client.user as Discord.User).avatarURL()!)
            .setTimestamp(Date.now())
            .setTitle('__**MusicHouse Options:**__')
            .setColor(guildData.borderColor as [number, number, number])
            .setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");

        const fields = [];
        let resultIcon = '❌';
        if (guildData.musicChannelIDs!.length > 0) {
            resultIcon = '✅';
        }
        const logsField1 = { name: '__**Restricted Music Activity To Specific Channels:**__', value: `__Active:__ ${resultIcon}\n__Command(s):__ '!setmusicchannel'`, inline: true };
        fields.push(logsField1);

        resultIcon = '❌';
        if (guildData.djRoleID !== '') {
            resultIcon = '✅';
        }
        const logsField2 = { name: '__**Restricted Music Control to a Specific Role:**__', value: `__Active:__ ${resultIcon}\n__Command(s):__ '!djrole'`, inline: true };
        fields.push(logsField2);

        msgEmbed.fields = fields;
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
