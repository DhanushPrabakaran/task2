const solr = require("solr-client");

// Create Solr client
const solrClient = solr.createClient({
  host: "localhost",
  port: "8983",
  core: "productcore", // Replace 'my_core' with your Solr core name
  path: "/solr",
});

module.exports = solrClient;
// Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
// require("log4js").getLogger("solr-node").level = "DEBUG";
