export default function TaskForm() {
    return (
        <form className="mb-4">
            <div className="row g-3">
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Título" />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Descripción" />
                </div>
                <div className="col-md-2">
                    <input type="date" className="form-control" placeholder="Fecha de inicio" />
                </div>
                <div className="col-md-2">
                    <input type="date" className="form-control" placeholder="Fecha final" />
                </div>
                <div className="col-md-2">
                    <select className="form-select">
                        <option value="En curso">En curso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary w-100">Agregar tarea</button>
                </div>
            </div>
        </form>
    )
}
