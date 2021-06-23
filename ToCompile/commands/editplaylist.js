// editplaylist.ts - Module for my "edit playlist" command.
// Mar 11, 2021
// Chris M.
// https://ithub/com/RealTimeChris
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'editplaylist',
    description: '__**Edit Playlist Usage:**__ !editplaylist, and then follow the directions!',
    function: Function()
};
function updateMessageEmbed(guildData, message, newMessage, currentPageIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var msgEmbedFields, msgEmbedFieldsPage, y, msgEmbedField, newMsgEmbeds, y, msgEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msgEmbedFields = [[], []];
                    msgEmbedFields.splice(0, 1);
                    msgEmbedFieldsPage = 0;
                    for (y = 0; y < guildData.playlist.songs.length; y += 1) {
                        if (y % 25 === 0 && y > 0) {
                            msgEmbedFieldsPage += 1;
                            msgEmbedFields.push([]);
                        }
                        msgEmbedField = {
                            name: "__**" + (y + 1) + " of " + guildData.playlist.songs.length + "**__",
                            value: "__**Title**__ [" + (guildData.playlist.songs[y]).name + "](" + (guildData.playlist.songs[y]).url + ")\n__**Added By:**__ <@!" + (guildData.playlist.songs[y]).addedBy + ">",
                            inline: false,
                        };
                        msgEmbedFields[msgEmbedFieldsPage].push(msgEmbedField);
                    }
                    msgEmbedFieldsPage = 0;
                    newMsgEmbeds = [];
                    for (y = 0; y < msgEmbedFields.length; y += 1) {
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setColor(guildData.borderColor)
                            .setTimestamp(Date.now())
                            .setTitle("__**Playlist, Page " + (y + 1) + " of " + msgEmbedFields.length + "**__")
                            .setFooter('React with ✅ to edit the contents of the current page. React with ❌ to exit!')
                            .setDescription('__**React with ✅ to edit the contents of the current page. React with ❌ to exit!**__').fields = msgEmbedFields[y];
                        newMsgEmbeds.push(msgEmbed);
                    }
                    return [4 /*yield*/, newMessage.edit(newMsgEmbeds[currentPageIndex])];
                case 1:
                    _a.sent();
                    return [2 /*return*/, newMsgEmbeds];
            }
        });
    });
}
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, checkIfAllowedInChannel, guildData_1, msgString, msgEmbed, msg, doWeHaveControl, voiceChannel, msgString, msgEmbed, msg, permissions, msgString, msgEmbed, msg, msgString, msgEmbed, msg, currentPageIndex_1, newMessage_1, msgEmbed, msgEmbedFields, msgEmbedFieldsPage, y, msgEmbedField, msgEmbeds_1, y, msgEmbed, userID_1, filter, reactionCollector_1, error_1;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 23, , 24]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _g.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    checkIfAllowedInChannel = _g.sent();
                    if (checkIfAllowedInChannel === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 3:
                    _g.sent();
                    if (!!((_b = commandData.fromTextChannel.permissionsFor((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user)) === null || _b === void 0 ? void 0 : _b.has('MANAGE_MESSAGES'))) return [3 /*break*/, 6];
                    msgString = "------\n**I need the Manage Messages permission in this channel, for this command!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _g.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 6: return [4 /*yield*/, HelperFunctions_1.default.checkIfWeHaveControl(commandData, guildData_1)];
                case 7:
                    doWeHaveControl = _g.sent();
                    if (!doWeHaveControl) {
                        return [2 /*return*/, commandReturnData];
                    }
                    voiceChannel = commandData.guildMember.voice.channel;
                    if (!!voiceChannel) return [3 /*break*/, 10];
                    msgString = "------\n**You need to be in a voice channel to issue music commands!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Voice Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _g.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    if (!(guildData_1.playlist.voiceChannel === null)) return [3 /*break*/, 16];
                    return [4 /*yield*/, voiceChannel.join()];
                case 11:
                    _g.sent();
                    guildData_1.playlist.textChannel = commandData.fromTextChannel;
                    guildData_1.playlist.voiceChannel = voiceChannel;
                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                case 12:
                    _g.sent();
                    permissions = voiceChannel.permissionsFor(commandData.guild.client.user);
                    if (!(!permissions.has('CONNECT') || !permissions.has('SPEAK'))) return [3 /*break*/, 15];
                    msgString = "------\n**I need the permissions to join and speak in your voice channel!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issues:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 13:
                    msg = _g.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 14:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 15: return [3 /*break*/, 19];
                case 16:
                    if (!(voiceChannel.id !== guildData_1.playlist.voiceChannel.id)) return [3 /*break*/, 19];
                    msgString = "------\n**You need to be in the correct voice channel to issue music commands!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Voice Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 17:
                    msg = _g.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 18:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 19:
                    currentPageIndex_1 = 0;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, "<@!" + ((_e = commandData.guildMember) === null || _e === void 0 ? void 0 : _e.id) + ">")];
                case 20:
                    newMessage_1 = _g.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage_1 = new Discord.Message(commandData.guild.client, newMessage_1, commandData.fromTextChannel);
                    }
                    if (!(guildData_1.playlist.songs.length === 0)) return [3 /*break*/, 22];
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Empty Playlist:**__')
                        .setDescription('------\n__**Sorry, but there is nothing here to display!**__\n------');
                    return [4 /*yield*/, newMessage_1.edit(msgEmbed)];
                case 21:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 22:
                    msgEmbedFields = [[], []];
                    msgEmbedFields.splice(0, 1);
                    msgEmbedFieldsPage = 0;
                    for (y = 0; y < guildData_1.playlist.songs.length; y += 1) {
                        if (y % 25 === 0 && y > 0) {
                            msgEmbedFieldsPage += 1;
                            msgEmbedFields.push([]);
                        }
                        msgEmbedField = {
                            name: "__**" + (y + 1) + " of " + guildData_1.playlist.songs.length + "**__",
                            value: "__**Title**__ [" + guildData_1.playlist.songs[y].name + "](" + guildData_1.playlist.songs[y].url + ")\n__**Added By:**__ <@!" + guildData_1.playlist.songs[y].addedBy + ">",
                            inline: false,
                        };
                        msgEmbedFields[msgEmbedFieldsPage].push(msgEmbedField);
                    }
                    msgEmbeds_1 = [];
                    msgEmbedFieldsPage = 0;
                    for (y = 0; y < msgEmbedFields.length; y += 1) {
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData_1.borderColor)
                            .setTimestamp(Date.now())
                            .setTitle("__**Playlist, Page " + (y + 1) + " of " + msgEmbedFields.length + "**__")
                            .setFooter('React with ✅ to edit the contents of the current page. React with ❌ to exit!')
                            .setDescription('__**React with ✅ to edit the contents of the current page. React with ❌ to exit!**__').fields = msgEmbedFields[y];
                        msgEmbeds_1.push(msgEmbed);
                    }
                    newMessage_1.edit(msgEmbeds_1[currentPageIndex_1]);
                    userID_1 = (_f = commandData.guildMember) === null || _f === void 0 ? void 0 : _f.id;
                    newMessage_1.react('✅');
                    newMessage_1.react('◀️');
                    newMessage_1.react('▶️');
                    newMessage_1.react('❌');
                    filter = function (reaction, user) { return (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌'
                        || reaction.emoji.name === '✅') && user.id === commandData.guildMember.id; };
                    reactionCollector_1 = newMessage_1.createReactionCollector(filter, { time: 120000 });
                    reactionCollector_1.on('collect', function (reaction) { return __awaiter(_this, void 0, void 0, function () {
                        var messageEmbed, messageEmbed, messageEmbed, messageEmbed, x, messageFilter, y, messageCollection, args2, x, x, removeIndex, x, sourceIndex, destinationIndex, tempSong, guildData_2, newSongArray, randomIndex;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    reactionCollector_1.resetTimer({ time: 120000 });
                                    if (!(reaction.emoji.name === '❌')) return [3 /*break*/, 1];
                                    reactionCollector_1.stop('User exited.');
                                    return [3 /*break*/, 41];
                                case 1:
                                    if (!(reaction.emoji.name === '▶️' && (currentPageIndex_1 === (msgEmbeds_1.length - 1)))) return [3 /*break*/, 3];
                                    reaction.users.remove(userID_1);
                                    currentPageIndex_1 = 0;
                                    messageEmbed = msgEmbeds_1[currentPageIndex_1];
                                    return [4 /*yield*/, newMessage_1.edit(messageEmbed)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 41];
                                case 3:
                                    if (!(reaction.emoji.name === '▶️' && (currentPageIndex_1 < msgEmbeds_1.length))) return [3 /*break*/, 5];
                                    reaction.users.remove(userID_1);
                                    currentPageIndex_1 += 1;
                                    messageEmbed = msgEmbeds_1[currentPageIndex_1];
                                    return [4 /*yield*/, newMessage_1.edit(messageEmbed)];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 41];
                                case 5:
                                    if (!(reaction.emoji.name === '◀️' && (currentPageIndex_1 > 0))) return [3 /*break*/, 7];
                                    reaction.users.remove(userID_1);
                                    currentPageIndex_1 -= 1;
                                    messageEmbed = msgEmbeds_1[currentPageIndex_1];
                                    return [4 /*yield*/, newMessage_1.edit(messageEmbed)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 41];
                                case 7:
                                    if (!(reaction.emoji.name === '◀️' && (currentPageIndex_1 === 0))) return [3 /*break*/, 9];
                                    reaction.users.remove(userID_1);
                                    currentPageIndex_1 = msgEmbeds_1.length - 1;
                                    messageEmbed = msgEmbeds_1[currentPageIndex_1];
                                    return [4 /*yield*/, newMessage_1.edit(messageEmbed)];
                                case 8:
                                    _a.sent();
                                    return [3 /*break*/, 41];
                                case 9:
                                    if (!(reaction.emoji.name === '✅')) return [3 /*break*/, 41];
                                    return [4 /*yield*/, reaction.users.remove(userID_1)];
                                case 10:
                                    _a.sent();
                                    for (x = 0; x < msgEmbeds_1.length; x += 1) {
                                        msgEmbeds_1[x].description = "__Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber> <destinationTrackNumber>'" +
                                            "to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.__\n";
                                        msgEmbeds_1[x].setFooter("Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber> <destinationTrackNumber>' to swap" +
                                            " tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                                    }
                                    messageFilter = function (filteredMessage) { return filteredMessage.member.id === userID_1; };
                                    return [4 /*yield*/, newMessage_1.edit(msgEmbeds_1[currentPageIndex_1])];
                                case 11:
                                    _a.sent();
                                    y = 0;
                                    _a.label = 12;
                                case 12:
                                    if (!(y < 1)) return [3 /*break*/, 41];
                                    return [4 /*yield*/, newMessage_1.channel.awaitMessages(messageFilter, { max: 1, time: 120000 })];
                                case 13:
                                    messageCollection = _a.sent();
                                    if (!(messageCollection.first() === undefined)) return [3 /*break*/, 15];
                                    msgEmbeds_1.splice(currentPageIndex_1, 1);
                                    return [4 /*yield*/, updateMessageEmbed(guildData_1, newMessage_1, newMessage_1, currentPageIndex_1)];
                                case 14:
                                    msgEmbeds_1 = _a.sent();
                                    return [3 /*break*/, 41];
                                case 15:
                                    args2 = messageCollection.first().content.split(/ +/, 3);
                                    if (!(args2[0].toLowerCase() !== 'remove' && args2[0].toLowerCase() !== 'swap' && args2[0].toLowerCase() !== 'exit'
                                        && args2[0].toLowerCase() !== 'shuffle')) return [3 /*break*/, 18];
                                    for (x = 0; x < msgEmbeds_1.length; x += 1) {
                                        msgEmbeds_1[x].description = "__**PLEASE ENTER A PROPER INPUT!**__\n__Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>" +
                                            " <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist."
                                            + '\nType exit to exit.__\n';
                                        msgEmbeds_1[x].setFooter("PLEASE ENTER A PROPER INPUT!\nType 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber> " +
                                            "<destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                                    }
                                    return [4 /*yield*/, newMessage_1.edit(msgEmbeds_1[currentPageIndex_1])];
                                case 16:
                                    _a.sent();
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 17:
                                    _a.sent();
                                    return [3 /*break*/, 40];
                                case 18:
                                    if (!(args2[0].toLowerCase() === 'remove')) return [3 /*break*/, 25];
                                    if (!((parseInt(args2[1], 10) - 1) < 0 || (parseInt(args2[1], 10) - 1)
                                        >= guildData_1.playlist.songs.length || args2[1] === undefined)) return [3 /*break*/, 21];
                                    for (x = 0; x < msgEmbeds_1.length; x += 1) {
                                        msgEmbeds_1[x].description = "__**PLEASE ENTER A PROPER INPUT!**__\n__Type 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>" +
                                            " <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist."
                                            + '\nType exit to exit.__\n';
                                        msgEmbeds_1[x].setFooter("PLEASE ENTER A PROPER INPUT!\nType 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>" +
                                            "<destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                                    }
                                    return [4 /*yield*/, newMessage_1.edit(msgEmbeds_1[currentPageIndex_1])];
                                case 19:
                                    _a.sent();
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 20:
                                    _a.sent();
                                    return [3 /*break*/, 40];
                                case 21:
                                    removeIndex = parseInt(args2[1], 10) - 1;
                                    guildData_1.playlist.songs.splice(removeIndex, 1);
                                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                                case 22:
                                    _a.sent();
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 23:
                                    _a.sent();
                                    msgEmbeds_1.splice(currentPageIndex_1, 1);
                                    return [4 /*yield*/, updateMessageEmbed(guildData_1, newMessage_1, newMessage_1, currentPageIndex_1)];
                                case 24:
                                    msgEmbeds_1 = _a.sent();
                                    return [3 /*break*/, 41];
                                case 25:
                                    if (!(args2[0].toLowerCase() === 'exit')) return [3 /*break*/, 28];
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 26:
                                    _a.sent();
                                    msgEmbeds_1.splice(currentPageIndex_1, 1);
                                    return [4 /*yield*/, updateMessageEmbed(guildData_1, newMessage_1, newMessage_1, currentPageIndex_1)];
                                case 27:
                                    msgEmbeds_1 = _a.sent();
                                    return [3 /*break*/, 41];
                                case 28:
                                    if (!(args2[0].toLowerCase() === 'swap')) return [3 /*break*/, 35];
                                    if (!((parseInt(args2[1], 10) - 1) < 0 || (parseInt(args2[1], 10) - 1)
                                        >= guildData_1.playlist.songs.length || (parseInt(args2[2], 10) - 1)
                                        < 0 || (parseInt(args2[2], 10) - 1) >= guildData_1.playlist.songs.length
                                        || args2[1] === undefined || args2[2] === undefined)) return [3 /*break*/, 31];
                                    for (x = 0; x < msgEmbeds_1.length; x += 1) {
                                        msgEmbeds_1[x].description = "__**PLEASE ENTER A PROPER INPUT!**__\n__Type 'remove <trackNumber>' to remove a track.\nType 'swap" +
                                            " <sourceTrackNumber> <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist."
                                            + '\nType exit to exit.__\n';
                                        msgEmbeds_1[x].setFooter("PLEASE ENTER A PROPER INPUT!\nType 'remove <trackNumber>' to remove a track.\nType 'swap <sourceTrackNumber>"
                                            + " <destinationTrackNumber>' to swap tracks.\nType 'shuffle' to shuffle the playlist.\nType 'exit' to exit.");
                                    }
                                    return [4 /*yield*/, newMessage_1.edit(msgEmbeds_1[currentPageIndex_1])];
                                case 29:
                                    _a.sent();
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 30:
                                    _a.sent();
                                    return [3 /*break*/, 40];
                                case 31:
                                    sourceIndex = parseInt(args2[1], 10) - 1;
                                    destinationIndex = parseInt(args2[2], 10) - 1;
                                    tempSong = guildData_1.playlist.songs[sourceIndex];
                                    guildData_1.playlist.songs[sourceIndex] = guildData_1.playlist.songs[destinationIndex];
                                    guildData_1.playlist.songs[destinationIndex] = tempSong;
                                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                                case 32:
                                    _a.sent();
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 33:
                                    _a.sent();
                                    msgEmbeds_1.splice(currentPageIndex_1, 1);
                                    return [4 /*yield*/, updateMessageEmbed(guildData_1, newMessage_1, newMessage_1, currentPageIndex_1)];
                                case 34:
                                    msgEmbeds_1 = _a.sent();
                                    return [3 /*break*/, 41];
                                case 35:
                                    if (!(args2[0].toLowerCase() === 'shuffle')) return [3 /*break*/, 40];
                                    guildData_2 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                                    return [4 /*yield*/, guildData_2.getFromDataBase()];
                                case 36:
                                    _a.sent();
                                    newSongArray = [];
                                    while (guildData_2.playlist.songs.length > 0) {
                                        randomIndex = Math.trunc(Math.random() * guildData_2.playlist.songs.length);
                                        newSongArray.push(guildData_2.playlist.songs[randomIndex]);
                                        guildData_2.playlist.songs.splice(randomIndex, 1);
                                    }
                                    guildData_2.playlist.songs = newSongArray;
                                    return [4 /*yield*/, guildData_2.writeToDataBase()];
                                case 37:
                                    _a.sent();
                                    return [4 /*yield*/, messageCollection.first().delete()];
                                case 38:
                                    _a.sent();
                                    msgEmbeds_1.splice(currentPageIndex_1, 1);
                                    return [4 /*yield*/, updateMessageEmbed(guildData_2, newMessage_1, newMessage_1, currentPageIndex_1)];
                                case 39:
                                    msgEmbeds_1 = _a.sent();
                                    return [3 /*break*/, 41];
                                case 40:
                                    y;
                                    return [3 /*break*/, 12];
                                case 41: return [2 /*return*/];
                            }
                        });
                    }); });
                    reactionCollector_1.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, newMessage_1.reactions.removeAll()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, commandReturnData];
                case 23:
                    error_1 = _g.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 24: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
