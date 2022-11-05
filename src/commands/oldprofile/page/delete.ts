import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { removeFromProfiles } from '../../../shared/delete';
import { getDataForDisplay, getFileNames } from '../../../shared/util';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('oldprofile-modifier-plugin', 'page');

export default class Delete extends SfdxCommand {

  public static description = messages.getMessage('deleteCommandDescription');

  public static examples = [
    '$ sfdx profile:page:delete --name MyPage --profile "Admin"',
    '$ sfdx profile:page:delete --name MyPage'
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

    const filesModified = await removeFromProfiles(getFileNames(profiles), names, 'page', alphabetize);

    this.ux.stopSpinner('Done');

    this.ux.styledHeader('Pages removed from profiles');
    this.ux.table(getDataForDisplay(filesModified, 'delete', 'page'), ['Action', 'MetadataType', 'ProjectFile']);

    return {};
  }
}
