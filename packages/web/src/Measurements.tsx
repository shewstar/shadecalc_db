import { FormEvent, useState } from "react";
import "./Measurements.css";

//defines the type of IMeasurementState an IMeasurement
type IMeasurementState = {
  perimeters: IMeasurement[];
  diagonals: IMeasurement[];
  heights: IMeasurement[];
  increment: IMeasurement[];
};

type IMeasurement = {
  name: string;
  value: number | null;
};

//defines the initial values of a four and five pointer
const initialFourPointsState: IMeasurementState = {
  perimeters: [
    {
      name: "A-B",
      value: 3,
    },
    {
      name: "B-C",
      value: 4,
    },
    {
      name: "C-D",
      value: 3,
    },
    {
      name: "D-A",
      value: 4,
    },
  ],
  diagonals: [
    {
      name: "A-C",
      value: 5,
    },
    {
      name: "B-D",
      value: 5,
    },
  ],
  heights: [
    {
      name: "Ah",
      value: 2,
    },
    {
      name: "Bh",
      value: 2,
    },
    {
      name: "Ch",
      value: 2,
    },
    {
      name: "Dh",
      value: 2,
    },
  ],
  increment: [
    {
      name: "amount",
      value: 0.1,
    }
  ]
};
const initialFivePointsState: IMeasurementState = {
  perimeters: [
    {
      name: "A-B",
      value: 3200,
    },
    {
      name: "B-C",
      value: 3620,
    },
    {
      name: "C-D",
      value: 4850,
    },
    {
      name: "D-E",
      value: 6920,
    },
    {
      name: "E-A",
      value: 3810,
    },
  ],
  diagonals: [
    {
      name: "A-C",
      value: 5650,
    },
    {
      name: "A-D",
      value: 7440,
    },
    {
      name: "B-D",
      value: 6000,
    },
    {
      name: "B-E",
      value: 5620,
    },
    {
      name: "C-E",
      value: 7750,
    },
  ],
  heights: [
    {
      name: "Ah",
      value: 2500,
    },
    {
      name: "Bh",
      value: 4400,
    },
    {
      name: "Ch",
      value: 2500,
    },
    {
      name: "Dh",
      value: 2800,
    },
    {
      name: "Eh",
      value: 2500,
    },
  ],
  increment: [
    {
      name: "amount",
      value: 1,
    }
  ]
};

//start of the Measurements function
export const Measurements = () => {
  //defines the initial points and setPoints value 
  const [points, setPoints] = useState(initialFourPointsState);

  //what to do when a input is changed
  const handleInputChange = (
    measurement: string,
    value: number | null,
    key: keyof IMeasurementState
  ) => {
    const name = measurement;

    setPoints((state) => {
      const newState = state[key].map((i) => {
        if (i.name === name) {
          return {
            name: i.name,
            value: value,
          };
        } else {
          return i;
        }
      });
      return { ...state, [key]: newState };
    });
  };

  //what to do when the 4 or 5 points button is pressed
  const setSelectedNumber = (numpoints: number) => {
    if (numpoints == 4) {
      setPoints(initialFourPointsState);
    } else if (numpoints == 5) {
      setPoints(initialFivePointsState);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <button onClick={() => setSelectedNumber(4)}>4 Pointer</button>
      <button onClick={() => setSelectedNumber(5)}>5 Pointer</button>
      <form onSubmit={handleSubmit}>
        <MeasurementForm
          kind="Perimeter"
          measurements={points.perimeters}
          onChange={(name, value) =>
            handleInputChange(name, value, "perimeters")
          }
        ></MeasurementForm>
        <MeasurementForm
          kind="Diagonals"
          measurements={points.diagonals}
          onChange={(name, value) =>
            handleInputChange(name, value, "diagonals")
          }
        ></MeasurementForm>
        <MeasurementForm
          kind="Heights"
          measurements={points.heights}
          onChange={(name, value) => handleInputChange(name, value, "heights")}
        ></MeasurementForm>
        <MeasurementForm
          kind="Increment"
          measurements={points.increment}
          onChange={(name, value) =>
            handleInputChange(name, value, "increment")
          }
        ></MeasurementForm>
        <ErrorComponent measurements={points}></ErrorComponent>
        {/* { <button type="submit">
          <b>Check</b>
        </button> } */}
      </form>
      {
        <TableErrorComponent
          measurements={points}
          setMeasurements={setPoints}
        ></TableErrorComponent>
      }
    </>
  );
};

function MeasurementForm(props: {
  kind: string;
  measurements: IMeasurement[];
  onChange: (name: string, newValue: number | null) => void;
}) {
  return (
    <>
      <h3>{props.kind}</h3>
      {props.measurements.map((measurement) => {
        return (
          <div key={measurement.name}>
            <label>
              <b>{measurement.name} </b>{" "}
            </label>
            <input
              type="number"
              className="entry"
              value={measurement.value ?? ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  props.onChange(measurement.name, value);
                } else if (e.target.value == null || e.target.value === "") {
                  props.onChange(measurement.name, null);
                }
              }}
            />
          </div>
        );
      })}
    </>
  );
}

