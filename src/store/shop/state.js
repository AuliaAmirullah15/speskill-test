import { ref } from "vue";

export default function() {
    return {
        columns: [{
                name: "product",
                required: true,
                label: "Product",
                align: "left",
                field: (row) => row.name,
                format: (val) => `${val}`,
                sortable: true,
            },
            {
                name: "quantity",
                align: "center",
                label: "Quantity",
                field: "quantity",
                sortable: true,
            },
            {
                name: "subtotal",
                label: "Subtotal",
                field: "subtotal",
                sortable: true,
            },
        ],
        rows: ref([]),
        totalAll: ref(0),
    };
}