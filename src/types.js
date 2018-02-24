/* @flow */

import * as validators from 'flow-runtime-validators';
import Moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import fs from 'fs';
import validator from 'validator';
//import faker from 'faker'; // TODO

// TODO more fancy error message
export type Email = string;
Email.addConstraint(
  validators.length({max: 250}),
  it => {
    if (!validator.isEmail(it)) {
      return "must be valid Email";
    }
  }
);
//Email.prototype.faker = (it: string): Email => { faker.internet.email(); };

export type UUID = string;
UUID.addConstraint(it => {
  if (!validator.isUUID(it, 4)) {
    return "must be valid UUID v4";
  }
});
//UUID.prototype.faker = (it: string): UUID => { faker.random.uuid(); };

export type Phone = string;
Phone.addConstraint(
  it => {
    if (!validator.isMobilePhone(it, "any")) {
      return "must be valid phone number";
    }
  }
);
//Phone.prototype.faker = (it: string): Phone => { faker.phone.phoneNumber(); };

export type unsigned_number = number;
unsigned_number.addConstraint(
  validators.number({gt: -1})
);

export type TimeZone = string;
TimeZone.addConstraint(
  it => {
    if (!!MomentTimeZone.tz.zone(it)) {
      // ok
    } else {
      return "must be valid time zone";
    }
  }
);

export type PostalCode = string;
PostalCode.addConstraint(
  it => {
    if (!validator.isPostalCode(it, "any")) {
      return "must be valid postal code";
    }
  }
);
//PostalCode.prototype.faker = (it: string): PostalCode => { faker.address.zipCode(); };

export type Country = string;
Country.addConstraint(
  it => {
    if (!validator.isISO31661Alpha2(it, "any") || !validator.isUppercase(it)) {
      return "must be valid country code";
    }
  }
);
//Country.prototype.faker = (it: string): Country => { faker.address.countryCode(); };

// TODO contains(country.states())
// TODO contains(country.provinces())
export type State = string;

export type File = string;
File.addConstraint(
  it => {
    if (!fs.existsSync(it)) {
      return "not found";
    }
  }
);

export type Time = string;

export type UserPayload = {
  username: Email,
  password: string
};

export type User = {
  id: UUID,
  username: Email
};

export type OauthPayload = {
  client_id: string,
  client_secret: string,
  grant_type: string,
  username: void | ?Email,
  password: void | ?string
};

export type OauthToken = {
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: unsigned_number,
    user_id: UUID
};
