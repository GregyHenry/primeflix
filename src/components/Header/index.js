import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../services/api";
import "./header.css";

function Header() {
  const [filmePesquisado, setFilmePesquisado] = useState("");
  const [filmes, setFilmes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (filmes.length > 0) {
      localStorage.setItem("@pesquisaFilme", JSON.stringify(filmes));
      navigate("/filmes", {replace: true});
    } else if (filmePesquisado !== "") {
      toast("❌ Não encontrado nenhum filme!");
    }
  }, [filmes]);

  function validaPesquisa() {
    if (filmePesquisado.trim() === "") {
      toast("❌ Preencha o campo de pesquisa!");
    } else {
      buscarFilme(filmePesquisado);
    }
  }

  async function buscarFilme(filme) {
    try {
      const response = await api.get("/search/movie", {
        params: {
          api_key: "f4a14a4c7ba74f928faf535bbd3b0d68",
          query: filme,
          language: "pt-BR"
        }
      });
      console.log(response.data.results);
      setFilmes(response.data.results);
    } catch {
      toast("❌ Ocorreu um erro na busca do filme!");
    }
  }

  return (
    <header>
      <Link className="logo" to="/">
        Prime Flix
      </Link>
      <div className="search">
        <input id="filme" value={filmePesquisado} onChange={(e) => setFilmePesquisado(e.target.value)} type="text" placeholder="Insira o filme desejado..."></input>
        <button onClick={() => validaPesquisa()}>Pesquisar</button>
      </div>
      <Link className="favoritos" to="favoritos">
        Meus Filmes
      </Link>
    </header>
  );
}
export default Header;
