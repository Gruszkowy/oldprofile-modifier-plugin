"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@salesforce/command");
const core_1 = require("@salesforce/core");
const add_1 = require("../../../shared/add");
const util_1 = require("../../../shared/util");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.loadMessages('oldprofile-modifier-plugin', 'class');
class Add extends command_1.SfdxCommand {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const names = this.flags.name;
            const profiles = this.flags.profile;
            const enabled = this.flags.enabled || false;
            const alphabetize = this.flags.alphabetize || false;
            this.ux.startSpinner('Processing');
            const filesModified = yield add_1.addToProfiles(util_1.getFileNames(profiles), names, enabled, '', 'class', alphabetize);
            this.ux.stopSpinner('Done');
            this.ux.styledHeader('Classes added to profiles');
            this.ux.table(util_1.getDataForDisplay(filesModified, 'add', 'class'), ['Action', 'MetadataType', 'ProjectFile']);
            return {};
        });
    }
}
exports.default = Add;
Add.description = messages.getMessage('addCommandDescription');
Add.examples = [
    '$ sfdx profile:class:add --name MyClass --profile "Admin" --enabled',
    '$ sfdx profile:class:add --name MyClass --enabled'
];
Add.requiresProject = false;
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
    enabled: command_1.flags.boolean({
        char: 'e',
        description: messages.getMessage('enabledFlagDescription')
    }),
    alphabetize: command_1.flags.boolean({
        char: 'a',
        description: messages.getMessage('alphabetizeFlagDescription')
    })
};
//# sourceMappingURL=add.js.map