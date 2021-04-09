// playrn.ts - Module for my "play rn" command.
// Mar 11, 2021
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
    name: 'playrn',
    description: '__**Play Right Now Usage:**__ !playrn = SONGNAMETOSEARCH',
    function: Function()
};
/**
 * Plays the list of songs!
 */
function playSongs(guildData, commandData, connection, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var msgEmbed, vchannel, song_1, footerString_1, songOne, songOne, dispatcher, _c, _d, error_1, msgString, msgEmbed, msg;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, , 10]);
                    if (!(guildData.playlist.songs.length === 0 && guildData.playlist.currentSong.url === '')) return [3 /*break*/, 3];
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Empty Playlist:**__')
                        .setDescription('------\n**Sorry, but there are no songs left in the playlist/queue!**\n------');
                    vchannel = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.channels.resolve(guildData.playlist.voiceChannel.id);
                    vchannel.leave();
                    guildData.playlist.textChannel = null;
                    guildData.playlist.voiceChannel = null;
                    guildData.playlist.playNext = true;
                    guildData.playlist.currentSong = { name: '', addedBy: '', url: '', thumbnailURL: '', id: '' };
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 2:
                    _e.sent();
                    return [2 /*return*/];
                case 3:
                    if (!(guildData.playlist.playNext === true)) return [3 /*break*/, 5];
                    footerString_1 = '';
                    if (guildData.playlist.loopSong === true) {
                        songOne = void 0;
                        if (guildData.playlist.currentSong.url === '') {
                            songOne = guildData.playlist.songs.shift();
                        }
                        else {
                            songOne = guildData.playlist.currentSong;
                        }
                        song_1 = songOne;
                        footerString_1 = 'Looping of the current song is enabled!';
                    }
                    else if (guildData.playlist.loopAll === true) {
                        songOne = void 0;
                        if (guildData.playlist.songs.length === 0 && guildData.playlist.currentSong.url !== '') {
                            songOne = guildData.playlist.currentSong;
                        }
                        else if (guildData.playlist.currentSong.url === '') {
                            songOne = guildData.playlist.songs.shift();
                        }
                        else if (guildData.playlist.songs.length > 0) {
                            songOne = guildData.playlist.songs.shift();
                        }
                        song_1 = songOne;
                        footerString_1 = 'Looping of the current playlist is enabled!';
                    }
                    else {
                        song_1 = guildData.playlist.songs.shift();
                    }
                    guildData.playlist.currentSong = song_1;
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
                                        .setDescription("__**Title:**__ [" + song_1.name + "](" + song_1.url + ")\n__**Added By:**__ <@!" + song_1.addedBy + ">\n__**Songs Remaining In Queue:**__ " + guildData.playlist.songs.length)
                                        .setImage(song_1.thumbnailURL);
                                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                                case 1:
                                    _a.sent();
                                    guildData.playlist.playNext = false;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('finish', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, guildData.getFromDataBase()];
                                case 1:
                                    _a.sent();
                                    guildData.playlist.playNext = true;
                                    if (guildData.playlist.loopAll === true && guildData.playlist.loopSong === false) {
                                        guildData.playlist.songs.push(guildData.playlist.currentSong);
                                    }
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 2:
                                    _a.sent();
                                    playSongs(guildData, commandData, connection, discordUser);
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .on('error', function (error) { return __awaiter(_this, void 0, void 0, function () {
                        var msgString, msgEmbed, msg;
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
                                    msg = _a.sent();
                                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                                    }
                                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    dispatcher.setVolumeLogarithmic(guildData.playlist.volume / 5);
                    _e.label = 5;
                case 5:
                    guildData.playlist.playNext = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 6:
                    _e.sent();
                    return [2 /*return*/];
                case 7:
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
                case 8:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _e.sent();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function execute(commandData, discordUser) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, checkIfAllowedInChannel, guildData, doWeHaveControl, voiceChannel, msgString, msgEmbed, msg, permissions, msgString, msgEmbed, msg, msgString, msgEmbed, msg, guildMember, searchResults, finalSearchResultItems, x, newSong, msgEmbed, connection, connection, msgString, msgEmbed, newMessage, error_2;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 32, , 33]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _e.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    checkIfAllowedInChannel = _e.sent();
                    if (!checkIfAllowedInChannel) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfWeHaveControl(commandData, guildData)];
                case 4:
                    doWeHaveControl = _e.sent();
                    if (!doWeHaveControl) {
                        return [2 /*return*/, commandReturnData];
                    }
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
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(guildData.playlist.voiceChannel === null)) return [3 /*break*/, 13];
                    return [4 /*yield*/, voiceChannel.join()];
                case 8:
                    _e.sent();
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.voiceChannel = voiceChannel;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 9:
                    _e.sent();
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
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _e.sent();
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
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 16: return [4 /*yield*/, ((_c = commandData.guild) === null || _c === void 0 ? void 0 : _c.members.fetch(commandData.guild.client.user.id))];
                case 17:
                    guildMember = _e.sent();
                    guildMember === null || guildMember === void 0 ? void 0 : guildMember.voice.setSelfDeaf(true);
                    if (!(commandData.args[0] !== undefined && commandData.args[0] !== '')) return [3 /*break*/, 24];
                    return [4 /*yield*/, ytsr(commandData.args[0])];
                case 18:
                    searchResults = _e.sent();
                    finalSearchResultItems = [];
                    for (x = 0; x < searchResults.items.length; x += 1) {
                        if (searchResults.items[x].type === 'video') {
                            finalSearchResultItems.push(searchResults.items[x]);
                        }
                        else {
                            continue;
                        }
                    }
                    _d = {
                        addedBy: commandData.guildMember.user.id,
                        name: finalSearchResultItems[0].title,
                        thumbnailURL: finalSearchResultItems[0].bestThumbnail.url
                    };
                    return [4 /*yield*/, ytdl.getInfo(finalSearchResultItems[0].id)];
                case 19:
                    newSong = (_d.url = (_e.sent()).videoDetails.video_url,
                        _d.id = finalSearchResultItems[0].id,
                        _d);
                    guildData.playlist.voiceChannel = voiceChannel;
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.songs.push(newSong);
                    guildData.playlist.volume = 5;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 20:
                    _e.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Song Added To Playlist:**__')
                        .setThumbnail(newSong.thumbnailURL)
                        .setDescription("__**New Song Added:**__ [" + newSong.name + "](" + newSong.url + ")\n__**Added By:**__ <@!" + newSong.addedBy + ">\n__**Position In Queue:**__ " + guildData.playlist.songs.length);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    _e.sent();
                    return [4 /*yield*/, voiceChannel.join()];
                case 22:
                    connection = _e.sent();
                    playSongs(guildData, commandData, connection, discordUser);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 23:
                    _e.sent();
                    return [3 /*break*/, 31];
                case 24:
                    if (!(commandData.args[0] === undefined || commandData.args[0] === '')) return [3 /*break*/, 31];
                    return [4 /*yield*/, voiceChannel.join()];
                case 25:
                    connection = _e.sent();
                    if (!(connection.dispatcher !== null)) return [3 /*break*/, 28];
                    msgString = "------\n__**We're already playing music!**__\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Already Playing:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 26:
                    newMessage = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage.delete({ timeout: 20000 })];
                case 27:
                    _e.sent();
                    _e.label = 28;
                case 28:
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.voiceChannel = voiceChannel;
                    guildData.playlist.volume = 5;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 29:
                    _e.sent();
                    playSongs(guildData, commandData, connection, discordUser);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 30:
                    _e.sent();
                    _e.label = 31;
                case 31: return [2 /*return*/, commandReturnData];
                case 32:
                    error_2 = _e.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 33: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
