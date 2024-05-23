// Aquí importaremos todos los componentes que vamos a usar
// Components
import { Button } from './components/Button';
import { Card } from './components/Card';
// Styles
import './sass/App.scss';
// Icons
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
// Hooks
import { useState, useEffect } from "react";



const App = () => {

    // Variables de estado, que son las que usaremos en el componente
    const [pokemonId, setPokemonId] = useState(60);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

    // Nuestro componente se renderiza cada vez que actualiamos un componente/variable de estado como el id
    // Dentro del useEffect usamos o consumimos el api 

    useEffect(() => {
        getEvolutions(pokemonId);

    }, [pokemonId])

    async function getEvolutions(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const data =await response.json();

    let pokemonEvoArray = []

    let pokemonLv1 = data.chain.species.name;
    let pokemonLv1Img = await getPokemonImgs(pokemonLv1);
    pokemonEvoArray.push([pokemonLv1, pokemonLv1Img])
    // No se para que sirve la linea anterior

    if(data.chain.evolves_to.length !== 0){
        let pokemonLv2 = data.chain.evolves_to[0].species.name;
        let pokemonLv2Img = await getPokemonImgs(pokemonLv2);
        pokemonEvoArray.push([pokemonLv2, pokemonLv2Img])
        console.log(pokemonEvoArray)

        if(data.chain.evolves_to[0].evolves_to.length !== 0){
            let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
            let pokemonLv3Img = await getPokemonImgs(pokemonLv3);
            pokemonEvoArray.push([pokemonLv3, pokemonLv3Img])
        }
    }
    setPokemonEvolutions(pokemonEvoArray)

}
    async function getPokemonImgs(name){
        const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json();
        return data.sprites.other['official-artwork'].front_default;
    }


    function prevClick(){
            (pokemonId === 1) ? 
            setPokemonId(pokemonId)
            : 
            setPokemonId(pokemonId - 1)
            }
    

    function nextClick() {
        setPokemonId(pokemonId + 1)
    }
    


    // Cada vez que dibujo a traves de la funcion map o foreach, tengo que pasarle un atributo a cada uno de ellos que tenga un nombre (algo que no se repita, el nombre el id...)

    return (
    <div className='app'>
    <div className={`card-container card${pokemonEvolutions.length}`} >
    {pokemonEvolutions.map(pokemon => 
    <Card 
    key={pokemon[0]}
    name={pokemon[0]}
    img={pokemon[1]}
    />
    )}
        
    </div>
        <div className='buttons-container'>
            <Button
                icon={<TiArrowLeftOutline />} 
                handleClick={prevClick}
            />
            {/* Lo que hemos hecho con el operador ternario es decirle que si el id es 1 no siga disminuyendo, pero si es mayor si. */}
        
            <Button
                icon={<TiArrowRightOutline />} 
                handleClick={nextClick}
            />
        </div>
        </div>
    );
}

export {App};