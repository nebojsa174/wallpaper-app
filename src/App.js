import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import search from './img/search.svg';
import download from './img/download.svg';

import { Fade, } from 'react-awesome-reveal';
import { text } from '@fortawesome/fontawesome-svg-core';

const accessKey = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const baseLink = `https://api.unsplash.com/photos/`;

const searchLink = `https://api.unsplash.com/search/photos`;

function App() {

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getImages = async () => {

    let url;
    const pageCount = `&page=${page}`
    const query = `&query=${searchQuery}`

    if(searchQuery){
      url = `${searchLink}${accessKey}${pageCount}${query}`
    }else{
      url = `${baseLink}${accessKey}${pageCount}`
    }

    try{
      const res = await fetch(url)

      const data = res.json().then((allPhotos) => setPhotos((oldPhotos) =>{

        if(searchQuery && page === 1){
          return allPhotos.results;
        }
        else if(searchQuery){
          return [...oldPhotos, ...allPhotos.results]
        }else{
          return [...oldPhotos, ...allPhotos]
        }
      }) )

    } catch(error){

    }
  }

  //refresh images when page changes
  useEffect(() => {
    getImages();
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 5){
        setPage((oldValue) => {
          return oldValue + 1;
        })
      }
    })
      return () => window.removeEventListener('scroll', event)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchQuery){
      setPage(1)
      getImages(1)
    }
  }

  const FormRender = () => {
      return <form action = "" className = "form" >
            <div className = "input-control" >
                <input type = "text" placeholder = "Search photos" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type = "submit" onClick={handleSubmit}> Search <img src = { search } alt=""/></button>
          </div >
        </form>
    }

    const GeneratedImages = () => {
      return <div className="content">
        {
          photos.map((photo, i) => {
            return <div className="photo" key={i}>
              <div className="image">
                <img src={photo.urls.regular} alt="" />
              </div>
              <div className="details">
                <p>{photo.user.name}</p>
                <a href={photo.urls.regular}>
                  <img src={download} alt="" />
                </a>
              </div>
            </div>
          })
        }
      </div>
    }

    return (
      <Fade>
        <AppStyled>
          <header className="header">
            <h2 className="logo"> <a href="" className="logo_link">Wallpaper</a> </h2> 
              { FormRender() }
          </header>

        <main className = "main-container" >
          {GeneratedImages()}
        </main>
        </AppStyled>
      </Fade>
    );
}

const AppStyled = styled.div `

header {
  height: 30vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #373b69;
  margin-bottom: 5rem;
}

.logo_link {
  text-decoration: none;
  color: white;
}

form {
  display: flex;
  justify-content: center;
  width: 50%;
  transition: all .4s ease-in-out;
    @media screen and (max-width:575px){
      width: 90%;
    }
}

.input-control {
  position: relative;
  width: 70%;
  margin: 0 auto;
  text-align: center;
  transition: all .4s ease-in-out;

  @media screen and (max-width: 1064px){
    width: 80%;
  }
  @media screen and (max-width:852px){
    width: 90%;
  }
  @media screen and (max-width:695px){
    width: 100%;
    font-size: 17px;
  }
}

input {
  padding: .6rem 2rem;
  background-color: #fff;
  outline: none;
  border: none;
  border-radius: 50px;
  filter: drop-shadow(0px 4px 22px rgba(0, 0, 0, 0.25));
  width: 100%;
  color: black;
  font-family: inherit;
}

button {
  position: absolute;
  right: 5px;
  top: 50%;
  outline: none;
  border: none;
  transform: translateY(-50%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .4rem 1.5rem;
  background-color: #373b69;
  cursor: pointer;
  border-radius: 50px;
}

img {
    padding-left: 1rem;
}

.content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 2rem;
    grid-auto-rows: 1fr;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 3rem;

    .photo {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #373b69;
      box-shadow: 1px 8px 23px rgba(0, 0, 0, 0.25);

      .image {
        flex: 2;

        img {
          width: 100%;
          object-fit: cover;
          height: 100%;
          padding: .1rem;
        }
      }

      .details {
        color: white;
        display: flex;
        justify-content: space-between;
        padding-top: 1rem;

        img {
          width: 40px;
        }
      }
    }
  }
`;

export default App;