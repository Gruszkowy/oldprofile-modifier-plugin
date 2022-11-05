"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsed = exports.formatMetadata = exports.getDataForDisplay = exports.getObjectFieldFileNames = exports.getFileNames = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const path = tslib_1.__importStar(require("path"));
const format = require('xml-formatter');
const xml2js = tslib_1.__importStar(require("xml2js"));
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
    const directory = './src/profiles/';
    if (profiles) {
        const profilePaths = [];
        for (const profile of profiles) {
            profilePaths.push((profile.endsWith(FILE_SUFFIX)) ? `${directory}${profile}` : `${directory}${profile}${FILE_SUFFIX}`);
        }
        return profilePaths;
    }
    else {
        return readFiles(directory);
    }
};
exports.getFileNames = getFileNames;
const getObjectFieldFileNames = (directories) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let fields = [];
    for (const directory of directories) {
        if (fs.existsSync(directory)) {
            const objName = directory.substring(directory.lastIndexOf("/") + 1, directory.indexOf(".object"));
            const json = yield getParsed(yield fs.readFile(directory));
            for (const field of json.CustomObject.fields) {
                if (field.type !== 'MasterDetail' && field.required === 'false') {
                    fields.push(`${objName}.${field.fullName}`);
                }
            }
        }
    }
    return fields;
});
exports.getObjectFieldFileNames = getObjectFieldFileNames;
const getDataForDisplay = (filesModified, action, metadata) => {
    return filesModified.map(file => {
        return {
            Action: action,
            MetadataType: metadata,
            ProjectFile: file
        };
    });
};
exports.getDataForDisplay = getDataForDisplay;
const formatMetadata = (json, alphabetize) => {
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
exports.formatMetadata = formatMetadata;
// tslint:disable-next-line: no-any
const getParsed = (xmlToParse, explicitArray = false) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const p = new xml2js.Parser({ explicitArray });
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line: no-any
        p.parseString(xmlToParse, (err, json) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(json);
            }
        });
    });
});
exports.getParsed = getParsed;
//# sourceMappingURL=util.js.map