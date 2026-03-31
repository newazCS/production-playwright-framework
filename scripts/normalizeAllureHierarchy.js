const fs = require('fs');
const path = require('path');

const allureDir = path.resolve(process.cwd(), 'allure-results');

if (!fs.existsSync(allureDir)) {
  console.log('[normalize-allure] allure-results directory not found. Skipping.');
  process.exit(0);
}

function upsertLabel(labels, name, value) {
  const filtered = labels.filter((label) => label.name !== name);
  filtered.push({ name, value });
  return filtered;
}

function getLabelValue(labels, name) {
  const label = labels.find((item) => item.name === name);
  return label ? label.value : '';
}

function humanizePortalName(value) {
  const known = {
    sauceDemo: 'SauceDemo',
    automationExercise: 'Automation Exercise',
    samplePortal: 'Sample Portal',
    jsonplaceholder: 'JSONPlaceholder',
    reqres: 'ReqRes',
    greenKart: 'GreenKart'
  };

  if (known[value]) {
    return known[value];
  }

  return value
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizePlaywright(labels) {
  const packageValue = getLabelValue(labels, 'package');
  const storyValue = getLabelValue(labels, 'story');
  const currentSubSuite = getLabelValue(labels, 'subSuite');

  const parts = packageValue.split('.');
  const typeKey = parts[0] || '';
  const portalKey = parts[1] || '';

  const typeMap = {
    ui: 'UI',
    api: 'API',
    performance: 'Performance'
  };

  const parentSuite = typeMap[typeKey] || 'Tests';
  const suite = humanizePortalName(portalKey || parentSuite);
  const subSuite = storyValue || currentSubSuite || 'Spec';

  labels = upsertLabel(labels, 'parentSuite', parentSuite);
  labels = upsertLabel(labels, 'suite', suite);
  labels = upsertLabel(labels, 'subSuite', subSuite);
  labels = upsertLabel(labels, 'feature', parentSuite);

  return labels;
}

function normalizeCucumber(labels) {
  const packageValue = getLabelValue(labels, 'package');
  const storyValue = getLabelValue(labels, 'story');
  const currentFeature = getLabelValue(labels, 'feature');

  const match = packageValue.match(/tests\.bdd\.features\.([^.]+)/);
  const portalKey = match ? match[1] : 'bdd';
  const suite = humanizePortalName(portalKey);
  const subSuite = storyValue || currentFeature || 'Feature';

  labels = upsertLabel(labels, 'parentSuite', 'BDD');
  labels = upsertLabel(labels, 'suite', suite);
  labels = upsertLabel(labels, 'subSuite', subSuite);
  labels = upsertLabel(labels, 'feature', 'BDD');

  if (!storyValue && currentFeature && currentFeature !== 'BDD') {
    labels = upsertLabel(labels, 'story', currentFeature);
  }

  return labels;
}

const files = fs.readdirSync(allureDir).filter((file) => file.endsWith('-result.json'));
let updatedCount = 0;

for (const file of files) {
  const fullPath = path.join(allureDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    continue;
  }

  if (!Array.isArray(data.labels)) {
    continue;
  }

  const framework = getLabelValue(data.labels, 'framework');

  if (framework === 'playwright') {
    data.labels = normalizePlaywright(data.labels);
    fs.writeFileSync(fullPath, JSON.stringify(data));
    updatedCount += 1;
    continue;
  }

  if (framework === 'cucumberjs') {
    data.labels = normalizeCucumber(data.labels);
    fs.writeFileSync(fullPath, JSON.stringify(data));
    updatedCount += 1;
  }
}

console.log(`[normalize-allure] Updated ${updatedCount} result file(s).`);