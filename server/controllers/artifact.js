var Artifact = require('../models/artifact');

var createArtifact = async (req, res) => {
  try {
    // Get the artifact details from the request body
    var details = req.body;
    // Parse the tags if they were supplied
    if (req.body.tags) details.tags = JSON.parse(req.body.tags);
    // Parse the relations if they were supplied
    if (req.body.relations) details.relations = JSON.parse(req.body.relations);
    // Create an artifact from the details in the request
    const artifact = new Artifact(details);
    // Wait for the artifact to be saved in the database
    await artifact.save();
    // Return the artifact back to the client
    res.status(201).send(artifact.toObject());
  } catch (error) {
    // Return an error message as the artfact was not able to be created
    res.status(400).send({error:'Unable to create artifact.'});
  };
};

var updateArtifact = async (req, res) => {
  try {
    const query = {_id: req.params.id};
    const updates = req.body;
    await Artifact.updateOne(query, updates);
    res.status(200).send(await Artifact.findOne(query));
  } catch (error) {
    res.status(400).send({error: 'Unable to update artifact.'});
  };
};

var getArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    res.status(200).send(artifacts);
  } catch (error) {
    res.status(400).send({error:'Unable to get that artifact.'})
  };
};

var getArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.status(200).send(artifacts);
  } catch (error) {
    res.status(400).send({error:'Unable to get artifacts.'});
  };
};

var deleteArtifact = async (req, res) => {
  try {
    await Artifact.deleteOne({_id:req.params.id});
    res.status(200).send();
  } catch (error) {
    res.status(400).send({error:'Unable to delete artifact.'})
  };
};

module.exports = {
  createArtifact, 
  updateArtifact,
  deleteArtifact,
  getArtifact,
  getArtifacts
};