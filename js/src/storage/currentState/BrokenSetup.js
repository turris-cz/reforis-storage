import { Alert } from "foris";
import React from "react";

export default function BrokenSetup() {
    return (
        <Alert>
            <span>
                {_("Your setup is currently broken and you are probably loosing data, set a new storage device as soon as you can!")}
            </span>
        </Alert>
    );
}
