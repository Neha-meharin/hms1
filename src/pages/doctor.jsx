
import React, { useState } from 'react';
import { Calendar, Search, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorManagement = () => {
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr.Ranjith", phone: "9876543210", specialization: "ENT", schedule: "Mon - Fri", consultationTime: "9 am - 4 pm", fee: "Rs 150", slotsPerHour: 15 },
    { id: 2, name: "Dr.Sujith", phone: "9876543210", specialization: "Physician", schedule: "Mon - Fri", consultationTime: "9 am - 4 pm", fee: "Rs 150", slotsPerHour: 15 },
    { id: 3, name: "Dr.Suneer", phone: "9876543210", specialization: "Dermatologist", schedule: "Mon - Fri", consultationTime: "9 am - 4 pm", fee: "Rs 150", slotsPerHour: 15 },
    { id: 4, name: "Dr.Jamsheed", phone: "9876543210", specialization: "Ortho", schedule: "Mon - Fri", consultationTime: "9 am - 4 pm", fee: "Rs 150", slotsPerHour: 15 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availability, setAvailability] = useState(true);
  const [scheduleData, setScheduleData] = useState({
    fromDate: "",
    toDate: "",
    days: {
      Sun: { selected: false, slot: "Select slot" },
      Mon: { selected: false, slot: "Select slot" },
      Tue: { selected: false, slot: "Select slot" },
      Wed: { selected: false, slot: "Select slot" },
      Thu: { selected: false, slot: "Select slot" },
      Fri: { selected: false, slot: "Select slot" },
      Sat: { selected: false, slot: "Select slot" }
    },
    reason: ""
  });

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditSchedule = (doctor) => {
    setSelectedDoctor(doctor);
    setShowEditSchedule(true);
  };

  const handleAddDoctor = () => {
    setShowAddDoctor(true);
  };

  const handleDayCheckChange = (day) => {
    setScheduleData(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          selected: !prev.days[day].selected
        }
      }
    }));
  };

  const handleSlotChange = (day, value) => {
    setScheduleData(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          slot: value
        }
      }
    }));
  };

  const handleUpdateSchedule = () => {
    // Process updated schedule data here
    console.log("Schedule updated:", scheduleData);
    setShowEditSchedule(false);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-56 p-6">
          <h1 className="text-2xl font-bold mb-4">Doctor Management</h1>
          <div className="flex items-center justify-between mb-6">
            {/* Search Input */}
            <div className="flex items-center bg-white rounded-lg p-2 flex-1 mr-4 border border-gray-300">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                className="bg-white px-4 py-2 rounded-lg shadow border border-gray-300"
                onClick={() => handleEditSchedule(doctors[0])}
              >
                Edit Schedule
              </button>
              <button
                className="bg-white px-4 py-2 rounded-lg shadow border border-gray-300"
                onClick={handleAddDoctor}
              >
                Add Doctor
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                 
                  <th className="p-3 text-left bg-teal-600 text-white">Doctor Name</th>
                  <th className="p-3 text-left bg-teal-600 text-white">Phone number</th>
                  <th className="p-3 text-left bg-teal-600 text-white">Specialization</th>
                  <th className="p-3 text-left bg-teal-600 text-white">Schedule</th>
                  <th className="p-3 text-left bg-teal-600 text-white">Consultation Time</th>
                  <th className="p-3 text-left bg-teal-600 text-white">Fee</th>
                  <th className="p-3 text-left bg-teal-600 text-white">Slots per Hour</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b">
                  
                    <td className="p-3">{doctor.name}</td>
                    <td className="p-3">{doctor.phone}</td>
                    <td className="p-3">{doctor.specialization}</td>
                    <td className="p-3">{doctor.schedule}</td>
                    <td className="p-3">{doctor.consultationTime}</td>
                    <td className="p-3">{doctor.fee}</td>
                    <td className="p-3">{doctor.slotsPerHour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Schedule Modal - Improved to match design */}
      {showEditSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 shadow-lg w-[800px] h-[700px] 
        overflow-y-auto scrollbar-none ">
          <h2 className="text-xl font-bold mb-4 text-center">Edit Schedule</h2>
    
          <div className="mb-4">
            <label className="block mb-1">Select Doctor:</label>
            <select
              className="border p-2 rounded-lg w-full"
              value={selectedDoctor ? selectedDoctor.id : ""}
              onChange={(e) => {
                const doctorId = parseInt(e.target.value, 10);
                const doctor = doctors.find((doc) => doc.id === doctorId);
                setSelectedDoctor(doctor);
              }}
            >
              <option value="" disabled>
                Select a doctor
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1">From:</label>
          <DatePicker
            selected={scheduleData.fromDate ? new Date(scheduleData.fromDate) : null}
            onChange={(date) =>
              setScheduleData({ ...scheduleData, fromDate: date })
            }
            className="border p-2 rounded-lg w-full"
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <label className="block mb-1">To:</label>
          <DatePicker
            selected={scheduleData.toDate ? new Date(scheduleData.toDate) : null}
            onChange={(date) =>
              setScheduleData({ ...scheduleData, toDate: date })
            }
            className="border p-2 rounded-lg w-full"
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
           
            
            <div className="mb-4 flex items-center">
              <label className="mr-2">Availability :</label>
              <button 
                className={`w-12 h-6 rounded-full relative ${availability ? 'bg-teal-500' : 'bg-gray-300'}`}
                onClick={() => setAvailability(!availability)}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transform transition-transform ${availability ? 'translate-x-7' : 'translate-x-1'}`}
                ></div>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="sun" 
                  className="mr-2"
                  checked={scheduleData.days.Sun.selected}
                  onChange={() => handleDayCheckChange("Sun")}
                />
                <label className="mr-2 w-8" htmlFor="sun">Sun</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none" 
                    value={scheduleData.days.Sun.slot}
                    onChange={(e) => handleSlotChange("Sun", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="mon" 
                  className="mr-2"
                  checked={scheduleData.days.Mon.selected}
                  onChange={() => handleDayCheckChange("Mon")}
                />
                <label className="mr-2 w-8" htmlFor="mon">Mon</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Mon.slot}
                    onChange={(e) => handleSlotChange("Mon", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="tue" 
                  className="mr-2"
                  checked={scheduleData.days.Tue.selected}
                  onChange={() => handleDayCheckChange("Tue")}
                />
                <label className="mr-2 w-8" htmlFor="tue">Tue</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Tue.slot}
                    onChange={(e) => handleSlotChange("Tue", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="wed" 
                  className="mr-2"
                  checked={scheduleData.days.Wed.selected}
                  onChange={() => handleDayCheckChange("Wed")}
                />
                <label className="mr-2 w-8" htmlFor="wed">Wed</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Wed.slot}
                    onChange={(e) => handleSlotChange("Wed", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="thu" 
                  className="mr-2"
                  checked={scheduleData.days.Thu.selected}
                  onChange={() => handleDayCheckChange("Thu")}
                />
                <label className="mr-2 w-8" htmlFor="thu">Thu</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Thu.slot}
                    onChange={(e) => handleSlotChange("Thu", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="fri" 
                  className="mr-2"
                  checked={scheduleData.days.Fri.selected}
                  onChange={() => handleDayCheckChange("Fri")}
                />
                <label className="mr-2 w-8" htmlFor="fri">Fri</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Fri.slot}
                    onChange={(e) => handleSlotChange("Fri", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="sat" 
                  className="mr-2"
                  checked={scheduleData.days.Sat.selected}
                  onChange={() => handleDayCheckChange("Sat")}
                />
                <label className="mr-2 w-8" htmlFor="sat">Sat</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Sat.slot}
                    onChange={(e) => handleSlotChange("Sat", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p>Conflicting Bookings : 15</p>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Reason for Unavailability :</label>
              <textarea 
                className="border p-2 rounded-lg w-full h-20"
                value={scheduleData.reason}
                onChange={(e) => setScheduleData({...scheduleData, reason: e.target.value})}
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded-lg"
                onClick={handleUpdateSchedule}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 shadow-lg w-[800px] h-[700px] 
        overflow-y-auto scrollbar-none">
            <h2 className="text-xl font-bold mb-4 text-center">Add Doctor</h2>
            
            <div className="mb-4">
              <label className="block mb-1">First Name</label>
              <input type="text" className="border p-2 rounded-lg w-full" />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Last Name</label>
              <input type="text" className="border p-2 rounded-lg w-full" />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Specialization</label>
              <input type="text" className="border p-2 rounded-lg w-full" />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Phone</label>
              <input type="text" className="border p-2 rounded-lg w-full" />
            </div>
            
            <div className="mb-4 flex items-center">
              <label className="mr-2">Consultation Fee</label>
              <input type="text" className="border p-2 rounded-lg w-24 mr-2" />
              <label className="mr-2">Slots/hr</label>
              <select className="border p-2 rounded-lg w-16">
                <option>15</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            
          <div className="mb-4">
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="sun" 
                  className="mr-2"
                  checked={scheduleData.days.Sun.selected}
                  onChange={() => handleDayCheckChange("Sun")}
                />
                <label className="mr-2 w-8" htmlFor="sun">Sun</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none" 
                    value={scheduleData.days.Sun.slot}
                    onChange={(e) => handleSlotChange("Sun", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="mon" 
                  className="mr-2"
                  checked={scheduleData.days.Mon.selected}
                  onChange={() => handleDayCheckChange("Mon")}
                />
                <label className="mr-2 w-8" htmlFor="mon">Mon</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Mon.slot}
                    onChange={(e) => handleSlotChange("Mon", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="tue" 
                  className="mr-2"
                  checked={scheduleData.days.Tue.selected}
                  onChange={() => handleDayCheckChange("Tue")}
                />
                <label className="mr-2 w-8" htmlFor="tue">Tue</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Tue.slot}
                    onChange={(e) => handleSlotChange("Tue", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="wed" 
                  className="mr-2"
                  checked={scheduleData.days.Wed.selected}
                  onChange={() => handleDayCheckChange("Wed")}
                />
                <label className="mr-2 w-8" htmlFor="wed">Wed</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Wed.slot}
                    onChange={(e) => handleSlotChange("Wed", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="thu" 
                  className="mr-2"
                  checked={scheduleData.days.Thu.selected}
                  onChange={() => handleDayCheckChange("Thu")}
                />
                <label className="mr-2 w-8" htmlFor="thu">Thu</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Thu.slot}
                    onChange={(e) => handleSlotChange("Thu", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="fri" 
                  className="mr-2"
                  checked={scheduleData.days.Fri.selected}
                  onChange={() => handleDayCheckChange("Fri")}
                />
                <label className="mr-2 w-8" htmlFor="fri">Fri</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Fri.slot}
                    onChange={(e) => handleSlotChange("Fri", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="sat" 
                  className="mr-2"
                  checked={scheduleData.days.Sat.selected}
                  onChange={() => handleDayCheckChange("Sat")}
                />
                <label className="mr-2 w-8" htmlFor="sat">Sat</label>
                <div className="relative w-full">
                  <select 
                    className="border p-1 rounded-lg w-full appearance-none"
                    value={scheduleData.days.Sat.slot}
                    onChange={(e) => handleSlotChange("Sat", e.target.value)}
                  >
                    <option>Select slot</option>
                    <option>9 am - 12 pm</option>
                    <option>1 pm - 4 pm</option>
                    <option>5 pm - 8 pm</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded-lg"
                onClick={() => setShowAddDoctor(false)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorManagement;