/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import "./style.css";
import Create from "./create";
import { AuthContext } from "../App";
import swal from "sweetalert";
import Update from "./update";

const List = () => {
  const { data, setData, handleShowList } = useContext(AuthContext);
  const [load, setLoad] = useState(false);
  const [searchUser, setSearchUser] = useState(data);
  const [name, setName] = useState("");
  const [dataId, setDataId] = useState(null);

  const searchForName = (e) => {
    const keyWord = e.target.value;

    if (keyWord !== "") {
      const result = data.filter((l) => {
        return l.name.toLowerCase().startsWith(keyWord.toLowerCase());
      });
      setSearchUser(result);
    } else {
      setSearchUser(data);
    }
    setName(keyWord);
  };

  const remove = async (indice) => {
    await axios
      .delete(`http://localhost:8080/users/${indice}`)
      .then((res) => {
        const tempUsers = [...data];
        const userId = tempUsers.findIndex((i) => {
          return i.id === data[indice];
        });
        tempUsers.splice(userId, 1);

        swal({
          title: `Contato excluido`,
          text: `usuario excluido  com sucesso!`,
          icon: "success",
          button: "ok!",
        });
        setData(tempUsers);
      })
      .catch((error) => {
        swal({
          title: `Erro ao excluir`,
          text: `Algo deu errado!`,
          icon: "error",
          button: "ok!",
        });
        console("error = ", error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1000);
    handleShowList();
  }, []);

  return (
    <>
    {dataId && 
        <div>
            <Update user={dataId} setDataId={setDataId}/>
        </div>
    }
      {!load ? (
        "Aguarde..."
      ) : (
        <div className="container">
          <div className="myheader">
            <div className="lef">
              <input
                type="text"
                aria-label="Last name"
                className="form-control"
                value={name}
                onChange={searchForName}
                placeholder="Buscar por nome"
              />
            </div>
            <div className="rig">
              <Create />
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th> # </th>
                <th> Nome </th>
                <th> Contato </th>
                <th></th>
              </tr>
            </thead>
            {searchUser && searchUser.length > 0
              ? searchUser.map((i, index) => (
                  <>
                    <tbody>
                      <tr key={index}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.phone}</td>
                        <td>
                          <div className="btn-opt">
                          <div className="">
                              <button
                                type="button"
                                onClick={() => setDataId(i)}
                                className="btn btn-warning"
                              >
                                Editar
                              </button>
                            </div>
                            <div className="btn-r">
                              <button
                                type="button"
                                onClick={() => remove(i.id)}
                                className="btn btn-danger"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))
              : data.map((i, index) => (
                  <>
                    <tbody>
                      <tr key={index}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.phone}</td>
                        <td>
                          <div className="btn-opt">
                          <div className="">
                              <button
                                type="button"
                                onClick={() => setDataId(i)}
                                className="btn btn-warning"
                              >
                                Editar
                              </button>
                            </div>
                           
                            <div className="btn-r">
                              <button
                                type="button"
                                onClick={() => remove(i.id)}
                                className="btn btn-danger"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
          </table>
        </div>
       )} 
    </>
  );
};

export default List;
