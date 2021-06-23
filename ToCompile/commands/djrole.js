// djrole.ts - Module for my "dj role" command.
// Mar 18, 2021
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
    name: 'djrole',
    description: '__**DJ Role Usage:**__ !djrole = create, rolename, rolehexcolorvalue, OR !djrole = add, @ROLEMENTION, or !djrole = remove',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData, whatAreWeDoing, hexColorValue, roleName, roleID, msgString, msgEmbed, msg, rolementionRegExp, roleIDRegExp, msgString, msgEmbed, msg, argOne, argTwo, msgString, msgEmbed, msg, argOne, roleManager, currentRole, msgString, msgEmbed, msgString_1, msgEmbed_1, msg, rolePermStrings, roleManager, role, msgString, msgEmbed, roleManager, currentRole, msgString_2, msgEmbed_2, msg, msgString, msgEmbed, msgString_3, msgEmbed_3, msg, roleManager, currentRole, msgString, msgEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 45, , 46]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPerms = _a.sent();
                    if (!doWeHaveAdminPerms) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    whatAreWeDoing = void 0;
                    hexColorValue = void 0;
                    roleName = void 0;
                    roleID = void 0;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 16];
                case 4:
                    if (!(commandData.args[0] !== undefined)) return [3 /*break*/, 16];
                    if (!(commandData.args[0].toLowerCase() !== 'create' && commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove')) return [3 /*break*/, 7];
                    msgString = "------\n**Please, enter a proper first argument! (!djrole = create, rolename, rolehexcolorvalue, OR !djrole = add, @ROLEMENTION, or !djrole = remove, @ROLEMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    rolementionRegExp = /<@&\d{18}>/;
                    roleIDRegExp = /\d{18}/;
                    if (!(commandData.args[0].toLowerCase() === 'create')) return [3 /*break*/, 11];
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 10];
                    msgString = "------\n**Please, enter a role name!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    argOne = commandData.args[1];
                    roleName = argOne;
                    if (commandData.args[2] === undefined) {
                        hexColorValue = 'E00202';
                    }
                    else {
                        argTwo = commandData.args[2];
                        hexColorValue = argTwo;
                    }
                    whatAreWeDoing = 'create';
                    return [3 /*break*/, 16];
                case 11:
                    if (!(commandData.args[0].toLowerCase() === 'add')) return [3 /*break*/, 15];
                    if (!(!rolementionRegExp.test(commandData.args[1]) && !roleIDRegExp.test(commandData.args[1]))) return [3 /*break*/, 14];
                    msgString = "------\n**Please, enter a proper role mention!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 13:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 14:
                    argOne = commandData.args[1].match(roleIDRegExp)[0];
                    roleID = argOne;
                    whatAreWeDoing = 'add';
                    return [3 /*break*/, 16];
                case 15:
                    if (commandData.args[0].toLowerCase() === 'remove') {
                        whatAreWeDoing = 'remove';
                    }
                    _a.label = 16;
                case 16:
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 23];
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.djRoleID)];
                case 17:
                    currentRole = _a.sent();
                    msgString = '';
                    if (!(guildData.djRoleID === '')) return [3 /*break*/, 18];
                    msgString = '------\n__**DJ Role:**__ None!\n------';
                    return [3 /*break*/, 21];
                case 18:
                    if (!(currentRole === null)) return [3 /*break*/, 20];
                    msgString = '------\n__**DJ Role:**__ None!\n------';
                    guildData.djRoleID = '';
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 19:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 20:
                    msgString = "------\n__**DJ Role:**__ <@&" + guildData.djRoleID + ">\n------";
                    _a.label = 21;
                case 21:
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date.now())
                        .setTitle('__**DJ Role:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 22:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    if (!(whatAreWeDoing === 'create')) return [3 /*break*/, 30];
                    if (!(guildData.djRoleID !== '')) return [3 /*break*/, 26];
                    msgString_1 = "------\n*Sorry, but there is already a DJ role that has been created!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 24:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 25:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 26:
                    rolePermStrings = [];
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
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                name: roleName,
                                color: hexColorValue,
                                permissions: rolePermStrings,
                                hoist: true,
                                mentionable: true,
                            },
                        })];
                case 27:
                    role = _a.sent();
                    guildData.djRoleID = role.id;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 28:
                    _a.sent();
                    msgString = "------\n__You've created a new DJ Role!__\n------\n__**New DJ Role:**__ <@&" + role.id + ">\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date.now())
                        .setTitle('__**DJ Role Created:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 29:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 30:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 37];
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(roleID)];
                case 31:
                    currentRole = _a.sent();
                    if (!(currentRole === null)) return [3 /*break*/, 34];
                    msgString_2 = "------\n**Sorry, but that is not apparently a role in this server!**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 32:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 33:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 34:
                    guildData.djRoleID = roleID;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 35:
                    _a.sent();
                    msgString = "------\n__You've added a new DJ Role!__\n------\n__**New DJ Role:**__ <@&" + roleID + ">\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date.now())
                        .setTitle('__**DJ Role Added:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 36:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 37:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 44];
                    if (!(guildData.djRoleID === '')) return [3 /*break*/, 40];
                    msgString_3 = "------\n**Sorry, but there is no DJ role to remove!**\n------";
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 38:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 39:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 40:
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.djRoleID)];
                case 41:
                    currentRole = _a.sent();
                    msgString = void 0;
                    if (currentRole === null) {
                        msgString = '------\n__You\'ve removed the DJ Role!__\n------\n__**Removed DJ Role:**__ DELETED\n------';
                    }
                    else {
                        msgString = "------\n__You've removed the DJ Role!__\n------\n__**Removed DJ Role:**__ " + currentRole.name + "\n------";
                    }
                    guildData.djRoleID = '';
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 42:
                    _a.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date.now())
                        .setTitle('__**DJ Role Removed:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 43:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 44: return [2 /*return*/, commandReturnData];
                case 45:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 46: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
