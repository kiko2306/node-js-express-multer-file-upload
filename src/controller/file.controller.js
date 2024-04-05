const uploadFile = require('../middleware/upload');

const upload = async (req, res) => {
    try {

        // Call the middleware function to setup the storage path and file name
        await uploadFile(req, res);

        // If the file is not found, send an error message
        if (req.file == undefined) {
            return res.status(400).send({ message: 'Please upload a file!' });
        }

        // If the file is uploaded successfully, send a success message
        res.status(200).send({
            message: 'Uploaded the file successfully: ' + req.file.originalname,
        });
    } catch (err) {

        // If an error occurs, check if the file size is larger than 2MB
        if (err.code == 'LIMIT_FILE_SIZE') {
            return res.status(500).send({
                message: 'File size cannot be larger than 2MB!',
            });
        }

        // If an error occurs, send an error message
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
}

const getListFiles = (req, res) => {

    // Setup the base path for the file
    const directoryPath = __basedir + '/resources/static/assets/uploads/';

    // return the list of files in the directory
    fs.readdir(directoryPath, function (err, files) {

        // If an error occurs, send an error message
        if (err) {
            res.status(500).send({
                message: 'Unable to scan files!',
            });
        }

        // setup the list of files to be returned
        let fileInfos = [];

        // add the file name and URL to the list
        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        // return the list of files
        res.status(200).send(fileInfos);
    });
}

const download = (req, res) => {
    // Get the file name from the request
    const fileName = req.params.name;
    // Setup the base path for the file
    const directoryPath = __basedir + '/resources/static/assets/uploads/';

    // Download the file
    res.download(directoryPath + fileName, fileName, (err) => {
        // If an error occurs, send an error message
        if (err) {
            res.status(500).send({
                message: 'Could not download the file. ' + err,
            });
        }
    });
}

module.exports = {
    upload,
    getListFiles,
    download,
};