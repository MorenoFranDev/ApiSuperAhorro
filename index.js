import sequelize from "./src/connection.js"
import app from "./src/app.js"

const main = () => {
  app
  .listen(process.env.PORT  || 4000);
  try {
    sequelize.sync();
  } catch (error) {
    console.log("Error in db")
  }
};

main()