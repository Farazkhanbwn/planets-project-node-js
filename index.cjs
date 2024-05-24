const parse = require("csv-parser");
const fs = require("fs");

const habitablePlanetsList = [];

function habitablePlanets(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (habitablePlanets(data)) {
      habitablePlanetsList.push(data);
    }
  })
  .on("error", (error) => {
    console.log("error value is : ", error);
  })
  .on("end", () => {
    console.log(`${habitablePlanetsList.length} habitablePlanets found `);
    console.log("All Done");
  });
