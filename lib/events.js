window._ = require('lodash');
const low = require('lowdb');
const db = low('db');
const cuid = require('cuid');
db.defaults({events: []}).value();

/**
 * @fileOverview
 * This file exposes methods to store and read events
 * Current temporal implementation uses browser's localStorage
 */

/**
 * Save an event
 * @param {Object} event Event to save
 */
function save(event) {
  if (!event.id) {
    event.id = cuid();
  }

  db.get('events').push(event).value();
}

/**
 * Updates an event by it's id
 * @param {String} id Event id to update
 * @param {Object} event Event object to update
 */
function update(id, event) {
  db.get('events').find({id}).assign({
    surname: event.surname,
    name: event.name,
    title: event.title,
    backgroundColor: event.backgroundColor
  }).value();

  db.write('db');
}

/**
 * Get a list of all events
 * @return {Object[]} Array of events
 */
function getAll() {
  return db.get('events').value();
}

module.exports = {
  save,
  update,
  getAll
};
