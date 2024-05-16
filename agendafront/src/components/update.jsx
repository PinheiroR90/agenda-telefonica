
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import swal from "sweetalert";
import { Button, Modal } from "react-bootstrap";

const Update = (user) => {

  const { data, setData, handleShowList } = useContext(AuthContext);
  const [userObj, setuserObj] = useState({ name: user.user.name, phone: user.user.phone });

  const handleChange = (e) => {
    setuserObj({...userObj,[e.target.name]: e.target.value})};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:8080/users/" + user.user.id, userObj)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        const userTemp = [...data];
        const index = userTemp.filter((i) => {
          return i.id === user.user.id;
        });
        userTemp[index] = userObj;
        swal({
          title: "Atualizado!",
          text: "Contato atualizado com sucesso!",
          icon: "success",
          button: "ok!",
        });
        setData(userTemp);
        user.setDataId(null);
        handleShowList();
      })
      .catch((error) => {
        swal({
          title: `Erro ao editar`,
          text: `Algo deu errado!`,
          icon: "error",
          button: "ok",
        });
        console("error = ", error);
      });
  };

  return (
    <>
      <Modal show={user.user.id} onHide={() => user.setDataId(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar contato</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
        <Modal.Body>
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
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>user.setDataId(null)}>Fechar</Button>
          <Button type="submit" variant="primary">Alterar</Button>
        </Modal.Footer>
      </form>
      </Modal>
    </>
  );
};

export default Update;
