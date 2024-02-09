/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Alert } from "foris";

export default function BrokenSetupAlert() {
    return (
        <Alert>
            <span>
                {_(
                    "Your setup is currently broken and you are probably loosing data, set a new storage device as soon as you can!"
                )}
            </span>
        </Alert>
    );
}
