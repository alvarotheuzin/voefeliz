'use client'; 

import Pagina from "@/app/components/Pagina";
import apiLocalidade from "@/app/services/apiLocalidade";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || []
    const dados = aeroportos.find(item => item.id == params.id)
    const aeroporto = dados || { nome: '', sigla: '', uf: '', cidade: ''}

    const [ paises, setPaises] = useState([])
    const [ ufs, setUfs] = useState([])
    const [ cidades, setCidades] = useState([])

    useEffect(()=>{

        apiLocalidade.get(`paises`).then(resultados=>{
            setPaises(resultado.data)
        })

    }, [])
    
    function salvar(dados) {

        if(aeroporto.id){
            Object.assign(aeroporto, dados)
        } else {
            dados.id = v4()
            aeroportos.push(dados)
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos))
        return route.push('/aeroportos')
    }

    return (
        <Pagina titulo="Aeroportos">

            <Formik
                initialValues={aeroporto}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pais">
                            <Form.Label>Pais</Form.Label>
                            <Form.Select
                                type="text"
                                name="pais"
                                value={values.pais}
                                onChange={handleChange('pais')}
                                >
                                <option value= ''>Selecione</option>
                                    {paises.map(item => (
                                        <option value={item.nome}>{item.nome}</option>
                                    ))}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="uf">
                            <Form.Label>Uf</Form.Label>
                            <Form.Control
                                type="text"
                                name="uf"
                                value={values.uf}
                                onChange={handleChange('uf')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={values.cidade}
                                onChange={handleChange('cidade')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/aeroportos"
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}