import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { addToProfiles } from '../../../shared/add';
import { getDataForDisplay, getFileNames } from '../../../shared/util';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('oldprofile-modifier-plugin', 'field');

export default class Add extends SfdxCommand {

  public static description = messages.getMessage('addCommandDescription');

  public static examples = [
    '$ sfdx profile:field:add --name MyField --profile "Admin" --permissions re',
    '$ sfdx profile:field:add --name MyField --permissions re'
  ];

  protected static flagsConfig = {
    name: flags.array({
      char: 'n',
      required: true,
      description: messages.getMessage('nameFlagDescription')
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
    const names = this.flags.name;
    const profiles = this.flags.profile;
    const permissions = this.flags.permissions;
    const alphabetize = this.flags.alphabetize || false;

    this.ux.startSpinner('Processing');

    const filesModified = await addToProfiles(getFileNames(profiles), names, false, permissions, 'field', alphabetize);
    console.log(filesModified);
    this.ux.stopSpinner('Done');

    this.ux.styledHeader('Fields added to profiles');
    this.ux.table(getDataForDisplay(filesModified, 'add', 'field'), ['Action', 'MetadataType', 'ProjectFile']);

    return {};
  }
}
