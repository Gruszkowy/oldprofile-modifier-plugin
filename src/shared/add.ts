import fs = require('fs-extra');
import { formatMetadata, getParsed } from './util';

const addToProfiles = async (fileNames: string[], names: string[], enabled: boolean, permissions: string, type: string, alphabetize: boolean) => {
  const filesModified = [];
  for (const fileName of fileNames) {
    if (fs.existsSync(fileName)) {
      let json = '{}';

      json = await getParsed(await fs.readFile(fileName));

      switch (type) {
        case 'class':
          let classes: any[] = json['Profile']['classAccesses'];
          if (classes && !Array.isArray(classes)) {
            classes = [classes];
            json['Profile']['classAccesses'] = classes;
          }
          for (const name of names) {
            let existingClass;
            if (classes) {
              existingClass = classes.find(cls => cls.apexClass === name);
            } else {
              classes = [];
              json['Profile']['classAccesses'] = classes;
            }
            if (!existingClass) {
              const newClass = {
                apexClass: name,
                enabled: (enabled) ? 'true' : 'false'
              };
              let classesToSort: any[] = [...classes];
              classesToSort.push(newClass);
              classesToSort.sort((a, b) => (a['apexClass'] > b['apexClass']) ? 1 : -1);
              const previousItem: string = classesToSort[classesToSort.findIndex(x => x['apexClass'] === name) - 1].apexClass;
              const index: number = classes.findIndex(item => item['apexClass'] === previousItem) + 1;
              classes.splice(index, 0, newClass);
            }
          }
          if (alphabetize) {
            classes.sort((a, b) => (a['apexClass'] > b['apexClass']) ? 1 : -1);
          }
          break;
        case 'field':
          let fields = json['Profile']['fieldPermissions'];
          if (fields && !Array.isArray(fields)) {
            fields = [fields];
            json['Profile']['fieldPermissions'] = fields;
          }
          for (const name of names) {
            let existingField;
            if (fields) {
              existingField = fields.find(cls => cls.field === name);
            } else {
              fields = [];
              json['Profile']['fieldPermissions'] = fields;
            }
            if (!existingField) {
              const newField = {
                editable: (!permissions || permissions.indexOf('e') !== -1) ? 'true' : 'false',
                field: name,
                readable: (!permissions || permissions.indexOf('r') !== -1) ? 'true' : 'false'
              };
              let fieldsToSort: any[] = [...fields];
              fieldsToSort.push(newField);
              fieldsToSort.sort((a, b) => (a['field'] > b['field']) ? 1 : -1);
              const previousItem: string = fieldsToSort[fieldsToSort.findIndex(x => x['field'] === name) - 1].field;
              const index: number = fields.findIndex(item => item['field'] === previousItem) + 1;
              fields.splice(index, 0, newField);
            }
          }
          if (alphabetize) {
            fields.sort((a, b) => (a['field'] > b['field']) ? 1 : -1);
          }
          break;
        case 'object':
          let objects = json['Profile']['objectPermissions'];
          if (objects && !Array.isArray(objects)) {
            objects = [objects];
            json['Profile']['objectPermissions'] = objects;
          }
          for (const name of names) {
            let existingObject;
            if (objects) {
              existingObject = objects.find(cls => cls.object === name);
            } else {
              objects = [];
              json['Profile']['objectPermissions'] = objects;
            }
            if (!existingObject) {
              const newObject = {
                allowCreate: (!permissions || permissions.indexOf('c') !== -1) ? 'true' : 'false',
                allowDelete: (!permissions || permissions.indexOf('d') !== -1) ? 'true' : 'false',
                allowEdit: (!permissions || permissions.indexOf('e') !== -1) ? 'true' : 'false',
                allowRead: (!permissions || permissions.indexOf('r') !== -1) ? 'true' : 'false',
                modifyAllRecords: (!permissions || permissions.indexOf('m') !== -1) ? 'true' : 'false',
                object: name,
                viewAllRecords: (!permissions || permissions.indexOf('v') !== -1) ? 'true' : 'false'
              };
              let objectsToSort: any[] = [...objects];
              objectsToSort.push(newObject);
              objectsToSort.sort((a, b) => (a['object'] > b['object']) ? 1 : -1);
              const previousItem: string = objectsToSort[objectsToSort.findIndex(x => x['object'] === name) - 1].object;
              const index: number = objects.findIndex(item => item['object'] === previousItem) + 1;
              objects.splice(index, 0, newObject);
            }
          }
          if (alphabetize) {
            objects.sort((a, b) => (a['object'] > b['object']) ? 1 : -1);
          }
          break;
        case 'page':
          let pages = json['Profile']['pageAccesses'];
          if (pages && !Array.isArray(pages)) {
            pages = [pages];
            json['Profile']['pageAccesses'] = pages;
          }
          for (const name of names) {
            let existingPage;
            if (pages) {
              existingPage = pages.find(cls => cls.apexPage === name);
            } else {
              pages = [];
              json['Profile']['pageAccesses'] = pages;
            }
            if (!existingPage) {
              const newPage = {
                apexPage: name,
                enabled: (enabled) ? 'true' : 'false'
              };
              let pagesToSort: any[] = [...pages];
              pagesToSort.push(newPage);
              pagesToSort.sort((a, b) => (a['apexPage'] > b['apexPage']) ? 1 : -1);
              const previousItem: string = pagesToSort[pagesToSort.findIndex(x => x['apexPage'] === name) - 1].apexPage;
              const index: number = pages.findIndex(item => item['apexPage'] === previousItem) + 1;
              objects.splice(index, 0, newPage);
            }
          }
          if (alphabetize) {
            pages.sort((a, b) => (a['apexPage'] > b['apexPage']) ? 1 : -1);
          }
          break;
      }

      await fs.writeFile(fileName, formatMetadata(json, alphabetize), 'utf-8');

      filesModified.push(fileName);
    }
  }
  return filesModified;
};

export {
  addToProfiles
};
