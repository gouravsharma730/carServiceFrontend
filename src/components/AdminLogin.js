// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [pendingBookings, setPendingBookings] = useState([]);
//   const [otherBookings, setOtherBookings] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('/api/bookings');
//       setPendingBookings(response.data.pendingBookings);
//       setOtherBookings(response.data.otherBookings);
//     };
//     fetchData();
//   }, []);

//   const handleResponseChange = (bookingId, newStatus) => {
//     // Handle changing the response status and update backend accordingly
//     console.log("Booking ID:", bookingId, "New Status:", newStatus);
//   };

//   return (
//     <div className="container">
//       <div className="box">
//         <h2>Awaiting Confirmation</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Car Number</th>
//               <th>Address</th>
//               <th>Pick-up Date</th>
//               <th>Car Drop Date</th>
//               <th>Response to Service Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingBookings.map(booking => (
//               <tr key={booking._id}>
//                 <td>{booking.carNumber}</td>
//                 <td>{booking.address}</td>
//                 <td>{booking.pickUpDate}</td>
//                 <td>{booking.dropDate}</td>
//                 <td>
//                   <select onChange={(e) => handleResponseChange(booking._id, e.target.value)}>
//                     <option value="accepted">Accepted</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="box">
//         <h2>Other Records</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Car Number</th>
//               <th>Service Type</th>
//               <th>Service Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {otherBookings.map(booking => (
//               <tr key={booking._id}>
//                 <td>{booking.carNumber}</td>
//                 <td>{booking.serviceType}</td>
//                 <td>{booking.serviceStatus}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default App;
