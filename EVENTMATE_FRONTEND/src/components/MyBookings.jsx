


// import React, { useEffect, useState } from "react";
// import { CalendarDays, Clock, MapPin, Ticket, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filter, setFilter] = useState("upcoming");
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showRatingPopup, setShowRatingPopup] = useState(false);
//   const [rating, setRating] = useState(0);
//   const navigate = useNavigate();

//   // ✅ Fetch session user and then load their bookings
//   useEffect(() => {
//     const fetchUserAndBookings = async () => {
//       try {
//         // Step 1: Get current session user
//         const userRes = await axios.get("http://localhost:8080/user/getsession", {
//           withCredentials: true,
//         });

//         if (userRes.data && userRes.data.userId) {
//           const userId = userRes.data.userId;

//           // Step 2: Get events for that user
//           const bookingRes = await axios.get(
//             `http://localhost:8080/event/get/${userId}`
//           );

//           const userBookings = bookingRes.data || [];

//           console.log("Fetched Bookings:");
//           userBookings.forEach((event, index) => {
//             console.log(`Event ${index + 1}:`, event);
//           });

//           // Step 3: Add default values for missing fields
//           const formattedBookings = userBookings.map((b) => ({
//             eventId: b.eventId,
//             eventName: b.eventName || "Untitled Event",
//             eventType: b.eventType || "General",
//             eventDate: b.eventDate || "N/A",
//             eventTime: b.eventTime || "N/A",
//             eventVenue: b.eventVenue?.venueName || "Venue not selected",
//             eventCity: b.eventVenue?.venueCity || b.eventUser?.userCity || "Unknown City",
//             eventDecoration: b.eventDecoration || "Standard",
//             eventCapacity: b.eventVenue?.venueCapacity || 0,
//             eventBudget: b.eventVenue?.venuePrice || 0,
//             eventFood: b.eventFood || "Not Selected",
//             eventMusicSystem: b.eventMusicSystem?.musicSystemName || "Not Selected",
//             eventPhotographer: b.eventPhotographer?.photographerName || "Not Selected",
//             status: "confirmed",
//           }));

//           setBookings(formattedBookings);
//         } else {
//           navigate("/"); // redirect to login if session invalid
//         }
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         navigate("/"); // redirect on failure
//       }
//     };

//     fetchUserAndBookings();
//   }, [navigate]);

//   // ✅ Cancel Booking (Frontend simulation)
//   const handleCancel = async (index) => {
//     const updatedBookings = bookings.map((b, i) =>
//       i === index ? { ...b, status: "canceled" } : b
//     );
//     setBookings(updatedBookings);
//   };

//   // ✅ Edit / Update Booking
//   const handleUpdate = (booking) => {
//     navigate("/addevent/:id", { state: { editData: booking } });
//   };

//   // ✅ View Booking Details
//   const handleView = (booking) => {
//     navigate("/viewevent", { state: { booking } });
//   };

//   // ✅ Rate Booking (Dummy)
//   const handleRateService = (booking) => {
//     setSelectedBooking(booking);
//     setShowRatingPopup(true);
//   };

//   // ✅ Submit Rating
//   const handleSubmitRating = () => {
//     alert(`You rated ${rating} stars!`);
//     setShowRatingPopup(false);
//   };

//   // ✅ Image Mapping Function
//   const getImageByType = (type) => {
//     if (!type)
//       return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
//     const lower = type.toLowerCase();
//     if (lower.includes("birthday")) return "/birthday.jpg";
//     if (lower.includes("wedding")) return "/wedding.jpg";
//     if (lower.includes("camping")) return "/camping.jpg";
//     if (lower.includes("anniversary")) return "/anniversary.jpg";
//     if (lower.includes("party")) return "/party.jpg";
//     if (lower.includes("game")) return "/gamenight.jpg";
//     return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
//   };

//   // ✅ Filter Bookings
//   const today = new Date();

//   const filteredBookings = bookings.filter((b) => {
//     if (!b.eventDate || b.eventDate === "N/A") return false;
//     const eventDate = new Date(b.eventDate);

