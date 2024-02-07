import { id } from './id';

/**
 * You can remove any of the following modules if you don't need them.
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id,
  /**
   * DataSourceModule should provide a list of data sources to be used in OHIF.
   * DataSources can be used to map the external data formats to the OHIF's
   * native format. DataSources are defined by an object of { name, type, createDataSource }.
   */
  preRegistration: ({ extensionManager, appConfig }) => {
    const GCP_DATA_SOURCE_NAME = "gcp";

    extensionManager.addDataSource({
      friendlyName: "GCP DICOMWeb Data Source From Query Params",
      namespace: "@ohif/extension-default.dataSourcesModule.dicomweb",
      sourceName: GCP_DATA_SOURCE_NAME,
      configuration: {
        name: GCP_DATA_SOURCE_NAME,
        qidoSupportsIncludeField: false,
        imageRendering: "wadors",
        thumbnailRendering: "wadors",
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: false,
        singlepart: "bulkdata,video,pdf",
        useBulkDataURI: false,
        onConfiguration: (dicomWebConfig, options) => {
          const extractParams = (url) => ({
            project: url.split("projects/")[1].split("/")[0],
            location: url.split("locations/")[1].split("/")[0],
            dataset: url.split("datasets/")[1].split("/")[0],
            dicomStore: url.split("dicomStores/")[1].split("/")[0],
          });
          const { query } = options;
          const gcp = query.get(GCP_DATA_SOURCE_NAME);
          if (gcp) {
            const { project, location, dataset, dicomStore } =
              extractParams(gcp);
            const pathUrl = `https://healthcare.googleapis.com/v1/projects/${project}/locations/${location}/datasets/${dataset}/dicomStores/${dicomStore}/dicomWeb`;
            return {
              ...dicomWebConfig,
              wadoRoot: pathUrl,
              qidoRoot: pathUrl,
              wadoUri: pathUrl,
              wadoUriRoot: pathUrl,
              qidoSupportsIncludeField: false,
              imageRendering: "wadors",
              thumbnailRendering: "wadors",
              enableStudyLazyLoad: true,
              supportsFuzzyMatching: false,
              supportsWildcard: false,
              singlepart: "bulkdata,video,pdf",
              useBulkDataURI: false,
              bulkDataURI: undefined,
            };
          }
        },
      },
    });

    const defaultDataSourceName = appConfig.defaultDataSourceName;

    let redirectURL = sessionStorage.getItem("ohif-redirect-to");
    redirectURL = redirectURL ? JSON.parse(redirectURL) : null;
    const redirectQueryParams = new URLSearchParams(redirectURL?.search);

    const query = new URLSearchParams(window.location.search);
    const gcpURLFromQueryParam = query.get(GCP_DATA_SOURCE_NAME) || redirectQueryParams.get(GCP_DATA_SOURCE_NAME)
    if (gcpURLFromQueryParam) {
      console.debug('gcp-extension-merge');
      extensionManager.addDataSource(
        {
          sourceName: "gcp-extension-merge",
          namespace: "@ohif/extension-default.dataSourcesModule.merge",
          configuration: {
            name: "gcp-extension-merge",
            friendlyName: "GCP Merge Data Source",
            seriesMerge: {
              dataSourceNames: [defaultDataSourceName, GCP_DATA_SOURCE_NAME],
              defaultDataSourceName: defaultDataSourceName,
            },
          },
        },
        { activate: true }
      );
    }
  },
};
