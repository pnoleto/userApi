
exports.Index = async (req, res, next) => {
    res.status(200).send({
        title: "Node Express API",
        version: `v1`
    });
}