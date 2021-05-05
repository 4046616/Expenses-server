// load up our shiny new route for users
const expenseRoutes = require('./expense');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('Connected');
  });

  // run our user route module here to complete the wire up
  expenseRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;