//     if (filter === "upcoming") {
//       return eventDate >= today && b.status !== "canceled";
//     }
//     if (filter === "past") {
//       return eventDate < today && b.status !== "canceled";
//     }
//     if (filter === "canceled") {
//       return b.status === "canceled";
//     }
//     return false;
//   });

//   return (
//     <div className="mybookings-page">
//       <main className="bookings-section">
//         <h1>
//           🎟️ <span>My Bookings</span>
//         </h1>

//         {/* Filter Buttons */}
//         <div className="filter-buttons">
//           <button
//             className={filter === "upcoming" ? "active" : ""}
//             onClick={() => setFilter("upcoming")}
//           >
//             Upcoming
//           </button>
//           <button
//             className={filter === "past" ? "active" : ""}
//             onClick={() => setFilter("past")}
//           >
//             Past
//           </button>
//           <button
//             className={filter === "canceled" ? "active" : ""}
//             onClick={() => setFilter("canceled")}
//           >
//             Canceled
//           </button>
//         </div>

//         {/* Booking Cards */}
//         <div className="cards-container">
//           {filteredBookings.length === 0 ? (
//             <p className="no-bookings">No bookings found.</p>
//           ) : (
//             filteredBookings.map((event, index) => (
//               <div className="booking-card" key={index}>
//                 <img src={getImageByType(event.eventType)} alt={event.eventType} />
//                 <div className="card-info1">
//                   <h3>{event.eventType}</h3>
//                   <p className="event-sub1">
//                     <MapPin size={14} /> {event.eventCity} • {event.eventDecoration}
//                   </p>
//                   <p className="event-details1">
//                     <CalendarDays size={14} /> {event.eventDate} •{" "}
//                     <Clock size={14} /> {event.eventTime || "6:00 PM"}
//                   </p>
//                   <p className="tickets1">
//                     <Ticket size={14} /> {event.eventCapacity || 1} Guests • ₹
//                     {event.eventBudget || 0}
//                   </p>

//                   <div className="card-buttons">
//                     {filter === "past" ? (
//                       <button
//                         className="rate-btn"
//                         onClick={() => handleRateService(event)}
//                       >
//                         ⭐ Rate Our Service
//                       </button>
//                     ) : filter === "canceled" ? (
//                       <button className="canceled-btn" disabled>
//                         Cancelled
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           className="view-btn"
//                           onClick={() => handleView(event)}
//                         >
//                           View Details
//                         </button>
//                         <button
//                           className="update-btn"
//                           onClick={() => handleUpdate(event)}
//                         >
//                           Update
//                         </button>
//                         <button
//                           className="cancel-btn"
//                           onClick={() => handleCancel(index)}
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ⭐ Rating Popup */}
//         {showRatingPopup && (
//           <div className="popup-overlay">
//             <div className="popup rating-popup">
//               <h3>Rate Our Service</h3>
//               <div className="stars">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={28}
//                     color={star <= rating ? "gold" : "#ccc"}
//                     onClick={() => setRating(star)}
//                     style={{ cursor: "pointer" }}
//                   />
//                 ))}
//               </div>
//               <div className="popup-actions">
//                 <button onClick={handleSubmitRating}>Submit</button>
//                 <button onClick={() => setShowRatingPopup(false)}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MyBookings;


