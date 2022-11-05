import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { removeFromProfiles } from '../../../shared/delete';
import { getDataForDisplay, getFileNames } from '../../../shared/util';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('oldprofile-modifier-plugin', 'field');

export default class Delete extends SfdxCommand {

  public static description = messages.getMessage('deleteCommandDescription');

  public static examples = [
    '$ sfdx profile:field:delete --name MyField --profile "Admin"',
    '$ sfdx profile:field:delete --name MyField'
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
    alphabetize: flags.boolean({
      char: 'a',
      description: messages.getMessage('alphabetizeFlagDescription')
    })
  };

  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const names = this.flags.name;
    const profiles = this.flags.profile;
    const alphabetize = this.flags.alphabetize || false;

    this.ux.startSpinner('Processing');

    const filesModified = await removeFromProfiles(getFileNames(profiles), names, 'field', alphabetize);

    this.ux.stopSpinner('Done');

    this.ux.styledHeader('Fields removed from profiles');
    this.ux.table(getDataForDisplay(filesModified, 'delete', 'field'), ['Action', 'MetadataType', 'ProjectFile']);

    return {};
  }
}
