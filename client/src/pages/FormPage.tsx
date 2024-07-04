import {FC, useContext, useState} from "react";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

import { useForm, SubmitHandler } from "react-hook-form"
import { Context } from "..";
import RepositoryService from "../services/GetRepository";
import { IResponsRepository } from "../models/response/ResponsRepository";
import { observer } from "mobx-react-lite";


interface MyRepository {
    inputValue: string| number;
}

const FormPage: FC = () => {
    const {store} = useContext(Context)

    const { register, handleSubmit, formState: { errors, isValid,  isDirty }} = useForm<MyRepository>({
        mode: 'onBlur',
      })

    const submit: SubmitHandler<MyRepository> = (data) => {
        // store.getRes(email, number.replace(/[-]/g,"")) 
        // setEmail('')
        // setNumber('')
        send()
        setInputValue('')
    }
    
    const [inputValue, setInputValue] = useState<string>('')
    const [messageSync , setMessageSync] = useState<string>('')
    const [repositories , setRepositories] = useState<IResponsRepository[]>([])

    const send = () => {
        store.getOneRepository(inputValue)
        setInputValue('')
    }

    const startSync = async () => {
       await RepositoryService.updateRepositories()
       setMessageSync('Обновление репозитория прошло успешно')
       setTimeout(() => {
        setMessageSync('')
       }, 2000)
    }

    const getRepositories = async () => {
        try {
            const res = await RepositoryService.getAllRepositories()
            setRepositories(res.data)
            console.log(repositories)
        } catch (e) {
            console.log(e)
        }
     }

    return(
        <Container>
            <Card className="card-class">
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3 form-class" controlId="exampleForm.ControlInput1" style={{height: '90px'}}>
                                <Form.Label>Введите ID или имя репозитория</Form.Label>
                                <Form.Control 
                                    {...register('inputValue', {
                                        required: 'Поле обязательно к заполнению',
        
                                    })}
                                    className="input-control"
                                    value={inputValue} 
                                    onChange={e => setInputValue(e.target.value)} 
                                    type="text" 
                                    placeholder="ID или имя репозитория" 
                                    autoComplete="new-password"
                                /> 
                    </Form.Group>
                    <div className="red-error">

                    </div>
                    {errors.inputValue && <p className="red-error">{errors?.inputValue?.message?.toString()}</p>}

                    <Button type="submit" disabled={!inputValue}>Get a repository by name or ID</Button> 
 
                </Form>
            </Card>
            
                { 
                    store.repositoryErr ? <div className="red-error">{store.repositoryErr}</div> 
                    :
                    <div className="repository-list">
                        <div> { store.repository.id} </div>
                        <div>  {store.repository.name}</div>
                        <div> {store.repository.html_url}</div>
                        <div> {store.repository.stargazers_count}</div>
                    </div> 
                }
                <br></br>
     
            <Button onClick={getRepositories} >Get all repositories</Button>
                {repositories.map(repository => 
                    <div key={repository.id} className="repository-list">
                        <div>Id: {repository.id}</div>
                        <div>Name: {repository.name}</div>
                        <div>Url: {repository.html_url}</div>
                        <div>Stargazers count: {repository.stargazers_count}</div>
                    </div>   
                    )}
            <br></br>

            <Button className="button-button" onClick={startSync}>Start sync with GitHub</Button>
                <div>{messageSync}</div>

        </Container>
    )
}

export default observer(FormPage)