/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {render} from "foris/testUtils/customTestRender";

import DrivesOperations from '../DrivesOperations';

describe("<DrivesOperations />", () => {
    it("Should handle empty drives list render.", async () => {
        const {getByText} = render(<DrivesOperations
            drives={[]}
            storageIsPending={false}
            currentUUID={""}
            updateUUIDCallback={() => {
            }}
        />);
        getByText(/No drives connected/);
    });
});
