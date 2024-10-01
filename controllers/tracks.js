const express = require("express");
const router = express.Router();

const TrackModel = require("../models/track");

// -------- Endpoints ---------
router.post("/", async function (req, res) {
    try {
        const createdTrack = await TrackModel.create(req.body);
        res.status(201).json(createdTrack);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
    res.json({ message: "Create Route" });
});

router.get("/", async function (req, res) {
    try {
        const foundTracks = await TrackModel.find({});
        res.status(200).json(foundTracks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const foundTrack = await TrackModel.findById(req.params.id);
        if (!foundTrack) {
            res.status(404);
            throw new Error("Track Not Found");
        }
        res.status(200).json(foundTrack);

    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async function (req, res) {
    try {
        const updatedTrack = await TrackModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTrack) {
            res.status(404);
            throw new Error("Track Not Found");
        }

        res.status(200).json(updatedTrack);

    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async function (req, res) {
    try {
        const deletedTrack = await TrackModel.findByIdAndDelete(req.params.id);

        if (!deletedTrack) {
            res.status(404);
            throw new Error("Track Not Found");
        }
        res.status(200).json({ message: "Track was successfully deleted" });

    } catch (error) {
        if (res.statusCode === 400) {
            res.json({ error: error.message });
        }
        res.status(500).json({ error: error.message })
    }
});

// -----------------------------

module.exports = router;