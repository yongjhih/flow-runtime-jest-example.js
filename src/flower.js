/* @flow */

import Rx from 'rxjs';
import axios, {Axios} from 'axios';
import faker from 'faker';
import fs from 'fs-extra';
import type {Config} from './config';
import type {Email, UUID} from './types';
import type {User, UserPayload, OauthToken, OauthPayload} from './types';
import {config} from './config';

export default class Flower {
  axios: Axios => *;
  config: Config;
  oauthPayload: OauthPayload;

  constructor(config:Config) {
    this.config = config;
    this.axios = axios.create({baseURL: this.config.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.oauthPayload = {
      client_id: this.config.client_id,
      client_secret: this.config.client_secret,
      grant_type: "password",
    };
  }

  createUser(user: UserPayload): Rx.Observable<User> {
    return Rx.Observable.fromPromise(this.axios.post("/create/user", user))
      .map(res => res.data);
  }

  login(oauthPayload: OauthPayload): Rx.Observable<OauthToken> {
    return Rx.Observable.fromPromise(this.axios.post("/login", oauthPayload))
      .map(res => res.data);
  }

  loginWithCredential(credential: string): Rx.Observable<OauthToken> {
    this.client_secret = credential;
    const oauthPayload: OauthPayload = {
      ...this.oauthPayload,
      client_secret: this.client_secret,
      grant_type: "client_credentials"
    };
    return this.login(oauthPayload);
  }

  loginWithPassword(username: Email, password: string): Rx.Observable<OauthToken> {
    const oauthPayload: OauthPayload = {
      ...this.oauthPayload,
      grant_type: "password",
      username: username,
      password: password
    };
    return this.login(oauthPayload);
  }
}

/**
 * @example jsonArray.json
 * [{id: 0, name: "zero"}, {id: 1, name: "one"}]
 * await readJsonArray("jsonArray.json").first().toPromise(); // {id: 0, name: "zero"}
 *
 */
export const readJsonArray = <T>(json: File): Rx.Observable<T> =>
  Rx.Observable.fromPromise(fs.readJson(json)).flatMap(it => it);
