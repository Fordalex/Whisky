new Vue({
    el: '#app',
    data: {
        data: []
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(window.fetchDataUrl)}`;
            fetch(proxyUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.data = data;
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }
});
