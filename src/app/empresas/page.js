'use client'

import Pagina from "@/components/Pagina"
import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {

    const empresas = JSON.parse(localStorage.getItem('empresas')) || []

    return (
        <Pagina titulo="Empresas">

            <Link
                href="/empresas/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th colSpan="20" className="text-center">Voo</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Aeroporto</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Empresa</th>
                        <th>Site</th>
                        <th>Voo</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Preço</th>
                        <th>Assento</th>
                        <th>Nome</th>
                        <th>Tipo de Documento</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.aeroporto}</td>
                            <td>{item.cidade}</td>
                            <td>{item.uf}</td>
                            <td>{item.nome}</td>
                            <td>
                                <a href={item.site} target="_blank" rel="noopener noreferrer">
                                    <img src={item.logo} alt="Logo" width={50} />
                                </a>
                            </td>
                            <td>{item.voo}</td>
                            <td>{item.origem}</td>
                            <td>{item.destino}</td>
                            <td>{item.preco}</td>
                            <td>{item.assento}</td>
                            <td>{item.nomePassageiro}</td>
                            <td>{item.tipoDocumento}</td>
                            <td>{item.dataNascimento}</td>
                            <td>{item.telefone}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
