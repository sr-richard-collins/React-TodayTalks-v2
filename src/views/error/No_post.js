import React, { useState, useEffect } from "react";
import Error from "../../components/Error";

const NoPost = () => {

    const error_message = "Sorry, No Page To display";

    return (
        <>
            <Error title={error_message}/>
        </>
    );
};

export default NoPost;
