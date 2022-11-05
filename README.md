# SFDX oldprofile-modifier-plugin
Thank you Sean for this awesome package! Original version of the package can be found here https://github.com/seanrussell/profile-modifier-plugin

A plugin for Salesforce DX CLI that provides ability to add, edit, and remove Apex Classes, Visualforce Pages, Objects, and Fields from profiles within Salesforce projects that are using older style of metadata file in the root of the project directory is required). 

## Setup

### **Install as plugin (Recommended approach for Installing)**

Install plugin using command : `sfdx plugins:install oldprofile-modifier-plugin`

### **Commands**

- [`sfdx oldprofile:class:add`](#sfdx-profileclassadd)
- [`sfdx oldprofile:class:delete`](#sfdx-profileclassdelete)
- [`sfdx oldprofile:class:edit`](#sfdx-profileclassedit)
- [`sfdx oldprofile:field:add`](#sfdx-profilefieldadd)
- [`sfdx oldprofile:field:delete`](#sfdx-profilefielddelete)
- [`sfdx oldprofile:field:edit`](#sfdx-profilefieldedit)
- [`sfdx oldprofile:object:add`](#sfdx-profileobjectadd)
- [`sfdx oldprofile:object:delete`](#sfdx-profiledobjectdelete)
- [`sfdx oldprofile:object:edit`](#sfdx-profileobjectedit)
- [`sfdx oldprofile:page:add`](#sfdx-profilepageadd)
- [`sfdx oldprofile:page:delete`](#sfdx-profilepagedelete)
- [`sfdx oldprofile:page:edit`](#sfdx-profilepageedit)

## `sfdx oldprofile:class:add`

Adds Apex class to profiles.

```
USAGE
  $ sfdx oldprofile:class:add

OPTIONS
  -n, --name=classname                  (required) the name of the Apex Class you want to add.

  -p, --profile=profilename             the name of the profile you want to add the class to. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the class will be added to all profiles in the path locations specified in your sfdx-project.json file.

  -e, --enabled                         [default: false] Enable Apex Class
  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:class:add --name MyClass --profile "Admin" --enabled
    $ sfdx oldprofile:class:add --name MyClass --enabled // Adds MyClass to all profiles
```

_See code: [src/commands/profile/class/add.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/class/add.ts)_

## `sfdx oldprofile:class:delete`

Removes Apex class from profiles.

```
USAGE
  $ sfdx oldprofile:class:delete

OPTIONS
  -n, --name=classname                  (required) the name of the Apex Class you want to remove.

  -p, --profile=profilename             the name of the profile you want to remove the class from. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the class will be removed from all profiles in the path locations specified in your sfdx-project.json file.

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:class:delete --name MyClass --profile "Admin" --enabled
    $ sfdx oldprofile:class:delete --name MyClass // Removes MyClass from all profiles
```

_See code: [src/commands/profile/class/delete.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/class/delete.ts)_

## `sfdx oldprofile:class:edit`

Edits an Apex class in profiles.

```
USAGE
  $ sfdx oldprofile:class:edit

OPTIONS
  -n, --name=classname                  (required) the name of the Apex Class you want to edit. Only one Apex Class name is allowed.

  -r --rename=renameclassname           the name of the Apex Class you want to rename the class specified in --name to

  -p, --profile=profilename             the name of the profile you want to edit the class in. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the class will be edited in all profiles in the path locations specified in your sfdx-project.json file.

  -e, --enabled                         [default: false] Enable Apex Class
  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:class:edit --name MyClass --rename YourClass --profile "Admin" --enabled',
    $ sfdx oldprofile:class:edit --name MyClass --rename YourClass --enabled // Edits MyClass in all profiles
```

_See code: [src/commands/profile/class/edit.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/class/edit.ts)_

## `sfdx oldprofile:field:add`

Adds field to profiles.

```
USAGE
  $ sfdx oldprofile:field:add

OPTIONS
  -n, --name=fieldname                  (required) the name of the field you want to add. This should be a field name prefixed with the object name and separated by a dot.

  -p, --profile=profilename             the name of the profile you want to add the field to. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the field will be added to all profiles in the path locations specified in your sfdx-project.json file.

  -m, --permissions                     the permissions to assign the field: 'e' for editable and 'r' for readable

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:field:add --name MyField --profile "Admin" --permissions re'
    $ sfdx oldprofile:field:add --name MyField --permissions re // Adds MyField to all profiles with both editable and readable set to true
```

_See code: [src/commands/profile/field/add.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/field/add.ts)_

## `sfdx oldprofile:field:delete`

Removes Apex class from profiles.

```
USAGE
  $ sfdx oldprofile:field:delete

OPTIONS
  -n, --name=fieldname                  (required) the name of the field you want to remove.

  -p, --profile=profilename             the name of the profile you want to remove the field from. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the field will be removed from all profiles in the path locations specified in your sfdx-project.json file.

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:field:delete --name MyObject.MyField --profile "Admin" --enabled
    $ sfdx oldprofile:field:delete --name MyObject.MyField // Removes MyObject.MyField from all profiles
```

_See code: [src/commands/profile/field/delete.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/field/delete.ts)_

## `sfdx oldprofile:field:edit`

Edits a field in profiles.

```
USAGE
  $ sfdx oldprofile:field:edit

OPTIONS
  -n, --name=classname                  (required) the name of the field you want to edit. Only one field name is allowed.

  -r --rename=renamefieldname           the name of the field you want to rename the field specified in --name to

  -p, --profile=profilename             the name of the profile you want to edit the field in. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the field will be edited in all profiles in the path locations specified in your sfdx-project.json file.

  -m, --permissions                     the permissions to assign the field: 'e' for editable and 'r' for readable

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:field:edit --name MyObject.MyField --rename MyObject.YourField --profile "Admin" --permissions re',
    $ sfdx oldprofile:field:edit --name MyObject.MyField --rename MyObject.YourField --permissions re // Edits MyObject.MyField in all profiles
```

_See code: [src/commands/profile/field/edit.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/field/edit.ts)_

## `sfdx oldprofile:object:add`

Adds object to profiles.

```
USAGE
  $ sfdx oldprofile:object:add

OPTIONS
  -n, --name=objectname                 (required) the name of the object you want to add.

  -p, --profile=profilename             the name of the profile you want to add the object to. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the object will be added to all profiles in the path locations specified in your sfdx-project.json file.

  -m, --permissions                     the permissions to assign the object: 'c' for creatable, 'r' for readable, 'e' for editable, 'd' for deletable, 'm' for allow modify all, and 'v' for allow view all.

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file
  -f, --addfields                       add object fields in addition to object (will not include required fields or master detail fields with read and edit permissions)

EXAMPLES
    $ sfdx oldprofile:object:add --name MyObject --profile "Admin" --permissions credmv
    $ sfdx oldprofile:object:add --name MyObject --permissions credmv
```

_See code: [src/commands/profile/object/add.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/object/add.ts)_

## `sfdx oldprofile:object:delete`

Removes object from profiles.

```
USAGE
  $ sfdx oldprofile:object:delete

OPTIONS
  -n, --name=objectname                 (required) the name of the object you want to remove.

  -p, --profile=profilename             the name of the profile you want to remove the object from. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the object will be removed from all profiles in the path locations specified in your sfdx-project.json file.

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:object:delete --name MyObject --profile "Admin" --enabled
    $ sfdx oldprofile:object:delete --name MyObject // Removes MyObject from all profiles
```

_See code: [src/commands/profile/object/delete.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/object/delete.ts)_

## `sfdx oldprofile:object:edit`

Edits a object in profiles.

```
USAGE
  $ sfdx oldprofile:object:edit

OPTIONS
  -n, --name=objectname                 (required) the name of the object you want to edit. Only one object name is allowed.

  -r --rename=renameobjectname          the name of the object you want to rename the object specified in --name to

  -p, --profile=profilename             the name of the profile you want to edit the object in. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the object will be edited in all profiles in the path locations specified in your sfdx-project.json file.

  -m, --permissions                     the permissions to assign the object: 'c' for creatable, 'r' for readable, 'e' for editable, 'd' for deletable, 'm' for allow modify all, and 'v' for allow view all.

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:object:edit --name MyObject --rename MyObject --profile "Admin" --permissions credmv',
    $ sfdx oldprofile:object:edit --name MyObject --rename MyObject --permissions credmv // Edits MyObject in all profiles
```

_See code: [src/commands/profile/object/edit.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/object/edit.ts)_

## `sfdx oldprofile:page:add`

Adds Visualforce Page to profiles.

```
USAGE
  $ sfdx oldprofile:page:add

OPTIONS
  -n, --name=pagename                   (required) the name of the Visualforce Page you want to add.

  -p, --profile=profilename             the name of the profile you want to add the page to. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the page will be added to all profiles in the path locations specified in your sfdx-project.json file.

  -e, --enabled                         [default: false] Enable Visualforce Page

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:page:add --name MyPage --profile "Admin" --enabled
    $ sfdx oldprofile:page:add --name MyPage --enabled // Adds MyPage to all profiles
```

_See code: [src/commands/profile/page/add.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/page/add.ts)_

## `sfdx oldprofile:page:delete`

Removes Visualforce Page from profiles.

```
USAGE
  $ sfdx oldprofile:page:delete

OPTIONS
  -n, --name=pagename                   (required) the name of the Visualforce Page you want to remove.

  -p, --profile=profilename             the name of the profile you want to remove the page from. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the page will be removed from all profiles in the path locations specified in your sfdx-project.json file.

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:page:delete --name MyPage --profile "Admin" --enabled
    $ sfdx oldprofile:page:delete --name MyPage // Removes MyPage from all profiles
```

_See code: [src/commands/profile/page/delete.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/page/delete.ts)_

## `sfdx oldprofile:page:edit`

Edits a Visualforce Page in profiles.

```
USAGE
  $ sfdx oldprofile:page:edit

OPTIONS
  -n, --name=pagename                   (required) the name of the Visualforce Page you want to edit. Only one Visualforce Page name is allowed.

  -r --rename=renamepagename            the name of the Visualforce Page you want to rename the page specified in --name to

  -p, --profile=profilename             the name of the profile you want to edit the page in. This can be a comma separated list of profile names. Note: if a profile name has a space in the name, the name should be enclosed in quotes. If this flag is not specified, the assumption is that the page will be edited in all profiles in the path locations specified in your sfdx-project.json file.

  -e, --enabled                         [default: false] Enable Visualforce Page

  -a, --alphabetize                     [default: false] Alphabetize profile metadata file

EXAMPLES
    $ sfdx oldprofile:page:edit --name MyPage --rename YourPage --profile "Admin" --enabled',
    $ sfdx oldprofile:page:edit --name MyPage --rename YourPage --enabled // Edits MyPage in all profiles
```

_See code: [src/commands/profile/page/edit.ts](https://github.com/gruszkowy/profile-modifier-plugin/blob/main/src/commands/profile/page/edit.ts)_
