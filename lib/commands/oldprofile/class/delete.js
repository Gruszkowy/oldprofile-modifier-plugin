"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@salesforce/command");
const core_1 = require("@salesforce/core");
const delete_1 = require("../../../shared/delete");
const util_1 = require("../../../shared/util");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.loadMessages('oldprofile-modifier-plugin', 'class');
class Delete extends command_1.SfdxCommand {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const names = this.flags.name;
            const profiles = this.flags.profile;
            const alphabetize = this.flags.alphabetize || false;
            this.ux.startSpinner('Processing');
            const filesModified = yield delete_1.removeFromProfiles(util_1.getFileNames(profiles), names, 'class', alphabetize);
            this.ux.stopSpinner('Done');
            this.ux.styledHeader('Classes removed from profiles');
            this.ux.table(util_1.getDataForDisplay(filesModified, 'delete', 'class'), ['Action', 'MetadataType', 'ProjectFile']);
            return {};
        });
    }
}
exports.default = Delete;
Delete.description = messages.getMessage('deleteCommandDescription');
Delete.examples = [
    '$ sfdx profile:class:delete --name MyClass --profile "Admin"',
    '$ sfdx profile:class:delete --name MyClass'
];
Delete.flagsConfig = {
    name: command_1.flags.array({
        char: 'n',
        required: true,
        description: messages.getMessage('nameFlagDescription')
    }),
    profile: command_1.flags.array({
        char: 'p',
        description: messages.getMessage('profileNameFlagDescription')
    }),
    alphabetize: command_1.flags.boolean({
        char: 'a',
        description: messages.getMessage('alphabetizeFlagDescription')
    })
};
Delete.requiresProject = false;
//# sourceMappingURL=delete.js.map