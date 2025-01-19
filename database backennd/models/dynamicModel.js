const mongoose = require("mongoose");

// Generic schema for service providers
const serviceProviderSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  category:{type:String,required:true},
  location:{type:String, requires:true},
  contact_number: { type: Number },
  
});

// Function to get a model for a specific event type (collection)
function getEventCollectionModel(eventType) {
  const collectionName = eventType.toLowerCase(); 
  console.log("Using collection:", collectionName);// Ensure consistency in collection naming
  return mongoose.model(collectionName, serviceProviderSchema, collectionName);
}


module.exports = getEventCollectionModel;
