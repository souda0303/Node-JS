const URL = require("../models/url");

async function handleFindOneAndUpdate(req, res) {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }  // This option returns the updated document
        );

        if (!entry) {
            return res.status(404).send('URL not found');
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error fetching shortID:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    handleFindOneAndUpdate,
};


