import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { addToProfiles } from '../../../shared/add';
import { getDataForDisplay, getFileNames, getObjectFieldFileNames } from '../../../shared/util';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('oldprofile-modifier-plugin', 'object');

export default class Add extends SfdxCommand {

  public static description = messages.getMessage('addCommandDescription');

  public static examples = [
    '$ sfdx profile:object:add --name MyObject --profile "Admin" --permissions cred',
    '$ sfdx profile:object:add --name MyObject --permissions cred'
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
    }),
    addfields: flags.boolean({
      char: 'f',
      description: messages.getMessage('addFieldsFlagDescription')
    })
  };

  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const names = this.flags.name;
    const profiles = this.flags.profile;
    const permissions = this.flags.permissions;
    const alphabetize = this.flags.alphabetize || false;
    const addfields = this.flags.addfields || false;

    this.ux.startSpinner('Processing');

    const fileNames = getFileNames(profiles);
    const filesModified = await addToProfiles(fileNames, names, false, permissions, 'object', alphabetize);

    if (!addfields) {
      this.ux.stopSpinner('Done');
      this.ux.styledHeader('Objects added to profiles');
      this.ux.table(getDataForDisplay(filesModified, 'add', 'object'), ['Action', 'MetadataType', 'ProjectFile']);
    } else {
      let objectsToValidate = [];

      for (const name of names) {
        objectsToValidate.push(`./src/objects/${name}.object`);
      }

      const fieldNames = await getObjectFieldFileNames(objectsToValidate);
      const filesModified = await addToProfiles(getFileNames(profiles), fieldNames, false, permissions, 'field', alphabetize);

      this.ux.stopSpinner('Done');
      this.ux.styledHeader('Objects and fields added to profiles');
      this.ux.table(getDataForDisplay(filesModified, 'add', 'object'), ['Action', 'MetadataType', 'ProjectFile']);
    }

    return {};
  }
}
