"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
  HelpCircle,
  Grid3x3,
  Menu,
  X,
  Clock,
  Edit2,
  Trash2,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  description?: string;
  type?: "event" | "task" | "reminder";
}

interface Calendar {
  name: string;
  checked: boolean;
  color: string;
}

type ViewMode = "month" | "week" | "day" | "schedule";

export function TenantCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditCalendarModal, setShowEditCalendarModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventColor, setNewEventColor] = useState("#0B8043");
  const [newEventType, setNewEventType] = useState<
    "event" | "task" | "reminder"
  >("event");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newCalendarName, setNewCalendarName] = useState("");
  const [newCalendarColor, setNewCalendarColor] = useState("#039BE5");
  const [searchQuery, setSearchQuery] = useState("");
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "First Day of Black History",
      start: new Date(2026, 1, 1),
      end: new Date(2026, 1, 1),
      color: "#0B8043",
    },
    {
      id: "2",
      title: "Valentine's Day",
      start: new Date(2026, 1, 14),
      end: new Date(2026, 1, 14),
      color: "#0B8043",
    },
    {
      id: "3",
      title: "Presidents' Day",
      start: new Date(2026, 1, 21),
      end: new Date(2026, 1, 21),
      color: "#0B8043",
    },
    {
      id: "4",
      title: "First Day of Women's Histr.",
      start: new Date(2026, 2, 1),
      end: new Date(2026, 2, 1),
      color: "#0B8043",
    },
  ]);
  const [myCalendars, setMyCalendars] = useState<Calendar[]>([
    { name: "my calendar", checked: true, color: "#039BE5" },
    { name: "Birthdays", checked: true, color: "#0B8043" },
    { name: "Optimization squad", checked: true, color: "#7986CB" },
    { name: "Reminders", checked: true, color: "#E67C73" },
    { name: "Tasks", checked: true, color: "#F6BF26" },
  ]);

  // Get calendar days for current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI"];

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const connectGoogleCalendar = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      window.open("https://calendar.google.com/calendar/u/0/r", "_blank");
      return;
    }

    // Google OAuth implementation
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${window.location.origin}/auth/google/callback&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly&access_type=offline`;
    window.location.href = authUrl;
  };

  const handleCreateEvent = () => {
    if (!newEventTitle || !newEventDate) return;

    const eventDate = new Date(newEventDate);
    if (newEventTime) {
      const [hours, minutes] = newEventTime.split(":");
      eventDate.setHours(parseInt(hours), parseInt(minutes));
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      start: eventDate,
      end: eventDate,
      color: newEventColor,
      description: newEventDescription,
      type: newEventType,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventDescription("");
    setShowCreateModal(false);
  };

  const handleEditEvent = () => {
    if (!editingEvent || !newEventTitle || !newEventDate) return;

    const eventDate = new Date(newEventDate);
    if (newEventTime) {
      const [hours, minutes] = newEventTime.split(":");
      eventDate.setHours(parseInt(hours), parseInt(minutes));
    }

    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id
        ? {
            ...event,
            title: newEventTitle,
            start: eventDate,
            end: eventDate,
            color: newEventColor,
            description: newEventDescription,
          }
        : event,
    );

    setEvents(updatedEvents);
    setShowEditEventModal(false);
    setEditingEvent(null);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventDescription("");
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setShowEditEventModal(false);
    setEditingEvent(null);
  };

  const openEditEventModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setNewEventDate(event.start.toISOString().split("T")[0]);
    setNewEventTime(event.start.toTimeString().slice(0, 5));
    setNewEventColor(event.color);
    setNewEventDescription(event.description || "");
    setShowEditEventModal(true);
  };

  const handleAddCalendar = () => {
    if (!newCalendarName) return;

    setMyCalendars([
      ...myCalendars,
      { name: newCalendarName, checked: true, color: newCalendarColor },
    ]);
    setNewCalendarName("");
    setShowEditCalendarModal(false);
  };

  const handleDeleteCalendar = (index: number) => {
    setMyCalendars(myCalendars.filter((_, i) => i !== index));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Get small calendar for sidebar
  const getSmallCalendarDays = () => {
    const days = getDaysInMonth();
    return days;
  };

  const colorPalette = [
    { name: "Tomato", value: "#D50000" },
    { name: "Flamingo", value: "#E67C73" },
    { name: "Tangerine", value: "#F4511E" },
    { name: "Banana", value: "#F6BF26" },
    { name: "Sage", value: "#33B679" },
    { name: "Basil", value: "#0B8043" },
    { name: "Peacock", value: "#039BE5" },
    { name: "Blueberry", value: "#3F51B5" },
    { name: "Lavender", value: "#7986CB" },
    { name: "Grape", value: "#8E24AA" },
    { name: "Graphite", value: "#616161" },
    { name: "Cocoa", value: "#A79B8E" },
  ];

  const filteredEvents = events.filter(
    (event) =>
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-white relative flex flex-col h-screen">
      {/* Booking Process Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8">
          {/* Select Date */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
              <Image
                src="/calender.png"
                alt="Calendar"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-900">
              Select date
            </span>
          </div>

          {/* Arrow */}
          <div className="w-16 h-8 relative">
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={64}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Select Time Slot */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
              <Image
                src="/time.png"
                alt="Time"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-900">
              Select time slot
            </span>
          </div>

          {/* Arrow */}
          <div className="w-16 h-8 relative">
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={64}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Confirmation */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden">
              <Image
                src="/checkmail.png"
                alt="Confirmation"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-900">
              Confirmation
            </span>
          </div>
        </div>
      </div>
      {/* Fixed Header - Always Full Width */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between w-full z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/calender.png"
                alt="Calendar"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-normal text-gray-700">Calendar</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded border border-gray-300"
          >
            Today
          </button>
          <div className="flex gap-1">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <span className="text-xl font-normal text-gray-700 min-w-[180px]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchQuery("")}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={connectGoogleCalendar}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative">
            <button
              onClick={() =>
                setViewMode(
                  viewMode === "month"
                    ? "week"
                    : viewMode === "week"
                      ? "day"
                      : "month",
                )
              }
              className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1"
            >
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Grid3x3 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Create Event
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  value={newEventType}
                  onChange={(e) =>
                    setNewEventType(
                      e.target.value as "event" | "task" | "reminder",
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="event">Event</option>
                  <option value="task">Task</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add description"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <button
                  onClick={() => setShowColorDropdown(!showColorDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: newEventColor }}
                    />
                    <span>
                      {colorPalette.find((c) => c.value === newEventColor)
                        ?.name || "Custom"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showColorDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                    <div className="grid grid-cols-6 gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            setNewEventColor(color.value);
                            setShowColorDropdown(false);
                          }}
                          className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${newEventColor === color.value ? "border-gray-900 ring-2 ring-blue-500" : "border-gray-200"}`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCreateEvent}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowColorDropdown(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditEventModal && editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Event
              </h3>
              <button
                onClick={() => setShowEditEventModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add description"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <button
                  onClick={() => setShowColorDropdown(!showColorDropdown)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: newEventColor }}
                    />
                    <span>
                      {colorPalette.find((c) => c.value === newEventColor)
                        ?.name || "Custom"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showColorDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                    <div className="grid grid-cols-6 gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            setNewEventColor(color.value);
                            setShowColorDropdown(false);
                          }}
                          className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${newEventColor === color.value ? "border-gray-900 ring-2 ring-blue-500" : "border-gray-200"}`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleEditEvent}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteEvent(editingEvent.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => {
                    setShowEditEventModal(false);
                    setShowColorDropdown(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Calendar Modal */}
      {showEditCalendarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add Calendar
              </h3>
              <button
                onClick={() => setShowEditCalendarModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calendar Name
                </label>
                <input
                  type="text"
                  value={newCalendarName}
                  onChange={(e) => setNewCalendarName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter calendar name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "#D50000",
                    "#E67C73",
                    "#F4511E",
                    "#F6BF26",
                    "#33B679",
                    "#0B8043",
                    "#039BE5",
                    "#3F51B5",
                    "#7986CB",
                    "#8E24AA",
                    "#616161",
                    "#A79B8E",
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewCalendarColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${newCalendarColor === color ? "border-gray-900" : "border-gray-200"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddCalendar}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Calendar
                </button>
                <button
                  onClick={() => setShowEditCalendarModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Positioned Below Header */}
        {sidebarOpen && (
          <div className="w-64 border-r border-gray-200 p-4 space-y-6 overflow-y-auto bg-white">
            {/* Create Button with Google Colors */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-full hover:shadow-md transition-shadow"
            >
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4V10M10 10V16M10 10H16M10 10H4"
                      stroke="url(#gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="4"
                        y1="4"
                        x2="16"
                        y2="16"
                      >
                        <stop offset="0%" stopColor="#4285F4" />
                        <stop offset="33%" stopColor="#EA4335" />
                        <stop offset="66%" stopColor="#FBBC04" />
                        <stop offset="100%" stopColor="#34A853" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="font-medium text-gray-700">Create</span>
            </button>

            {/* Mini Calendar */}
            <div className="bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-gray-500 font-medium py-1">
                    {day}
                  </div>
                ))}
                {getSmallCalendarDays().map((date, index) => (
                  <div
                    key={index}
                    className={`py-1 text-xs cursor-pointer rounded-full ${
                      date && isToday(date)
                        ? "bg-blue-600 text-white font-bold"
                        : date
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-300"
                    }`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date ? date.getDate() : ""}
                  </div>
                ))}
              </div>
            </div>

            {/* Meet with section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <Search className="w-4 h-4" />
                <span>Search for people</span>
              </div>
            </div>

            {/* Time Insights */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  Time Insights
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span>Display this only</span>
              </div>
            </div>

            {/* My Calendars */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-gray-900">
                  My calendars
                </div>
                <button
                  onClick={() => setShowEditCalendarModal(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {myCalendars.map((cal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={cal.checked}
                        onChange={() => {
                          const updated = [...myCalendars];
                          updated[index].checked = !updated[index].checked;
                          setMyCalendars(updated);
                        }}
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        style={{ accentColor: cal.color }}
                      />
                      <span className="text-sm text-gray-700">{cal.name}</span>
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => handleDeleteCalendar(index)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Settings and Sharing */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={connectGoogleCalendar}
                className="text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded w-full text-left"
              >
                Settings and sharing
              </button>
              {/* Color Palette */}
              <div className="mt-3">
                <div className="grid grid-cols-6 gap-1">
                  {colorPalette.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setNewEventColor(color.value)}
                      className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Calendar Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* Calendar Grid */}
          <div className="p-6">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-200 bg-white">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 border-l border-t border-gray-200 bg-white">
              {getDaysInMonth().map((date, index) => {
                const dayEvents = date
                  ? getEventsForDate(date).filter((e) =>
                      myCalendars.find((cal) => cal.checked),
                    )
                  : [];
                const isTodayDate = isToday(date);

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
                      date
                        ? "bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                        : "bg-gray-50"
                    }`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date && (
                      <div>
                        <div
                          className={`text-xs font-medium mb-1 inline-flex items-center justify-center ${
                            isTodayDate
                              ? "bg-blue-600 text-white w-6 h-6 rounded-full"
                              : "text-gray-700"
                          }`}
                        >
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditEventModal(event);
                              }}
                              className="text-xs px-2 py-1 rounded text-white truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
                              style={{ backgroundColor: event.color }}
                            >
                              {event.type === "task" && <span>✓</span>}
                              {event.type === "reminder" && <span>🔔</span>}
                              <span className="truncate">{event.title}</span>
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-gray-500 px-2">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
