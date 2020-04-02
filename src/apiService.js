export default {
    page:1,
    value:'',
    fetchRequest(){
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.value}&page=${this.page}&per_page=12&key=15599000-288ca625732bcf6a027b1d7ae`)
        .then(response => response.json())
    }
}