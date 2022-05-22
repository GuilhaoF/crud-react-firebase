import React, { useState, useEffect } from "react";
import firebase from "./firebaseConnection";
import "./styles.css";
function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [post, setPost] = useState([]);
  const [idPost, setIdPost] = useState("");

  useEffect(() => {
    async function loadPost() {
      await firebase
        .firestore()
        .collection("posts")
        .onSnapshot((doc) => {
          let myPosts = [];
          doc.forEach((item) => {
            myPosts.push({
              id: item.id,
              titulo: item.data().titulo,
              autor: item.data().autor,
            });
          });
          setPost(myPosts);
        });
    }
    loadPost();
  }, []);

  async function handleAddBook() {
    await firebase
      .firestore()
      .collection("posts")
      .add({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.info("Tudo Certo");
        setTitulo("");
        setAutor("");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async function handleBuscarBook() {
    /* await firebase
      .firestore()
      .collection("posts")
      .doc("126")
      .get()
      .then((snapshot) => {
        setTitulo(snapshot.data().titulo);
        setAutor(snapshot.data().autor);
      })
      .catch((err) => {
        console.error(err);
      });
      */
    await firebase
      .firestore()
      .collection("posts")
      .get()
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPost(lista);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async function handleEditPost() {
    await firebase
      .firestore()
      .collection("posts")
      .doc(idPost)
      .update({
        titulo: titulo,
        autor: autor,
      })
      .then(() => {
        console.debug("dados atualizados");
        setTitulo("");
        setAutor("");
        setIdPost("");
      })
      .catch(() => {
        console.error("erro");
      });
  }
  async function HandleExcluirBook(id) {
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        alert("Deletado");
      });
  }

  return (
    <div className="App">
      <div className="app-form">
        <h1>FirebaseBook</h1>
        <input
          type="text"
          placeholder="Digite o id Post"
          onChange={(e) => setIdPost(e.target.value)}
          value={idPost}
        />
        <input
          type="text"
          placeholder="Digite Nome do Livro"
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
        />
        <input
          type="text"
          placeholder="Digite o Autor"
          onChange={(e) => setAutor(e.target.value)}
          value={autor}
        />
        <button className="Add" onClick={handleAddBook}>
          Cadastrar Livro
        </button>
        <br />
        <button className="Search" onClick={handleBuscarBook}>
          Buscar Livro
        </button>
        <br />
        <button className="Edit" onClick={handleEditPost}>
          Editar Livro
        </button>

        <ul>
          {post.map((post) => {
            return (
              <li key={post.id}>
                <span>Id : {post.id}</span>
                <span>titulo: {post.titulo} </span> <br />
                <span>autor: {post.autor} </span> <br />
                <button onClick={() => HandleExcluirBook(post.id)}>
                  Excluir Livro
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
