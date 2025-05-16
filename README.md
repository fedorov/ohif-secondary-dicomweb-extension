# Secondary Unauthenticated DICOMWeb Extension for OHIF Viewer

This extension enhances the OHIF viewer enabling merging imaging study content from the DICOMweb endpoint specified as URL parameter.

## Key Features

- **Load & Merge Studies**: Load studies and merge results from the specified DICOMweb endpoint. 
  - Query param examples:
    ```
    # DICOMweb parameter URL
    http://localhost:3000/viewer?StudyInstanceUIDs=2.25.169909530366026741902094648458907485460&dicomweb=my_proxy.website/endpoint

    ```

## How to Add the Extension to Your OHIF Fork

### 1. Add GCP Extension as a Dependency

In the OHIF `package.json` file, include `ohif-gcp-extension` as a dependency. Since it’s not published to NPM, specify the GitHub repository URL and branch name.

```js
/** File: platform/app/package.json */

"dependencies": {
  "secondary-dicomweb-extension": "https://github.com/fedorov/ohif-secondary-dicomweb-extension#main",
  ...
}
```

### 2. Update OHIF's plugin file to load this extension:
```js
/** File: platform/app/pluginConfig.json */

"extensions": [
  ...
  {
    "packageName": "ohif-secondary-dicomweb-extension"
  },
 ...
```


