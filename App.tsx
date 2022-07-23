import * as React from 'react';
import './style.css';
import axios from 'axios';

const url = 'https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/';

async function buscarTodasTarefas() {
  const resultado = await axios.get(url);
  return resultado.data;
}

let resultado;

// resultado = await buscarTodasTarefas();

async function buscarPorUsuario(user) {
  const configs = {
    params: {
      user: user,
    },
  };
  const resultado = await axios.get(url, configs);
  return resultado.data;
}

//resultado = await buscarPorUsuario('seumathias');

async function inserirTarefa(user, description) {
  const DTO = {
    user: user,
    description: description,
  };

  const resultado = await axios.post(url, DTO);
  return resultado.data;
}
// resultado = await inserirTarefa('Melissa', 'Entregar exercício');

async function alterarTarefa(id, user, description) {
  const dto = {
    user: user,
    description: description,
  };

  const alterar = await axios.put(`${url}${id}`, dto);
  return alterar.data;
}

/* resultado = await alterarTarefa(
  'd3d64784-d290-49b5-8e19-3b918cd60a91',
  'Daniel',
  'e suas extensões de arquivo'
);*/

async function deletarTarefa(id) {
  const deletar = await axios.delete(`${url}${id}`);
  return deletar.data;
}
//resultado = await deletarTarefa('d3d64784-d290-49b5-8e19-3b918cd60a91');

async function deleteByUser(user) {
  const configs = {
    params: {
      user,
    },
  };
  const deletar = await axios.delete(url, configs);
}

inserirTarefa('Matheus', 'minha tarefa');

console.log(resultado);

export default function App() {
  const [tarefas, setTarefas] = React.useState([]);
  const [inputTarefa, setInputTarefa] = React.useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnClickAdicionar = () => {
    const novoArray = tarefas;
    novoArray.push(inputTarefa);
    setTarefas([...novoArray]);
    setInputTarefa('');
  };

  const buscarTarefasMatheus = async () => {
    const url = 'https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/';
    const resultado = await axios.get(url, {
      params: { user: 'Matheus' },
    });
    return resultado.data.items;
  };

  React.useEffect(() => {
    buscarTarefasMatheus().then((retornoTarefas) => {
      setTarefas(retornoTarefas);
    });
  });

  const handleOnClickExcluir = (index) => {
    console.log(index);
    setTarefas(
      tarefas.filter((tarefa, indexOriginal) => indexOriginal !== index)
    );
  };

  /*  mesma coisa que acima apenas feita de forma diferente
  const handleOnClickExcluir = (index) => {
    const novasTarefas = tarefas.filter((tarefa, _index) => _index !== index)  
    );
    return setTarefas(novasTarefas)
  };*/

  const deletarTarefasById = async (id) => {
    const resultado = await axios.delete(`${url}${id}`);
    return resultado;
  };

  return (
    <div className="container">
      <div className="conteudo">
        <h1 className="titulo">Tarefas</h1>
        <div>
          <form onSubmit={handleOnSubmit}>
            <div className="tarefa_box">
              <label htmlFor="tarefa">Tarefa</label>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                }}
              >
                <input
                  id="tarefa"
                  name="tarefa"
                  value={inputTarefa}
                  onChange={(e) => setInputTarefa(e.target.value)}
                  placeholder="minha tarefa"
                />
                <button
                  className="btn btn_adicionar"
                  onClick={handleOnClickAdicionar}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>
          <section>
            <ul>
              {tarefas.map((tarefa, index) => (
                <li>
                  <input
                    className="tarefa_conteudo"
                    disabled
                    value={tarefa.description}
                  />
                  <button
                    className="btn btn_excluir"
                    onClick={() => handleOnClickExcluir(index)}
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
