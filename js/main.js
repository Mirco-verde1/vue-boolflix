new Vue({
  el:'#BoolFlix',

  data:{
    allFilms:[],
    allTvSeries:[],
    userInputSearch:'',
    moviesRating:0,
    urlImages:'http://image.tmdb.org/t/p/w500/',
    moviesLanguagesList:[
      'en',
      'it',
      'es',
      'ja',
      'de',
      'sv',
      'fr',
      'no'
    ],
  },

  mounted(){

  },

  methods:{
    //dopo aver effettuato la mia richiesta con axos,salvo i dati---------------------------------->
    researchMovieAndRating:function(){
      const self = this;
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=423a9bf9c8fcbaa0c7d6d90fe0bffe70&query=" + self.userInputSearch)

      .then(function(resp) {
        self.allFilms = resp.data.results
        console.log(self.allFilms) //allFilms sarà il mio contenitore dati
      })
    },

    //successivamente  trasformo il voto di ogni film da decimale ad intero,arrotondato per eccesso
    movieRatingInteger:function(element){
    this.moviesRating = parseInt(Math.ceil(element / 2));
    return this.moviesRating;
  },

//modifico la mia chiamata per estrapolare dai dati anche le serie tv---------------------------------------->
  researchTvSeriesAndRating:function(){
    const self = this;
    axios.get("https://api.themoviedb.org/3/search/tv?api_key=423a9bf9c8fcbaa0c7d6d90fe0bffe70&query=" + self.userInputSearch)

    .then(function(resp) {
      self.allTvSeries = resp.data.results
      console.log(self.allTvSeries);

    })
  }


  }


})
Vue.config.devtools = true;
