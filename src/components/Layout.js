import React, { Component } from 'react'
import PokemonActions from '../actions/PokemonActions'
import PokemonStore from '../stores/PokemonStore'

export default class Layout extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: PokemonStore.getPokemon(),
      pokemons: PokemonStore.getEmAll()
    }
    this.fetchPokemon = this.fetchPokemon.bind(this)
    this.fetchPokemonFromList = this.fetchPokemonFromList.bind(this)
    this.catchThemAll = this.catchThemAll.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    PokemonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PokemonStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState ({
      pokemon: PokemonStore.getPokemon(),
      pokemons: PokemonStore.getEmAll()

    })
  }

  fetchPokemon() {
    let{ pokemonNumber } = this.refs
    let number = pokemonNumber.value;
    PokemonActions.fetchPokemon(number);
  }

  fetchPokemonFromList(index) {
    let number = index + 1;
    console.log(number)
    PokemonActions.fetchPokemon(number);
  }

  catchThemAll() {
    let number =""
    PokemonActions.fetchAllPokemon(number);
  }

  render() {

    const { pokemon, pokemons } = this.state;

    if (pokemon === null){
    return (
      <div className='container'>
        <h1 id="title" className='text-center'>Flux Poke-API Viewer</h1>

        <div className="row text-center">
          <div id="getBox">Input a number to get your pokemon!</div>
          <input id="input" type="number" ref="pokemonNumber" defaultValue="1"/> <span>  </span>
          <button id="inputButton" onClick={this.fetchPokemon}  className="btn btn-info">Get Pokemon</button>
        </div>

        <div className="row">          
        </div>
        </div>

    )} else {

    return (
      <div className='container'>
        <h1 id="title" className='text-center'>Flux Poke-API Viewer</h1>

        <div className="row text-center">
          <div id="getBox">Input a number to get your pokemon!</div>
          <input id="input" type="number" ref="pokemonNumber" defaultValue="1"/> <span>  </span>
          <button id="inputButton" onClick={this.fetchPokemon}  className="btn btn-info">Get Pokemon</button>
        </div>
        <hr/>
        <div className="col-xs-12">
        <table className="table text-center" >
          <thead className="text-center">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Att</th>
              <th>Def</th>
              <th>HP</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td><img id="image" src={pokemon.sprites.front_default} alt=""/></td>
              <td>{pokemon.name}</td>
              <td>{pokemon.stats[4].base_stat}</td>
              <td>{pokemon.stats[3].base_stat}</td>
              <td>{pokemon.stats[5].base_stat}</td>
            </tr>
          </tbody>
          </table>
          <button id="seeAll" onClick={this.catchThemAll} className="btn btn-block btn-large btn-danger">See All Pokemon</button>
          <hr/>
          </div>
          <div className="col-xs-12 text-center">
          {pokemons.map((poke, index) => (
            <span key={index}>
            <button className="btn btn-large btn-success pokeButtons" onClick={this.fetchPokemonFromList.bind(null, index)}>{poke.pokemon_species.name}</button>
            </span>
            ))}
          </div>

          </div>
          )}
  }
}


{/*            <button className="btn btn-block btn-success" onClick={fetchPokemonFromList.bind(null, index)}>{poke.name}</button>
*/}