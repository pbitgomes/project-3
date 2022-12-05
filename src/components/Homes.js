import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Aqui é a página inicial</h1>
      <Link to="/cadastro">Cadastro</Link>
    </div>
  );
}

export default Home;
