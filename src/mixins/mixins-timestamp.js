export default {
    methods: {
        getNow() {
            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            const today = new Date();
            const date =
                monthNames[today.getMonth()] +
                " " +
                today.getDate() +
                " , " +
                today.getFullYear();
            const time =
                today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + " " + time;
            this.timestamp = dateTime;
        },
    },
};