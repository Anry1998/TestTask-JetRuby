import {makeAutoObservable} from 'mobx'
import { IResponsRepository } from "../models/response/ResponsRepository";
import RepositoryService from '../services/GetRepository';

export default class Store {
    repository = {} as IResponsRepository

    repositoryErr = ''
    

    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setRepository(repository: IResponsRepository) {
        this.repository = repository;
    }

    setRepositoryErr(repositoryErr: string) {
        this.repositoryErr = repositoryErr;
    }
    
    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async getOneRepository(nameOrId: string|number) {
        this.setLoading(true)
        try {
            this.setRepositoryErr('')
            const res = await RepositoryService.getOneRepository(nameOrId)
            this.setRepository(res.data)
        } catch (e: any) {
            const err = e.response.data.message
            this.setRepositoryErr(err)
            return err
        } finally {
            this.setLoading(false)
        }
    }

}