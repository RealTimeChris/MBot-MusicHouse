// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
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
var FoundationClasses_1 = __importDefault(require("./FoundationClasses"));
var GuildData_1 = __importDefault(require("./GuildData"));
var CommandIndex_1 = __importDefault(require("./CommandIndex"));
var IndexFunctions;
(function (IndexFunctions) {
    function onHeartBeat(client, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, discordUser.updateDataCacheAndSaveToFile(client)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onHeartBeat = onHeartBeat;
    function onReady(client, discordUser, eventEmitter) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, discordUser.initializeInstance(client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, client.user.setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } })];
                    case 2:
                        _a.sent();
                        eventEmitter.emit('HeartBeat');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onReady = onReady;
    function onMessage(msg, client, discordUser) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var command, args, x, commandData, cmdReturnData, error_3, error_4, command, cmdName, error_5, error_6;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (client.users.resolve(msg.author.id) === null) {
                            console.log('Non-found user! Better escape!');
                            return [2 /*return*/];
                        }
                        if (msg.author.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                            console.log('Better not track our own messages!');
                            return [2 /*return*/];
                        }
                        if (!msg.content.startsWith(discordUser.userData.prefix)) return [3 /*break*/, 13];
                        command = '';
                        args = [];
                        if (msg.content.indexOf(' =') === -1) {
                            command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0].trim().toLowerCase();
                        }
                        else {
                            command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                            args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                            for (x = 0; x < args.length; x += 1) {
                                args[x] = args[x].trim();
                            }
                        }
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 11, , 12]);
                        commandData = new FoundationClasses_1.default.CommandData();
                        if (!(msg.channel.type !== 'dm' && msg.member !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, (_b = msg.member) === null || _b === void 0 ? void 0 : _b.id, (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.id)];
                    case 2:
                        _g.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id)];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        commandData.args = args;
                        if (!msg.deletable) return [3 /*break*/, 7];
                        return [4 /*yield*/, msg.delete()];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        _g.trys.push([7, 9, , 10]);
                        console.log("Command: '" + command + "' entered by user: " + msg.author.username);
                        return [4 /*yield*/, ((_d = CommandIndex_1.default.get(command)) === null || _d === void 0 ? void 0 : _d.function(commandData, discordUser))];
                    case 8:
                        cmdReturnData = _g.sent();
                        console.log("Completed Command: " + cmdReturnData.commandName);
                        return [3 /*break*/, 10];
                    case 9:
                        error_3 = _g.sent();
                        console.log(error_3);
                        msg.reply('There was an error trying to execute that command!');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                    case 11:
                        error_4 = _g.sent();
                        console.log(error_4);
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 20];
                    case 13:
                        if (!(msg.author.id !== ((_e = client.user) === null || _e === void 0 ? void 0 : _e.id))) return [3 /*break*/, 20];
                        _g.label = 14;
                    case 14:
                        _g.trys.push([14, 19, , 20]);
                        command = 'message';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _g.label = 15;
                    case 15:
                        _g.trys.push([15, 17, , 18]);
                        console.log("Standard message entered: " + msg.author.username);
                        return [4 /*yield*/, ((_f = CommandIndex_1.default.get(command)) === null || _f === void 0 ? void 0 : _f.function(msg))];
                    case 16:
                        cmdName = _g.sent();
                        console.log("Completed Command: " + cmdName);
                        return [3 /*break*/, 18];
                    case 17:
                        error_5 = _g.sent();
                        console.log(error_5);
                        msg.reply('There was an error trying to process that message!');
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                    case 19:
                        error_6 = _g.sent();
                        console.log(error_6);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onMessage = onMessage;
    function onInteractionCreate(interaction, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var channel_id, channel, id_full, guild_id_full, options_full, name_full, commandData, id, guild_id, _b, options, name_1, id, guild_id, _c, options, name_2, name_3, nameSolid, value1, name_4, roleID, roleName, roleColor, value, areWeLooping, areWeLooping, songName, songName, redChannelValue, greenChannelValue, blueChannelValue, returnData, error_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 9, , 10]);
                        channel_id = interaction.channel_id;
                        return [4 /*yield*/, client.channels.fetch(channel_id)];
                    case 1:
                        channel = _d.sent();
                        id_full = void 0, guild_id_full = void 0, options_full = void 0, name_full = void 0;
                        commandData = new FoundationClasses_1.default.CommandData();
                        return [4 /*yield*/, channel.type];
                    case 2:
                        if (!((_d.sent()) === 'dm')) return [3 /*break*/, 4];
                        id = interaction.user.id, guild_id = interaction.guild_id, _b = interaction.data, options = _b.options, name_1 = _b.name;
                        id_full = id;
                        guild_id_full = guild_id;
                        options_full = options;
                        name_full = name_1;
                        return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        id = interaction.member.user.id, guild_id = interaction.guild_id, _c = interaction.data, options = _c.options, name_2 = _c.name;
                        id_full = id;
                        guild_id_full = guild_id;
                        options_full = options;
                        name_full = name_2;
                        return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        if (name_full === 'botinfo') {
                            name_3 = 'musichouse';
                            commandData.args[0] = name_3;
                        }
                        nameSolid = name_full;
                        if (name_full === 'clear') {
                        }
                        if (name_full === "deletedbentry") {
                            value1 = options_full[0].value;
                            commandData.args[0] = 'musichouse';
                            commandData.args[1] = value1;
                        }
                        if (name_full === "displayguildsdata") {
                            name_4 = 'musichouse';
                            commandData.args[0] = name_4;
                        }
                        if (name_full === 'djrole') {
                            name_full = options_full[0].name;
                            if (name_full === 'remove') {
                                commandData.args[0] = 'remove';
                            }
                            else if (name_full === 'display') {
                            }
                            else if (name_full === 'add') {
                                roleID = options_full[0].options[0].value;
                                commandData.args[0] = 'add';
                                commandData.args[1] = roleID;
                            }
                            else if (name_full === 'create') {
                                roleName = options_full[0].options[0].value;
                                roleColor = void 0;
                                if (options_full[0].options[1] !== undefined) {
                                    roleColor = options_full[0].options[1].value;
                                }
                                commandData.args[0] = 'create';
                                commandData.args[1] = roleName;
                                commandData.args[2] = roleColor;
                            }
                        }
                        if (name_full === 'editplaylist') {
                        }
                        if (name_full === 'help') {
                            if (options_full[0].options !== undefined) {
                                value = options_full[0].options[0].value;
                                commandData.args[0] = 'musichouse';
                                commandData.args[1] = value;
                            }
                        }
                        if (name_full === 'listdbguilds') {
                            commandData.args[0] = 'musichouse';
                        }
                        if (name_full === 'loop') {
                            areWeLooping = options_full[0].value;
                            commandData.args[0] = areWeLooping;
                        }
                        if (name_full === 'loopsong') {
                            areWeLooping = options_full[0].value;
                            commandData.args[0] = areWeLooping;
                        }
                        if (name_full === 'musichouseoptions') {
                        }
                        if (name_full == 'play') {
                            if (options_full !== undefined) {
                                songName = options_full[0].value;
                                commandData.args[0] = songName;
                            }
                        }
                        if (name_full === 'playrn') {
                            if (options_full !== undefined) {
                                songName = options_full[0].value;
                                commandData.args[0] = songName;
                            }
                        }
                        if (name_full === 'setbordercolor') {
                            commandData.args[0] = 'musichouse';
                            redChannelValue = options_full[0].value;
                            greenChannelValue = options_full[1].value;
                            blueChannelValue = options_full[2].value;
                            commandData.args[1] = redChannelValue.toString();
                            commandData.args[2] = greenChannelValue.toString();
                            commandData.args[3] = blueChannelValue.toString();
                        }
                        if (name_full === 'setmusicchannel') {
                            name_full = options_full[0].name;
                            if (name_full === 'add') {
                                commandData.args[0] = 'add';
                            }
                            else if (name_full === 'remove') {
                                commandData.args[0] = 'remove';
                            }
                            else if (name_full === 'display') {
                            }
                            else if (name_full === 'purge') {
                                commandData.args[0] = 'purge';
                            }
                        }
                        if (name_full === 'shuffle') {
                        }
                        if (name_full === 'skip') {
                        }
                        if (name_full === 'slashcommands') {
                        }
                        if (name_full === 'stop') {
                        }
                        if (name_full === 'test') {
                        }
                        return [4 /*yield*/, client.api.interactions(interaction.id, interaction.token).callback.post({
                                data: {
                                    type: 5
                                }
                            })];
                    case 7:
                        _d.sent();
                        if (commandData.guildMember instanceof Discord.GuildMember) {
                            console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.user.username);
                        }
                        else if (commandData.guildMember instanceof Discord.User) {
                            console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.username);
                        }
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(nameSolid)) === null || _a === void 0 ? void 0 : _a.function(commandData, discordUser))];
                    case 8:
                        returnData = _d.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [3 /*break*/, 10];
                    case 9:
                        error_7 = _d.sent();
                        console.log(error_7);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onInteractionCreate = onInteractionCreate;
    function onVoiceStatusUpdate(newVoiceState, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData_1, currentTextChannel_1, guildAuditLogs_1, auditLogsEntry_1, currentVoiceChannel, currentTextChannel, msgEmbed, newMsg, guildMember, error_8;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newVoiceState.guild.id, name: newVoiceState.guild.name, memberCount: newVoiceState.guild.memberCount });
                        return [4 /*yield*/, guildData_1.getFromDataBase()];
                    case 1:
                        _b.sent();
                        if (!(newVoiceState.member.id === discordUser.userData.userID && newVoiceState.channelID === null && guildData_1.playlist.textChannel !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, client.channels.fetch(guildData_1.playlist.textChannel.id)];
                    case 2:
                        currentTextChannel_1 = _b.sent();
                        return [4 /*yield*/, newVoiceState.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_DISCONNECT' })];
                    case 3:
                        guildAuditLogs_1 = _b.sent();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var msgEmbed;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        auditLogsEntry_1 = guildAuditLogs_1.entries.find(function (auditLogEntry) {
                                            return auditLogEntry.action === 'MEMBER_DISCONNECT' && Date.now() - auditLogEntry.createdTimestamp < 5000;
                                        });
                                        if (!(auditLogsEntry_1 !== undefined)) return [3 /*break*/, 2];
                                        msgEmbed = new Discord.MessageEmbed();
                                        msgEmbed
                                            .setColor(guildData_1.borderColor)
                                            .setDescription("------\n__**I've been kicked from the voice channel! Saving playlist and stopping!**__\n__**Kicked By:**__ <@!" + (auditLogsEntry_1 === null || auditLogsEntry_1 === void 0 ? void 0 : auditLogsEntry_1.executor.id) + "> (" + (auditLogsEntry_1 === null || auditLogsEntry_1 === void 0 ? void 0 : auditLogsEntry_1.executor.tag) + ")\n-----")
                                            .setTimestamp(Date.now())
                                            .setTitle('__**Kicked From Channel:**__')
                                            .setAuthor((_a = client.user) === null || _a === void 0 ? void 0 : _a.username, (_b = client.user) === null || _b === void 0 ? void 0 : _b.avatarURL());
                                        return [4 /*yield*/, currentTextChannel_1.send(msgEmbed)];
                                    case 1:
                                        _c.sent();
                                        _c.label = 2;
                                    case 2:
                                        if (guildData_1.playlist.loopAll === true || guildData_1.playlist.loopSong === true) {
                                            guildData_1.playlist.songs.unshift(guildData_1.playlist.currentSong);
                                        }
                                        guildData_1.playlist.voiceChannel = null;
                                        guildData_1.playlist.textChannel = null;
                                        guildData_1.playlist.playNext = true;
                                        guildData_1.playlist.currentSong = { name: '', id: '', url: '', thumbnailURL: '', addedBy: '' };
                                        return [4 /*yield*/, guildData_1.writeToDataBase()];
                                    case 3:
                                        _c.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 2000);
                        _b.label = 4;
                    case 4:
                        if (!(guildData_1.playlist.voiceChannel != null)) return [3 /*break*/, 10];
                        return [4 /*yield*/, client.channels.fetch(guildData_1.playlist.voiceChannel.id)];
                    case 5:
                        currentVoiceChannel = _b.sent();
                        if (!(currentVoiceChannel.members.size === 1 && currentVoiceChannel.members.first().id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id))) return [3 /*break*/, 10];
                        return [4 /*yield*/, client.channels.fetch(guildData_1.playlist.textChannel.id)];
                    case 6:
                        currentTextChannel = _b.sent();
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setColor(guildData_1.borderColor)
                            .setDescription('------\n__**Nobody left in the voice channel! Saving playlist and stopping!**__\n-----')
                            .setTimestamp(Date.now())
                            .setTitle('__**Empty Voice Channel:**__')
                            .setAuthor(client.user.username, client.user.avatarURL());
                        return [4 /*yield*/, currentTextChannel.send(msgEmbed)];
                    case 7:
                        newMsg = _b.sent();
                        currentVoiceChannel.leave();
                        if ((guildData_1.playlist.loopAll === true || guildData_1.playlist.loopSong === true) && guildData_1.playlist.currentSong.id !== '') {
                            guildData_1.playlist.songs.unshift(guildData_1.playlist.currentSong);
                        }
                        guildData_1.playlist.voiceChannel = null;
                        guildData_1.playlist.textChannel = null;
                        guildData_1.playlist.playNext = true;
                        guildData_1.playlist.currentSong = { name: '', id: '', url: '', thumbnailURL: '', addedBy: '' };
                        return [4 /*yield*/, guildData_1.writeToDataBase()];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, newMsg.delete({ timeout: 20000 })];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        if (newVoiceState.selfDeaf === false) {
                            guildMember = newVoiceState.member;
                            guildMember.voice.setSelfDeaf(true);
                        }
                        return [3 /*break*/, 12];
                    case 11:
                        error_8 = _b.sent();
                        console.log(error_8);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onVoiceStatusUpdate = onVoiceStatusUpdate;
})(IndexFunctions || (IndexFunctions = {}));
exports.default = IndexFunctions;
