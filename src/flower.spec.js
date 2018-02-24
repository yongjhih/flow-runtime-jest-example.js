/* @flowerw */

axios.defaults.adapter = httpAdapter;
import Flower from './flower';
import Moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import Rx from 'rxjs';
import axios from 'axios';
import faker from 'faker';
import fs from 'fs-extra';
import httpAdapter from 'axios/lib/adapters/http'
import nock from 'nock';
import os from 'os';
import type {OauthToken} from './types';
import type {UUID} from './types';
import type {UserPayload, User} from './types';
import {config} from './config';

const flower = new Flower(config);

it('should login with username/password and response Bearer token type', done => {
    nock(config.baseURL)
        .post('/login')
        .reply(200, {
          access_token: "access_token",
          expires_in: 3600,
          refresh_token: "refresh_token",
          token_type: "Bearer",
          user_id: faker.random.uuid()
        });
    flower.loginWithPassword("yongjhih@example.com", "password").subscribe(res => {
        expect(res.token_type).toBe("Bearer");
        expect(res.expires_in).toBe(3600);
        expect(res.access_token).not.toBeNull();
        done();
    },
    err => {
        console.error(err);
        done.fail(err);
    });
});

it('should create-user', done => {
    nock(config.baseURL)
        .post('/create/user')
        .reply(200, {
          id: faker.random.uuid(),
          username: faker.internet.email()
        });

    flower.createUser({username: "yongjhih@example.com", password: "password"}).subscribe(res => {
        expect(res.id).not.toBeNull();
        expect(res.username).not.toBeNull();
        done();
    },
    err => {
        console.error(err);
        done.fail(err);
    });
});
