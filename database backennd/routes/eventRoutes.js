const express = require("express");
const getEventCollectionModel = require("../models/dynamicModel");

const router = express.Router();

router.get("/:eventType/providers", async (req, res) => {
  const { eventType } = req.params; // Extract event type from URL
  try {
    // Dynamically create the model for the specified event type
    const EventModel = getEventCollectionModel(eventType);
    console.log("Using collection:", EventModel.collection.collectionName); // Debug log

    // Fetch all providers from the collection
    const providers = await EventModel.find();
    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ message: "Error fetching providers", error });
  }
});

module.exports = router;
