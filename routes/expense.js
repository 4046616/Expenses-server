const expenseRoutes = (app, fs) => {
    // variables
    const dataPath = './data/data.json';

    // refactored helper methods
    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, err => {
        if (err) {
            throw err;
        }

        callback();
        });
    };

    // READ
    app.get('/expenses', (req, res) => {
        readFile(data => {
            res.send(data);
        }, true);
    });

    // CREATE 
    app.post('/expenses', (req, res) => {
        readFile(data => {
            // Note: this needs to be more robust for production use. 
            // add the new expense
            data = req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send({success: true});
            });
        }, true);
    });

    // UPDATE
    app.put('/expenses/:id', (req, res) => {
        readFile(data => {
        // add the new expense
        const newExpenseId = req.params['id'];
        data[newExpenseId] = req.body;
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send({success: true});
        });
        }, true);
    });

    // DELETE
    app.delete('/expenses/:id', (req, res) => {
        readFile(data => {
        // add the new expense
        const newExpenseId = req.params['id'];
        delete data[newExpenseId];
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send({success: true});
        });
        }, true);
    });
};
  
module.exports = expenseRoutes;