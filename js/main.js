new Vue({
  el:'#BoolFlix',

  data:{
    allFilms:[],
    allTvSeries:[],
    userInputSearch:'',
    moviesRating:0,
    urlImages:'http://image.tmdb.org/t/p/w500/',
    moviesLangList:[
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
  methods:{

    // funzione che racchiude tutti i metodi di ricerca----------------------------------->>>
    researchAllElements:function(){
      this.researchMovie();
      this.researchTvSeries();
    },

    //dopo aver effettuato la mia richiesta con axos,salvo i dati---------------------------------->
    researchMovie:function(){
      const self = this;
      axios.get('https://api.themoviedb.org/3/search/movie',{
        params:{
          api_key:'423a9bf9c8fcbaa0c7d6d90fe0bffe70',
          query: self.userInputSearch,
          language: 'it-IT',
        },
      })
      .then((resp) => {
        self.allFilms = resp.data.results
      })
    },

    //successivamente  trasformo il voto di ogni film da decimale ad intero,arrotondato per eccesso
    movieRatingInteger:function(element){
      this.moviesRating = parseInt(Math.ceil(element / 2));
      return this.moviesRating;
    },

    //chiamata per estrapolare dai dati anche le serie tv---------------------------------------->
    researchTvSeries:function(){
      const self = this;
      axios.get('https://api.themoviedb.org/3/search/tv',{
        params:{
          api_key:'423a9bf9c8fcbaa0c7d6d90fe0bffe70',
          query: self.userInputSearch,
          language: 'it-IT',
        },
      })
      
      .then((resp) =>{
        self.allTvSeries = resp.data.results

      })
    },


  }


})
Vue.config.devtools = true;
