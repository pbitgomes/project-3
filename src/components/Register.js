import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

function Register() {
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImg(e.target.files[0]);
  };

  // faz a requisição d imagem (/upload-image) e retorna o path (caminho da imagem)
  const handleUpload = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      // subindo a imagem para o cloudinary
      const response = await api.post("/uload-image", uploadData);

      // retorna o caminho (path) da imagem dentro do cloudinary
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgURL = await handleUpload()
      // criar a requisição para enviar este novo usuário ao BD
      // requisição do método POST
      await api.post("user/register", {...form, profileImg: imgURL})
  
      navigate("/login");
    } catch (error){
      console.log(error)
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um nome"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Endereço de Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira um e-mail válido"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Imagem de perfil</Form.Label>
          <Form.Control type="file" onChange={handleImage} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirmar senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha criada"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar usuário
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
