const Bundler = require('parcel-bundler');
const Path = require('path');

// Single entrypoint file location:
const onboardEntryFiles = Path.join(__dirname, './onboard/index.js');
// OR: Multiple files with globbing (can also be .js)
// const entryFiles = './src/*.js';
// OR: Multiple files in an array
// const entryFiles = ['./src/index.html', './some/other/directory/scripts.js'];
const popupEntryFiles = Path.join(__dirname, './popup/index.js');

// Bundler options
const onboardOptions = {
  outDir: './ext/onboard', // The out directory to put the build files in, defaults to dist
  outFile: 'onboard.js', // The name of the outputFile
};

// Bundler options
const popupOptions = {
  outDir: './ext/popup', // The out directory to put the build files in, defaults to dist
  outFile: 'popup.js', // The name of the outputFile
};

(async function() {
  // Initializes a bundler using the entrypoint location and options provided
  const onboard = new Bundler(onboardEntryFiles, onboardOptions);
  const popup = new Bundler(popupEntryFiles, popupOptions);

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const [popupBundle, onboardBundle] = [
    await onboard.bundle(),
    await popup.bundle(),
  ];
})();
