// *****************************************
// App.js
// *****************************************

import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';


// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';

/**
 * Função que irá ler os dados (filmes) da API
 */
async function getFilmes() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/FilmesAPI/");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Filme
 * @param {} dadosNovoFilme 
 */
async function adicionaFilmes(dadosNovoFilme) {
  let formData = new FormData();
  formData.append("Titulo", dadosNovoFilme.Titulo);
  formData.append("UpFotografia", dadosNovoFilme.UpFotografia);
  formData.append("Realizador", dadosNovoFilme.Realizador);
  formData.append("Elenco", dadosNovoFilme.Elenco);
  formData.append("Descricao", dadosNovoFilme.Descricao);
  formData.append("Link", dadosNovoFilme.Link); 
  formData.append("Duracao", dadosNovoFilme.Duracao);
  formData.append("Pontuacao", dadosNovoFilme.Pontuacao);
  // formData.append("titulo", "ola");
  // formData.append("UpFotografia", null);
  // formData.append("pontuacao", 6);
  // formData.append("capa", "texto")
  // formData.append("realizador", "Peter");
  // formData.append("elenco", "ator");
  // formData.append("duracao", 50);
  // formData.append("link", "https://www.imdb.com/title/tt8629748/?ref_=nv_sr_srsg_0");
  // formData.append("descricao", "Ola");
  //teste

  // formData.append("FilmeFK",dadosNovoFilme.FilmeFK);
  let resposta = await fetch("api/FilmesAPI", {
    method: "POST",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Filme. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();
}

async function removeFilme(dadosfilmeremover) {
  let formData = new FormData();
  formData.append("idFilmes", dadosfilmeremover.idFilmes);

  let resposta = await fetch("api/FilmesAPI/" + dadosfilmeremover.idFilmes, {
    method: "DELETE",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo filmes. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();

}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {


  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados dos filmes, vindas da API
       */
      filmes: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados das Fotografias, da API
       * @type{"carregando dados" | "sucesso" | "erro"}
       */
      loadState: "",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage: null
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    // ler os dados dos Filmes e adicioná-los à state 'filmes'
    this.Loadfilmes();
  }

  /**
   * Carrega os dados dos filmes da API e adiciona-os ao array 'filmes'
   */
  async Loadfilmes() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({ loadState: "carregando dados" });
      let filmesVindosDaAPI = await getFilmes();

      // 2.
      // esta não é a forma correta: this.state.fotos = fotosVindosDaAPI;
      this.setState({
        filmes: filmesVindosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro na leitura dos filmes da API", erro);
    }
  }


  /**
 * método que sabe identificar o 'anime' que deverá ser retirado da tabela
 * @param {*} idFilmes - dados do anime a remover
 */
  handlerremovefilme = async (idFilmes) => {
    /*
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
    /**
    * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
    */
    try {
      //Ponto 2
      await removeFilme(idFilmes);

      //Ponto 3
      await this.Loadfilmes();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo filmes; ", erro)
    }
    window.location.reload();
  }


  /**
     * processar os dados recolhidos pelo Formulário
     * @param {*} dadosDoFormulario 
     */

  handlerDadosForm = async (dadosdoFormulario) => {
    /* 
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     **/

    /*
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     **/

    try {
      //Ponto 2
      await adicionaFilmes(dadosdoFormulario);

      //Ponto 3
      await this.Loadfilmes();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Filme; ", erro)
    }
    window.location.reload();
  }


  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { filmes } = this.state;

    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage + '.' ?? "Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div className="container">
            <h1>Fotografias dos Filmes</h1>
            {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
            <Formulario inDadosFilmes={filmes} outDadosFotos={this.handlerDadosForm} />

            <div className="row">
              <div className="col-md-20">
                <hr />
                <h3>Tabela com os Filmes</h3>
                {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosFotos'.
                Neste caso, está a receber o array JSON com os dados das fotos dos Cães,
                lidos da API */}
                <Tabela inDadosFilmes={filmes} filmes={this.handlerremovefilme} />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }
}
export default App;