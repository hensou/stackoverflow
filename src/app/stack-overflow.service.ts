import { Injectable } from '@angular/core';
import { Question } from './interfaces/question';
import { HttpClient } from '@angular/common/http';


//const API_URL = 'https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=android&site=stackoverflow&filter=!)rh-4QXK*jXKV4I9)LII';

const API_URL = 'https://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=votes&tagged=android&site=stackoverflow&filter=!)rh-4QXK*jXKV4I9)LII';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowService {

  constructor(private _http: HttpClient) {
  }

  async getAllQuestions(): Promise<any> {
    const data:any  = await this._http.get(API_URL).toPromise();
    console.log(data);
    return Promise.resolve(data);
  }
}
