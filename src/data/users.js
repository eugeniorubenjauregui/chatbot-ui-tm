// /data/users.js

import User from '../models/User';

const users = [
  new User({
    username: 'undefined',
    displayName: 'Anonymous',
    email: null, // Anonymous user may not have an email
  }),
  new User({
    username: 'aleesha@me.com',
    displayName: 'Aleesha Jones',
    email: 'aleesha@me.com',
  }),
  new User({
    username: 'satya@imehta.com',
    displayName: 'Satya Mehta',
    email: 'satya@imehta.com',
  }),
  new User({
    username: 'dimple@imehta.com',
    displayName: 'Dimple Mehta',
    email: 'dimple@imehta.com',
  }),
  new User({
    username: 'carol@smithfam.com',
    displayName: 'Carol Smith',
    email: 'carol@smithfam.com',
  }),
  new User({
    username: 'james@smithfam.com',
    displayName: 'James Smith',
    email: 'james@smithfam.com',
  }),
  new User({
    username: 'katie@smithfam.com',
    displayName: 'Katie Smith',
    email: 'katie@smithfam.com',
  }),
  new User({
    username: 'junior@smithfam.com',
    displayName: 'Junior Smith',
    email: 'junior@smithfam.com',
  }),
  new User({
    username: 'blake@boomer.com',
    displayName: 'Blake Boomer',
    email: 'blake@boomer.com',
  }),
];

export default users;