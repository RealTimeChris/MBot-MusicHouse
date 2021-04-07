import Discord = require('discord.js');
import DiscordUser from './DiscordUser';
declare module IndexFunctions {
    function onReady(client: any, discordUser: DiscordUser): Promise<void>;
    function onMessage(msg: Discord.Message, client: any, discordUser: DiscordUser): Promise<void>;
    function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser): Promise<void>;
    function onVoiceStatusUpdate(newVoiceState: Discord.VoiceState, client: any, discordUser: DiscordUser): Promise<void>;
}
export default IndexFunctions;
