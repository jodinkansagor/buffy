const mongoose = require('mongoose');
const Character = require('./Character');


describe('Character model', () => {
  it('has a required name', () => {
    const character = new Character();
    const { errors } = character.validateSync(); 

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a required species', () => {
    const character = new Character();
    const { errors } = character.validateSync(); 

    expect(errors.species.message).toEqual('Path `species` is required.');
  });

});

