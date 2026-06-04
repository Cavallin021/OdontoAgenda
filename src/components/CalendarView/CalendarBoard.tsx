import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  type Event,
  type SlotInfo,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const locales = { "pt-BR": ptBR };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface AppointmentEvent extends Event {
  id: string | number;
  userId: string | number;
  title: string;
  start: Date;
  end: Date;
  patientName?: string;
  service?: string;
  room?: string;
  status?: "CONFIRMED" | "CANCELLED" | "PENDING";
}

interface CalendarBoardProps {
  events: AppointmentEvent[];
  onSelectEvent: (event: AppointmentEvent) => void;
  onSelectSlot: (slotInfo: SlotInfo) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  currentView: any;
  selectedSlot: SlotInfo | null;
  setCurrentView: (view: any) => void;
  onOpenModal: () => void;
}

export function CalendarBoard({
  events,
  onSelectEvent,
  currentView,
  currentDate,
  setCurrentDate,
  onSelectSlot,
  onOpenModal,
  setCurrentView,
  selectedSlot,
}: CalendarBoardProps) {
  const getMonthName = (offset: number) => {
    const date = addMonths(currentDate, offset);
    const monthName = format(date, "MMMM", { locale: ptBR });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0);

  return (
    <BigCalendar
      className="text-[#75B8A9]"
      selectable
      onSelectEvent={onSelectEvent}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      culture="pt-BR"
      min={minTime}
      max={maxTime}
      style={{ height: "calc(100vh - 100px)" }}
      date={currentDate}
      view={currentView}
      onNavigate={(newDate: any) => setCurrentDate(newDate)}
      onSelectSlot={(slotInfo) => {
        onSelectSlot(slotInfo);
      }}
      onView={(view) => {
        if (view === "agenda") {
          onOpenModal();
        } else {
          setCurrentView(view);
        }
      }}
      messages={{
        next: getMonthName(1),
        previous: getMonthName(-1),
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
        agenda: "Nova Consulta",
        time: "Hora",
        event: "Evento",
        noEventsInRange: "Não há agendamentos neste período.",
      }}
      dayPropGetter={(date) => {
        const isSelected =
          selectedSlot &&
          date.toDateString() === selectedSlot.start.toDateString();

        if (isSelected) {
          return {
            style: {
              backgroundColor: "#bbdcb86e",
            },
          };
        }
        return {};
      }}
      eventPropGetter={(event: any) => {
        let bg = "#318d7f";
        if (event.status === "CONFIRMED") bg = "#0fcbba";
        if (event.status === "CANCELLED") bg = "#ef4444";
        if (event.status === "PENDING") bg = "#f59e0b";

        return {
          style: {
            paddingInline: 8,
            backgroundColor: bg,
            borderRadius: "4px",
            border: "none",
            color: "black",
            display: "block",
          },
        };
      }}
    />
  );
}
