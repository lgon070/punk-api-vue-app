const beverageTracker = {
    template: `<div>
                    <div class="col" v-for="beverage in beverageTracker">
                        <ul>
                            <li>
                                <small>
                                      {{ beverage.name }}
                                    <br/>
                                    @ {{beverage.time}}
                                </small>
                            </li>
                        </ul>
                    </div>
                </div>`,
    props: ['beverageTracker']
};

const punked = new Vue({
    el: '#punked',
    data: {
        appName: 'Punk-I-Nator 3000',
        returnedBeverages: [],
        selectedBeverage: {},
        query: "",
        selectedId: "",
        hasSearched: false,
        hasSelected: false,
        inMenu: true,
        beverageTracker: []

    },
    computed: {
        brewedForYears: function () {
            const date = new Date();
            const presentYear = date.getFullYear();

            if (this.selectedBeverage.first_brewed.length > 4) {
                return (presentYear - Number(this.selectedBeverage.first_brewed.substring(3, 7)))
            } else {
                return (presentYear - Number(this.selectedBeverage.first_brewed));
            }

        }

    },
    methods: {
        search: async function () {
            this.hasSearched = true;
            this.inMenu = false;
            const response = await axios.post(`http://localhost:8888/api/search`, {
                query: this.query
            })

            this.returnedBeverages = response.data;

            this.returnedBeverages.forEach(element => {
                if (!element.image_url) {
                    element.image_url = "https://cdn2.justwineapp.com/assets/article/2019/02/Screen-Shot-2019-02-13-at-4.43.10-PM-e1550101418523-171x300.png";
                }
            });

        },
        fetch: async function (historyId = 0) {
            this.hasSelected = true;
            this.hasSearched = true;

            if(!(historyId === 0)){
                this.selectedId = historyId;
            }
            const response = await axios.post(`http://localhost:8888/api/fetch`, {
                selectedId: this.selectedId
            });

            this.selectedBeverage = response.data.pop();

            if (!this.selectedBeverage.image_url) {
                this.selectedBeverage.image_url = "https://cdn2.justwineapp.com/assets/article/2019/02/Screen-Shot-2019-02-13-at-4.43.10-PM-e1550101418523-171x300.png";
            }

            this.trackBeverage();
        },
        trackBeverage: function () {
            const now = new Date().toLocaleString('en-US');
            let exists = false;

            if (!(this.beverageTracker.length === 0)) {
                this.beverageTracker.forEach(element => {
                    if (element.id === this.selectedBeverage.id) {
                        exists = true;
                    }
                })
            }

            if (!exists) {
                this.beverageTracker.push({
                    name: this.selectedBeverage.name,
                    id: this.selectedBeverage.id,
                    time: now
                });
            }



        },
        retry: async function () {
            this.inMenu = true;
            this.hasSelected = false;
            this.hasSearched = false;
            this.returnedBeverages = [];
            this.selectedBeverage = {};
            this.query = "";
            this.selectedId = "";
        }
    },
    components: {
        'tracker': beverageTracker
    }
});