import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
    });
  };
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
    });
  };
  const limpiarCampos = () => {
    setAnios("");
    setCargo("");
    setNombre("");
    setPais("");
    setEdad("");
    setId("");
    setEditar(false);
  };
  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => setNombre(event.target.value)}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un Nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Edad:
            </span>
            <input
              type="text"
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
              className="form-control"
              placeholder="Ingrese una Edad"
              aria-label="Edad"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              {" "}
              País:
            </span>
            <input
              onChange={(event) => setPais(event.target.value)}
              type="text"
              value={pais}
              className="form-control"
              placeholder="Ingrese una País"
              aria-label="País"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Cargo:
            </span>
            <input
              onChange={(event) => setCargo(event.target.value)}
              type="text"
              value={cargo}
              className="form-control"
              placeholder="Ingrese una Cargo"
              aria-label="Cargo"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Años:
            </span>
            <input
              type="text"
              value={anios}
              onChange={(event) => setAnios(event.target.value)}
              className="form-control"
              placeholder="Ingrese una Años"
              aria-label="Años"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
          editar? 
            <div>
              <button className="btn btn-warning mr-2" onClick={update}>
                Actualizar
              </button><button className="btn btn-info mr-2" onClick={limpiarCampos}>
                Cancelar
              </button> 
            </div>
           
            :<button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(empleadosList) ? empleadosList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>

                    <button type="button" className="btn btn-danger">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          }) : "No hay nada que mostrar"}
        </tbody>
      </table>
    </div>
  );
}

export default App;
