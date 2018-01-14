export default (products, like) => {
    if (like) {
        return products
            .map((product) => {
                return {
                    ...product,
                    hasLike: like.filter((f) => {
                        return f.pid === product.id
                    }).length > 0
                }
            });
    } else {
        return products;
    }
};