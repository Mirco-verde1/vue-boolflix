new Vue({
  el:'#BoolFlix',

  data:{
    allFilms:[],
    userInputSearch:'',
    moviesRating:0,
    moviesLanguagesList:[
      'en',
      'it',
      'es',
    '  ja',
      'de',
      'sv',
      'fr',
      'no'
    ],
  },

  mounted(){

  },

  methods:{
    researchMovieAndRating:function(){
      const self = this;
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=423a9bf9c8fcbaa0c7d6d90fe0bffe70&query=" + self.userInputSearch)

      .then(function(resp) {
        const dataResult = resp.data.results
        self.allFilms = dataResult;
        console.log(self.allFilms) //allFilms sarà il mio contenitore dati
      })

    },//successivamente  trasformo il voto di ogni film da decimale ad intero,arrotondato per eccesso
    movieRatingInteger:function(element){
    this.moviesRating = parseInt(Math.ceil(element / 2));
    return this.moviesRating;

  },


  }


})
Vue.config.devtools = true;
