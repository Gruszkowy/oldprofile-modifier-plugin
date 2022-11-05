import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { addToProfiles } from '../../../shared/add';
import { getDataForDisplay, getFileNames } from '../../../shared/util';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('oldprofile-modifier-plugin', 'page');

export default class Add extends SfdxCommand {

  public static description = messages.getMessage('addCommandDescription');

  public static examples = [
    '$ sfdx profile:page:add --name MyVfPage --profile "Admin" --enabled',
    '$ sfdx profile:page:add --name MyVfPage --enabled'
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
    enabled: flags.boolean({
      char: 'e',
      description: messages.getMessage('enabledFlagDescription')
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
    const enabled = this.flags.enabled || false;
    const alphabetize = this.flags.alphabetize || false;

    this.ux.startSpinner('Processing');

    const filesModified = await addToProfiles(getFileNames(profiles), names, enabled, '', 'page', alphabetize);

    this.ux.stopSpinner('Done');

    this.ux.styledHeader('Pages added to profiles');
    this.ux.table(getDataForDisplay(filesModified, 'add', 'page'), ['Action', 'MetadataType', 'ProjectFile']);

    return {};
  }
}
