import React from 'react';
import List from '../../components/Global/List/List';
import ListItem from '../../components/Global/List/ListItem';
import useFetchAll from '../../hooks/useFetch';
import Loading from '../../components/Global/Loading/Loading';
import Image from '../../components/Global/Image/Image';
import "./Home.css"
import Zoekbalk from '../../components/Global/Zoekbalk/Zoekbalk';
import { Link } from 'react-router-dom';

const Homepage = () => {

  const { isLoading, error, data: houses } = useFetchAll("/houses");
  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // const handleDeleteSuccess = () => {
  //   invalidate();
  // };

  return (
    <div>
      <div className='hero'>
        <h1 className='hero__title'>Uw zoektocht start hier</h1>
        <Zoekbalk/>
      </div>
      <div className='types'>
        {houses.map((house) => (
          <Link
            to={`/types/${house.type}`}>
              <div className='houses__type'>
                <p className='houses__type-titel'>{house.type}</p>
              </div>
          </Link>
        ))}
      </div>
      <h2>Meest Populaire</h2>
      <List className="houses">
        {houses.map((house) => (
          <ListItem
            href={`/houses/${house._id}`}
            key={house._id}
          >
            <div class="listItem-image">
              <Image src={house.imageUrl} alt={house._id} />
            </div>
            <div class="listItem-data">
              <p class="listItem-type">{house.type}</p>
              <p class="listItem-price">€ {house.price ? house.price : "onbekend"}</p>
              <p class="listItem-opp">{house.square_meters ? house.square_meters : "onbekend"} m²</p>
            </div>
          </ListItem>
        ))}
      </List>
      <div class ="diensten">
        <img src={"/images/volledig_aanbod.jpg"} alt={"Diensten"} class="diensten__image"></img>
        <div class="diensten__text">
          <h2>Onze diensten</h2>
          <p>Verkoop van onroerend goed
              Het immo kantoor assisteert bij het verkopen van woningen, appartementen, commerciële panden, grond en andere soorten vastgoed. Ze zorgen voor het opstellen van advertenties, het organiseren van bezichtigingen, het onderhandelen over de verkoopprijs en het afhandelen van de contracten en juridische aspecten.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
