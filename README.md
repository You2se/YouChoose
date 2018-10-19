<p align="center">
  <img src="https://i.imgur.com/GhcaC5X.png" height="150" width="600">
</p>    
<p align="center">  
<span><a href="https://you2se.herokuapp.com/">You Choose</a></span>
</p>  

## Introducción  
Descubre cual es la mejor forma para saber que pelicula ver hoy.  
Aquí tendrás controladas tus peliculas favoritas y podrás descubrir nuevas

## Herramientas
-MERN Stack  
-Material-UI  
-TMDB API  

## ¿Cuál ha sido el mayor problema técnico al que nos hemos enfrentado?  
-Control de los estados  
-Control de objetos  
-Acceso a props de un componente a otro  

## ¿Cual es el mayor reto por solucionar en nuestro código?
Por solucionar,nada . Algo más de tiempo quizás

## Si empezaramos de cero ¿Cómo organizaría mejor del proyecto?
-Elección de librería de estilos  

## Un detalle técnico interesante sobre mi proyecto
``` js
/* RENDER TITLELIST */
<TitleList
          title="Trending Movies"
          url="discover/movie?sort_by=popularity.desc&page=1"
        />
        <TitleList
          title="Movies for Kids"
          url="discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"
        />
        <TitleList
          title="Sci-Fi Movies"
          url="genre/878/movies?sort_by=popularity.desc&page=1"
        />
        <TitleList
          title="Comedy Movies"
          url="genre/35/movies?sort_by=popularity.desc&page=1"
        />
        <TitleList
          title="Drama Movies"
          url="genre/18/movies?sort_by=popularity.desc&page=1"
        />
        <TitleList
          title="Horror Movies"
          url="genre/27/movies?sort_by=popularity.desc&page=1"
        />

 /*TITLELIST.jsx */
 render() {
    let titles = "";
    let imageNum = this.state.imageNum;
    let imageIndex = this.state.imageIndex;
    if (this.state.data.results) {
      titles = this.state.data.results.map((title, i) => {
        if (i < imageNum) {
          return "";
        }
        if (i < imageIndex) {
          var name = "";
          var backDrop =
            "http://image.tmdb.org/t/p/original" + title.backdrop_path;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }
          return (
            <Item
              userInSession={this.props.userInSession}
              key={title.id}
              title={name}
              all={title}
              score={title.vote_average}
              overview={title.overview}
              backdrop={backDrop}
            />
          );
        } else {
          return <div key={title.id} />;
        }
      });
    }

    return (
      <div
        ref="titlecategory"
        className="TitleList"
        data-loaded={this.state.mounted}
      >
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-wrapper">
            {titles}
            <div className="arrow-left">
              <i className="left" onClick={() => this.previousMovie()} />
            </div>
            <div className="arrow-right">
              <i className="right" onClick={() => this.nextMovie()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  /* RENDER ITEM */
  render() {
      return (
            <div
              className="Item"
              style={{ backgroundImage: "url(" + this.props.backdrop + ")" }}
            >
              <div className="model">
                <DialogPop
                  open={this.state.open}
                  close={this.state.close}
                  title={this.props.name}
                  score={this.props.score}
                  overview={this.props.overview}
                  backdrop={this.props.backdrop}
                />
              </div>
              <div className="overlay">
                <div className="title">{this.props.title}</div>
                <div className="favorite">
                <i
                  className="material-icons"
                  onClick={() => this.handleLike(this.props.all)}
                >
                  favorite
                </i>
                </div>
              
                <div className="rating">{this.props.score} / 10</div>
                <div className="plot">{this.props.overview}</div>
                <div className="search-icon">              
                    <i className="material-icons" onClick={()=>this.handleClickOpen()}>search</i>
                </div>

              </div>
            </div>
      );
  }
  
  


```

