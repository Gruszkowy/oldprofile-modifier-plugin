"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@salesforce/command");
const core_1 = require("@salesforce/core");
const edit_1 = require("../../../shared/edit");
const util_1 = require("../../../shared/util");
core_1.Messages.importMessagesDirectory(__dirname);
const messages = core_1.Messages.loadMessages('oldprofile-modifier-plugin', 'page');
class Edit extends command_1.SfdxCommand {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const name = this.flags.name;
            const rename = this.flags.rename;
            const profiles = this.flags.profile;
            const enabled = this.flags.enabled || false;
            const alphabetize = this.flags.alphabetize || false;
            this.ux.startSpinner('Modifying profiles');
            const filesModified = yield (0, edit_1.editInProfiles)((0, util_1.getFileNames)(profiles), name, rename, enabled, '', 'page', alphabetize);
            this.ux.stopSpinner('Done');
            this.ux.styledHeader('Pages edited in profiles');
            this.ux.table((0, util_1.getDataForDisplay)(filesModified, 'edit', 'page'), ['Action', 'MetadataType', 'ProjectFile']);
            return {};
        });
    }
}
exports.default = Edit;
Edit.description = messages.getMessage('editCommandDescription');
Edit.examples = [
    '$ sfdx profile:page:edit --name MyPage --rename YourPage --profile "Admin" --enabled',
    '$ sfdx profile:page:edit --name MyPage --rename YourPage --enabled'
];
Edit.flagsConfig = {
    name: command_1.flags.string({
        char: 'n',
        required: true,
        description: messages.getMessage('nameFlagDescription')
    }),
    rename: command_1.flags.string({
        char: 'r',
        description: messages.getMessage('renameFlagDescription')
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
Edit.requiresProject = false;
//# sourceMappingURL=edit.js.map