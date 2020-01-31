import { Injectable } from '@angular/core';
import { Question } from './interfaces/question';
import { HttpClient } from '@angular/common/http';


//const API_URL = 'https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=android&site=stackoverflow&filter=!)rh-4QXK*jXKV4I9)LII';

//const API_URL = 'https://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=votes&tagged=android&site=stackoverflow&filter=!)rh-4QXK*jXKV4I9)LII';

const API_URL = 'https://api.stackexchange.com/2.2/questions';

var votesParams = {
  pagesize: '10',
  order: 'desc',
  sort: 'votes',
  site: 'stackoverflow',
  filter: '!bB.KRHQ9yauVm9',
  tagged: 'android;flutter'
}


var recentParams = {
  pagesize: '10',
  order: 'desc',
  sort: 'votes',
  site: 'stackoverflow',
  filter: '!bB.KRHQ9yauVm9',
  tagged: 'android;flutter',
  fromdate: '1579996800',
  toDate: '1580428800'
}


//const API_URL = 'https://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=votes&tagged=android%3Bflutter&site=stackoverflow&filter=!bB.KRHQ9yauVm9';

@Injectable({
  providedIn: 'root'
})
export class StackOverflowService {

  constructor(private _http: HttpClient) {
  }

  async getVotedQuestions(params?): Promise<any> {
    const data:any  = await this._http.get(API_URL, {params: votesParams} ).toPromise();
    const { items } = data;
    return Promise.resolve(items);
  }

  async getRecentQuestions(params = {}): Promise<any> {

    recentParams['tagged'] = params['tagged'] ? params['tagged'] : recentParams['tagged'];

    const data:any  = await this._http.get(API_URL, {params: recentParams} ).toPromise();
    const { items } = data;
    return Promise.resolve(items);
  }

}