import React, { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Ticket, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [originalBookings, setOriginalBookings] = useState([]); // store full backend data
  const [filter, setFilter] = useState("upcoming");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        const userRes = await axios.get("http://localhost:8080/user/getsession", {
          withCredentials: true,
        });

        if (userRes.data && userRes.data.userId) {
          const userId = userRes.data.userId;

          const bookingRes = await axios.get(
            `http://localhost:8080/event/get/${userId}`
          );

          const userBookings = bookingRes.data || [];
          console.log("Fetched Bookings:");
          userBookings.forEach((event, i) => console.log(`Event ${i + 1}:`, event));

          // Store original backend objects (for update)
          setOriginalBookings(userBookings);

          // Create frontend-friendly copy for display only
          const formatted = userBookings.map((b) => ({
            id: b.eventId,
            type: b.eventType || "Event",
            city:
              b.eventVenue?.venueCity ||
              b.eventUser?.userCity ||
              "Unknown City",
            decoration: b.eventDecoration || "Standard",
            date: b.eventDate || "Date not selected",
            time: b.eventTime || "Time not selected",
            capacity: b.eventVenue?.venueCapacity || 0,
            budget: b.eventVenue?.venuePrice || 0,
            status: "confirmed",
          }));

          setBookings(formatted);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        navigate("/");
      }
    };

    fetchUserAndBookings();
  }, [navigate]);

  // ✅ Cancel booking
  const handleCancel = (index) => {
    const updated = bookings.map((b, i) =>
      i === index ? { ...b, status: "canceled" } : b
    );
    setBookings(updated);
  };

  // ✅ View booking
  const handleView = (booking) => {
    navigate("/viewevent", { state: { booking } });
  };

  // ✅ Update booking → send full original event object
  const handleUpdate = (bookingIndex) => {
    const fullEventObject = originalBookings[bookingIndex]; // full backend object
    navigate("/addevent/:id", { state: { editData: fullEventObject } });
  };

  // ✅ Rate booking
  const handleRateService = (booking) => {
    setSelectedBooking(booking);
    setShowRatingPopup(true);
  };

  const handleSubmitRating = () => {
    alert(`You rated ${rating} stars!`);
    setShowRatingPopup(false);
  };

  const getImageByType = (type) => {
    if (!type)
      return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
    const lower = type.toLowerCase();
    if (lower.includes("birthday")) return "/birthday.jpg";
    if (lower.includes("wedding")) return "/wedding.jpg";
    if (lower.includes("camping")) return "/camping.jpg";
    if (lower.includes("anniversary")) return "/anniversary.jpg";
    if (lower.includes("party")) return "/party.jpg";
    if (lower.includes("game")) return "/gamenight.jpg";
    return "https://images.unsplash.com/photo-1497493292307-31c376b6e479";
  };

  const today = new Date();
  const filteredBookings = bookings.filter((b) => {
    if (b.status === "canceled" && filter === "canceled") return true;
    if (b.status === "canceled" && filter !== "canceled") return false;
    if (!b.date || b.date === "Date not selected") return true;
    const eventDate = new Date(b.date);
    if (filter === "upcoming") return eventDate >= today;
    if (filter === "past") return eventDate < today;
    return true;
  });

  return (
    <div className="mybookings-page">
      <main className="bookings-section">
        <h1>
          🎟️ <span>My Bookings</span>
        </h1>

        <div className="filter-buttons">
          <button
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={filter === "past" ? "active" : ""}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
          <button
            className={filter === "canceled" ? "active" : ""}
            onClick={() => setFilter("canceled")}
          >
            Canceled
          </button>
        </div>

        <div className="cards-container">
          {filteredBookings.length === 0 ? (
            <p className="no-bookings">No bookings found.</p>
          ) : (
            filteredBookings.map((event, index) => (
              <div className="booking-card" key={index}>
                <img src={getImageByType(event.type)} alt={event.type} />
                <div className="card-info1">
                  <h3>{event.type}</h3>
                  <p className="event-sub1">
                    <MapPin size={14} /> {event.city} • {event.decoration}
                  </p>
                  <p className="event-details1">
                    <CalendarDays size={14} /> {event.date} •{" "}
                    <Clock size={14} /> {event.time}
                  </p>
                  <p className="tickets1">
                    <Ticket size={14} /> {event.capacity} Guests • ₹
                    {event.budget}
                  </p>

                  <div className="card-buttons">
                    {filter === "past" ? (
                      <button
                        className="rate-btn"
                        onClick={() => handleRateService(event)}
                      >
                        ⭐ Rate Our Service
                      </button>
                    ) : filter === "canceled" ? (
                      <button className="canceled-btn" disabled>
                        Cancelled
                      </button>
                    ) : (
                      <>
                        <button
                          className="view-btn"
                          onClick={() => handleView(event)}
                        >
                          View Details
                        </button>
                        <button
                          className="update-btn"
                          onClick={() => handleUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(index)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showRatingPopup && (
          <div className="popup-overlay">
            <div className="popup rating-popup">
              <h3>Rate Our Service</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    color={star <= rating ? "gold" : "#ccc"}
                    onClick={() => setRating(star)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <div className="popup-actions">
                <button onClick={handleSubmitRating}>Submit</button>
                <button onClick={() => setShowRatingPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
