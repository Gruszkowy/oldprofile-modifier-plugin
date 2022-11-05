import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
export default class Add extends SfdxCommand {
    static description: string;
    static examples: string[];
    protected static requiresProject: boolean;
    protected static flagsConfig: {
        name: flags.Discriminated<flags.Array<string>>;
        profile: flags.Discriminated<flags.Array<string>>;
        enabled: flags.Discriminated<flags.Boolean<boolean>>;
        alphabetize: flags.Discriminated<flags.Boolean<boolean>>;
    };
    run(): Promise<AnyJson>;
}
