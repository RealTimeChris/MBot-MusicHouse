// skip.ts - Module for my "skip" command.
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
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'skip',
    description: '__**Skip Usage:**__ !skip, to skip the current song in the queue!',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, checkIfAllowedInChannel, guildData, doWeHaveControl, voiceChannel, msgString_1, msgEmbed_1, msg, permissions, msgString_2, msgEmbed_2, msg, msgString_3, msgEmbed_3, msg, connection, msgEmbed_4, msg, msgString, msgEmbed, newMessage, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 23, , 24]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _d.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    checkIfAllowedInChannel = _d.sent();
                    if (checkIfAllowedInChannel === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfWeHaveControl(commandData, guildData)];
                case 4:
                    doWeHaveControl = _d.sent();
                    if (!doWeHaveControl) {
                        return [2 /*return*/, commandReturnData];
                    }
                    voiceChannel = commandData.guildMember.voice.channel;
                    if (!!voiceChannel) return [3 /*break*/, 7];
                    msgString_1 = "------\n**You need to be in a voice channel to issue music commands!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Voice Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 5:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(guildData.playlist.voiceChannel === null)) return [3 /*break*/, 13];
                    return [4 /*yield*/, voiceChannel.join()];
                case 8:
                    _d.sent();
                    guildData.playlist.textChannel = commandData.fromTextChannel;
                    guildData.playlist.voiceChannel = voiceChannel;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 9:
                    _d.sent();
                    permissions = voiceChannel.permissionsFor(commandData.guild.client.user);
                    if (!(!permissions.has('CONNECT') || !permissions.has('SPEAK'))) return [3 /*break*/, 12];
                    msgString_2 = "------\n**I need the permissions to join and speak in your voice channel!**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issues:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 10:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 12: return [3 /*break*/, 16];
                case 13:
                    if (!(voiceChannel.id !== guildData.playlist.voiceChannel.id)) return [3 /*break*/, 16];
                    msgString_3 = "------\n**You need to be in the correct voice channel to issue music commands!**\n------";
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Voice Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 14:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 16: return [4 /*yield*/, voiceChannel.join()];
                case 17:
                    connection = _d.sent();
                    if (!(connection.dispatcher === null)) return [3 /*break*/, 20];
                    msgEmbed_4 = new Discord.MessageEmbed();
                    msgEmbed_4.
                        setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Skip Song Failure:**__')
                        .setDescription('------\n**There needs to be music playing for you to be able to skip!**\n------');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 18:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 19:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 20:
                    connection.dispatcher.end();
                    msgString = "------\n**We're skipping to the next song!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Song Skipping:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    newMessage = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage.delete({ timeout: 5000 })];
                case 22:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    error_1 = _d.sent();
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
