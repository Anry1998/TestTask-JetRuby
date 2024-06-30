import $api from "../http";
import {AxiosResponse} from 'axios'
import { IResponsRepository } from "../models/response/ResponsRepository";

export default class RepositoryService {

    static async getOneRepository(nameOrId: string|number): Promise<AxiosResponse<IResponsRepository>> {
        return $api.post<IResponsRepository>('/getrepository', {nameOrId})
    }

    static async getAllRepositories(): Promise<AxiosResponse<IResponsRepository[]>> {
        return $api.get<IResponsRepository[]>('/getallrepositories', )
    }

    static async updateRepositories() {
        return $api.put('/update', )
    }

}