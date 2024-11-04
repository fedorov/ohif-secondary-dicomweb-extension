# GCP Extension for OHIF Viewer

The **GCP Extension** enhances the OHIF viewer, enabling seamless integration with Google Cloud Platform healthcare services for loading and merging imaging studies directly from GCP.

## Key Features

- **Load & Merge Studies**: Load studies and merge results from a GCP Healthcare URL.  
  - Example GCP URL:
    ```
    http://localhost:3000/viewer?StudyInstanceUIDs=123&gcp=projects/your-project/locations/us-west1/datasets/annotations/dicomStores/annotations
    ```

## How to Add the GCP Extension to Your OHIF Fork

### 1. Add GCP Extension as a Dependency

In the OHIF `package.json` file, include `ohif-gcp-extension` as a dependency. Since it’s not published to NPM, specify the GitHub repository URL and branch name.

```json
/** File: platform/app/package.json */
"dependencies": {
  "ohif-gcp-extension": "https://github.com/ImagingDataCommons/ohif-gcp-extension#main",
  ...
}
```

### 2. Update OHIF's plugin file to load this extension:
```js
/** File: platform/app/pluginConfig.json */

"extensions": [
  ...
  {
    "packageName": "ohif-gcp-extension"
  },
 ...
```


