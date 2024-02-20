import React, { useState, useEffect } from "react";

import { getAllCategoriesRequest, getAllCategoriesTransform } from "./categories.service";

export const CategoriesContext = React.createContext();

export const CategoriesContextProvider = ({ children }) => {
    //const [keyword, setKeyword] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const onSearch = (searchKeyword) => {
    //     setIsLoading(true);
    //     setKeyword(searchKeyword);
    // };

    useEffect(() => {
        // if (!keyword.length) {
        //     // don't do anything
        //     return;
        // }
        getAllCategoriesRequest()
            .then(getAllCategoriesTransform)
            .then((result) => {
                setError(null);
                setIsLoading(false);
                setCategories(result);
                //console.log("Categories:", result.length);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from Categories.Context:", err);
            });
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                isLoading,
                error,
                categories,
                //search: onSearch,
                //keyword,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};