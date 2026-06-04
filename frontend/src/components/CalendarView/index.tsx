import { useEffect, useState, useCallback } from "react";
import { type SlotInfo } from "react-big-calendar";
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAppointments,
  createAppointment,
  editAppointment,
  deleteAppointment,
} from "../../services/api";

import { NewPatientModal, EditPatientModal } from "./CalendarModal";
import { CalendarBoard, type AppointmentEvent } from "./CalendarBoard";

interface ApiAppointment {
  id: string | number;
  userId: string | number;
  patientName: string;
  start: string;
  end: string;
  status: "CONFIRMED" | "CANCELLED" | "PENDING";
  service: string;
  room: number;
}

export default function CalendarView() {
  const { token } = useAuth();

  // Estados de Dados
  const [events, setEvents] = useState<AppointmentEvent[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<any>("month");
  const [showModalNewPatient, setShowModalNewPatient] = useState(false);
  const [showModalEditPatient, setShowModalEditPatient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado do Formulário
  const [form, setForm] = useState({
    id: "",
    patientName: "",
    service: "",
    room: 1,
    startTime: "",
    endTime: "",
    userId: "",
  });

  const fetchAppointments = useCallback(async () => {
    if (!token) return;
    try {
      const data: ApiAppointment[] = await getAppointments(token);
      const formatted: AppointmentEvent[] = data.map((a) => ({
        id: a.id,
        userId: a.userId,
        title: a.patientName,
        start: new Date(a.start),
        end: new Date(a.end),
        status: a.status,
        patientName: a.patientName,
        service: a.service,
        room: String(a.room),
      }));
      setEvents(formatted);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const clickedDate = slotInfo.start.toDateString();
    const alreadySelectedDate = selectedSlot?.start?.toDateString();

    if (clickedDate === alreadySelectedDate) {
      setShowModalNewPatient(true);
    } else {
      setSelectedSlot(slotInfo);
      setCurrentDate(slotInfo.start);

      setForm((prev) => ({
        ...prev,
        startTime: format(slotInfo.start, "HH:mm"),
        endTime: format(slotInfo.end, "HH:mm"),
      }));
    }
  };

  const handleSelectEvent = (event: AppointmentEvent) => {
    setSelectedSlot({
      start: event.start,
      end: event.end,
      slots: [event.start],
    } as SlotInfo);

    setForm({
      id: event.id ? String(event.id) : "",
      patientName: event.patientName || "",
      service: event.service || "",
      room: Number(event.room) || 1,
      startTime: format(event.start, "HH:mm"),
      endTime: format(event.end, "HH:mm"),
      userId: event.userId ? String(event.userId) : "",
    });

    setShowModalEditPatient(true);
  };

  const resetForm = () => {
    setForm({
      id: "",
      patientName: "",
      service: "",
      room: 1,
      startTime: "",
      endTime: "",
      userId: "",
    });
    setSelectedSlot(null);
  };

  async function handleCreate() {
    if (
      !form.patientName ||
      !form.service ||
      !form.startTime ||
      !form.endTime
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!token) return;
    setIsSubmitting(true);

    try {
      const baseDate = selectedSlot?.start
        ? new Date(selectedSlot.start)
        : new Date();
      const [startHours, startMinutes] = form.startTime.split(":").map(Number);
      const [endHours, endMinutes] = form.endTime.split(":").map(Number);

      const finalStartDate = new Date(baseDate);
      finalStartDate.setHours(startHours, startMinutes);
      const finalEndDate = new Date(baseDate);
      finalEndDate.setHours(endHours, endMinutes);

      const { id, userId, startTime, endTime, ...dataToSend } = form;

      await createAppointment(token, {
        ...dataToSend,
        start: finalStartDate,
        end: finalEndDate,
      });

      setShowModalNewPatient(false);
      resetForm();
      await fetchAppointments();
    } catch (error: any) {
      alert(error.message || "Erro ao criar agendamento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!form.id || !token) return;
    setIsSubmitting(true);

    try {
      const id = form.id;

      await deleteAppointment(token, id);

      setShowModalEditPatient(false);
      resetForm();
      await fetchAppointments();
    } catch (error: any) {
      alert(error.message || "Erro ao deletar agendamento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRefresh() {
    if (!form.id || !token) return;
    setIsSubmitting(true);

    try {
      const baseDate = selectedSlot?.start
        ? new Date(selectedSlot.start)
        : new Date();
      const [startHours, startMinutes] = form.startTime.split(":").map(Number);
      const [endHours, endMinutes] = form.endTime.split(":").map(Number);

      const finalStartDate = new Date(baseDate);
      finalStartDate.setHours(startHours, startMinutes);
      const finalEndDate = new Date(baseDate);
      finalEndDate.setHours(endHours, endMinutes);

      const id = form.id;

      await editAppointment(token, id, {
        ...form,
        start: finalStartDate,
        end: finalEndDate,
      });

      setShowModalEditPatient(false);
      resetForm();
      await fetchAppointments();
    } catch (error: any) {
      alert(error.message || "Erro ao atualizar agendamento.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full h-screen text-white">
      <div
        className="w-full bg-white rounded-lg p-4 shadow-xl overflow-hidden 
        [&_.rbc-allday-cell]:hidden 
        [&_.rbc-toolbar-label]:font-bold [&_.rbc-toolbar-label]:text-2xl [&_.rbc-toolbar-label]:text-[#3F9691] [&_.rbc-toolbar-label]:capitalize 
        [&_.rbc-btn-group_button]:border-gray-300 [&_.rbc-btn-group_button]:text-gray-600 
        [&_.rbc-active]:bg-[#318D7F] [&_.rbc-active]:text-white"
      >
        <CalendarBoard
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
          events={events}
          onSelectEvent={handleSelectEvent}
          onOpenModal={() => setShowModalNewPatient(true)}
        />
      </div>

      {/* Modais Separados */}
      {showModalNewPatient && (
        <NewPatientModal
          setForm={setForm}
          form={form}
          isSubmitting={isSubmitting}
          setShowModalNewPatient={setShowModalNewPatient}
          handleCreate={handleCreate}
          resetForm={resetForm}
        />
      )}

      {showModalEditPatient && (
        <EditPatientModal
          setForm={setForm}
          form={form}
          isSubmitting={isSubmitting}
          setShowModalEditPatient={setShowModalEditPatient}
          handleRefresh={handleRefresh}
          handleDelete={handleDelete}
          resetForm={resetForm}
        />
      )}
    </div>
  );
}
