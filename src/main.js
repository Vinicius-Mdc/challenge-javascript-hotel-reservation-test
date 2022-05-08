function getDates(dates) {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return dates.map((date) => {
    const day = date.substring(0, 2);
    const month = months[date.substring(2, 5)];
    const year = date.substring(5, 9);
    return new Date(year, month, day);
  });
}

function getCheapestHotel(input) {
  const hotels = [
    {
      name: "Lakewood",
      classification: 3,
      taxes: {
        weekdays: {
          normal: 110,
          fidelityProgram: 80,
        },
        weekends: {
          normal: 90,
          fidelityProgram: 80,
        },
      },
    },
    {
      name: "Bridgewood",
      classification: 4,
      taxes: {
        weekdays: {
          normal: 160,
          fidelityProgram: 110,
        },
        weekends: {
          normal: 60,
          fidelityProgram: 50,
        },
      },
    },
    {
      name: "Ridgewood",
      classification: 5,
      taxes: {
        weekdays: {
          normal: 220,
          fidelityProgram: 100,
        },
        weekends: {
          normal: 150,
          fidelityProgram: 40,
        },
      },
    },
  ];

  const [clientType, clientDates] = input.split(": ");
  const dates = getDates(clientDates.split(", "));
  let cheapestHotel;
  for (let i = 0; i < hotels.length; i++) {
    let price = 0;
    for (let j = 0; j < dates.length; j++) {
      const day = dates[j].getDay();
      if (day <= 5 && day >= 1) {
        if (clientType === "Regular") {
          price += hotels[i].taxes.weekdays.normal;
        } else if (clientType === "Rewards") {
          price += hotels[i].taxes.weekdays.fidelityProgram;
        }
      } else {
        if (clientType === "Regular") {
          price += hotels[i].taxes.weekends.normal;
        } else if (clientType === "Rewards") {
          price += hotels[i].taxes.weekends.fidelityProgram;
        }
      }
    }
    if (
      !cheapestHotel ||
      price < cheapestHotel.price ||
      (price === cheapestHotel.price &&
        hotels[i].classification > cheapestHotel.classification)
    ) {
      cheapestHotel = {
        name: hotels[i].name,
        classification: hotels[i].classification,
        price,
      };
    }
  }

  return cheapestHotel.name;
}

exports.getCheapestHotel = getCheapestHotel;
