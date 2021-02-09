new Vue({
el:'#BoolFlix',

data:{
  allFims:[],
  userInputSearch:''
},

mounted(){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=423a9bf9c8fcbaa0c7d6d90fe0bffe70')
},

methods:{
  researchByInput:function(){
  const self = this;
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=423a9bf9c8fcbaa0c7d6d90fe0bffe70&query=" + self.userInputSearch)
    .then(function(resp) {
      const dataResult = resp.data.results
      self.allFims = dataResult;
      console.log(self.allFims);

})

  }
}


})
Vue.config.devtools = true;
