import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { editInProfiles } from '../../../shared/edit';
import { getDataForDisplay, getFileNames } from '../../../shared/util';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('profile-modifier-plugin', 'class');
export default class Edit extends SfdxCommand {

  public static description = messages.getMessage('editCommandDescription');

  public static examples = [
    '$ sfdx profile:class:edit --name MyClass --rename YourClass --profile "Admin" --enabled',
    '$ sfdx profile:class:edit --name MyClass --rename YourClass --enabled'
  ];

  protected static flagsConfig = {
    name: flags.string({
      char: 'n',
      required: true,
      description: messages.getMessage('nameFlagDescription')
    }),
    rename: flags.string({
      char: 'r',
      description: messages.getMessage('renameFlagDescription')
    }),
    profile: flags.array({
      char: 'p',
      description: messages.getMessage('profileNameFlagDescription')
    }),
    enabled: flags.boolean({
      char: 'e',
      description: messages.getMessage('enabledFlagDescription')
    }),
    alphabetize: flags.boolean({
      char: 'a',
      description: messages.getMessage('alphabetizeFlagDescription')
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const name = this.flags.name;
    const rename = this.flags.rename;
    const profiles = this.flags.profile;
    const enabled = this.flags.enabled || false;
    const alphabetize = this.flags.alphabetize || false;

    this.ux.startSpinner('Processing');

    const filesModified = await editInProfiles(getFileNames(profiles), name, rename, enabled, '', 'class', alphabetize);

    this.ux.stopSpinner('Done');

    this.ux.styledHeader('Classes edited in profiles');
    this.ux.table(getDataForDisplay(filesModified, 'edit', 'class'), ['Action', 'MetadataType', 'ProjectFile']);

    return {};
  }
}
