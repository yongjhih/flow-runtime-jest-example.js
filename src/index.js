#!/usr/bin/env node --inspect
/* @flow */

import Flower, {UserPayload} from './flower';
import Rx from 'rxjs';
import axios, {AxiosError} from 'axios';
import fs from 'fs-extra';
import os from 'os';
import program from 'commander-rxjs';
import {config} from './config';
import {version} from '../package.json'; // TODO use genversion instead

if (process.argv.length <= 2) { // TODO Integrate to obs
  program.help();
  process.exit(1);
}

const flower = new Flower(config);

const requireLogin = (): Rx.Observable<OauthToken> =>
    Rx.Observable.fromPromise(fs.readJson(`${os.homedir()}/.flower/oauth.json`))
      .do(it => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${it.access_token}`
      });

program.version(version); // TODO auto git-version

program
  .command('create-user <username> <password>')
  .observe()
  .pluck('args')
  .flatMap(it => requireLogin().map(_ => it))
  .flatMap(it => flower.createUser(it))
  .flatMap(it => Rx.Observable.fromPromise(fs.outputJson(`created-user-${it.id}.json`, it)).map(_ => it))
  .subscribe(it => {
    console.log(it);
  }, e => {
    console.error(e);
  });

program
  .command('login <username> <password>')
  .observe()
  .pluck('args')
  .flatMap((login: {username: Email, password: string}) => flower.loginWithPassword(login.username, login.password))
  .flatMap(it => Rx.Observable.fromPromise(fs.outputJson(`${os.homedir()}/.flower/oauth.json`, it)).map(_ => it))
  .subscribe(it => {
    console.log(it);
  }, e => {
    console.error(e);
  });

program
  .command('login-credential <credential>')
  .description('client secret')
  .observe()
  .pluck('args')
  .flatMap(credential => flower.loginWithCredential(credential))
  .flatMap(it => Rx.Observable.fromPromise(fs.outputJson(`${os.homedir()}/.flower/oauth.json`, it)).map(_ => it))
  .subscribe(it => {
    console.log(it);
  }, e => {
    console.error(e);
  });

program.parse(process.argv);
