import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  //private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter

  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});
    
    //const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //const insertPromisesArray = []; -> Solución con encadenmianto de promesas
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async ({name, url}) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
      //const pokemon = await this.pokemonModel.create( { name, no } ) -> Solución no optimizada
      //console.log({name, no});
      /* insertPromisesArray.push(
        this.pokemonModel.create({name, no})
      ) */ //-> Solución con encadenamiento de promesas

      pokemonToInsert.push({ name, no });
    });
    // await Promise.all( insertPromisesArray ); -> Solución con encadenamiento de promesas
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'data.results: Seed executed';
  }
}
