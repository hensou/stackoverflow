import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://api.stackexchange.com/2.2/questions';

var votesParams = {
  pagesize: '10',
  order: 'desc',
  sort: 'votes',
  site: 'stackoverflow',
  filter: '!bB.KRHQ9yauVm9'
}

var recentParams = {
  pagesize: '10',
  order: 'desc',
  sort: 'votes',
  site: 'stackoverflow',
  filter: '!bB.KRHQ9yauVm9'
}

@Injectable({
  providedIn: 'root'
})
export class StackOverflowService {

  constructor(private _http: HttpClient) {
  }

  async getVotedQuestions(params = {}): Promise<any> {
    votesParams['tagged'] = params['tagged'] ? params['tagged'] : votesParams['tagged'];
    const data:any  = await this._http.get(API_URL, {params: votesParams} ).toPromise();
    const { items } = data;
    return Promise.resolve(items);
  }

  async getRecentQuestions(params = {}): Promise<any> {

    recentParams['tagged'] = params['tagged'] ? params['tagged'] : recentParams['tagged'];
    recentParams['fromDate'] = params['fromDate'] ? params['fromDate'] : recentParams['fromDate'];
    recentParams['toDate'] = params['toDate'] ? params['toDate'] : recentParams['toDate'];

    const data:any  = await this._http.get(API_URL, {params: recentParams} ).toPromise();
    const { items } = data;
    return Promise.resolve(items);
  }

}
