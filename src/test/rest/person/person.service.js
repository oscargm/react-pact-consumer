import Person from '../../../model/person';
import adapter from 'axios/lib/adapters/http';
const axios = require('axios');

class PersonService {
  constructor(baseUrl, port) {
    this.baseUrl = baseUrl;
    this.port = port;
  }

  getPerson(personId) {
    if (personId == null) {
      throw new Error('personId must not be null!');
    }
    return axios
      .request(
        {
          method: 'GET',
          url: `/person/${personId}`,
          baseURL: `${this.baseUrl}:${this.port}`,
          headers: {
            Accept: 'application/json; charset=utf-8'
          }
        },
        adapter
      )
      .then(response => {
        const person = response.data;
        return new Promise((resolve, reject) => {
          try {
            this._validateIncomingPerson(person);
            resolve(person);
          } catch (error) {
            reject(error);
          }
        });
      });
  }

  createPerson(person) {
    this._validatePersonForCreation(person);
    return axios
      .request(
        {
          method: 'POST',
          url: `/person`,
          baseURL: `${this.baseUrl}:${this.port}`,
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: person
        },
        adapter
      )
      .then(response => {
        const person = response.data;
        return new Promise((resolve, reject) => {
          try {
            this._validateIncomingPerson(person);
            resolve(person);
          } catch (error) {
            reject(error);
          }
        });
      });
  }

  updatePerson(person) {
    this._validatePersonForModification(person);
    return axios
      .request(
        {
          method: 'PUT',
          url: `/person/${person.id}`,
          baseURL: `${this.baseUrl}:${this.port}`,
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: person
        },
        adapter
      )
      .then(response => {
        return response.status;
      });
  }

  deletePerson(personId) {
    if (personId == null) {
      throw new Error('personId must not be null!');
    }
    return axios
      .request(
        {
          method: 'DELETE',
          url: `/person/${personId}`,
          baseURL: `${this.baseUrl}:${this.port}`,
          headers: {
            Accept: 'application/json; charset=utf-8'
          }
        },
        adapter
      )
      .then(response => {
        return response.status;
      });
  }

  _validateIncomingPerson(person) {
    Person.validateId(person);
    Person.validateName(person);
  }

  _validatePersonForCreation(person) {
    delete person.id;
    Person.validateName(person);
  }
  _validatePersonForModification(person) {
    Person.validateId(person);
    Person.validateName(person);
  }
}

export default PersonService;
