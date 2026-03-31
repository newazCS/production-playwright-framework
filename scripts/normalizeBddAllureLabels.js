const fs = require('fs');
const path = require('path');

const allureDir = path.resolve(process.cwd(), 'allure-results');

if (!fs.existsSync(allureDir)) {
  console.log('[normalize-bdd-allure] allure-results directory not found. Skipping.');
  process.exit(0);
}

const files = fs
  .readdirSync(allureDir)
  .filter((file) => file.endsWith('-result.json'));

let updatedCount = 0;

for (const file of files) {
  const fullPath = path.join(allureDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  let data;
  try {
    data = JSON.parse(content);
  } catch (error) {
    continue;
  }

  if (!Array.isArray(data.labels)) {
    continue;
  }

  const isCucumber = data.labels.some(
    (label) => label.name === 'framework' && label.value === 'cucumberjs'
  );

  if (!isCucumber) {
    continue;
  }

  const currentFeatureLabel = data.labels.find((label) => label.name === 'feature');
  const currentFeatureValue = currentFeatureLabel ? currentFeatureLabel.value : '';

  data.labels = data.labels.filter((label) => label.name !== 'feature');
  data.labels.push({ name: 'feature', value: 'BDD' });

  const hasStory = data.labels.some((label) => label.name === 'story');
  if (!hasStory && currentFeatureValue) {
    data.labels.push({ name: 'story', value: currentFeatureValue });
  }

  const hasParentSuite = data.labels.some((label) => label.name === 'parentSuite');
  if (!hasParentSuite) {
    data.labels.push({ name: 'parentSuite', value: 'BDD' });
  }

  const hasSuite = data.labels.some((label) => label.name === 'suite');
  if (!hasSuite) {
    data.labels.push({ name: 'suite', value: 'Cucumber' });
  }

  fs.writeFileSync(fullPath, JSON.stringify(data));
  updatedCount += 1;
}

console.log(`[normalize-bdd-allure] Updated ${updatedCount} Cucumber result file(s).`);
