const mongoose = require('mongoose');
const Character = require('./Character');


describe('Character model', () => {
  it('has a required name', () => {
    const character = new Character();
    const { errors } = character.validateSync(); 

    expect(errors.name.message).toEqual('Path `name` is required.');
  })
})

