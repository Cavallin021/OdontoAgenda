import { ROOMS_NAMES, ROOMS_NUMBER } from "../../constants/app.constants";

export function NewPatientModal({
  setForm,
  form,
  isSubmitting,
  setShowModalNewPatient,
  handleCreate,
  resetForm,
}: any) {
  const closeModal = () => {
    setShowModalNewPatient(false);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-2xl">
        <h2 className="flex text-xl justify-center font-bold text-gray-800 mb-6 border-b pb-2">
          Novo Agendamento
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Paciente</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
              placeholder="Nome completo"
              value={form.patientName}
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Serviço</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
              placeholder="Ex: Limpeza, Canal..."
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-center gap-8 mb-4">
              {Array.from({ length: ROOMS_NUMBER }).map((_, index) => (
                <button
                  key={index}
                  className={`${
                    form.room === ROOMS_NAMES[index]
                      ? "bg-[#3F9691] text-white"
                      : "bg-gray-300 text-gray-600"
                  } hover:bg-[#318D7F] px-4 py-2 rounded-md font-medium transition-all shadow-sm`}
                  onClick={() => {
                    setForm({ ...form, room: ROOMS_NAMES[index] });
                  }}
                >
                  {`Sala ${ROOMS_NAMES[index]}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-1 block">
                Horário de Início
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
                value={form.startTime}
                onChange={(e) =>
                  setForm({ ...form, startTime: e.target.value })
                }
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-1 block">
                Horário de Fim
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 justify-between">
          <button
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-500 border border-gray-300 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            onClick={() => closeModal()}
          >
            Cancelar
          </button>

          <button
            disabled={isSubmitting || !form.patientName || !form.service}
            className="bg-[#3F9691] hover:bg-[#318D7F] text-white px-6 py-2 rounded-md font-medium transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handleCreate}
          >
            {isSubmitting ? "Salvando..." : "Confirmar Agendamento"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditPatientModal({
  setForm,
  form,
  isSubmitting,
  setShowModalEditPatient,
  handleRefresh,
  handleDelete,
  resetForm,
}: any) {
  const closeModal = () => {
    setShowModalEditPatient(false);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-2xl">
        <h2 className="flex text-xl justify-center font-bold text-gray-800 mb-6 border-b pb-2">
          Atualizar Agendamento
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Paciente</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
              placeholder="Nome completo"
              value={form.patientName}
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Serviço</label>
            <input
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
              placeholder="Ex: Limpeza, Canal..."
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-center gap-8 mb-4">
              {Array.from({ length: ROOMS_NUMBER }).map((_, index) => (
                <button
                  key={index}
                  className={`${
                    form.room === ROOMS_NAMES[index]
                      ? "bg-[#3F9691] text-white"
                      : "bg-gray-300 text-gray-600"
                  } hover:bg-[#318D7F] px-4 py-2 rounded-md font-medium transition-all shadow-sm`}
                  onClick={() => {
                    setForm({ ...form, room: ROOMS_NAMES[index] });
                  }}
                >
                  {`Sala ${ROOMS_NAMES[index]}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-1 block">
                Horário de Início
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
                value={form.startTime}
                onChange={(e) =>
                  setForm({ ...form, startTime: e.target.value })
                }
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-1 block">
                Horário de Fim
              </label>
              <input
                type="time"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#3F9691] outline-none text-black"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 justify-between">
          <div className="flex gap-2">
            <button
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-500 border border-gray-300 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
              onClick={() => closeModal()}
            >
              Cancelar
            </button>

            <button
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-500 border border-gray-300 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
              onClick={handleDelete}
            >
              Deletar
            </button>
          </div>

          <button
            disabled={isSubmitting || !form.patientName || !form.service}
            className="bg-[#3F9691] hover:bg-[#318D7F] text-white px-6 py-2 rounded-md font-medium transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handleRefresh}
          >
            {isSubmitting ? "Salvando..." : "Atualizar"}
          </button>
        </div>
      </div>
    </div>
  );
}
