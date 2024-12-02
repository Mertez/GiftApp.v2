import AsyncStorage from '@react-native-async-storage/async-storage';

const get = async (apiRoute) => {

    //console.log(apiRoute);

    //console.log("Start geting :: " + apiRoute, "\r\n");
    // var res = await fetch(apiRoute);
    // var data = res.json();

    var data = fetch(apiRoute).then((res) => {
        //console.log("Done get :: " + apiRoute, "\r\n", res);
        return res.json();
    });

    return data;
}

const authGet = async (apiRoute) => {
    //console.log("Start authGet :: " + apiRoute + "\r\n");
    var token = await AsyncStorage.getItem("TOKEN");
    //console.log(`TOKEN (authGet):`, token);
    var res = await fetch(apiRoute, {
        method: "get",
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    })
    var data = res.json();
    return data;
}

const postFile = async (apiRoute, fileUri, name, fileType) => {

    const formData = new FormData();
    formData.append('file', {
        uri: fileUri,
        name: `${name}`,
        type: fileType
    });

    const options = {
        method: 'POST',
        body: formData
    };

    var res = await fetch(apiRoute, options);
    //const json = await res.json();

    //console.log(res);

    //var data = res.json();
    // console.log("Done post :: " + apiRoute);
    // console.log(data);
    // console.log("\r\n");
    //return null;
}

const authPostFile = async (apiRoute, body) => {
    //console.log("Start authPost :: " + apiRoute + "\r\n");
    var token = await AsyncStorage.getItem("TOKEN");
    var res = await fetch(apiRoute, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }),
        body: JSON.stringify(body)
    })

    var data = {};
    if (res.status == "401") {
        data.success = false;
        data.errors = ["Unauthorized"];
        return data;
    }
    data = res.json();

    // console.log("Done authPost :: " + apiRoute);
    // console.log(data);
    // console.log("\r\n");
    return data;
}


const post = async (apiRoute, body) => {
    //console.log("post :: " + apiRoute + "\r\n");
    //console.log("post :: " + apiRoute + "\r\ndata :: " + JSON.stringify(body) + "\r\n");
    var res = await fetch(apiRoute, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    })

    var data = res.json();
    // console.log("Done post :: " + apiRoute);
    // console.log(data);
    // console.log("\r\n");
    return data;
}

const authPost = async (apiRoute, body) => {

    var token = await AsyncStorage.getItem("TOKEN");
    //console.log("Start authPost :: " + apiRoute + "\r\n", token);
    var res = await fetch(apiRoute, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }),
        body: JSON.stringify(body)
    })

    var data = {};
    if (res.status == "401") {
        data.success = false;
        data.errors = ["Unauthorized"];
        return data;
    }
    data = res.json();

    // console.log("Done authPost :: " + apiRoute);
    // console.log(data);
    // console.log("\r\n");
    return data;
}


const authDelete = async (apiRoute, body) => {

    try {
        var token = await AsyncStorage.getItem("TOKEN");
        //console.log("Start authPost :: " + apiRoute + "\r\n", token);
        var res = await fetch(apiRoute, {
            method: "delete",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(body)
        })

        var data = {};
        if (res.status == "401") {
            data.success = false;
            data.errors = ["Unauthorized"];
            return data;
        }


        if (res.status === 204) {
            return {
                success: true,
                message: "Record deleted successfully"
            };
        }

        data = await res.json();
        return data;
    }
    catch (error) {
        return {
            success: false,
            errors: [error.message]
        };
    }
};


module.exports = {
    get,
    authGet,
    post,
    authPost,
    authDelete,
    postFile,
    authPostFile
}