// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'test',
    description: '!test',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };

        if (commandData.guildMember instanceof Discord.User) {
            const msgString = '------\n**TEST!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                .setColor([254, 254, 254])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Test:**__')
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
        }
        else{
            const msgString = '------\n**TEST!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor([254, 254, 254])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Test:**__')
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
        }
        
        for (let x = 0; x<  commandData.guild?.roles!.cache!.array()!.length!;x+=1){
            console.log("ROLE NAME: " + commandData.guild?.roles.cache.array()[x]?.name);
        } 

        
        var  newRole = await commandData.guild?.roles.create({data:{position: 0, color: 2334, hoist: true, name: "TEST ROLE", }});
        console.log("NEW ROLE NAME" + newRole?.name);

        for (let x= 0; x < (await commandData.guild?.roles!.fetch()!).cache.array().length; x+=1){
            console.log("NEWER ROLE NAME: " + commandData.guild?.roles.cache.array()[x]?.name);
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
