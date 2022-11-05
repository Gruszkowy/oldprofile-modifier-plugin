import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { editInProfiles } from '../../../shared/edit';
import { getDataForDisplay, getFileNames } from '../../../shared/util';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('oldprofile-modifier-plugin', 'object');

export default class Edit extends SfdxCommand {

  public static description = messages.getMessage('editCommandDescription');

  public static examples = [
    '$ sfdx profile:object:edit --name MyObject --rename YourObject --profile "Admin" --enabled',
    '$ sfdx profile:object:edit --name MyObject --rename YourObject --enabled'
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
    permissions: flags.string({
      char: 'm',
      description: messages.getMessage('permissionsFlagDescription')
    }),
    alphabetize: flags.boolean({
      char: 'a',
      description: messages.getMessage('alphabetizeFlagDescription')
    })
  };

  protected static requiresProject = false;


  public async run(): Promise<AnyJson> {
    const name = this.flags.name;
    const rename = this.flags.rename;
    const profiles = this.flags.profile;
    const permissions = this.flags.permissions;
    const alphabetize = this.flags.alphabetize || false;

    this.ux.startSpinner('Processing');

    const filesModified = await editInProfiles(getFileNames(profiles), name, rename, false, permissions, 'object', alphabetize);

    this.ux.stopSpinner('Done');

    this.ux.styledHeader('Objects edited in profiles');
    this.ux.table(getDataForDisplay(filesModified, 'edit', 'object'), ['Action', 'MetadataType', 'ProjectFile']);

    return {};
  }
}
