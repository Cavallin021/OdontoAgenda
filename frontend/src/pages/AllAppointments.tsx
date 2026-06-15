import AllAppointmentTable from "../components/allAppointmentTable";

export default function AllAppointments() {
  return (
    <div className="w-full h-full p-6">
      <div className="w-full max-w-6xl mx-auto h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <AllAppointmentTable />
      </div>
    </div>
  );
}
