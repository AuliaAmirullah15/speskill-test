export function setData(state, payload) {
    try {
        const subtotal = payload.quantity * payload.product.price;
        state.totalAll += subtotal;

        let temp = {
            name: payload.product.name,
            quantity: payload.quantity,
            code: payload.product.code,
            media_url: payload.product.media_url,
            price: payload.product.price,
            stock: payload.product.stock,
            subtotal: subtotal,
        };
        state.rows.push({...temp });
    } catch (e) {
        console.log(e);
    }
}

export function changeTotalItem(state, payload) {
    new Promise((resolve, reject) => {
        state.rows[payload.index].quantity = payload.val;
        state.rows[payload.index].subtotal =
            state.rows[payload.index].quantity * state.rows[payload.index].price;

        let temp = 0;
        Object.values(state.rows).forEach((o) => {
            temp += o.subtotal;
        });
        state.totalAll = temp;
    });
}