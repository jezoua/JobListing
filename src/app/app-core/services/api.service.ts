import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class API {
    public readonly http = inject(HttpClient)

    public url: string | undefined | unknown = undefined

    token: string | undefined | unknown = undefined

    headers() {
        const token = localStorage.getItem('accessToken')

        let headers: any = {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
        }

        if (token === undefined || token === null) {
            delete headers['Authorization']
        }

        return {
            headers: new HttpHeaders(headers),
        }
    }

    paginate<T>(url: string, param: string = ''): Observable<T> {
        return this.http.get<T>(
            url === '' ? `${environment.api}${this.url}` : url + param,
            this.headers(),
        )
    }

    search<T>(param: string = ''): Observable<T> {
        return this.http.get<T>(
            `${environment.api}search/${this.url}?` + param,
            this.headers(),
        )
    }

    show<T>(id: string = ''): Observable<T> {
        return this.http.get<T>(
            `${environment.api}${this.url}/` + id,
            this.headers(),
        )
    }

    get<T>(): Observable<T> {
        return this.http.get<T>(`${environment.api}${this.url}`, this.headers())
    }

    custom<T>(param: string): Observable<T> {
        if (!!param) {
            return this.http.get<T>(
                `${environment.api}${this.url}${param}`,
                this.headers(),
            )
        } else {
            return this.http.get<T>(
                `${environment.api}${this.url}`,
                this.headers(),
            )
        }
    }

    query<T>(queryStringParam: { [key: string]: string }): Observable<T[] | T> {
        return this.http.get<T>(
            `${environment.api}${this.url}?${new URLSearchParams(
                queryStringParam,
            )}`,
            this.headers(),
        )
    }

    redirect<T>(param: string): Observable<T | T> {
        return this.http.get<T>(
            `${environment.api}${this.url}${param}`,
            this.headers(),
        )
    }

    postCustom<T>(param: string, data: Object): Observable<T> {
        return this.http.post<T>(
            `${environment.api}${this.url}${param}`,
            data,
            this.headers(),
        )
    }

    findOne<T>(id: string | number): Observable<T> {
        return this.http.get<T>(
            `${environment.api}${this.url}/${id}`,
            this.headers(),
        )
    }

    postWithFile<T>(data: Record<string,any>): Observable<T> {
        let form = new FormData()

        for (const key in data) {
            form.append(key, data[key])
        }

        return this.http.post<T>(
            `${environment.api}${this.url}`,
            form,
            this.headers(),
        )
    }

    post<T>(data: Object): Observable<T> {
        return this.http.post<T>(
            `${environment.api}${this.url}`,
            data,
            this.headers(),
        )
    }

    put<T>(data: Object): Observable<T> {
        return this.http.patch<T>(
            `${environment.api}${this.url}`,
            data,
            this.headers(),
        )
    }

    updateWithFileNode<T>(
        id: string | number | false,
        data: FormData | any,
    ): Observable<T> {
        let form = new FormData()

        for (const key in data) {
            form.append(key, data[key])
        }

        return this.http.patch<T>(
            `${environment.api}${this.url}${id !== false ? `/${id}` : ''}`,
            form,
            this.headers(),
        )
    }

    updateWithFilePHP<T>(
        id: string | number | false,
        data: FormData | any,
    ): Observable<T> {
        let form = new FormData()

        for (const key in data) {
            form.append(key, data[key])
        }

        form.append('_method', 'PUT')

        return this.http.post<T>(
            `${environment.api}${this.url}${id !== false ? `/${id}` : ''}`,
            form,
            this.headers(),
        )
    }

    update<T>(id: string | number | false, data: Object): Observable<T> {
        return this.http.put<T>(
            `${environment.api}${this.url}${id !== false ? `/${id}` : ''}`,
            data,
            this.headers(),
        )
    }

    patchCustom<T>(param: string, data: Object): Observable<T> {
        return this.http.patch<T>(
            `${environment.api}${this.url}${param}`,
            data,
            this.headers(),
        )
    }

    remove<T>(id: string | number): Observable<T> {
        return this.http.delete<T>(
            `${environment.api}${this.url}/${id}`,
            this.headers(),
        )
    }

    removeCustom<T>(param: string, id: string | number): Observable<T> {
        return this.http.delete<T>(
            `${environment.api}${this.url}${param}/${id}`,
            this.headers(),
        )
    }

    get_API_URL() {
        return `${environment.api}${this.url}`
    }
}

