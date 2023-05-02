import airlineBg from "../../assets/airline-bg3.jpg";

// we will use this date picker which comes from the AntDesign library
import { DatePicker } from "antd";

import { useEffect, useState } from "react";
import { UserAuth } from "../../context/Auth";

function Dashboard() {
  //user details that shows email address
  const { currentUser } = UserAuth();

  // the beginTime is the earliest arrival time for flights a user wants to view. It will be stored in state in a number type as required by the api
  const [beginTime, setBeginTime] = useState(null);

  // the endTime is the latest arrival time for flights a user wants to view. It will be stored in state in a number type as required by the api
  const [endTime, setEndTime] = useState(null);

  // the fromDateTimeString is the string type of the endTime
  const [fromDateTimeString, setFromDateTimeString] = useState(null);

  // the toDateTimeString is the string type of the beginTime
  const [toDateTimeString, setToDateTimeString] = useState(null);

  // all fetched flights will be stored in state as flights
  const [flights, setFlights] = useState([]);

  // this is a conditional loading state that will be shown until our fetching flights promise is fulfilled
  const [loading, setLoading] = useState(false);

  // this fromDateTime function will get the beginTime as a string from the date-time picker and store it in state
  const fromDateTime = (dateString) => {
    // const dateTimeZone = new Date(dateString).toString();
    // const dateTimeString = new Date(dateString).toUTCString();
    // const dateTimeString = new Date(dateString)[Symbol.toPrimitive]("number");
    setFromDateTimeString(dateString);
    console.log(dateString);
  };

  // this toDateTime function will get the endTime as a string from the date-time picker and store it in state
  const toDateTime = (dateString) => {
    setToDateTimeString(dateString);
  };

  //  this handleSubmit function is called a user clicks the "see flights" button after picking a time range and will store the beginTime and endTime in number type as required by the API specification
  const handleSubmit = () => {
    setBeginTime(
      Math.round(
        new Date(fromDateTimeString)[Symbol.toPrimitive]("number") / 1000
      )
    );
    setEndTime(
      Math.round(
        new Date(toDateTimeString)[Symbol.toPrimitive]("number") / 1000
      )
    );
  };

  // this useEffect will be called to make a new api call whenever the users changes the beginTime and endTime
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const flightData = await fetch(
        `https://opensky-network.org/api/flights/all?begin=${beginTime}&end=${endTime}`
      ).then((response) => response.json());

      setFlights(flightData);
      console.log(flights);
      setLoading(false);
    };

    if (endTime) fetchData();
  }, [beginTime, endTime]);

  return (
    <div
      style={{
        backgroundImage: `url(
          ${airlineBg}
        )`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col justify-start items-center h-full mx-auto">
        <span className=" text-slate-200 font-semibold m-1">
          Welcome, {currentUser.email}
        </span>
        <div className="w-[98%] max-w-xl bg-gray-500/50 rounded-md px-4 m-1">
          <h3 className="text-white text-center p-2">
            Choose a time range of within an hour
          </h3>
          <div className="flex justify-center mx-auto gap-4">
            <div className="flex flex-col">
              <p className="text-white">
                From:{" "}
                <span className="text-yellow-200">{fromDateTimeString}</span>{" "}
              </p>

              <DatePicker showTime onChange={fromDateTime} />
            </div>
            <span className="text-white mt-6">-</span>
            <div>
              <p className="text-white">
                To: <span className="text-yellow-200">{toDateTimeString}</span>
              </p>
              <DatePicker showTime onChange={toDateTime} />
            </div>
          </div>
          <div className="w-full flex justify-center items-center mx-auto m-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-md p-1 px-6 cursor-pointer"
            >
              <i className="fa-solid fa-magnifying-glass mr-2 text-sm"></i>
              See Flights
            </button>
          </div>
        </div>
        <h1 className="bg-stone-800/70 rounded-md p-1 px-4 m-1 uppercase font-semibold text-orange-400">
          Real-time information of all flights around the world
        </h1>
        <div className="tableWrap border-none  no-scrollbar border">
          <table className="bg-stone-900/80 rounded-md p-10 w-full mx-auto">
            <thead className="sticky top-0 bg-stone-900/80 text-slate-50 border border-black">
              <tr className="overflow-hidden p-4">
                <th className="p-4">AIRCRAFT</th>
                <th className="p-4">TIME</th>
                <th className="p-4">arriving</th>
                <th className="p-4">departing</th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="text-center text-orange-400">
                <tr className="overflow-hidden p-4">
                  <td>Loading ...</td>
                  <td>Loading ...</td>
                  <td>Loading ...</td>
                  <td>Loading ...</td>
                </tr>
              </tbody>
            ) : !flights || flights.length == [] ? (
              <tbody className="text-center text-orange-400">
                <tr className="overflow-hidden p-4">
                  <td>------</td>
                  <td>------</td>
                  <td>------</td>
                  <td>------</td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-center text-orange-400">
                {flights.map((currentFlight) => (
                  <tr
                    key={currentFlight.callsign || Math.random() * 1000}
                    className="overflow-hidden p-4"
                  >
                    <td className=" border border-orange-200">
                      {currentFlight.icao24}
                    </td>
                    <td className=" border border-orange-200">
                      {new Date(currentFlight.lastSeen * 1000).toString()}
                    </td>
                    <td className=" border border-orange-200">
                      {currentFlight.estArrivalAirport}
                    </td>
                    <td className=" border border-orange-200">
                      {currentFlight.estDepartureAirport}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;