function ErrorComponent(props: { measurements: IMeasurementState }) {
  const calculatedError = calculateError(props.measurements);
  //console.log(props.measurements)
  var colour: string = "";
  function colorPicker(calculatedError: number) {
    if (calculatedError < 0.05) colour = "#08ff02";
    else if (calculatedError < 0.1) colour = "#5cf400";
    else if (calculatedError < 0.2) colour = "#7ee800";
    else if (calculatedError < 0.3) colour = "#99db00";
    else if (calculatedError < 0.4) colour = "#b6c700";
    else if (calculatedError < 0.6) colour = "#cdb200";
    else if (calculatedError < 0.7) colour = "#e09b00";
    else if (calculatedError < 0.9) colour = "#fe4400";
    else colour = "#FF0000";
    return { style: { background: colour } };
  }
  return (
    <button className="mainB" {...colorPicker(calculatedError)}>
      {" "}
      {calculatedError}%
    </button>
  );
}

function TableErrorComponent(props: {
  measurements: IMeasurementState;
  setMeasurements: any;
}) {
  //console.log(props.setMeasurements);
  var colour: string = "";
  function colorPicker(calculatedError: number) {
    if (calculatedError < 0.05) colour = "#08ff02";
    else if (calculatedError < 0.1) colour = "#5cf400";
    else if (calculatedError < 0.2) colour = "#7ee800";
    else if (calculatedError < 0.3) colour = "#99db00";
    else if (calculatedError < 0.4) colour = "#b6c700";
    else if (calculatedError < 0.6) colour = "#cdb200";
    else if (calculatedError < 0.7) colour = "#e09b00";
    else if (calculatedError < 0.9) colour = "#fe4400";
    else colour = "#FF0000";
    return { style: { background: colour } };
  }
  const columns = 6;

  const handleInputChange = (
    measurement: string,
    value: number | null
  ) => {
    const name = measurement;
    for (const key in props.measurements){
      props.setMeasurements((state:any) => {
        const newState = state[key].map((i:any) => {
          if (i.name === name) {
            return {
              name: i.name,
              value: i.value + value,
            };
          } else {
            return i;
          }
        });
        return { ...state, [key]: newState };
    })};
  };
  
  type Row = { name: string; errors: number[] };

  function getErrors(
    subMeasurements: IMeasurement[],
    key: keyof IMeasurementState
  ) {
    const errors: Row[] = [];
    for (let index = 0; index < subMeasurements.length; index++) {
      let measurement = subMeasurements[index];
      const originalValue = measurement.value ?? 0;
      const rowErrors = [];
      for (let column = -5; column < columns; column++) {
        const newValue = originalValue + column * props.measurements.increment[0].value;
        const copiedSubMeasurements = [...subMeasurements];
        copiedSubMeasurements.splice(index, 1, {
          name: measurement.name,
          value: newValue,
        });

        const newError = calculateError({
          ...props.measurements,
          [key]: copiedSubMeasurements,
        });
        rowErrors.push(newError);
      }
      errors.push({ name: measurement.name, errors: rowErrors });
    }

    return errors;
  }

  const errors = [
    ...getErrors(props.measurements.perimeters, "perimeters"),
    ...getErrors(props.measurements.diagonals, "diagonals"),
    ...getErrors(props.measurements.heights, "heights"),
  ];
  return (
    <>
      <table>
        <tbody>
          {errors.map((row) => {
            return (
              <tr key={row.name}>
                <td>
                  <b className="table1">{row.name}</b>
                </td>
                {row.errors.map((error, i) => (
                  <td key={i}>
                    <button
                      className="table"
                      {...colorPicker(error)}
                      onClick={() => handleInputChange(row.name,props.measurements.increment[0].value * (i-5))}//console.log(row.name, i, props.measurements.increment[0].value * (i-5))}
                    >
                      {error}
                    </button>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function calculateError(state: IMeasurementState): number {
  // code to calculate error
  const perimitersNorm: number[] = [];
  const diagonalsNorm: number[] = [];
  const heightsCopy: number[] = [];
  state.perimeters.map((i) => {
    perimitersNorm.push(i.value);
  });
  state.diagonals.map((j) => {
    diagonalsNorm.push(j.value);
  });
  state.heights.map((k) => {
    heightsCopy.push(k.value);
  });
  heightsCopy.push(heightsCopy[0]);
  for (let index = 0; index < perimitersNorm.length; index++) {
    perimitersNorm[index] = pythagoras(
      perimitersNorm[index],
      heightsCopy[index],
      heightsCopy[index + 1]
    );
    if (perimitersNorm.length == 4 && index < diagonalsNorm.length) {
      diagonalsNorm[index] = pythagoras(
        diagonalsNorm[index],
        heightsCopy[index],
        heightsCopy[index + 2]
      );
    } else if (perimitersNorm.length == 5) {
      if (index < 2) {
        diagonalsNorm[index] = pythagoras(
          diagonalsNorm[index],
          heightsCopy[0],
          heightsCopy[index + 2]
        );
      } else if (index < 4) {
        diagonalsNorm[index] = pythagoras(
          diagonalsNorm[index],
          heightsCopy[1],
          heightsCopy[index + 1]
        );
      } else {
        diagonalsNorm[index] = pythagoras(
          diagonalsNorm[index],
          heightsCopy[2],
          heightsCopy[index]
        );
      }
    }
  }
  function findAngle(sideA: number, sideB: number, sideC: number) {
    const x = Math.acos(
      (sideA ** 2 + sideB ** 2 - sideC ** 2) / (2 * sideA * sideB)
    );
    const z = (x * 180) / Math.PI;
    return z;
  }
  function pythagoras(measurement: number, height1: number, height2: number) {
    return Math.sqrt(measurement ** 2 - (height1 - height2) ** 2);
  }
  //console.log(state);
  var errorArray: number[] = [];
  var error: number = 0;
  var j: number = 1;
  if (perimitersNorm.length == 4) {
    for (let index = 0; index < perimitersNorm.length; index++) {
      if (index == 0) {
        errorArray.push(
          findAngle(perimitersNorm[3], perimitersNorm[index], diagonalsNorm[j])
        );
      } else {
        errorArray.push(
          findAngle(
            perimitersNorm[index - 1],
            perimitersNorm[index],
            diagonalsNorm[j]
          )
        );
      }
      if (j == 0) j = 1;
      else j = 0;
    }
  } else if (perimitersNorm.length == 5) {
    var order_5array: number[] = [3, 0, 2, 4, 1];
    for (let index = 0; index < perimitersNorm.length; index++) {
      if (index == 0) {
        errorArray.push(
          findAngle(
            perimitersNorm[4],
            perimitersNorm[index],
            diagonalsNorm[order_5array[index]]
          )
        );
      } else {
        errorArray.push(
          findAngle(
            perimitersNorm[index - 1],
            perimitersNorm[index],
            diagonalsNorm[order_5array[index]]
          )
        );
      }
    }
  }
  //console.log(errorArray);
  error = errorArray.reduce((accumulation, current) => {
    return accumulation + current;
  });

  error =
    Math.abs(
      (error - (perimitersNorm.length - 2) * 180) /
        ((perimitersNorm.length - 2) * 180)
    ) * 100;
  //console.log(error);
  //console.log(state.perimeters[0].value)
  // Normalise perimeters and diagonals
  return Number(error.toFixed(3)) ?? 0;
}
