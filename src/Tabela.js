// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                {/* <th>Id do Filme</th> */}
                <th>Nome do Filme</th>
                <th>Capa do Filme</th>
                <th>Descrição</th>
                <th>Realizador do Filme</th>
                <th>Elenco</th>
                <th>Duração</th>
                <th>Pontuação 0/10</th>
                <th>Link</th>
                <th></th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosFilmes'
    const rows = props.dadosDosFilmes.map((row) => {
        return (
            <tr key={row.idFilmes}>
                {/* <td>{row.idFilmes}</td> */}
                <td><br></br><br></br>{row.titulo}</td>
                <td><img src={'fotos/' + row.capa}
                    alt={'foto do ' + row.titulo}
                    height="150" width="120"/>
                </td>
                <td><br></br><br></br>{row.descricao}</td>
                <td><br></br><br></br>{row.realizador}</td>
                <td><br></br><br></br>{row.elenco}</td>
                <td><br></br><br></br>{row.duracao}</td>
                <td><br></br><br></br>{row.pontuacao}</td>
                <td>
                <br></br><br></br>
                <a href={row.link}>
                    <img src="fotos/linke.png"
                    alt={row.link}
                    height="40" width="40"/>
                </a>
                </td>
                <td>
                <br></br><br></br>
                <button className="btn btn-secondary" onClick={()=>props.filmeAremover(row)}>Delete</button>
                </td>
            </tr>

        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { inDadosFilmes, filmes } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosfilmes' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosFilmes={inDadosFilmes} filmeAremover={filmes} />
            </table>
        );
    }
}


export default Tabela

