import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function FilmesPesquisados() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    function getFilmesFromLocalStorage() {
      const filmesPesquisados = localStorage.getItem("@pesquisaFilme");
      return JSON.parse(filmesPesquisados) || [];
    }

    setFilmes(getFilmesFromLocalStorage());
  }, []);

  useEffect(() => {
    const controleAtualizacao = setInterval(() => {
      const filmesPesquisados = localStorage.getItem("@pesquisaFilme");
      const filmes = JSON.parse(filmesPesquisados) || [];
      setFilmes(filmes);
    }, 1000);

    return () => {
      clearInterval(controleAtualizacao);
    };
  }, []);

  return (
    <div className="container">
      <div className="lista-filmes">
        <h1>Pesquisa</h1>
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default FilmesPesquisados;
