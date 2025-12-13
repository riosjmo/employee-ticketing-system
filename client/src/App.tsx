import { useEffect } from "react";
import { getTickets } from "./api/tickets.api";

function App() {
  useEffect(() => {
    getTickets()
      .then((tickets) => {
        console.log("Tickets from API:", tickets);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Ticket System</h1>
      <p>Check the console for API response</p>
    </div>
  );
}

export default App;
