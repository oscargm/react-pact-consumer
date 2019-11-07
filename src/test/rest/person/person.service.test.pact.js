import PersonService from './person.service';
import * as Pact from '@pact-foundation/pact';
import Person from '../../../model/person';

describe('PersonService API', () => {
  const personService = new PersonService('http://localhost', global.port);

  // a matcher for the content type "application/json" in UTF8 charset
  // that ignores the spaces between the ";2 and "charset"
  const contentTypeJsonMatcher = Pact.Matchers.term({
    matcher: 'application\\/json; *charset=utf-8',
    generate: 'application/json; charset=utf-8'
  });

  describe('getPerson()', () => {
    beforeEach(done => {
      global.provider
        .addInteraction({
          state: 'a person exists',
          uponReceiving: 'a GET request for a person',
          withRequest: {
            method: 'GET',
            path: '/person/1',
            headers: {
              Accept: contentTypeJsonMatcher
            }
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': contentTypeJsonMatcher
            },
            body: Pact.Matchers.somethingLike(new Person('Roche', 1))
          }
        })
        .then(() => done());
    });

    it('sends a request according to contract', done => {
      personService
        .getPerson(1)
        .then(person => {
          expect(person.name).toEqual('Roche');
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            error => {
              done.fail(error);
            }
          );
        });
    });
  });

  describe('createPerson()', () => {
    beforeEach(done => {
      global.provider
        .addInteraction({
          state: 'provider allows person creation',
          uponReceiving: 'a POST request to create a person',
          withRequest: {
            method: 'POST',
            path: '/person',
            headers: {
              Accept: contentTypeJsonMatcher,
              'Content-Type': contentTypeJsonMatcher
            },
            body: new Person('Roche')
          },
          willRespondWith: {
            status: 201,
            headers: {
              'Content-Type': Pact.Matchers.term({
                matcher: 'application\\/json; *charset=utf-8',
                generate: 'application/json; charset=utf-8'
              })
            },
            body: Pact.Matchers.somethingLike(new Person('Roche', 1))
          }
        })
        .then(() => done());
    });

    it('sends a request according to contract', done => {
      personService
        .createPerson(new Person('Roche'))
        .then(person => {
          expect(person.id).toEqual(1);
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            error => {
              done.fail(error);
            }
          );
        });
    });
  });

  describe('updatePerson()', () => {
    beforeEach(done => {
      global.provider
        .addInteraction({
          state: 'provider allows person modification',
          uponReceiving: 'a PUT request to modify a person',
          withRequest: {
            method: 'PUT',
            path: '/person/1',
            headers: {
              Accept: contentTypeJsonMatcher,
              'Content-Type': contentTypeJsonMatcher
            },
            body: new Person('New Roche', 1)
          },
          willRespondWith: {
            status: 204,
            headers: {
              'Content-Type': Pact.Matchers.term({
                matcher: 'application\\/json; *charset=utf-8',
                generate: 'application/json; charset=utf-8'
              })
            }
          }
        })
        .then(() => done());
    });

    it('sends a request according to contract', done => {
      personService
        .updatePerson(new Person('New Roche', 1))
        .then(serviceResponse => {
          expect(serviceResponse).toEqual(204);
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            error => {
              done.fail(error);
            }
          );
        });
    });
  });
  describe('deletePerson()', () => {
    beforeEach(done => {
      global.provider
        .addInteraction({
          state: 'provider allows person deletion',
          uponReceiving: 'a DELETE request to modify a person',
          withRequest: {
            method: 'DELETE',
            path: '/person/1',
            headers: {
              Accept: contentTypeJsonMatcher
            }
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': Pact.Matchers.term({
                matcher: 'application\\/json; *charset=utf-8',
                generate: 'application/json; charset=utf-8'
              })
            }
          }
        })
        .then(() => done());
    });

    it('sends a request according to contract', done => {
      personService
        .deletePerson(1)
        .then(serviceResponse => {
          expect(serviceResponse).toEqual(200);
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            error => {
              done.fail(error);
            }
          );
        });
    });
  });
});
