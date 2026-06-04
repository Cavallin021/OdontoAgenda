import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getMyAppointments } from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Appointment } from "../../interfaces/appointment.interface";

export default function AppointmentTable() {
  const { token } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchMyAppointments = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getMyAppointments(token);

      const cleanData = data.map((app: Appointment) => ({
        ...app,
        start: new Date(app.start),
        end: new Date(app.end),
      }));

      setAppointments(cleanData);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  return (
    <>
      {appointments && appointments.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ width: "90%", margin: "50px auto" }}
        >
          <Table
            aria-label="tabela de agendamentos"
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              border: 1,
              borderColor: "#c3c3c3",
              p: 2,
              minWidth: 300,
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#c3c3c3" }}>
                <TableCell>
                  <strong>Paciente</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Sala</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Serviço</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Data</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Profissional</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((row) => (
                <TableRow
                  hover
                  //onClick
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.patientName}
                  </TableCell>
                  <TableCell align="center">{row.room}</TableCell>
                  <TableCell align="center">{row.service}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>
                        {formatDate(row.start as string)}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "#666" }}>
                        {formatDate(row.end as string)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="center">{row.user?.nickname}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="flex flex-col justify-center items-center h-[90vh] text-[#3F9691] font-medium gap-4">
          <p>Você ainda não possui agendamentos</p>
        </div>
      )}
    </>
  );
}
