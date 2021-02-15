new Vue({
  el:'#BoolFlix',

  data:{
    myApyKey:'423a9bf9c8fcbaa0c7d6d90fe0bffe70',
    allFilms:[],
    allTvSeries:[],
    userInputSearch:'',
    moviesRating:0,
    urlImages:'http://image.tmdb.org/t/p/w500/',
    moviesCast:[],
    actorsNames:[],
    seriesCast:[],
    actorsSeriesNames:[],
    imgNotFound:'./img/not-found',
    showCast:{
      show:false,
      index:true
    },
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

    // funzione che racchiude tutti i metodi di ricerca------------------------>
    researchAllElements:function(){

      this.researchMovie();
      this.researchTvSeries();

    },

    //dopo aver effettuato la mia richiesta con axos,salvo i dati-------------->
    researchMovie:function(){
      const self = this;
      axios.get('https://api.themoviedb.org/3/search/movie',{
        params:{
          api_key:self.myApyKey,
          query: self.userInputSearch,
          language: 'it-IT',
        },
      })
      .then((resp) => {
        self.allFilms = resp.data.results
        self.allFilms.forEach((item, i) => {
        });

      })
    },

    //successivamente  trasformo il voto di ogni film da decimale ad intero,arrotondato per eccesso
    movieRatingInteger:function(element){
      this.moviesRating = parseInt(Math.ceil(element / 2));
      return this.moviesRating;
    },

    //chiamata per estrapolare dai dati anche le serie tv---------------------->
    researchTvSeries:function(){
      const self = this;
      axios.get('https://api.themoviedb.org/3/search/tv',{
        params:{
          api_key:self.myApyKey,
          query: self.userInputSearch,
          language: 'it-IT',
        },
      })

      .then((resp) =>{
        self.allTvSeries = resp.data.results
      })
    },

    // ricerca delle informazioni per il cast---------------------------------->
    castFilm:function(movieId){
      this.moviesCast = [];

      this.actorsNames=[];

      const self = this;
      return axios.get('https://api.themoviedb.org/3/movie/'
      + movieId +
      '/credits?api_key='+ self.myApyKey)

      .then((resp) =>{
        let results = resp.data.cast
        results.forEach((item, i) => {

          if (!self.moviesCast.includes(item.original_name)) {
            self.moviesCast.push(item.original_name)

          }
        });
        let act=[];
        for (var i = 0; i < 5; i++) {
          act.push(self.moviesCast[i]);

        }
        self.actorsNames = act;

        return self.actorsNames;

      })

    },

    // metodo per mostrare solo il cast della serie/film cliccato-------------->
    showingCast:function(index){
      this.showCast.show = !this.showCast.show;
      this.showCast.index = index;
    },

    castOff:function(){
      this.showCast.show = false;
    },

    // estrapolo dai dati il nome del cast delle serie tv---------------------->
    castSeries:function(seriesId){
      this.seriesCast = [];

      this.actorsSeriesNames=[];

      const self = this;
      return axios.get('https://api.themoviedb.org/3/tv/'
      + seriesId +
      '/credits?api_key='+ self.myApyKey)

      .then((resp) =>{
        let results = resp.data.cast
        results.forEach((item, i) => {

          if (!self.seriesCast.includes(item.original_name)) {
            self.seriesCast.push(item.original_name)

          }
        });
        let act=[];
        for (var i = 0; i < 5; i++) {
          act.push(self.seriesCast[i]);

        }

        return self.actorsSeriesNames = act;

      })

    },

      // premendo il tasto 'Home' svuoto la ricerca e torno in video background
      backHome:function(){
           this.allFilms=[]
          this.allTvSeries=[]
      }



  }


})
Vue.config.devtools = true;
