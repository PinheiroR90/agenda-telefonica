
/* eslint-disable react/no-unknown-property */
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import swal from 'sweetalert';

const Create = () => {
  const { data, setData } = useContext(AuthContext);
  const [userObj,setUserObj] = useState({name:'',phone:''})
  const [, setLoad] = useState(false);

  const handleChange = (e) => {
    setUserObj({...userObj,[e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    setLoad(true);
    await axios.post(`http://localhost:8080/users`,userObj)
      .then((response)=>{
        setData([...data,response]);
          swal({
                  title: "Salvo!",
                  text: "Contato salvo com sucesso!",
                  icon: "success",
                  button: "ok!",
                });
      })
      .catch((err) =>{
        swal({
                title: "Error!",
                text: "Erro ao tentar salvar!",
                icon: "error",
                button: "ok!",
             } );
        console.log("Erros == ", err)});
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Adicionar
      </button>
    <form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Adicionar Contato
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
             <span
                className="input-group-text myspan"
                id="inputGroup-sizing-default"
              >
                Nome
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="name"
                value={userObj.name}
                onChange={handleChange}
              />
              <span
                className="input-group-text myspan"
                id="inputGroup-sizing-default"
              >
                Contato
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="phone"
                value={userObj.phone}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default Create;
