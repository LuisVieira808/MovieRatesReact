//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'


// /**
//  * Mostra uma lista com os Cães existentes,
//  * para o utilizador escolher um
//  */
//  const EscolheFilme = (props) => {
//     // vamos recuperar os dados do parâmetro de entrada: inListaFilmes
//     // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
//     const opcoes = props.inListaFilmes.map((filme) => {
//         return (
//             <option key={filme.idFilmes}
//                 required
//                 value={filme.idFilmes}>{filme.titulo}
//             </option>
//         );
//     }
//     )

//     return (
//         <select required className="form-select" onChange={props.outIdFilmeEscolhido}>
//             <option value="">Escolha um Filme</option>
//             {opcoes}
//         </select>
//     );
// }




/**
 * Formulário para adicionar (fazer upload) de um Filme
 */
 class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            titulo:"",
            capa:null,
            //idFilmes:"",
            realizador:"",
            elenco:"",
            descricao:"",
            link:"",
            duracao:"",
            pontuacao:""
        } 
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerFilmeChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Filme Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            titulo: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerRealizadorChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Filme Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            realizador: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerDescricaoChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Filme Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            descricao: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerElencoChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Filme Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            elenco: evento.target.value
        });
    }

    handlerLinkChange = (evento) =>{
        //guardar os dados recolhidos
        this.setState({
            link: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerDuracaoChange = (evento) =>{
       
        //guardar os dados recolhidos
        this.setState({
            duracao: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Filme
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerPontuacaoChange = (evento) =>{
       
        //guardar os dados recolhidos
        this.setState({
            pontuacao: evento.target.value
        });
    }

        // //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        // if(/\d/.test(evento.target.value)){
        //     evento.target.setCustomValidity("Nome do Filme Inválido");
        //     return;
        // }else {
        //     evento.target.setCustomValidity("");
        // }

        // //guardar os dados recolhidos
        // this.setState({
        //     titulo: evento.target.value
        // });
    


    /**
     * processar os dados fornecidos pelo utilizador no upload da foto do Filme
     * @param {} evento - dados adicionados pelo utilizador
     */
    handlerFotoChange = (evento) => {
        //guardar os dados recolhidos 
        this.setState({
            capa: evento.target.files[0]
        });
    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento 
     */
    handlerSubmitForm = (evento) =>{
        //impedir o formulário de autoenviar os dados para o servidor
        //essa tarefa cabe ao componente App.js
        evento.preventDefault();
        
        //prepração dos dados para serem enviados para a App.js
        //podemos já enviar os dados prontos para serem adicionados à API
        let dadosFormulario = {
            Titulo: this.state.titulo,
            UpFotografia: this.state.capa,
            Realizador: this.state.realizador,
            Elenco: this.state.elenco,
            Descricao: this.state.descricao,
            Link: this.state.link,
            Duracao:this.state.duracao,
            Pontuacao:this.state.pontuacao
            //FilmeFK: this.state.idFilmes
        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosFotos(dadosFormulario);
    }

    render(){
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        //const { inDadosFilmes } = this.props;

        return(
            //o 'return' só consegue devolver um objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                <div className="col-md-4">
                        {/* Filme: <EscolheFilme inListaFilmes={inDadosFilmes}
                        outIdFilmeEscolhido={this.handlerFilmeChange}/><br /> */}
                        Nome do Filme: <input type="text"
                                value={this.state.titulo}
                                onChange={this.handlerFilmeChange}
                                className="form-control btn btn-outline-secondary" /><br />
                </div>
                <div className="col-md-4">  
                        Capa do Filme: <input type="file" 
                                        required
                                        accept=".jpg,.png,.JPG,.PNG"
                                        onChange={this.handlerFotoChange}
                                        className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Descrição: <input type="text"
                                value={this.state.descricao}
                                onChange={this.handlerDescricaoChange}
                                className="form-control btn btn-outline-secondary" /><br /><br />  
                </div>
                <div className="col-md-4">  
                        Realizador do Filme: <input type="text"
                                value={this.state.realizador}
                                onChange={this.handlerRealizadorChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Elenco: <input type="text"
                                value={this.state.elenco}
                                onChange={this.handlerElencoChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Duração: <input type="text"
                                value={this.state.duracao}
                                onChange={this.handlerDuracaoChange}
                                className="form-control btn btn-outline-secondary" /><br /><br />   
                </div>
                <div className="col-md-4">  
                        Pontuação: <input type="number"
                                min="1"
                                max="10"
                                placeholder="1 - 10"
                                value={this.state.pontuacao}
                                onChange={this.handlerPontuacaoChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">
                        Link: <input type="link"
                            required
                            value={this.state.link}
                            onChange={this.handlerLinkChange}
                            className="form-control btn btn-outline-secondary" /><br/>
                </div>
                </div>
                <br></br>
                    <input type="submit" value="Adicionar Filme" className="btn btn-primary" size="lg"/><br /><br /> 
            </form>
            
        )
    }
}

export default Formulario;