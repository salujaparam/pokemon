import React, { Component } from 'react'
import Img from '../images/pokemon.png'
import '../styles/pokemon.css'
import Modal from './Modal'

export default class Pokemons extends Component {
    constructor(){ 
        super();
        this.state = {
            pokemons: [],
            next: '',
            loading: true,
            show: false,
            modalData: {},
            modalPokemon: '',
            searchName: ''
        }
        // this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount() {
        await fetch(`https://pokeapi.co/api/v2/pokemon`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({next: data.next, pokemons: data.results, loading:false})
            })
    }
    async getPokemon(poke) {
        await fetch(poke.url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({modalData: data})
            })
        this.setState({show:true, modalPokemon: poke.name})
        this.disableScroll()
    }
    async searchedPokemonModal() {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.searchName}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({modalData: data})
            })
        this.setState({show:true, modalPokemon: this.state.searchName})
        this.disableScroll()
    }
    handleClose = () => {
        this.setState({show:false, modalData: {}, modalPokemon: ''})
        this.enableScroll()
    }
    disableScroll = () => { document.body.style.overflow = 'hidden' }
    enableScroll = () => { document.body.style.overflow = 'auto' }
    async nextPokemons() {
        await fetch(this.state.next)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({next: data.next, pokemons: data.results, loading:false})
            })
    }
    async onSubmitForm(e) {
        e.preventDefault();
        await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.searchName}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ pokemons: [data], loading:false})
            })

    }
    handleSearch(e) {
        this.setState({searchName:e.target.value })
    }
    homePage() {
        window.location.href = "/";
    }
    render() {
        return (
            <div>
                <form className="search-bar" onSubmit={(e) => {this.onSubmitForm(e)}}>
                    <input className="search-text" type="text" name="button" placeholder="search for your pokemon...." value={this.state.searchName} onChange={(e) => {this.handleSearch(e)}} />
                    <button onClick={(e) => {this.onSubmitForm(e)}} className="search-button" type="submit" name="submit">Submit</button>
                </form>
                <div className="items">
                {this.state.loading === false && this.state.pokemons.length > 1?
                this.state.pokemons.map((poke, idx) => {
                    return (
                        <article className="item" key={idx}>
                            <div className="info">
                                <img src={Img} alt={poke.name} className="crop" />
                                <p className="head-four">{poke.name}</p>
                            </div>
                            <button className="pokemon-button" onClick={() => {this.getPokemon(poke)}}>Know more  about {poke.name}</button>
                        </article>
                    )
                })
                :
                null}
                {
                    this.state.loading === false && this.state.pokemons.length === 1?
                    (
                        <article className="item">
                            <div className="info">
                                <img src={Img} alt={this.state.searchName} className="crop" />
                                <p className="head-four">{this.state.searchName}</p>
                            </div>
                            <button className="pokemon-button" onClick={() => {this.searchedPokemonModal()}}>Know more  about {this.state.searchName}</button>
                        </article>
                    ):
                    null
                }
                <Modal show={this.state.show} name={this.state.modalPokemon} data={this.state.modalData} onClose={this.handleClose}/>
                </div>
                {this.state.loading === false && this.state.pokemons.length > 1?(<div className="next-div">
                    <button onClick={() => {this.nextPokemons()}} className="next">Next</button>
                </div>):null}
                {this.state.loading === false && this.state.pokemons.length === 1?(<div className="back-div">
                    <button onClick={() => {this.homePage()}} className="back">Back</button>
                </div>):null}
            </div>
        )
    }
}
