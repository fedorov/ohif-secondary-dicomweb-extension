# GCP Extension 
This extension adds the following functionalities to your OHIF viewer fork:
- Load a study and merge results from a GCP healthcare URL e.g. http://localhost:3000/viewer?StudyInstanceuID=123&gcp=projects/your-project/locations/us-west1/datasets/annotations/dicomStores/annotations

## Adding the extension to your OHIF fork
1. Update OHIF's app package.json file to include this extension as a dependency, pointing to a branch since this extension is not being published to NPM:
```js
/** File: platform/app/package.json */

"dependencies": {
  "ohif-gcp-mode": "https://github.com/ImagingDataCommons/ohif-gcp-extension#main", /** You can use any valid branch name here (#main or #master or #your-branch) */
  ...
```

2. Update OHIF's plugin file to load this extension:
```js
/** File: platform/app/pluginConfig.json */

"extensions": [
  ...
  {
    "packageName": "ohif-gcp-extension"
  },
 ...
```

