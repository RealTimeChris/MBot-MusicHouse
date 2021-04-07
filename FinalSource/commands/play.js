// play.ts - Module for my "play" command.
// Mar 7, 2021
// Chris M.
// https://github.com/RealTimeChris
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
var ytdl = require("ytdl-core-discord");
var ytsr = require("ytsr");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'play',
    description: '__**Play Usage:**__ !play = SONGNAMETOSEARCH',
    function: Function()
};
/**
 * Plays the list of songs!
 */
function playSongs(guildData, commandData, connection, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var guildDataNew_1, msgEmbed, vchannel, dispatcher, song_1, footerString_1, songOne, songOne, _c, _d, error_1, msgString, msgEmbed, msg;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 8, , 11]);
                    guildDataNew_1 = guildData;
                    if (!(guildDataNew_1.playlist.songs.length === 0 && guildDataNew_1.playlist.currentSong.url === '')) return [3 /*break*/, 3];
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Empty Playlist:**__')
                        .setDescription('------\n**Sorry, but there are no songs left in the playlist/queue!**\n------');
                    vchannel = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.channels.resolve(guildDataNew_1.playlist.voiceChannel.id);
                    vchannel.leave();
                    guildDataNew_1.playlist.textChannel = null;
                    guildDataNew_1.playlist.voiceChannel = null;
                    guildDataNew_1.playlist.playNext = true;
                    guildDataNew_1.playlist.currentSong = { name: '', addedBy: '', url: '', thumbnailURL: '', id: '' };
                    return [4 /*yield*/, guildDataNew_1.writeToDataBase()];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 2:
                    _e.sent();
                    return [2 /*return*/];
                case 3:
                    dispatcher = void 0;
                    if (!(guildDataNew_1.playlist.playNext === true)) return [3 /*break*/, 6];
                    footerString_1 = '';
                    if (guildDataNew_1.playlist.loopSong === true) {
                        songOne = void 0;
                        if (guildDataNew_1.playlist.currentSong.url === '') {
                            songOne = guildDataNew_1.playlist.songs.shift();
                        }
                        else {
                            songOne = guildDataNew_1.playlist.currentSong;
                        }
                        song_1 = songOne;
                        footerString_1 = 'Looping of the current song is enabled!';
                    }
                    else if (guildDataNew_1.playlist.loopAll === true) {
                        songOne = void 0;
                        if (guildDataNew_1.playlist.songs.length === 0 && guildDataNew_1.playlist.currentSong.url !== '') {
                            songOne = guildDataNew_1.playlist.currentSong;
                        }
                        else if (guildDataNew_1.playlist.currentSong.url === '') {
                            songOne = guildDataNew_1.playlist.songs.shift();
                        }
                        else if (guildDataNew_1.playlist.songs.length > 0) {
                            songOne = guildDataNew_1.playlist.songs.shift();
                        }
                        song_1 = songOne;
                        footerString_1 = 'Looping of the current playlist is enabled!';
                    }
                    else {
                        song_1 = guildDataNew_1.playlist.songs.shift();
                    }
                    guildDataNew_1.playlist.currentSong = song_1;
                    _d = (_c = connection).play;
                    return [4 /*yield*/, ytdl(song_1.url)];
                case 4:
                    dispatcher = _d.apply(_c, [_e.sent(), { type: 'opus' }]);
                    dispatcher.on('start', function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    msgEmbed = new Discord.MessageEmbed();
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setTimestamp(Date())
                                        .setTitle('__**Now Playing:**__')
                                        .setFooter(footerString_1)
                                        .setDescription("__**Title:**__ [" + song_1.name + "](" + song_1.url + ")\n__**Added By:**__ <@!" + song_1.addedBy + ">\n__**Songs Remaining In Queue:**__ " + guildDataNew_1.playlist.songs.length)
                                        .setImage(song_1.thumbnailURL);
                                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                                case 1:
                                    _a.sent();
                                    guildDataNew_1.playlist.playNext = false;
                                    return [4 /*yield*/, guildDataNew_1.writeToDataBase()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('finish', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    guildDataNew_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                                    return [4 /*yield*/, guildDataNew_1.getFromDataBase()];
                                case 1:
                                    _a.sent();
                                    guildDataNew_1.playlist.playNext = true;
                                    if (guildDataNew_1.playlist.loopAll === true && guildDataNew_1.playlist.loopSong === false) {
                                        guildDataNew_1.playlist.songs.push(guildDataNew_1.playlist.currentSong);
                                    }
                                    return [4 /*yield*/, guildDataNew_1.writeToDataBase()];
                                case 2:
                                    _a.sent();
                                    playSongs(guildDataNew_1, commandData, connection, discordUser);
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                        var msgString, msgEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log(error);
                                    msgString = "------\n**" + error + "**\n------";
                                    msgEmbed = new Discord.MessageEmbed()
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Playback Error:**__');
                                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    dispatcher.setVolumeLogarithmic(guildDataNew_1.playlist.volume / 5);
                    guildDataNew_1.playlist.playNext = false;
                    return [4 /*yield*/, guildDataNew_1.writeToDataBase()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    guildDataNew_1.playlist.playNext = false;
                    return [4 /*yield*/, guildDataNew_1.writeToDataBase()];
                case 7:
                    _e.sent();
                    return [2 /*return*/];
                case 8:
                    error_1 = _e.sent();
                    console.log(error_1);
                    msgString = "------\n**Sorry, there was an error trying to play that!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Playback Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 10:
                    _e.sent();
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function execute(commandData, discordUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, checkIfAllowedInChannel, guildData, doWeHaveControl, userID_1, voiceChannel, msgString, msgEmbed, msg, permissions, msgString, msgEmbed, msg, msgString, msgEmbed, msg, guildMember, searchResults, finalSearchResultItems, x, msgEmbeds, msgEmbed, x, msgEmbed, field, embedFields, newMessage, currentPageIndex, reactionFilter, x, reactionCollection, messageEmbed, messageEmbed, messageEmbed, messageEmbed, newSong, msgEmbed, connection, connection, msgString, msgEmbed, newMessage, error_2;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 54, , 55]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _f.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    checkIfAllowedInChannel = _f.sent();
                    if (!checkIfAllowedInChannel) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _f.sent();
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfWeHaveControl(commandData, guildData)];
                case 4:
                    doWeHaveControl = _f.sent();
                    if (!doWeHaveControl) {
                        return [2 /*return*/, commandReturnData];
                    }
                    userID_1 = commandData.guildMember.user.id;
                    voiceChannel = commandData.guildMember.voice.channel;
                    if (!!voiceChannel) return [3 /*break*/, 7];
                    msgString = "------\n**You need to be in a voice channel to issue music commands!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Voice Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(guildData.playlist.voiceChannel === null)) return [3 /*break*/, 13];
                    return [4 /*yield*/, voiceChannel.join()];
                case 8:
                    _f.sent();
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.voiceChannel = voiceChannel;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 9:
                    _f.sent();
                    permissions = voiceChannel.permissionsFor(commandData.guild.client.user);
                    if (!(!permissions.has('CONNECT') || !permissions.has('SPEAK'))) return [3 /*break*/, 12];
                    msgString = "------\n**I need the permissions to join and speak in your voice channel!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issues:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 10:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 12: return [3 /*break*/, 16];
                case 13:
                    if (!(voiceChannel.id !== guildData.playlist.voiceChannel.id)) return [3 /*break*/, 16];
                    msgString = "------\n**You need to be in the correct voice channel to issue music commands!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Voice Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 14:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 16: return [4 /*yield*/, ((_c = commandData.guild) === null || _c === void 0 ? void 0 : _c.members.fetch(commandData.guild.client.user.id))];
                case 17:
                    guildMember = _f.sent();
                    guildMember.voice.setSelfDeaf(true);
                    if (!(commandData.args[0] !== undefined && commandData.args[0] !== '')) return [3 /*break*/, 46];
                    return [4 /*yield*/, ytsr(commandData.args[0])];
                case 18:
                    searchResults = _f.sent();
                    finalSearchResultItems = [];
                    for (x = 0; x < searchResults.items.length; x += 1) {
                        if (searchResults.items[x].type === 'video') {
                            finalSearchResultItems.push(searchResults.items[x]);
                        }
                        else {
                            continue;
                        }
                    }
                    msgEmbeds = [];
                    if (finalSearchResultItems.length === 0) {
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setTimestamp(Date.now())
                            .setTitle('__**Nothing Found:**__')
                            .setFooter('React with ❌ to go back to the playlist menu!')
                            .setDescription('------\n**Sorry, but no songs were found!**\n------');
                        msgEmbeds.push(msgEmbed);
                    }
                    else {
                        for (x = 0; x < finalSearchResultItems.length; x += 1) {
                            msgEmbed = new Discord.MessageEmbed();
                            msgEmbed
                                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                .setColor(guildData.borderColor)
                                .setImage((finalSearchResultItems[x].bestThumbnail.url))
                                .setTimestamp(Date.now())
                                .setURL(finalSearchResultItems[x].url)
                                .setTitle(x + 1 + " of " + finalSearchResultItems.length + "\n" + finalSearchResultItems[x].title + "\n")
                                .setFooter('React with ✅ to add to your playlist');
                            field = { name: '__**Duration:**__', value: "" + ((_d = finalSearchResultItems[x]) === null || _d === void 0 ? void 0 : _d.duration), inline: true };
                            embedFields = [];
                            embedFields.push(field);
                            msgEmbed.fields = embedFields;
                            msgEmbeds.push(msgEmbed);
                        }
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbeds[0])];
                case 19:
                    newMessage = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    currentPageIndex = 0;
                    newMessage.react('✅');
                    newMessage.react('◀️');
                    newMessage.react('▶️');
                    newMessage.react('❌');
                    reactionFilter = function (reaction, user) { return (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️'
                        || reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && user.id === userID_1; };
                    x = 0;
                    _f.label = 20;
                case 20:
                    if (!(x < 1)) return [3 /*break*/, 42];
                    return [4 /*yield*/, (newMessage === null || newMessage === void 0 ? void 0 : newMessage.awaitReactions(reactionFilter, { max: 1, time: 120000 }))];
                case 21:
                    reactionCollection = _f.sent();
                    if (!(reactionCollection.first() === undefined || reactionCollection.first().emoji.name === '❌')) return [3 /*break*/, 23];
                    return [4 /*yield*/, newMessage.reactions.removeAll()];
                case 22:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    if (!(reactionCollection.first().emoji.name === '▶️' && (currentPageIndex === (msgEmbeds.length - 1)))) return [3 /*break*/, 26];
                    reactionCollection.first().users.remove(userID_1);
                    currentPageIndex = 0;
                    messageEmbed = msgEmbeds[currentPageIndex];
                    return [4 /*yield*/, newMessage.edit(messageEmbed)];
                case 24:
                    _f.sent();
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 25:
                    _f.sent();
                    return [3 /*break*/, 41];
                case 26:
                    if (!(reactionCollection.first().emoji.name === '▶️' && (currentPageIndex < msgEmbeds.length))) return [3 /*break*/, 29];
                    reactionCollection.first().users.remove(userID_1);
                    currentPageIndex += 1;
                    messageEmbed = msgEmbeds[currentPageIndex];
                    return [4 /*yield*/, newMessage.edit(messageEmbed)];
                case 27:
                    _f.sent();
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 28:
                    _f.sent();
                    return [3 /*break*/, 41];
                case 29:
                    if (!(reactionCollection.first().emoji.name === '◀️' && (currentPageIndex > 0))) return [3 /*break*/, 32];
                    reactionCollection.first().users.remove(userID_1);
                    currentPageIndex -= 1;
                    messageEmbed = msgEmbeds[currentPageIndex];
                    return [4 /*yield*/, newMessage.edit(messageEmbed)];
                case 30:
                    _f.sent();
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 31:
                    _f.sent();
                    return [3 /*break*/, 41];
                case 32:
                    if (!(reactionCollection.first().emoji.name === '◀️' && (currentPageIndex === 0))) return [3 /*break*/, 35];
                    reactionCollection.first().users.remove(userID_1);
                    currentPageIndex = msgEmbeds.length - 1;
                    messageEmbed = msgEmbeds[currentPageIndex];
                    return [4 /*yield*/, newMessage.edit(messageEmbed)];
                case 33:
                    _f.sent();
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 34:
                    _f.sent();
                    return [3 /*break*/, 41];
                case 35:
                    if (!(reactionCollection.first().emoji.name === '✅')) return [3 /*break*/, 41];
                    reactionCollection.first().users.remove(userID_1);
                    _e = {
                        addedBy: commandData.guildMember.user.id,
                        name: finalSearchResultItems[currentPageIndex].title,
                        thumbnailURL: finalSearchResultItems[currentPageIndex].bestThumbnail.url
                    };
                    return [4 /*yield*/, ytdl.getInfo(finalSearchResultItems[currentPageIndex].id)];
                case 36:
                    newSong = (_e.url = (_f.sent()).videoDetails.video_url,
                        _e.id = finalSearchResultItems[currentPageIndex].id,
                        _e);
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 37:
                    _f.sent();
                    guildData.playlist.songs.push(newSong);
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.voiceChannel = voiceChannel;
                    guildData.playlist.volume = 5;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 38:
                    _f.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Song Added To Playlist:**__')
                        .setThumbnail(newSong.thumbnailURL)
                        .setDescription("__**New Song Added:**__ [" + newSong.name + "](" + newSong.url + ")\n__**Added By:**__ <@!" + newSong.addedBy + ">\n__**Position In Queue:**__ " + guildData.playlist.songs.length);
                    return [4 /*yield*/, newMessage.edit(msgEmbed)];
                case 39:
                    _f.sent();
                    return [4 /*yield*/, newMessage.reactions.removeAll()];
                case 40:
                    _f.sent();
                    return [3 /*break*/, 42];
                case 41:
                    x;
                    return [3 /*break*/, 20];
                case 42: return [4 /*yield*/, voiceChannel.join()];
                case 43:
                    connection = _f.sent();
                    return [4 /*yield*/, playSongs(guildData, commandData, connection, discordUser)];
                case 44:
                    _f.sent();
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 45:
                    _f.sent();
                    return [3 /*break*/, 53];
                case 46:
                    if (!(commandData.args[0] === undefined || commandData.args[0] === '')) return [3 /*break*/, 53];
                    return [4 /*yield*/, voiceChannel.join()];
                case 47:
                    connection = _f.sent();
                    if (!(connection.dispatcher !== null)) return [3 /*break*/, 50];
                    msgString = "------\n__**We're already playing music!**__\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Already Playing:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 48:
                    newMessage = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage.delete({ timeout: 20000 })];
                case 49:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 50:
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.voiceChannel = voiceChannel;
                    guildData.playlist.volume = 5;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 51:
                    _f.sent();
                    playSongs(guildData, commandData, connection, discordUser);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 52:
                    _f.sent();
                    _f.label = 53;
                case 53: return [2 /*return*/, commandReturnData];
                case 54:
                    error_2 = _f.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 55: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
