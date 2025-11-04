// import axios from "axios";
// import React, { useState } from "react";

// const AddMusicSystem = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [formData, setFormData] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();

//     const response=await axios.post("http://localhost:8080/musicsystem/add",formData);
//     // Validate image URL
//     // if (!formData.image || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.image)) {
//     //   alert("Please paste a valid public image link ending with .jpg, .png, etc.");
//     //   return;
//     // }

//     console.log("Music System Added:", formData);
//     alert("Music System added successfully!");
//     setOpenModal(false);
//     setFormData({});
//   };

//   return (
//     <>
//       {/* Add Music System Card */}
//       <div className="add-card" onClick={() => setOpenModal(true)}>
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
//           alt="Music"
//         />
//         <h3>Add Music System</h3>
//       </div>

//       {/* Modal */}
//       {openModal && (
//         <div className="modal-overlay" onClick={() => setOpenModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3 style={{ color: "#7b5c2f" }}>Add Music System</h3>

//             <form onSubmit={handleSubmit} className="add-form">
//               <label>
//                 Name:{" "}
//                 <input
//                   type="text"
//                   name="musicSystemName"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 City:{" "}
//                 <input
//                   type="text"
//                   name="musicSystemCity"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               <label>
//                 Rating:{" "}
//                 <input
//                   type="number"
//                   step="0.1"
//                   name="musicSystemRating"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               {/* Changed to link input */}
//               <label>
//                 Paste Public Image Link:{" "}
//                 <input
//                   type="text"
//                   name="musicSystemImageUrl"
//                   placeholder="https://example.com/image.jpg"
//                   onChange={handleChange}
//                   required
//                 />
//               </label>

//               {/* Optional live preview */}
//               {formData.musicSystemImageUrl && (
//                 <div style={{ textAlign: "center", marginTop: "10px" }}>
//                   <img
//                     src={formData.musicSystemImageUrl}
//                     alt="Preview"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       borderRadius: "8px",
//                       objectFit: "cover",
//                       border: "1px solid #ccc",
//                     }}
//                     onError={(e) => (e.target.style.display = "none")}
//                   />
//                 </div>
//               )}

//               <div className="form-buttons">
//                 <button type="submit" className="approve-btn">
//                   Add Music System
//                 </button>
//                 <button
//                   type="button"
//                   className="delete-btn"
//                   onClick={() => setOpenModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddMusicSystem;

import axios from "axios";
import React, { useState } from "react";

// ✅ Full India State–City Map
const stateCityMap = {
  AndhraPradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
  ArunachalPradesh: ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Karnal"],
  HimachalPradesh: ["Shimla", "Manali", "Dharamshala", "Solan"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal", "Thoubal", "Bishnupur"],
  Meghalaya: ["Shillong", "Tura", "Jowai"],
  Mizoram: ["Aizawl", "Lunglei", "Champhai"],
  Nagaland: ["Kohima", "Dimapur", "Wokha"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  Sikkim: ["Gangtok", "Namchi", "Pelling"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar"],
  UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Noida", "Agra"],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
  WestBengal: ["Kolkata", "Howrah", "Siliguri", "Durgapur"],
  Chandigarh: ["Chandigarh"],
  JammuKashmir: ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  Ladakh: ["Leh", "Kargil"],
  Puducherry: ["Pondicherry", "Karaikal", "Mahe"],
  AndamanNicobar: ["Port Blair", "Diglipur", "Rangat"],
  Lakshadweep: ["Kavaratti", "Agatti", "Minicoy"],
};

const AddMusicSystem = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    musicSystemName: "",
    musicSystemState: "",
    musicSystemCity: "",
    musicSystemRating: "",
    musicSystemImageUrl: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle State Change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      musicSystemState: selectedState,
      musicSystemCity: "",
    }));
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/musicsystem/add", formData);

    console.log("Music System Added:", formData);
    alert("Music System added successfully!");
    setOpenModal(false);
    setFormData({});
  };

  return (
    <>
      {/* Add Music System Card */}
      <div className="add-card" onClick={() => setOpenModal(true)}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
          alt="Music"
        />
        <h3>Add Music System</h3>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#7b5c2f" }}>Add Music System</h3>

            <form onSubmit={handleSubmit} className="add-form">
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="musicSystemName"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* ✅ State Dropdown */}
              <label>
                State:{" "}
                <select
                  name="musicSystemState"
                  value={formData.musicSystemState || ""}
                  onChange={handleStateChange}
                  required
                >
                  <option value="">-- Select State --</option>
                  {Object.keys(stateCityMap).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>

              {/* ✅ City Dropdown */}
              <label>
                City:{" "}
                <select
                  name="musicSystemCity"
                  value={formData.musicSystemCity || ""}
                  onChange={handleChange}
                  required
                  disabled={!formData.musicSystemState}
                >
                  <option value="">-- Select City --</option>
                  {stateCityMap[formData.musicSystemState]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Rating:{" "}
                <input
                  type="number"
                  step="0.1"
                  name="musicSystemRating"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* Image URL Input */}
              <label>
                Paste Public Image Link:{" "}
                <input
                  type="text"
                  name="musicSystemImageUrl"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  required
                />
              </label>

              {/* Image Preview */}
              {formData.musicSystemImageUrl && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <img
                    src={formData.musicSystemImageUrl}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}

              <div className="form-buttons">
                <button type="submit" className="approve-btn">
                  Add Music System
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMusicSystem;
