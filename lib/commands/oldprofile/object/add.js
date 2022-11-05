"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@salesforce/command");
const core_1 = require("@salesforce/core");
const add_1 = require("../../../shared/add");
const util_1 = require("../../../shared/util");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.loadMessages('oldprofile-modifier-plugin', 'object');
class Add extends command_1.SfdxCommand {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const names = this.flags.name;
            const profiles = this.flags.profile;
            const permissions = this.flags.permissions;
            const alphabetize = this.flags.alphabetize || false;
            const addfields = this.flags.addfields || false;
            this.ux.startSpinner('Processing');
            const fileNames = util_1.getFileNames(profiles);
            const filesModified = yield add_1.addToProfiles(fileNames, names, false, permissions, 'object', alphabetize);
            if (!addfields) {
                this.ux.stopSpinner('Done');
                this.ux.styledHeader('Objects added to profiles');
                this.ux.table(util_1.getDataForDisplay(filesModified, 'add', 'object'), ['Action', 'MetadataType', 'ProjectFile']);
            }
            else {
                let objectsToValidate = [];
                for (const name of names) {
                    objectsToValidate.push(`./src/objects/${name}.object`);
                }
                const fieldNames = yield util_1.getObjectFieldFileNames(objectsToValidate);
                const filesModified = yield add_1.addToProfiles(util_1.getFileNames(profiles), fieldNames, false, permissions, 'field', alphabetize);
                this.ux.stopSpinner('Done');
                this.ux.styledHeader('Objects and fields added to profiles');
                this.ux.table(util_1.getDataForDisplay(filesModified, 'add', 'object'), ['Action', 'MetadataType', 'ProjectFile']);
            }
            return {};
        });
    }
}
exports.default = Add;
Add.description = messages.getMessage('addCommandDescription');
Add.examples = [
    '$ sfdx profile:object:add --name MyObject --profile "Admin" --permissions cred',
    '$ sfdx profile:object:add --name MyObject --permissions cred'
];
Add.flagsConfig = {
    name: command_1.flags.array({
        char: 'n',
        required: true,
        description: messages.getMessage('nameFlagDescription')
    }),
    profile: command_1.flags.array({
        char: 'p',
        description: messages.getMessage('profileNameFlagDescription')
    }),
    permissions: command_1.flags.string({
        char: 'm',
        description: messages.getMessage('permissionsFlagDescription')
    }),
    alphabetize: command_1.flags.boolean({
        char: 'a',
        description: messages.getMessage('alphabetizeFlagDescription')
    }),
    addfields: command_1.flags.boolean({
        char: 'f',
        description: messages.getMessage('addFieldsFlagDescription')
    })
};
Add.requiresProject = false;
//# sourceMappingURL=add.js.map