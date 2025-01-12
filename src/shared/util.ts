import * as fs from 'fs-extra';
import * as path from 'path';
const format = require('xml-formatter');
import * as xml2js from 'xml2js';

const FILE_SUFFIX = '.profile';

const readFiles = directory => {
  const files = [];
  if (fs.existsSync(directory)) {
    console.log(directory);
    const filesRead = fs.readdirSync(directory).filter(f => path.extname(f) === '.profile');
    for (const fileRead of filesRead) {
      files.push(`${directory}${fileRead}`);
    }
  }
  console.log(files);
  return files;
};

const getFileNames = (profiles) => {
  const directory = './src/profiles/'
  if (profiles) {
    const profilePaths = [];
    for (const profile of profiles) {
      profilePaths.push((profile.endsWith(FILE_SUFFIX)) ? `${directory}${profile}` : `${directory}${profile}${FILE_SUFFIX}`);
    }
    return profilePaths;
  } else {
   return readFiles(directory);
  }
};

const getObjectFieldFileNames = async (directories) => {
  let fields: string[] = [];
  for (const directory of directories) {
    if (fs.existsSync(directory)) {
      const objName: string = directory.substring(directory.lastIndexOf("/") + 1, directory.indexOf(".object"))
      const json = await getParsed(await fs.readFile(directory));
      for (const field of json.CustomObject.fields) {
        if (field.type !== 'MasterDetail' && field.required === 'false') {
          fields.push(`${objName}.${field.fullName}`);
        }
      }
    }
  }
  return fields;
};

const getDataForDisplay = (filesModified, action, metadata) => {
  return filesModified.map(file => {
    return {
      Action: action,
      MetadataType: metadata,
      ProjectFile: file
    };
  });
};

const formatMetadata = (json, alphabetize: boolean) => {
  if (alphabetize) {
    json['Profile'] = Object.keys(json['Profile']).sort().reduce((obj, key) => {
        obj[key] = json['Profile'][key];
        return obj;
    }, {});
  }

  const builder = new xml2js.Builder({
    headless: true
  });

  const xml = builder.buildObject(json);

  const xmlDoc = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;

  const formattedXml = format(xmlDoc, {
      indentation: '    ',
      filter: node => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '\n'
  });

  return formattedXml;
};

// tslint:disable-next-line: no-any
const getParsed = async (xmlToParse, explicitArray = false): Promise<any> => {
  const p = new xml2js.Parser({ explicitArray });

  return new Promise((resolve, reject) => {
      // tslint:disable-next-line: no-any
      p.parseString(xmlToParse, (err, json: any) => {
          if (err) {
              reject(err);
          } else {
              resolve(json);
          }
      });
  });
};

export {
  getFileNames,
  getObjectFieldFileNames,
  getDataForDisplay,
  formatMetadata,
  getParsed
};