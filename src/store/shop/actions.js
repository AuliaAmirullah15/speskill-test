import axios from "axios";

export async function fetchData({ commit }) {
    await axios({
            method: "get",
            url: "https://spe-academy.spesolution.net/api/recruitment",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer o7Ytbt9XQLI3PgtebJfKSXKEf0XHU74Y",
            },
        })
        .then((response) => {
            Object.entries(response.data).forEach((v) => {
                commit("setData", v[1]);
            });
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}

export function changeTotalItem({ commit }, payload) {
    commit("changeTotalItem", payload);
}

export function updateDataTable({ commit }, payload) {
    commit("updateDataTable", payload);
}