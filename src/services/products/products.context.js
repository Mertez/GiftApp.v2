import React, { useState, useEffect, useContext, createContext } from "react";
import {
    getProductsRequest,
    getProductsTransform,

    getProductsHotRequest,
    getProductsHotTransform,

    getProductsHotByCategoryRequest,
    getProductsHotByCategoryTransform,

    getProductsHotByBrandRequest,
    getProductsHotByBrandTransform,

    getProductBrandsRequest,
    getProductBrandsTransform,

    // getSingleProductsRequest,
    // getSingleProductsTransform,

    // searchProductsRequest,
    // searchProductsTransform,
} from "./products.service";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
    // const [keyword, setKeyword] = useState("");
    // const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [dealBrands, setDealBrands] = useState(null);
    const [productHots, setProductHots] = useState(null);
    const [deals, setDeals] = useState(null);
    const [giftCards, setGiftCards] = useState(null);
    const [category, setCategory] = useState(null);
    const [hotCategory, setHotCategory] = useState(null);
    const [hot, setHot] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
    };


    const onGetDealBrands = () => {
        setIsLoading(true);
        getProductBrandsRequest(3, 1, -1, -1)
            .then(getProductBrandsTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                setDealBrands(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductBrandsRequest.Context:", err);
            });
    };


    const onGetProducts = (productType, hot, special, categoryId, brandId) => {
        setIsLoading(true);
        getProductsRequest(productType, hot, special, categoryId, brandId)
            .then(getProductsTransform)
            .then((result) => {
                //console.log("onGetProducts", productType, hot, special, categoryId, brandId, result);
                setError(null);
                setIsLoading(false);
                switch (productType) {
                    case 1:
                        setProducts(result);
                        break;
                    case 2:
                        setGiftCards(result);
                        break;
                    case 3:
                        setDeals(result);
                        break;
                }

            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsRequest.Context:", err);
            });
    };

    const onGetProductsHot = () => {
        setIsLoading(true);
        getProductsHotRequest()
            .then(getProductsHotTransform)
            .then((result) => {
                //console.log(result);
                setError(null);
                setIsLoading(false);
                setProductHots(result);

            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsHotRequest.Context:", err);
            });
    };


    const onGetProductsSpecial = () => {
        setIsLoading(true);
        getProductsSpecialRequest()
            .then(getProductsSpecialTransform)
            .then((result) => {
                //console.log(result);
                setError(null);
                setIsLoading(false);
                setProductSpecials(result);

            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsSpecialRequest.Context:", err);
            });
    };

    const onGetProductsByCategory = (categoryId) => {
        //console.log("onGetProductsByCategory", categoryId);
        setIsLoading(true);
        getProductsByCategoryRequest(categoryId)
            .then(getProductsByCategoryTransform)
            .then((result) => {
                //console.log("Result:", result);
                setError(null);
                setIsLoading(false);
                setProducts(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsByCategoryRequest.Context:", err);
            });
    };

    const onGetProductsByBrand = (brandId) => {
        setIsLoading(true);
        getProductsByBrandRequest(brandId)
            .then(getProductsByBrandTransform)
            .then((result) => {
                setError(null);
                setIsLoading(false);
                setProducts(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsByBrandRequest.Context:", err);
            });
    };

    const onGetProductsHotByCategory = (categoryId) => {
        //console.log("onGetProductsHotByCategory", categoryId);
        setIsLoading(true);
        getProductsHotByCategoryRequest(categoryId)
            .then(getProductsHotByCategoryTransform)
            .then((result) => {
                //console.log("Result:", result);
                setError(null);
                setIsLoading(false);
                setProducts(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsHotByCategoryRequest.Context:", err);
            });
    };

    const onGetProductsHotByBrand = (brand) => {
        setIsLoading(true);
        getProductsHotByBrandRequest(brand.id)
            .then(getProductsHotByBrandTransform)
            .then((result) => {
                //console.log("from onGetProductsHotByBrand", brand.id)
                setError(null);
                setIsLoading(false);
                setProductHots(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsHotByBrandHotRequest.Context:", err);
            });
    };


    const onGetProductsSpecialByCategory = (categoryId) => {
        //console.log("onGetProductsSpecialByCategory", categoryId);
        setIsLoading(true);
        getProductsSpecialByCategoryRequest(categoryId)
            .then(getProductsSpecialByCategoryTransform)
            .then((result) => {
                //console.log("Result:", result);
                setError(null);
                setIsLoading(false);
                setProducts(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsSpecialByCategoryRequest.Context:", err);
            });
    };

    const onGetProductsSpecialByBrand = (brandId) => {
        setIsLoading(true);
        getProductsSpecialByBrandRequest(brandId)
            .then(getProductsSpecialByBrandSpecialTransform)
            .then((result) => {
                setError(null);
                setIsLoading(false);
                setProductSpecials(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getProductsSpecialByBrandSpecialRequest.Context:", err);
            });
    };

    // useEffect(() => {
    //     if (!keyword.length) {
    //         // don't do anything
    //         return;
    //     }
    //     searchProductsRequest()
    //         .then(searchProductsTransform)
    //         .then((result) => {
    //             setError(null);
    //             setIsLoading(false);
    //             setProducts(result);
    //         })
    //         .catch((err) => {
    //             setIsLoading(false);
    //             setError(err);
    //             console.error("Error from searchProductsRequest.Context:", err);
    //         });
    // }, [keyword]);


    // useEffect(() => {
    //     if (!hotCategory) {
    //         // don't do anything
    //         return;
    //     }
    //     getProductsHotByCategoryHotRequest(category)
    //         .then(getProductsHotByCategoryHotTransform)
    //         .then((result) => {
    //             setError(null);
    //             setIsLoading(false);
    //             setProducts(result);
    //         })
    //         .catch((err) => {
    //             setIsLoading(false);
    //             setError(err);
    //             console.error("Error from getProductsHotByCategoryRequest.Context:", err);
    //         });
    // }, [category]);


    // useEffect(() => {
    //     if (!category) {
    //         // don't do anything
    //         return;
    //     }
    //     getProductsHotByCategoryRequest(category)
    //         .then(getProductsHotByCategoryTransform)
    //         .then((result) => {
    //             setError(null);
    //             setIsLoading(false);
    //             setProducts(result);
    //         })
    //         .catch((err) => {
    //             setIsLoading(false);
    //             setError(err);
    //             console.error("Error from getProductsHotByCategoryRequest.Context:", err);
    //         });
    // }, [category]);

    // useEffect(() => {
    //     if (!productId) {
    //         // don't do anything
    //         return;
    //     }
    //     getSingleProductsRequest(productId)
    //         .then(getSingleProductsTransform)
    //         .then((result) => {
    //             setError(null);
    //             setIsLoading(false);
    //             setProduct(result);
    //         })
    //         .catch((err) => {
    //             setIsLoading(false);
    //             setError(err);
    //             console.error("Error from getSingleProductsRequest.Context:", err);
    //         });
    // }, [productId]);

    return (
        <ProductsContext.Provider
            value={{
                isLoading,
                error,
                onSearch,

                onGetDealBrands,
                onGetProducts,
                onGetProductsByCategory,
                onGetProductsByBrand,

                onGetProductsHot,
                onGetProductsHotByCategory,
                onGetProductsHotByBrand,

                onGetProductsSpecial,
                onGetProductsSpecialByCategory,
                onGetProductsSpecialByBrand,

                productHots,
                products,
                product,
                dealBrands,
                deals,
                giftCards
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};