/**
 * Cucumber configuration for BDD tests
 * 
 * This file configures how Cucumber runs feature files and step definitions
 */

module.exports = {
  default: {
    // Location of feature files
    require: ['tests/bdd/step-definitions/**/*.ts'],
    
    // Feature file paths
    paths: ['tests/bdd/features/**/*.feature'],
    
    // Format for output
    format: [
      'progress',
      'html:cucumber-report.html',
      'json:cucumber-report.json'
    ],
    
    // Parallel execution
    parallel: 1,
    
    // Retry failed scenarios
    retry: 0,
    
    // Random order
    order: 'random'
  }
};
